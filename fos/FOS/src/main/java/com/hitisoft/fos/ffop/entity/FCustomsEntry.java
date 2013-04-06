package com.hitisoft.fos.ffop.entity;

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
@Table(name = "F_CUSTOMS_ENTRY")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FCustomsEntry extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 725740550345690610L;
	private Integer consId;
	private String cuenCargoNameCn;
	private String cuenCargoNameEn;
	private String cuenCargoNo;
	private BigDecimal cuenCargoNum;
	private String cuenCargoSpec;
	private String cuenCargoUnit;
	private String cuenCountry;
	private String cuenLevyType;
	private String cuenManuNo;
	private String cuenNo;
	private String cuenRemarks;
	private BigDecimal cuenTotalPrice;
	private BigDecimal cuenUnitPrice;
	private String currCode;

	public FCustomsEntry() {
	}

	
	@Column(name = "CONS_ID")
	public Integer getConsId() {
		return this.consId;
	}

	public void setConsId(Integer consId) {
		this.consId = consId;
	}


	@Column(name = "CUEN_CARGO_NAME_CN")
	public String getCuenCargoNameCn() {
		return this.cuenCargoNameCn;
	}

	public void setCuenCargoNameCn(String cuenCargoNameCn) {
		this.cuenCargoNameCn = cuenCargoNameCn;
	}

	@Column(name = "CUEN_CARGO_NAME_EN")
	public String getCuenCargoNameEn() {
		return this.cuenCargoNameEn;
	}

	public void setCuenCargoNameEn(String cuenCargoNameEn) {
		this.cuenCargoNameEn = cuenCargoNameEn;
	}

	@Column(name = "CUEN_CARGO_NO")
	public String getCuenCargoNo() {
		return this.cuenCargoNo;
	}

	public void setCuenCargoNo(String cuenCargoNo) {
		this.cuenCargoNo = cuenCargoNo;
	}

	@Column(name = "CUEN_CARGO_NUM")
	public BigDecimal getCuenCargoNum() {
		return this.cuenCargoNum;
	}

	public void setCuenCargoNum(BigDecimal cuenCargoNum) {
		this.cuenCargoNum = cuenCargoNum;
	}

	@Column(name = "CUEN_CARGO_SPEC")
	public String getCuenCargoSpec() {
		return this.cuenCargoSpec;
	}

	public void setCuenCargoSpec(String cuenCargoSpec) {
		this.cuenCargoSpec = cuenCargoSpec;
	}

	@Column(name = "CUEN_CARGO_UNIT")
	public String getCuenCargoUnit() {
		return this.cuenCargoUnit;
	}

	public void setCuenCargoUnit(String cuenCargoUnit) {
		this.cuenCargoUnit = cuenCargoUnit;
	}

	@Column(name = "CUEN_COUNTRY")
	public String getCuenCountry() {
		return this.cuenCountry;
	}

	public void setCuenCountry(String cuenCountry) {
		this.cuenCountry = cuenCountry;
	}

	@Column(name = "CUEN_LEVY_TYPE")
	public String getCuenLevyType() {
		return this.cuenLevyType;
	}

	public void setCuenLevyType(String cuenLevyType) {
		this.cuenLevyType = cuenLevyType;
	}

	@Column(name = "CUEN_MANU_NO")
	public String getCuenManuNo() {
		return this.cuenManuNo;
	}

	public void setCuenManuNo(String cuenManuNo) {
		this.cuenManuNo = cuenManuNo;
	}

	@Column(name = "CUEN_NO")
	public String getCuenNo() {
		return this.cuenNo;
	}

	public void setCuenNo(String cuenNo) {
		this.cuenNo = cuenNo;
	}

	@Column(name = "CUEN_REMARKS")
	public String getCuenRemarks() {
		return this.cuenRemarks;
	}

	public void setCuenRemarks(String cuenRemarks) {
		this.cuenRemarks = cuenRemarks;
	}

	@Column(name = "CUEN_TOTAL_PRICE")
	public BigDecimal getCuenTotalPrice() {
		return this.cuenTotalPrice;
	}

	public void setCuenTotalPrice(BigDecimal cuenTotalPrice) {
		this.cuenTotalPrice = cuenTotalPrice;
	}

	@Column(name = "CUEN_UNIT_PRICE")
	public BigDecimal getCuenUnitPrice() {
		return this.cuenUnitPrice;
	}

	public void setCuenUnitPrice(BigDecimal cuenUnitPrice) {
		this.cuenUnitPrice = cuenUnitPrice;
	}

	@Column(name = "CURR_CODE")
	public String getCurrCode() {
		return this.currCode;
	}

	public void setCurrCode(String currCode) {
		this.currCode = currCode;
	}

}
