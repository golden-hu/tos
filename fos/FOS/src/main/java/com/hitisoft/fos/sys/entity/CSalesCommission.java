package com.hitisoft.fos.sys.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "C_SALES_COMMISSION")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CSalesCommission extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -3222127991559832802L;
	private Integer commId;
	private String commName;
	private Integer sacoSalesId;
	private String sacoSalesName;

	private Double baseAmount;
	private Double commission;

	public CSalesCommission() {
	}

	@Column(name = "COMM_ID")
	public Integer getCommId() {
		return this.commId;
	}

	public void setCommId(Integer commId) {
		this.commId = commId;
	}

	@Column(name = "COMM_NAME")
	public String getCommName() {
		return this.commName;
	}

	public void setCommName(String commName) {
		this.commName = commName;
	}

	@Column(name = "SACO_SALES_ID")
	public Integer getSacoSalesId() {
		return this.sacoSalesId;
	}

	public void setSacoSalesId(Integer sacoSalesId) {
		this.sacoSalesId = sacoSalesId;
	}

	@Column(name = "SACO_SALES_NAME")
	public String getSacoSalesName() {
		return this.sacoSalesName;
	}

	public void setSacoSalesName(String sacoSalesName) {
		this.sacoSalesName = sacoSalesName;
	}

	@Transient
	public Double getBaseAmount() {
		return baseAmount;
	}

	public void setBaseAmount(Double baseAmount) {
		this.baseAmount = baseAmount;
	}

	@Transient
	public Double getCommission() {
		return commission;
	}

	public void setCommission(Double commission) {
		this.commission = commission;
	}

}
