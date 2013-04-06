package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PTableInfoDao;
import com.hitisoft.fos.sys.entity.PTableInfo;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PTableInfoDaoImpl extends JpaDao<PTableInfo, Long> implements PTableInfoDao {
	public PTableInfoDaoImpl() {
		super(PTableInfo.class);
	}
}
