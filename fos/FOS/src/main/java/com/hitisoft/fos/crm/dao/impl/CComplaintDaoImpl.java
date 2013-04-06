package com.hitisoft.fos.crm.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.crm.dao.CComplaintDao;
import com.hitisoft.fos.crm.entity.CComplaint;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class CComplaintDaoImpl extends JpaDao<CComplaint, Long> implements CComplaintDao {
    @Autowired
    private RequestContext requestContext;
    
    public CComplaintDaoImpl(){
    	super(CComplaint.class);
    }
    
    @SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<CComplaint> complexQuery(final List<HtQuery> conditions) {
		return  query(conditions, requestContext, "t1", "", CComplaint.class);
	}
}
