package com.hitisoft.fos.tran.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TTransTaskDao;
import com.hitisoft.fos.tran.entity.TTransTask;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;

@Repository
public class TTransTaskDaoImpl extends JpaDao<TTransTask, Long> implements
		TTransTaskDao {
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
		String str = "", w = "";
		w = " t1.removed=0";
		for (HtQuery list : conditions) {
			str += list.getValue() + "@";
		}
		String date[] = str.split("@");
		StringBuffer sb = new StringBuffer();
		if (date.length > 2) {
			w += " and (t1.startDate>='" + date[0] + "' and t1.startDate<='"
					+ date[1] + "')";
			if (Integer.parseInt(date[2]) == 0) {
				sb.append(" t1.vehicleNo as sumT");
				w += " group by t1.vehicleNo";
			}
			if (Integer.parseInt(date[2]) == 1) {
				sb.append(" t1.driverName as sumT");
				w += " group by t1.driverName";
			}
		}
		sb.append(",count(t1.startDate) as sumStartDate");
		sb.append(",sum(t1.grossWeight) as sumGrossWeight");
		sb.append(",(sum(t1.emptyMiles)+sum(t1.heavyMiles)) as sumDistance");
		String fieldSql = sb.toString();
		List<TTransTask> retList = query(null, requestContext, fieldSql, w, t1);
		/*
		 * String rowCount = String.valueOf(querySize(conditions,
		 * requestContext, "t1", "", clazz));
		 * requestContext.put(ContextKey.rowCount.get(), rowCount);
		 */
		return retList;
	}

	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List<TTransTask> complexQueryCheck(final List<HtQuery> conditions) {
		final Class t1 = TTransTask.class;
		StringBuffer sb = new StringBuffer();
		sb.append("t1");
		sb.append(", (select sum(e.expeTotalAmount*e.expeExRate)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='R' and e.removed='0') as sumR");
		sb.append(", (select sum(e.expeTotalAmount*e.expeExRate)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='P' and e.removed='0') as sumP");
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='USD') as sumRUsd");
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='CNY') as sumRCny");
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='USD') as sumPUsd");
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='CNY') as sumPCny");
		sb.append(", (select sum(e.expeInvoiceAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='USD') as sumRUsdInvoice");
		sb.append(", (select sum(e.expeInvoiceAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='CNY') as sumRCnyInvoice");
		sb.append(", (select sum(e.expeInvoiceAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='USD') as sumPUsdInvoice");
		sb.append(", (select sum(e.expeInvoiceAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='CNY') as sumPCnyInvoice");
		sb.append(", (select sum(e.expeWriteOffAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='USD') as sumRUsdWriteOff");
		sb.append(", (select sum(e.expeWriteOffAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='CNY') as sumRCnyWriteOff");
		sb.append(", (select sum(e.expeWriteOffAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='USD') as sumPUsdWriteOff");
		sb.append(", (select sum(e.expeWriteOffAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='CNY') as sumPCnyWriteOff");

		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode!='CNY' and e.currCode!='USD') as sumPOther");

		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode!='CNY' and e.currCode!='USD') as sumROther");

		String fieldSql = sb.toString();
		String compCode = sessionContext.getCompCode();
		String w = " removed=0 and compCode='" + compCode + "' ";

		List retList = query(conditions, requestContext, fieldSql, w, t1);
		String rowCount = String.valueOf(querySize(conditions, requestContext,
				"distinct t1", w, t1));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	@Override
	@SuppressWarnings({ "unchecked"})
	public List<TTransTask> query() {
		String compCode = sessionContext.getCompCode();
		StringBuffer sb = new StringBuffer();
		
		sb.append(" distinct t1 ");
		String where=" t1.orderDate is not null and t1.removed=0 and t1.compCode='"+compCode+"' ";
		final String requestString=sb.toString();
		return query(null,null,requestString,where,TTransTask.class);
	}
}
