package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GCurrencyDao;
import com.hitisoft.fos.general.entity.GCurrency;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GCurrencyDaoImpl extends JpaDao<GCurrency, Long> implements GCurrencyDao {
	public GCurrencyDaoImpl() {
		super(GCurrency.class);
	}
}
