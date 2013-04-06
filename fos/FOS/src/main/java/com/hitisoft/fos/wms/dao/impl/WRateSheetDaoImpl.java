package com.hitisoft.fos.wms.dao.impl;


import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WRateSheetDao;
import com.hitisoft.fos.wms.entity.WRateSheet;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WRateSheetDaoImpl extends JpaDao<WRateSheet, Long> implements WRateSheetDao{
	public WRateSheetDaoImpl()
	{
		super(WRateSheet.class);
	}

}
