package com.hitisoft.fos.tran.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TRepairLogDao;
import com.hitisoft.fos.tran.entity.TRepairLog;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class TRepairLogDaoImpl extends JpaDao<TRepairLog, Long> implements TRepairLogDao {
	public TRepairLogDaoImpl() {
		super(TRepairLog.class);
	}
}
