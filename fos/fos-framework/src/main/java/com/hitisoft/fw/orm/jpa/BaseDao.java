package com.hitisoft.fw.orm.jpa;

import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;

import java.util.List;
import java.util.Map;

public interface BaseDao<T, PK> {
	/**
	 * 根据主键查询此对象是否已经存在.
	 * 
	 * @param id
	 * @return
	 */
	public boolean exists(PK id);

	/**
	 * 新增对象.
	 * 
	 * @param entity
	 */
	public void add(T entity);

	/**
	 * 数据库删除对象.
	 * 
	 * @param id
	 */
	public void delete(PK id);

	/**
	 * 修改或删除对象(removed=1).
	 * 
	 * @param entity
	 * @return
	 */
	public T update(T entity);

	/**
	 * 根据主键查对象(对象不存在, 不抛出异常)
	 * 
	 * @param id
	 * @return
	 */
	public T findById(PK id);

	/**
	 * 根据主键查对象(对象不存在, 根据标志决定是否抛出异常)
	 * 
	 * @param id
	 * @param throwExceptionIfNull
	 *            如果没有找到对象, 是否抛出异常
	 * @return
	 */
	public T findById(PK id, boolean throwExceptionIfNull);

	/**
	 * 查询所有
	 * @return
	 */
	public List<T> findAll();

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
	public List<T> findByProperty(String key, String value);

	/**
	 * 单表简单查询(只支持=), requestContext中的变量作为查询条件.
	 * <p>
	 * 包括查询返回的记录数, 放在requestContext中(key=rowCount)
	 * 
	 * @see ContextKey
	 * @return
	 */
	public List<T> findByProperties();

	/**
	 * 单表查询(只支持=)
	 *<p>
	 * 只是map中的变量作为查询条件, 不包括requestContext中的变量.
	 * 
	 * @param propertyMap
	 * @return
	 */
	public List<T> findByProperties(final Map<String, String> propertyMap);
	
	/**
	 * 获取单表查询的返回记录数
	 * @param propertyMap
	 * @return
	 */
	public Long findSize(Map<String, String> propertyMap);

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
	public T saveByRowActionSolo(T entity);

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
	public List<T> saveByRowAction(List<T> entityList);

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
	public List<T> query(final List<HtQuery> conditions);

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
	public List<T> query(final List<HtQuery> conditions, boolean mergeContextFlag);
	
	/**
	 * 根据JPA SQL查询
	 * @param jpql
	 * @return
	 */
	public List<?> queryByJpql(String jpql);

	/**
	 * 根据Native SQL查询
	 * @param sql
	 * @return
	 */
	public List<?> queryByNativeSql(String sql);

}
