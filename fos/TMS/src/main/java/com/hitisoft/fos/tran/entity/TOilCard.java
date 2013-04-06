package com.hitisoft.fos.tran.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "T_OIL_CARD")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TOilCard extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -8133703062971286217L;
	private String cardNumber;
	private String cardType;
	private Double balance;
	
	public TOilCard() {
	}
	
	@Column(name = "CARD_NUMBER")
	public String getCardNumber() {
		return this.cardNumber;
	}

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	@Column(name = "CARD_TYPE")
	public String getCardType() {
		return this.cardType;
	}

	public void setCardType(String cardType) {
		this.cardType = cardType;
	}
	
	@Column(name = "BALANCE")
	public Double getBalance() {
		return this.balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}
}
