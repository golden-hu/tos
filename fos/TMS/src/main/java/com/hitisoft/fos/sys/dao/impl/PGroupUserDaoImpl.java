package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PGroupUserDao;
import com.hitisoft.fos.sys.entity.PGroupUser;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PGroupUserDaoImpl extends JpaDao<PGroupUser, Long> implements PGroupUserDao {
	public PGroupUserDaoImpl() {
		super(PGroupUser.class);
	}
}
