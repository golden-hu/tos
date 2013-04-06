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
@Table(name = "G_CHARGE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GCharge extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 9182122649057543604L;
	private Byte active;
	private String charCnyP;
	private String charCnyR;
	private String charCode;
	private String charName;
	private String charNameEn;
	private String charUsdP;
	private String charUsdR;
	private Integer chclId;
	private String chclCode;
	private String chclName;
	private String currCode;
	private Integer unitId;
	private String unitName;
	private Byte tmsFlag;
	
	public GCharge() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}
	
	@Column(name = "CHAR_CNY_P")
	public String getCharCnyP() {
		return this.charCnyP;
	}

	public void setCharCnyP(String charCnyP) {
		this.charCnyP = charCnyP;
	}

	@Column(name = "CHAR_CNY_R")
	public String getCharCnyR() {
		return this.charCnyR;
	}

	public void setCharCnyR(String charCnyR) {
		this.charCnyR = charCnyR;
	}

	@Column(name = "CHAR_CODE")
	public String getCharCode() {
		return this.charCode;
	}

	public void setCharCode(String charCode) {
		this.charCode = charCode;
	}

	@Column(name = "CHAR_NAME")
	public String getCharName() {
		return this.charName;
	}

	public void setCharName(String charName) {
		this.charName = charName;
	}

	@Column(name = "CHAR_NAME_EN")
	public String getCharNameEn() {
		return this.charNameEn;
	}

	public void setCharNameEn(String charNameEn) {
		this.charNameEn = charNameEn;
	}

	@Column(name = "CHAR_USD_P")
	public String getCharUsdP() {
		return this.charUsdP;
	}

	public void setCharUsdP(String charUsdP) {
		this.charUsdP = charUsdP;
	}

	@Column(name = "CHAR_USD_R")
	public String getCharUsdR() {
		return this.charUsdR;
	}

	public void setCharUsdR(String charUsdR) {
		this.charUsdR = charUsdR;
	}

	@Column(name = "CHCL_ID")
	public Integer getChclId() {
		return this.chclId;
	}

	public void setChclId(Integer chclId) {
		this.chclId = chclId;
	}

	@Column(name = "CHCL_CODE")
	public String getChclCode() {
		return this.chclCode;
	}

	public void setChclCode(String chclCode) {
		this.chclCode = chclCode;
	}
	
	@Column(name = "CHCL_NAME")
	public String getChclName() {
		return this.chclName;
	}

	public void setChclName(String chclName) {
		this.chclName = chclName;
	}
	
	@Column(name = "CURR_CODE")
	public String getCurrCode() {
		return this.currCode;
	}

	public void setCurrCode(String currCode) {
		this.currCode = currCode;
	}

	@Column(name = "UNIT_ID")
	public Integer getUnitId() {
		return this.unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	
	@Column(name = "UNIT_NAME")
	public String getUnitName() {
		return this.unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	@Column(name = "TMS_FLAG")
	public Byte getTmsFlag() {
		return this.tmsFlag;
	}

	public void setTmsFlag(Byte tmsFlag) {
		this.tmsFlag = tmsFlag;
	}
}
