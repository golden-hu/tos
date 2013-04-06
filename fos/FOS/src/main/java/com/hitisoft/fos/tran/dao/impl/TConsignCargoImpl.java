package com.hitisoft.fos.tran.dao.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TConsignCargoDao;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.tran.entity.TConsignCargo;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class TConsignCargoImpl extends JpaDao<TConsignCargo, Long> implements
		TConsignCargoDao {
	@Autowired
	private RequestContext requestContext;

	public TConsignCargoImpl() {
		super(TConsignCargo.class);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<TConsignCargo> excelQuery(final List<HtQuery> conditions) {
		String orderNo = requestContext.get("orderNo");
		StringBuffer sb = new StringBuffer();
		List list = new ArrayList();
		if (orderNo == null) {
			sb.append("distinct t2,t1.loadAddress,t1.consDate,t1.loadDate,");
			sb.append("t1.arNewDate,t1.transportWay,t1.consNo,t1.consigneeName,t1.transportPlace,t1.remarks");
			String sqlField = sb.toString();
			String w = " t2.consId=t1.id";
			list = query(conditions, requestContext, sqlField, w,
					TConsign.class, TConsignCargo.class);
		} else {
			sb.append("distinct t1,t2.loadAddress,t2.consDate,t2.loadDate,");
			sb.append("t2.arNewDate,t2.transportWay,t2.consNo,t2.consigneeName,t2.transportPlace,t2.remarks");
			String sqlField = sb.toString();
			String w = " t1.consId=t2.id";
			w += " and t1.orderNo like '%" + orderNo + "%'";
			list = query(null, null, sqlField, w, TConsignCargo.class,
					TConsign.class);
		}
		return list;
	}

	@Override
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<TConsignCargo> queryCargoByStatus() {
		List list = new ArrayList();
		StringBuffer sb = new StringBuffer();
		sb.append("distinct t2,t1.consigneeName,t1.consigneeContact,");
		sb.append("t1.consigneeMobile,t1.consigneeAddress ");
		String sqlField = sb.toString();
		String w = " t2.consId=t1.id";
		w += " and t2.consBizClass ='O'";
		w += " and ifnull(t2.packages,0)>ifnull(t2.dispatchPackages,0)";
		list = query(null, null, sqlField, w, TConsign.class,TConsignCargo.class);
		// 查询得到两张表的数据,而前台只有一个store（TConsignCargo）
		// 所以将TConsign的相关数据set到TConsignCargo
		List<TConsignCargo> retList = new ArrayList<TConsignCargo>();
		Double sSurplusGrossWeight = 0.00;
		Double sSurplusVolume = 0.00;
		for (Object o : list) {
			Object[] objs = (Object[]) o;
			TConsignCargo tc = (TConsignCargo) objs[0];
			String consigneeName = (String) objs[1];
			String consigneeContact = (String) objs[2];
			String consigneeMobile = (String) objs[3];
			String consigneeAddress = (String) objs[4];
			
			tc.setSurplusPackages(tc.getPackages() == null ? 0 : tc.getPackages() - (tc.getDispatchPackages() == null ? 0 : tc.getDispatchPackages()));
			sSurplusGrossWeight = tc.getGrossWeight().doubleValue() - tc.getDispatchGrossWeight().doubleValue();
			sSurplusVolume = tc.getVolume().doubleValue() - tc.getDispatchVolume().doubleValue();
			tc.setSurplusGrossWeight(BigDecimal.valueOf(sSurplusGrossWeight));
			tc.setSurplusVolume(BigDecimal.valueOf(sSurplusVolume));
			tc.setConsigneeName(consigneeName);
			tc.setConsigneeContact(consigneeContact);
			tc.setConsigneeTel(consigneeMobile);
			tc.setDeliveryAddress(consigneeAddress);
			
			retList.add(tc);
		}
		return retList;
	}
	
}