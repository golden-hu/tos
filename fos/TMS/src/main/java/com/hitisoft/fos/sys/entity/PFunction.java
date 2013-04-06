package com.hitisoft.fos.sys.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.IdDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "P_FUNCTION")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PFunction extends IdDomain implements Serializable {
	private static final long serialVersionUID = 4828071632436750198L;
	private String funcCode;
	private Byte active;
	private String funcName;
	private String funcType;

	public PFunction() {
	}

	@Column(name = "FUNC_CODE")
	public String getFuncCode() {
		return this.funcCode;
	}

	public void setFuncCode(String funcCode) {
		this.funcCode = funcCode;
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "FUNC_NAME")
	public String getFuncName() {
		return this.funcName;
	}

	public void setFuncName(String funcName) {
		this.funcName = funcName;
	}

	@Column(name = "FUNC_TYPE")
	public String getFuncType() {
		return this.funcType;
	}

	public void setFuncType(String funcType) {
		this.funcType = funcType;
	}

}
