package com.hitisoft.fos.ffse.dao.impl;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaCallback;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.express.entity.TExpress;
import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.ffse.dao.SExpenseDao;
import com.hitisoft.fos.ffse.entity.SExpense;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.tran.entity.TTransTask;
import com.hitisoft.fos.wms.entity.WStorageNote;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;

@Repository
public class SExpenseDaoImpl extends JpaDao<SExpense, Long> implements SExpenseDao {
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	
	public SExpenseDaoImpl() {
		super(SExpense.class);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SExpense> complexQueryInvoiceCreate(final List<HtQuery> conditions) {
		final Class<SExpense> t1 = SExpense.class;
		StringBuffer sb = new StringBuffer();
		sb.append(" t1.expeInvoiceStatus != 2 ");
		String joinSql = sb.toString();
		List<SExpense> retList = query(conditions, requestContext, "t1", joinSql, t1);
		return retList;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SExpense> complexQueryWriteOff(final List<HtQuery> conditions) {
		final Class<SExpense> t1 = SExpense.class;
		StringBuffer sb = new StringBuffer();
		sb.append(" (t1.expeWriteOffStatus = '0'  or ");
		sb.append("t1.expeWriteOffStatus = '1') and ");
		sb.append(" (t1.expeInvoiceStatus = '1'  or ");
		sb.append("t1.expeInvoiceStatus = '2') ");
		String joinSql = sb.toString();
		List<SExpense> retList = query(conditions, requestContext, "t1", joinSql, t1);
		return retList;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SExpense> complexQuery(final List<HtQuery> conditions) {
		final Class<SExpense> t1 = SExpense.class;
		final Class<FConsign> t2 = FConsign.class;
		final Class<TConsign> t3 = TConsign.class;
		final Class<TExpress> t4 = TExpress.class;
		String joinSql = "";
		if(requestContext.get("consBizType")=="A"||requestContext.get("consBizType")=="M"){
			joinSql = "t1.consId = t2.id";
		}
		if(requestContext.get("consBizType")=="T"){
			joinSql = "t1.consId = t3.id";
		}
		if(requestContext.get("consBizType")=="E"){
			joinSql = "t1.consId = t4.id";
		}
		
		List <SExpense> expeList = null;
		if(requestContext.get("consBizType")=="A"||requestContext.get("consBizType")=="M"){
			expeList = query(conditions, requestContext, "t1", joinSql, t1, t2);
		}
		
		if(requestContext.get("consBizType")=="T"){
			expeList = query(conditions, requestContext, "t1", joinSql, t1, t3);
		}
		
		if(requestContext.get("consBizType")=="E"){
			expeList = query(conditions, requestContext, "t1", joinSql, t1, t4);
		}

		String rowCount = null;
		if(requestContext.get("consBizType")=="A"||requestContext.get("consBizType")=="M"){
			rowCount = String.valueOf(querySize(conditions, requestContext, "t1", joinSql, t1, t2));
		}
		if(requestContext.get("consBizType")=="T"){
			rowCount = String.valueOf(querySize(conditions, requestContext, "t1", joinSql, t1, t3));
		}
		if(requestContext.get("consBizType")=="E"){
			rowCount = String.valueOf(querySize(conditions, requestContext, "t1", joinSql, t1, t4));
		}
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		
		return expeList;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SExpense> complexQueryRelease(final List<HtQuery> conditions, Map<String, String> queryMap) {
		final Class<SExpense> t1 = SExpense.class;
		final Class<FConsign> t2 = FConsign.class;
		String joinSql = "t1.consId = t2.consId";
		List<SExpense> retList = query(conditions, queryMap, "t1", joinSql, t1, t2);
		return retList;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void updateConsNoByConsId(final Long consId, final String consNo) {
		StringBuffer sb = new StringBuffer();
		sb.append("update SExpense t1 set ");
		sb.append("t1.consNo = ?, t1.version = t1.version + 1 ");
		sb.append("where t1.consId = ? and t1.removed = 0");
		final String queryString = sb.toString();
		getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter(1, consNo);
				query.setParameter(2, consId);
				return query.executeUpdate();
			}
		});
	}
	
	@Override
	@SuppressWarnings({ "unchecked"})
	public List<Object> queryBusinessSummary(String bizType,String consDateF,String consDateT){
		String compCode = sessionContext.getCompCode();
		
		String fsql = "sum(t1.expeTotalAmount*t1.expeExRate)  as totalAR,sum(t1.expeWriteOffAmount*t1.expeExRate) as totalR";
		String wsql = "t1.removed=0 and t1.expeType='R' and t1.compCode='"+compCode+"' and t1.consBizType='"+bizType+"'";
		wsql +=  "and t1.consDate>='"+consDateF+"' and t1.consDate<='"+consDateT+"'";
		List<Object> list1 = query(null, null, fsql, wsql, SExpense.class);		
		
		wsql = "t1.removed=0 and t1.expeType='P'  and t1.compCode='"+compCode+"' and t1.consBizType='"+bizType+"'";
		wsql +=  "and t1.consDate>='"+consDateF+"' and t1.consDate<='"+consDateT+"'";
		
		List<Object> list2 = query(null, null, fsql, wsql, SExpense.class);
		list1.addAll(list2);
		return list1;
	}
	
	@Override
	@SuppressWarnings({ "unchecked"})
	public List<Object> querySalesSummary(String consDateF,String consDateT){
        String compCode = sessionContext.getCompCode();
		
		String fsql = "t1.consSalesRepId,t1.expeType,sum(t1.expeTotalAmount*t1.expeExRate) as totalAmount,sum(t1.expeWriteOffAmount*t1.expeExRate) as totalWriteoff";
		String wsql = "t1.removed=0 and t1.compCode='"+compCode+"' and t1.consDate>='"+consDateF+"'";
		wsql += "and t1.consDate<='"+consDateT+"' group by t1.consSalesRepId,t1.expeType";
		
		List<Object> list = query(null, null, fsql, wsql, SExpense.class);		
		
		return list;
	}
	
	@Override
	@SuppressWarnings({ "unchecked"})
	public List<Object> queryMonthlySummary(String yy){
        String compCode = sessionContext.getCompCode();
		
		String fsql = "MONTH(t1.consDate) as mm,t1.expeType,sum(t1.expeTotalAmount*t1.expeExRate) as totalAmount,sum(t1.expeWriteOffAmount*t1.expeExRate) as totalWriteoff";
		String wsql = "t1.removed=0 and t1.compCode='"+compCode+"'";
		wsql += " and YEAR(t1.consDate)='"+yy+"'";
		wsql += " group by MONTH(t1.consDate),t1.expeType";
		
		List<Object> list = query(null, null, fsql, wsql, SExpense.class);		
		
		return list;
	}
	
	@Override
	@SuppressWarnings({ "unchecked"})
	public List<Object> queryDailySummary(String yy,String mm){
        String compCode = sessionContext.getCompCode();
		
		String fsql = "DAY(t1.consDate) as dd,t1.expeType,sum(t1.expeTotalAmount*t1.expeExRate) as totalAmount,sum(t1.expeWriteOffAmount*t1.expeExRate) as totalWriteoff";
		String wsql = "t1.removed=0 and t1.compCode='"+compCode+"'";
		wsql += " and YEAR(t1.consDate)='"+yy+"' and MONTH(t1.consDate)='" + mm + "'";
		wsql += " group by DAY(t1.consDate),t1.expeType";
		
		List<Object> list = query(null, null, fsql, wsql, SExpense.class);		
		
		return list;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<SExpense> complexQueryTExpress(List<HtQuery> conditions) {
		final Class<SExpense> t1 = SExpense.class;
		final Class<TExpress> t2 = TExpress.class;
		String joinSql = "t1.consId = t2.id";
		List <SExpense> expeList = query(conditions, requestContext, "t1", joinSql, t1, t2);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", joinSql, t1, t2));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return expeList;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<SExpense> complexQueryFConsign(List<HtQuery> conditions) {
		final Class<SExpense> t1 = SExpense.class;
		final Class<FConsign> t2 = FConsign.class;
		String joinSql = "t1.consId = t2.id";
		List <SExpense> expeList = query(conditions, requestContext, "t1", joinSql, t1, t2);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", joinSql, t1, t2));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return expeList;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<SExpense> complexQueryTConsign(List<HtQuery> conditions) {
		final Class<SExpense> t1 = SExpense.class;
		final Class<TConsign> t2 = TConsign.class;
		String joinSql = "t1.consId = t2.id";
		List <SExpense> expeList = query(conditions, requestContext, "t1", joinSql, t1, t2);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", joinSql, t1, t2));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return expeList;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<SExpense> complexQueryTTask(List<HtQuery> conditions) {
		final Class<SExpense> t1 = SExpense.class;
		final Class<TTransTask> t2 = TTransTask.class;
		String joinSql = "t1.consId = t2.id";
		List <SExpense> expeList = query(conditions, requestContext, "t1", joinSql, t1, t2);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", joinSql, t1, t2));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return expeList;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<SExpense> complexQueryWms(List<HtQuery> conditions) {
		final Class<SExpense> t1 = SExpense.class;
		final Class<WStorageNote> t2 = WStorageNote.class;
		String joinSql = "t1.consId = t2.id";
		List <SExpense> expeList = query(conditions, requestContext, "t1", joinSql, t1, t2);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", joinSql, t1, t2));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return expeList;
	}
}
