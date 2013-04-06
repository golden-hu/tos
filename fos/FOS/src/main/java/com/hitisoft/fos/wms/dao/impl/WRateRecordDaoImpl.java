package com.hitisoft.fos.wms.dao.impl;


import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WRateRecordDao;
import com.hitisoft.fos.wms.entity.WRateRecord;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WRateRecordDaoImpl extends JpaDao<WRateRecord, Long> implements WRateRecordDao{
	public WRateRecordDaoImpl()
	{
		super(WRateRecord.class);
	}

}
