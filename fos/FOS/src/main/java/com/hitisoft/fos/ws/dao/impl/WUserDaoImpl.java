package com.hitisoft.fos.ws.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ws.dao.WUserDao;
import com.hitisoft.fos.ws.entity.WUser;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WUserDaoImpl extends JpaDao<WUser, Long> implements WUserDao {
	public WUserDaoImpl() {
		super(WUser.class);
	}
}
