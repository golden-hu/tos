package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.CPriceRecordDao;
import com.hitisoft.fos.sys.entity.CPriceRecord;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class CPriceRecordDaoImpl extends JpaDao<CPriceRecord, Long> implements CPriceRecordDao {
	public CPriceRecordDaoImpl() {
		super(CPriceRecord.class);
	}
}
