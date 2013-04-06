package com.hitisoft.fos.ws.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ws.dao.WConsignDao;
import com.hitisoft.fos.ws.entity.WConsign;
import com.hitisoft.fos.ws.entity.WUser;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class WConsignDaoImpl extends JpaDao<WConsign, Long> implements WConsignDao {
	@Autowired
	private RequestContext requestContext;

	public WConsignDaoImpl() {
		super(WConsign.class);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<?> complexQuery(final List<HtQuery> conditions) {
		String joinSql = "t1.wusrId = t2.wusrId";
		List<?> retList = query(conditions, requestContext, "t1,t2", joinSql, WConsign.class, WUser.class);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", joinSql, WConsign.class,
				WUser.class));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}
}
