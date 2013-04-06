package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the t_repair_log database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="T_REPAIR_LOG")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TRepairLog extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer driverId;
	private String driverName;
	private Integer factoryId;
	private String factoryName;
	private BigDecimal invoiceAmount;
	private String invoiceNo;
	private Byte isPoint;
	private String remark;
	private Date repairDate;
	private String repairNo;
	private Integer vehicleId;
	private String vehicleNo;

    public TRepairLog() {
    }


	@Column(name="DRIVER_ID")
	public Integer getDriverId() {
		return this.driverId;
	}

	public void setDriverId(Integer driverId) {
		this.driverId = driverId;
	}


	@Column(name="DRIVER_NAME")
	public String getDriverName() {
		return this.driverName;
	}

	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}


	@Column(name="FACTORY_ID")
	public Integer getFactoryId() {
		return this.factoryId;
	}

	public void setFactoryId(Integer factoryId) {
		this.factoryId = factoryId;
	}


	@Column(name="FACTORY_NAME")
	public String getFactoryName() {
		return this.factoryName;
	}

	public void setFactoryName(String factoryName) {
		this.factoryName = factoryName;
	}


	@Column(name="INVOICE_AMOUNT")
	public BigDecimal getInvoiceAmount() {
		return this.invoiceAmount;
	}

	public void setInvoiceAmount(BigDecimal invoiceAmount) {
		this.invoiceAmount = invoiceAmount;
	}


	@Column(name="INVOICE_NO")
	public String getInvoiceNo() {
		return this.invoiceNo;
	}

	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}


	@Column(name="IS_POINT")
	public Byte getIsPoint() {
		return this.isPoint;
	}

	public void setIsPoint(Byte isPoint) {
		this.isPoint = isPoint;
	}


	@Column(name="REMARK")
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="REPAIR_DATE")
	public Date getRepairDate() {
		return this.repairDate;
	}

	public void setRepairDate(Date repairDate) {
		this.repairDate = repairDate;
	}


	@Column(name="REPAIR_NO")
	public String getRepairNo() {
		return this.repairNo;
	}

	public void setRepairNo(String repairNo) {
		this.repairNo = repairNo;
	}


	@Column(name="VEHICLE_ID")
	public Integer getVehicleId() {
		return this.vehicleId;
	}

	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}


	@Column(name="VEHICLE_NO")
	public String getVehicleNo() {
		return this.vehicleNo;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}

}