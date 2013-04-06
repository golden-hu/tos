package com.hitisoft.fos.ffop.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.dao.FDoDao;
import com.hitisoft.fos.ffop.entity.FDo;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class FDoDaoImpl extends JpaDao<FDo, Long> implements FDoDao {
	public FDoDaoImpl() {
		super(FDo.class);
	}
}
