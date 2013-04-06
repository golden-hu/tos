package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "T_SIM_POSITION")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
/**
 * 车辆跟踪
 * @author JOHN
 */
public class TSimPosition extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private String factoryName;
	private String simEquiNo;
	private String speed;
	private String direction;
	private Date sendTime;
	private String lat;
	private String lng;
	private String address;
	//是否在线 true在线 false 不在线
	private String online;
	
	//虚拟字段
	private String vehicleNo;
	
	public TSimPosition(){}

	@Column(name = "SIM_EQUI_NO")
	public String getSimEquiNo() {
    	return simEquiNo;
    }

	public void setSimEquiNo(String simEquiNo) {
    	this.simEquiNo = simEquiNo;
    }

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "SEND_TIME")
	public Date getSendTime() {
    	return sendTime;
    }

	public void setSendTime(Date sendTime) {
    	this.sendTime = sendTime;
    }

	@Column(name = "LAT")
	public String getLat() {
		return this.lat;
	}
	public void setLat(String lat) {
		this.lat = lat;
	}
	
	@Column(name = "LNG")
	public String getLng() {
		return this.lng;
	}
	public void setLng(String lng) {
		this.lng = lng;
	}

	@Column(name = "FACTORY_NAME")
	public String getFactoryName() {
    	return factoryName;
    }

	public void setFactoryName(String factoryName) {
    	this.factoryName = factoryName;
    }

	@Column(name = "SPEED")
	public String getSpeed() {
    	return speed;
    }

	public void setSpeed(String speed) {
    	this.speed = speed;
    }

	@Column(name = "DIRECTION")
	public String getDirection() {
    	return direction;
    }

	public void setDirection(String direction) {
    	this.direction = direction;
    }

	@Column(name = "ADDRESS")
	public String getAddress() {
    	return address;
    }

	public void setAddress(String address) {
    	this.address = address;
    }

	@Column(name = "ONLINE")
	public String getOnline() {
    	return online;
    }

	public void setOnline(String online) {
    	this.online = online;
    }
	
	@Transient
	public String getVehicleNo() {
    	return vehicleNo;
    }

	public void setVehicleNo(String vehicleNo) {
    	this.vehicleNo = vehicleNo;
    }
	
	
	
}
