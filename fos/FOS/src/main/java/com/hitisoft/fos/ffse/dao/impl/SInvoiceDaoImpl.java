package com.hitisoft.fos.ffse.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaCallback;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.ffse.dao.SInvoiceDao;
import com.hitisoft.fos.ffse.entity.SInvoice;
import com.hitisoft.fos.ffse.entity.SInvoiceItem;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.TimeUtil;

@Repository
public class SInvoiceDaoImpl extends JpaDao<SInvoice, Long> implements SInvoiceDao {
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;

	public SInvoiceDaoImpl() {
		super(SInvoice.class);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void checkStatusById(final Long id, final Byte status) {
		StringBuffer sb = new StringBuffer();
		sb.append("update SInvoice t1 set t1.version = t1.version + 1, t1.invoStatus = :invoStatus ");
		if (ConstUtil.TrueByte.equals(status)) {
			sb.append(", t1.invoChecker = :invoChecker ");
			sb.append(", t1.invoCheckDate = :invoCheckDate ");
		}
		sb.append("where t1.id = :invoId and t1.compCode= :compCode");
		final String queryString = sb.toString();
		Integer affectRows = (Integer) getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter("invoStatus", status);
				query.setParameter("invoId", id);
				query.setParameter("compCode", sessionContext.getCompCode());
				if (ConstUtil.TrueByte.equals(status)) {
					query.setParameter("invoChecker", sessionContext.getUsername());
					query.setParameter("invoCheckDate", TimeUtil.getNow());
				}
				return Integer.valueOf(query.executeUpdate());
			}
		});
		if (affectRows != 1) {
			throw new BusinessException(ExceptionEnum.DB_ENTITY_NOT_FOUND, "SInvoice", id);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SInvoice> complexQuery(final List<HtQuery> conditions) {
		Class<SInvoice> clazz = SInvoice.class;
		Class<FConsign> clazz2 = FConsign.class;
		Class<SInvoiceItem> clazz3 = SInvoiceItem.class;
		List<SInvoice> retList = query(conditions, requestContext, "distinct t1",
				"t1.invoId=t3.invoId and t2.consId=t3.consId", clazz, clazz2, clazz3);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "distinct t1",
				"t1.invoId=t3.invoId and t2.consId=t3.consId", clazz, clazz2, clazz3));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}
}
