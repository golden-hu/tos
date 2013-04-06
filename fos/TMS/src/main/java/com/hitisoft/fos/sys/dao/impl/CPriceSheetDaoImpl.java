package com.hitisoft.fos.sys.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaCallback;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.CPriceSheetDao;
import com.hitisoft.fos.sys.entity.CPriceLine;
import com.hitisoft.fos.sys.entity.CPriceRecord;
import com.hitisoft.fos.sys.entity.CPriceSheet;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class CPriceSheetDaoImpl extends JpaDao<CPriceSheet, Long> implements CPriceSheetDao {
	@Autowired
	private RequestContext requestContext;

	public CPriceSheetDaoImpl() {
		super(CPriceSheet.class);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<?> complexQuery(final List<HtQuery> conditions) {
		final Class<CPriceSheet> t1 = CPriceSheet.class;
		final Class<CPriceLine> t2 = CPriceLine.class;
		final Class<CPriceRecord> t3 = CPriceRecord.class;
		String joinSql = "t1.prshId = t2.prshId and t2.prliId = t3.prliId "
				+ "and t1.removed = 0 and t2.removed = 0 and t3.removed = 0";
		List<?> retList = query(conditions, requestContext, "t1,t2,t3", joinSql, t1, t2, t3);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t3", joinSql, t1, t2, t3));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void updateVoyaName(final Long voyaId, final String voyaName) {
		StringBuffer sb = new StringBuffer();
		sb.append("update CPriceSheet t1 set t1.voyaName = ?, t1.version = t1.version + 1 ");
		sb.append("where t1.voyaId = ? and t1.removed = 0");
		final String queryString = sb.toString();
		getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter(1, voyaName);
				query.setParameter(2, voyaId);
				return query.executeUpdate();
			}
		});
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void updateVessName(final Long vessId, final String vessName) {
		StringBuffer sb = new StringBuffer();
		sb.append("update CPriceSheet t1 set t1.vessName = ?, t1.version = t1.version + 1 ");
		sb.append("where t1.vessId = ? and t1.removed = 0");
		final String queryString = sb.toString();
		getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter(1, vessName);
				query.setParameter(2, vessId);
				return query.executeUpdate();
			}
		});
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void updateVessName(final Integer voyaId, final Integer newVessId, final String newVessName) {
		StringBuffer sb = new StringBuffer();
		sb.append("update CPriceSheet t1 set t1.vessId = ?, t1.vessName = ?, t1.version = t1.version + 1 ");
		sb.append("where t1.voyaId = ? and t1.removed = 0");
		final String queryString = sb.toString();
		getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter(1, newVessId);
				query.setParameter(2, newVessName);
				query.setParameter(3, voyaId);
				return query.executeUpdate();
			}
		});
	}

}
