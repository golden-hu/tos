package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GPaymentTermDao;
import com.hitisoft.fos.general.entity.GPaymentTerm;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GPaymentTermDaoImpl extends JpaDao<GPaymentTerm, Long> implements GPaymentTermDao {
	public GPaymentTermDaoImpl() {
		super(GPaymentTerm.class);
	}
}
