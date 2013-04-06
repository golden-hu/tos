package com.hitisoft.fos.wms.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WTransListDao;
import com.hitisoft.fos.wms.entity.WTransList;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WTransListDaoImpl extends JpaDao<WTransList, Long> implements WTransListDao {
	public WTransListDaoImpl() {
		super(WTransList.class);
	}
}
