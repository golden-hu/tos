package com.hitisoft.fos.tran.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TOilStationDao;
import com.hitisoft.fos.tran.entity.TOilStation;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class TOilStationDaoImpl extends JpaDao<TOilStation, Long> implements TOilStationDao {
	public TOilStationDaoImpl() {
		super(TOilStation.class);
	}
}
