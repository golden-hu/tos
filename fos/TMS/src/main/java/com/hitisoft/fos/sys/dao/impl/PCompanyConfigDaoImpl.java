package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PCompanyConfigDao;
import com.hitisoft.fos.sys.entity.PCompanyConfig;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PCompanyConfigDaoImpl extends JpaDao<PCompanyConfig, Long> implements PCompanyConfigDao {
	public PCompanyConfigDaoImpl() {
		super(PCompanyConfig.class);
	}
}
