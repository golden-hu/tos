package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PRoleFunctionDao;
import com.hitisoft.fos.sys.entity.PRoleFunction;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PRoleFunctionDaoImpl extends JpaDao<PRoleFunction, Long> implements PRoleFunctionDao {
	public PRoleFunctionDaoImpl() {
		super(PRoleFunction.class);
	}
}
