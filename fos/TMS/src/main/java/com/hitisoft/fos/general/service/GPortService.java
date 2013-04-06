package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GPortDao;
import com.hitisoft.fos.general.entity.GPort;
import com.hitisoft.fw.orm.util.HtQuery;

@Service
public class GPortService {
	@Autowired
	private GPortDao dao;

	@Transactional
	public List<GPort> save(List<GPort> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GPort> query() {
		return dao.findByProperties();
	}

	public List<GPort> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}
}
