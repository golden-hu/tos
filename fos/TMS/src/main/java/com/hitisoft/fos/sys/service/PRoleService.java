package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PRoleDao;
import com.hitisoft.fos.sys.entity.PRole;

@Service
public class PRoleService {
	@Autowired
	private PRoleDao dao;

	@Transactional
	public List<PRole> save(List<PRole> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<PRole> query() {
		return dao.findByProperties();
	}
}
