package com.hitisoft.fos.ffse.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffse.dao.SInvoiceEntryDao;
import com.hitisoft.fos.ffse.entity.SInvoiceEntry;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class SInvoiceEntryDaoImpl extends JpaDao<SInvoiceEntry, Long> implements SInvoiceEntryDao {
	public SInvoiceEntryDaoImpl() {
		super(SInvoiceEntry.class);
	}
}
