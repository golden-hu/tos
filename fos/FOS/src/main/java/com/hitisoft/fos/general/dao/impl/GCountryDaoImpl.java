package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GCountryDao;
import com.hitisoft.fos.general.entity.GCountry;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GCountryDaoImpl extends JpaDao<GCountry, Long> implements GCountryDao {
	public GCountryDaoImpl() {
		super(GCountry.class);
	}
}
