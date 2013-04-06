package com.hitisoft.fos.wms.dao.impl;


import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WProcessItemDao;
import com.hitisoft.fos.wms.entity.WProcessItem;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WProcessItemDaoImpl extends JpaDao<WProcessItem, Long> implements WProcessItemDao{
	public WProcessItemDaoImpl()
	{
		super(WProcessItem.class);
	}

}
