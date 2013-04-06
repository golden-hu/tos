package com.hitisoft.fos.ffse.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffse.dao.SBalanceDao;
import com.hitisoft.fos.ffse.entity.SBalance;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class SBalanceDaoImpl extends JpaDao<SBalance, Long> implements SBalanceDao {
	public SBalanceDaoImpl() {
		super(SBalance.class);
	}
}
