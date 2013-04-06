package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GIssueTypeDao;
import com.hitisoft.fos.general.entity.GIssueType;

@Service
public class GIssueTypeService {
	@Autowired
	private GIssueTypeDao dao;

	@Transactional
	public List<GIssueType> save(List<GIssueType> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GIssueType> query() {
		return dao.findByProperties();
	}
}
