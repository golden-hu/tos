package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import java.util.Date;


/**
 * The persistent class for the t_price database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="T_PRICE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TPrice extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer loadProvinceId;
	private String loadProvinceName;
	private Integer loadCityId;
	private String loadCityName;
	
	private Integer dischargeProvinceId;
	private String dischargeProvinceName;
	private Integer dischargeCityId;
	private String dischargeCityName;
	
	private Double miles;
	private Double duration;
	
	private Double price1;
	private Double price2;
	private Double price3;
	private Double price4;
	
	private Byte active;
	
	private Date startDate;
	private Date endDate;

    public TPrice() {
    }

    @Column(name="MILES")
	public Double getMiles() {
		return this.miles;
	}

	public void setMiles(Double miles) {
		this.miles = miles;
	}

	@Column(name="DURATION")
	public Double getDuration() {
		return this.duration;
	}

	public void setDuration(Double duration) {
		this.duration = duration;
	}

	@Column(name="PRICE1")
	public Double getPrice1() {
		return this.price1;
	}

	public void setPrice1(Double price1) {
		this.price1 = price1;
	}

	@Column(name="PRICE2")
	public Double getPrice2() {
		return this.price2;
	}

	public void setPrice2(Double price2) {
		this.price2 = price2;
	}

	@Column(name="PRICE3")
	public Double getPrice3() {
		return this.price3;
	}

	public void setPrice3(Double price3) {
		this.price3 = price3;
	}
	
	@Column(name="PRICE4")
	public Double getPrice4() {
		return this.price4;
	}

	public void setPrice4(Double price4) {
		this.price4 = price4;
	}
	
	@Column(name="LOAD_PROVINCE_ID")
	public Integer getLoadProvinceId() {
		return this.loadProvinceId;
	}

	public void setLoadProvinceId(Integer loadProvinceId) {
		this.loadProvinceId = loadProvinceId;
	}


	@Column(name="LOAD_PROVINCE_NAME")
	public String getLoadProvinceName() {
		return this.loadProvinceName;
	}

	public void setLoadProvinceName(String loadProvinceName) {
		this.loadProvinceName = loadProvinceName;
	}

	@Column(name="LOAD_CITY_ID")
	public Integer getLoadCityId() {
		return this.loadCityId;
	}

	public void setLoadCityId(Integer loadCityId) {
		this.loadCityId = loadCityId;
	}


	@Column(name="LOAD_CITY_NAME")
	public String getLoadCityName() {
		return this.loadCityName;
	}

	public void setLoadCityName(String loadCityName) {
		this.loadCityName = loadCityName;
	}

	@Column(name="DISCHARGE_PROVINCE_ID")
	public Integer getDischargeProvinceId() {
		return this.dischargeProvinceId;
	}

	public void setDischargeProvinceId(Integer dischargeProvinceId) {
		this.dischargeProvinceId = dischargeProvinceId;
	}


	@Column(name="DISCHARGE_PROVINCE_NAME")
	public String getDischargeProvinceName() {
		return this.dischargeProvinceName;
	}

	public void setDischargeProvinceName(String dischargeProvinceName) {
		this.dischargeProvinceName = dischargeProvinceName;
	}

	@Column(name="DISCHARGE_CITY_ID")
	public Integer getDischargeCityId() {
		return this.dischargeCityId;
	}

	public void setDischargeCityId(Integer dischargeCityId) {
		this.dischargeCityId = dischargeCityId;
	}


	@Column(name="DISCHARGE_CITY_NAME")
	public String getDischargeCityName() {
		return this.dischargeCityName;
	}

	public void setDischargeCityName(String dischargeCityName) {
		this.dischargeCityName = dischargeCityName;
	}
	
	@Column(name="ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}
	

    @Temporal( TemporalType.DATE)
	@Column(name="START_DATE")
	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	@Temporal( TemporalType.DATE)
	@Column(name="END_DATE")
	public Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	

}