package com.hitisoft.fos.ffop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.dao.FRailwayBlDao;
import com.hitisoft.fos.ffop.entity.FRailwayBl;
import com.hitisoft.fw.session.RequestContext;

@Service
public class FRailwayBlService {
	@Autowired
	private FRailwayBlDao dao;
	@Autowired
	private RequestContext requestContext;

	@Transactional
	public List<FRailwayBl> save(List<FRailwayBl> consignList) {
		return dao.saveByRowAction(consignList);
	}

	@Transactional(readOnly = true)
	public List<FRailwayBl> query() {
		return dao.findByProperties();
	}

	@Transactional
	public void updateStatus() {
		Long id = Long.valueOf(requestContext.get("rablId"));
		Byte status = Byte.valueOf(requestContext.get("rablStatus"));
		FRailwayBl entity = dao.findById(id);
		if (entity != null) {
			entity.setRablStatus(status);
			dao.update(entity);
		}
	}
}
