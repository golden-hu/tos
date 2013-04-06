package com.hitisoft.fw.exception;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

import com.hitisoft.fw.spring.SpringContextHolder;
import com.hitisoft.fw.util.ConstUtil;

/**
 * 映射Message Enum -> Message Source key
 * @author guo
 *
 */
@Component
public class MessageMapper implements InitializingBean {
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	private MessageSource ms;
	private String[] clazzes;
	private Map<Messageable, String> messageMap = new HashMap<Messageable, String>();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private void loadMessage() {
		try {
			for (String strClazz : clazzes) {
				Class clazz = Class.forName(strClazz);
				Field[] fieldArray = clazz.getDeclaredFields();
				String interfaceMethodName = Messageable.class.getDeclaredMethods()[0].getName();
				Method method = clazz.getDeclaredMethod(interfaceMethodName);
				for (Field field : fieldArray) {
					if (field.isEnumConstant()) {
						Object enumObj = Enum.valueOf(clazz, field.getName());
						messageMap.put((Messageable) enumObj, (String) method.invoke(enumObj));
					}
				}
			}
		} catch (Exception e) {
			logger.error("load exception message faild", e);
		}

	}

	@Override
	public void afterPropertiesSet() throws Exception {
		ms = SpringContextHolder.getContext();
		loadMessage();
	}

	public boolean contains(String type) {
		Collection<String> col = messageMap.values();
		return col.contains(type);
	}

	public String getMessage(Messageable em) {
		return ms.getMessage(em.get(), null, ConstUtil.LOCALE_DEFAULT);
	}

	public String getMessage(Messageable em, Object[] objArray) {
		return ms.getMessage(em.get(), objArray, ConstUtil.LOCALE_DEFAULT);
	}
	public String getMessage(String s) {
		return ms.getMessage(s, null, ConstUtil.LOCALE_DEFAULT);
	}

	public String getMessage(String s, Object... param) {
		return ms.getMessage(s, param, ConstUtil.LOCALE_DEFAULT);
	}


	public String[] getClazzes() {
		return clazzes;
	}

	public void setClazzes(String[] clazzes) {
		this.clazzes = clazzes;
	}

}
