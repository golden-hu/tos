package com.hitisoft.fos.wms.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WBlockDao;
import com.hitisoft.fos.wms.entity.WBlock;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class WBlockDaoImpl extends JpaDao<WBlock, Long> implements WBlockDao {
	@Autowired
	private RequestContext requestContext;
	
	public WBlockDaoImpl() {
		super(WBlock.class);
	}
	/**
	 * 根据条件查询库位信息包括分页的处理
	 * @param conditions
	 * @return List
	 */
	@SuppressWarnings("rawtypes")
	public List superQuery(List<HtQuery> conditions) {
		
		//String start=requestContext.get("start");
		//String limit=requestContext.get("limit");
		String s=requestContext.get('S');
		int pageSize=0;			//分页时每页显示的记录数
		int pageStart=0;
		//返回结果
		
		List resultList=new ArrayList();
		
		/*
		 * 执行库位的挑远页面SQL
		 * 1、先编写里层sql
		 * 2、再写外层SQL
		 * 3、拼接过滤语句
		 * 4、group by语句
		 */
		StringBuffer sbHSql=new StringBuffer();//里层SQL
		StringBuffer sbMainSql=new StringBuffer();//主SQL
		StringBuffer sbWhereSql=new StringBuffer();
		
		
		//构建过滤条件
		for(HtQuery q:conditions)
		{
			if(q.getKey().equalsIgnoreCase("blockCode")){
				sbWhereSql.append(" and W_BLOCK.BLOCK_CODE like '%"+q.getValue()+"%'");
			}
			else if(q.getKey().equalsIgnoreCase("blockName")){
				sbWhereSql.append(" and W_BLOCK.BLOCK_NAME like '%"+q.getValue()+"%'");
			}
			else if(q.getKey().equalsIgnoreCase("warehouseName")){
				sbWhereSql.append(" and W_BLOCK.WAREHOUSE_NAME='"+q.getValue()+"'");
			}
			else if(q.getKey().equalsIgnoreCase("areaName")){
				sbWhereSql.append(" and W_BLOCK.AREA_NAME='"+q.getValue()+"'");
			}
			else if(q.getKey().equalsIgnoreCase("warehouseId")){
				sbWhereSql.append(" and W_BLOCK.WAREHOUSE_ID='"+q.getValue()+"'");
			}
			else if(q.getKey().equalsIgnoreCase("areaId")){
				sbWhereSql.append(" and W_BLOCK.AREA_ID='"+q.getValue()+"'");
			}
			else if(q.getKey().equalsIgnoreCase("all")){
				if(q.getValue().equalsIgnoreCase("1")){
					sbWhereSql.append(" and ifnull(pc.nowQuantity,0)=0 ");
				}
			}
			
		}
		/*if(!s.isEmpty()){
			if(s=="1")
			   sbWhereSql.append(" and ifnull(pc.nowQuantity,0)=0 ");
		}*/
		
		//构建里层从表SQL
		sbHSql.append(" select BLOCK_ID,BLOCK_NAME,");
		sbHSql.append("        	sum(ifnull(QUANTITY,0)-ifnull(PICKED_QUANTITY,0)) as nowQuantity,");
		sbHSql.append("         sum(ifnull(PACKAGES,0)-ifnull(PICKED_PACKAGES,0)) as nowPackages,");
		sbHSql.append("         sum(ifnull(GROSS_WEIGHT,0)-ifnull(PICKED_GROSS_WEIGHT,0)) as nowGrossWeight,");
		sbHSql.append("         sum(ifnull(VOLUME,0)-ifnull(PICKED_VOLUME,0)) as nowVolume,");
		sbHSql.append("         sum(ifnull(MEASURE,0)-ifnull(PICKED_MEASUREMENT,0)) as nowMeasure");
		sbHSql.append("   from W_PLACED_CARGO ");
		sbHSql.append("  where REMOVED=0 ");
		sbHSql.append("  group by BLOCK_ID,BLOCK_NAME ");
		
		//构建主SQL
		sbMainSql.append(" select W_BLOCK.ID,W_BLOCK.BLOCK_CODE,W_BLOCK.BLOCK_NAME,W_BLOCK.BLOCK_NAME_EN,");//0,1,2,3
		sbMainSql.append("		  W_BLOCK.AREA_ID,  W_BLOCK.AREA_CODE,  W_BLOCK.AREA_NAME,  ");				//4,5,6
		sbMainSql.append("		  W_BLOCK.WAREHOUSE_ID,W_BLOCK.WAREHOUSE_CODE,  W_BLOCK.WAREHOUSE_NAME,  "); //7,8,9
		sbMainSql.append("		  W_BLOCK.IN_AREA_ID,  W_BLOCK.IN_AREA_CODE,  W_BLOCK.IN_AREA_NAME,  "); 	//10,11,12
		sbMainSql.append("		  W_BLOCK.OUT_AREA_ID,  W_BLOCK.OUT_AREA_CODE,  W_BLOCK.OUT_AREA_NAME,  ");	//13,14,15
		sbMainSql.append("		  W_BLOCK.BLOCK_TYPE,  W_BLOCK.BLOCK_LENGTH,  W_BLOCK.BLOCK_WIDTH,  W_BLOCK.BLOCK_HEIGHT,  ");//16,17,18,19
		sbMainSql.append("		  W_BLOCK.BLOCK_ROW,  W_BLOCK.BLOCK_COL,  W_BLOCK.BLOCK_LAYER,  ");			//20,21,22
		sbMainSql.append("		  W_BLOCK.BLOCK_X,  W_BLOCK.BLOCK_Y,  W_BLOCK.BLOCK_Z,W_BLOCK.BLOCK_GROUP,  ");//23,24,25,26
		sbMainSql.append("		  W_BLOCK.MAX_WEIGHT, W_BLOCK.MAX_VOLUME,   W_BLOCK.MAX_QUANTITY,  W_BLOCK.MAX_PALLET, "); //27,28,29,30
		sbMainSql.append("		  W_BLOCK.CARGO_MIX_FLAG,  W_BLOCK.BATCH_MIX_FLAG,  ");//31,32
		sbMainSql.append("		  LEFT(W_BLOCK.REMARK,256),   ");//33
		sbMainSql.append("		  W_BLOCK.SHELVES_ORDER,  W_BLOCK.PICK_ORDER,  W_BLOCK.LOCATION_USING,  W_BLOCK.LOCATION_ATTRIBUTE,  ");	//34,35,36,37		
		sbMainSql.append("		  W_BLOCK.LOCATION_PROCESSING,  W_BLOCK.TURNOVER_DEMAND,  W_BLOCK.INVENTORY_CONDITION,  ");//38,39,40
		sbMainSql.append("		  W_BLOCK.LOCAL_GROUP1,  W_BLOCK.LOCAL_GROUP2,W_BLOCK.MAX_AREA,  W_BLOCK.COORDINATE_Z, ");//41,42,43,44
		sbMainSql.append("		  W_BLOCK.STORE_TYPE_ID,  W_BLOCK.STORE_TYPE_NAME,  W_BLOCK.LOCATION_BAR_CODE,  ");//45,46,47
		//48,49,50,51,52,53
		sbMainSql.append("		  W_BLOCK.STATUS,W_BLOCK.CREATE_BY,  W_BLOCK.CREATE_TIME,  W_BLOCK.MODIFY_BY,  W_BLOCK.MODIFY_TIME,  W_BLOCK.COMP_CODE, "); 
		sbMainSql.append("		  W_BLOCK.VERSION,  W_BLOCK.REMOVED,  W_BLOCK.UUID,");//54,55,56
		sbMainSql.append("        nowQuantity,");//57,
		sbMainSql.append("        nowPackages,");//58
		sbMainSql.append("        nowGrossWeight,");//59
		sbMainSql.append("        nowVolume,");//60
		sbMainSql.append("        nowMeasure");//61
		sbMainSql.append("  from W_BLOCK ");
		sbMainSql.append("  left join (");
		sbMainSql.append(sbHSql.toString());
		sbMainSql.append(" ) as pc ");
		sbMainSql.append("    on pc.BLOCK_ID=W_BLOCK.id");
		sbMainSql.append(" where W_BLOCK.REMOVED=0 ");
		//sbMainSql.append(" and  pc.nowQuantity=0 ");
		sbMainSql.append(sbWhereSql.toString());
		
		
		String sqlGetCount="";
		
		sqlGetCount="select count(*) as nums from ("+sbMainSql.toString() + ") as pagecount";
		
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
			//sql=sql+" limit "+pageStart+","+pageSize;
			sbMainSql.append(" limit "+pageStart+","+pageSize );
		}
		
		//sbMainSql.append(" limit "+start+","+limit );
		
		
		resultList=this.queryByNativeSql(sbMainSql.toString());
		
		return resultList;
	}
	
	/**
	 * 根据库位名称查询
	 * @param blockName
	 * @return 查出的记录数
	 */
	@SuppressWarnings("unchecked")
	@Override
	public Integer checkNoDBName(String blockName) {
		List<WBlock> record;
		String sql =" select t1.BLOCK_NAME ,t1.BLOCK_CODE from W_BLOCK t1 where t1.REMOVED=0 and t1.BLOCK_NAME='"+blockName+"'";
		record=(List<WBlock>) this.queryByNativeSql(sql);
		Integer size=record.size();
		return  size;
	}
	/**
	 * 根据库位代码查询
	 * @param blockCode
	 * @return 查询出来的记录数
	 */
	@SuppressWarnings("unchecked")
	@Override
	public Integer checkNoDBCode(String blockCode) {
		List<WBlock> record;
		String sql =" select t1.BLOCK_NAME ,t1.BLOCK_CODE from W_BLOCK t1 where t1.REMOVED=0 and t1.BLOCK_CODE='"+blockCode+"'";
		record=(List<WBlock>) this.queryByNativeSql(sql);
		Integer size=record.size();
		return  size;
	}
}
