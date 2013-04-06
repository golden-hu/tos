package com.hitisoft.fw.util;

import java.lang.reflect.Method;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.hitisoft.fw.reflect.MethodUtil;

public class Map2Entity {
	/**
	 * 把map中的key/value映射到entity对象属性(自动做类型转换, 循环调用对象的set方法).
	 * 
	 * @param <T>
	 * @param map
	 * @param entity
	 * @return
	 */
	public static <T> T toEntity(Map<String, String> map, T entity) {
		Map<String, Method> methodMap = MethodUtil.getSetMethods(entity);
		for (Map.Entry<String, String> entry : map.entrySet()) {
			if (methodMap.containsKey(entry.getKey())) {
				Class<?>[] paramClasses = methodMap.get(entry.getKey()).getParameterTypes();
				if (paramClasses.length == 1) {
					String value = StringUtils.trimToEmpty(entry.getValue());
					if(StringUtil.isNotBlank(value)){
						Object paramObj = StringUtil.parseValue(paramClasses[0], value);
						MethodUtil.doSetMethod(entity, entry.getKey(), paramClasses[0], paramObj);
					}
				}
			}
		}
		return entity;
	}
}
