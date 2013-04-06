package com.hitisoft.fw.view;

import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.AbstractCachingViewResolver;

import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.spring.SpringContextHolder;

public class ContentViewResolver extends AbstractCachingViewResolver {

	@Autowired
	RequestContext context;

	private Map<String, View> viewMap = null;
	/**
	 * 根据RequestParamMap中, 前台传过来的Message Type, 确定View
	 * Message Type(xml,json,html) + View
	 */
	@Override
	protected View loadView(String viewName, Locale locale) throws Exception {
		if(viewMap == null){
			viewMap = SpringContextHolder.getBeansOfType(View.class);
		}
		return viewMap.get(context.get(ContextKey.messageType.get()) + "View");
	}
}
