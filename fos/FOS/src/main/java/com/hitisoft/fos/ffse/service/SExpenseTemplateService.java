package com.hitisoft.fos.ffse.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffse.dao.SExpenseTemplateDao;
import com.hitisoft.fos.ffse.entity.SExpenseTemplate;

@Service
public class SExpenseTemplateService {
	@Autowired
	private SExpenseTemplateDao dao;

	@Transactional
	public List<SExpenseTemplate> save(List<SExpenseTemplate> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<SExpenseTemplate> query() {
		return dao.findByProperties();
	}
}
