package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GTradeTermDao;
import com.hitisoft.fos.general.entity.GTradeTerm;

@Service
public class GTradeTermService {
	@Autowired
	private GTradeTermDao dao;

	@Transactional
	public List<GTradeTerm> save(List<GTradeTerm> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GTradeTerm> query() {
		return dao.findByProperties();
	}
}
