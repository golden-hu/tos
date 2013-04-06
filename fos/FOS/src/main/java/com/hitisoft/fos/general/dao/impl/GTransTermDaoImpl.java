package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GTransTermDao;
import com.hitisoft.fos.general.entity.GTransTerm;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GTransTermDaoImpl extends JpaDao<GTransTerm, Long> implements GTransTermDao {
	public GTransTermDaoImpl() {
		super(GTransTerm.class);
	}
}
