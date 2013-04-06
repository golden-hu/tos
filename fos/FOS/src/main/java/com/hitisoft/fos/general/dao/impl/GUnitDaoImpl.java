package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GUnitDao;
import com.hitisoft.fos.general.entity.GUnit;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GUnitDaoImpl extends JpaDao<GUnit, Long> implements GUnitDao {
	public GUnitDaoImpl() {
		super(GUnit.class);
	}
}
