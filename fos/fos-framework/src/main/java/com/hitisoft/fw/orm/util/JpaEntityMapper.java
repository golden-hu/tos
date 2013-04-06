package com.hitisoft.fw.orm.util;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.persistence.EntityManagerFactory;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import com.hitisoft.fw.spring.SpringContextHolder;

@Component
public class JpaEntityMapper implements InitializingBean {
	private Map<String, Class<?>> classMap = new ConcurrentHashMap<String, Class<?>>();

	public Class<?> getClass(String className) {
		return classMap.get(className);
	}

	public Map<String, Class<?>> getMapper() {
		return classMap;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		init();
	}

	private void init() {
		EntityManagerFactory emf = SpringContextHolder.getBean(EntityManagerFactory.class);
		for (EntityType<?> item : emf.getMetamodel().getEntities()) {
			Class<?> clazz = item.getJavaType();
			classMap.put(clazz.getSimpleName(), clazz);
		}
	}
}
