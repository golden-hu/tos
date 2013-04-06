package com.hitisoft.fos.ws.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ws.dao.WBlMDao;
import com.hitisoft.fos.ws.entity.WBlM;

@Service
public class WBlMService {
	@Autowired
	private WBlMDao dao;

	@Transactional
	public List<WBlM> save(List<WBlM> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<WBlM> query() {
		return dao.findByProperties();
	}
}
