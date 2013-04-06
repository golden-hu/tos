package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GSettlementWayDao;
import com.hitisoft.fos.general.entity.GSettlementWay;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GSettlementWayDaoImpl extends JpaDao<GSettlementWay, Long> implements GSettlementWayDao {
	public GSettlementWayDaoImpl() {
		super(GSettlementWay.class);
	}
}
