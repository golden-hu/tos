package com.hitisoft.fos.wms.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WAreaDao;
import com.hitisoft.fos.wms.entity.WArea;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WAreaDaoImpl extends JpaDao<WArea, Long> implements WAreaDao {
	public WAreaDaoImpl() {
		super(WArea.class);
	}
}
