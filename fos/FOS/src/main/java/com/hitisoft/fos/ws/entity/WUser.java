package com.hitisoft.fos.ws.entity;

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
@Table(name = "W_USER")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WUser extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -4825949035179649854L;
	private Integer custId;
	private String wusrAddress;
	private String wusrCity;
	private String wusrCompanyName;
	private String wusrCountry;
	private String wusrDept;
	private String wusrEmail;
	private String wusrFax;
	private String wusrFirstName;
	private Date wusrLastLoginTime;
	private String wusrLastName;
	private String wusrMobile;
	private String wusrName;
	private String wusrPassword;
	private String wusrProvince;
	private Byte wusrStatus;
	private String wusrTel;
	private String wusrTitle;
	private String wusrUrl;
	private String wusrZip;

	public WUser() {
	}

	@Column(name = "CUST_ID")
	public Integer getCustId() {
		return this.custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}

	@Column(name = "WUSR_ADDRESS")
	public String getWusrAddress() {
		return this.wusrAddress;
	}

	public void setWusrAddress(String wusrAddress) {
		this.wusrAddress = wusrAddress;
	}

	@Column(name = "WUSR_CITY")
	public String getWusrCity() {
		return this.wusrCity;
	}

	public void setWusrCity(String wusrCity) {
		this.wusrCity = wusrCity;
	}

	@Column(name = "WUSR_COMPANY_NAME")
	public String getWusrCompanyName() {
		return this.wusrCompanyName;
	}

	public void setWusrCompanyName(String wusrCompanyName) {
		this.wusrCompanyName = wusrCompanyName;
	}

	@Column(name = "WUSR_COUNTRY")
	public String getWusrCountry() {
		return this.wusrCountry;
	}

	public void setWusrCountry(String wusrCountry) {
		this.wusrCountry = wusrCountry;
	}

	@Column(name = "WUSR_DEPT")
	public String getWusrDept() {
		return this.wusrDept;
	}

	public void setWusrDept(String wusrDept) {
		this.wusrDept = wusrDept;
	}

	@Column(name = "WUSR_EMAIL")
	public String getWusrEmail() {
		return this.wusrEmail;
	}

	public void setWusrEmail(String wusrEmail) {
		this.wusrEmail = wusrEmail;
	}

	@Column(name = "WUSR_FAX")
	public String getWusrFax() {
		return this.wusrFax;
	}

	public void setWusrFax(String wusrFax) {
		this.wusrFax = wusrFax;
	}

	@Column(name = "WUSR_FIRST_NAME")
	public String getWusrFirstName() {
		return this.wusrFirstName;
	}

	public void setWusrFirstName(String wusrFirstName) {
		this.wusrFirstName = wusrFirstName;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "WUSR_LAST_LOGIN_TIME")
	public Date getWusrLastLoginTime() {
		return this.wusrLastLoginTime;
	}

	public void setWusrLastLoginTime(Date wusrLastLoginTime) {
		this.wusrLastLoginTime = wusrLastLoginTime;
	}

	@Column(name = "WUSR_LAST_NAME")
	public String getWusrLastName() {
		return this.wusrLastName;
	}

	public void setWusrLastName(String wusrLastName) {
		this.wusrLastName = wusrLastName;
	}

	@Column(name = "WUSR_MOBILE")
	public String getWusrMobile() {
		return this.wusrMobile;
	}

	public void setWusrMobile(String wusrMobile) {
		this.wusrMobile = wusrMobile;
	}

	@Column(name = "WUSR_NAME")
	public String getWusrName() {
		return this.wusrName;
	}

	public void setWusrName(String wusrName) {
		this.wusrName = wusrName;
	}

	@Column(name = "WUSR_PASSWORD")
	public String getWusrPassword() {
		return this.wusrPassword;
	}

	public void setWusrPassword(String wusrPassword) {
		this.wusrPassword = wusrPassword;
	}

	@Column(name = "WUSR_PROVINCE")
	public String getWusrProvince() {
		return this.wusrProvince;
	}

	public void setWusrProvince(String wusrProvince) {
		this.wusrProvince = wusrProvince;
	}

	@Column(name = "WUSR_STATUS")
	public Byte getWusrStatus() {
		return this.wusrStatus;
	}

	public void setWusrStatus(Byte wusrStatus) {
		this.wusrStatus = wusrStatus;
	}

	@Column(name = "WUSR_TEL")
	public String getWusrTel() {
		return this.wusrTel;
	}

	public void setWusrTel(String wusrTel) {
		this.wusrTel = wusrTel;
	}

	@Column(name = "WUSR_TITLE")
	public String getWusrTitle() {
		return this.wusrTitle;
	}

	public void setWusrTitle(String wusrTitle) {
		this.wusrTitle = wusrTitle;
	}

	@Column(name = "WUSR_URL")
	public String getWusrUrl() {
		return this.wusrUrl;
	}

	public void setWusrUrl(String wusrUrl) {
		this.wusrUrl = wusrUrl;
	}

	@Column(name = "WUSR_ZIP")
	public String getWusrZip() {
		return this.wusrZip;
	}

	public void setWusrZip(String wusrZip) {
		this.wusrZip = wusrZip;
	}

}
