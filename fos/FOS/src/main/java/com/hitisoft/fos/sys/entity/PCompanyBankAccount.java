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
@Table(name = "P_COMPANY_BANK_ACCOUNT")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PCompanyBankAccount extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 6462749778923977319L;
	private Byte active;
	private String cobaAccount;
	private String cobaBank;
	private String cobaName;
	private String currCode;

	public PCompanyBankAccount() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "COBA_ACCOUNT")
	public String getCobaAccount() {
		return this.cobaAccount;
	}

	public void setCobaAccount(String cobaAccount) {
		this.cobaAccount = cobaAccount;
	}

	@Column(name = "COBA_BANK")
	public String getCobaBank() {
		return this.cobaBank;
	}

	public void setCobaBank(String cobaBank) {
		this.cobaBank = cobaBank;
	}

	@Column(name = "COBA_NAME")
	public String getCobaName() {
		return this.cobaName;
	}

	public void setCobaName(String cobaName) {
		this.cobaName = cobaName;
	}

	@Column(name = "CURR_CODE")
	public String getCurrCode() {
		return this.currCode;
	}

	public void setCurrCode(String currCode) {
		this.currCode = currCode;
	}

}
