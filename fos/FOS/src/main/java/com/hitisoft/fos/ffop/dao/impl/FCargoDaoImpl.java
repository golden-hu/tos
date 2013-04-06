package com.hitisoft.fos.ffop.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.dao.FCargoDao;
import com.hitisoft.fos.ffop.entity.FCargo;
import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class FCargoDaoImpl extends JpaDao<FCargo, Long> implements FCargoDao {
	@Autowired
	private RequestContext requestContext;

	public FCargoDaoImpl() {
		super(FCargo.class);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<FCargo> complexQuery(final List<HtQuery> conditions) {
		String fieldSql = "t1,t2";
		String joinSql = "t1.consMasterId = t2.consId";
		List retList = query(conditions, requestContext, fieldSql, joinSql, FConsign.class, FCargo.class);
		return retList;
	}
}
