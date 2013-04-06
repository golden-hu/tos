package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.CCustomerCategoryDao;
import com.hitisoft.fos.sys.entity.CCustomerCategory;

@Service
public class CCustomerCategoryService{
	@Autowired
	private CCustomerCategoryDao dao;

	@Transactional
	public List<CCustomerCategory> save(List<CCustomerCategory> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<CCustomerCategory> query() {
		return dao.findByProperties();
	}
}
