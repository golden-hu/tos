package com.hitisoft.fos.tran.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TTransTypeDao;
import com.hitisoft.fos.tran.entity.TTransType;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class TTransTypeDaoImpl extends JpaDao<TTransType, Long> implements TTransTypeDao {
	public TTransTypeDaoImpl() {
		super(TTransType.class);
	}
}
