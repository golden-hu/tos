package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PTemplateMapDao;
import com.hitisoft.fos.sys.entity.PTemplateMap;

@Service
public class PTemplateMapService {
	@Autowired
	private PTemplateMapDao dao;

	@Transactional
	public List<PTemplateMap> save(List<PTemplateMap> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<PTemplateMap> query() {
		return dao.findByProperties();
	}

}
