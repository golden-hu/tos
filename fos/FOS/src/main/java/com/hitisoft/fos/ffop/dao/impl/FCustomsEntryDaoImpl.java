package com.hitisoft.fos.ffop.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.dao.FCustomsEntryDao;
import com.hitisoft.fos.ffop.entity.FCustomsEntry;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class FCustomsEntryDaoImpl extends JpaDao<FCustomsEntry, Long> implements FCustomsEntryDao {
	public FCustomsEntryDaoImpl() {
		super(FCustomsEntry.class);
	}
}
