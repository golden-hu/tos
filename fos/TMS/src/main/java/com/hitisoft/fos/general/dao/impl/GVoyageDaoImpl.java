package com.hitisoft.fos.general.dao.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.orm.jpa.JpaCallback;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.general.dao.GVoyageDao;
import com.hitisoft.fos.general.entity.GVoyage;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class GVoyageDaoImpl extends JpaDao<GVoyage, Long> implements GVoyageDao {
	public GVoyageDaoImpl() {
		super(GVoyage.class);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public void updateVessName(final Long vessId, final String vessName, final String vessNameCn) {
		StringBuffer sb = new StringBuffer();
		sb.append("update GVoyage t1 set t1.vessName = ?, t1.vessNameCn = ?, t1.version = t1.version + 1 ");
		sb.append("where t1.vessId = ? and t1.removed = 0");
		final String queryString = sb.toString();
		getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter(1, vessName);
				query.setParameter(2, vessNameCn);
				query.setParameter(3, vessId);
				return query.executeUpdate();
			}
		});
	}

}
