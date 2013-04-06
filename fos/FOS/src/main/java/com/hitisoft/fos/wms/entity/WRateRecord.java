package com.hitisoft.fos.wms.entity;

import java.io.Serializable;


import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "W_RATE_RECORD")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WRateRecord extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long rateId;
	private Integer fromDate;
	private Integer endDate;
	private Double unitPrice;
	private String recordType;
	private String puuid;
	
	
	public WRateRecord(){
		
	}
	
	@Column(name = "RATE_ID")
	public Long getRateId() {
		return this.rateId;
	}

	public void setRateId(Long rateId) {
		this.rateId = rateId;
	}
	
	@Column(name = "FROM_DATE")
	public Integer getFromDate() {
		return this.fromDate;
	}

	public void setFromDate(Integer fromDate) {
		this.fromDate = fromDate;
	}
	
	@Column(name = "END_DATE")
	public Integer getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Integer endDate) {
		this.endDate = endDate;
	}
	
	@Column(name = "UNIT_PRICE")
	public Double getUnitPrice() {
		return this.unitPrice;
	}

	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}
	
	@Column(name = "RECORD_TYPE")
	public String getRecordType() {
		return this.recordType;
	}

	public void setRecordType(String recordType) {
		this.recordType = recordType;
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
