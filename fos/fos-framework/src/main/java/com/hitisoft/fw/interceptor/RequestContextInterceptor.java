package com.hitisoft.fw.interceptor;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.transform.stream.StreamSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.oxm.xstream.XstreamMarshaller;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.MessageType;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.spring.SpringContextHolder;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.StringUtil;
import com.hitisoft.fw.web.HtRequest;

@Component
public class RequestContextInterceptor extends HandlerInterceptorAdapter {
	Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	RequestContext context;
	@Autowired
	HtRequest htRequest;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
		extractParam(request);
		setDefaultMessageType();
		checkActionName();
		if (request instanceof MultipartHttpServletRequest) {
			MultipartHttpServletRequest multiRequest = ((MultipartHttpServletRequest) request);
			htRequest.setFileItems(multiRequest.getFileMap().values());
		} else {
			unMarshaller(request);
		}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// HTTP 1.0 header
		response.setDateHeader("Expires", 0);
		response.addHeader("Pragma", "no-cache");
		// HTTP 1.1 header
		response.setHeader("Cache-Control", "no-cache");
	}

	@SuppressWarnings("unchecked")
	private void extractParam(HttpServletRequest request) {
		Enumeration<String> paramEnum = request.getParameterNames();
		while (paramEnum.hasMoreElements()) {
			String paramName = paramEnum.nextElement();
			context.put(paramName, request.getParameter(paramName));
		}
		logger.info("from request params interceptor \n{}", context);
		logger.info("the request uri is \n{}?{}", request.getRequestURI(), request.getQueryString());
	}

	private void setDefaultMessageType() {
		String key = ContextKey.messageType.get();
		if (!MessageType.contains(context.get(key)))
			context.put(key, MessageType.xml.name());
	}

	private void checkActionName() {
		if (!context.containsKey(ContextKey.actionName.get())) {
			throw new BusinessException(ExceptionEnum.FW_SERVICE_NAME_NULL);
		}
	}

	private void unMarshaller(HttpServletRequest request) {
		if (context.containsKey(ContextKey.complexQuery.get())) {
			String xml = context.get(ContextKey.complexQuery.get());
			xml2Obj(xml);
		}
		if ("POST".equalsIgnoreCase(request.getMethod())) {
			String xml = readXml(request);
			xml2Obj(xml);
		}
	}

	private void xml2Obj(String xml) {
		if (StringUtil.isNotBlank(xml)) {
			logger.info("\n{}", xml);
			Object obj = null;
			try {
				obj = getMarshaller().unmarshal(new StreamSource(new StringReader(xml)));
			} catch (Exception e) {
				throw new BusinessException(ExceptionEnum.FW_PARSE_INPUT_ERROR, e);
			}
			if (obj instanceof HtRequest) {
				HtRequest tempHtRequest = (HtRequest) obj;
				htRequest.setData(tempHtRequest.getData());
			}
		}
	}

	private XstreamMarshaller getMarshaller() {
		String messType = context.get(ContextKey.messageType.get());
		XstreamMarshaller marshaller = null;
		if (MessageType.xml.name().equalsIgnoreCase(messType)) {
			marshaller = SpringContextHolder.getBean("xmlMarshaller");
			logger.info("use xml marshaller to convert");
		} else if (MessageType.json.name().equalsIgnoreCase(messType)) {
			marshaller = SpringContextHolder.getBean("jsonMarshaller");
			logger.info("use json marshaller to convert");
		}
		return marshaller;
	}

	private String readXml(HttpServletRequest request) {
		InputStream inputStream = null;
		InputStreamReader br = null;
		StringBuffer sb = new StringBuffer();
		BufferedReader br2 = null;
		try {
			inputStream = request.getInputStream();
			br = new InputStreamReader(inputStream, ConstUtil.ENCODING_UTF8);
			br2 = new BufferedReader(br);
			String line = null;
			while ((line = br2.readLine()) != null) {
				sb.append(line).append(ConstUtil.LINE_SEPARATOR);
			}
		} catch (IOException e) {
			logger.error("error", e);
		} finally {
			try {
				if (br2 != null)
					br2.close();
				if (br != null)
					br.close();
				if (inputStream != null)
					inputStream.close();
			} catch (IOException e) {
				logger.error("error", e);
			}
		}
		return sb.toString();
	}
}
