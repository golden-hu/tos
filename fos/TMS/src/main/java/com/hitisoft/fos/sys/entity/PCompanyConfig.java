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
@Table(name = "P_COMPANY_CONFIG")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PCompanyConfig extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 7736815833202808519L;
	private String cocoCode;
	private String cocoDesc;
	private String cocoGroup;
	private String cocoName;
	private String cocoType;
	private String cocoValue;
	private String cocoValueOptions;
	private Byte cocoValueType;

	public PCompanyConfig() {
	}

	@Column(name = "COCO_CODE")
	public String getCocoCode() {
		return this.cocoCode;
	}

	public void setCocoCode(String cocoCode) {
		this.cocoCode = cocoCode;
	}

	@Column(name = "COCO_DESC")
	public String getCocoDesc() {
		return this.cocoDesc;
	}

	public void setCocoDesc(String cocoDesc) {
		this.cocoDesc = cocoDesc;
	}

	@Column(name = "COCO_GROUP")
	public String getCocoGroup() {
		return this.cocoGroup;
	}

	public void setCocoGroup(String cocoGroup) {
		this.cocoGroup = cocoGroup;
	}

	@Column(name = "COCO_NAME")
	public String getCocoName() {
		return this.cocoName;
	}

	public void setCocoName(String cocoName) {
		this.cocoName = cocoName;
	}

	@Column(name = "COCO_TYPE") 
	public String getCocoType() {
		return this.cocoType;
	}

	public void setCocoType(String cocoType) {
		this.cocoType = cocoType;
	}

	@Column(name = "COCO_VALUE")
	public String getCocoValue() {
		return this.cocoValue;
	}

	public void setCocoValue(String cocoValue) {
		this.cocoValue = cocoValue;
	}

	@Column(name = "COCO_VALUE_OPTIONS")
	public String getCocoValueOptions() {
		return this.cocoValueOptions;
	}

	public void setCocoValueOptions(String cocoValueOptions) {
		this.cocoValueOptions = cocoValueOptions;
	}

	@Column(name = "COCO_VALUE_TYPE")
	public Byte getCocoValueType() {
		return this.cocoValueType;
	}

	public void setCocoValueType(Byte cocoValueType) {
		this.cocoValueType = cocoValueType;
	}

}
