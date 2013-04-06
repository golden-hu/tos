package com.hitisoft.fos.ffop.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.dao.FWarehouseCargoDao;
import com.hitisoft.fos.ffop.entity.FWarehouseCargo;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class FWarehouseCargoDaoImpl extends JpaDao<FWarehouseCargo, Long> implements FWarehouseCargoDao {
	public FWarehouseCargoDaoImpl() {
		super(FWarehouseCargo.class);
	}
}
