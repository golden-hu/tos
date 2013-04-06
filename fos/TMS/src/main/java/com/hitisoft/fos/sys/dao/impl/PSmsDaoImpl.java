package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PSmsDao;
import com.hitisoft.fos.sys.entity.PSms;
import com.hitisoft.fw.orm.jpa.JpaDao;
@Repository
public class PSmsDaoImpl extends JpaDao<PSms, Long> implements PSmsDao{
	public PSmsDaoImpl(){
		super(PSms.class);
	}
}
