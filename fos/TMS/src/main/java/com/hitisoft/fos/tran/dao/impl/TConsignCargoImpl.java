package com.hitisoft.fos.tran.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TConsignCargoDao;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.tran.entity.TConsignCargo;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
@Repository
public class TConsignCargoImpl extends JpaDao<TConsignCargo, Long> implements TConsignCargoDao {
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	
	public TConsignCargoImpl() {
		super(TConsignCargo.class);
	}
	
	//陆运单客户日报表
		@SuppressWarnings("unchecked")
		@Override
		public List<TConsignCargo> excelQuery(final List<HtQuery> conditions) {
			String orderNo=requestContext.get("orderNo");
			StringBuffer sb=new StringBuffer();
			List list=new ArrayList();
			if(orderNo==null){
				sb.append("distinct t2,t1.loadAddress,t1.consDate,t1.loadDate,");
				sb.append("t1.arNewDate,t1.transportWay,t1.consNo,t1.consigneeName,t1.transportPlace,t1.remarks");
				String sqlField=sb.toString();
				String w = " t2.consId=t1.id";
				list = query(conditions, requestContext,sqlField,w,TConsign.class,TConsignCargo.class);
			}
			else{
				sb.append("distinct t1,t2.loadAddress,t2.consDate,t2.loadDate,");
				sb.append("t2.arNewDate,t2.transportWay,t2.consNo,t2.consigneeName,t2.transportPlace,t2.remarks");
				String sqlField=sb.toString();
				String w = " t1.consId=t2.id";
				w+=" and t1.orderNo like '%"+orderNo+"%'";
				list = query(null, null,sqlField,w,TConsignCargo.class, TConsign.class);
			}
			return list;
		}
		
		/*
		 * 根据条件查询托运单中的货物
		 * 1，从托运单中查货
		 * 2，从配车中根据条件选托运单中的货物
		 */
		@SuppressWarnings({ "unchecked", "rawtypes" })
		@Override
		public List<TConsignCargo> queryByConditions(final List<HtQuery> conditions) {
			final Class t1 = TConsignCargo.class;
			StringBuffer sb=new StringBuffer();
			sb.append("t1 ");
			String sqlField=sb.toString();
			String compCode = sessionContext.getCompCode();
			String w=" removed=0 and compCode='"+compCode+"'";
			
	        List  retList = query(conditions, requestContext,sqlField, w, t1);
			String rowCount = String.valueOf(querySize(conditions, requestContext,"t1.id",w, t1));
			requestContext.put(ContextKey.rowCount.get(), rowCount);
			return retList;
		}
}
