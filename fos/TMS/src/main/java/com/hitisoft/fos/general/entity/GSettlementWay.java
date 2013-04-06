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
@Table(name = "G_SETTLEMENT_WAY")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GSettlementWay extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 3164935588605569912L;
	private Byte active;
	private String sewaCode;
	private String sewaName;

	public GSettlementWay() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "SEWA_CODE")
	public String getSewaCode() {
		return this.sewaCode;
	}

	public void setSewaCode(String sewaCode) {
		this.sewaCode = sewaCode;
	}

	@Column(name = "SEWA_NAME")
	public String getSewaName() {
		return this.sewaName;
	}

	public void setSewaName(String sewaName) {
		this.sewaName = sewaName;
	}

}
