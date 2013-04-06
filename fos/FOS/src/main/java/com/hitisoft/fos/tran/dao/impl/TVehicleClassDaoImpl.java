package com.hitisoft.fos.tran.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TVehicleClassDao;
import com.hitisoft.fos.tran.entity.TVehicleClass;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class TVehicleClassDaoImpl extends JpaDao<TVehicleClass, Long> implements TVehicleClassDao {
	public TVehicleClassDaoImpl() {
		super(TVehicleClass.class);
	}
}
