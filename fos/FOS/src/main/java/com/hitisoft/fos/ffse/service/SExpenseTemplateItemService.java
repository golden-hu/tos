package com.hitisoft.fos.ffse.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffse.dao.SExpenseTemplateItemDao;
import com.hitisoft.fos.ffse.entity.SExpenseTemplateItem;

@Service
public class SExpenseTemplateItemService {
	@Autowired
	private SExpenseTemplateItemDao dao;

	@Transactional
	public List<SExpenseTemplateItem> save(List<SExpenseTemplateItem> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<SExpenseTemplateItem> query() {
		return dao.findByProperties();
	}
}
