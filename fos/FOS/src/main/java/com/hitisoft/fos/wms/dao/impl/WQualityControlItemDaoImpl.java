package com.hitisoft.fos.wms.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import com.hitisoft.fos.wms.dao.WQualityControlItemDao;
import com.hitisoft.fos.wms.entity.WQualityControlItem;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;

@Repository
public class WQualityControlItemDaoImpl extends JpaDao<WQualityControlItem, Long> implements WQualityControlItemDao {
	public WQualityControlItemDaoImpl() {
		super(WQualityControlItem.class);
	}


	/**
	 * 根据出入库单号查询货物信息
	 * @param conditions
	 * @return ListWQualityControlItem
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public List<WQualityControlItem> getQualityControl(List<HtQuery> conditions) {
		List list=new ArrayList();
		String sql="t1";
		String where=new String();
		where="";
		for(HtQuery q:conditions){
			if(q.getKey().equals("storageNoteNo")){
				where+="t1.storageNoteNo like '%" +q.getValue()+"%'";
			}
		}
		list=query(null,null,sql,where,WQualityControlItem.class);
		return list;
	}
}