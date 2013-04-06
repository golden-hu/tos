package com.hitisoft.fos.wms.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WCargoDao;
import com.hitisoft.fos.wms.entity.WCargo;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WCargoDaoImpl extends JpaDao<WCargo, Long> implements WCargoDao {
	public WCargoDaoImpl() {
		super(WCargo.class);
	}

	@SuppressWarnings({ "unchecked" })
	@Override
	public List<WCargo> FindByIdUnit(Integer cargoId) {
		String sql=" t1";
		String where=" removed=0 ";		
		List<WCargo> listCargo=this.query(null, null, sql, where, WCargo.class);
		return listCargo;
	}

}
