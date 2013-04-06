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
@Table(name = "G_COUNTRY")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GCountry extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1796077041362531429L;
	private Byte active;
	private String counCode;
	private String counNameCn;
	private String counNameEn;

	public GCountry() {
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

	@Column(name = "COUN_NAME_CN")
	public String getCounNameCn() {
		return this.counNameCn;
	}

	public void setCounNameCn(String counNameCn) {
		this.counNameCn = counNameCn;
	}

	@Column(name = "COUN_NAME_EN")
	public String getCounNameEn() {
		return this.counNameEn;
	}

	public void setCounNameEn(String counNameEn) {
		this.counNameEn = counNameEn;
	}

}
