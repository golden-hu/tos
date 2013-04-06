package com.hitisoft.fos.tran.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TContainerCargoDao;
import com.hitisoft.fos.tran.entity.TContainerCargo;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class TContainerCargoImpl extends JpaDao<TContainerCargo, Long> implements
		TContainerCargoDao {

	public TContainerCargoImpl() {
		super(TContainerCargo.class);
	}

}