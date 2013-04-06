package com.hitisoft.fos.ffse.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffse.dao.SPrItemDao;
import com.hitisoft.fos.ffse.entity.SPrItem;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class SPrItemDaoImpl extends JpaDao<SPrItem, Long> implements SPrItemDao {
	public SPrItemDaoImpl() {
		super(SPrItem.class);
	}
}
