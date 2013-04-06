package com.hitisoft.fos.tran.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TContainerDao;
import com.hitisoft.fos.tran.entity.TContainer;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class TContainerDaoImpl extends JpaDao<TContainer, Long> implements
		TContainerDao {

	public TContainerDaoImpl() {
		super(TContainer.class);
	}

}
