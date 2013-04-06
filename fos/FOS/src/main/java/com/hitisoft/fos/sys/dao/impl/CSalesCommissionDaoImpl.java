package com.hitisoft.fos.sys.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaCallback;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.CSalesCommissionDao;
import com.hitisoft.fos.sys.entity.CSalesCommission;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class CSalesCommissionDaoImpl extends JpaDao<CSalesCommission, Long> implements CSalesCommissionDao {
	@Autowired
	private RequestContext requestContext;

	public CSalesCommissionDaoImpl() {
		super(CSalesCommission.class);
	}

	@Override
	public List<?> queryAllCommission() {
		final String year = requestContext.get("Y");
		final String month = requestContext.get("M");
		StringBuffer sb = new StringBuffer();
		sb.append("select t2.cons_sales_rep_id, ");
		sb.append("sum(if(t1.expe_type = 'R', t1.expe_total_amount * t1.expe_ex_rate, ");
		sb.append("-1 * t1.expe_total_amount * t1.expe_ex_rate)) as amount ");
		sb.append("from S_EXPENSE t1, F_CONSIGN t2 where ");
		sb.append("t1.cons_id = t2.cons_id  ");
		sb.append("and t2.cons_status_ar = 2  ");
		sb.append("and year(t2.cons_ar_write_off_date) = :year ");
		sb.append("and month(t2.cons_ar_write_off_date) = :month ");
		sb.append("group by t2.cons_sales_rep_id ");
		final String queryString = sb.toString();
		@SuppressWarnings("rawtypes")
		List<?> retList = getJpaTemplate().executeFind(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createNativeQuery(queryString);
				query.setParameter("year", Integer.parseInt(year));
				query.setParameter("month", Integer.parseInt(month));
				return query.getResultList();
			}
		});
		return retList;
	}

	@Override
	public List<?> queryCommissionDetail() {
		final String year = requestContext.get("Y");
		final String month = requestContext.get("M");
		final String salesId = requestContext.get("sacoSalesId");
		StringBuffer sb = new StringBuffer();
		sb.append("select t2.cons_id, t2.cons_no, t2.cust_sname, t2.cons_sail_date, ");
		sb.append("sum(if(t1.expe_type = 'R', t1.expe_total_amount * t1.expe_ex_rate, ");
		sb.append("-1 * t1.expe_total_amount * t1.expe_ex_rate)) as amount ");
		sb.append("from S_EXPENSE t1, F_CONSIGN t2 where ");
		sb.append("t1.cons_id = t2.cons_id  ");
		sb.append("and t2.cons_status_ar = 2  ");
		sb.append("and year(t2.cons_ar_write_off_date) = :year ");
		sb.append("and month(t2.cons_ar_write_off_date) = :month ");
		sb.append("and t2.cons_sales_rep_id = :salesId ");
		sb.append("group by t2.cons_id, t2.cons_no, t2.cust_sname, t2.cons_sail_date ");
		final String queryString = sb.toString();
		@SuppressWarnings("rawtypes")
		List<?> retList = getJpaTemplate().executeFind(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createNativeQuery(queryString);
				query.setParameter("year", Integer.parseInt(year));
				query.setParameter("month", Integer.parseInt(month));
				query.setParameter("salesId", Integer.parseInt(salesId));
				return query.getResultList();
			}
		});
		return retList;
	}
}
