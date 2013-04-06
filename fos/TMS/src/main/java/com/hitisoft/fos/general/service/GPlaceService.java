package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GPlaceDao;
import com.hitisoft.fos.general.entity.GPlace;

@Service
public class GPlaceService {
	@Autowired
	private GPlaceDao dao;

	@Transactional
	public List<GPlace> save(List<GPlace> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GPlace> query() {
		return dao.findByProperties();
	}
}
