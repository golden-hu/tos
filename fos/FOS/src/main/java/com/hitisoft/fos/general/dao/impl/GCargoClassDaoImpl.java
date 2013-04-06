package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GCargoClassDao;
import com.hitisoft.fos.general.entity.GCargoClass;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GCargoClassDaoImpl extends JpaDao<GCargoClass, Long> implements GCargoClassDao {
	public GCargoClassDaoImpl() {
		super(GCargoClass.class);
	}
}
