package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GShippingLineDao;
import com.hitisoft.fos.general.entity.GShippingLine;

@Service
public class GShippingLineService {
	@Autowired
	private GShippingLineDao dao;

	@Transactional
	public List<GShippingLine> save(List<GShippingLine> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GShippingLine> query() {
		return dao.findByProperties();
	}
}
