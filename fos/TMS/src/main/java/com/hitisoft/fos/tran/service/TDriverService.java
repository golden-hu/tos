package com.hitisoft.fos.tran.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TDriverDao;
import com.hitisoft.fos.tran.entity.TDriver;
import com.hitisoft.fw.orm.util.HtQuery;

@Service
public class TDriverService {
	@Autowired
	private TDriverDao dao;
	
	@Transactional
	public List<TDriver> save(List<TDriver> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<TDriver> query() {
		return dao.findByProperties();
	}
	
	@Transactional(readOnly = true)
	public List<TDriver> complexQuery(List<HtQuery> conditions) {
		return dao.complexQuery(conditions);
	}
}
