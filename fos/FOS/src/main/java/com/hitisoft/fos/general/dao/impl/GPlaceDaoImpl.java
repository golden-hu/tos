package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GPlaceDao;
import com.hitisoft.fos.general.entity.GPlace;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GPlaceDaoImpl extends JpaDao<GPlace, Long> implements GPlaceDao {
	public GPlaceDaoImpl() {
		super(GPlace.class);
	}
}
