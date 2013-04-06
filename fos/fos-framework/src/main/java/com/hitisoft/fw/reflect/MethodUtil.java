package com.hitisoft.fw.reflect;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import javax.persistence.Id;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hitisoft.fw.util.StringUtil;

public class MethodUtil {
	private static Map<String, Set<String>> methodNameCache = new ConcurrentHashMap<String, Set<String>>();
	private static Map<String, Set<Method>> methodCache = new ConcurrentHashMap<String, Set<Method>>();
	private static Map<String, Map<String, Method>> methodSetCache = new ConcurrentHashMap<String, Map<String, Method>>();
	private static Logger logger = LoggerFactory.getLogger(MethodUtil.class);

	/**
	 * 获取某个对象的所有方法的名称.
	 * 
	 * @param obj
	 * @return
	 */
	public static Set<String> getMethodsName(Object obj) {
		Class<? extends Object> clazz = obj.getClass();
		return getMethodsName(clazz);
	}

	/**
	 * 获取某个类的所有方法的名称.
	 * 
	 * @param clazz
	 * @return
	 */
	public static Set<String> getMethodsName(Class<? extends Object> clazz) {
		Set<String> methodSet = null;
		methodSet = methodNameCache.get(clazz.getSimpleName());
		if (methodSet == null) {
			methodSet = new HashSet<String>();
			Method[] methods = clazz.getMethods();
			for (Method method : methods) {
				methodSet.add(method.getName());
			}
			methodNameCache.put(clazz.getSimpleName(), methodSet);
		}
		return methodSet;
	}

	/**
	 * 获取某个类的所有方法.
	 * 
	 * @param clazz
	 * @return
	 */
	private static Set<Method> getMethods(Class<? extends Object> clazz) {
		Set<Method> methodSet = null;
		methodSet = methodCache.get(clazz.getSimpleName());
		if (methodSet == null) {
			methodSet = new HashSet<Method>();
			Method[] methods = clazz.getMethods();
			for (Method method : methods) {
				methodSet.add(method);
			}
			methodCache.put(clazz.getSimpleName(), methodSet);
		}
		return methodSet;
	}

	/**
	 * 获取JPA类的主键的get方法.
	 * 
	 * @param ret
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Method getPkMethod(Object ret) {
		Method getIdMethod = null;
		Class<? extends Object> clazz = null;
		if (ret instanceof List) {
			clazz = ((List<Object>) ret).get(0).getClass();
		} else {
			clazz = ret.getClass();
		}
		Set<Method> f = getMethods(clazz);
		for (Method m : f) {
			if (m.getAnnotation(Id.class) != null && m.getName().startsWith("get")) {
				getIdMethod = m;
				break;
			}
		}
		return getIdMethod;
	}

	/**
	 * 设置某个对象的某个属性(调用该对象属性的set方法).
	 * 
	 * @param entity
	 *            对象
	 * @param fieldName
	 *            属性名字
	 * @param paramClass
	 *            参数类型
	 * @param paramValue
	 *            参数的值
	 */
	@SuppressWarnings({ "rawtypes" })
	public static void doSetMethod(Object entity, String fieldName, Class paramClass, Object paramValue) {
		Set<String> methodSet = getMethodsName(entity);
		if (methodSet.contains("set" + StringUtil.capitalize(fieldName))) {
			try {
				Method method = entity.getClass().getMethod("set" + StringUtil.capitalize(fieldName),
						new Class[] { paramClass });
				method.invoke(entity, new Object[] { paramValue });
			} catch (Exception e) {
				logger.error("do set method " + fieldName, e);
			}
		}
	}

	/**
	 * 获取某个对象的某个属性的值(调用该对象属性的get方法).
	 * 
	 * @param entity
	 *            对象
	 * @param fieldName
	 *            属性名
	 * @return
	 */
	public static Object doGetMethod(Object entity, String fieldName) {
		Object ret = null;
		Set<String> methodSet = getMethodsName(entity);
		if (methodSet.contains("get" + StringUtil.capitalize(fieldName))
				|| methodSet.contains(StringUtil.uncapitalize(fieldName))) {
			Method method;
			try {
				method = entity.getClass().getMethod("get" + StringUtil.capitalize(fieldName));
				ret = method.invoke(entity);
			} catch (Exception e) {
				logger.error("do get method " + fieldName, e);
			}
		}
		return ret;
	}

	/**
	 * 获取对象的所有set方法
	 * 
	 * @param obj
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static Map<String, Method> getSetMethods(Object obj) {
		Class clazz = obj.getClass();
		Map<String, Method> methodMap = methodSetCache.get(clazz.getSimpleName());
		if (methodMap == null) {
			methodMap = new HashMap<String, Method>();
			Set<Method> methods = getMethods(clazz);
			for (Method method : methods) {
				if (method.getName().startsWith("set")) {
					methodMap.put(StringUtil.uncapitalize(method.getName().substring(3)), method);
				}
			}
			methodSetCache.put(clazz.getSimpleName(), methodMap);
		}
		return methodMap;
	}

}
