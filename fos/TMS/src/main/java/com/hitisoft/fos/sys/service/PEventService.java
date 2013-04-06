package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PEventDao;
import com.hitisoft.fos.sys.entity.PEvent;

@Service
public class PEventService {
	@Autowired
	private PEventDao dao;
	@Transactional
	public List<PEvent> save(List<PEvent> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<PEvent> query() {
		return dao.findByProperties();
	}
}
