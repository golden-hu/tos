package com.hitisoft.fos.ffse.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffse.dao.SExpenseTemplateDao;
import com.hitisoft.fos.ffse.entity.SExpenseTemplate;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class SExpenseTemplateDaoImpl extends JpaDao<SExpenseTemplate, Long> implements SExpenseTemplateDao {
	public SExpenseTemplateDaoImpl() {
		super(SExpenseTemplate.class);
	}
}
