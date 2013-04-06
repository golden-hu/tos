package com.hitisoft.fos.wms.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WCargoCategoryDao;
import com.hitisoft.fos.wms.entity.WCargoCategory;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WCargoCategoryDaoImpl extends JpaDao<WCargoCategory, Long> implements WCargoCategoryDao {
	public WCargoCategoryDaoImpl() {
		super(WCargoCategory.class);
	}
}
