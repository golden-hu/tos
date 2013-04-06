package com.hitisoft.fos.wms.dao.impl;


import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WRateDao;
import com.hitisoft.fos.wms.entity.WCargo;
import com.hitisoft.fos.wms.entity.WCargoCategory;
import com.hitisoft.fos.wms.entity.WRate;
import com.hitisoft.fos.wms.entity.WRateCust;
import com.hitisoft.fos.wms.entity.WRateSheet;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;

@Repository
public class WRateDaoImpl extends JpaDao<WRate, Long> implements WRateDao{
	public WRateDaoImpl()
	{
		super(WRate.class);
	}
	
	/**
	 * 根据条件查询费率信息
	 * @param conditions
	 * @return ListWRate
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<WRate> excelQuery(final List<HtQuery> conditions) {
		
		StringBuffer sb=new StringBuffer();
		List list=new ArrayList();
		sb.append("t1");
		String sqlField=sb.toString();
		String w="t1.id=t2.rateId ";
		w+=" and t1.id=t3.rateId ";
		w+=" and t2.cargoCategoryId=t4.id ";
		w+=" and t5.categoryId=t4.id";
		
		list=query(null,null,sqlField,w,WRate.class,WRateSheet.class,WRateCust.class,WCargoCategory.class,WCargo.class);
		
		return list;
	}
	
	/**
	 * 根据客户ID、货物ID、仓库ID查询费率信息
	 * @param conditions
	 * @return List
	 */
		@SuppressWarnings("unchecked")
		@Override
		public List queryCostRate(final List<HtQuery> conditions) {	
			
			StringBuffer sb=new StringBuffer();
			List list=new ArrayList();
			sb.append("t1,t2.categoryName");
			String sqlField=sb.toString();
			String w="t1.id=t2.rateId ";
			w+=" and t1.id=t3.rateId ";
			w+=" and t2.cargoCategoryId=t4.id ";
			w+=" and t5.categoryId=t4.id";
			
			for(HtQuery hq:conditions){
				String name=hq.getKey();
				
				if(name.equals("custId")){
					w+=" and t3.custId="+hq.getValue();
				}
				else if(name.equals("cargoId")){
					w+=" and t5.id="+hq.getValue();
				}
				else if(name.equals("warehouseId")){
					
				}
				else if(name.equals("storageType")){
					if(hq.getValue().equals("0"))
						w+=" and t1.strongInFlag=1";
					else if(hq.getValue().equals("1"))
						w+=" and t1.strongOutFlag=1";
					else if(hq.getValue().equals("2"))
						w+=" and t1.strongInsideFlag=1";
					else if(hq.getValue().equals("3"))
						w+=" and t1.strongOtherFlag=1";
				}
				else
					w+=" and t3.custId=-1 and t5.id=-1 ";
			}
			list=query(null,null,sqlField,w,WRate.class,WRateSheet.class,WRateCust.class,WCargoCategory.class,WCargo.class);
			
			
			return list;
		}
		
		/**
		 * 根据条件查询审核人不为空的数据
		 * @param conditions
		 * @return ListWrate
		 */
		@SuppressWarnings("unchecked")
		@Override
		public List<WRate> queryRateByCust(final List<HtQuery> conditions) {	
			
			StringBuffer sb=new StringBuffer();
			List<WRate> list=new ArrayList<WRate>();
			sb.append("t1");
			String sqlField=sb.toString();
			String w="t1.id=t2.rateId and t1.checkBy is not null";
			
			for(HtQuery hq:conditions){
				String name=hq.getKey();
				
				if(name.equals("custId")){
					w+=" and t2.custId="+hq.getValue();
				}
				
				else if(name.equals("warehouseId")){
					
				}
				else if(name.equals("storageType")){
					if(hq.getValue().equals("0"))
						w+=" and t1.strongInFlag=1";
					else if(hq.getValue().equals("1"))
						w+=" and t1.strongOutFlag=1";
					else if(hq.getValue().equals("2"))
						w+=" and t1.strongInsideFlag=1";
					else if(hq.getValue().equals("3"))
						w+=" and t1.strongOtherFlag=1";
				}
				else
					w+=" and t3.custId=-1 and t5.id=-1 ";
			}
			list=query(null,null,sqlField,w,WRate.class,WRateCust.class);
			return list;
		}
		/**
		 * 根据出入库主表的ID(conditions)查询信息费率信息
		 * @param conditions
		 * @return ListWRate
		 */
		@SuppressWarnings("unchecked")
		public List<WRate> excelQueryRateAndSheet(List<HtQuery> conditions){
			StringBuffer sb=new StringBuffer();
			
			sb.append("select t1.STORAGE_NOTE_ID, ");//0
			sb.append("       t2.ID,t2.CHAR_ID,t2.CHAR_CODE,t2.CHAR_NAME, ");//1,2,3,4
			sb.append("       t2.MIN_QUANTITY,t2.UNIT,t2.UNIT_NAME, ");//5,6,7,8
			sb.append("       t2.RATE_TYPE,t2.FROM_DATE,t2.UNIT_PRICE,t2.CURR_CODE, ");//9,10,11,12
			sb.append("       t2.WAREHOUSE_TYPE,t2.COST_IN_FLAG,t2.STRONG_IN_FLAG,t2.STRONG_OUT_FLAG, ");//13,14,15,16
			sb.append("       t2.STRONG_INSIDE_FLAG,t2.STRONG_OTHER_FLAG,t2.FREE_TIME, ");//17,18,19,20
			sb.append("       t3.CARGO_ID,t3.SKU_NO,t3.CARGO_NAME,t3.CARGO_CATEGORY_ID ");//21,22,23,24
			sb.append(" from W_STORAGE_RATE as t1, ");
			sb.append("      W_RATE t2 ");
			sb.append(" left join W_RATE_SHEET t3 on (t2.ID=t3.RATE_ID) and t3.REMOVED=0 ");
			sb.append("where t1.RATE_ID=t2.ID and t2.REMOVED=0 and t1.REMOVED=0 ");
			
			for(HtQuery q:conditions)
			{
				if(q.getKey().equalsIgnoreCase("storageNoteIdList")){
					sb.append(" and t1.STORAGE_NOTE_ID in ("+q.getValue()+")");
				}
			}
			 DateFormat dtFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			 
			List resList=new ArrayList();
			List<WRate> wrList=new ArrayList<WRate>();
			resList=this.queryByNativeSql(sb.toString());
			for (Object object : resList) {
				WRate wr=new WRate();
				Object[] ob=(Object[])object;
				if(ob[0]!=null){
					wr.setStorageNoteId((Integer)ob[0]);
				}
				if(ob[1]!=null){
					wr.setId(Long.valueOf(ob[1].toString()));
				}
				if(ob[2]!=null){
					wr.setCharId((Integer)ob[2]);
				}
				if(ob[3]!=null){
					wr.setCharCode((String)ob[3]);
				}
				if(ob[4]!=null){
						wr.setCharName((String)ob[4]);			
								}
				if(ob[5]!=null){
					BigDecimal bd=(BigDecimal)ob[5];
					wr.setMinQuantity(bd.doubleValue());
				}
				
				if(ob[6]!=null){
					wr.setUnit((String)ob[6]);
				}
				if(ob[7]!=null){
					wr.setUnitName((String)ob[7]);
				}
				if(ob[8]!=null){
					wr.setRateType((String)ob[8]);
				}
				if(ob[9]!=null){
					//wr.setFromDate();
					/* try {  
				            //将字符串转换成日期格式   
				            Date date = dtFormat.parse(ob[10].toString()); 
				            wr.setFromDate(date);
				            System.out.println(date);  
				        } catch (ParseException e) {  
				            e.printStackTrace();  
				        }  */
					wr.setFromDate((Date)ob[9]);
				}
				if(ob[10]!=null){
					BigDecimal bd=(BigDecimal)ob[10];
					wr.setUnitPrice(bd.doubleValue());
				}
				if(ob[11]!=null){
					wr.setCurrCode((String)ob[11]);
				}
				if(ob[12]!=null){
					wr.setWarehouseType((String)ob[12]);
				}
				if(ob[13]!=null){
					wr.setCostInFlag((Byte)ob[13]);
				}
				if(ob[14]!=null){
					wr.setStrongInFlag((Byte)ob[14]);
				}
				if(ob[15]!=null){
					wr.setStrongOutFlag((Byte)ob[15]);
				}
				if(ob[16]!=null){
					wr.setStrongInsideFlag((Byte)ob[16]);
				}
				if(ob[17]!=null){
					wr.setStrongOtherFlag((Byte)ob[17]);
				}
				
				if(ob[18]!=null){
					wr.setFreeTime((Integer)ob[18]);
				}
				if(ob[19]!=null){
					wr.setCargoId((Integer)ob[19]);
				}
				if(ob[20]!=null){
					
				}
				if(ob[21]!=null){
					wr.setCargoName((String)ob[21]);
				}
				if(ob[22]!=null){
					
				}
				
				wrList.add(wr);
			}
			return wrList;
		}
	
}
