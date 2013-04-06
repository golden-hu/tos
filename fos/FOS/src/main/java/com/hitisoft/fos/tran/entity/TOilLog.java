package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.util.Date;


/**
 * The persistent class for the t_oil_log database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="T_OIL_LOG")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TOilLog extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private Double amount;
	private Long driverId;
	private String driverName;
	private Byte isPoint;
	private Double num;
	private Long oilStationId;
	private String oilStationName;
	private Long oilTypeId;
	private String oilTypeName;
	private Double price;
	private Date refuelDate;
	private String remark;
	private Long vehicleId;
	private String vehicleNo;

	private Long cardId;
	private String cardNumber;
	private Double startAmount;
	private Double endAmount;
	private Double cardPaid;
	private Double currencyPaid;
	private Double currentMiles;
	private String signInContact; 
	
    public TOilLog() {
    }


	@Column(name="AMOUNT")
	public Double getAmount() {
		return this.amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}


	@Column(name="DRIVER_ID")
	public Long getDriverId() {
		return this.driverId;
	}

	public void setDriverId(Long driverId) {
		this.driverId = driverId;
	}


	@Column(name="DRIVER_NAME")
	public String getDriverName() {
		return this.driverName;
	}

	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}


	@Column(name="IS_POINT")
	public Byte getIsPoint() {
		return this.isPoint;
	}

	public void setIsPoint(Byte isPoint) {
		this.isPoint = isPoint;
	}


	@Column(name="NUM")
	public Double getNum() {
		return this.num;
	}

	public void setNum(Double num) {
		this.num = num;
	}


	@Column(name="OIL_STATION_ID")
	public Long getOilStationId() {
		return this.oilStationId;
	}

	public void setOilStationId(Long oilStationId) {
		this.oilStationId = oilStationId;
	}


	@Column(name="OIL_STATION_NAME")
	public String getOilStationName() {
		return this.oilStationName;
	}

	public void setOilStationName(String oilStationName) {
		this.oilStationName = oilStationName;
	}


	@Column(name="OIL_TYPE_ID")
	public Long getOilTypeId() {
		return this.oilTypeId;
	}

	public void setOilTypeId(Long oilTypeId) {
		this.oilTypeId = oilTypeId;
	}


	@Column(name="OIL_TYPE_NAME")
	public String getOilTypeName() {
		return this.oilTypeName;
	}

	public void setOilTypeName(String oilTypeName) {
		this.oilTypeName = oilTypeName;
	}


	@Column(name="PRICE")
	public Double getPrice() {
		return this.price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="REFUEL_DATE")
	public Date getRefuelDate() {
		return this.refuelDate;
	}

	public void setRefuelDate(Date refuelDate) {
		this.refuelDate = refuelDate;
	}


	@Column(name="REMARK")
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}


	@Column(name="VEHICLE_ID")
	public Long getVehicleId() {
		return this.vehicleId;
	}

	public void setVehicleId(Long vehicleId) {
		this.vehicleId = vehicleId;
	}


	@Column(name="VEHICLE_NO")
	public String getVehicleNo() {
		return this.vehicleNo;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}

	@Column(name="CARD_ID")
	public Long getCardId() {
		return this.cardId;
	}

	public void setCardId(Long cardId) {
		this.cardId = cardId;
	}

	@Column(name="CARD_NUMBER")
	public String getCardNumber() {
		return this.cardNumber;
	}
	
	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	@Column(name="START_AMOUNT")
	public Double getStartAmount() {
		return this.startAmount;
	}


	public void setStartAmount(Double startAmount) {
		this.startAmount = startAmount;
	}

	@Column(name="END_AMOUNT")
	public Double getEndAmount() {
		return this.endAmount;
	}


	public void setEndAmount(Double endAmount) {
		this.endAmount = endAmount;
	}

	@Column(name="CARD_PAID")
	public Double getCardPaid() {
		return this.cardPaid;
	}


	public void setCardPaid(Double cardPaid) {
		this.cardPaid = cardPaid;
	}
	
	@Column(name="CURRENCY_PAID")
	public Double getCurrencyPaid() {
		return this.currencyPaid;
	}


	public void setCurrencyPaid(Double currencyPaid) {
		this.currencyPaid = currencyPaid;
	}
	
	@Column(name="CURRENT_MILES")
	public Double getCurrentMiles() {
		return this.currentMiles;
	}

	public void setCurrentMiles(Double currentMiles) {
		this.currentMiles = currentMiles;
	}

	@Column(name="SIGN_IN_CONTACT")
	public String getSignInContact() {
		return this.signInContact;
	}


	public void setSignInContact(String signInContact) {
		this.signInContact = signInContact;
	}

}