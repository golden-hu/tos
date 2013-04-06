package com.hitisoft.fos.tran.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TTransTypeDao;
import com.hitisoft.fos.tran.entity.TTransType;

@Service
public class TTransTypeService {
	@Autowired
	private TTransTypeDao dao;

	@Transactional
	public List<TTransType> save(List<TTransType> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<TTransType> query() {
		return dao.findByProperties();
	}
}
