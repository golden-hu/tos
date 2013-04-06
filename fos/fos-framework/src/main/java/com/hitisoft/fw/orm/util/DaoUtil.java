package com.hitisoft.fw.orm.util;

import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.concurrent.ConcurrentHashMap;

import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hitisoft.fw.orm.jpa.BaseDomain;
import com.hitisoft.fw.orm.jpa.IdDomain;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.StringUtil;

public class DaoUtil {
	private static Logger logger = LoggerFactory.getLogger(DaoUtil.class);
	private static final Map<String, Map<String, Field>> classMap = new ConcurrentHashMap<String, Map<String, Field>>();

	public static void setParameters(List<HtQuery> conditions, Map<String, String> propertyMap,
			Query query, boolean isRowCount, Class<? extends IdDomain>... clazz) {
		List<Map<String, Field>> fieldMaps = new ArrayList<Map<String, Field>>();
		for (int i = 0; i < clazz.length; i++) {
			fieldMaps.add(getCachedFieldMap(clazz[i]));
		}

		Set<String> parsedSet = new HashSet<String>();
		if(conditions == null){
			conditions = plusMap2Conditions(conditions, propertyMap);
		}
		for (HtQuery htQuery : conditions) {
			// 可能包括t1.
			String key = htQuery.getKey();
			String realKey = htQuery.getKey();
			Map<String, Field> foundMap = null;
			if (StringUtil.contains(key, ConstUtil.STRING_DOT)) {
				realKey = key.substring(key.indexOf(ConstUtil.STRING_DOT) + 1);
				foundMap = fieldMaps.get(Integer.parseInt(key.substring(1, 2)) - 1);
			} else {
				for (Map<String, Field> fieldMap : fieldMaps) {
					if (fieldMap.containsKey(realKey)) {
						foundMap = fieldMap;
						break;
					}
				}
			}
			if (foundMap != null) {
				Type fieldType = foundMap.get(realKey).getType();
				while (parsedSet.contains(realKey)) {
					realKey += "_1";
				}
				parsedSet.add(realKey);
				String value = htQuery.getValue();
				Object objValue = null;
				switch (htQuery.getOp()) {
				case in:
				case notIn:
					if (StringUtil.isBlank(value) || ",".equals(value.trim())) {
						objValue = "";
					} else {
						List<Object> inItems = new ArrayList<Object>();
						StringTokenizer token = new StringTokenizer(value, ",");
						while (token.hasMoreTokens()) {
							String tmp = (String) token.nextToken();
							if (StringUtil.isNotBlank(tmp)) {
								inItems.add(StringUtil.parseValue(fieldType, tmp));
							}
						}
						objValue = inItems;
					}
					break;
				case like:
				case notLike:
					value = addFuzzSymbol(value);
				default:
					objValue = StringUtil.parseValue(fieldType, value);
					break;
				}
				query.setParameter(realKey, objValue);
				logger.debug("sql param: " + realKey + " = " + objValue);
			}
		}
		if (isRowCount)
			return;
		if (propertyMap != null && propertyMap.containsKey(ContextKey.start.get())) {
			int start = Integer.valueOf((String) propertyMap.get(ContextKey.start.get()));
			int rowStartIdx = Math.max(0, start);
			if (rowStartIdx > 0) {
				query.setFirstResult(rowStartIdx);
			}
		}
		if (propertyMap != null && propertyMap.containsKey(ContextKey.limit.get())) {
			int limit = Integer.valueOf((String) propertyMap.get(ContextKey.limit.get()));
			int rowCount = Math.max(0, limit);
			if (rowCount > 0) {
				query.setMaxResults(rowCount);
			}
		}
	}

	public static void buildSql(List<HtQuery> conditions, Map<String, String> propertyMap, StringBuffer sb,
			boolean isRowCount, Class<? extends IdDomain>... clazz) {
		List<Map<String, Field>> fieldMaps = new ArrayList<Map<String, Field>>();
		for (int i = 0; i < clazz.length; i++) {
			fieldMaps.add(getCachedFieldMap(clazz[i]));
		}
		Set<String> parsedSet = new HashSet<String>();
		if(conditions == null){
			conditions = plusMap2Conditions(conditions, propertyMap);
		}
		int i = 0;
		for (HtQuery htQuery : conditions) {
			// 有些查询字段, 不按照这个类的缺省顺序, 里面已经有了(t?.)
			// 可能包括t1.
			String key = htQuery.getKey();
			String realKey = htQuery.getKey();
			Map<String, Field> foundMap = null;
			int intTableSeq = 1;
			if (StringUtil.contains(key, ConstUtil.STRING_DOT)) {
				realKey = key.substring(key.indexOf(ConstUtil.STRING_DOT) + 1);
				intTableSeq = Integer.parseInt(key.substring(1, 2));
				foundMap = fieldMaps.get(intTableSeq - 1);
			} else {
				for (Map<String, Field> fieldMap : fieldMaps) {
					if (fieldMap.containsKey(realKey)) {
						foundMap = fieldMap;
						break;
					}
					intTableSeq++;
				}
			}
			if (foundMap != null) {
				appendSqlAnd(sb, i);
				if (!StringUtil.contains(key, ConstUtil.STRING_DOT))
					sb.append("t").append(intTableSeq).append(ConstUtil.STRING_DOT);
				sb.append(key).append(" ").append(htQuery.getOp().getValue()).append(" ");
				if (htQuery.getOp() == SqlOp.in || htQuery.getOp() == SqlOp.notIn)
					sb.append("(");
				sb.append(":");
				while (parsedSet.contains(realKey)) {
					realKey += "_1";
				}
				parsedSet.add(realKey);
				sb.append(realKey);
				if (htQuery.getOp() == SqlOp.in || htQuery.getOp() == SqlOp.notIn)
					sb.append(")");
				i++;
			}
		}

		removeSqlWhere(sb, i);

		if (isRowCount)
			return;

		if (propertyMap != null && propertyMap.containsKey(ContextKey.orderby.get())) {
			
			int intTableSeq = 1;
			for (Map<String, Field> fieldMap : fieldMaps) {
				if (fieldMap.containsKey(propertyMap.get(ContextKey.orderby.get()))) {
					sb.append(" order by ").append("t").append(intTableSeq).append(".")
							.append(propertyMap.get(ContextKey.orderby.get()));
					break;
				}
				intTableSeq++;
			}
			if (propertyMap != null && propertyMap.containsKey(ContextKey.orderdir.get())) {
				sb.append(" ");
				sb.append(propertyMap.get(ContextKey.orderdir.get()));
			}
		}
	}

	/**
	 * 给sql语句加上where和and
	 * 
	 * @param sb
	 * @param i
	 */
	private static void appendSqlAnd(StringBuffer sb, int i) {
		if (i == 0 && sb.lastIndexOf("where") == -1) {
			sb.append(" where ");
		}
		if (i > 0) {
			sb.append(" and ");
		} else {
			String s = sb.toString().trim().toLowerCase();
			if (!s.endsWith(" and") && !s.endsWith(" where")) {
				sb.append(" and ");
			}
		}
	}

	/**
	 * 如果没有条件, 要去掉sql最后的where
	 * 
	 * @param sb
	 * @param i
	 */
	private static void removeSqlWhere(StringBuffer sb, int i) {
		if (i == 0 && sb.toString().trim().toLowerCase().endsWith(" where")) {
			sb.delete(sb.lastIndexOf(" where"), sb.length());
		}
	}

	/**
	 * 获取类的属性信息
	 * 
	 * @param clazz
	 * @return
	 */
	private static Map<String, Field> getCachedFieldMap(Class<? extends IdDomain> clazz) {
		String className = clazz.getSimpleName();
		Map<String, Field> fieldMap = classMap.get(className);

		if (fieldMap == null) {
			fieldMap = new HashMap<String, Field>();
			Field[] fields = null;
			// id domain
			if(IdDomain.class.isAssignableFrom(clazz)){
				fields = IdDomain.class.getDeclaredFields();
				for (Field field : fields) {
					fieldMap.put(field.getName(), field);
				}
			}
			// base domain
			if(BaseDomain.class.isAssignableFrom(clazz)){
				fields = BaseDomain.class.getDeclaredFields();
				for (Field field : fields) {
					fieldMap.put(field.getName(), field);
				}
			}
			fields = clazz.getDeclaredFields();
			for (Field field : fields) {
				fieldMap.put(field.getName(), field);
			}
			classMap.put(className, fieldMap);
		}
		return fieldMap;
	}

	/**
	 * 如果字符串不包含%, 在两边加% 如果包含%, 直接返回
	 * 
	 * @param s
	 * @return
	 */
	private static String addFuzzSymbol(String s) {
		if (StringUtil.contains(s, ConstUtil.STRING_PERCENT)) {
			return s;
		}
		return ConstUtil.STRING_PERCENT + s + ConstUtil.STRING_PERCENT;
	}

	public static List<HtQuery> plusMap2Conditions(final List<HtQuery> conditions,
			final Map<String, String> propertyMap) {
		final List<HtQuery> finalConditions;
		if (conditions == null) {
			finalConditions = new ArrayList<HtQuery>();
		} else {
			finalConditions = conditions;
		}
		if (propertyMap != null) {
			for (Map.Entry<String, String> entry : propertyMap.entrySet()) {
				HtQuery field = new HtQuery(entry.getKey(), SqlOp.equal, entry.getValue());
				if (!finalConditions.contains(field)) {
					finalConditions.add(field);
				}
			}
		}
		return finalConditions;
	}

}
