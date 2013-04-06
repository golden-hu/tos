package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GLevyTypeDao;
import com.hitisoft.fos.general.entity.GLevyType;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GLevyTypeDaoImpl extends JpaDao<GLevyType, Long> implements GLevyTypeDao {
	public GLevyTypeDaoImpl() {
		super(GLevyType.class);
	}
}
