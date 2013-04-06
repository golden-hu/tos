package com.hitisoft.fos.ffop.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.dao.FWarehouseDao;
import com.hitisoft.fos.ffop.entity.FWarehouse;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class FWarehouseDaoImpl extends JpaDao<FWarehouse, Long> implements FWarehouseDao {
	public FWarehouseDaoImpl() {
		super(FWarehouse.class);
	}
}
