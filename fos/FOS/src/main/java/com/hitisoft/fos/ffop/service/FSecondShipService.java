package com.hitisoft.fos.ffop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.dao.FSecondShipDao;
import com.hitisoft.fos.ffop.entity.FSecondShip;

@Service
public class FSecondShipService {
	@Autowired
	private FSecondShipDao dao;

	@Transactional
	public List<FSecondShip> save(List<FSecondShip> consignList) {
		return dao.saveByRowAction(consignList);
	}

	@Transactional(readOnly = true)
	public List<FSecondShip> query() {
		return dao.findByProperties();
	}

}
