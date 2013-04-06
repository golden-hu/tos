package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GChargeClassDao;
import com.hitisoft.fos.general.entity.GChargeClass;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GChargeClassDaoImpl extends JpaDao<GChargeClass, Long> implements GChargeClassDao {
	public GChargeClassDaoImpl() {
		super(GChargeClass.class);
	}
}
