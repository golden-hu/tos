package com.hitisoft.fos.tran.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TOilTypeDao;
import com.hitisoft.fos.tran.entity.TOilType;

@Service
public class TOilTypeService {
	@Autowired
	private TOilTypeDao dao;

	@Transactional
	public List<TOilType> save(List<TOilType> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<TOilType> query() {
		return dao.findByProperties();
	}
}
