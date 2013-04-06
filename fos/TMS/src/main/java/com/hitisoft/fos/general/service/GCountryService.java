package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GCountryDao;
import com.hitisoft.fos.general.entity.GCountry;

@Service
public class GCountryService {
	@Autowired
	private GCountryDao dao;

	@Transactional
	public List<GCountry> save(List<GCountry> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GCountry> query() {
		return dao.findByProperties();
	}
}
