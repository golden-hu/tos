package com.hitisoft.fos.sys.dao.impl;

import java.math.BigInteger;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.orm.jpa.JpaCallback;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PSerialNoDao;
import com.hitisoft.fos.sys.entity.PSerialNo;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PSerialNoDaoImpl extends JpaDao<PSerialNo, Long> implements PSerialNoDao {
	public PSerialNoDaoImpl() {
		super(PSerialNo.class);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public Long getNextSerialNo(final Map<String, String> propertyMap) {
		StringBuffer sb = new StringBuffer();
		sb.append("insert into P_SERIAL_NO");
		sb.append(" (seru_id, seru_code, comp_code,");
		sb.append(" seno_suffix,seno_current_no, seno_expire)");
		sb.append(" values(:seruId, :seruCode, :compCode,");
		sb.append(" :senoSuffix, :senoCurrentNo, :senoExpire)");
		sb.append(" on duplicate key update");
		sb.append(" seno_current_no = last_insert_id(seno_current_no + 1) ");
		final String queryString = sb.toString();
		return (Long) getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createNativeQuery(queryString);
				query.setParameter("seruId", propertyMap.get("seruId"));
				query.setParameter("seruCode", propertyMap.get("seruCode"));
				query.setParameter("compCode", propertyMap.get("compCode"));
				query.setParameter("senoSuffix", propertyMap.get("senoSuffix"));
				query.setParameter("senoCurrentNo", propertyMap.get("senoCurrentNo"));
				query.setParameter("senoExpire", propertyMap.get("senoExpire"));
				int affectRows = query.executeUpdate();
				Long id = null;
				// add new record(not update), affectRows = 1; update the
				// record, affectRows=3
				if (affectRows == 1) {
					id = Long.valueOf(propertyMap.get("senoCurrentNo"));
				} else {
					query = em.createNativeQuery("select last_insert_id()");
					BigInteger bigId = (BigInteger) query.getSingleResult();
					id = bigId.longValue();
				}
				return id;
			}
		});
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void init() {
		StringBuffer sb = new StringBuffer();
		sb.append("delete from P_SERIAL_NO p");
		sb.append(" where p.seno_expire <= now()");
		final String queryString = sb.toString();
		getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createNativeQuery(queryString);
				query.executeUpdate();
				return null;
			}
		});
	}

}
