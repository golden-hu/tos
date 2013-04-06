package com.hitisoft.fos.sys.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "C_PRICE_LINE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CPriceLine extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -1852739050816366702L;
	private String caclName;
	private String pateName;
	private String prliCountryDName;
	private String prliCountryTName;
	private Integer prliDuration;
	private String prliPodEn;
	private String prliPodHarbour;
	private String prliPotEn;
	private String prliRemarks;
	private String prliShipDate;
	private Integer prshId;
	private String tranName;

	public CPriceLine() {
	}

	@Column(name = "CACL_NAME")
	public String getCaclName() {
		return this.caclName;
	}

	public void setCaclName(String caclName) {
		this.caclName = caclName;
	}

	@Column(name = "PATE_NAME")
	public String getPateName() {
		return this.pateName;
	}

	public void setPateName(String pateName) {
		this.pateName = pateName;
	}

	@Column(name = "PRLI_COUNTRY_D_NAME")
	public String getPrliCountryDName() {
		return this.prliCountryDName;
	}

	public void setPrliCountryDName(String prliCountryDName) {
		this.prliCountryDName = prliCountryDName;
	}

	@Column(name = "PRLI_COUNTRY_T_NAME")
	public String getPrliCountryTName() {
		return this.prliCountryTName;
	}

	public void setPrliCountryTName(String prliCountryTName) {
		this.prliCountryTName = prliCountryTName;
	}

	@Column(name = "PRLI_DURATION")
	public Integer getPrliDuration() {
		return this.prliDuration;
	}

	public void setPrliDuration(Integer prliDuration) {
		this.prliDuration = prliDuration;
	}

	@Column(name = "PRLI_POD_EN")
	public String getPrliPodEn() {
		return this.prliPodEn;
	}

	public void setPrliPodEn(String prliPodEn) {
		this.prliPodEn = prliPodEn;
	}

	@Column(name = "PRLI_POD_HARBOUR")
	public String getPrliPodHarbour() {
		return this.prliPodHarbour;
	}

	public void setPrliPodHarbour(String prliPodHarbour) {
		this.prliPodHarbour = prliPodHarbour;
	}

	@Column(name = "PRLI_POT_EN")
	public String getPrliPotEn() {
		return this.prliPotEn;
	}

	public void setPrliPotEn(String prliPotEn) {
		this.prliPotEn = prliPotEn;
	}

	@Column(name = "PRLI_REMARKS")
	public String getPrliRemarks() {
		return this.prliRemarks;
	}

	public void setPrliRemarks(String prliRemarks) {
		this.prliRemarks = prliRemarks;
	}

	@Column(name = "PRLI_SHIP_DATE")
	public String getPrliShipDate() {
		return this.prliShipDate;
	}

	public void setPrliShipDate(String prliShipDate) {
		this.prliShipDate = prliShipDate;
	}

	@Column(name = "PRSH_ID")
	public Integer getPrshId() {
		return this.prshId;
	}

	public void setPrshId(Integer prshId) {
		this.prshId = prshId;
	}

	@Column(name = "TRAN_NAME")
	public String getTranName() {
		return this.tranName;
	}

	public void setTranName(String tranName) {
		this.tranName = tranName;
	}

}
