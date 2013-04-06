package com.hitisoft.fos.general.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GDocumentTypeDao;
import com.hitisoft.fos.general.entity.GDocumentType;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GDocumentTypeDaoImpl extends JpaDao<GDocumentType, Long> implements GDocumentTypeDao {
	public GDocumentTypeDaoImpl() {
		super(GDocumentType.class);
	}
}
