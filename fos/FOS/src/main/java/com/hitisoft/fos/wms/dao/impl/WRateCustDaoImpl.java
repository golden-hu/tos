package com.hitisoft.fos.wms.dao.impl;


import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WRateCustDao;
import com.hitisoft.fos.wms.entity.WRateCust;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WRateCustDaoImpl extends JpaDao<WRateCust, Long> implements WRateCustDao{
	public WRateCustDaoImpl()
	{
		super(WRateCust.class);
	}

}
