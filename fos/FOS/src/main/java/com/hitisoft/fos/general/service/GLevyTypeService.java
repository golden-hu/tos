package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GLevyTypeDao;
import com.hitisoft.fos.general.entity.GLevyType;

@Service
public class GLevyTypeService {
	@Autowired
	private GLevyTypeDao dao;

	@Transactional
	public List<GLevyType> save(List<GLevyType> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GLevyType> query() {
		return dao.findByProperties();
	}
}
