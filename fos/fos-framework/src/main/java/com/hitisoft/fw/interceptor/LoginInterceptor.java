package com.hitisoft.fw.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.service.Action;
import com.hitisoft.fw.service.ActionManager;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;

@Component
public class LoginInterceptor extends HandlerInterceptorAdapter {
	Logger logger = LoggerFactory.getLogger(this.getClass());
	@Autowired
	RequestContext context;
	@Autowired
	SessionContext sessionContext;
	@Autowired
	ActionManager actionManager;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		logger.debug("this is from LoginInterceptor");
		if (sessionContext.getUserid() == null) {
			Action action = actionManager.getAction(context.get(ContextKey.actionName.get()));
			if (ConstUtil.TrueByte.equals(action.getLoginFlag())) {
				throw new BusinessException(ExceptionEnum.FW_SERVICE_NEED_LOGIN, action.getCode());
			} else {
				setAnonymousUser();
			}
		}
		sessionContext.setHostname(request.getRemoteAddr());
		return true;
	}

	private void setAnonymousUser() {
		sessionContext.setUserid(1L);
		sessionContext.setUsername("anonymous");
	}
}
