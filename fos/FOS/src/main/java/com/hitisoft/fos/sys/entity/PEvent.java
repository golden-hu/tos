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

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "P_EVENT")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PEvent extends BaseDomain implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long peId;
	private Long consignId;
	private Long transId;
	private String typeName;
	private Integer typeNameId;
	private String bizType;
	private Date trackDate;
	private String trackTime;
	private Integer status;
	private String operatorName;// 操作人

	public PEvent() {
	}
	
	@Column(name = "PE_ID")
	public Long getPeId() {
		return peId;
	}

	public void setPeId(Long peId) {
		this.peId = peId;
	}

	@Column(name = "TYPE_NAME")
	public String getTypeName() {
		return this.typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	@Column(name = "BIZ_TYPE")
	public String getBizType() {
		return bizType;
	}

	public void setBizType(String bizType) {
		this.bizType = bizType;
	}

	@Column(name = "CONSIGN_ID")
	public Long getConsignId() {
		return this.consignId;
	}

	public void setConsignId(Long consignId) {
		this.consignId = consignId;
	}

	@Column(name = "TRANS_ID")
	public Long getTransId() {
		return this.transId;
	}

	public void setTransId(Long transId) {
		this.transId = transId;
	}

	@Column(name = "TYPE_NAME_ID")
	public Integer getTypeNameId() {
		return this.typeNameId;
	}

	public void setTypeNameId(Integer typeNameId) {
		this.typeNameId = typeNameId;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "TRACK_DATE")
	public Date getTrackDate() {
		return this.trackDate;
	}

	public void setTrackDate(Date trackDate) {
		this.trackDate = trackDate;
	}
	
	@Column(name = "TRACK_TIME")
	public String getTrackTime() {
		return this.trackTime;
	}

	public void setTrackTime(String trackTime) {
		this.trackTime = trackTime;
	}

	@Column(name = "STATUS")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Column(name = "OPERATOR_NAME")
	public String getOperatorName() {
		return this.operatorName;
	}

	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}

}
