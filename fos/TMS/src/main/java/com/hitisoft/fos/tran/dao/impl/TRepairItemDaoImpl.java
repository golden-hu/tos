package com.hitisoft.fos.tran.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TRepairItemDao;
import com.hitisoft.fos.tran.entity.TRepairItem;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class TRepairItemDaoImpl extends JpaDao<TRepairItem, Long> implements TRepairItemDao {
	public TRepairItemDaoImpl() {
		super(TRepairItem.class);
	}
}
