package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GCargoClassDao;
import com.hitisoft.fos.general.entity.GCargoClass;

@Service
public class GCargoClassService {
	@Autowired
	private GCargoClassDao dao;

	@Transactional
	public List<GCargoClass> save(List<GCargoClass> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GCargoClass> query() {
		return dao.findByProperties();
	}
}
