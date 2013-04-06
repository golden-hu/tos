package com.hitisoft.fos.ffse.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "S_INTEREST_RATE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SInterestRate extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 5607519120837438118L;
	private Byte active;
	private String inraCurrency;
	private Date inraEndDate;
	private BigDecimal inraRate;
	private Date inraStartDate;
	private Byte inraType;

	public SInterestRate() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "INRA_CURRENCY")
	public String getInraCurrency() {
		return this.inraCurrency;
	}

	public void setInraCurrency(String inraCurrency) {
		this.inraCurrency = inraCurrency;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INRA_END_DATE")
	public Date getInraEndDate() {
		return this.inraEndDate;
	}

	public void setInraEndDate(Date inraEndDate) {
		this.inraEndDate = inraEndDate;
	}

	@Column(name = "INRA_RATE")
	public BigDecimal getInraRate() {
		return this.inraRate;
	}

	public void setInraRate(BigDecimal inraRate) {
		this.inraRate = inraRate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INRA_START_DATE")
	public Date getInraStartDate() {
		return this.inraStartDate;
	}

	public void setInraStartDate(Date inraStartDate) {
		this.inraStartDate = inraStartDate;
	}

	@Column(name = "INRA_TYPE")
	public Byte getInraType() {
		return this.inraType;
	}

	public void setInraType(Byte inraType) {
		this.inraType = inraType;
	}

}
