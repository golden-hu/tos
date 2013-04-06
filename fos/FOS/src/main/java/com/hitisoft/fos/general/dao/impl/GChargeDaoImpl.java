package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GChargeDao;
import com.hitisoft.fos.general.entity.GCharge;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GChargeDaoImpl extends JpaDao<GCharge, Long> implements GChargeDao {
	public GChargeDaoImpl() {
		super(GCharge.class);
	}
}
