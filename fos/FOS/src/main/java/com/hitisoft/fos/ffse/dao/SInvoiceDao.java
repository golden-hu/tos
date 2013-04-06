package com.hitisoft.fos.ffse.dao;

import java.util.List;

import com.hitisoft.fos.ffse.entity.SInvoice;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface SInvoiceDao extends BaseDao<SInvoice, Long> {

	void checkStatusById(Long id, Byte status);

	List<SInvoice> complexQuery(List<HtQuery> conditions);
}
