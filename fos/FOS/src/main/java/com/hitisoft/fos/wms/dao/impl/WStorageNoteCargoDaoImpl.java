package com.hitisoft.fos.wms.dao.impl;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;


import com.hitisoft.fos.wms.dao.WStorageNoteCargoDao;
import com.hitisoft.fos.wms.entity.WCargo;
import com.hitisoft.fos.wms.entity.WStorageNote;
import com.hitisoft.fos.wms.entity.WStorageNoteCargo;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;

@Repository
public class WStorageNoteCargoDaoImpl extends JpaDao<WStorageNoteCargo, Long> implements WStorageNoteCargoDao {
	public WStorageNoteCargoDaoImpl() {
		super(WStorageNoteCargo.class);
	}
	
	/**
	 * 根据条件查询货物信息
	 * @param  conditions
	 * @return ListWstorageNoteCargo
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<WStorageNoteCargo> excelQuery(final List<HtQuery> conditions) {
		StringBuffer sb=new StringBuffer();
		List list=new ArrayList();
		sb.append("t1,t2.custId,t2.custName,t2.actureTime,t2.orderNo");
		String sqlField=sb.toString();
		String w="t1.storageNoteId=t2.id";
		list=query(conditions,null,sqlField,w,WStorageNoteCargo.class,WStorageNote.class);
		return list;
	}
	
		/**
		 * 根据传入的ID查询货物的详细信息
		 * @param conditions
		 * @return ListWStorageNoteCargo
		 */
		@SuppressWarnings("unchecked")
		@Override
		public List<WStorageNoteCargo> excelQueryStorageNoteCargo(final List<HtQuery> conditions) {
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
			list=query(conditions,null,sqlField,w,WStorageNoteCargo.class,WStorageNote.class);
			List<WStorageNoteCargo> sncList=new ArrayList<WStorageNoteCargo>();
			for(Object object:list){
				Object[] obj=(Object[])object;
				WStorageNoteCargo snc=(WStorageNoteCargo)obj[0];
				if(obj[1]!=null){
					snc.setCustId((Integer)obj[1]);
				}
				if(obj[2]!=null){
					snc.setCustName(obj[2].toString());
								}
				if(obj[3]!=null){
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
				sncList.add(snc);
			}
			return sncList;
		}

	/**
	 * 根据货物主单ID查询货物详细信息
	 * @param id
	 * @return ListWStorageNoteCargo
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<WStorageNoteCargo> findStorageNoteCargoByStorageNoteId(Integer id) {
		String sql=" t1 ";
		String where=" t1.storageNoteId='"+id+"' ";
		return query(null,null,sql,where,WStorageNoteCargo.class,WStorageNote.class);
	}
	
	/**
	 * 根据货物主单ID查询货物详细信息并根据货物类别分组生成陆运单用
	 * @param id
	 * @return ListWStorageNoteCargo
	 */
	@SuppressWarnings({ "unchecked" })
	@Override
	public List<WStorageNoteCargo> gentTConsignCargo(Integer id) {
			 String sql=" t1.cargoName , t1.cargoId  ,t1.pUnit  , ";
			 sql+=" sum(t1.pickedGrossWeight) as pickedGrossWeight ,";
			 sql+=" t2.categoryId , t2.categoryName , t1.remarks , ";
			 sql+=" sum(t1.pickedQuantity) as pickedQuantity ,";
			 sql+=" sum(t1.pickedVolume) as pickedVolume ";
			 String where=" t1.storageNoteId="+id.intValue();
			 where += " AND t1.cargoId=t2.id  GROUP BY t2.categoryName ";
			 return query(null,null,sql,where,WStorageNoteCargo.class,WCargo.class);
		}

}
