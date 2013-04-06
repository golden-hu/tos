package com.hitisoft.fos.sys.dao.impl;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.orm.jpa.JpaCallback;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PTemplateDao;
import com.hitisoft.fos.sys.entity.PTemplate;
import com.hitisoft.fos.sys.entity.PTemplateMap;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PTemplateDaoImpl extends JpaDao<PTemplate, Long> implements PTemplateDao {
	public PTemplateDaoImpl() {
		super(PTemplate.class);
	}
	
	
}
