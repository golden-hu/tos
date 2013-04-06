package com.hitisoft.fw.orm.jpa;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaCallback;
import org.springframework.orm.jpa.support.JpaDaoSupport;

import com.hitisoft.fw.orm.util.DaoUtil;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.util.StringUtil;

public abstract class SimpleJpaDao extends JpaDaoSupport {

	/**
	 * 底层查询, 支持多表关联查询(表定义为t1,t2,t3...)
	 * 
	 * @param conditions
	 *            复杂查询条件(除了or之外的所有条件操作符)
	 * @param propertyMap
	 *            简单查询条件(只有等于)
	 * @param fieldSql
	 *            查询出来的对象或字段(t1,t2或t1.prop1,t1.prop2或t1,t2.prop1)
	 * @param joinSql
	 *            多对象关联条件(t1.userId=t2.id)
	 * @param clazz
	 *            参与查询的多个对象, 注意对象的顺序与前面的参数保持一致
	 * @return 查询出来的多个对象的列表(List[Object[]])
	 */
	@SuppressWarnings({ "rawtypes" })
	protected List query(final List<HtQuery> conditions, final Map<String, String> propertyMap, String fieldSql,
			String joinSql, final Class<? extends IdDomain>... clazz) {
		final List<HtQuery> finalConditions;
		finalConditions = DaoUtil.plusMap2Conditions(conditions, propertyMap);
		StringBuffer sb = new StringBuffer();
		int i = 1;
		if (StringUtil.isBlank(fieldSql)) {
			fieldSql = "t1";
		}
		if (joinSql == null) {
			joinSql = "";
		}
		sb.append("select ").append(fieldSql).append(" from ");
		for (Class t : clazz) {
			sb.append(t.getSimpleName()).append(" t").append(i).append(",");
			i++;
		}
		sb.deleteCharAt(sb.length() - 1);
		sb.append(" where ").append(joinSql);
		DaoUtil.buildSql(finalConditions, propertyMap, sb, false, clazz);

		final String queryString = sb.toString();
		List retList = getJpaTemplate().executeFind(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				DaoUtil.setParameters(finalConditions, propertyMap, query, false, clazz);
				return query.getResultList();
			}
		});
		return retList;
	}

	/**
	 * 只查询出符合条件的记录数, 支持多表关联查询(表定义为t1,t2,t3...)
	 * 
	 * @param conditions
	 *            复杂查询条件(除了or之外的所有条件操作符)
	 * @param propertyMap
	 *            简单查询条件(只有等于)
	 * @param fieldSql
	 *            查询出来的对象或字段(t1,t2或t1.prop1,t1.prop2或t1,t2.prop1)
	 * @param joinSql
	 *            多对象关联条件(t1.userId=t2.id)
	 * @param clazz
	 *            参与查询的多个对象, 注意对象的顺序与前面的参数保持一致
	 * @return 查询出来的对象数目
	 */

	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected Long querySize(final List<HtQuery> conditions, final Map<String, String> propertyMap, String fieldSql,
			String joinSql, final Class... clazz) {
		final List<HtQuery> finalConditions;
		finalConditions = DaoUtil.plusMap2Conditions(conditions, propertyMap);
		StringBuffer sb = new StringBuffer();
		int i = 1;
		if (StringUtil.isBlank(fieldSql)) {
			fieldSql = "t1";
		}
		if (joinSql == null) {
			fieldSql = "";
		}
		sb.append("select count(").append(fieldSql).append(") from ");
		for (Class t : clazz) {
			sb.append(t.getSimpleName()).append(" t").append(i).append(",");
			i++;
		}
		sb.deleteCharAt(sb.length() - 1);
		sb.append(" where ").append(joinSql);
		DaoUtil.buildSql(finalConditions, propertyMap, sb, true, clazz);

		final String queryString = sb.toString();
		Long rowCount = (Long) getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				DaoUtil.setParameters(finalConditions, propertyMap, query, true, clazz);
				return query.getSingleResult();
			}
		});
		return rowCount;
	}

	@Autowired
	public void setEmf(EntityManagerFactory emf) {
		setEntityManagerFactory(emf);
	}
}
