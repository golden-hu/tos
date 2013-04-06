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
@Table(name = "G_CARGO_CLASS")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GCargoClass extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 2470088102085963708L;
	private Byte active;
	private String caclCode;
	private String caclNameCn;
	private String caclNameEn;
	private Double premiumRate;
	
	public GCargoClass() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "CACL_CODE")
	public String getCaclCode() {
		return this.caclCode;
	}

	public void setCaclCode(String caclCode) {
		this.caclCode = caclCode;
	}

	@Column(name = "CACL_NAME_CN")
	public String getCaclNameCn() {
		return this.caclNameCn;
	}

	public void setCaclNameCn(String caclNameCn) {
		this.caclNameCn = caclNameCn;
	}

	@Column(name = "CACL_NAME_EN")
	public String getCaclNameEn() {
		return this.caclNameEn;
	}

	public void setCaclNameEn(String caclNameEn) {
		this.caclNameEn = caclNameEn;
	}

	@Column(name = "PREMIUM_RATE")
	public Double getPremiumRate() {
		return this.premiumRate;
	}

	public void setPremiumRate(Double premiumRate) {
		this.premiumRate = premiumRate;
	}
}
