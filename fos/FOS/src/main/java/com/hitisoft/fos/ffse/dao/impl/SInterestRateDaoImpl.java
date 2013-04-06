package com.hitisoft.fos.ffse.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffse.dao.SInterestRateDao;
import com.hitisoft.fos.ffse.entity.SInterestRate;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class SInterestRateDaoImpl extends JpaDao<SInterestRate, Long> implements SInterestRateDao {
	public SInterestRateDaoImpl() {
		super(SInterestRate.class);
	}
}
