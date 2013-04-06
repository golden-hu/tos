package com.hitisoft.fos.tran.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TAccidentTypeDao;
import com.hitisoft.fos.tran.entity.TAccidentType;

@Service
public class TAccidentTypeService {
	@Autowired
	private TAccidentTypeDao dao;

	@Transactional
	public List<TAccidentType> save(List<TAccidentType> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<TAccidentType> query() {
		return dao.findByProperties();
	}
}
