package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PSerialRuleDao;
import com.hitisoft.fos.sys.entity.PSerialRule;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PSerialRuleDaoImpl extends JpaDao<PSerialRule, Long> implements PSerialRuleDao {
	public PSerialRuleDaoImpl() {
		super(PSerialRule.class);
	}
}
