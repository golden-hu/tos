package com.hitisoft.fos.sys.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PEventDao;
import com.hitisoft.fos.sys.entity.PCompany;
import com.hitisoft.fos.sys.entity.PEvent;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class PEventDaoImpl extends JpaDao<PEvent, Long> implements PEventDao{

	
	@Autowired
	private RequestContext requestContext;
	
	public PEventDaoImpl() {
		super(PEvent.class);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<PEvent> query(final List<HtQuery> conditions) {
		final Map<String, String> propertyMap = new HashMap<String, String>();
		propertyMap.putAll(requestContext);
		
		Class<PEvent> t1 = PEvent.class;
		String w=" t1.consignId =0";
		List<PEvent> retList = query(conditions, propertyMap,"t1", w, t1);
		String rowCount = String.valueOf(querySize(conditions, propertyMap, "distinct t1", w, t1));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
		
	}
	
	
}
