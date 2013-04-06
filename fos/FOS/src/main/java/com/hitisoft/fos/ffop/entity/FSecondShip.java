package com.hitisoft.fos.ffop.entity;

import java.io.Serializable;
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
@Table(name = "F_SECOND_SHIP")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FSecondShip extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -1074474370148526305L;
	private Integer consId;
	private String consNo;
	private String seshBlNo;
	private String seshCarrier;
	private Date seshEta;
	private Date seshEtd;
	private String seshPot;
	private String seshPotAgency;
	private String seshRemarks;
	private String seshSealNo;
	private String seshTransNo;
	private String seshVessel;
	private String seshVoyage;

	public FSecondShip() {
	}

	@Column(name = "CONS_ID")
	public Integer getConsId() {
		return this.consId;
	}

	public void setConsId(Integer consId) {
		this.consId = consId;
	}

	@Column(name = "CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Column(name = "SESH_BL_NO")
	public String getSeshBlNo() {
		return this.seshBlNo;
	}

	public void setSeshBlNo(String seshBlNo) {
		this.seshBlNo = seshBlNo;
	}

	@Column(name = "SESH_CARRIER")
	public String getSeshCarrier() {
		return this.seshCarrier;
	}

	public void setSeshCarrier(String seshCarrier) {
		this.seshCarrier = seshCarrier;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "SESH_ETA")
	public Date getSeshEta() {
		return this.seshEta;
	}

	public void setSeshEta(Date seshEta) {
		this.seshEta = seshEta;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "SESH_ETD")
	public Date getSeshEtd() {
		return this.seshEtd;
	}

	public void setSeshEtd(Date seshEtd) {
		this.seshEtd = seshEtd;
	}

	@Column(name = "SESH_POT")
	public String getSeshPot() {
		return this.seshPot;
	}

	public void setSeshPot(String seshPot) {
		this.seshPot = seshPot;
	}

	@Column(name = "SESH_POT_AGENCY")
	public String getSeshPotAgency() {
		return this.seshPotAgency;
	}

	public void setSeshPotAgency(String seshPotAgency) {
		this.seshPotAgency = seshPotAgency;
	}

	@Column(name = "SESH_REMARKS")
	public String getSeshRemarks() {
		return this.seshRemarks;
	}

	public void setSeshRemarks(String seshRemarks) {
		this.seshRemarks = seshRemarks;
	}

	@Column(name = "SESH_SEAL_NO")
	public String getSeshSealNo() {
		return this.seshSealNo;
	}

	public void setSeshSealNo(String seshSealNo) {
		this.seshSealNo = seshSealNo;
	}

	@Column(name = "SESH_TRANS_NO")
	public String getSeshTransNo() {
		return this.seshTransNo;
	}

	public void setSeshTransNo(String seshTransNo) {
		this.seshTransNo = seshTransNo;
	}

	@Column(name = "SESH_VESSEL")
	public String getSeshVessel() {
		return this.seshVessel;
	}

	public void setSeshVessel(String seshVessel) {
		this.seshVessel = seshVessel;
	}

	@Column(name = "SESH_VOYAGE")
	public String getSeshVoyage() {
		return this.seshVoyage;
	}

	public void setSeshVoyage(String seshVoyage) {
		this.seshVoyage = seshVoyage;
	}

}
