package com.hitisoft.fos.ffop.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.dao.FSecondShipDao;
import com.hitisoft.fos.ffop.entity.FSecondShip;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class FSecondShipDaoImpl extends JpaDao<FSecondShip, Long> implements FSecondShipDao {
	public FSecondShipDaoImpl() {
		super(FSecondShip.class);
	}
}
