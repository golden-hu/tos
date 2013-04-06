package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GCargoTypeDao;
import com.hitisoft.fos.general.entity.GCargoType;

@Service
public class GCargoTypeService {
	@Autowired
	private GCargoTypeDao dao;

	@Transactional
	public List<GCargoType> save(List<GCargoType> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GCargoType> query() {
		return dao.findByProperties();
	}
}
