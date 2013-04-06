package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PTemplateTypeDao;
import com.hitisoft.fos.sys.entity.PTemplateType;

@Service
public class PTemplateTypeService {
	@Autowired
	private PTemplateTypeDao dao;

	@Transactional
	public List<PTemplateType> save(List<PTemplateType> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<PTemplateType> query() {
		return dao.findByProperties();
	}

}
