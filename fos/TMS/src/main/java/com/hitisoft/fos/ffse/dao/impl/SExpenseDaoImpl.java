package com.hitisoft.fos.ffse.dao.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaCallback;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.ffse.dao.SExpenseDao;
import com.hitisoft.fos.ffse.entity.SExpense;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
//import com.hitisoft.fw.util.StringUtil;

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
		requestContext.put("compCode", sessionContext.getCompCode());
		requestContext.put("removed", "0");
		
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
		requestContext.put("compCode", sessionContext.getCompCode());
		requestContext.put("removed", "0");
		
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
		requestContext.put("compCode", sessionContext.getCompCode());
		requestContext.put("removed", "0");
		
		final Class<TConsign> t1 = TConsign.class;
		final Class<SExpense> t2 = SExpense.class;
		String joinSql = "t1.consId = t2.consId";
		List<SExpense> retList = query(conditions, requestContext, "t2", joinSql, t1, t2);

		String rowCount = String.valueOf(querySize(conditions, requestContext, "t2", joinSql, t1, t2));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SExpense> complexQueryRelease(final List<HtQuery> conditions, Map<String, String> queryMap) {
		final Class<SExpense> t1 = SExpense.class;
		final Class<TConsign> t2 = TConsign.class;
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
	
	/**
	 * 统计中批量核销
	 * @param consId 托运表ID
	 * @param custNameFlag 结算对象标志1=发货方，2=收货方，3=物流商
	 * @param expeType 费用类型‘R’或者‘P’
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public boolean updateExpenseWriteOff(final Long consId,final Integer custNameFlag, final String expeType) {
		boolean bl=false;
		StringBuffer sb = new StringBuffer();
		sb.append(" update SExpense t1 set  ");
		sb.append("t1.expeWriteOffAmount=t1.expeTotalAmount, ");
		sb.append("t1.expeWriteOffBy='"+sessionContext.getUsername().trim()+"',");
		sb.append("t1.expeWriteOffDate= '"+new SimpleDateFormat("yyyy-MM-dd").format(new Date())+"',");
		sb.append("t1.expeWriteOffRcAmount=t1.expeTotalAmount, ");
		sb.append("t1.expeWriteoffStatus=2  ");
		
		sb.append(" where t1.consId='"+consId+"'");
		sb.append(" and t1.custNameFlag='"+custNameFlag+"'");
		sb.append(" and t1.expeType='"+expeType+"'");
		sb.append(" and t1.expeWriteoffStatus<> "+Byte.valueOf((byte) 2));
		sb.append(" and t1.removed=0 ");
		sb.append(" and t1.compCode='"+sessionContext.getCompCode().trim()+"'");
		
		//sb.append("where t1.consId = ? and t1.removed = 0");
		final String queryString = sb.toString();
		try{
			getJpaTemplate().execute(new JpaCallback() {
				public Object doInJpa(EntityManager em) throws PersistenceException {
					Query query = em.createQuery(queryString);
					/*query.setParameter(1, consId);
					query.setParameter(2, custNameFlag);
					query.setParameter(3, expeType);
					query.setParameter(4, sessionContext.getCompCode());*/
					return query.executeUpdate();
				}
			});
			bl=true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return bl;
	}
}
