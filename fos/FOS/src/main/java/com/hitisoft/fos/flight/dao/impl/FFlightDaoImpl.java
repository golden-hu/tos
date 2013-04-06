package com.hitisoft.fos.flight.dao.impl;


import org.springframework.stereotype.Repository;

import com.hitisoft.fos.flight.dao.FFlightDao;
import com.hitisoft.fos.flight.entity.FFlight;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class FFlightDaoImpl extends JpaDao<FFlight, Long> implements FFlightDao {
	public FFlightDaoImpl(){
		super(FFlight.class);
	}
}
