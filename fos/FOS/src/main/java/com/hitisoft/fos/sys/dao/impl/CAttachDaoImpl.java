package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.CAttachDao;
import com.hitisoft.fos.sys.entity.CAttach;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class CAttachDaoImpl extends JpaDao<CAttach, Long> implements CAttachDao {
	public CAttachDaoImpl() {
		super(CAttach.class);
	}
}
