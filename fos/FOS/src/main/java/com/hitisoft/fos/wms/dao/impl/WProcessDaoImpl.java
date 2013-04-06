package com.hitisoft.fos.wms.dao.impl;


import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WProcessDao;
import com.hitisoft.fos.wms.entity.WProcess;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WProcessDaoImpl extends JpaDao<WProcess, Long> implements WProcessDao{
	public WProcessDaoImpl()
	{
		super(WProcess.class);
	}

}