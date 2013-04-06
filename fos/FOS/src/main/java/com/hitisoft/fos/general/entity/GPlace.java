package com.hitisoft.fos.general.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "G_PLACE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GPlace extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -2529493333682432720L;
	private Byte active;
	private String counCode;
	private Integer custId;
	private String custName;
	private String custSname;
	private String placAddress;
	private String placCityName;
	private String placCode;
	private String placDesc;
	private String placName;
	private String placNameEn;
	private Integer placProvinceId;
	private String placProvinceName;
	private String placStation;
	private Byte placType;

	public GPlace() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "COUN_CODE")
	public String getCounCode() {
		return this.counCode;
	}

	public void setCounCode(String counCode) {
		this.counCode = counCode;
	}

	@Column(name = "CUST_ID")
	public Integer getCustId() {
		return this.custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}

	@Column(name = "CUST_NAME")
	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	@Column(name = "CUST_SNAME")
	public String getCustSname() {
		return this.custSname;
	}

	public void setCustSname(String custSname) {
		this.custSname = custSname;
	}

	@Column(name = "PLAC_ADDRESS")
	public String getPlacAddress() {
		return this.placAddress;
	}

	public void setPlacAddress(String placAddress) {
		this.placAddress = placAddress;
	}

	@Column(name = "PLAC_CITY_NAME")
	public String getPlacCityName() {
		return this.placCityName;
	}

	public void setPlacCityName(String placCityName) {
		this.placCityName = placCityName;
	}

	@Column(name = "PLAC_CODE")
	public String getPlacCode() {
		return this.placCode;
	}

	public void setPlacCode(String placCode) {
		this.placCode = placCode;
	}

	@Column(name = "PLAC_DESC")
	public String getPlacDesc() {
		return this.placDesc;
	}

	public void setPlacDesc(String placDesc) {
		this.placDesc = placDesc;
	}

	@Column(name = "PLAC_NAME")
	public String getPlacName() {
		return this.placName;
	}

	public void setPlacName(String placName) {
		this.placName = placName;
	}

	@Column(name = "PLAC_NAME_EN")
	public String getPlacNameEn() {
		return this.placNameEn;
	}

	public void setPlacNameEn(String placNameEn) {
		this.placNameEn = placNameEn;
	}

	@Column(name = "PLAC_PROVINCE_ID")
	public Integer getPlacProvinceId() {
		return this.placProvinceId;
	}

	public void setPlacProvinceId(Integer placProvinceId) {
		this.placProvinceId = placProvinceId;
	}

	@Column(name = "PLAC_PROVINCE_NAME")
	public String getPlacProvinceName() {
		return this.placProvinceName;
	}

	public void setPlacProvinceName(String placProvinceName) {
		this.placProvinceName = placProvinceName;
	}

	@Column(name = "PLAC_STATION")
	public String getPlacStation() {
		return this.placStation;
	}

	public void setPlacStation(String placStation) {
		this.placStation = placStation;
	}

	@Column(name = "PLAC_TYPE")
	public Byte getPlacType() {
		return this.placType;
	}

	public void setPlacType(Byte placType) {
		this.placType = placType;
	}

}
