package com.hitisoft.fos.wms.entity;

import java.io.Serializable;

import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "W_RATE_Sheet")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WRateSheet extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable{
	private static final long serialVersionUID = 1L;
	

	private Integer cargoCategoryId;
	private String categoryCode;
	private String categoryName;
	private Integer cargoId;
	private String skuNo;
	private String cargoName;
	
	private Long rateId;
	private String puuid;
	
	
	public WRateSheet(){
		
	}
	
	@Column(name = "CARGO_CATEGORY_ID")
	public Integer getCargoCategoryId() {
		return this.cargoCategoryId;
	}

	public void setCargoCategoryId(Integer cargoCategoryId) {
		this.cargoCategoryId = cargoCategoryId;
	}
	
	@Column(name = "CATEGORY_CODE")
	public String getCategoryCode() {
		return this.categoryCode;
	}

	public void setCategoryCode(String categoryCode) {
		this.categoryCode = categoryCode;
	}
	
	@Column(name = "CATEGORY_NAME")
	public String getCategoryName() {
		return this.categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	
	@Column(name = "CARGO_ID")
	public Integer getCargoId() {
		return cargoId;
	}

	public void setCargoId(Integer cargoId) {
		this.cargoId = cargoId;
	}
	@Column(name = "SKU_NO")
	public String getSkuNo() {
		return skuNo;
	}

	public void setSkuNo(String skuNo) {
		this.skuNo = skuNo;
	}
	@Column(name = "CARGO_NAME")
	public String getCargoName() {
		return cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}

	@Column(name = "RATE_ID")
	public Long getRateId() {
		return this.rateId;
	}

	public void setRateId(Long newId) {
		this.rateId = newId;
	}
	
	@Transient
	public String getPUuid()
	{
		return this.puuid;	
	}
	
	public void setPUid(String puuid)
	{
		this.puuid=puuid;
	}
	
}
