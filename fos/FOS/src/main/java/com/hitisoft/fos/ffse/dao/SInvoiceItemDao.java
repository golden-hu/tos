package com.hitisoft.fos.ffse.dao;

import java.util.List;

import com.hitisoft.fos.ffse.entity.SInvoiceItem;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface SInvoiceItemDao extends BaseDao<SInvoiceItem, Long> {

	List<SInvoiceItem> complexQueryByPrId(List<HtQuery> conditions);

	List<SInvoiceItem> complexQueryByParent(List<HtQuery> conditions);
}
