package com.hitisoft.cms.util;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.ServletContextAware;

import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;

@Component
public class ConfigUtil implements ServletContextAware {
	@Autowired
	private SessionContext sessionContext;
	private String contextPath;
	private String dataDir;
	private String resourceDir;
	private String templateDir;

	//@Override
	public void setServletContext(ServletContext servletContext) {
		contextPath = servletContext.getRealPath("/");
	}

	public String getContextPath() {
		return contextPath;
	}

	public void setContextPath(String contextPath) {
		this.contextPath = contextPath;
	}

	public String getDataDir() {
		return dataDir;
	}

	public void setDataDir(String dataDir) {
		this.dataDir = dataDir;
	}

	public String getResourceDir() {
		return getDataDir() + ConstUtil.DIR_SEP + sessionContext.getCompCode() + resourceDir;
	}

	public String getRealResourceDir() {
		return getContextPath() + getResourceDir();
	}

	public void setResourceDir(String resourceDir) {
		this.resourceDir = resourceDir;
	}

	public String getTemplateDir() {
		return getDataDir() + ConstUtil.DIR_SEP + sessionContext.getCompCode() + templateDir;
	}

	public String getRealTemplateDir() {
		return getContextPath() + getTemplateDir();
	}

	public void setTemplateDir(String templateDir) {
		this.templateDir = templateDir;
	}

}
