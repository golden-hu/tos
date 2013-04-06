package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PTemplateTypeDao;
import com.hitisoft.fos.sys.entity.PTemplateType;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PTemplateTypeDaoImpl extends JpaDao<PTemplateType, Long> implements PTemplateTypeDao {
	public PTemplateTypeDaoImpl() {
		super(PTemplateType.class);
	}
}
