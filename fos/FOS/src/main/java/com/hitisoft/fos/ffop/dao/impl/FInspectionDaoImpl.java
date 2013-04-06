package com.hitisoft.fos.ffop.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.dao.FInspectionDao;
import com.hitisoft.fos.ffop.entity.FInspection;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class FInspectionDaoImpl extends JpaDao<FInspection, Long> implements FInspectionDao {
	public FInspectionDaoImpl() {
		super(FInspection.class);
	}
}
