package com.hitisoft.fos.wms.dao.impl;


import org.springframework.stereotype.Repository;


import com.hitisoft.fos.wms.dao.WStockTakingDao;

import com.hitisoft.fos.wms.entity.WStockTaking;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WStockTakingDaoImpl extends JpaDao<WStockTaking, Long> implements WStockTakingDao{
	public WStockTakingDaoImpl()
	{
		super(WStockTaking.class);
	}

}
