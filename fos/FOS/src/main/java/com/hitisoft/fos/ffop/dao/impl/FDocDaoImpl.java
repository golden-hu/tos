package com.hitisoft.fos.ffop.dao.impl;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaCallback;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.dao.FDocDao;
import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.ffop.entity.FDoc;
import com.hitisoft.fos.util.CompanyConfigUtil;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class FDocDaoImpl extends JpaDao<FDoc, Long> implements FDocDao {
	@Autowired
	private RequestContext requestContext;

	public FDocDaoImpl() {
		super(FDoc.class);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<?> complexQuery(final List<HtQuery> conditions) {
		final Class t1 = FDoc.class;
		final Class t2 = FConsign.class;
		String joinSql = "t1.consId = t2.id";
		List retList = query(conditions, requestContext, "t1,t2", joinSql, t1, t2);

		String rowCount = String.valueOf(querySize(conditions, requestContext, "distinct t1", joinSql, t1, t2));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<FDoc> complexQueryNeedRelease(final List<HtQuery> conditions, Map<String, String> queryMap) {
		final Class t1 = FDoc.class;
		final Class t2 = FConsign.class;
		String blId = CompanyConfigUtil.getCompanyConfig(Constants.COMCF_FDOC_BL);
		String ccId = CompanyConfigUtil.getCompanyConfig(Constants.COMCF_FDOC_CC);
		String joinSql = "t1.consId = t2.id and (t1.dotyId = " + blId + " or t1.dotyId = " + ccId + ")";
		List retList = query(conditions, queryMap, "t1", joinSql, t1, t2);
		return retList;
	}

	@SuppressWarnings({ "unchecked" })
	@Override
	public List<FDoc> complexQueryNeedAlert(final List<HtQuery> conditions) {
		final Class<FDoc> t1 = FDoc.class;
		final Class<FConsign> t2 = FConsign.class;
		String joinSql = "t1.consId = t2.id and (t1.alertFlag is null or t1.alertFlag = '0')";
		List<FDoc> retList = query(conditions, requestContext, "t1", joinSql, t1, t2);
		return retList;

	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void updateConsNoByConsId(final Long consId, final String consNo) {
		StringBuffer sb = new StringBuffer();
		sb.append("update FDoc t1 set ");
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
}
