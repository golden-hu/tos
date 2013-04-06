package com.hitisoft.fos.wms.dao.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WAreaDao;
import com.hitisoft.fos.wms.dao.WCargoKzDao;
import com.hitisoft.fos.wms.entity.WArea;
import com.hitisoft.fos.wms.entity.WCargoKz;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.SessionContext;

@Repository
public class WCargoKzDaoImpl extends JpaDao<WCargoKz, Long> implements WCargoKzDao {
	
	@Autowired
	private SessionContext sessionContext;
	
	public WCargoKzDaoImpl() {
		super(WCargoKz.class);
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public List<WCargoKz> dailyInventory(){
		List list=new ArrayList();		//接收最后的查询结果的List
		StringBuffer str1= new StringBuffer();		
		str1.append("select t2.CARGO_OWNER_ID,");
		str1.append("       t1.CARGO_ID, ");      
		str1.append("		 sum(ifnull(t1.PICKED_QUANTITY,0))*-1 as q, ");
		str1.append("		 sum(ifnull(t1.PICKED_PACKAGES,0))*-1 as p, ");
		str1.append("		 sum(ifnull(t1.PICKED_GROSS_WEIGHT,0))*-1 as gw, ");
		str1.append("		 sum(ifnull(t1.PICKED_NET_WEIGHT,0))*-1 as nw, ");
		str1.append("		 sum(ifnull(t1.PICKED_VOLUME,0))*-1 as v, ");
		str1.append("		 sum(ifnull(t1.PICKED_MEASUREMENT,0))*-1 as m, ");
		str1.append("		 t1.UNIT_ID, ");
		str1.append("		 t1.P_UNIT_ID, ");
		str1.append("		 t1.W_UNIT_ID, ");
		str1.append("		 t1.V_UNIT_ID, ");
		str1.append("		 t1.M_UNIT_ID ");
		str1.append(" from w_picked_cargo t1, ");
		str1.append("      w_storage_note t2 ");
		str1.append(" where t1.OUT_STORAGE_NOTE_ID=t2.ID ");
		str1.append(" and t2.`STATUS`=5 ");
		str1.append(" and t1.REMOVED=0 ");
		//str1.append(" and Date(t1.placed_date)<=Date(now()) ");
		str1.append(" group by cargo_owner_id,cargo_id,unit_id ");
		str1.append(" union ");
		str1.append(" select t2.CARGO_OWNER_ID, ");      
		str1.append("        t1.CARGO_ID, ");       
		str1.append("        sum(ifnull(t1.QUANTITY,0)) as q, ");       
		str1.append("	     sum(ifnull(t1.PACKAGES,0)) as p, ");		 
		str1.append("	     sum(ifnull(t1.GROSS_WEIGHT,0)) as gw, ");		
		str1.append("	     sum(ifnull(t1.NET_WEIGHT,0)) as nw, ");
		str1.append("	     sum(ifnull(t1.VOLUME,0)) as v, ");		 
		str1.append("	     sum(ifnull(t1.MEASURE,0)) as m, ");
		str1.append("	     t1.UNIT_ID, ");
		str1.append("	     t1.P_UNIT_ID, ");
		str1.append("	     t1.W_UNIT_ID, ");
		str1.append("	     t1.V_UNIT_ID, ");
		str1.append("	     t1.M_UNIT_ID ");
		str1.append(" from w_placed_cargo t1, ");
		str1.append("      w_storage_note t2 ");
		str1.append(" where t1.STORAGE_NOTE_ID=t2.ID ");
		str1.append("  and t1.`STATUS`=5 ");
		str1.append("  and t1.REMOVED=0 ");
		str1.append("  and t2.REMOVED=0 ");
		//str1.append("  and Date(t1.picked_date)<=Date(now()) ");
		str1.append(" group by cargo_owner_id,cargo_id,unit_id ");
		
		StringBuffer str= new StringBuffer();
		str.append(" select t3.cargo_owner_id as custId, ");		
		str.append("		 t3.cargo_id, ");
		str.append("		 sum(t3.q), ");
		str.append("		 sum(t3.p), ");
		str.append("		 sum(t3.gw), ");
		str.append("		 sum(t3.nw), ");
		str.append("		 sum(t3.v), ");
		str.append("		 sum(t3.m), ");		
		str.append("		 t3.UNIT_ID, ");
		str.append("		 t3.P_UNIT_ID, ");
		str.append("		 t3.W_UNIT_ID, ");
		str.append("		 t3.V_UNIT_ID, ");
		str.append("		 t3.M_UNIT_ID ");
		str.append(" from (  ");
		str.append( str1);
		str.append(" ) as t3 ");
		str.append(" group by cargo_owner_id,cargo_id,unit_id ");
		
		list=this.queryByNativeSql(str.toString());
		
		List<WCargoKz> resList=new ArrayList();
		for (Object object : list) {
			WCargoKz ckz=new WCargoKz();
			Object[] ob=(Object[])object;
			if(ob[0]!=null){
				ckz.setCustId((Integer)ob[0]);				
			}
			if(ob[1]!=null){
				ckz.setCargoId((Integer)ob[1]);				
			}
			if(ob[2]!=null){
				BigDecimal n=(BigDecimal)ob[2];
				ckz.setQ(n.doubleValue());				
			}
			if(ob[3]!=null){
				BigDecimal n=(BigDecimal)ob[3];
				ckz.setP(n.doubleValue());				
			}
			if(ob[4]!=null){
				BigDecimal n=(BigDecimal)ob[4];
				ckz.setGw(n.doubleValue());				
			}
			if(ob[5]!=null){
				BigDecimal n=(BigDecimal)ob[5];
				ckz.setNw(n.doubleValue());				
			}
			if(ob[6]!=null){
				BigDecimal n=(BigDecimal)ob[6];
				ckz.setV(n.doubleValue());				
			}
			if(ob[7]!=null){
				BigDecimal n=(BigDecimal)ob[7];
				ckz.setM(n.doubleValue());				
			}
			if(ob[8]!=null){
				ckz.setUnitId((Integer)ob[8]);				
			}
			if(ob[9]!=null){
				ckz.setpUnitId((Integer)ob[9]);				
			}
			if(ob[10]!=null){
				ckz.setwUnitId((Integer)ob[10]);				
			}
			if(ob[11]!=null){
				ckz.setvUnitId((Integer)ob[11]);				
			}
			if(ob[12]!=null){
				ckz.setmUnitId((Integer)ob[12]);				
			}
			
			ckz.setRowAction(RowAction.N);
			resList.add(ckz);
		}
		
		
		//this.
		return resList;
	}
}
