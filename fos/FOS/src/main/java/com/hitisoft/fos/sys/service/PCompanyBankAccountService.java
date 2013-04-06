package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PCompanyBankAccountDao;
import com.hitisoft.fos.sys.entity.PCompanyBankAccount;

@Service
public class PCompanyBankAccountService {
	@Autowired
	private PCompanyBankAccountDao dao;

	@Transactional
	public List<PCompanyBankAccount> save(List<PCompanyBankAccount> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<PCompanyBankAccount> query() {
		return dao.findByProperties();
	}

}
