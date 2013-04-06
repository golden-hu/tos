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
@Table(name = "G_PORT")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GPort extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 3307444814362996720L;
	private Byte active;
	private String counCode;
	private String portCode;
	private String portNameCn;
	private String portNameEn;
	private Byte portType;

	public GPort() {
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

	@Column(name = "PORT_CODE")
	public String getPortCode() {
		return this.portCode;
	}

	public void setPortCode(String portCode) {
		this.portCode = portCode;
	}

	@Column(name = "PORT_NAME_CN")
	public String getPortNameCn() {
		return this.portNameCn;
	}

	public void setPortNameCn(String portNameCn) {
		this.portNameCn = portNameCn;
	}

	@Column(name = "PORT_NAME_EN")
	public String getPortNameEn() {
		return this.portNameEn;
	}

	public void setPortNameEn(String portNameEn) {
		this.portNameEn = portNameEn;
	}

	@Column(name = "PORT_TYPE")
	public Byte getPortType() {
		return this.portType;
	}

	public void setPortType(Byte portType) {
		this.portType = portType;
	}

}
