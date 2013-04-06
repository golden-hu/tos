package com.hitisoft.fw.view;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.AbstractView;

import com.hitisoft.fw.session.ContextKey;


public class RedirectView extends AbstractView {

	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.sendRedirect((String) model.get(ContextKey.redirectUrl.get()));
	}

}
