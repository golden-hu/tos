package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PRoleDao;
import com.hitisoft.fos.sys.entity.PRole;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PRoleDaoImpl extends JpaDao<PRole, Long> implements PRoleDao {
	public PRoleDaoImpl() {
		super(PRole.class);
	}
}
