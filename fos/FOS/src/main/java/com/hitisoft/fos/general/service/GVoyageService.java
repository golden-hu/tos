package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GVoyageDao;
import com.hitisoft.fos.general.entity.GVoyage;
import com.hitisoft.fw.orm.util.HtQuery;

@Service
public class GVoyageService {
	@Autowired
	private GVoyageDao dao;
	@Transactional
	public List<GVoyage> save(List<GVoyage> itemList) {		
		return dao.saveByRowAction(itemList);
	}

	@Transactional(readOnly = true)
	public List<GVoyage> query() {
		return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<GVoyage> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}

}
