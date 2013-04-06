package com.hitisoft.fos.tran.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TReceiptDao;
import com.hitisoft.fos.tran.entity.TReceipt;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;

@Repository
public class TReceiptDaoImpl extends JpaDao<TReceipt, Long> implements TReceiptDao {
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	
	public TReceiptDaoImpl() {
		super(TReceipt.class);
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
    @Override
	public List <TReceipt> receiptSearch(final List<HtQuery> conditions){
		final Class t1 = TReceipt.class;
		
		StringBuffer sb=new StringBuffer();
		sb.append("t1 ");
		String sqlField=sb.toString();
		
		String compCode = sessionContext.getCompCode();
		String w=" removed=0 and compCode='"+compCode+"'";
		
        List  retList = query(conditions, requestContext,sqlField, w, t1);
		String rowCount = String.valueOf(querySize(conditions, requestContext,"t1.id",w, t1));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}
}
