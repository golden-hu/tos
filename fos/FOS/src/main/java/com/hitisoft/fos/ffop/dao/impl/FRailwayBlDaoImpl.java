package com.hitisoft.fos.ffop.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.dao.FRailwayBlDao;
import com.hitisoft.fos.ffop.entity.FRailwayBl;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class FRailwayBlDaoImpl extends JpaDao<FRailwayBl, Long> implements FRailwayBlDao {
	public FRailwayBlDaoImpl() {
		super(FRailwayBl.class);
	}
}
