package com.hitisoft.fos.ffse.entity;

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
@Table(name = "S_BALANCE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SBalance extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 7496547350884430661L;
	private BigDecimal balaAmount;
	private String currCode;
	private Integer custId;
	private String custName;
	private String custSname;

	public SBalance() {
	}

	@Column(name = "BALA_AMOUNT")
	public BigDecimal getBalaAmount() {
		return this.balaAmount;
	}

	public void setBalaAmount(BigDecimal balaAmount) {
		this.balaAmount = balaAmount;
	}

	@Column(name = "CURR_CODE")
	public String getCurrCode() {
		return this.currCode;
	}

	public void setCurrCode(String currCode) {
		this.currCode = currCode;
	}

	@Column(name = "CUST_ID")
	public Integer getCustId() {
		return this.custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}

	@Column(name = "CUST_NAME")
	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	@Column(name = "CUST_SNAME")
	public String getCustSname() {
		return this.custSname;
	}

	public void setCustSname(String custSname) {
		this.custSname = custSname;
	}

}
