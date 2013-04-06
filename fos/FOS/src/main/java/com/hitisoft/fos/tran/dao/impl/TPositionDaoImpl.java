package com.hitisoft.fos.tran.dao.impl;


import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TPositionDao;
import com.hitisoft.fos.tran.entity.TPosition;
import com.hitisoft.fw.orm.jpa.JpaDao;
@Repository
public class TPositionDaoImpl extends JpaDao<TPosition, Long> implements TPositionDao {
	public TPositionDaoImpl() {
		super(TPosition.class);
	}
}
