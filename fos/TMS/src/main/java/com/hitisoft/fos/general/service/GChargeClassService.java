package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GChargeClassDao;
import com.hitisoft.fos.general.entity.GChargeClass;

@Service
public class GChargeClassService {
	@Autowired
	private GChargeClassDao dao;

	@Transactional
	public List<GChargeClass> save(List<GChargeClass> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GChargeClass> query() {
		return dao.findByProperties();
	}
}
