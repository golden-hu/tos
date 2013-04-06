package com.hitisoft.fos.tran.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TVehicleDao;
import com.hitisoft.fos.tran.entity.TVehicle;
import com.hitisoft.fw.orm.util.HtQuery;

@Service
public class TVehicleService {
	@Autowired
	private TVehicleDao dao;
	
	@Transactional
	public List<TVehicle> save(List<TVehicle> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<TVehicle> query() {
		return dao.findByProperties();
	}
	@Transactional(readOnly = true)
	public List<TVehicle> complexQuery(List<HtQuery> conditions) {
		return dao.complexQuery(conditions);
	}
}
