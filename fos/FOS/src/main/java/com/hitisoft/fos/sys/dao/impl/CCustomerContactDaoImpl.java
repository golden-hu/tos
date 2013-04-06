package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.CCustomerContactDao;
import com.hitisoft.fos.sys.entity.CCustomerContact;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class CCustomerContactDaoImpl extends JpaDao<CCustomerContact, Long> implements CCustomerContactDao {
	public CCustomerContactDaoImpl() {
		super(CCustomerContact.class);
	}
}
