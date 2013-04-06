package com.hitisoft.fos.sys.dao.impl;


import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PEventDao;
import com.hitisoft.fos.sys.entity.PEvent;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PEventDaoImpl extends JpaDao<PEvent, Long> implements PEventDao{

	public PEventDaoImpl() {
		super(PEvent.class);
	}
}
