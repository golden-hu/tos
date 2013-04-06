package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.CCommissionItemDao;
import com.hitisoft.fos.sys.entity.CCommissionItem;

@Service
public class CCommissionItemService {
	@Autowired
	private CCommissionItemDao dao;

	@Transactional
	public List<CCommissionItem> save(List<CCommissionItem> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<CCommissionItem> query() {
		return dao.findByProperties();
	}
}
