package com.hitisoft.fw.orm.jpa;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaCallback;

import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.reflect.MethodUtil;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.util.ConstUtil;

public class JpaDao<T extends IdDomain, PK extends Serializable> extends SimpleJpaDao {
	protected final Logger logger = LoggerFactory.getLogger(getClass());
	private Class<T> persistentClass;

	@Autowired
	private RequestContext context;

	public JpaDao(final Class<T> persistentClass) {
		this.persistentClass = persistentClass;
	}

	@SuppressWarnings("unchecked")
	public List<T> findAll() {
		return getJpaTemplate().find("from " + this.persistentClass.getName());
	}

	/**
	 * 单表简单查询(只支持=), requestContext中的变量作为查询条件.
	 * <p>
	 * 包括查询返回的记录数, 放在requestContext中(key=rowCount)
	 * 
	 * @see ContextKey
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<T> findByProperties() {
		final Map<String, String> propertyMap = new HashMap<String, String>();
		propertyMap.putAll(context);
		List retList = query(null, propertyMap, "t1", "", this.persistentClass);
		if (propertyMap.containsKey(ContextKey.start.get())) {
			String rowCount = String.valueOf(querySize(null, propertyMap, "t1", "", this.persistentClass));
			context.put(ContextKey.rowCount.get(), rowCount);
		}
		return retList;
	}

	/**
	 * 单表查询(只支持=)
	 * <p>
	 * 只是map中的变量作为查询条件, 不包括requestContext中的变量.
	 * 
	 * @param propertyMap
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<T> findByProperties(Map<String, String> propertyMap) {
		propertyMap.put(ConstUtil.Removed, ConstUtil.FalseStr);
		List retList = query(null, propertyMap, "t1", "", this.persistentClass);
		if (propertyMap.containsKey(ContextKey.start.get())) {
			String rowCount = String.valueOf(querySize(null, propertyMap, "t1", "", this.persistentClass));
			propertyMap.put(ContextKey.rowCount.get(), rowCount);
		}
		return retList;
	}

	/**
	 * 单表的单字段(=)查询.
	 * <p>
	 * 包括查询返回的记录数, 放在requestContext中(key=rowCount)
	 * 
	 * @see ContextKey
	 * @param key
	 * @param value
	 * @return
	 */
	public List<T> findByProperty(String key, String value) {
		Map<String, String> propertyMap = new HashMap<String, String>();
		propertyMap.put(key, value);
		return findByProperties(propertyMap);
	}

	/**
	 * 获取单表查询的返回记录数
	 * @param propertyMap
	 * @return
	 */
	public Long findSize(Map<String, String> propertyMap){
		return querySize(null, propertyMap, "t1", "", this.persistentClass);
	}
	
	/**
	 * 单表复杂查询(查询条件是list中的变量, 和requestContext中的变量).
	 * <p>
	 * 包括查询返回的记录数, 放在requestContext中(key=rowCount)
	 * 
	 * @see ContextKey
	 * @param conditions
	 *            复杂查询条件列表
	 * @return
	 */
	public List<T> query(final List<HtQuery> conditions) {
		return query(conditions, true);
	}

	/**
	 * 单表复杂查询
	 * <p>
	 * 包括查询返回的记录数, 放在requestContext中(key=rowCount)
	 * 
	 * 
	 * @see ContextKey
	 * @param conditions
	 *            复杂查询条件列表
	 * @param mergeContextFlag
	 *            是否把requestContext中的变量也作为查询条件
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<T> query(final List<HtQuery> conditions, boolean mergeContextFlag) {
		final Map<String, String> propertyMap = new HashMap<String, String>();
		if (mergeContextFlag)
			propertyMap.putAll(context);
		List retList = query(conditions, propertyMap, "t1", "", this.persistentClass);
		if (propertyMap.containsKey(ContextKey.start.get())) {
			String rowCount = String.valueOf(querySize(conditions, propertyMap, "t1", "", this.persistentClass));
			context.put(ContextKey.rowCount.get(), rowCount);
		}
		return retList;
	}

	/**
	 * 根据主键查对象(对象不存在, 不抛出异常)
	 * 
	 * @param id
	 * @return
	 */
	public T findById(PK id) {
		return findById(id, false);
	}

	/**
	 * 根据主键查对象(对象不存在, 根据标志决定是否抛出异常)
	 * 
	 * @param id
	 * @param throwExceptionIfNull
	 *            如果没有找到对象, 是否抛出异常
	 * @return
	 */
	public T findById(PK id, boolean throwExceptionIfNull) {
		T entity = getJpaTemplate().find(this.persistentClass, id);
		if (entity == null && throwExceptionIfNull) {
			throw new BusinessException(ExceptionEnum.DB_ENTITY_NOT_FOUND, this.persistentClass, id);
		}
		return entity;
	}

	/**
	 * 根据主键查询此对象是否已经存在.
	 * 
	 * @param id
	 * @return
	 */
	public boolean exists(PK id) {
		T entity = getJpaTemplate().find(this.persistentClass, id);
		return entity != null;
	}

	/**
	 * 新增对象.
	 * 
	 * @param object
	 */
	public void add(T object) {
		getJpaTemplate().persist(object);
		getJpaTemplate().refresh(object);
	}

	/**
	 * 修改或删除对象(removed=1).
	 * 
	 * @param object
	 * @return
	 */
	public T update(T object) {
		return getJpaTemplate().merge(object);
	}

	/**
	 * 数据库删除对象.
	 * 
	 * @param id
	 */
	public void delete(PK id) {
		getJpaTemplate().remove(this.findById(id));
	}

	/**
	 * 根据一系列对象的rowAction字段, 判断操作.
	 * <p>
	 * N=新增<br>
	 * M=修改<br>
	 * R=删除
	 * 
	 * @param entityList
	 * @return
	 */
	public List<T> saveByRowAction(List<T> entityList) {
		List<T> retList = new ArrayList<T>();
		for (T entity : entityList) {
			T newEntity = saveByRowActionSolo(entity);
			if (newEntity != null) {
				retList.add(newEntity);
			}
		}
		return retList;
	}

	/**
	 * 根据单个对象的rowAction字段, 判断操作.
	 * <p>
	 * N=新增<br>
	 * M=修改<br>
	 * R=删除
	 * 
	 * @param entity
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public T saveByRowActionSolo(T entity) {
		T retEntity = null;
		switch (entity.getRowAction()) {
		case N:
			entity.setId(null);			
			add(entity);
			retEntity = entity;
			retEntity.setRowAction(RowAction.M);
			break;
		case M:
			retEntity = update(entity);
			break;
		case R:
			T delEntity = findById((PK) entity.getId());
			MethodUtil.doSetMethod(delEntity, "removed", Byte.class, ConstUtil.TrueByte);
			retEntity = update(delEntity);
			break;
		default:
			throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
		}
		return retEntity;
	}
	
	@SuppressWarnings("rawtypes")
	public List<?> queryByJpql(final String jpql){
		return getJpaTemplate().executeFind(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(jpql);
				return query.getResultList();
			}
		});
	}

	@SuppressWarnings("rawtypes")
	public List<?> queryByNativeSql(final String sql){
		return getJpaTemplate().executeFind(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createNativeQuery(sql);
				return query.getResultList();
			}
		});
	}

}
