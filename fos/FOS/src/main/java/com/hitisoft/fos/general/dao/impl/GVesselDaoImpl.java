package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GVesselDao;
import com.hitisoft.fos.general.entity.GVessel;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GVesselDaoImpl extends JpaDao<GVessel, Long> implements GVesselDao {
	public GVesselDaoImpl() {
		super(GVessel.class);
	}
}
