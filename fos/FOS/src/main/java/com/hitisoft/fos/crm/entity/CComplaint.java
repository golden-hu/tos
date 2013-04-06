package com.hitisoft.fos.crm.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.util.Date;

/**
 * The persistent class for the t_complaint database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="C_COMPLAINT")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CComplaint extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private Date complaintDate;
	private String custId;
	private String custName;
	private String consNo;
	private Integer complaintTypeId;
	private String complaintType;
	private String businessType;
	private String reason;
	private String solution;
	private Integer status;
	private Integer damagedNum;
	private Integer lossNum;
	private BigDecimal lossAmount;
	private BigDecimal compensationAmount;
	private BigDecimal custCompAmount;
	
	@Temporal( TemporalType.DATE)
	@Column(name="COMPLAINT_DATE")
	public Date getComplaintDate() {
		return complaintDate;
	}
	public void setComplaintDate(Date complaintDate) {
		this.complaintDate = complaintDate;
	}
	
	@Column(name="CUST_ID")
	public String getCustId() {
		return custId;
	}
	public void setCustId(String custId) {
		this.custId = custId;
	}
	
	@Column(name="CUST_NAME")
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	
	@Column(name="CONS_NO")
	public String getConsNo() {
		return consNo;
	}
	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}
	
	@Column(name="COMPLAINT_TYPE_ID")
	public Integer getComplaintTypeId() {
		return complaintTypeId;
	}
	public void setComplaintTypeId(Integer complaintTypeId) {
		this.complaintTypeId = complaintTypeId;
	}
	
	@Column(name="COMPLAINT_TYPE")
	public String getComplaintType() {
		return complaintType;
	}
	public void setComplaintType(String complaintType) {
		this.complaintType = complaintType;
	}
	
	@Column(name="BUSINESS_TYPE")
	public String getBusinessType() {
		return businessType;
	}
	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}
	
	@Column(name="REASON")
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	
	@Column(name="SOLUTION")
	public String getSolution() {
		return solution;
	}
	public void setSolution(String solution) {
		this.solution = solution;
	}
	
	@Column(name="STATUS")
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	
	@Column(name="DAMAGED_NUM")
	public Integer getDamagedNum() {
		return damagedNum;
	}
	public void setDamagedNum(Integer damagedNum) {
		this.damagedNum = damagedNum;
	}
	
	@Column(name="LOSS_NUM")
	public Integer getLossNum() {
		return lossNum;
	}
	public void setLossNum(Integer lossNum) {
		this.lossNum = lossNum;
	}
	
	@Column(name="LOSS_AMOUNT")
	public BigDecimal getLossAmount() {
		return lossAmount;
	}
	public void setLossAmount(BigDecimal lossAmount) {
		this.lossAmount = lossAmount;
	}
	
	@Column(name="COMPENSATION_AMOUNT")
	public BigDecimal getCompensationAmount() {
		return compensationAmount;
	}
	public void setCompensationAmount(BigDecimal compensationAmount) {
		this.compensationAmount = compensationAmount;
	}
	
	@Column(name="CUST_COMP_AMOUNT")
	public BigDecimal getCustCompAmount() {
		return custCompAmount;
	}
	public void setCustCompAmount(BigDecimal custCompAmount) {
		this.custCompAmount = custCompAmount;
	}
}