package com.hitisoft.fos.ffop.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.dao.FTaskDao;
import com.hitisoft.fos.ffop.entity.FTask;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class FTaskDaoImpl extends JpaDao<FTask, Long> implements FTaskDao {
	public FTaskDaoImpl() {
		super(FTask.class);
	}
}
