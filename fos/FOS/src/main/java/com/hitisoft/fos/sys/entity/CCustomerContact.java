package com.hitisoft.fos.sys.entity;

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
@Table(name = "C_CUSTOMER_CONTACT")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CCustomerContact extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 8423738653096066922L;
	private String cucoAddress1;
	private String cucoAddress2;
	private Date cucoBirthday;
	private String cucoEmail;
	private String cucoFax;
	private String cucoGender;
	private String cucoHomeTel;
	private String cucoMobile;
	private String cucoMsn;
	private String cucoName;
	private String cucoQq;
	private String cucoRemarks;
	private String cucoTel;
	private String cucoTitle;
	private String cucoZip;
	private Long custId;

	public CCustomerContact() {
	}

	@Column(name = "CUCO_ADDRESS1")
	public String getCucoAddress1() {
		return this.cucoAddress1;
	}

	public void setCucoAddress1(String cucoAddress1) {
		this.cucoAddress1 = cucoAddress1;
	}

	@Column(name = "CUCO_ADDRESS2")
	public String getCucoAddress2() {
		return this.cucoAddress2;
	}

	public void setCucoAddress2(String cucoAddress2) {
		this.cucoAddress2 = cucoAddress2;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CUCO_BIRTHDAY")
	public Date getCucoBirthday() {
		return this.cucoBirthday;
	}

	public void setCucoBirthday(Date cucoBirthday) {
		this.cucoBirthday = cucoBirthday;
	}

	@Column(name = "CUCO_EMAIL")
	public String getCucoEmail() {
		return this.cucoEmail;
	}

	public void setCucoEmail(String cucoEmail) {
		this.cucoEmail = cucoEmail;
	}

	@Column(name = "CUCO_FAX")
	public String getCucoFax() {
		return this.cucoFax;
	}

	public void setCucoFax(String cucoFax) {
		this.cucoFax = cucoFax;
	}

	@Column(name = "CUCO_GENDER")
	public String getCucoGender() {
		return this.cucoGender;
	}

	public void setCucoGender(String cucoGender) {
		this.cucoGender = cucoGender;
	}

	@Column(name = "CUCO_HOME_TEL")
	public String getCucoHomeTel() {
		return this.cucoHomeTel;
	}

	public void setCucoHomeTel(String cucoHomeTel) {
		this.cucoHomeTel = cucoHomeTel;
	}

	@Column(name = "CUCO_MOBILE")
	public String getCucoMobile() {
		return this.cucoMobile;
	}

	public void setCucoMobile(String cucoMobile) {
		this.cucoMobile = cucoMobile;
	}

	@Column(name = "CUCO_MSN")
	public String getCucoMsn() {
		return this.cucoMsn;
	}

	public void setCucoMsn(String cucoMsn) {
		this.cucoMsn = cucoMsn;
	}

	@Column(name = "CUCO_NAME")
	public String getCucoName() {
		return this.cucoName;
	}

	public void setCucoName(String cucoName) {
		this.cucoName = cucoName;
	}

	@Column(name = "CUCO_QQ")
	public String getCucoQq() {
		return this.cucoQq;
	}

	public void setCucoQq(String cucoQq) {
		this.cucoQq = cucoQq;
	}

	@Column(name = "CUCO_REMARKS")
	public String getCucoRemarks() {
		return this.cucoRemarks;
	}

	public void setCucoRemarks(String cucoRemarks) {
		this.cucoRemarks = cucoRemarks;
	}

	@Column(name = "CUCO_TEL")
	public String getCucoTel() {
		return this.cucoTel;
	}

	public void setCucoTel(String cucoTel) {
		this.cucoTel = cucoTel;
	}

	@Column(name = "CUCO_TITLE")
	public String getCucoTitle() {
		return this.cucoTitle;
	}

	public void setCucoTitle(String cucoTitle) {
		this.cucoTitle = cucoTitle;
	}

	@Column(name = "CUCO_ZIP")
	public String getCucoZip() {
		return this.cucoZip;
	}

	public void setCucoZip(String cucoZip) {
		this.cucoZip = cucoZip;
	}

	@Column(name = "CUST_ID")
	public Long getCustId() {
		return this.custId;
	}

	public void setCustId(Long custId) {
		this.custId = custId;
	}

}
