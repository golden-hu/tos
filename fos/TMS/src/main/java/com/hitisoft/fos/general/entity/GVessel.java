package com.hitisoft.fos.general.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "G_VESSEL")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GVessel extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -4747170618759142161L;
	private Byte active;
	private String counCode;
	private String vessCode;
	private String vessDesc;
	private String vessLiner;
	private String vessNameCn;
	private String vessNameEn;
	private String vessType;

	public GVessel() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "COUN_CODE")
	public String getCounCode() {
		return this.counCode;
	}

	public void setCounCode(String counCode) {
		this.counCode = counCode;
	}

	@Column(name = "VESS_CODE")
	public String getVessCode() {
		return this.vessCode;
	}

	public void setVessCode(String vessCode) {
		this.vessCode = vessCode;
	}

	@Column(name = "VESS_DESC")
	public String getVessDesc() {
		return this.vessDesc;
	}

	public void setVessDesc(String vessDesc) {
		this.vessDesc = vessDesc;
	}

	@Column(name = "VESS_LINER")
	public String getVessLiner() {
		return this.vessLiner;
	}

	public void setVessLiner(String vessLiner) {
		this.vessLiner = vessLiner;
	}

	@Column(name = "VESS_NAME_CN")
	public String getVessNameCn() {
		return this.vessNameCn;
	}

	public void setVessNameCn(String vessNameCn) {
		this.vessNameCn = vessNameCn;
	}

	@Column(name = "VESS_NAME_EN")
	public String getVessNameEn() {
		return this.vessNameEn;
	}

	public void setVessNameEn(String vessNameEn) {
		this.vessNameEn = vessNameEn;
	}

	@Column(name = "VESS_TYPE")
	public String getVessType() {
		return this.vessType;
	}

	public void setVessType(String vessType) {
		this.vessType = vessType;
	}

}
