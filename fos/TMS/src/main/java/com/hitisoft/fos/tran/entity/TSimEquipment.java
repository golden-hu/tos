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
@Table(name = "T_SIM_EQUIPMENT")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
/**
 * 车辆跟踪设备
 * @author JOHN
 */
public class TSimEquipment extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private String simEquiType;
	private String simEquiNo;
	private String simNum;
	private Date simStartDate;
	private Date simEndDate;
	private String vehicleName;
	private String vehicleNo;
	private String vehicleId;
	private Integer vehicleSpeed;
	private String vehicleIcon;
	private String driverName;
	private String driverMobile;
	private String driverTel;
	private String remark;
	
	public TSimEquipment(){ }

	@Column(name = "SIM_EQUI_TYPE")
	public String getSimEquiType() {
    	return simEquiType;
    }

	public void setSimEquiType(String simEquiType) {
    	this.simEquiType = simEquiType;
    }

	@Column(name = "SIM_EQUI_NO")
	public String getSimEquiNo() {
    	return simEquiNo;
    }

	public void setSimEquiNo(String simEquiNo) {
    	this.simEquiNo = simEquiNo;
    }

	@Column(name = "SIM_NUM")
	public String getSimNum() {
    	return simNum;
    }

	public void setSimNum(String simNum) {
    	this.simNum = simNum;
    }

	@Temporal( TemporalType.DATE)
	@Column(name = "SIM_START_DATE")
	public Date getSimStartDate() {
    	return simStartDate;
    }

	public void setSimStartDate(Date simStartDate) {
    	this.simStartDate = simStartDate;
    }

	@Temporal( TemporalType.DATE)
	@Column(name = "SIM_END_DATE")
	public Date getSimEndDate() {
    	return simEndDate;
    }

	public void setSimEndDate(Date simEndDate) {
    	this.simEndDate = simEndDate;
    }

	@Column(name = "VEHICLE_NO")
	public String getVehicleNo() {
    	return vehicleNo;
    }
	
	public void setVehicleNo(String vehicleNo) {
    	this.vehicleNo = vehicleNo;
    }
	
	@Column(name = "VEHICLE_NAME")
	public String getVehicleName() {
    	return vehicleName;
    }
	
	public void setVehicleName(String vehicleName) {
    	this.vehicleName = vehicleName;
    }

	@Column(name = "VEHICLE_SPEED")
	public Integer getVehicleSpeed() {
    	return vehicleSpeed;
    }

	public void setVehicleSpeed(Integer vehicleSpeed) {
    	this.vehicleSpeed = vehicleSpeed;
    }

	@Column(name = "VEHICLE_ICON")
	public String getVehicleIcon() {
    	return vehicleIcon;
    }

	public void setVehicleIcon(String vehicleIcon) {
    	this.vehicleIcon = vehicleIcon;
    }

	@Column(name = "DRIVER_NAME")
	public String getDriverName() {
    	return driverName;
    }

	public void setDriverName(String driverName) {
    	this.driverName = driverName;
    }

	@Column(name = "DRIVER_MOBILE")
	public String getDriverMobile() {
    	return driverMobile;
    }

	public void setDriverMobile(String driverMobile) {
    	this.driverMobile = driverMobile;
    }

	@Column(name = "DRIVER_TEL")
	public String getDriverTel() {
    	return driverTel;
    }

	public void setDriverTel(String driverTel) {
    	this.driverTel = driverTel;
    }

	@Column(name = "REMARK")
	public String getRemark() {
    	return remark;
    }

	public void setRemark(String remark) {
    	this.remark = remark;
    }

	@Column(name = "VEHICLE_ID")
	public String getVehicleId() {
    	return vehicleId;
    }

	public void setVehicleId(String vehicleId) {
    	this.vehicleId = vehicleId;
    }
	
}
