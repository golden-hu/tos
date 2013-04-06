package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PActionLogDao;
import com.hitisoft.fos.sys.entity.PActionLog;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PActionLogDaoImpl extends JpaDao<PActionLog, Long> implements PActionLogDao {
	public PActionLogDaoImpl() {
		super(PActionLog.class);
	}
}
