package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GSiteDao;
import com.hitisoft.fos.general.entity.GSite;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GSiteDaoImpl extends JpaDao<GSite, Long> implements GSiteDao{
	
	public GSiteDaoImpl(){
		super(GSite.class);
	}
}
