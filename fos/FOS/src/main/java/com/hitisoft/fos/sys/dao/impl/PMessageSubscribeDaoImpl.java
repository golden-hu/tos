package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PMessageSubscribeDao;
import com.hitisoft.fos.sys.entity.PMessageSubscribe;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PMessageSubscribeDaoImpl extends JpaDao<PMessageSubscribe, Long> implements PMessageSubscribeDao {
	public PMessageSubscribeDaoImpl() {
		super(PMessageSubscribe.class);
	}
}
