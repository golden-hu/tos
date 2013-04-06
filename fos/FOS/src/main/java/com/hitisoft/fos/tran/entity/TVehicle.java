package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the t_vehicle database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="T_VEHICLE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TVehicle extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private String customsNo;
	private String engineNo;
	private BigDecimal height;
	private String icNo;
	private Date inspectDateFrom;
	private Date inspectDateTo;
	private BigDecimal length;
	private Date madeDate;
	private BigDecimal maxLoad;
	private Integer motorcadeId;
	private String motorcadeName;
	private String palletNo;
	private String palletType;
	private String remark;
	private String vehicleName;
	private String vehicleNo;
	private Integer vehicleClassId;
	private String vehicleClassName;
	private BigDecimal width;
	private Byte status;
	
	private String premiumNumber;
	private Date premiumDateFrom;
	private Date premiumDateTo;
	private BigDecimal premiumExpense;
	private String 	premiumCompany;
	private String oilNumber;
	private BigDecimal oilNumberAmount;
	
    public TVehicle() {
    }


	@Column(name="CUSTOMS_NO")
	public String getCustomsNo() {
		return this.customsNo;
	}

	public void setCustomsNo(String customsNo) {
		this.customsNo = customsNo;
	}


	@Column(name="ENGINE_NO")
	public String getEngineNo() {
		return this.engineNo;
	}

	public void setEngineNo(String engineNo) {
		this.engineNo = engineNo;
	}


	@Column(name="HEIGHT")
	public BigDecimal getHeight() {
		return this.height;
	}

	public void setHeight(BigDecimal height) {
		this.height = height;
	}


	@Column(name="IC_NO")
	public String getIcNo() {
		return this.icNo;
	}

	public void setIcNo(String icNo) {
		this.icNo = icNo;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="INSPECT_DATE_FROM")
	public Date getInspectDateFrom() {
		return this.inspectDateFrom;
	}

	public void setInspectDateFrom(Date inspectDateFrom) {
		this.inspectDateFrom = inspectDateFrom;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="INSPECT_DATE_TO")
	public Date getInspectDateTo() {
		return this.inspectDateTo;
	}

	public void setInspectDateTo(Date inspectDateTo) {
		this.inspectDateTo = inspectDateTo;
	}


	@Column(name="LENGTH")
	public BigDecimal getLength() {
		return this.length;
	}

	public void setLength(BigDecimal length) {
		this.length = length;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="MADE_DATE")
	public Date getMadeDate() {
		return this.madeDate;
	}

	public void setMadeDate(Date madeDate) {
		this.madeDate = madeDate;
	}


	@Column(name="MAX_LOAD")
	public BigDecimal getMaxLoad() {
		return this.maxLoad;
	}

	public void setMaxLoad(BigDecimal maxLoad) {
		this.maxLoad = maxLoad;
	}


	@Column(name="MOTORCADE_ID")
	public Integer getMotorcadeId() {
		return this.motorcadeId;
	}

	public void setMotorcadeId(Integer motorcadeId) {
		this.motorcadeId = motorcadeId;
	}


	@Column(name="MOTORCADE_NAME")
	public String getMotorcadeName() {
		return this.motorcadeName;
	}

	public void setMotorcadeName(String motorcadeName) {
		this.motorcadeName = motorcadeName;
	}


	@Column(name="PALLET_NO")
	public String getPalletNo() {
		return this.palletNo;
	}

	public void setPalletNo(String palletNo) {
		this.palletNo = palletNo;
	}


	@Column(name="PALLET_TYPE")
	public String getPalletType() {
		return this.palletType;
	}

	public void setPalletType(String palletType) {
		this.palletType = palletType;
	}


	@Column(name="REMARK")
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}


	@Column(name="VEHICLE_NAME")
	public String getVehicleName() {
		return this.vehicleName;
	}

	public void setVehicleName(String vehicleName) {
		this.vehicleName = vehicleName;
	}


	@Column(name="VEHICLE_NO")
	public String getVehicleNo() {
		return this.vehicleNo;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}

	@Column(name="VEHICLE_CLASS_ID")
	public Integer getVehicleClassId() {
		return this.vehicleClassId;
	}

	public void setVehicleClassId(Integer vehicleClassId) {
		this.vehicleClassId = vehicleClassId;
	}
	
	@Column(name="VEHICLE_CLASS_NAME")
	public String getVehicleClassName() {
		return this.vehicleClassName;
	}

	public void setVehicleClassName(String vehicleClassName) {
		this.vehicleClassName = vehicleClassName;
	}


	@Column(name="WIDTH")
	public BigDecimal getWidth() {
		return this.width;
	}

	public void setWidth(BigDecimal width) {
		this.width = width;
	}
	
	@Column(name="STATUS")
	public Byte getStatus() {
		return this.status;
	}

	public void setStatus(Byte status) {
		this.status = status;
	}

	
	@Column(name="PREMIUM_NUMBER")
	public String getPremiumNumber() {
		return this.premiumNumber;
	}


	public void setPremiumNumber(String premiumNumber) {
		this.premiumNumber = premiumNumber;
	}

	@Temporal( TemporalType.DATE)
	@Column(name="PREMIUM_DATE_FROM")
	public Date getPremiumDateFrom() {
		return this.premiumDateFrom;
	}


	public void setPremiumDateFrom(Date premiumDateFrom) {
		this.premiumDateFrom = premiumDateFrom;
	}

	@Temporal( TemporalType.DATE)
	@Column(name="PREMIUM_DATE_TO")
	public Date getPremiumDateTo() {
		return this.premiumDateTo;
	}


	public void setPremiumDateTo(Date premiumDateTo) {
		this.premiumDateTo = premiumDateTo;
	}


	@Column(name="PREMIUM_EXPENSE")
	public BigDecimal getPremiumExpense() {
		return this.premiumExpense;
	}


	public void setPremiumExpense(BigDecimal premiumExpense) {
		this.premiumExpense = premiumExpense;
	}

	@Column(name="PREMIUM_COMPANY")
	public String getPremiumCompany() {
		return this.premiumCompany;
	}


	public void setPremiumCompany(String premiumCompany) {
		this.premiumCompany = premiumCompany;
	}
	
	@Column(name="OIL_NUMBER")
	public String getOilNumber() {
		return this.oilNumber;
	}


	public void setOilNumber(String oilNumber) {
		this.oilNumber = oilNumber;
	}

	@Column(name="OIL_NUMBER_AMOUNT")
	public BigDecimal getOilNumberAmount() {
		return this.oilNumberAmount;
	}


	public void setOilNumberAmount(BigDecimal oilNumberAmount) {
		this.oilNumberAmount = oilNumberAmount;
	}
}