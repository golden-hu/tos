package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PEventTypeDao;
import com.hitisoft.fos.sys.entity.PEventType;

@Service
public class PEventTypeService {
	@Autowired
	private PEventTypeDao dao;
	@Transactional
	public List<PEventType> save(List<PEventType> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<PEventType> query() {
		return dao.findByProperties();
	}
}
