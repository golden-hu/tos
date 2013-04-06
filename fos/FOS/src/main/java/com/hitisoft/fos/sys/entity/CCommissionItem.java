package com.hitisoft.fos.sys.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "C_COMMISSION_ITEM")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CCommissionItem extends BaseDomain implements Serializable, Comparable<CCommissionItem> {
	private static final long serialVersionUID = -6091790443903191944L;
	private Integer coitLimit;
	private Integer coitLower;
	private BigDecimal coitRate;
	private Integer commId;

	public CCommissionItem() {
	}

	@Override
	public int compareTo(CCommissionItem o) {
		int code = 0;
		if (getCoitLower() == null && o.getCoitLower() == null) {
			code = 0;
		} else if (getCoitLower() == null) {
			code = -1;
		} else if (o.getCoitLower() == null) {
			code = 1;
		} else if (getCoitLower().compareTo(o.getCoitLower()) != 0) {
			code = getCoitLower().compareTo(o.getCoitLower());
		} else {
			code = getCoitLimit().compareTo(o.getCoitLimit());
		}
		return code;
	}

	@Column(name = "COIT_LIMIT")
	public Integer getCoitLimit() {
		return this.coitLimit;
	}

	public void setCoitLimit(Integer coitLimit) {
		this.coitLimit = coitLimit;
	}

	@Column(name = "COIT_LOWER")
	public Integer getCoitLower() {
		return this.coitLower;
	}

	public void setCoitLower(Integer coitLower) {
		this.coitLower = coitLower;
	}

	@Column(name = "COIT_RATE")
	public BigDecimal getCoitRate() {
		return this.coitRate;
	}

	public void setCoitRate(BigDecimal coitRate) {
		this.coitRate = coitRate;
	}

	@Column(name = "COMM_ID")
	public Integer getCommId() {
		return this.commId;
	}

	public void setCommId(Integer commId) {
		this.commId = commId;
	}

}
