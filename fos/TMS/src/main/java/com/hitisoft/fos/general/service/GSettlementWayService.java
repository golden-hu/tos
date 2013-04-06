package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GSettlementWayDao;
import com.hitisoft.fos.general.entity.GSettlementWay;

@Service
public class GSettlementWayService {
	@Autowired
	private GSettlementWayDao dao;

	@Transactional
	public List<GSettlementWay> save(List<GSettlementWay> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GSettlementWay> query() {
		return dao.findByProperties();
	}
}
