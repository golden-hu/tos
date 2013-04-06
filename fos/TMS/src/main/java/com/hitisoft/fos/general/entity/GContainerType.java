package com.hitisoft.fos.general.entity;

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
@Table(name = "G_CONTAINER_TYPE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GContainerType extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -1285256666484284859L;
	private Byte active;
	private String coclCode;
	private String cotyCode;
	private String cotyIsoCode;
	private String cotyLength;
	private BigDecimal cotyMaxMeasurement;
	private BigDecimal cotyMaxWeight;
	private BigDecimal cotyTareWeight;
	private Integer cotyTeu;
	private String cotyUnCode;

	public GContainerType() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "COCL_CODE")
	public String getCoclCode() {
		return this.coclCode;
	}

	public void setCoclCode(String coclCode) {
		this.coclCode = coclCode;
	}

	@Column(name = "COTY_CODE")
	public String getCotyCode() {
		return this.cotyCode;
	}

	public void setCotyCode(String cotyCode) {
		this.cotyCode = cotyCode;
	}

	@Column(name = "COTY_ISO_CODE")
	public String getCotyIsoCode() {
		return this.cotyIsoCode;
	}

	public void setCotyIsoCode(String cotyIsoCode) {
		this.cotyIsoCode = cotyIsoCode;
	}

	@Column(name = "COTY_LENGTH")
	public String getCotyLength() {
		return this.cotyLength;
	}

	public void setCotyLength(String cotyLength) {
		this.cotyLength = cotyLength;
	}

	@Column(name = "COTY_MAX_MEASUREMENT")
	public BigDecimal getCotyMaxMeasurement() {
		return this.cotyMaxMeasurement;
	}

	public void setCotyMaxMeasurement(BigDecimal cotyMaxMeasurement) {
		this.cotyMaxMeasurement = cotyMaxMeasurement;
	}

	@Column(name = "COTY_MAX_WEIGHT")
	public BigDecimal getCotyMaxWeight() {
		return this.cotyMaxWeight;
	}

	public void setCotyMaxWeight(BigDecimal cotyMaxWeight) {
		this.cotyMaxWeight = cotyMaxWeight;
	}

	@Column(name = "COTY_TARE_WEIGHT")
	public BigDecimal getCotyTareWeight() {
		return this.cotyTareWeight;
	}

	public void setCotyTareWeight(BigDecimal cotyTareWeight) {
		this.cotyTareWeight = cotyTareWeight;
	}

	@Column(name = "COTY_TEU")
	public Integer getCotyTeu() {
		return this.cotyTeu;
	}

	public void setCotyTeu(Integer cotyTeu) {
		this.cotyTeu = cotyTeu;
	}

	@Column(name = "COTY_UN_CODE")
	public String getCotyUnCode() {
		return this.cotyUnCode;
	}

	public void setCotyUnCode(String cotyUnCode) {
		this.cotyUnCode = cotyUnCode;
	}

}
