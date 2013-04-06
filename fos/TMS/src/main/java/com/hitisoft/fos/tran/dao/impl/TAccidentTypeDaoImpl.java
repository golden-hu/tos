package com.hitisoft.fos.tran.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TAccidentTypeDao;
import com.hitisoft.fos.tran.entity.TAccidentType;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class TAccidentTypeDaoImpl extends JpaDao<TAccidentType, Long> implements TAccidentTypeDao {
	public TAccidentTypeDaoImpl() {
		super(TAccidentType.class);
	}
}
