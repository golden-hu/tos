package com.hitisoft.fos.wms.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WAreaDao;
import com.hitisoft.fos.wms.dao.WStorageRateDao;
import com.hitisoft.fos.wms.entity.WArea;
import com.hitisoft.fos.wms.entity.WStorageRate;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WStorageRateDaoImpl extends JpaDao<WStorageRate, Long> implements WStorageRateDao {
	public WStorageRateDaoImpl() {
		super(WStorageRate.class);
	}
}
