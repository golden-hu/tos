package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GContainerTypeDao;
import com.hitisoft.fos.general.entity.GContainerType;

@Service
public class GContainerTypeService {
	@Autowired
	private GContainerTypeDao dao;

	@Transactional
	public List<GContainerType> save(List<GContainerType> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GContainerType> query() {
		return dao.findByProperties();
	}

}
