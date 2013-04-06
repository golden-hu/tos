package com.hitisoft.fos.ffse.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffse.dao.SBalanceDao;
import com.hitisoft.fos.ffse.entity.SBalance;

@Service
public class SBalanceService {
	@Autowired
	private SBalanceDao dao;

	@Transactional
	public List<SBalance> save(List<SBalance> consignList) {
		return dao.saveByRowAction(consignList);
	}

	@Transactional(readOnly = true)
	public List<SBalance> query() {
		return dao.findByProperties();
	}
}
