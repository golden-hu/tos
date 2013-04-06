package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PTaskTypeDao;
import com.hitisoft.fos.sys.entity.PTaskType;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PTaskTypeDaoImpl extends JpaDao<PTaskType, Long> implements PTaskTypeDao {
	public PTaskTypeDaoImpl() {
		super(PTaskType.class);
	}
}
