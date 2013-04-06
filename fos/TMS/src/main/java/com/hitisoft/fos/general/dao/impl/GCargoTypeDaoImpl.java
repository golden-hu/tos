package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GCargoTypeDao;
import com.hitisoft.fos.general.entity.GCargoType;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GCargoTypeDaoImpl extends JpaDao<GCargoType, Long> implements GCargoTypeDao {
	public GCargoTypeDaoImpl() {
		super(GCargoType.class);
	}
}
