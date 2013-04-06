package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GTransTypeDao;
import com.hitisoft.fos.general.entity.GTransType;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GTransTypeDaoImpl extends JpaDao<GTransType, Long> implements GTransTypeDao {
	public GTransTypeDaoImpl() {
		super(GTransType.class);
	}
}
