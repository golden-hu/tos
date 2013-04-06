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
@Table(name="P_EVENT")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
/**
 * 货物跟踪
 * @author JOHN
 */
public class PEvent extends BaseDomain implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long consignId;
	private String typeName;
	private Integer typeNameId;
	private String bizType;
	private Date estimatedDate;
	private Date finishedDate;
	private Integer status;
	
	public PEvent(){}
	
	@Column(name="TYPE_NAME")
	public String getTypeName() {
		return this.typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	
	@Column(name="BIZ_TYPE")
	public String getBizType() {
		return bizType;
	}
	public void setBizType(String bizType) {
		this.bizType = bizType;
	}

	@Column(name="CONSIGN_ID")
	public Long getConsignId() {
		return this.consignId;
	}

	public void setConsignId(Long consignId) {
		this.consignId = consignId;
	}
	
	@Column(name="TYPE_NAME_ID")
	public Integer getTypeNameId() {
		return this.typeNameId;
	}

	public void setTypeNameId(Integer typeNameId) {
		this.typeNameId = typeNameId;
	}
	
	@Temporal( TemporalType.TIMESTAMP)
	@Column(name="ESTIMATED_DATE")
	public Date getEstimatedDate() {
		return this.estimatedDate;
	}

	public void setEstimatedDate(Date estimatedDate) {
		this.estimatedDate = estimatedDate;
	}
	
	@Temporal( TemporalType.TIMESTAMP)
	@Column(name="FINISHED_DATE")
	public Date getFinishedDate() {
		return this.finishedDate;
	}

	public void setFinishedDate(Date finishedDate) {
		this.finishedDate = finishedDate;
	}

	@Column(name="STATUS")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
	
	
}
