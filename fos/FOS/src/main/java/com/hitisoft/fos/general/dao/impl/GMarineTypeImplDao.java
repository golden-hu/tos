package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GMarineTypeDao;
import com.hitisoft.fos.general.entity.GMarineType;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GMarineTypeImplDao extends JpaDao<GMarineType, Long> implements GMarineTypeDao{
	public GMarineTypeImplDao(){
		super(GMarineType.class);
	}
}
