package com.hitisoft.fos.sys.dao;

import com.hitisoft.fos.sys.entity.CCustomer;
import com.hitisoft.fw.orm.jpa.BaseDao;

public interface CCustomerDao extends BaseDao<CCustomer, Long> {
	public void mergeCust(Long fromId, Long toId);
}
