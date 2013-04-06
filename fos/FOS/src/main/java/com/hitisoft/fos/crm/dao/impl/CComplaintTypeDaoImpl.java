package com.hitisoft.fos.crm.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.crm.dao.CComplaintTypeDao;
import com.hitisoft.fos.crm.entity.CComplaintType;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class CComplaintTypeDaoImpl extends JpaDao<CComplaintType, Long> implements CComplaintTypeDao{
	@Autowired
	private RequestContext requestContext;
	
	public CComplaintTypeDaoImpl(){
		super(CComplaintType.class);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<CComplaintType> complexQuery(final List<HtQuery> conditions) {
		return  query(conditions, requestContext, "t1", "", CComplaintType.class);
	}
}
