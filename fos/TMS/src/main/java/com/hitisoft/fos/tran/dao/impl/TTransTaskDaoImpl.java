package com.hitisoft.fos.tran.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TTransTaskDao;
import com.hitisoft.fos.tran.entity.TCargo;
import com.hitisoft.fos.tran.entity.TTransTask;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;

@Repository
public class TTransTaskDaoImpl extends JpaDao<TTransTask, Long> implements TTransTaskDao {
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	
	public TTransTaskDaoImpl() {
		super(TTransTask.class);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<TTransTask> complexQuery(final List<HtQuery> conditions) {
		Class<TTransTask> t1 = TTransTask.class;
		String compCode = sessionContext.getCompCode();
		
		StringBuffer sb=new StringBuffer();
		sb.append(" t1 ");
		String fieldSql=sb.toString();
		
		String w="";
		w+="  t1.removed=0 ";
		w+=" and t1.compCode= '"+ compCode +"' ";
		
		
		List<TTransTask> retList = query(conditions, requestContext, fieldSql, w, t1);
		/*String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", "", clazz));
		requestContext.put(ContextKey.rowCount.get(), rowCount);*/
		return retList;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<TTransTask> complexSearch(final List<HtQuery> conditions) {
		//requestContext.put("compCode",sessionContext.getCompCode());
		Class<TTransTask> t1 = TTransTask.class;
		String w="";
	/*	w+=" t1.removed=0 ";
		w+=" and t1.compCode='"+sessionContext.getCompCode()+"'";*/
		List<TTransTask> retList = query(conditions, requestContext,null, w, t1);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "distinct t1", w, t1));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
    public List <TTransTask>getTransTaskByConsId(){
		String consId=requestContext.get("consId");
		String compCode = sessionContext.getCompCode();
		Class<TTransTask> t1 = TTransTask.class;
		Class<TCargo> t2 = TCargo.class;
		StringBuffer sb=new StringBuffer();
		sb.append("  t1 ");
		String sqlField=sb.toString();
		
		String w=" t1.id=t2.transTaskId ";
		w+=" and t2.consId='"+consId+"'";
		w+=" and  t1.removed=0 ";
		w+=" and t1.compCode= '"+ compCode +"' ";
		w+=" group by t1.id ";
		List  retList = query(null, null,sqlField, w, t1,t2);
		return retList;
	}
}
