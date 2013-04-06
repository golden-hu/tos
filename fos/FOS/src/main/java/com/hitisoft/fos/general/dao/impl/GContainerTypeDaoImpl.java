package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GContainerTypeDao;
import com.hitisoft.fos.general.entity.GContainerType;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GContainerTypeDaoImpl extends JpaDao<GContainerType, Long> implements GContainerTypeDao {
	public GContainerTypeDaoImpl() {
		super(GContainerType.class);
	}
}
