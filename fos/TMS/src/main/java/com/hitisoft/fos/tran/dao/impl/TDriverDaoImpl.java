package com.hitisoft.fos.tran.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TDriverDao;
import com.hitisoft.fos.tran.entity.TDriver;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class TDriverDaoImpl extends JpaDao<TDriver, Long> implements TDriverDao {
	@Autowired
	private RequestContext requestContext;
	
	public TDriverDaoImpl() {
		super(TDriver.class);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<TDriver> complexQuery(final List<HtQuery> conditions) {
		Class clazz = TDriver.class;
		//HtQuery hq = new HtQuery("removed",SqlOp.equal,"0");
		//conditions.add(hq);
		
		requestContext.put("removed","0");
		
		List<TDriver> retList = query(conditions, requestContext, "t1", "", clazz);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", "", clazz));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}
}
