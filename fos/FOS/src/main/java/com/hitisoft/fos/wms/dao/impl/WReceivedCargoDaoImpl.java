package com.hitisoft.fos.wms.dao.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WReceivedCargoDao;
import com.hitisoft.fos.wms.entity.WReceivedCargo;
import com.hitisoft.fos.wms.entity.WStorageNote;
import com.hitisoft.fos.wms.entity.WStorageNoteCargo;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class WReceivedCargoDaoImpl extends JpaDao<WReceivedCargo, Long> implements WReceivedCargoDao {
	
	@Autowired
    private RequestContext requestContext;
	
	public WReceivedCargoDaoImpl() {
		super(WReceivedCargo.class);
	}
	/**
	 * 根据条件查询上架表信息
	 * @param conditions
	 * @return List
	 */
	@SuppressWarnings("unchecked")	
	public List complexQuery(final List<HtQuery> conditions){
		List list=new ArrayList();
		StringBuffer sb=new StringBuffer();
		sb.append("t1,t2.planedQuantity,t2.planedPackages,t2.planedGrossWeight,t2.planedNetWeight,t2.planedVolume,");
		sb.append(" t2.planedMeasure,t2.planPack ");
		
		StringBuffer whereSql=new StringBuffer();
		whereSql.append(" t1.storageNoteCargoId=t2.id");
		//whereSql.append(" and t1.receivedQuantity>=t1.placedQuantity ");
		whereSql.append(" and t1.removed=0");
		
		list=this.query(conditions, requestContext, sb.toString(), whereSql.toString(), WReceivedCargo.class,WStorageNoteCargo.class);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", whereSql.toString(), WReceivedCargo.class,WStorageNoteCargo.class));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return list;
	}
	
			/**
			 * 库存盘点查询
			 * @param conditions
			 * @return ListWReceivedCargo
			 */
			@SuppressWarnings("unchecked")
			@Override
			public List<WReceivedCargo> excelQuery(final List<HtQuery> conditions) {
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
				//String orderNo=requestContext.get("orderNo");
				StringBuffer sb=new StringBuffer();
				List list=new ArrayList();
				sb.append("t1,t2.custId,t2.custName,t2.actureTime,t2.orderNo,t2.accountId,t2.accountName,t2.storageType");
				String sqlField=sb.toString();
				String w="t1.storageNoteId=t2.id";
				//将已收货未上架的数量查询出来。
				w+=" and (t1.quantity-t1.placedQuantity)>0";
				
				for(HtQuery q:conditions)
				{
					if (q.getKey().equals("custId"))
						w+=" and t2.custId="+q.getValue();
					else if (q.getKey().equals("custName"))
						w+=" and t2.custName="+"'"+q.getValue()+"'";
					else if (q.getKey().equals("storageType"))
						w+=" and t2.storageType="+q.getValue();
					else if (q.getKey().equals("warehouseId"))
						w+=" and t1.warehouseId="+q.getValue();
					else if (q.getKey().equals("warehouseName"))
						w+=" and t1.warehouseName="+"'"+q.getValue()+"'";
					else if (q.getKey().equals("areaId"))
						w+=" and t1.areaId="+q.getValue();
					else if (q.getKey().equals("areaName"))
						w+=" and t1.areaName="+"'"+q.getValue()+"'";
					else if (q.getKey().equals("blockId"))
						w+=" and t1.blockId="+q.getValue();
					else if (q.getKey().equals("blockName"))
						w+=" and t1.blockName="+"'"+q.getValue()+"'";
					
					else if (q.getKey().equals("cargoOwnerId"))
						w+=" and t2.custId="+"'"+q.getValue()+"'";
					else if(q.getKey().equals("storageNoteNo"))
						w+=" and t2.storageNoteNo like "+"'%"+q.getValue()+"%'";
					else if(q.getKey().equals("storageNoteNoF")){
						String storageNoteNoF=q.getValue();
						//String storageNoteNoE=conditions.
						
							w+=" and t2.storageNoteNo>="+"'"+storageNoteNoF+"'";
					}
					else if(q.getKey().equals("storageNoteNoE")){
						w+=" and t2.storageNoteNo<="+"'"+q.getValue()+"'";
					}
					else if(q.getKey().equals("orderNo"))
						w+=" and t2.orderNo="+"'"+q.getValue()+"'";
					else if(q.getKey().equals("df")){
						try {
							Date storageDate=sdf.parse(q.getValue());
							w+=" and t2.storageDate>="+storageDate;
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						
					}
					else if(q.getKey().equals("de"))
					{
						try {
							Date storageDate=sdf.parse(q.getValue());
							w+=" and t2.storageDate<="+storageDate;
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
					
				}
				
				
				list=query(null,null,sqlField,w,WReceivedCargo.class,WStorageNote.class);
				
				
				return list;
			}
			
			/**
			 * 根据入库单号查询没上架之前的货物信息
			 * @param conditions
			 * @return ListWstorageNoteCargo
			 */
			@SuppressWarnings({ "rawtypes", "unchecked" })
			public List<WStorageNoteCargo> getCargoList(List<HtQuery> conditions){
				List list=new ArrayList();
				String sql="t1";
				String where=new String();
				where=" ((t1.status in (0,1,2,3,4) and t1.storageType=0))";
				for(HtQuery q:conditions){
					if(q.getKey().equals("storageNoteNo")){
						where+=" and t1.storageNoteNo like '%" +q.getValue()+"%'";
					}
				}
				list=query(null,null,sql,where,WStorageNoteCargo.class);
				return list;
			}
}
