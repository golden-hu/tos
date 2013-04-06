package com.hitisoft.fos.wms.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WOperationFormDao;
import com.hitisoft.fos.wms.entity.WOperationForm;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WOperationFormDaoImpl extends JpaDao<WOperationForm, Long> implements WOperationFormDao {
	public WOperationFormDaoImpl() {
		super(WOperationForm.class);
	}
}
