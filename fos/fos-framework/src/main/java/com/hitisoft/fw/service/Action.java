package com.hitisoft.fw.service;


public class Action {
	private static final long serialVersionUID = 5813968523402616302L;
	private Long id;
	private String code;
	private String serviceName;
	private String method;
	private String remark;
	private Byte daemonFlag;
	private Byte singletonFlag;
	private Byte loginFlag;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public String getMethod() {
		return method;
	}
	public void setMethod(String method) {
		this.method = method;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Byte getDaemonFlag() {
		return daemonFlag;
	}
	public void setDaemonFlag(Byte daemonFlag) {
		this.daemonFlag = daemonFlag;
	}
	public Byte getSingletonFlag() {
		return singletonFlag;
	}
	public void setSingletonFlag(Byte singletonFlag) {
		this.singletonFlag = singletonFlag;
	}
	public Byte getLoginFlag() {
		return loginFlag;
	}
	public void setLoginFlag(Byte loginFlag) {
		this.loginFlag = loginFlag;
	}
	
}
