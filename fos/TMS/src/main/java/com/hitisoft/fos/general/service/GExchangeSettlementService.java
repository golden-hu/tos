package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GExchangeSettlementDao;
import com.hitisoft.fos.general.entity.GExchangeSettlement;

@Service
public class GExchangeSettlementService {
	@Autowired
	private GExchangeSettlementDao dao;

	@Transactional
	public List<GExchangeSettlement> save(List<GExchangeSettlement> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GExchangeSettlement> query() {
		return dao.findByProperties();
	}
}
