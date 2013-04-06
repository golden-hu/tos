package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GTradeTypeDao;
import com.hitisoft.fos.general.entity.GTradeType;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GTradeTypeDaoImpl extends JpaDao<GTradeType, Long> implements GTradeTypeDao {
	public GTradeTypeDaoImpl() {
		super(GTradeType.class);
	}
}
