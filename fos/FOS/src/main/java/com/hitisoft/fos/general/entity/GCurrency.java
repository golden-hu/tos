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
@Table(name = "G_CURRENCY")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GCurrency extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -8830057538290690407L;
	private Byte active;
	private String currCode;
	private String currName;
	private String currSymbol;

	public GCurrency() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "CURR_CODE")
	public String getCurrCode() {
		return this.currCode;
	}

	public void setCurrCode(String currCode) {
		this.currCode = currCode;
	}

	@Column(name = "CURR_NAME")
	public String getCurrName() {
		return this.currName;
	}

	public void setCurrName(String currName) {
		this.currName = currName;
	}

	@Column(name = "CURR_SYMBOL")
	public String getCurrSymbol() {
		return this.currSymbol;
	}

	public void setCurrSymbol(String currSymbol) {
		this.currSymbol = currSymbol;
	}

}
