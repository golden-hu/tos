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
@Table(name = "T_POSITION")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TPosition extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer driverId;
	private String lat;
	private String lng;
	public TPosition(){}
	
	@Column(name = "DRIVER_ID")
	public Integer getDriverId() {
		return this.driverId;
	}
	public void setDriverId(Integer driverId) {
		this.driverId = driverId;
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
	
}
