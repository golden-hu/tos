package com.hitisoft.fos.tran.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TVehicleDao;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.tran.entity.TVehicle;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class TVehicleDaoImpl extends JpaDao<TVehicle, Long> implements TVehicleDao {
	@Autowired
	private RequestContext requestContext;
	
	public TVehicleDaoImpl() {
		super(TVehicle.class);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<TVehicle> complexQuery(final List<HtQuery> conditions) {
		Class clazz = TVehicle.class;
		//HtQuery hq = new HtQuery("removed",SqlOp.equal,"0");
		//conditions.add(hq);
		
		requestContext.put("removed","0");
		
		List<TVehicle> retList = query(conditions, requestContext, "t1", "", clazz);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", "", clazz));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}
}
