package com.hitisoft.fw.session;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.CollectionUtils;

import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.util.StringUtil;

public enum MessageType {
	xml, json, html, form;
	private static Logger logger = LoggerFactory.getLogger(MessageType.class);
	
	@SuppressWarnings("unchecked")
	public static boolean contains(String type) {
		if (StringUtil.isBlank(type))
			return false;
		List<MessageType> list = CollectionUtils.arrayToList(MessageType.values());
		MessageType x = null;
		try {
			x = MessageType.valueOf(type);
		} catch (Exception e) {
			logger.error("message type error: {}", type);
			throw new BusinessException(ExceptionEnum.FW_MESSAGE_TYPE_ERROR, type);
		}
		return list.contains(x);
	}
}
