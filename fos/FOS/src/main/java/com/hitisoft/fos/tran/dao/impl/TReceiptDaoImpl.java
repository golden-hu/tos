package com.hitisoft.fos.tran.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TReceiptDao;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.tran.entity.TReceipt;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class TReceiptDaoImpl extends JpaDao<TReceipt, Long> implements
		TReceiptDao {
	@Autowired
	private RequestContext requestContext;

	public TReceiptDaoImpl() {
		super(TReceipt.class);
	}

	@Override
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<Object> queryReceipts(List<HtQuery> conditions) {
		List list = new ArrayList();
		StringBuffer sb = new StringBuffer();
		sb.append("t1,t2.custName,t2.consDate,t3.consNo ");
		String sql = sb.toString();
		String where = "t1.consId=t2.id ";
		where += " and t1.removed=0 and t2.removed=0 ";
		where += " and t2.consBizClass='O' and t3.consBizClass='T' ";
		for (HtQuery ht : conditions) {
			if (ht.getKey().equals("consNo"))
				where += "and t1.consNo=" + "'" + ht.getValue() + "'";
			else if (ht.getKey().equals("receiptStatus"))
				where += "and t1.receiptStatus=" + "'" + ht.getValue() + "'";
			else if (ht.getKey().equals("demageFlag"))
				where += "and t1.demageFlag=" + "'" + ht.getValue() + "'";
			else if (ht.getKey().equals("receiptDate"))
				where += "and t1.receiptDate>=" + "'" + ht.getValue() + "'";
			else if (ht.getKey().equals("receiptDate2"))
				where += "and t1.receiptDate<=" + "'" + ht.getValue() + "'";
			else if (ht.getKey().equals("signatureDate"))
				where += "and t1.signatureDate>=" + "'" + ht.getValue() + "'";
			else if (ht.getKey().equals("signatureDate2"))
				where += "and t1.signatureDate<=" + "'" + ht.getValue() + "'";
			else if (ht.getKey().equals("consNoHandler"))
				where += "and t2.consNoHandler=" + "'" + ht.getValue() + "'";
			else if (ht.getKey().equals("consDate"))
				where += "and t2.consDate>=" + "'" + ht.getValue() + "'";
			else if (ht.getKey().equals("consDate2"))
				where += "and t2.consDate<=" + "'" + ht.getValue() + "'";
			else if (ht.getKey().equals("startStation"))
				where += "and t2.startStation=" + "'" + ht.getValue() + "'";
			else if (ht.getKey().equals("endStation"))
				where += "and t2.endStation=" + "'" + ht.getValue() + "'";
		}
		
		list = query(null, null, sql, where, TReceipt.class, TConsign.class,TConsign.class);
		String rowCount = String.valueOf(querySize(null, null, "t1", where,TReceipt.class, TConsign.class,TConsign.class));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return list;
	}

}