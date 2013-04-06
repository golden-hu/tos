package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import java.util.Date;


import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "W_RATE_CUST")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WRateCust extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long contractId;
	private Integer custId;	
	private String custCode;
	private String custName;
	private String puuid;
	private String contractNo;
	private Date fromDate;
	private Date endDate;
	private Date pateDate;
	private String remark;
	
	public WRateCust(){
		
	}
	
	
	@Column(name = "CUST_ID")
	public Integer getCustId() {
		return this.custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}
	
	
	
	@Column(name = "CUST_CODE")
	public String getCustCode() {
		return this.custCode;
	}

	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	
	@Column(name = "CUST_NAME")
	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}	

	@Column(name = "CONTRACT_NO")
	public String getContractNo() {
		return contractNo;
	}

	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}
	@Column(name = "CONTRACT_ID")
	public Long getContractId() {
		return contractId;
	}


	public void setContractId(Long contractId) {
		this.contractId = contractId;
	}
	@Temporal(TemporalType.DATE)
	@Column(name = "FROM_DATE")
	public Date getFromDate() {
		return fromDate;
	}


	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}
	@Temporal(TemporalType.DATE)
	@Column(name = "END_DATE")
	public Date getEndDate() {
		return endDate;
	}


	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	@Temporal(TemporalType.DATE) 
	@Column(name = "PATE_DATE")
	public Date getPateDate() {
		return pateDate;
	}


	public void setPateDate(Date pateDate) {
		this.pateDate = pateDate;
	}

	@Column(name = "REMARK")
	public String getRemark() {
		return remark;
	}


	public void setRemark(String remark) {
		this.remark = remark;
	}


	@Transient
	public String getPuuid() {
		return puuid;
	}

	public void setPuuid(String puuid) {
		this.puuid = puuid;
	}
	

}
