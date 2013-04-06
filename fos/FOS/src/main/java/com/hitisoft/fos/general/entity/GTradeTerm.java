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
@Table(name = "G_TRADE_TERM")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GTradeTerm extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -926365086398191042L;
	private Byte active;
	private String trteCode;
	private String trteName;

	public GTradeTerm() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "TRTE_CODE")
	public String getTrteCode() {
		return this.trteCode;
	}

	public void setTrteCode(String trteCode) {
		this.trteCode = trteCode;
	}

	@Column(name = "TRTE_NAME")
	public String getTrteName() {
		return this.trteName;
	}

	public void setTrteName(String trteName) {
		this.trteName = trteName;
	}

}
