package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GVesselDao;
import com.hitisoft.fos.general.entity.GVessel;
import com.hitisoft.fw.orm.util.HtQuery;

@Service
public class GVesselService {
	@Autowired
	private GVesselDao dao;

	@Transactional
	public List<GVessel> save(List<GVessel> entityList) {
		return dao.saveByRowAction(entityList);		
	}

	@Transactional(readOnly = true)
	public List<GVessel> query() {
		return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<GVessel> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}
}
