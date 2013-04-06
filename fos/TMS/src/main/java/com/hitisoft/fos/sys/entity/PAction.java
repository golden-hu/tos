package com.hitisoft.fos.sys.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.IdDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "P_ACTION")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PAction extends IdDomain implements Serializable {
	private static final long serialVersionUID = 667133050423384908L;
	private String actCode;
	private Byte actDaemonFlag;
	private Byte actLoginFlag;
	private String actMethod;
	private String actRemark;
	private String actService;
	private Byte actSingletonFlag;

	public PAction() {
	}

	@Column(name = "ACT_CODE")
	public String getActCode() {
		return actCode;
	}

	public void setActCode(String actCode) {
		this.actCode = actCode;
	}

	@Column(name = "ACT_DAEMON_FLAG")
	public Byte getActDaemonFlag() {
		return this.actDaemonFlag;
	}

	public void setActDaemonFlag(Byte actDaemonFlag) {
		this.actDaemonFlag = actDaemonFlag;
	}

	@Column(name = "ACT_LOGIN_FLAG")
	public Byte getActLoginFlag() {
		return this.actLoginFlag;
	}

	public void setActLoginFlag(Byte actLoginFlag) {
		this.actLoginFlag = actLoginFlag;
	}

	@Column(name = "ACT_METHOD")
	public String getActMethod() {
		return this.actMethod;
	}

	public void setActMethod(String actMethod) {
		this.actMethod = actMethod;
	}

	@Column(name = "ACT_REMARK")
	public String getActRemark() {
		return this.actRemark;
	}

	public void setActRemark(String actRemark) {
		this.actRemark = actRemark;
	}

	@Column(name = "ACT_SERVICE")
	public String getActService() {
		return this.actService;
	}

	public void setActService(String actService) {
		this.actService = actService;
	}

	@Column(name = "ACT_SINGLETON_FLAG")
	public Byte getActSingletonFlag() {
		return this.actSingletonFlag;
	}

	public void setActSingletonFlag(Byte actSingletonFlag) {
		this.actSingletonFlag = actSingletonFlag;
	}

}
