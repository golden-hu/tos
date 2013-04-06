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
@Table(name = "G_AIR_PORT")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GAIRPort extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private String portCode;
	private String portNameEn;
	private String portNameCn;
	private String counCode;
	public GAIRPort(){}
	
	@Column(name="PORT_CODE")
	public String getPortCode() {
		return this.portCode;
	}
	public void setPortCode(String portCode) {
		this.portCode = portCode;
	}
	
	@Column(name="PORT_NAME_EN")
	public String getPortNameEn() {
		return this.portNameEn;
	}
	public void setPortNameEn(String portNameEn) {
		this.portNameEn = portNameEn;
	}
	
	@Column(name="PORT_NAME_CN")
	public String getPortNameCn() {
		return this.portNameCn;
	}
	public void setPortNameCn(String portNameCn) {
		this.portNameCn = portNameCn;
	}
	
	@Column(name="COUN_CODE")
	public String getCounCode() {
		return this.counCode;
	}
	public void setCounCode(String counCode) {
		this.counCode = counCode;
	}
}
