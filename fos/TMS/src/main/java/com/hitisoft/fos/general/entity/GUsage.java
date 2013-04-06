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
@Table(name = "G_USAGE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GUsage extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -4655811840662705229L;
	private Byte active;
	private String usagCode;
	private String usagName;

	public GUsage() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "USAG_CODE")
	public String getUsagCode() {
		return this.usagCode;
	}

	public void setUsagCode(String usagCode) {
		this.usagCode = usagCode;
	}

	@Column(name = "USAG_NAME")
	public String getUsagName() {
		return this.usagName;
	}

	public void setUsagName(String usagName) {
		this.usagName = usagName;
	}

}
