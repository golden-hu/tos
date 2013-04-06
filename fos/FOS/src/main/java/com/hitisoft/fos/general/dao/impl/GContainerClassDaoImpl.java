package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GContainerClassDao;
import com.hitisoft.fos.general.entity.GContainerClass;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GContainerClassDaoImpl extends JpaDao<GContainerClass, Long> implements GContainerClassDao {
	public GContainerClassDaoImpl() {
		super(GContainerClass.class);
	}
}
