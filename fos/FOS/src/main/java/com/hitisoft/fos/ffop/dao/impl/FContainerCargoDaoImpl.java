package com.hitisoft.fos.ffop.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.dao.FContainerCargoDao;
import com.hitisoft.fos.ffop.entity.FContainerCargo;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class FContainerCargoDaoImpl extends JpaDao<FContainerCargo, Long> implements FContainerCargoDao {
	public FContainerCargoDaoImpl() {
		super(FContainerCargo.class);
	}
}
