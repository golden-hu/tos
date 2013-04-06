package com.hitisoft.fos.sys.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="P_EVENT_TYPE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PEventType extends BaseDomain implements Serializable {

	private static final long serialVersionUID = 1L;
	private String typeName;
	private String bizType;
	private Integer active;
	
	public PEventType(){}
	
	@Column(name="TYPE_NAME")
	public String getTypeName() {
		return this.typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	
	@Column(name="BIZ_TYPE")
	public String getBizType() {
		return this.bizType;
	}
	public void setBizType(String bizType) {
		this.bizType = bizType;
	}

	@Column(name="ACTIVE")
	public Integer getActive() {
		return this.active;
	}

	public void setActive(Integer active) {
		this.active = active;
	}
	
}
