package com.hitisoft.fos.tran.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TAccidentDao;
import com.hitisoft.fos.tran.entity.TAccident;

@Service
public class TAccidentService {
	@Autowired
	private TAccidentDao dao;
	
	@Transactional
	public List<TAccident> save(List<TAccident> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<TAccident> query() {
		return dao.findByProperties();
	}
	
}
