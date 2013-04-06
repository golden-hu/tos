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
@Table(name = "T_VEHICLE_CLASS")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TVehicleClass extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -8133703062971286217L;
	private String vehicleClassName;

	public TVehicleClass() {
	}
	
	@Column(name = "VEHICLE_CLASS_NAME")
	public String getVehicleClassName() {
		return this.vehicleClassName;
	}

	public void setVehicleClassName(String vehicleClassName) {
		this.vehicleClassName = vehicleClassName;
	}

}
