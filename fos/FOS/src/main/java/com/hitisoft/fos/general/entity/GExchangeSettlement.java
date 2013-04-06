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
@Table(name = "G_EXCHANGE_SETTLEMENT")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GExchangeSettlement extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -2884581919990788762L;
	private Byte active;
	private String exseCode;
	private String exseName;

	public GExchangeSettlement() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "EXSE_CODE")
	public String getExseCode() {
		return this.exseCode;
	}

	public void setExseCode(String exseCode) {
		this.exseCode = exseCode;
	}

	@Column(name = "EXSE_NAME")
	public String getExseName() {
		return this.exseName;
	}

	public void setExseName(String exseName) {
		this.exseName = exseName;
	}

}
