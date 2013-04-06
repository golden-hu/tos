package com.hitisoft.fos.ffop.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.dao.FCustomsDeclarationDao;
import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.ffop.entity.FCustomsDeclaration;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class FCustomsDeclarationDaoImpl extends JpaDao<FCustomsDeclaration, Long> implements FCustomsDeclarationDao {
	@Autowired
	private RequestContext requestContext;

	public FCustomsDeclarationDaoImpl() {
		super(FCustomsDeclaration.class);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<FCustomsDeclaration> complexQuery(final List<HtQuery> conditions) {
		final Class t1 = FConsign.class;
		final Class t2 = FCustomsDeclaration.class;
		String joinSql = "t1.id = t2.consId";
		List<FCustomsDeclaration> retList = query(conditions, requestContext, "t2", joinSql, t1, t2);

		String rowCount = String.valueOf(querySize(conditions, requestContext, "t2", joinSql, t1, t2));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}
}
