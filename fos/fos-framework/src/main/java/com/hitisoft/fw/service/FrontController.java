package com.hitisoft.fw.service;

import java.lang.reflect.Method;
import java.util.Collection;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.exception.HtExceptionHandler;
import com.hitisoft.fw.exception.MessageMapper;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.spring.SpringContextHolder;
import com.hitisoft.fw.web.HtRequest;
import com.hitisoft.fw.web.HtResponse;

@Controller
public class FrontController {
	@Autowired
	ActionManager actionManager;
	@Autowired
	RequestContext context;
	@Autowired
	HtRequest htRequest;
	@Autowired
	MessageMapper messageMapper;
	@Autowired
	HtExceptionHandler htExceptionHandler;

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/*")
	public ModelAndView front() throws Exception {
		HtResponse htResponse = getSuccessResponse();
		if (context.containsKey(ContextKey.uploadFile.get()))
			htResponse.setSuccess(true);
		Object ret = dispatchService(htRequest.getData());
		if (ret != null) {
			if (ret instanceof List) {
				htResponse.getData().addAll((Collection<? extends Object>) ret);
			} else {
				htResponse.getData().add(ret);
			}
		}
		htResponse.setRowCount(context.get(ContextKey.rowCount.get()));
		return getModelAndView(htResponse);
	}

	@ExceptionHandler
	public ModelAndView exceptionHandler(Exception e, HttpServletResponse response) {
		HtResponse htResponse = htExceptionHandler.doHandler(e);
		if (context.containsKey(ContextKey.uploadFile.get()))
			htResponse.setSuccess(false);
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return getModelAndView(htResponse);
	}

	/*private ModelAndView getModelAndView(HtResponse htResponse) {
		ModelAndView mv = new ModelAndView();
		mv.addObject("htResponse", htResponse);
		mv.setViewName("");
		return mv;
	}*/

	private ModelAndView getModelAndView(HtResponse htResponse) {
		ModelAndView mv = new ModelAndView();
		mv.addObject("htResponse", htResponse);
		mv.setViewName("");
		if (context.containsKey(ContextKey.redirectUrl.get())) {
			context.put(ContextKey.messageType.get(), "redirect");
			mv.addObject(ContextKey.redirectUrl.get(), context.get(ContextKey.redirectUrl.get()));
		}
		return mv;
	}
	
	private HtResponse getSuccessResponse() {
		HtResponse htResponse = new HtResponse();
		htResponse.setRowCount("0");
		htResponse.setCode(ExceptionEnum.FW_SUCCESS.get());
		htResponse.setMsg(messageMapper.getMessage(ExceptionEnum.FW_SUCCESS.get()));
		return htResponse;
	}

	@SuppressWarnings("rawtypes")
	private Object dispatchService(List domainList) throws Exception {
		String actionName = context.get(ContextKey.actionName.get());
		Action action = actionManager.getAction(actionName);
		Object service = SpringContextHolder.getBean(action.getServiceName());
		Method[] methods = service.getClass().getMethods();
		Object retObj = null;
		for (Method method : methods) {
			if (method.getName().equalsIgnoreCase(action.getMethod())) {
				Class<?> paramType[] = method.getParameterTypes();
				Object paramObj[] = new Object[paramType.length];
				int i = 0;
				for (Class<?> paramClass : paramType) {
					if (List.class.isAssignableFrom(paramClass)) {
						paramObj[i] = domainList;
					} else {
						paramObj[i] = (domainList == null ? null : domainList.get(0));
					}
					i++;
				}
				retObj = method.invoke(service, paramObj);
			}
		}
		return retObj;
	}
}
