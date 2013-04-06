package com.hitisoft.fw.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.hitisoft.fw.session.SessionContext;

@org.springframework.stereotype.Service
public class DaemonService {
	@Autowired
	private SessionContext sessionContext;

	public void setup() {
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpSession session = new MockHttpSession();
		request.setContextPath("/daemon");
		request.setSession(session);
		RequestAttributes requestAttributes = new ServletRequestAttributes(request);
		RequestContextHolder.setRequestAttributes(requestAttributes);
		sessionContext.setUserid(1L);
		sessionContext.setUsername("daemon");
	}

}
