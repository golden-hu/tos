package com.hitisoft.fos.ws.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ws.dao.WBlMDao;
import com.hitisoft.fos.ws.entity.WBlM;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WBlMDaoImpl extends JpaDao<WBlM, Long> implements WBlMDao {
	public WBlMDaoImpl() {
		super(WBlM.class);
	}
}
