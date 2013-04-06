package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.CCustomerContactDao;
import com.hitisoft.fos.sys.entity.CCustomerContact;

@Service
public class CCustomerContactService {
	@Autowired
	private CCustomerContactDao dao;

	@Transactional
	public List<CCustomerContact> save(List<CCustomerContact> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<CCustomerContact> query() {
		return dao.findByProperties();
	}
}
