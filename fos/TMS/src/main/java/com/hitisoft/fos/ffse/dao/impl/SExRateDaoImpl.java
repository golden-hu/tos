package com.hitisoft.fos.ffse.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffse.dao.SExRateDao;
import com.hitisoft.fos.ffse.entity.SExRate;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class SExRateDaoImpl extends JpaDao<SExRate, Long> implements SExRateDao {
	public SExRateDaoImpl() {
		super(SExRate.class);
	}
}
