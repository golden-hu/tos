package com.hitisoft.fos.tran.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TOilLogDao;
import com.hitisoft.fos.tran.entity.TOilLog;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class TOilLogDaoImpl extends JpaDao<TOilLog, Long> implements TOilLogDao {
	public TOilLogDaoImpl() {
		super(TOilLog.class);
	}
}
