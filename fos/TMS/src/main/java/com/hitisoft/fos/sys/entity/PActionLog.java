package com.hitisoft.fos.sys.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.IdDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "P_ACTION_LOG")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PActionLog extends IdDomain implements Serializable {
	private static final long serialVersionUID = 824525440095644197L;
	private String acloActName;
	private String acloActRemark;
	private String acloIp;
	private String acloTable;
	private Integer acloTid;
	private String acloTno;
	private Integer acloUserId;
	private String acloUserName;
	private String compCode;
	protected Date createTime;

	public PActionLog() {
	}

	@Column(name = "ACLO_ACT_NAME")
	public String getAcloActName() {
		return this.acloActName;
	}

	public void setAcloActName(String acloActName) {
		this.acloActName = acloActName;
	}

	@Column(name = "ACLO_ACT_REMARK")
	public String getAcloActRemark() {
		return this.acloActRemark;
	}

	public void setAcloActRemark(String acloActRemark) {
		this.acloActRemark = acloActRemark;
	}

	@Column(name = "ACLO_IP")
	public String getAcloIp() {
		return this.acloIp;
	}

	public void setAcloIp(String acloIp) {
		this.acloIp = acloIp;
	}

	@Column(name = "ACLO_TABLE")
	public String getAcloTable() {
		return this.acloTable;
	}

	public void setAcloTable(String acloTable) {
		this.acloTable = acloTable;
	}

	@Column(name = "ACLO_TID")
	public Integer getAcloTid() {
		return this.acloTid;
	}

	public void setAcloTid(Integer acloTid) {
		this.acloTid = acloTid;
	}

	@Column(name = "ACLO_TNO")
	public String getAcloTno() {
		return this.acloTno;
	}

	public void setAcloTno(String acloTno) {
		this.acloTno = acloTno;
	}

	@Column(name = "ACLO_USER_ID")
	public Integer getAcloUserId() {
		return this.acloUserId;
	}

	public void setAcloUserId(Integer acloUserId) {
		this.acloUserId = acloUserId;
	}

	@Column(name = "ACLO_USER_NAME")
	public String getAcloUserName() {
		return this.acloUserName;
	}

	public void setAcloUserName(String acloUserName) {
		this.acloUserName = acloUserName;
	}

	@Column(name = "COMP_CODE")
	public String getCompCode() {
		return this.compCode;
	}

	public void setCompCode(String compCode) {
		this.compCode = compCode;
	}
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CREATE_TIME", updatable = false)
	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

}
