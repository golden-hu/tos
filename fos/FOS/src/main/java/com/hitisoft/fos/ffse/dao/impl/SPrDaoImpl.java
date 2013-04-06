package com.hitisoft.fos.ffse.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffse.dao.SPrDao;
import com.hitisoft.fos.ffse.entity.SPr;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class SPrDaoImpl extends JpaDao<SPr, Long> implements SPrDao {
	public SPrDaoImpl() {
		super(SPr.class);
	}
}
