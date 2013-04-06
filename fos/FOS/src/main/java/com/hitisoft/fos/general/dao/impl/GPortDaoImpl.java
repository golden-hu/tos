package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GPortDao;
import com.hitisoft.fos.general.entity.GPort;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GPortDaoImpl extends JpaDao<GPort, Long> implements GPortDao {
	public GPortDaoImpl() {
		super(GPort.class);
	}
}
