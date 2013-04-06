package com.hitisoft.fos.ffse.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaCallback;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffse.dao.SVoucherItemDao;
import com.hitisoft.fos.ffse.entity.SVoucher;
import com.hitisoft.fos.ffse.entity.SVoucherItem;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.TimeUtil;

@Repository
public class SVoucherItemDaoImpl extends JpaDao<SVoucherItem, Long> implements SVoucherItemDao {
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;

	public SVoucherItemDaoImpl() {
		super(SVoucherItem.class);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SVoucherItem> complexQueryByParent(final List<HtQuery> conditions) {
		final Class<SVoucherItem> t1 = SVoucherItem.class;
		final Class<SVoucher> t2 = SVoucher.class;
		String joinSql = "t1.voucId = t2.voucId";
		List<SVoucherItem> retList = query(conditions, requestContext, "t1", joinSql, t1, t2);
		return retList;
	}

	@SuppressWarnings({ "rawtypes" })
	@Override
	public List<?> complexQueryCust(final List<HtQuery> conditions) {
		StringBuffer sb = new StringBuffer();
		sb.append("select t1.custId, max(t2.consSailDate) ");
		sb.append("from SVoucherItem t1, FConsign t2 ");
		sb.append("where t1.createTime >= :fromTime and t1.createTime <= :toTime ");
		sb.append("and t1.compCode = :compCode ");
		sb.append("and t1.removed = 0 and t1.voitCancelFlag = 0");
		sb.append("group by t1.custId ");
		final String queryString = sb.toString();
		List retList = getJpaTemplate().executeFind(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter("fromTime", TimeUtil.getTodayStartTime());
				query.setParameter("toTime", TimeUtil.getTodayEndTime());
				query.setParameter("compCode", sessionContext.getCompCode());
				return query.getResultList();
			}
		});
		return retList;
	}
}
