package com.hitisoft.fos.sys.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
public class CShipper extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -1116475288607097136L;
	private String shipperName;
	private String shipperAddress;
	private String shipperContact;
	private String shipperTel;
	private String shipperMobile;
	private String shipperProvince;
	private String shipperCity;
	
	public CShipper() {
	}
	
	public String getShipperName() {
		return this.shipperName;
	}

	public void setShipperName(String shipperName) {
		this.shipperName = shipperName;
	}
	
	public String getShipperContact() {
		return this.shipperContact;
	}

	public void setShipperContact(String shipperContact) {
		this.shipperContact = shipperContact;
	}
	
	public String getShipperTel() {
		return this.shipperTel;
	}

	public void setShipperTel(String shipperTel) {
		this.shipperTel = shipperTel;
	}
	
	public String getShipperAddress() {
		return this.shipperAddress;
	}

	public void setShipperAddress(String shipperAddress) {
		this.shipperAddress = shipperAddress;
	}

	public String getShipperMobile() {
		return this.shipperMobile;
	}

	public void setShipperMobile(String shipperMobile) {
		this.shipperMobile = shipperMobile;
	}

	public String getShipperProvince() {
		return shipperProvince;
	}

	public void setShipperProvince(String shipperProvince) {
		this.shipperProvince = shipperProvince;
	}

	public String getShipperCity() {
		return shipperCity;
	}

	public void setShipperCity(String shipperCity) {
		this.shipperCity = shipperCity;
	}
	
}
