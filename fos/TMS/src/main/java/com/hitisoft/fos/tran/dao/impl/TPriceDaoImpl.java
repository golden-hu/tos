package com.hitisoft.fos.tran.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TPriceDao;
import com.hitisoft.fos.tran.entity.TPrice;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class TPriceDaoImpl extends JpaDao<TPrice, Long> implements TPriceDao {
	@Autowired
	private RequestContext requestContext;
	
	public TPriceDaoImpl() {
		super(TPrice.class);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<TPrice> complexQuery(final List<HtQuery> conditions) {
		Class clazz = TPrice.class;		
		requestContext.put("removed","0");		
		List<TPrice> retList = query(conditions, requestContext, "t1", "", clazz);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", "", clazz));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}
}
