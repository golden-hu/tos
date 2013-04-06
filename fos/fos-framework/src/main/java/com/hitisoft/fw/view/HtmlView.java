package com.hitisoft.fw.view;

import java.io.ByteArrayOutputStream;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.servlet.view.AbstractView;

import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.StringUtil;
import com.hitisoft.fw.web.HtResponse;

public class HtmlView extends AbstractView {
	/**
	 * Default content type. Overridable as bean property.
	 */
	public static final String DEFAULT_CONTENT_TYPE = "text/html";
	private String modelKey;
	private Logger logger = LoggerFactory.getLogger(this.getClass());

	public HtmlView() {
		setContentType(DEFAULT_CONTENT_TYPE);
	}

	public void setModelKey(String modelKey) {
		this.modelKey = modelKey;
	}

	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		HtResponse htr = (HtResponse) model.get(modelKey);
		String strHtml = "";
		if (!StringUtil.isEqual(htr.getCode(), "fw.success")) {
			strHtml = htr.getMsg();
		} else if (htr.getData().size() > 0) {
			strHtml = (String) htr.getData().get(0);
		}
		ByteArrayOutputStream bos = new ByteArrayOutputStream(2048);
		bos.write(strHtml.getBytes(ConstUtil.ENCODING_UTF8));

		response.setContentType(getContentType());
		response.setContentLength(bos.size());
		logger.info("\n{}", strHtml);

		FileCopyUtils.copy(bos.toByteArray(), response.getOutputStream());
	}

}
