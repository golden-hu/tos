package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PGroupDao;
import com.hitisoft.fos.sys.entity.PGroup;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PGroupDaoImpl extends JpaDao<PGroup, Long> implements PGroupDao {
	public PGroupDaoImpl() {
		super(PGroup.class);
	}
}
