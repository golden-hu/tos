package com.hitisoft.fos.wms.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WPickedCargoDao;
import com.hitisoft.fos.wms.entity.WPickedCargo;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WPickedCargoDaoImpl extends JpaDao<WPickedCargo, Long> implements WPickedCargoDao {
	public WPickedCargoDaoImpl() {
		super(WPickedCargo.class);
	}

	/**
	 * 根据出库单ID查询拣货物信息
	 * @param 出库单ID
	 * @return ListWpickedCargo
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<WPickedCargo> findByStorageNoteId(Integer id) {
		String sql=" t1 ";
		String where=" t1.outStorageNoteId='"+id+"'";
		return query(null,null,sql,where,WPickedCargo.class);
	}
}
