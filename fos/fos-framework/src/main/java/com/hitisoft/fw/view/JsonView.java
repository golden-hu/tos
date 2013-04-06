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

public class JsonView extends AbstractView {

	/**
	 * Default content type. Overridable as bean property.
	 */
	public static final String DEFAULT_CONTENT_TYPE = "application/json";

	private Marshaller marshaller;

	private String modelKey;
	private Logger logger = LoggerFactory.getLogger(this.getClass());

	public JsonView() {
		setContentType(DEFAULT_CONTENT_TYPE);
	}

	public JsonView(Marshaller marshaller) {
		Assert.notNull(marshaller, "'marshaller' must not be null");
		setContentType(DEFAULT_CONTENT_TYPE);
		this.marshaller = marshaller;
	}

	public void setMarshaller(Marshaller marshaller) {
		Assert.notNull(marshaller, "'marshaller' must not be null");
		this.marshaller = marshaller;
	}

	/**
	 * Set the name of the model key that represents the object to be
	 * marshalled. If not specified, the model map will be searched for a
	 * supported value type.
	 * 
	 * @see Marshaller#supports(Class)
	 */
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
		String xml = bos.toString(ConstUtil.ENCODING_UTF8);
		xml = dropRoot(xml);
		logger.info("\n{}", bos);
		byte[] byteArray = xml.getBytes(ConstUtil.ENCODING_UTF8);
		response.setContentLength(byteArray.length);
		FileCopyUtils.copy(byteArray, response.getOutputStream());
	}

	public static String dropRoot(String xml) {
		if (xml.indexOf("HtResponse") == 2) {
			xml = xml.substring(14, xml.length() - 1);
		}
		return xml;
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
