package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GExchangeSettlementDao;
import com.hitisoft.fos.general.entity.GExchangeSettlement;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GExchangeSettlementDaoImpl extends JpaDao<GExchangeSettlement, Long> implements GExchangeSettlementDao {
	public GExchangeSettlementDaoImpl() {
		super(GExchangeSettlement.class);
	}
}
