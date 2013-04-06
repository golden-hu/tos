package com.hitisoft.fos.sys.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PCompanyDao;
import com.hitisoft.fos.sys.entity.PCompany;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class PCompanyDaoImpl extends JpaDao<PCompany, Long> implements PCompanyDao {
	@Autowired
	private RequestContext requestContext;
	
	public PCompanyDaoImpl() {
		super(PCompany.class);
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<PCompany> complexQuery(final List<HtQuery> conditions) {
		Class<PCompany> t1 = PCompany.class;
		String str = "";
		for(HtQuery list:conditions){
			str+=list.getValue()+"@";
		}
		String date[]=str.split("@");
		String w="";
		if(date.length==1){
			w=" (t1.compNameCn like '%"+date[0]+"%') ";
		}
		if(date.length==2){
			w=" (t1.compActive='"+date[0]+"' and t1.compNameCn like '%"+date[1]+"%') ";
		}
		List<PCompany> retList = query(null, requestContext,null, w, t1);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "distinct t1", w, t1));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
		
	}
}
