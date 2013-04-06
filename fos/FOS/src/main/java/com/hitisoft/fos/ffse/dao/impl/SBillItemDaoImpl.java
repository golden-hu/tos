package com.hitisoft.fos.ffse.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffse.dao.SBillItemDao;
import com.hitisoft.fos.ffse.entity.SBillItem;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class SBillItemDaoImpl extends JpaDao<SBillItem, Long> implements SBillItemDao {
	public SBillItemDaoImpl() {
		super(SBillItem.class);
	}
}
