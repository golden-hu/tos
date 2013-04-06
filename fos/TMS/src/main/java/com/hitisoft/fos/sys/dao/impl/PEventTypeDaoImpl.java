package com.hitisoft.fos.sys.dao.impl;


import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PEventTypeDao;
import com.hitisoft.fos.sys.entity.PEventType;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PEventTypeDaoImpl extends JpaDao<PEventType, Long> implements PEventTypeDao{

	public PEventTypeDaoImpl() {
		super(PEventType.class);
	}
}
