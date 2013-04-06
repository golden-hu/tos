package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GPackageDao;
import com.hitisoft.fos.general.entity.GPackage;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GPackageDaoImpl extends JpaDao<GPackage, Long> implements GPackageDao {
	public GPackageDaoImpl() {
		super(GPackage.class);
	}
}
