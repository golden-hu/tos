package com.hitisoft.fos.tran.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TAccidentDao;
import com.hitisoft.fos.tran.entity.TAccident;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class TAccidentDaoImpl extends JpaDao<TAccident, Long> implements TAccidentDao {
	public TAccidentDaoImpl() {
		super(TAccident.class);
	}
}
