package com.hitisoft.fos.ffse.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffse.dao.SInvoiceItemDao;
import com.hitisoft.fos.ffse.entity.SInvoice;
import com.hitisoft.fos.ffse.entity.SInvoiceItem;
import com.hitisoft.fos.ffse.entity.SPrItem;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class SInvoiceItemDaoImpl extends JpaDao<SInvoiceItem, Long> implements SInvoiceItemDao {
	@Autowired
	private RequestContext requestContext;

	public SInvoiceItemDaoImpl() {
		super(SInvoiceItem.class);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SInvoiceItem> complexQueryByPrId(final List<HtQuery> conditions) {
		String joinSql = "t1.invoId = t2.invoId";
		List<SInvoiceItem> retList = query(conditions, requestContext, "distinct t1", joinSql, SInvoiceItem.class,
				SPrItem.class);

		String rowCount = String.valueOf(querySize(conditions, requestContext, "distinct t1", joinSql,
				SInvoiceItem.class, SPrItem.class));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SInvoiceItem> complexQueryByParent(final List<HtQuery> conditions) {
		String joinSql = "t1.invoId = t2.invoId";
		List<SInvoiceItem> retList = query(conditions, requestContext, "t1", joinSql, SInvoiceItem.class,
				SInvoice.class);
		return retList;
	}
}
