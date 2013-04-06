package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GTransTermDao;
import com.hitisoft.fos.general.entity.GTransTerm;

@Service
public class GTransTermService {
	@Autowired
	private GTransTermDao dao;

	@Transactional
	public List<GTransTerm> save(List<GTransTerm> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GTransTerm> query() {
		return dao.findByProperties();
	}
}
