package com.hitisoft.fos.wms.dao.impl;



import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WPlacedCargoDao;
import com.hitisoft.fos.wms.entity.WBlock;
import com.hitisoft.fos.wms.entity.WCargo;
import com.hitisoft.fos.wms.entity.WCargoKz;
import com.hitisoft.fos.wms.entity.WCheckCargo;
import com.hitisoft.fos.wms.entity.WCheckNote;
import com.hitisoft.fos.wms.entity.WInventory;
import com.hitisoft.fos.wms.entity.WPlacedCargo;
import com.hitisoft.fos.wms.entity.WReceivedCargo;
import com.hitisoft.fos.wms.entity.WStorageNote;
import com.hitisoft.fos.wms.entity.WStorageNoteCargo;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class WPlacedCargoDaoImpl extends JpaDao<WPlacedCargo, Long> implements WPlacedCargoDao {
	@Autowired
	private RequestContext requestContext;
	
	
	public WPlacedCargoDaoImpl() {
		super(WPlacedCargo.class);
	}
	
	 
	/**
	 * 根据条件查询上架表信息
	 * @param conditions
	 * @return List
	 */
	@SuppressWarnings("unchecked")	
	@Override
	public List<WPlacedCargo> queryAll(final List<HtQuery> conditions){
		List list=new ArrayList();
		StringBuffer sb=new StringBuffer();
		sb.append("t1");
		
		StringBuffer whereSql=new StringBuffer();
		whereSql.append(" t1.storageNoteId=t2.id");
		
		list=this.query(conditions, requestContext, sb.toString(),whereSql.toString(),WPlacedCargo.class,WStorageNote.class );
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", whereSql.toString(), WPlacedCargo.class,WStorageNote.class));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return list;
	}
	
	/**
	 * 根据条件查询上架表信息
	 * @param conditions
	 * @return List
	 */
	@SuppressWarnings("unchecked")	
	public List compreQuery(final List<HtQuery> conditions){
		List list=new ArrayList();
		StringBuffer sb=new StringBuffer();
		sb.append("t1");		
		StringBuffer whereSql=new StringBuffer();
		whereSql.append(" t1.removed=0");
		
		list=this.query(conditions, requestContext, sb.toString(), whereSql.toString(),WPlacedCargo.class );
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", whereSql.toString(), WPlacedCargo.class));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return list;
	}
	
	
	
	/**
	 * 根据条件查询数量大于0的状态是上架的货物 框架处理conditions
	 * @param ListHtQueryCondition
	 * @return ListWPlacedCargo
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<WPlacedCargo> complexQuery4Picked(final List<HtQuery> conditions){
		StringBuffer sb=new StringBuffer();
		List list=new ArrayList();
		sb.append("t1");
		String sqlField=sb.toString();
		String where=" t1.quantity-t1.pickedQuantity>0";//如果等于0，则表示已经没有库存了
		where+=" and t1.storageNoteId=t2.id " +
				"and t1.status=5 " +
				"and t1.removed=0 and t2.removed=0 ";//上架完成以后才可以出库
		 
		list=query(conditions,null,sqlField,where,WPlacedCargo.class,WStorageNote.class);
		return list;
	}
	/**
	 * 根据条件查询数量大于0的状态是上架的货物
	 * @param ListHtQueryCondition
	 * @return ListWPlacedCargo
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<WPlacedCargo> query4AutoPicked(final List<HtQuery> conditions){
		//String orderNo=requestContext.get("orderNo");
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		
		StringBuffer sb=new StringBuffer();
		List list=new ArrayList();
		
		sb.append("t1");
		String sqlField=sb.toString();
		
		String w=" t1.quantity-t1.pickedQuantity>0";//如果等于0，则表示已经没有库存了
		w+=" and t1.storageNoteId=t2.id and t1.removed=0 ";
		w+=" and t2.removed=0 and t1.status=5 "; //上架完成以后才可以出库
		
		
		for(HtQuery q:conditions)
		{
			System.out.println(q.getKey());
			if (q.getKey().equals("custId"))
			
				w+=" and t1.custId="+q.getValue();
			else if (q.getKey().equals("custName"))
				w+=" and t1.custName="+"'"+q.getValue()+"'";
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
				w+=" and t2.cargoOwnerId="+"'"+q.getValue()+"'";
			else if (q.getKey().equals("cargoOwnerName"))
				w+=" and t2.cargoOwnerName="+"'"+q.getValue()+"'";
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
			else if(q.getKey().equals("blockLayer")){
				w+=" and t3.blockLayer='"+q.getValue()+"'";
			}
			
			else if(q.getKey().equals("productNo")){
				w+=" and t1.productNo='"+q.getValue()+"'";
			}
			else if(q.getKey().equals("productDate")){
				try {
					Date productDate=sdf.parse(q.getValue());
					w+=" and t1.productDate="+productDate;
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
			}
			
			else if(q.getKey().equals("entrustNo")){
				w+=" and t2.entrustNo like '%"+q.getValue()+"%'";
			}
			
			else if(q.getKey().equals("skuNo")){
				w+=" and t1.skuNo ='"+q.getValue()+"'";
			}
			else if(q.getKey().equals("cargoName")){
				w+=" and t1.cargoName ='"+q.getValue()+"'";
			}
		}
		
		w+=" ordey by t1.quantity-t1.pickedQuantity ";
		
		//Map<String, String> propertyMap = new HashMap<String, String>();
	    //propertyMap.put(ContextKey.orderby.get(), "blockName");
	    list=query(null,null,sqlField,w,WPlacedCargo.class,WStorageNote.class);
		//list=query(conditions,null,sqlField,where,WPlacedCargo.class,WStorageNote.class);
		
		
		return list;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<WPlacedCargo> inventory(final List<HtQuery> conditions){
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		String checkId = requestContext.get("checkId");
		
		StringBuffer sql=new StringBuffer();
		List list=new ArrayList();
		
		sql.append(" select t1.cust_id,t1.cust_name,");
		sql.append("        t1.cargo_id,t1.sku_no,t1.cargo_name, ");
		sql.append("        t1.block_id,t1.block_name,t1.area_id,t1.area_name,t1.warehouse_id,t1.warehouse_name, ");
		sql.append("        t1.storage_note_no,");
		sql.append("        sum(ifnull(t1.quantity,0)-ifnull(t1.picked_quantity,0)) as quantity, ");
		sql.append("        t1.unit_id,t1.unit_name, ");
		sql.append("        t1.storage_note_cargo_id,t1.storage_note_id,t1.id,");
		sql.append("        t1.batch_no,t1.product_no,");
		sql.append("        t1.block_code,t1.area_code,t1.warehouse_code ");
		sql.append("   from w_placed_cargo t1, ");
		sql.append("        w_storage_note t2, ");
		sql.append("        w_block t3 ");
		sql.append("  where t1.removed=0 and t2.removed=0 ");
		sql.append("    and ifnull(t1.quantity,0)>ifnull(t1.picked_quantity,0) ");
		sql.append("    and t1.storage_note_id=t2.id ");
		sql.append("    and t1.block_id=t3.id ");
		
		String w="";
		for(HtQuery q:conditions)
		{
			if (q.getKey().equals("custId"))
			
				w+=" and t1.cust_id="+q.getValue();
			else if (q.getKey().equals("custName"))
				w+=" and t1.cust_Name="+"'"+q.getValue()+"'";
			else if (q.getKey().equals("storageType"))
				w+=" and t2.storage_Type="+q.getValue();
			else if (q.getKey().equals("warehouseId"))
				w+=" and t1.warehouse_Id="+q.getValue();
			else if (q.getKey().equals("warehouseName"))
				w+=" and t1.warehouse_Name="+"'"+q.getValue()+"'";
			else if (q.getKey().equals("areaId"))
				w+=" and t1.area_Id="+q.getValue();
			else if (q.getKey().equals("areaName"))
				w+=" and t1.area_Name="+"'"+q.getValue()+"'";
			else if (q.getKey().equals("blockId"))
				w+=" and t1.block_Id="+q.getValue();
			else if (q.getKey().equals("blockName"))
				w+=" and t1.block_Name="+"'"+q.getValue()+"'";
			else if (q.getKey().equals("cargoOwnerId"))
				w+=" and t2.cust_Id="+"'"+q.getValue()+"'";
			else if (q.getKey().equals("cargoOwnerName"))
				w+=" and t2.cargo_Owner_Name="+"'"+q.getValue()+"'";
			else if(q.getKey().equals("storageNoteNo"))
				w+=" and t2.storage_Note_No like "+"'%"+q.getValue()+"%'";
			else if(q.getKey().equals("storageNoteNoF")){
				String storageNoteNoF=q.getValue();
				
					w+=" and t2.storage_Note_No>="+"'"+storageNoteNoF+"'";
			}
			else if(q.getKey().equals("storageNoteNoE")){
				w+=" and t2.storage_Note_No<="+"'"+q.getValue()+"'";
			}
			else if(q.getKey().equals("orderNo"))
				w+=" and t2.order_No="+"'"+q.getValue()+"'";
			else if(q.getKey().equals("startTime")){
				try {
					Date storageDate=sdf.parse(q.getValue());
					w+=" and t2.storage_Date>="+storageDate;
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}				
			}
			else if(q.getKey().equals("endTime"))
			{
				try {
					Date storageDate=sdf.parse(q.getValue());
					w+=" and t2.storage_Date<="+storageDate;
				} catch (ParseException e) {					
					e.printStackTrace();
				}
			}
			else if(q.getKey().equals("blockLayer")){
				w+=" and t3.block_Layer='"+q.getValue()+"'";
			}
			
			else if(q.getKey().equals("batchNo")){
				w+=" and t1.batch_No='"+q.getValue()+"'";
			}
			else if(q.getKey().equals("productDate")){
				w+=" and t1.product_Date='"+q.getValue()+"'";
				
			}
			
			else if(q.getKey().equals("entrustNo")){
				w+=" and t2.entrust_No like '%"+q.getValue()+"%'";
			}
			
			else if(q.getKey().equals("skuNo")){
				w+=" and t1.sku_No ='"+q.getValue()+"'";
			}
			else if(q.getKey().equals("cargoName")){
				w+=" and t1.cargo_Name ='"+q.getValue()+"'";
			}
			else if(q.getKey().equals("cargoId")){
				w+=" and t1.cargo_Id ='"+q.getValue()+"'";
			}
		}
		if(checkId!=null){
			w+=" and t1.SKU_NO in (SELECT SKU_NO FROM W_CHECK_CARGO where CHECK_ID="+checkId+")";
		}
		
		sql.append(w);
		sql.append(" group by t1.cust_id,t1.cargo_id,t1.block_id ");
		sql.append(" order by t1.block_name ");
				
	    list=this.queryByNativeSql(sql.toString());
		
	    if(list.size()>0){
	    	List<WPlacedCargo> wpcList=new ArrayList();	    
	    	for (Object object : list) {
				WPlacedCargo wpc=new WPlacedCargo();
				Object[] ob=(Object[])object;
				
				if(ob[0]!=null){
					wpc.setCustId((Integer)ob[0]);
				}
				if(ob[1]!=null){
					wpc.setCustName((String)ob[1]);
				}
				if(ob[2]!=null){
					//wpc.setCargoId((Long)ob[2]);
					wpc.setCargoId(Long.valueOf(ob[2].toString()));
				}
				if(ob[3]!=null){
					wpc.setSkuNo((String)ob[3]);
				}
				if(ob[4]!=null){
					wpc.setCargoName((String)ob[4]);
				}
				if(ob[5]!=null){
					wpc.setBlockId(Long.valueOf(ob[5].toString()));
				}
				if(ob[6]!=null){
					wpc.setBlockName((String)ob[6]);
				}
				if(ob[7]!=null){
					wpc.setAreaId(Long.valueOf(ob[7].toString()));
				}
				if(ob[8]!=null){
					wpc.setAreaName((String)ob[8]);
				}
				if(ob[9]!=null){
					wpc.setWarehouseId(Long.valueOf(ob[9].toString()));
				}
				if(ob[10]!=null){
					wpc.setWarehouseName((String)ob[10]);
				}
				if(ob[11]!=null){
					wpc.setStorageNoteNo((String)ob[11]);
				}
				if(ob[12]!=null){
					BigDecimal n=(BigDecimal)ob[12];
					wpc.setQuantity(n.doubleValue());
				}
				if(ob[13]!=null){
					wpc.setUnitId(Long.valueOf(ob[13].toString()));
				}
				if(ob[14]!=null){
					wpc.setUnitName(ob[14].toString());
				}
				if(ob[15]!=null){
					wpc.setStorageNoteCargoId(Long.valueOf(ob[15].toString()));
				}
				if(ob[16]!=null){
					wpc.setStorageNoteId(Long.valueOf(ob[16].toString()));
				}
				if(ob[17]!=null){
					wpc.setId(Long.valueOf(ob[17].toString()));
				}
				
				if(ob[18]!=null){
					wpc.setBatchNo((String)ob[18]);
				}
				if(ob[19]!=null){
					wpc.setProductNo((String)ob[19]);
				}
				if(ob[20]!=null){
					wpc.setBlockCode((String)ob[20]);
				}
				if(ob[21]!=null){
					wpc.setAreaCode((String)ob[21]);
				}
				if(ob[22]!=null){
					wpc.setWarehouseCode((String)ob[22]);
				}
				
				
				wpcList.add(wpc);
				
	    	}
	    	
	    	return wpcList;
	    	
	    }
		return list;
	}
	
	/**
	 * 根据条件查询数量大于0的状态是上架的货物，并且根据库位排序
	 * @param ListHtQueryCondition
	 * @return ListWPlacedCargo
	 */
		@SuppressWarnings({ "unchecked", "rawtypes" })
		@Override
		public List<WPlacedCargo> complexQuery(final List<HtQuery> conditions) {
			//String orderNo=requestContext.get("orderNo");
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");			
			StringBuffer sb=new StringBuffer();
			List list=new ArrayList();
			sb.append("t1");
			String sqlField=sb.toString();
			
			String w=" ifnull(t1.quantity,0)-ifnull(t1.pickedQuantity,0)-ifnull(t1.distQuantity,0)>0";//如果等于0，则表示已经没有库存了
			w+=" and t1.storageNoteId=t2.id and t1.removed=0 ";
			w+=" and t2.removed=0 and t1.status=5 "; //上架完成以后才可以出库
			w+=" and t1.blockId=t3.id ";
			
			for(HtQuery q:conditions)
			{
				if (q.getKey().equals("custId"))
				
					w+=" and t1.custId="+q.getValue();
				else if (q.getKey().equals("custName"))
					w+=" and t1.custName="+"'"+q.getValue()+"'";
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
				else if (q.getKey().equals("cargoOwnerName"))
					w+=" and t2.cargoOwnerName="+"'"+q.getValue()+"'";
				else if(q.getKey().equals("storageNoteNo"))
					w+=" and t2.storageNoteNo like "+"'%"+q.getValue()+"%'";
				else if(q.getKey().equals("storageNoteNoF")){
					String storageNoteNoF=q.getValue();
					
						w+=" and t2.storageNoteNo>="+"'"+storageNoteNoF+"'";
				}
				else if(q.getKey().equals("storageNoteNoE")){
					w+=" and t2.storageNoteNo<="+"'"+q.getValue()+"'";
				}
				else if(q.getKey().equals("orderNo"))
					w+=" and t2.orderNo="+"'"+q.getValue()+"'";
				else if(q.getKey().equals("startTime")){
					try {
						Date storageDate=sdf.parse(q.getValue());
						w+=" and t2.storageDate>="+storageDate;
					} catch (ParseException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
				}
				else if(q.getKey().equals("endTime"))
				{
					try {
						Date storageDate=sdf.parse(q.getValue());
						w+=" and t2.storageDate<="+storageDate;
					} catch (ParseException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				else if(q.getKey().equals("blockLayer")){
					w+=" and t3.blockLayer='"+q.getValue()+"'";
				}
				
				else if(q.getKey().equals("batchNo")){
					w+=" and t1.batchNo='"+q.getValue()+"'";
				}
				else if(q.getKey().equals("productDate")){
					w+=" and t1.productDate='"+q.getValue()+"'";
					
				}
				
				else if(q.getKey().equals("entrustNo")){
					w+=" and t2.entrustNo like '%"+q.getValue()+"%'";
				}
				
				else if(q.getKey().equals("skuNo")){
					w+=" and t1.skuNo ='"+q.getValue()+"'";
				}
				else if(q.getKey().equals("cargoName")){
					w+=" and t1.cargoName ='"+q.getValue()+"'";
				}
				else if(q.getKey().equals("productNo")){
					w+=" and t1.productNo ='"+q.getValue()+"'";
				}
				else if(q.getKey().equals("cargoId")){
					w+=" and t1.cargoId ='"+q.getValue()+"'";
				}
			}
			
			
			Map<String, String> propertyMap = new HashMap<String, String>();
		    propertyMap.put(ContextKey.orderby.get(), "blockName");
		    list=query(null,propertyMap,sqlField,w,WPlacedCargo.class,WStorageNote.class,WBlock.class);
			
			return list;
		}
		
		/**
		 * 根据条件查询数量大于0的状态是上架的货物，并且根据库位排序
		 * @param ListHtQueryCondition
		 * @return ListWPlacedCargo
		 */
		@SuppressWarnings({ "unchecked", "rawtypes" })		
		public List<WPlacedCargo> placedQuery(final List<HtQuery> conditions) {
			//String orderNo=requestContext.get("orderNo");
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			
			
			StringBuffer sb=new StringBuffer();
			List list=new ArrayList();
			sb.append("t1");
			String sqlField=sb.toString();
			
			String w=" t1.storageNoteId=t2.id and t1.removed=0 ";//如果等于0，则表示已经没有库存了
			w+=" and t2.removed=0 and t1.status=5 "; //上架完成以后才可以出库
			w+=" and t1.blockId=t3.id ";
			
			for(HtQuery q:conditions)
			{
				if (q.getKey().equals("custId"))
				
					w+=" and t1.custId="+q.getValue();
				else if (q.getKey().equals("custName"))
					w+=" and t1.custName="+"'"+q.getValue()+"'";
				else if (q.getKey().equals("storageType"))
					w+=" and t2.storageType="+q.getValue();
				else if (q.getKey().equals("warehouseId"))
					w+=" and t1.warehouseId="+q.getValue();
				else if (q.getKey().equals("warehouseName"))
					w+=" and t1.warehouseName like "+"'%"+q.getValue()+"%'";
				else if (q.getKey().equals("areaId"))
					w+=" and t1.areaId="+q.getValue();
				else if (q.getKey().equals("areaName"))
					w+=" and t1.areaName like "+"'%"+q.getValue()+"%'";
				else if (q.getKey().equals("blockId"))
					w+=" and t1.blockId="+q.getValue();
				else if (q.getKey().equals("blockName"))
					w+=" and t1.blockName like "+"'%"+q.getValue()+"%'";
				else if (q.getKey().equals("cargoOwnerId"))
					w+=" and t2.custId="+"'"+q.getValue()+"'";
				else if(q.getKey().equals("storageNoteNo"))
					w+=" and t2.storageNoteNo like "+"'%"+q.getValue()+"%'";
				else if(q.getKey().equals("storageNoteNoF")){
					String storageNoteNoF=q.getValue();
					
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
				else if(q.getKey().equals("blockLayer")){
					w+=" and t3.blockLayer='"+q.getValue()+"'";
				}
				
				else if(q.getKey().equals("productNo")){
					w+=" and t1.productNo='"+q.getValue()+"'";
				}
				
				
				else if(q.getKey().equals("entrustNo")){
					w+=" and t2.entrustNo like '%"+q.getValue()+"%'";
				}
				
				else if(q.getKey().equals("skuNo")){
					w+=" and t1.skuNo ='"+q.getValue()+"'";
				}
				else if(q.getKey().equals("cargoName")){
					w+=" and t1.cargoName ='"+q.getValue()+"'";
				}
			}
			
			
			Map<String, String> propertyMap = new HashMap<String, String>();
		    propertyMap.put(ContextKey.orderby.get(), "blockName");
		    list=query(null,propertyMap,sqlField,w,WPlacedCargo.class,WStorageNote.class,WBlock.class);
			//list=query(conditions,null,sqlField,where,WPlacedCargo.class,WStorageNote.class);
			
			
			return list;
		}
	
	/**
	 * 根据条件查询及时库存信息
	 * @param conditions
	 * @return ListObject
	 */
	@SuppressWarnings({ "unchecked", "rawtypes", "unused" })
	@Override
	public List<Object> inventoryListExp(List<HtQuery> conditions) {
		
		String where = " and wpc.REMOVED=0 ";
		
		if(requestContext.get("custName") != null  && requestContext.get("custName") !=""){
			where+=" and wsn.CUST_NAME="+"'"+requestContext.get("custName")+"'";
		}
		if(requestContext.get("cargoId") != null  && requestContext.get("cargoId") !=""){
			where+=" and wpc.CARGO_ID="+"'"+requestContext.get("cargoId")+"'";
		}
		if(requestContext.get("cargoName") != null  && requestContext.get("cargoName") !=""){
			where+=" and wpc.CARGO_NAME="+"'"+requestContext.get("cargoName") +"'";
		}
		if(requestContext.get("owner") != null  && requestContext.get("owner") !=""){
			where+=" and wsn.CARGO_OWNER_NAME="+"'"+requestContext.get("owner")+"'";
		}
		if(requestContext.get("warehouseName") != null  && requestContext.get("warehouseName") !=""){
			where+=" and wpc.WAREHOUSE_NAME="+"'"+requestContext.get("warehouseName")+"'";
		}
		if(requestContext.get("areaName") != null  && requestContext.get("areaName") !=""){
			where+=" and wpc.AREA_NAME="+"'"+requestContext.get("areaName")+"'";
		}
		if(requestContext.get("clkpBlock") != null  && requestContext.get("clkpBlock") !=""){
			where+=" and wpc.BLOCK_NAME="+"'"+requestContext.get("clkpBlock") +"'";
		}
		if(requestContext.get("account") != null  && requestContext.get("account") !=""){
			where+=" and wsn.ACCOUNT_NAME="+"'"+requestContext.get("account")+"'";
		}
		if(requestContext.get("storageDateStart") != null  && requestContext.get("storageDateStart") !=""){
			where+=" and wsn.STORAGE_DATE>="+"'"+requestContext.get("storageDateStart")+"'";
		}
		if(requestContext.get("storageDateEnd") != null  && requestContext.get("storageDateEnd") !=""){
			where+=" and wsn.STORAGE_DATE<="+"'"+requestContext.get("storageDateEnd")+"'";
		}
		if(requestContext.get("storageNoteNo") != null  && requestContext.get("storageNoteNo") !=""){
			where+=" and wsn.STORAGE_NOTE_NO like "+"'%"+requestContext.get("storageNoteNo")+"%'";
		}
		if(requestContext.get("batchNo") != null  && requestContext.get("batchNo") !=""){
			where+=" and wpc.BATCH_NO like "+"'%"+requestContext.get("batchNo")+"%'";
		}
		if(requestContext.get("entrustNo") != null  && requestContext.get("entrustNo") !=""){
			where+=" and wsn.ENTRUST_NO like "+"'%"+requestContext.get("entrustNo")+"%'";
		}
		if(requestContext.get("productNo") != null  && requestContext.get("productNo") !=""){
			where+=" and wsnc.PRODUCT_NO like "+"'%"+requestContext.get("productNo")+"%'";
		}
		
		String unionSql= "select "+
				"			       wpc.SKU_NO ,"+
				"			       wpc.CARGO_ID,"+
				"			       wpc.CARGO_NAME ,"+	 
				"			       wpc.WAREHOUSE_ID,"+
				"                  wpc.WAREHOUSE_CODE,"+
				"                  wpc.WAREHOUSE_NAME ,"+
				"			       wpc.AREA_ID,"+
				"                  wpc.AREA_CODE,"+
				"                  wpc.AREA_NAME ,"+
				"			       wpc.BLOCK_ID,"+
				"                  wpc.BLOCK_CODE,"+
				"                  wpc.BLOCK_NAME,"+
				"			       wpc.SPECIFICATION ,"+
				"			       wpc.CARGO_TYPE ,"+
				"			       wpc.CARGO_COLOR ,"+
				"			       wpc.QUANTITY as quantity ,"+
				"			       wpc.PACKAGES as packages ,"+
				"			       wpc.GROSS_WEIGHT as grossWeight ,"+
				"			       wpc.NET_WEIGHT as netWeight ,"+
				"			       wpc.VOLUME as volume ,"+
				"			       wpc.MEASURE as measure ,"+
				"			       wpc.PICKED_QUANTITY as pickedQuantity ,"+
				"			       wpc.PICKED_PACKAGES as pickedPackages,"+
				"			       wpc.PICKED_GROSS_WEIGHT as pickedGrossWeight,"+
				"			       wpc.PICKED_NET_WEIGHT as pickedNetWeight ,"+
				"			       wpc.PICKED_VOLUME as pickedVolume,"+
				"			       wpc.PICKED_MEASUREMENT as pickedMeasure ,"+
				"			       wpc.RECEIVED_DATE,"+
				"			       ifnull(wpc.QUANTITY ,0)-ifnull(wpc.PICKED_QUANTITY ,0) as nowQuantity ,"+
				"			       ifnull(wpc.PACKAGES ,0)-ifnull(wpc.PICKED_PACKAGES ,0) as nowPackages ,"+
				"			       ifnull(wpc.GROSS_WEIGHT ,0)-ifnull(wpc.PICKED_GROSS_WEIGHT ,0) as nowGrossWeight ,"+
				"			       ifnull(wpc.NET_WEIGHT ,0)-ifnull(wpc.PICKED_NET_WEIGHT ,0) as nowNetWeight ,"+
				"			       ifnull(wpc.VOLUME ,0)-ifnull(wpc.PICKED_VOLUME ,0) as nowVolume ,"+
				"			       ifnull(wpc.MEASURE ,0)-ifnull(wpc.PICKED_MEASUREMENT ,0) as nowMeasure ,"+
				"			       wpc.UNIT_NAME as unitName,"+
				"			       wpc.P_UNIT_NAME as pUnitName,"+
				"			       wpc.W_UNIT_NAME as wUnitName ,"+
				"			       wpc.V_UNIT_NAME as vUnitName ,"+
				"			       wpc.M_UNIT_NAME as mUnitName,"+
				"			       wpc.PRODUCT_DATE ,"+
				"			       wpc.PRODUCT_NO ,"+
				"			       wpc.REMARKS ,"+
				"			       wsn.STORAGE_NOTE_NO ,"+ 
				"			       wsn.STORAGE_DATE ,"+
				"			       wsn.CARGO_OWNER_NAME ,"+
				"			       wsn.ACCOUNT_NAME ,"+
				"			       wsn.ORDER_NO ,"+
				"			       wsn.ENTRUST_NO ,"+
				"			       wsn.CUST_ID ,"+
				"			       wsn.CUST_NAME ,"+
				"			       wsnc.BATCH_NO ,"+
				"			       wb.BLOCK_LAYER ,"+
				"			       wc.CATEGORY_NAME ,"+
				"			       wc.CARGO_BRAND ,"+
				"			       wc.GROSS_WEIGHT,"+
				"			       wc.VOLUME as standardVolume,"+
				"			       wc.MEASUREMENT,"+
				"			       wpc.PLACED_DATE ,"+
				"			       wsnc.TRAY_QUANTITY,"+
				"			       TO_DAYS(now())-TO_DAYS(wpc.PLACED_DATE) as cargoDays ,"+
				"			       TO_DAYS(now())-TO_DAYS(wpc.PRODUCT_DATE) as cargoAges ,"+
				"			       wsnc.STATUS as status,"+
				"			       wpc.COMP_CODE "+
				"			  from W_PLACED_CARGO wpc "+
				"			  left join W_STORAGE_NOTE wsn on wsn.ID=wpc.STORAGE_NOTE_ID "+
				"			  left join W_STORAGE_NOTE_CARGO wsnc on wsnc.ID=wpc.STORAGE_NOTE_CARGO_ID "+
				"			  left join W_CARGO wc on wc.ID=wpc.CARGO_ID "+
				"			  left join W_BLOCK wb on wb.ID=wpc.BLOCK_ID "+
				"			 where wpc.QUANTITY>wpc.PICKED_QUANTITY "+
				"			   and wpc.STATUS=5 "+where+
				"			 UNION "+
				"			select "+
				"			       wpc.SKU_NO,"+ 
				"			       wpc.CARGO_ID,"+
				"			       wpc.CARGO_NAME,"+	 
				"			       wpc.WAREHOUSE_ID,"+
				"				   wpc.WAREHOUSE_CODE,"+
				"				   wpc.WAREHOUSE_NAME ,"+
				"			       wpc.AREA_ID,"+
				"				   wpc.AREA_CODE,"+
				"				   wpc.AREA_NAME ,"+
				"			       wpc.BLOCK_ID,"+
				"				   wpc.BLOCK_CODE,"+
				"				   wpc.BLOCK_NAME,"+
				"			       wpc.SPECIFICATION,"+
				"			       wsnc.CARGO_TYPE,"+
				"			       wsnc.CARGO_COLOR,"+
				"			       wpc.RECEIVED_QUANTITY AS quantity,"+
				"			       wpc.RECEIVED_PACKAGES AS packages,"+
				"			       wpc.RECEIVED_GROSS_WEIGHT AS grossWeight,"+
				"			       wpc.RECEIVED_NET_WEIGHT AS netWeight,"+
				"			       wpc.RECEIVED_VOLUME AS volume,"+
				"			       wpc.RECEIVED_MEASURE AS measure,"+
				"			       wpc.PLACED_QUANTITY AS pickedQuantity,"+
				"			       wpc.PLACED_PACEAGES as pickedPackages,"+
				"			       wpc.PLACED_GROSS_WEIGHT as pickedGrossWeight,"+
				"			       wpc.PLACED_NET_WEIGHT as pickedNetWeight,"+
				"			       wpc.PLACED_VOLUME as pickedVolume,"+
				"			       wpc.PLACED_MEASURE as pickedMeasure,"+
				"			       wpc.RECEIVED_DATE,"+
				"			       ifnull(wpc.RECEIVED_QUANTITY,0)-ifnull(wpc.PLACED_QUANTITY,0) as nowQuantity,"+
				"			       ifnull(wpc.RECEIVED_PACKAGES,0)-ifnull(wpc.PLACED_PACEAGES,0) as nowPackages,"+
				"			       ifnull(wpc.RECEIVED_GROSS_WEIGHT,0)-ifnull(wpc.PLACED_GROSS_WEIGHT,0) as nowGrossWeight,"+
				"			       ifnull(wpc.RECEIVED_NET_WEIGHT,0)-ifnull(wpc.PLACED_NET_WEIGHT,0) as nowNetWeight,"+
				"			       ifnull(wpc.RECEIVED_VOLUME,0)-ifnull(wpc.PLACED_VOLUME,0) as nowVolume,"+
				"			       ifnull(wpc.RECEIVED_MEASURE,0)-ifnull(wpc.PLACED_MEASURE,0) as nowMeasure,"+
				"			       wpc.UNIT_NAME as unitName,"+
				"			       wpc.P_UNIT as pUnitName,"+
				"			       wpc.W_UNIT_NAME as wUnitName ,"+
				"			       wpc.V_UNIT_NAME as vUnitName ,"+
				"			       wpc.M_UNIT_NAME as mUnitName ,"+
				"			       wpc.PRODUCT_DATE,"+
				"			       wpc.PRODUCT_NO,"+
				"			       wpc.REMARKS,"+  
				"			       wsn.STORAGE_NOTE_NO,"+ 
				"			       wsn.STORAGE_DATE,"+
				"			       wsn.CARGO_OWNER_NAME,"+
				"			       wsn.ACCOUNT_NAME,"+
				"			       wsn.ORDER_NO,"+
				"			       wsn.ENTRUST_NO,"+
				"			       wsn.CUST_ID ,"+
				"			       wsn.CUST_NAME,"+
				"			       wsnc.BATCH_NO,"+
				"			       wb.BLOCK_LAYER,"+
				"			       wc.CATEGORY_NAME,"+
				"			       wc.CARGO_BRAND,"+
				"			       wc.GROSS_WEIGHT,"+
				"			       wc.VOLUME as standardVolume,"+
				"			       wc.MEASUREMENT,"+
				"			       wpc.PLACED_DATE,"+
				"			       wsnc.TRAY_QUANTITY,"+
				"			       TO_DAYS(now())-TO_DAYS(wpc.RECEIVED_DATE) as cargoDays ,"+
				"			       TO_DAYS(now())-TO_DAYS(wpc.PRODUCT_DATE) as cargoAges ,"+
				"			       wsnc.STATUS as status,"+ 
				"			       wpc.COMP_CODE "+
				"		     from  W_RECEIVED_CARGO wpc "+
				"			 left join W_STORAGE_NOTE wsn on wsn.ID=wpc.STORAGE_NOTE_ID "+
				"			 left join W_STORAGE_NOTE_CARGO wsnc on wsnc.ID=wpc.STORAGE_NOTE_CARGO_ID "+
				"			 left join W_CARGO wc on wc.ID=wpc.CARGO_ID "+
				"			 left join W_BLOCK wb on wb.ID=wpc.BLOCK_ID "+
				"			 where wpc.RECEIVED_QUANTITY-wpc.PLACED_QUANTITY>0 "+where;
		String sql=" select a1.PRODUCT_NO, "+
				"      a1.CARGO_OWNER_NAME ,"+
				"	   a1.SKU_NO,"+
				"	   a1.CARGO_NAME,"+
				"	   a1.BLOCK_NAME,"+
				"	   a1.unitName,"+
				"	   sum(ifnull(a1.nowQuantity,0)) as nowQuantity,"+
				"	   sum(ifnull(a1.nowMeasure,0)) as nowMeasure,"+
				"	   sum(ifnull(a1.nowVolume,0)) as nowVolume,"+
				"	   sum(ifnull(a1.nowGrossWeight,0)) as nowGrossWeight,"+
				"	   sum(ifnull(a1.nowPackages,0)) as nowPackages,"+
				"	   a1.BATCH_NO,"+
				"	   a1.PRODUCT_NO,"+
				"	   a1.CUST_NAME,"+
				"	   a1.GROSS_WEIGHT,"+
				"	   a1.standardVolume,"+
				"	   a1.MEASUREMENT,"+
				"	   a1.STATUS,"+
				"	   a1.RECEIVED_DATE ,"+
				"      a1.CATEGORY_NAME "+
				
				" from ("+unionSql+
				"      )  a1 "+
				"  group by a1.CARGO_OWNER_NAME ,a1.SKU_NO,a1.CARGO_NAME,a1.CATEGORY_NAME,a1.BLOCK_NAME,a1.unitName," +
				"    a1.BATCH_NO,a1.PRODUCT_NO,a1.CUST_NAME,a1.GROSS_WEIGHT,a1.standardVolume,a1.MEASUREMENT,a1.status,a1.RECEIVED_DATE "+
				"  order by a1.BLOCK_NAME ";
		
		List list=new ArrayList();	
		return list=this.queryByNativeSql(sql);
		
	}
	
	/**
	 * 根据conditions中的条件进行库存盘点查询
	 * @param conditions
	 * @return ListWPlacedCargo
	 */
		@SuppressWarnings("unchecked")
		@Override
		public List<WPlacedCargo> excelQuery1(final List<HtQuery> conditions) {		
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			StringBuffer sb=new StringBuffer();			
			sb.append("t1,t2.custId,t2.custName,t2.actureTime,t2.orderNo,t2.accountId,t2.accountName,t2.storageType,t3.receivedDate");
			String sqlField=sb.toString();			
		    			
			String w="t1.storageNoteId=t2.id";
			w+=" and t1.receivedCargoId=t3.id";
			for(HtQuery q:conditions)
			{
				if (q.getKey().equals("custId"))
				
					w+=" and t1.custId="+q.getValue();
				else if (q.getKey().equals("custName"))
					w+=" and t1.custName="+"'"+q.getValue()+"'";
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
			
			return query(null,null,sqlField,w,WPlacedCargo.class,WStorageNote.class,WReceivedCargo.class);
			
		}
		/**
		 * 冻结货物查询，如果有条件传入则根据条件查询，如果没条件，则查询所有没被冻结的货物
		 * @param conditions
		 * @return ListObject
		 */
		@SuppressWarnings({ "rawtypes", "unchecked" })
		@Override
		public List<Object> query4Forzen(List<HtQuery> conditions) {
			List list = new ArrayList();
			StringBuffer sql= new StringBuffer();
		    sql.append("t1,t3.planedMeasure,t3.mUnitName,t3.wUnitName,t3.planedVolume," +
		    		"t3.vUnitName,t3.planedGrossWeight,t3.planedNetWeight,t4.safeDays");
			String sql1=sql.toString();
			String where=" t1.storageNoteId=t2.id";
				where+=" and t1.storageNoteId=t3.storageNoteId " ;
				where+=" and t1.storageNoteCargoId=t3.id ";
				where+=" and t1.statusFrozen=1 ";
				where+=" and t3.cargoId=t4.id";
				where+=" and t1.status=5 ";
				where+=" and t2.removed=0";
				where+=" and t3.removed=0";
				where+=" and t4.removed=0";
				where+=" and t1.removed=0";
			for(HtQuery a:conditions)
			{
				// 商品cargoName   仓位blockName    仓单号storageNoteNo  货主cargoOwnerName  库区areaName  开始日期receivedDate
				// 批次batchNo     仓库warehouseName       截止日期endReceivedDate   类别actionGategory  超期overDue
				if (a.getKey().equals("cargoName"))//商品
					where+=" and t1.cargoName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("blockName"))//仓位
					where+=" and t1.blockName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("storageNoteNo"))//仓单号
					where+=" and t1.storageNoteNo like "+"'%"+a.getValue()+"%'";
				else if (a.getKey().equals("cargoOwnerName"))//货主
					where+=" and t2.cargoOwnerName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("areaName"))//库区
					where+=" and t1.areaName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("receivedDate"))//开始日期
					where+=" and t1.receivedDate>="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("endReceivedDate"))//截止日期
					where+=" and t1.receivedDate<="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("batchNo"))//批次
					where+=" and t1.batchNo="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("warehouseName"))//仓库
					where+=" and t1.warehouseName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("actionGategory"))//类别
					where+=" and t1.actionGategory like "+"'%"+a.getValue()+"%'";
				else if (a.getKey().equals("productNo"))//生产编号
					where+=" and t3.productNo like '%"+a.getValue()+"%'";
				else if (a.getKey().equals("entrustNo"))//客户订单号
					where+=" and t2.orderNo like'%"+a.getValue()+"%'";
				else if (a.getKey().equals("categoryName"))//商品类别
					where+=" and t4.categoryName='"+a.getValue()+"'";
				/*else if (a.getKey().equals("overDue"))//超期
					 //DATE_ADD(curdate(), INTERVAL 1 DAY);  
					where+=" and Date_Add(t3.productDate ,INTERVAL "+("t4.safeDays").toString()+"  DAY) >= "+"'"+sdf.format(new Date())+"'";
					//where+=" and t3.productDate+t4.safeDays>="+sdf.format(new Date());*/
				
			}
			if(conditions.size()>0){
			where+=" and t1.receivedDate= (select max(t1.receivedDate) from WPlacedCargo t1 ,WStorageNote t2, WStorageNoteCargo t3,WCargo t4";
			where+=" where t1.storageNoteId=t2.id";
			where+=" and t1.storageNoteId=t3.storageNoteId " ;
			where+=" and t1.storageNoteCargoId=t3.id ";
			where+=" and t1.statusFrozen=1 ";
			where+=" and t3.cargoId=t4.id";
			where+=" and t1.status=5 ";
			where+=" and t2.removed=0";
			where+=" and t3.removed=0";
			where+=" and t4.removed=0";
			where+=" and t1.removed=0";
		for(HtQuery a:conditions)
		{
			if (a.getKey().equals("cargoName"))//商品
				where+=" and t1.cargoName="+"'"+a.getValue()+"'";
			else if (a.getKey().equals("blockName"))//仓位
				where+=" and t1.blockName="+"'"+a.getValue()+"'";
			else if (a.getKey().equals("storageNoteNo"))//仓单号
				where+=" and t1.storageNoteNo like "+"'%"+a.getValue()+"%'";
			else if (a.getKey().equals("cargoOwnerName"))//货主
				where+=" and t2.cargoOwnerName="+"'"+a.getValue()+"'";
			else if (a.getKey().equals("areaName"))//库区
				where+=" and t1.areaName="+"'"+a.getValue()+"'";
			else if (a.getKey().equals("receivedDate"))//开始日期
				where+=" and t1.receivedDate>="+"'"+a.getValue()+"'";
			else if (a.getKey().equals("endReceivedDate"))//截止日期
				where+=" and t1.receivedDate<="+"'"+a.getValue()+"'";
			else if (a.getKey().equals("batchNo"))//批次
				where+=" and t1.batchNo="+"'"+a.getValue()+"'";
			else if (a.getKey().equals("warehouseName"))//仓库
				where+=" and t1.warehouseName="+"'"+a.getValue()+"'";
			else if (a.getKey().equals("actionGategory"))//类别
				where+=" and t1.actionGategory like "+"'%"+a.getValue()+"%'";
			else if (a.getKey().equals("productNo"))//生产编号
				where+=" and t3.productNo like '%"+a.getValue()+"%'";
			else if (a.getKey().equals("entrustNo"))//客户订单号
				where+=" and t2.orderNo like'%"+a.getValue()+"%'";
			else if (a.getKey().equals("categoryName"))//商品类别
				where+=" and t4.categoryName='"+a.getValue()+"'";
		}
			where+=")";
			}else{
				list=query(null,null,sql1,where,WPlacedCargo.class,WStorageNote.class,WStorageNoteCargo.class,WCargo.class);
			}
			list=query(null,null,sql1,where,WPlacedCargo.class,WStorageNote.class,WStorageNoteCargo.class,WCargo.class);
			return list;
		}
		/**
		 * 取消冻结查询<p>
		 * 如果有条件则根据条件查询，如果没条件则查询已经被冻结的所有货物
		 * @param conditions
		 * @return ListObject
		 */
		@SuppressWarnings({ "rawtypes", "unchecked" })
		@Override
		public List<Object> query4ForzenCancel(List<HtQuery> conditions) {
			List list = new ArrayList();
			StringBuffer sql= new StringBuffer();
		    sql.append("t1,t3.planedMeasure,t3.mUnitName,t3.wUnitName,t3.planedVolume,t3.vUnitName," +
		    		"t3.planedGrossWeight,t3.planedNetWeight,t4.safeDays");
			String sql1=sql.toString();
			String where=" t1.storageNoteId=t2.id ";
			where+=" and t1.storageNoteId=t3.storageNoteId ";
			where+=" and t1.storageNoteCargoId=t3.id ";
			where+=" and t1.statusFrozen=0  and t3.cargoId=t4.id ";
			where+=" and t1.removed=0";
			where+=" and t2.removed=0";
			where+=" and t3.removed=0";
			where+=" and t4.removed=0";
			for(HtQuery a:conditions)
			{
				if (a.getKey().equals("cargoName"))//商品
					where+=" and t1.cargoName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("blockName"))//仓位
					where+=" and t1.blockName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("storageNoteNo"))//仓单号
					where+=" and t1.storageNoteNo like "+"'%"+a.getValue()+"%'";
				else if (a.getKey().equals("cargoOwnerName"))//客户
					where+=" and t2.cargoOwnerName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("areaName"))//库区
					where+=" and t1.areaName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("receivedDate"))//开始日期
					where+=" and t1.receivedDate>="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("endReceivedDate"))//截止日期
					where+=" and t1.receivedDate<="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("batchNo"))//批次
					where+=" and t1.batchNo="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("warehouseName"))//仓库
					where+=" and t1.warehouseName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("actionGategory"))//类别
					where+=" and t1.actionGategory="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("frozenCategory"))//被冻结类型
					where+=" and t1.frozenCategory='"+a.getValue()+"'";
				else if (a.getKey().equals("productNo"))//生产编号
					where+=" and t3.productNo like '%"+a.getValue()+"%'";
				else if (a.getKey().equals("entrustNo"))//客户订单号
					where+=" and t2.orderNo like '%"+a.getValue()+"%'";
				else if (a.getKey().equals("categoryName"))//商品类别
					where+=" and t4.categoryName='"+a.getValue()+"'";
			}
		if(conditions.size()>0){
			where+=" and t1.receivedDate= (select max(t1.receivedDate) from WPlacedCargo t1 ,WStorageNote t2, WStorageNoteCargo t3,WCargo t4";
			where+=" where t1.storageNoteId=t2.id";
			where+=" and t1.storageNoteId=t3.storageNoteId " ;
			where+=" and t1.storageNoteCargoId=t3.id ";
			where+=" and t1.statusFrozen=0 ";
			where+=" and t3.cargoId=t4.id";
			where+=" and t1.status=5 ";
			where+=" and t2.removed=0";
			where+=" and t3.removed=0";
			where+=" and t4.removed=0";
			where+=" and t1.removed=0";
			for(HtQuery a:conditions)
			{
				if (a.getKey().equals("cargoName"))//商品
					where+=" and t1.cargoName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("blockName"))//仓位
					where+=" and t1.blockName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("storageNoteNo"))//仓单号
					where+=" and t1.storageNoteNo like "+"'%"+a.getValue()+"%'";
				else if (a.getKey().equals("cargoOwnerName"))//客户
					where+=" and t2.cargoOwnerName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("areaName"))//库区
					where+=" and t1.areaName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("receivedDate"))//开始日期
					where+=" and t1.receivedDate>="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("endReceivedDate"))//截止日期
					where+=" and t1.receivedDate<="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("batchNo"))//批次
					where+=" and t1.batchNo="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("warehouseName"))//仓库
					where+=" and t1.warehouseName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("actionGategory"))//类别
					where+=" and t1.actionGategory="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("frozenCategory"))//被冻结类型
					where+=" and t1.frozenCategory='"+a.getValue()+"'";
				else if (a.getKey().equals("productNo"))//生产编号
					where+=" and t3.productNo like '%"+a.getValue()+"%'";
				else if (a.getKey().equals("entrustNo"))//客户订单号
					where+=" and t2.orderNo like '%"+a.getValue()+"%'";
				else if (a.getKey().equals("categoryName"))//商品类别
					where+=" and t4.categoryName='"+a.getValue()+"'";
			}
			where+=")";
		}else{
			list=query(null,null,sql1,where,WPlacedCargo.class,WStorageNote.class,WStorageNoteCargo.class,WCargo.class);
		}
			list=query(null,null,sql1,where,WPlacedCargo.class,WStorageNote.class,WStorageNoteCargo.class,WCargo.class);
			return list;
		}
		
		/**
		 * 库存盘点查询
		 * @param conditions
		 * @return ListWplacedCargo
		 */
		@SuppressWarnings({ "unchecked", "rawtypes" })
		@Override
		public List<WPlacedCargo> excelQuery(final List<HtQuery> conditions) {
			//String orderNo=requestContext.get("orderNo");
			StringBuffer sb=new StringBuffer();
			List list=new ArrayList();
			sb.append("t1,t2.custId,t2.custName,t2.actureTime,t2.orderNo,t2.accountId,t2.accountName,t2.storageType,t3.receivedDate");
			String sqlField=sb.toString();
			String w="t1.storageNoteId=t2.id";
			w+=" and t1.receivedCargoId=t3.id";
			list=query(conditions,null,sqlField,w,WPlacedCargo.class,WStorageNote.class,WReceivedCargo.class);
			return list;
		}

		/**
		 * 库存查询  既可以通过普通的条件进行查询，又可以按照分组的条件进行查询
		 * @param conditions
		 * @return List
		 */
		@SuppressWarnings({"rawtypes", "unused" })
		@Override
		public List getInventory(List<HtQuery> conditions) {
			// TODO Auto-generated method stub
			//因为考虑到作库存查询的时候，既要通过普通的条件进行查询，又要按照分组的条件进行查询
			//条件比较多，而且灵活，通过拼HQL的写法不太容易写得出来，至少我没有写出来，因此这里采
			//取直接拼原生sql的方法，进行取数据。取库存的基本原则是从两个表里的取，一个是在上架表
			//里取NOW_QUANTITY的值，表示当前的数量，一个是取收货表里，QUANTITY-PLACED_QUANTITY
			//的值，表示已收货，但还未上架的数量。将这两部份的数据UNION起来，就是库存数。如果是按
			//特定条件分组的话，就在外面再包一层sql的查询语句，并拼上group by 的条件，并按分组取
			//数量和重量的合计值。值得注意的是，如果是经过分组的话，有些单条记录的字段值会没有，
			//比如仓单号，货主，库位等等，只能有按分组条件的值。
			
			//以下具体说明编码过程
			
			List list=new ArrayList();		//接收最后的查询结果的List
			StringBuffer sb= new StringBuffer();		//拼写主体sql
			StringBuffer w=new StringBuffer();			//拼写主体sql的where条件
			
			StringBuffer sqlGroupHead=new StringBuffer();      //分组时，拼接外套层sql语的头部份的分组字段的sql
			StringBuffer sqlGroupEnd=new StringBuffer();	   //分组时，拼接外套层sql语句的group by 部份的sql	
			StringBuffer sqlOrder=new StringBuffer();			  //order by 条件
			
			int pageSize=0;			//分页时每页显示的记录数
			int pageStart=0;		//从第几条记录开始取
			
			//将传入条件的condition在分解的时候，将对应的key,value放置到这个map中
			Map<String,String> cMap=new HashMap<String, String>();
			
			//是否有分组条件
			boolean blnGroup=false;
			
			//如果入库单号，订单号，批次号，委托编号传入查询条件时是按逗号分隔的多个条件，
			//之后会需要分隔，所以这里定义四个数组变量用来接受到时候分隔后的数组。
			String[] strStorageNoteNo;
			String[] strOrderNo;
			String[] strBatchNo;
			String[] strEntrustNo;
			

			 //w="";
			//遍历conditions中的条件，同时根据条件进行拼where语句
			for(HtQuery q:conditions)
			{
				//取出key,value值，赋到cMap中去
				cMap.put(q.getKey(), q.getValue());
				
				//货主Id条件
				if (q.getKey().equals("custId"))
					w.append(" and wsn.CUST_Id="+q.getValue());
				
				//货主名称条件
				else if (q.getKey().equals("custName"))
					w.append(" and wsn.CUST_NAME="+"'"+q.getValue()+"'");
				
				//仓库Id
				else if (q.getKey().equals("warehouseId"))
					w.append(" and wpc.WAREHOUSE_ID="+q.getValue());
				
				//仓库名称
				else if (q.getKey().equals("warehouseName"))
					w.append(" and wpc.WAREHOUSE_NAME="+"'"+q.getValue()+"'");
				
				//库区Id
				else if (q.getKey().equals("areaId"))
					w.append(" and wpc.AREA_ID="+q.getValue());
				
				//库区名称
				else if (q.getKey().equals("areaName"))
					w.append(" and wpc.AREA_NAME="+"'"+q.getValue()+"'");
				
				//库位Id
				else if (q.getKey().equals("blockId"))
					w.append(" and wpc.BLOCK_ID="+q.getValue());
				
				//库位名称
				else if (q.getKey().equals("blockName"))
					w.append(" and wpc.BLOCK_NAME="+"'"+q.getValue()+"'");
				
				//商品id
				else if (q.getKey().equals("cargoId"))
					w.append(" and wpc.CARGO_ID="+q.getValue());
				
				//商品名称
				else if (q.getKey().equals("cargoName"))
					w.append(" and wpc.CARGO_NAME="+"'"+q.getValue()+"'");
				
				//生产编号
				else if (q.getKey().equals("productNo"))
					w.append(" and wpc.PRODUCT_NO like "+"'%"+q.getValue()+"%'");
				
				//货主
				else if (q.getKey().equals("cargoOwnerName"))
					w.append(" and wsn.CARGO_OWNER_NAME like "+"'%"+q.getValue()+"%'");
				
				//产品类别
				else if (q.getKey().equals("categoryName"))
					w.append(" and wc.CATEGORY_NAME ="+"'"+q.getValue()+"'");
				
				//接单日期开始
				else if (q.getKey().equals("storageDateStart"))
					w.append(" and wsn.STORAGE_DATE>="+"'"+q.getValue()+"'");
				
				//接单日期结束
				else if (q.getKey().equals("storageDateEnd"))
					w.append(" and wsn.STORAGE_DATE<="+"'"+q.getValue()+"'");
				
				
				//入库单号，如果是传入逗号分隔的多个，要进行分解，同时去掉其中的回车换行符，再逐个拼接
				else if (q.getKey().equals("storageNoteNo")){
					strStorageNoteNo=q.getValue().split(",");
					
					w.append(" and wsn.STORAGE_NOTE_NO in (");
					for (int i = 0; i < strStorageNoteNo.length; i++) {
						
						if (i<strStorageNoteNo.length-1)
						{
							w.append("'"+strStorageNoteNo[i].replace("\r\n", " ").trim()+"',");
						}
						else
						{
							w.append("'"+strStorageNoteNo[i].replace("\r\n", " ").trim()+"')");
						}
						
						
					}
				
				}
				
				//订单号，如果是传入逗号分隔的多个，要进行分解，同时去掉其中的回车换行符，再逐个拼接
				else if (q.getKey().equals("orderNo"))
				{
					strOrderNo=q.getValue().split(",");
					w.append(" and wsn.ORDER_NO IN (");
					for (int i = 0; i < strOrderNo.length; i++) {
						if (i<strOrderNo.length-1)
						{
							w.append("'"+strOrderNo[i].replace("\r\n", " ").trim()+"',");
						}
						else
						{
							w.append("'"+strOrderNo[i].replace("\r\n", " ").trim()+"')");
						}
					}
					
					
				}
				
				//批次号，如果是传入逗号分隔的多个，要进行分解，同时去掉其中的回车换行符，再逐个拼接
				else if (q.getKey().equals("batchNo"))
				{
					strBatchNo=q.getValue().split(",");
					
					w.append(" and wsn.BATCH_NO in (");
					for (int i = 0; i < strBatchNo.length; i++) {
						if (i<strBatchNo.length-1)
						{
							w.append("'"+strBatchNo[i].replace("\r\n", " ").trim()+"',");
						}
						else
						{
							w.append("'"+strBatchNo[i].replace("\r\n", " ").trim()+"')");
						}
						
					}
					
				}
				
				//委托编号，如果是传入逗号分隔的多个，要进行分解，同时去掉其中的回车换行符，再逐个拼接
				else if (q.getKey().equals("entrustNo"))
				{
					strEntrustNo=q.getValue().split(",");
					w.append(" and wsn.ENTRUST_NO in (");
					for (int i = 0; i < strEntrustNo.length; i++) {
						if (i<strEntrustNo.length-1) 
						{
							w.append("'"+strEntrustNo[i].replace("\r\n", " ").trim()+"',");
						}
						else
						{
							w.append("'"+strEntrustNo[i].replace("\r\n", " ").trim()+"')");
						}
						
					}
					
				}
				
				//是否有传入分组条件
				else if(q.getKey().equals("isGroup"))
					blnGroup=true;

			}
		
			
			//下面这两段是拼主体sql,后面拼了20个null的别名字段，是为了如果有分组条件的时候，那些不显示的字段，
			//可以用null来代替，并且能够保持顺序。否则查询会不正确，也是因为在service类中是按照字段的排列顺序取值的。
			//如果之后有条件扩展，就可以继续往后面添加
			
			sb.append("select ");
			sb.append("       wpc.SKU_NO ,");
			sb.append("       wpc.CARGO_ID,");
			sb.append("       wpc.CARGO_NAME ,");	 
			sb.append("       wpc.WAREHOUSE_ID,wpc.WAREHOUSE_CODE,wpc.WAREHOUSE_NAME ,");
			sb.append("       wpc.AREA_ID,wpc.AREA_CODE,wpc.AREA_NAME ,");
			sb.append("       wpc.BLOCK_ID,wpc.BLOCK_CODE,wpc.BLOCK_NAME,");
			sb.append("       wpc.SPECIFICATION ,");
			sb.append("       wpc.CARGO_TYPE ,");
			sb.append("       wpc.CARGO_COLOR ,");
			sb.append("       wpc.QUANTITY as quantity ,");
			sb.append("       wpc.PACKAGES as packages ,");
			sb.append("       wpc.GROSS_WEIGHT as grossWeight ,");
			sb.append("       wpc.NET_WEIGHT as netWeight ,");
			sb.append("       wpc.VOLUME as volume ,");
			sb.append("       wpc.MEASURE as measure ,");
			sb.append("       wpc.PICKED_QUANTITY as pickedQuantity ,");
			sb.append("       wpc.PICKED_PACKAGES as pickedPackages,");
			sb.append("       wpc.PICKED_GROSS_WEIGHT as pickedGrossWeight,");
			sb.append("       wpc.PICKED_NET_WEIGHT as pickedNetWeight ,");
			sb.append("       wpc.PICKED_VOLUME as pickedVolume,");
			sb.append("       wpc.PICKED_MEASUREMENT as pickedMeasure ,");
			sb.append("       ifnull(wpc.QUANTITY ,0)-ifnull(wpc.PICKED_QUANTITY ,0) as nowQuantity ,");
			sb.append("       ifnull(wpc.PACKAGES ,0)-ifnull(wpc.PICKED_PACKAGES ,0) as nowPackages ,");
			sb.append("       ifnull(wpc.GROSS_WEIGHT ,0)-ifnull(wpc.PICKED_GROSS_WEIGHT ,0) as nowGrossWeight ,");
			sb.append("       ifnull(wpc.NET_WEIGHT ,0)-ifnull(wpc.PICKED_NET_WEIGHT ,0) as nowNetWeight ,");
			sb.append("       ifnull(wpc.VOLUME ,0)-ifnull(wpc.PICKED_VOLUME ,0) as nowVolume ,");
			sb.append("       ifnull(wpc.MEASURE ,0)-ifnull(wpc.PICKED_MEASUREMENT ,0) as nowMeasure ,");
			sb.append("       wpc.UNIT_NAME as unitName,");
			sb.append("       wpc.P_UNIT_NAME as pUnitName,");
			sb.append("       wpc.W_UNIT_NAME as wUnitName ,");
			sb.append("       wpc.V_UNIT_NAME as vUnitName ,");
			sb.append("       wpc.M_UNIT_NAME as mUnitName,");
			sb.append("       wpc.PRODUCT_DATE ,");
			sb.append("       wpc.PRODUCT_NO ,");
			sb.append("       wpc.REMARKS ,");  
			sb.append("       wsn.STORAGE_NOTE_NO ,"); 
			sb.append("       wsn.STORAGE_DATE ,");
			sb.append("       wsn.CARGO_OWNER_NAME ,");
			sb.append("       wsn.ACCOUNT_NAME ,");
			sb.append("       wsn.ORDER_NO ,");
			sb.append("       wsn.ENTRUST_NO ,");
			sb.append("       wsn.CUST_ID ,");
			sb.append("       wsn.CUST_NAME ,");
			sb.append("       wsnc.BATCH_NO ,");
			sb.append("       wb.BLOCK_LAYER ,");
			sb.append("       wc.CATEGORY_NAME ,");
			sb.append("       wc.CARGO_BRAND ,");
			sb.append("       wpc.RECEIVED_DATE ,");
			sb.append("       wpc.PLACED_DATE ,");
			sb.append("       TO_DAYS(now())-TO_DAYS(wpc.PLACED_DATE) as cargoDays ,");
			sb.append("       TO_DAYS(now())-TO_DAYS(wpc.PRODUCT_DATE) as cargoAges ,");
			sb.append("       '已上架' as status ");
			sb.append("  from W_PLACED_CARGO wpc ");
			sb.append("  left join W_STORAGE_NOTE wsn on wsn.ID=wpc.STORAGE_NOTE_ID ");
			sb.append("  left join W_STORAGE_NOTE_CARGO wsnc on wsnc.ID=wpc.STORAGE_NOTE_CARGO_ID");
			sb.append("  left join W_CARGO wc on wc.ID=wpc.CARGO_ID ");
			sb.append("  left join W_BLOCK wb on wb.ID=wpc.BLOCK_ID ");
			sb.append(" where wpc.REMOVED=0 ");
			sb.append("   and wpc.QUANTITY>wpc.PICKED_QUANTITY ");
			sb.append("   and wsn.REMOVED=0 ");
			sb.append(w.toString());
			
			sb.append(" order by BLOCK_NAME ");
			String sql="";
			sql=sb.toString();
			
			//取得记录总条数的语句，需要赋值在request里
			String sqlGetCount="";
			
			sqlGetCount="select count(*) as nums from ("+sql + ") as pagecount";
			
			List listCount=new ArrayList();
			listCount=this.queryByNativeSql(sqlGetCount);
			if (listCount!=null)
			{
				
				requestContext.put(ContextKey.rowCount.get(), listCount.get(0).toString());
			}
			
			//如果有传入分页条件的话，去取得每页显示的记录数
			if (requestContext.get(ContextKey.limit.get())!=null)
			{
				pageSize=Integer.parseInt(requestContext.get(ContextKey.limit.get()));
			}
			
			//如果有传入分页条件的话，去取得从第几条记录开始取
			if (requestContext.get(ContextKey.start.get())!=null)
			{
				pageStart=Integer.parseInt(requestContext.get(ContextKey.start.get()));
			}
			
			//如果需要分页处理，则在原sql后面加上limit条件
			if (pageSize>0)
			{
				sql=sql+" limit "+pageStart+","+pageSize;
			}
			
			list=this.queryByNativeSql(sql);
			
			return list;
		}
		
		/**
		 * 根据条件查询上架信息
		 * @param conditions
		 * @return ListWPlacedCargo
		 */
		@SuppressWarnings({ "rawtypes", "unchecked" })
		@Override
		public List<WPlacedCargo> findByCargo(List<HtQuery> conditions) {
			List list = new ArrayList();
			SimpleDateFormat sdf = new SimpleDateFormat();
			String id = requestContext.get("id");
			String sql =" t1 ";
			String where=" t1.removed=0 ";
			    where+=" and t2.removed=0 and t3.removed=0 and t4.removed=0 and t5.removed=0 " ;
				where+=" and t2.id='"+id+"'";
				where+=" and t2.id=t3.checkId " ;
				where+=" and t1.cargoId=t4.id ";
				where+=" and t3.skuNo=t1.skuNo";
				where+=" and t1.storageNoteId=t5.id";
				where+=" and t1.quantity-t1.pickedQuantity>0";
			for(HtQuery a:conditions)
			{
				if (a.getKey().equals("custName"))//商品
					where+=" and t1.custName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("warehouseName"))//仓库
					where+=" and t1.warehouseName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("orderNo"))//订单号
					where+=" and t1.orderNo="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("areaName"))//库区
					where+=" and t1.areaName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("blockName"))//库位
					where+=" and t1.blockName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("cargoName"))//商品
					where+=" and t1.cargoName="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("productNo"))//批次名称 
					where+=" and t1.productNo="+"'"+a.getValue()+"'";
				else if (a.getKey().equals("productDate"))//生产日期
					where+=" and t1.productDate="+"'"+a.getValue()+"'";
				else if(a.getKey().equals("startTime")){
					try {
						Date storageDate=sdf.parse(a.getValue());
						where+=" and t5.storageDate>="+storageDate;
					} catch (ParseException e) {
						e.printStackTrace();
					}
					
				}
				else if(a.getKey().equals("endTime"))
				{
					try {
						Date storageDate=sdf.parse(a.getValue());
						where+=" and t5.storageDate<="+storageDate;
					} catch (ParseException e) {
						e.printStackTrace();
					}
				}
				else if (a.getKey().equals("blockLayer"))//层 
					where+=" and t4.blockLayer="+"'"+a.getValue()+"'";
			}
			list=query(null,null,sql,where,WPlacedCargo.class,WCheckNote.class,WCheckCargo.class,WCargo.class,WStorageNote.class);
			return list;
		}

}
