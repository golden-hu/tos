package com.hitisoft.fos.tran.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TVehicleClassDao;
import com.hitisoft.fos.tran.entity.TVehicleClass;

@Service
public class TVehicleClassService {
	@Autowired
	private TVehicleClassDao dao;

	@Transactional
	public List<TVehicleClass> save(List<TVehicleClass> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<TVehicleClass> query() {
		return dao.findByProperties();
	}
}
