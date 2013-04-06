package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GIssueTypeDao;
import com.hitisoft.fos.general.entity.GIssueType;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GIssueTypeDaoImpl extends JpaDao<GIssueType, Long> implements GIssueTypeDao {
	public GIssueTypeDaoImpl() {
		super(GIssueType.class);
	}
}
