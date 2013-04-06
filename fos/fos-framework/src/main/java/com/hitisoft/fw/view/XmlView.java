package com.hitisoft.fw.view;

import java.io.ByteArrayOutputStream;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.transform.stream.StreamResult;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.oxm.Marshaller;
import org.springframework.util.Assert;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.servlet.view.AbstractView;

import com.hitisoft.fw.util.ConstUtil;

public class XmlView extends AbstractView {
	public static final String DEFAULT_CONTENT_TYPE = "application/xml";

	private Marshaller marshaller;

	private String modelKey;
	private Logger logger = LoggerFactory.getLogger(this.getClass());

	public XmlView() {
		setContentType(DEFAULT_CONTENT_TYPE);
	}

	public XmlView(Marshaller marshaller) {
		Assert.notNull(marshaller, "'marshaller' must not be null");
		setContentType(DEFAULT_CONTENT_TYPE);
		this.marshaller = marshaller;
	}

	public void setMarshaller(Marshaller marshaller) {
		Assert.notNull(marshaller, "'marshaller' must not be null");
		this.marshaller = marshaller;
	}

	public void setModelKey(String modelKey) {
		this.modelKey = modelKey;
	}

	@Override
	protected void initApplicationContext() throws BeansException {
		Assert.notNull(marshaller, "Property 'marshaller' is required");
	}

	@SuppressWarnings("rawtypes")
	@Override
	protected void renderMergedOutputModel(Map model, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Object toBeMarshalled = locateToBeMarshalled(model);
		if (toBeMarshalled == null) {
			throw new ServletException("Unable to locate object to be marshalled in model: "
					+ model);
		}
		ByteArrayOutputStream bos = new ByteArrayOutputStream(2048);
		marshaller.marshal(toBeMarshalled, new StreamResult(bos));

		response.setContentType(getContentType());
		response.setContentLength(bos.size());
		logger.info("\n{}", bos.toString(ConstUtil.ENCODING_UTF8));
		FileCopyUtils.copy(bos.toByteArray(), response.getOutputStream());
	}

	@SuppressWarnings({ "rawtypes" })
	protected Object locateToBeMarshalled(Map model) throws ServletException {
		if (this.modelKey != null) {
			Object o = model.get(this.modelKey);
			if (!this.marshaller.supports(o.getClass())) {
				throw new ServletException("Model object [" + o + "] retrieved via key ["
						+ modelKey + "] is not supported by the Marshaller");
			}
			return o;
		}
		for (Object o : model.values()) {
			if (this.marshaller.supports(o.getClass())) {
				return o;
			}
		}
		return null;
	}
}
