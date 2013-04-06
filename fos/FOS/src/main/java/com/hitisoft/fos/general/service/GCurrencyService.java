package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GCurrencyDao;
import com.hitisoft.fos.general.entity.GCurrency;

@Service
public class GCurrencyService {
	@Autowired
	private GCurrencyDao dao;

	@Transactional
	public List<GCurrency> save(List<GCurrency> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GCurrency> query() {
		return dao.findByProperties();
	}

}
