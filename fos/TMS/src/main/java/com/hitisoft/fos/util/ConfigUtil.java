package com.hitisoft.fos.util;

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
	private String initDataDir;
	private String templateDir;
	private String attachDir;
	private String tempDir;
	private String exportDir;
	private String loginUrl;
	private boolean messageAutoFlag;
	private boolean loginRepeatCheck;
	private String mailSender;
	private String faxSender;
	private String initSql;
	private String mysqlDriver;
	private String mysqlUrl;
	private String mysqlUserName;
	private String mysqlPassword;
	private String consoleName;
	private String consolePassword;
	
	@Override
	public void setServletContext(ServletContext servletContext) {
		contextPath = servletContext.getRealPath("/");
	}

	public String getContextPath() {
		return contextPath;
	}

	public void setContextPath(String contextPath) {
		this.contextPath = contextPath;
	}

	public String getRealTemplateDir() {
		return contextPath + ConstUtil.DIR_SEP + getTemplateDir();
	}

	public String getRealAttachDir() {
		return contextPath + ConstUtil.DIR_SEP + getAttachDir();
	}
	
	public String getRealTempDir() {
		return contextPath + ConstUtil.DIR_SEP + getTempDir();
	}

	public String getRealExportDir() {
		return contextPath + ConstUtil.DIR_SEP + getExportDir();
	}

	public String getDataDir() {
		return dataDir;
	}

	public void setDataDir(String dataDir) {
		this.dataDir = dataDir;
	}

	public void setInitDataDir(String initDataDir) {
		this.initDataDir = initDataDir;
	}
	
	public String getInitDataDir() {
		return initDataDir;
	}
	
	public void setInitSql(String initSql) {
		this.initSql = initSql;
	}
	
	public String getInitSql() {
		return initSql;
	}
	
	public String getTemplateDir() {
		return getDataDir() + ConstUtil.DIR_SEP + sessionContext.getCompCode()+ ConstUtil.DIR_SEP + templateDir;
	}

	public String getAttachDir() {
		return getDataDir() + ConstUtil.DIR_SEP + sessionContext.getCompCode()+ ConstUtil.DIR_SEP + attachDir;
	}
	
	public void setTemplateDir(String templateDir) {
		this.templateDir = templateDir;
	}

	public String getTempDir() {
		return getDataDir() + ConstUtil.DIR_SEP + sessionContext.getCompCode()+ ConstUtil.DIR_SEP + tempDir;
	}

	public void setTempDir(String tempDir) {
		this.tempDir = tempDir;
	}

	public String getExportDir() {
		return getDataDir() + ConstUtil.DIR_SEP + sessionContext.getCompCode()+ ConstUtil.DIR_SEP + exportDir;
	}

	public String getRealInitDataDir(){
		return contextPath + ConstUtil.DIR_SEP + getInitDataDir()+ ConstUtil.DIR_SEP + getInitSql();
	}
	
	public String getRealInitTemplate(){
		return contextPath + ConstUtil.DIR_SEP + getInitTemplate();
	}
	
	public String getInitTemplate(){
		return getInitDataDir() + ConstUtil.DIR_SEP + sessionContext.getCompCode()+ ConstUtil.DIR_SEP + templateDir;
	}
	
	public void setExportDir(String exportDir) {
		this.exportDir = exportDir;
	}

	public String getLoginUrl() {
		return loginUrl;
	}

	public void setLoginUrl(String loginUrl) {
		this.loginUrl = loginUrl;
	}

	public boolean isMessageAutoFlag() {
		return messageAutoFlag;
	}

	public void setMessageAutoFlag(boolean messageAutoFlag) {
		this.messageAutoFlag = messageAutoFlag;
	}

	public boolean isLoginRepeatCheck() {
		return loginRepeatCheck;
	}

	public void setLoginRepeatCheck(boolean loginRepeatCheck) {
		this.loginRepeatCheck = loginRepeatCheck;
	}

	public String getMailSender() {
		return mailSender;
	}

	public void setMailSender(String mailSender) {
		this.mailSender = mailSender;
	}

	public String getFaxSender() {
		return faxSender;
	}

	public void setFaxSender(String faxSender) {
		this.faxSender = faxSender;
	}

	public String getMysqlDriver() {
		return mysqlDriver;
	}

	public void setMysqlDriver(String mysqlDriver) {
		this.mysqlDriver = mysqlDriver;
	}

	public String getMysqlUrl() {
		return mysqlUrl;
	}

	public void setMysqlUrl(String mysqlUrl) {
		this.mysqlUrl = mysqlUrl;
	}

	public String getMysqlUserName() {
		return mysqlUserName;
	}

	public void setMysqlUserName(String mysqlUserName) {
		this.mysqlUserName = mysqlUserName;
	}

	public String getMysqlPassword() {
		return mysqlPassword;
	}

	public void setMysqlPassword(String mysqlPassword) {
		this.mysqlPassword = mysqlPassword;
	}
	public String getConsoleName() {
		return consoleName;
	}

	public void setConsoleName(String consoleName) {
		this.consoleName = consoleName;
	}

	public String getConsolePassword() {
		return consolePassword;
	}

	public void setConsolePassword(String consolePassword) {
		this.consolePassword = consolePassword;
	}
}
