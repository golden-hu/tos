package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PTaskTypeDao;
import com.hitisoft.fos.sys.entity.PTaskType;

@Service
public class PTaskTypeService {
	@Autowired
	private PTaskTypeDao dao;

	@Transactional
	public List<PTaskType> save(List<PTaskType> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<PTaskType> query() {
		return dao.findByProperties();
	}

}
