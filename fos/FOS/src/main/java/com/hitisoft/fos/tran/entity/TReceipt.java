package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * The persistent class for the t_receipt database table.
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "T_RECEIPT")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TReceipt extends com.hitisoft.fw.orm.jpa.BaseDomain implements
		Serializable {
	private static final long serialVersionUID = 1L;
	private Long consId;
	private String consNo;
	private String transTaskNo;
	private Long transTaskId;
	private String signatureBy;
	private Date signatureDate;
	private Date signatureTime;
	private String signatureRemarks;
	private String receiptBy;
	private Date receiptDate;
	private Date receiptTime;
	private Integer receiptStatus;
	private Date loadDate;
	private Date loadTime;
	private Date deliveryDate;
	private Date deliveryTime;
	private Integer demageFlag;
	private String demageRemarks;
	private BigDecimal demageQuantity;
	private String custName;
	private Date consDate;

	public TReceipt() {

	}

	@Column(name = "CONS_ID")
	public Long getConsId() {
		return consId;
	}

	public void setConsId(Long consId) {
		this.consId = consId;
	}

	@Column(name = "CONS_NO")
	public String getConsNo() {
		return consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Transient
	public String getTransTaskNo() {
		return transTaskNo;
	}

	public void setTransTaskNo(String transTaskNo) {
		this.transTaskNo = transTaskNo;
	}

	@Column(name = "TRANS_TASK_ID")
	public Long getTransTaskId() {
		return transTaskId;
	}

	public void setTransTaskId(Long transTaskId) {
		this.transTaskId = transTaskId;
	}

	@Column(name = "SIGNATURE_BY")
	public String getSignatureBy() {
		return signatureBy;
	}

	public void setSignatureBy(String signatureBy) {
		this.signatureBy = signatureBy;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "SIGNATURE_DATE")
	public Date getSignatureDate() {
		return signatureDate;
	}

	public void setSignatureDate(Date signatureDate) {
		this.signatureDate = signatureDate;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "SIGNATURE_TIME")
	public Date getSignatureTime() {
		return signatureTime;
	}

	public void setSignatureTime(Date signatureTime) {
		this.signatureTime = signatureTime;
	}

	@Column(name = "SIGNATURE_REMARKS")
	public String getSignatureRemarks() {
		return signatureRemarks;
	}

	public void setSignatureRemarks(String signatureRemarks) {
		this.signatureRemarks = signatureRemarks;
	}

	@Column(name = "RECEIPT_BY")
	public String getReceiptBy() {
		return receiptBy;
	}

	public void setReceiptBy(String receiptBy) {
		this.receiptBy = receiptBy;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "RECEIPT_DATE")
	public Date getReceiptDate() {
		return receiptDate;
	}

	public void setReceiptDate(Date receiptDate) {
		this.receiptDate = receiptDate;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "RECEIPT_TIME")
	public Date getReceiptTime() {
		return receiptTime;
	}

	public void setReceiptTime(Date receiptTime) {
		this.receiptTime = receiptTime;
	}

	@Column(name = "RECEIPT_STATUS")
	public Integer getReceiptStatus() {
		return receiptStatus;
	}

	public void setReceiptStatus(Integer receiptStatus) {
		this.receiptStatus = receiptStatus;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "LOAD_DATE")
	public Date getLoadDate() {
		return loadDate;
	}

	public void setLoadDate(Date loadDate) {
		this.loadDate = loadDate;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "LOAD_TIME")
	public Date getLoadTime() {
		return loadTime;
	}

	public void setLoadTime(Date loadTime) {
		this.loadTime = loadTime;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "DELIVERY_DATE")
	public Date getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "DELIVERY_TIME")
	public Date getDeliveryTime() {
		return deliveryTime;
	}

	public void setDeliveryTime(Date deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	@Column(name = "DEMAGE_FLAG")
	public Integer getDemageFlag() {
		return demageFlag;
	}

	public void setDemageFlag(Integer demageFlag) {
		this.demageFlag = demageFlag;
	}

	@Column(name = "DEMAGE_REMARKS")
	public String getDemageRemarks() {
		return demageRemarks;
	}

	public void setDemageRemarks(String demageRemarks) {
		this.demageRemarks = demageRemarks;
	}

	@Column(name = "DEMAGE_QUANTITY")
	public BigDecimal getDemageQuantity() {
		return demageQuantity;
	}

	public void setDemageQuantity(BigDecimal demageQuantity) {
		this.demageQuantity = demageQuantity;
	}

	@Transient
	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	@Transient
	public Date getConsDate() {
		return consDate;
	}

	public void setConsDate(Date consDate) {
		this.consDate = consDate;
	}

}