package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GTransTypeDao;
import com.hitisoft.fos.general.entity.GTransType;

@Service
public class GTransTypeService {
	@Autowired
	private GTransTypeDao dao;

	@Transactional
	public List<GTransType> save(List<GTransType> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GTransType> query() {
		return dao.findByProperties();
	}
}
