package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.CCommissionItemDao;
import com.hitisoft.fos.sys.entity.CCommissionItem;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class CCommissionItemDaoImpl extends JpaDao<CCommissionItem, Long> implements CCommissionItemDao {
	public CCommissionItemDaoImpl() {
		super(CCommissionItem.class);
	}
}
