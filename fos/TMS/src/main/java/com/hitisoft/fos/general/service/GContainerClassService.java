package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GContainerClassDao;
import com.hitisoft.fos.general.entity.GContainerClass;

@Service
public class GContainerClassService {
	@Autowired
	private GContainerClassDao dao;

	@Transactional
	public List<GContainerClass> save(List<GContainerClass> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GContainerClass> query() {
		return dao.findByProperties();
	}
}
