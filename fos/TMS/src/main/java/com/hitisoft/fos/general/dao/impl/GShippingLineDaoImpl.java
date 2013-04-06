package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GShippingLineDao;
import com.hitisoft.fos.general.entity.GShippingLine;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GShippingLineDaoImpl extends JpaDao<GShippingLine, Long> implements GShippingLineDao {
	public GShippingLineDaoImpl() {
		super(GShippingLine.class);
	}
}
