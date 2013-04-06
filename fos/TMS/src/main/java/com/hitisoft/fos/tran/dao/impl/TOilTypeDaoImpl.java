package com.hitisoft.fos.tran.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TOilTypeDao;
import com.hitisoft.fos.tran.entity.TOilType;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class TOilTypeDaoImpl extends JpaDao<TOilType, Long> implements TOilTypeDao {
	public TOilTypeDaoImpl() {
		super(TOilType.class);
	}
}
