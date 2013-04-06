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
@Table(name = "P_COMPANY")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PCompany extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1839933775117964863L;
	
	private String compMyCode;
	private String compNameCn;
	private String compNameEn;
	private String compAccount;
	private String compAddress;
	private String compBank;
	private String compContact;
	private String compTel;
	private String compContMsn;
	private String compContQq;
	private String compLoginUser;
	private String compLoginPsw;
	private String compEmail;
	private String compFax;
	private Integer compLicenseNumber;
	private Byte compActive;
	private Byte compServiceLeve;
	private Date compStartDate;
	private Date compEndDate;
	
	public PCompany() {
	}
	
	@Column(name = "COMP_MYCODE")
	public String getCompMyCode() {
		return compMyCode;
	}

	public void setCompMyCode(String compMyCode) {
		this.compMyCode = compMyCode;
	}

	@Column(name = "COMP_ACCOUNT")
	public String getCompAccount() {
		return this.compAccount;
	}

	public void setCompAccount(String compAccount) {
		this.compAccount = compAccount;
	}

	@Column(name = "COMP_ACTIVE")
	public Byte getCompActive() {
		return this.compActive;
	}

	public void setCompActive(Byte compActive) {
		this.compActive = compActive;
	}

	@Column(name = "COMP_ADDRESS")
	public String getCompAddress() {
		return this.compAddress;
	}

	public void setCompAddress(String compAddress) {
		this.compAddress = compAddress;
	}

	@Column(name = "COMP_BANK")
	public String getCompBank() {
		return this.compBank;
	}

	public void setCompBank(String compBank) {
		this.compBank = compBank;
	}

	@Column(name = "COMP_CONTACT")
	public String getCompContact() {
		return this.compContact;
	}

	public void setCompContact(String compContact) {
		this.compContact = compContact;
	}

	@Column(name = "COMP_EMAIL")
	public String getCompEmail() {
		return this.compEmail;
	}

	public void setCompEmail(String compEmail) {
		this.compEmail = compEmail;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "COMP_END_DATE")
	public Date getCompEndDate() {
		return this.compEndDate;
	}

	public void setCompEndDate(Date compEndDate) {
		this.compEndDate = compEndDate;
	}

	@Column(name = "COMP_FAX")
	public String getCompFax() {
		return this.compFax;
	}

	public void setCompFax(String compFax) {
		this.compFax = compFax;
	}

	@Column(name = "COMP_NAME_CN")
	public String getCompNameCn() {
		return this.compNameCn;
	}

	public void setCompNameCn(String compNameCn) {
		this.compNameCn = compNameCn;
	}

	@Column(name = "COMP_NAME_EN")
	public String getCompNameEn() {
		return this.compNameEn;
	}

	public void setCompNameEn(String compNameEn) {
		this.compNameEn = compNameEn;
	}

	@Column(name = "COMP_SERVICE_LEVE")
	public Byte getCompServiceLeve() {
		return this.compServiceLeve;
	}

	public void setCompServiceLeve(Byte compServiceLeve) {
		this.compServiceLeve = compServiceLeve;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "COMP_START_DATE")
	public Date getCompStartDate() {
		return this.compStartDate;
	}

	public void setCompStartDate(Date compStartDate) {
		this.compStartDate = compStartDate;
	}

	@Column(name = "COMP_TEL")
	public String getCompTel() {
		return this.compTel;
	}

	public void setCompTel(String compTel) {
		this.compTel = compTel;
	}

	@Column(name = "COMP_LICENSE_NUMBER")
	public Integer getCompLicenseNumber() {
		return compLicenseNumber;
	}

	public void setCompLicenseNumber(Integer compLicenseNumber) {
		this.compLicenseNumber = compLicenseNumber;
	}
	
	@Column(name = "COMP_CONT_MSN")
	public String getCompContMsn() {
		return compContMsn;
	}
	
	public void setCompContMsn(String compContMsn) {
		this.compContMsn = compContMsn;
	}

	@Column(name = "COMP_CONT_QQ")
	public String getCompContQq() {
		return compContQq;
	}

	public void setCompContQq(String compContQq) {
		this.compContQq = compContQq;
	}

	@Column(name = "COMP_LOGIN_USER")
	public String getCompLoginUser() {
		return compLoginUser;
	}

	public void setCompLoginUser(String compLoginUser) {
		this.compLoginUser = compLoginUser;
	}

	@Column(name = "COMP_LOGIN_PSW")
	public String getCompLoginPsw() {
		return compLoginPsw;
	}

	public void setCompLoginPsw(String compLoginPsw) {
		this.compLoginPsw = compLoginPsw;
	}
}
