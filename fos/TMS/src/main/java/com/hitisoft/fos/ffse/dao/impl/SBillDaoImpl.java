package com.hitisoft.fos.ffse.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffse.dao.SBillDao;
import com.hitisoft.fos.ffse.entity.SBill;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class SBillDaoImpl extends JpaDao<SBill, Long> implements SBillDao {
	public SBillDaoImpl() {
		super(SBill.class);
	}
}
