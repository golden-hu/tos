package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GSiteDao;
import com.hitisoft.fos.general.entity.GSite;


@Service
public class GSiteService {
	@Autowired
	private GSiteDao dao;
	@Transactional
	public List<GSite> save(List<GSite> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GSite> query() {
		return dao.findByProperties();
	}
}
