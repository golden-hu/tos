package com.hitisoft.fos.wms.dao.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WAssetsDao;
import com.hitisoft.fos.wms.entity.WAssets;
import com.hitisoft.fos.wms.entity.WStorageNote;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;

@Repository
public class WAssetsDaoImpl extends JpaDao<WAssets, Long> implements WAssetsDao {
	
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	
	public WAssetsDaoImpl() {
		super(WAssets.class);
	}

	/**
	 * 查询所有的，去重的，不为null的栈板名称
	 * @return ListWassets
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<WAssets> getByname() {
		String compCode=sessionContext.getCompCode();
		String atName=requestContext.get("txtAtName");
		StringBuffer sb=new StringBuffer();
		sb.append(" distinct atName from WAssets where atName is not null ");
		sb.append(" and removed=0 and compCode='"+compCode+"' ");
		//sb.append(" and atName like '" + atName + "%' ");
		sb.append(" order by id DESC ");
		final String requestString=sb.toString();
		return query(null,null,requestString,"",WAssets.class);
	}

	/**
	 * 查询所有的，去重的，不为null的栈板品牌名称
	 * @return ListWAssets
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<WAssets> findByBland() {
		String compCode=sessionContext.getCompCode();
		String atBrand=requestContext.get("txtAtName");
		StringBuffer sb=new StringBuffer();
		sb.append(" distinct atBrand from WAssets where atBrand is not null ");
		sb.append(" and removed=0 and compCode='"+compCode+"' ");
		//sb.append(" and atBrand like '" + atBrand + "%' ");
		sb.append(" order by id DESC ");
		final String requestString=sb.toString();
		return query(null,null,requestString,"",WAssets.class);
	}
	/**
	 * 根据ID获得所有对应的托盘数列表
	 * @return ListWassets
	 */
	//查询
	@SuppressWarnings("unchecked")
	@Override
	public List<WAssets> excelQueryAssetsList(final List<HtQuery> conditions) {
		//String orderNo=requestContext.get("orderNo");
		DateFormat dtFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		StringBuffer sb=new StringBuffer();
		List list=new ArrayList();
		sb.append("t1,t2.cargoOwnerId,t2.cargoOwnerName,t2.actureTime,t2.orderNo,t2.entrustNo,t2.status");
		String sqlField=sb.toString();
		String w=" t1.storageNoteId=t2.id and t1.removed=0 and t2.removed=0 ";
		for(HtQuery q:conditions){
			if(q.getKey().equalsIgnoreCase("storageNoteIdList")){
				w+=" and t2.id in ("+q.getValue()+") ";
			}
		}
		list=query(conditions,null,sqlField,w,WAssets.class,WStorageNote.class);
		List<WAssets> asList=new ArrayList<WAssets>();
		for(Object object:list){
			Object[] obj=(Object[])object;
			WAssets snc=(WAssets)obj[0];
			if(obj[1]!=null){
				snc.setCustId((Integer)obj[1]);
			}
			if(obj[2]!=null){
				snc.setCustName(obj[2].toString());
							}
			if(obj[3]!=null){
				/* try {  
			            //将字符串转换成日期格式   
			            Date date = dtFormat.parse(obj[3].toString()); 
			            snc.setActureTime(date);
			            System.out.println(date);  
			        } catch (ParseException e) {  
			            e.printStackTrace();  
			        } */
				snc.setActureTime((Date)obj[3]);
				
			}
			if(obj[4]!=null){
				snc.setOrderNo(obj[4].toString());
			}
			if(obj[5]!=null){
				snc.setOrderNo(obj[5].toString());
			}
			if(obj[6]!=null){
				snc.setStatus((Integer)obj[6]);
			}
			
			asList.add(snc);
		}
		return asList;
	}

}
