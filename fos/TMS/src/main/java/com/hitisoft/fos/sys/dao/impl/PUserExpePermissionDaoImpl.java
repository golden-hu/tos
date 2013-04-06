package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PUserExpePermissionDao;
import com.hitisoft.fos.sys.entity.PUserExpePermission;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PUserExpePermissionDaoImpl extends JpaDao<PUserExpePermission, Long> implements PUserExpePermissionDao {
	public PUserExpePermissionDaoImpl() {
		super(PUserExpePermission.class);
	}
}
