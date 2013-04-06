package com.hitisoft.fos.wms.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WOperationListDao;
import com.hitisoft.fos.wms.entity.WOperationList;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WOperationListDaoImpl extends JpaDao<WOperationList, Long> implements WOperationListDao {
	public WOperationListDaoImpl() {
		super(WOperationList.class);
	}
}
