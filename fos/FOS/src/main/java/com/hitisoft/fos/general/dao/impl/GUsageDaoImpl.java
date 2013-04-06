package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GUsageDao;
import com.hitisoft.fos.general.entity.GUsage;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GUsageDaoImpl extends JpaDao<GUsage, Long> implements GUsageDao {
	public GUsageDaoImpl() {
		super(GUsage.class);
	}
}
