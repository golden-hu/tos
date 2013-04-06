package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GTradeTermDao;
import com.hitisoft.fos.general.entity.GTradeTerm;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GTradeTermDaoImpl extends JpaDao<GTradeTerm, Long> implements GTradeTermDao {
	public GTradeTermDaoImpl() {
		super(GTradeTerm.class);
	}
}
