package com.hitisoft.fos.wms.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WWarehouseDao;
import com.hitisoft.fos.wms.entity.WWarehouse;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WWarehouseDaoImpl extends JpaDao<WWarehouse, Long> implements WWarehouseDao {
	public WWarehouseDaoImpl() {
		super(WWarehouse.class);
	}
}
