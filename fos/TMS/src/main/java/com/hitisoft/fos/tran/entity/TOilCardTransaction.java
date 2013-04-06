package com.hitisoft.fos.tran.entity;

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
@Table(name = "T_OIL_CARD_TRANSACTION")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TOilCardTransaction extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -8133703062971286217L;
	private Long cardId;
	private String cardNumber;
	private Long vehicleId;
	private String vehicleNo;
	private Long driverId;
	private String driverName;
	private Integer transactionType;
	private Date transactionDate;
	private Double amount;
	private Long oilLogId;
	
	public TOilCardTransaction() {
	}
	
	@Column(name = "CARD_ID")
	public Long getCardId() {
		return this.cardId;
	}

	public void setCardId(Long cardId) {
		this.cardId = cardId;
	}
	
	@Column(name = "CARD_NUMBER")
	public String getCardNumber() {
		return this.cardNumber;
	}

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	@Column(name = "TRANSACTION_TYPE")
	public Integer getTransactionType() {
		return this.transactionType;
	}

	public void setTransactionType(Integer transactionType) {
		this.transactionType = transactionType;
	}
	
	@Column(name = "VEHICLE_ID")
	public Long getVehicleId() {
		return this.vehicleId;
	}

	public void setVehicleId(Long vehicleId) {
		this.vehicleId = vehicleId;
	}
	
	@Column(name = "VEHICLE_NO")
	public String getVehicleNo() {
		return this.vehicleNo;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}

	@Column(name = "DRIVER_ID")
	public Long getDriverId() {
		return this.driverId;
	}

	public void setDriverId(Long driverId) {
		this.driverId = driverId;
	}
	
	@Column(name = "DRIVER_NAME")
	public String getDriverName() {
		return this.driverName;
	}

	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}
	
	@Column(name = "AMOUNT")
	public Double getAmount() {
		return this.amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}
	
	@Temporal( TemporalType.DATE)
	@Column(name="TRANSACTION_DATE")
	public Date getTransactionDate() {
		return this.transactionDate;
	}

	public void setTransactionDate(Date transactionDate) {
		this.transactionDate = transactionDate;
	}

	@Column(name = "OIL_LOG_ID")
	public Long getOilLogId() {
		return this.oilLogId;
	}

	public void setOilLogId(Long oilLogId) {
		this.oilLogId = oilLogId;
	}
}
