package com.hitisoft.fos.tran.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TOilStationDao;
import com.hitisoft.fos.tran.entity.TOilStation;

@Service
public class TOilStationService {
	@Autowired
	private TOilStationDao dao;

	@Transactional
	public List<TOilStation> save(List<TOilStation> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<TOilStation> query() {
		return dao.findByProperties();
	}
}
