package com.hitisoft.cms.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.cms.dao.HcmsTemplateDao;
import com.hitisoft.cms.entity.HcmsTemplate;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class HcmsTemplateDaoImpl extends JpaDao<HcmsTemplate, Long> implements HcmsTemplateDao {
	public HcmsTemplateDaoImpl() {
		super(HcmsTemplate.class);
	}
}
