package com.hitisoft.fw.spring;

import java.util.Map;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class SpringContextHolder implements ApplicationContextAware {
	private static ApplicationContext ac;

	public static ApplicationContext getContext() {
		return ac;
	}

	@Override
	public void setApplicationContext(ApplicationContext ctx) throws BeansException {
		ac = ctx;
	}

	@SuppressWarnings("unchecked")
	public static <T> T getBean(String beanName) {
		return (T) ac.getBean(beanName);
	}

	public static <T> T getBean(Class<T> clazz) {
		return ac.getBean(clazz);
	}

	public static <T> Map<String, T> getBeansOfType(Class<T> type) {
		return ac.getBeansOfType(type);
	}
}
