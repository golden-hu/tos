package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.CCommissionDao;
import com.hitisoft.fos.sys.entity.CCommission;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class CCommissionDaoImpl extends JpaDao<CCommission, Long> implements CCommissionDao {
	public CCommissionDaoImpl() {
		super(CCommission.class);
	}
}
