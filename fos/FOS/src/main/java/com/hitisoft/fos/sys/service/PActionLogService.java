package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PActionLogDao;
import com.hitisoft.fos.sys.entity.PActionLog;
import com.hitisoft.fw.orm.util.HtQuery;

@Service
public class PActionLogService {
	@Autowired
	private PActionLogDao dao;

	@Transactional
	public List<PActionLog> save(List<PActionLog> entityList) {
		return null;
	}

	@Transactional(readOnly = true)
	public List<PActionLog> query() {
		return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<PActionLog> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}
}
