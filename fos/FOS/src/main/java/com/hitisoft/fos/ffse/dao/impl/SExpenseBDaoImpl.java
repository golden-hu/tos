package com.hitisoft.fos.ffse.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.ffse.dao.SExpenseBDao;
import com.hitisoft.fos.ffse.entity.SExpenseB;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class SExpenseBDaoImpl extends JpaDao<SExpenseB, Long> implements SExpenseBDao {
	@Autowired
	private RequestContext requestContext;

	public SExpenseBDaoImpl() {
		super(SExpenseB.class);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SExpenseB> complexQuery(final List<HtQuery> conditions) {
		final Class<FConsign> t1 = FConsign.class;
		final Class<SExpenseB> t2 = SExpenseB.class;
		String joinSql = "t1.consId = t2.consId";
		List<SExpenseB> retList = query(conditions, requestContext, "t2", joinSql, t1, t2);

		String rowCount = String.valueOf(querySize(conditions, requestContext, "t2", joinSql, t1, t2));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}
}
