package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GDocumentTypeDao;
import com.hitisoft.fos.general.entity.GDocumentType;

@Service
public class GDocumentTypeService {
	@Autowired
	private GDocumentTypeDao dao;

	@Transactional
	public List<GDocumentType> save(List<GDocumentType> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GDocumentType> query() {
		return dao.findByProperties();
	}

}
