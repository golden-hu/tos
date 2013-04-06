package com.hitisoft.fos.tran.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TTaskConsignDao;
import com.hitisoft.fos.tran.entity.TTaskConsign;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class TTaskConsignDaoImpl extends JpaDao<TTaskConsign, Long> implements TTaskConsignDao {
	public TTaskConsignDaoImpl() {
		super(TTaskConsign.class);
	}
}
