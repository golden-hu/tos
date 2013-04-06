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
@Table(name = "S_EX_RATE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SExRate extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -3416272718487835679L;
	private Byte active;
	private String exraBaseCurrency;
	private Date exraEndDate;
	private String exraExCurrency;
	private BigDecimal exraRate;
	private Date exraStartDate;

	public SExRate() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "EXRA_BASE_CURRENCY")
	public String getExraBaseCurrency() {
		return this.exraBaseCurrency;
	}

	public void setExraBaseCurrency(String exraBaseCurrency) {
		this.exraBaseCurrency = exraBaseCurrency;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "EXRA_END_DATE")
	public Date getExraEndDate() {
		return this.exraEndDate;
	}

	public void setExraEndDate(Date exraEndDate) {
		this.exraEndDate = exraEndDate;
	}

	@Column(name = "EXRA_EX_CURRENCY")
	public String getExraExCurrency() {
		return this.exraExCurrency;
	}

	public void setExraExCurrency(String exraExCurrency) {
		this.exraExCurrency = exraExCurrency;
	}

	@Column(name = "EXRA_RATE")
	public BigDecimal getExraRate() {
		return this.exraRate;
	}

	public void setExraRate(BigDecimal exraRate) {
		this.exraRate = exraRate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "EXRA_START_DATE")
	public Date getExraStartDate() {
		return this.exraStartDate;
	}

	public void setExraStartDate(Date exraStartDate) {
		this.exraStartDate = exraStartDate;
	}

}
