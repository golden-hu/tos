package com.hitisoft.fos.ffse.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffse.dao.SInvoiceNoDao;
import com.hitisoft.fos.ffse.entity.SInvoiceNo;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class SInvoiceNoDaoImpl extends JpaDao<SInvoiceNo, Long> implements SInvoiceNoDao {
	public SInvoiceNoDaoImpl() {
		super(SInvoiceNo.class);
	}
}
