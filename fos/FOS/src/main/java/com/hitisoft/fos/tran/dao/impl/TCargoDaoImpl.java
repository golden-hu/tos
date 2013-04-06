package com.hitisoft.fos.tran.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TCargoDao;
import com.hitisoft.fos.tran.entity.TCargo;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class TCargoDaoImpl extends JpaDao<TCargo, Long> implements TCargoDao {
	public TCargoDaoImpl() {
		super(TCargo.class);
	}
}
