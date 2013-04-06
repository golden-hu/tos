package com.hitisoft.fos.ffse.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffse.dao.SExpenseTemplateItemDao;
import com.hitisoft.fos.ffse.entity.SExpenseTemplateItem;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class SExpenseTemplateItemDaoImpl extends JpaDao<SExpenseTemplateItem, Long> implements SExpenseTemplateItemDao {
	public SExpenseTemplateItemDaoImpl() {
		super(SExpenseTemplateItem.class);
	}
}
