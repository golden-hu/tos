package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GTradeTypeDao;
import com.hitisoft.fos.general.entity.GTradeType;

@Service
public class GTradeTypeService {
	@Autowired
	private GTradeTypeDao dao;

	@Transactional
	public List<GTradeType> save(List<GTradeType> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GTradeType> query() {
		return dao.findByProperties();
	}
}
