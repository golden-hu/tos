package com.hitisoft.fos.wms.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WOperationTypeDao;
import com.hitisoft.fos.wms.entity.WOperationType;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WOperationTypeDaoImpl extends JpaDao<WOperationType, Long> implements WOperationTypeDao {
	public WOperationTypeDaoImpl() {
		super(WOperationType.class);
	}
}
