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
@Table(name = "G_CHARGE_CLASS")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GChargeClass extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -3995420644482607685L;
	private Byte active;
	private String chclCode;
	private String chclName;

	public GChargeClass() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "CHCL_CODE")
	public String getChclCode() {
		return this.chclCode;
	}

	public void setChclCode(String chclCode) {
		this.chclCode = chclCode;
	}

	@Column(name = "CHCL_NAME")
	public String getChclName() {
		return this.chclName;
	}

	public void setChclName(String chclName) {
		this.chclName = chclName;
	}

}
