package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GUsageDao;
import com.hitisoft.fos.general.entity.GUsage;

@Service
public class GUsageService {
	@Autowired
	private GUsageDao dao;

	@Transactional
	public List<GUsage> save(List<GUsage> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GUsage> query() {
		return dao.findByProperties();
	}

}
