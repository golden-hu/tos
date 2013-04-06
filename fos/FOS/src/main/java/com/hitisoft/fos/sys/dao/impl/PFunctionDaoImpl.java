package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PFunctionDao;
import com.hitisoft.fos.sys.entity.PFunction;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PFunctionDaoImpl extends JpaDao<PFunction, Long> implements PFunctionDao {
	public PFunctionDaoImpl() {
		super(PFunction.class);
	}
}
