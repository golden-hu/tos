package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.CCustomerCategoryDao;
import com.hitisoft.fos.sys.entity.CCustomerCategory;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class CCustomerCategoryDaoImpl extends JpaDao<CCustomerCategory, Long> implements CCustomerCategoryDao {
	public CCustomerCategoryDaoImpl() {
		super(CCustomerCategory.class);
	}
}
