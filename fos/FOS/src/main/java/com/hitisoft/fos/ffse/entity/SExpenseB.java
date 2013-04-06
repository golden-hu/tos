package com.hitisoft.fos.ffse.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "S_EXPENSE_B")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SExpenseB extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 4164561809281591913L;
	private Integer charId;
	private String charName;
	private String charNameEn;
	private Integer chclId;
	private String consBizClass;
	private String consBizType;
	private Integer consCustId;
	private String consCustName;
	private String consHblNo;
	private Integer consId;
	private Integer consIdM;
	private String consMblNo;
	private String consNo;
	private String consNoM;
	private Date consSailDate;
	private String consShipType;
	private String consVessel;
	private String consVoyage;
	private String currCode;
	private Integer custId;
	private String custName;
	private String custSname;
	private Byte expeAllocatedFlag;
	private Byte expeAllocationFlag;
	private BigDecimal expeCommission;
	private BigDecimal expeCommissionRate;
	private Date expeDate;
	private BigDecimal expeExRate;
	private Byte expeForwardFlag;
	private Integer expeId;
	private Integer expeIdM;
	private BigDecimal expeInvoiceAmount;
	private String expeInvoiceBy;
	private Date expeInvoiceDate;
	private String expeInvoiceNo;
	private Byte expeInvoiceStatus;
	private BigDecimal expeNum;
	private BigDecimal expeNum2;
	private BigDecimal expeRcAmount;
	private String expeRemarks;
	private Byte expeStatus;
	private String expeTaxInvoiceNo;
	private BigDecimal expeTotalAmount;
	private String expeType;
	private BigDecimal expeUnitPrice;
	private String expeUpdateBy;
	private Date expeUpdateTime;
	private BigDecimal expeWriteOffAmount;
	private String expeWriteOffBy;
	private Date expeWriteOffDate;
	private BigDecimal expeWriteOffRcAmount;
	private Byte expeWriteoffStatus;
	private String pateCode;
	private String unitName;

	public SExpenseB() {
	}

	@Column(name = "CHAR_ID")
	public Integer getCharId() {
		return this.charId;
	}

	public void setCharId(Integer charId) {
		this.charId = charId;
	}

	@Column(name = "CHAR_NAME")
	public String getCharName() {
		return this.charName;
	}

	public void setCharName(String charName) {
		this.charName = charName;
	}

	@Column(name = "CHAR_NAME_EN")
	public String getCharNameEn() {
		return this.charNameEn;
	}

	public void setCharNameEn(String charNameEn) {
		this.charNameEn = charNameEn;
	}

	@Column(name = "CHCL_ID")
	public Integer getChclId() {
		return this.chclId;
	}

	public void setChclId(Integer chclId) {
		this.chclId = chclId;
	}

	@Column(name = "CONS_BIZ_CLASS")
	public String getConsBizClass() {
		return this.consBizClass;
	}

	public void setConsBizClass(String consBizClass) {
		this.consBizClass = consBizClass;
	}

	@Column(name = "CONS_BIZ_TYPE")
	public String getConsBizType() {
		return this.consBizType;
	}

	public void setConsBizType(String consBizType) {
		this.consBizType = consBizType;
	}

	@Column(name = "CONS_CUST_ID")
	public Integer getConsCustId() {
		return this.consCustId;
	}

	public void setConsCustId(Integer consCustId) {
		this.consCustId = consCustId;
	}

	@Column(name = "CONS_CUST_NAME")
	public String getConsCustName() {
		return this.consCustName;
	}

	public void setConsCustName(String consCustName) {
		this.consCustName = consCustName;
	}

	@Column(name = "CONS_HBL_NO")
	public String getConsHblNo() {
		return this.consHblNo;
	}

	public void setConsHblNo(String consHblNo) {
		this.consHblNo = consHblNo;
	}

	@Column(name = "CONS_ID")
	public Integer getConsId() {
		return this.consId;
	}

	public void setConsId(Integer consId) {
		this.consId = consId;
	}

	@Column(name = "CONS_ID_M")
	public Integer getConsIdM() {
		return this.consIdM;
	}

	public void setConsIdM(Integer consIdM) {
		this.consIdM = consIdM;
	}

	@Column(name = "CONS_MBL_NO")
	public String getConsMblNo() {
		return this.consMblNo;
	}

	public void setConsMblNo(String consMblNo) {
		this.consMblNo = consMblNo;
	}

	@Column(name = "CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Column(name = "CONS_NO_M")
	public String getConsNoM() {
		return this.consNoM;
	}

	public void setConsNoM(String consNoM) {
		this.consNoM = consNoM;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_SAIL_DATE")
	public Date getConsSailDate() {
		return this.consSailDate;
	}

	public void setConsSailDate(Date consSailDate) {
		this.consSailDate = consSailDate;
	}

	@Column(name = "CONS_SHIP_TYPE")
	public String getConsShipType() {
		return this.consShipType;
	}

	public void setConsShipType(String consShipType) {
		this.consShipType = consShipType;
	}

	@Column(name = "CONS_VESSEL")
	public String getConsVessel() {
		return this.consVessel;
	}

	public void setConsVessel(String consVessel) {
		this.consVessel = consVessel;
	}

	@Column(name = "CONS_VOYAGE")
	public String getConsVoyage() {
		return this.consVoyage;
	}

	public void setConsVoyage(String consVoyage) {
		this.consVoyage = consVoyage;
	}

	@Column(name = "CURR_CODE")
	public String getCurrCode() {
		return this.currCode;
	}

	public void setCurrCode(String currCode) {
		this.currCode = currCode;
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

	@Column(name = "EXPE_ALLOCATED_FLAG")
	public Byte getExpeAllocatedFlag() {
		return this.expeAllocatedFlag;
	}

	public void setExpeAllocatedFlag(Byte expeAllocatedFlag) {
		this.expeAllocatedFlag = expeAllocatedFlag;
	}

	@Column(name = "EXPE_ALLOCATION_FLAG")
	public Byte getExpeAllocationFlag() {
		return this.expeAllocationFlag;
	}

	public void setExpeAllocationFlag(Byte expeAllocationFlag) {
		this.expeAllocationFlag = expeAllocationFlag;
	}

	@Column(name = "EXPE_COMMISSION")
	public BigDecimal getExpeCommission() {
		return this.expeCommission;
	}

	public void setExpeCommission(BigDecimal expeCommission) {
		this.expeCommission = expeCommission;
	}

	@Column(name = "EXPE_COMMISSION_RATE")
	public BigDecimal getExpeCommissionRate() {
		return this.expeCommissionRate;
	}

	public void setExpeCommissionRate(BigDecimal expeCommissionRate) {
		this.expeCommissionRate = expeCommissionRate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "EXPE_DATE")
	public Date getExpeDate() {
		return this.expeDate;
	}

	public void setExpeDate(Date expeDate) {
		this.expeDate = expeDate;
	}

	@Column(name = "EXPE_EX_RATE")
	public BigDecimal getExpeExRate() {
		return this.expeExRate;
	}

	public void setExpeExRate(BigDecimal expeExRate) {
		this.expeExRate = expeExRate;
	}

	@Column(name = "EXPE_FORWARD_FLAG")
	public Byte getExpeForwardFlag() {
		return this.expeForwardFlag;
	}

	public void setExpeForwardFlag(Byte expeForwardFlag) {
		this.expeForwardFlag = expeForwardFlag;
	}

	@Column(name = "EXPE_ID")
	public Integer getExpeId() {
		return this.expeId;
	}

	public void setExpeId(Integer expeId) {
		this.expeId = expeId;
	}

	@Column(name = "EXPE_ID_M")
	public Integer getExpeIdM() {
		return this.expeIdM;
	}

	public void setExpeIdM(Integer expeIdM) {
		this.expeIdM = expeIdM;
	}

	@Column(name = "EXPE_INVOICE_AMOUNT")
	public BigDecimal getExpeInvoiceAmount() {
		return this.expeInvoiceAmount;
	}

	public void setExpeInvoiceAmount(BigDecimal expeInvoiceAmount) {
		this.expeInvoiceAmount = expeInvoiceAmount;
	}

	@Column(name = "EXPE_INVOICE_BY")
	public String getExpeInvoiceBy() {
		return this.expeInvoiceBy;
	}

	public void setExpeInvoiceBy(String expeInvoiceBy) {
		this.expeInvoiceBy = expeInvoiceBy;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "EXPE_INVOICE_DATE")
	public Date getExpeInvoiceDate() {
		return this.expeInvoiceDate;
	}

	public void setExpeInvoiceDate(Date expeInvoiceDate) {
		this.expeInvoiceDate = expeInvoiceDate;
	}

	@Column(name = "EXPE_INVOICE_NO")
	public String getExpeInvoiceNo() {
		return this.expeInvoiceNo;
	}

	public void setExpeInvoiceNo(String expeInvoiceNo) {
		this.expeInvoiceNo = expeInvoiceNo;
	}

	@Column(name = "EXPE_INVOICE_STATUS")
	public Byte getExpeInvoiceStatus() {
		return this.expeInvoiceStatus;
	}

	public void setExpeInvoiceStatus(Byte expeInvoiceStatus) {
		this.expeInvoiceStatus = expeInvoiceStatus;
	}

	@Column(name = "EXPE_NUM")
	public BigDecimal getExpeNum() {
		return this.expeNum;
	}

	public void setExpeNum(BigDecimal expeNum) {
		this.expeNum = expeNum;
	}

	@Column(name = "EXPE_NUM2")
	public BigDecimal getExpeNum2() {
		return this.expeNum2;
	}

	public void setExpeNum2(BigDecimal expeNum2) {
		this.expeNum2 = expeNum2;
	}

	@Column(name = "EXPE_RC_AMOUNT")
	public BigDecimal getExpeRcAmount() {
		return this.expeRcAmount;
	}

	public void setExpeRcAmount(BigDecimal expeRcAmount) {
		this.expeRcAmount = expeRcAmount;
	}

	@Column(name = "EXPE_REMARKS")
	public String getExpeRemarks() {
		return this.expeRemarks;
	}

	public void setExpeRemarks(String expeRemarks) {
		this.expeRemarks = expeRemarks;
	}

	@Column(name = "EXPE_STATUS")
	public Byte getExpeStatus() {
		return this.expeStatus;
	}

	public void setExpeStatus(Byte expeStatus) {
		this.expeStatus = expeStatus;
	}

	@Column(name = "EXPE_TAX_INVOICE_NO")
	public String getExpeTaxInvoiceNo() {
		return this.expeTaxInvoiceNo;
	}

	public void setExpeTaxInvoiceNo(String expeTaxInvoiceNo) {
		this.expeTaxInvoiceNo = expeTaxInvoiceNo;
	}

	@Column(name = "EXPE_TOTAL_AMOUNT")
	public BigDecimal getExpeTotalAmount() {
		return this.expeTotalAmount;
	}

	public void setExpeTotalAmount(BigDecimal expeTotalAmount) {
		this.expeTotalAmount = expeTotalAmount;
	}

	@Column(name = "EXPE_TYPE")
	public String getExpeType() {
		return this.expeType;
	}

	public void setExpeType(String expeType) {
		this.expeType = expeType;
	}

	@Column(name = "EXPE_UNIT_PRICE")
	public BigDecimal getExpeUnitPrice() {
		return this.expeUnitPrice;
	}

	public void setExpeUnitPrice(BigDecimal expeUnitPrice) {
		this.expeUnitPrice = expeUnitPrice;
	}

	@Column(name = "EXPE_UPDATE_BY")
	public String getExpeUpdateBy() {
		return this.expeUpdateBy;
	}

	public void setExpeUpdateBy(String expeUpdateBy) {
		this.expeUpdateBy = expeUpdateBy;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "EXPE_UPDATE_TIME")
	public Date getExpeUpdateTime() {
		return this.expeUpdateTime;
	}

	public void setExpeUpdateTime(Date expeUpdateTime) {
		this.expeUpdateTime = expeUpdateTime;
	}

	@Column(name = "EXPE_WRITE_OFF_AMOUNT")
	public BigDecimal getExpeWriteOffAmount() {
		return this.expeWriteOffAmount;
	}

	public void setExpeWriteOffAmount(BigDecimal expeWriteOffAmount) {
		this.expeWriteOffAmount = expeWriteOffAmount;
	}

	@Column(name = "EXPE_WRITE_OFF_BY")
	public String getExpeWriteOffBy() {
		return this.expeWriteOffBy;
	}

	public void setExpeWriteOffBy(String expeWriteOffBy) {
		this.expeWriteOffBy = expeWriteOffBy;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "EXPE_WRITE_OFF_DATE")
	public Date getExpeWriteOffDate() {
		return this.expeWriteOffDate;
	}

	public void setExpeWriteOffDate(Date expeWriteOffDate) {
		this.expeWriteOffDate = expeWriteOffDate;
	}

	@Column(name = "EXPE_WRITE_OFF_RC_AMOUNT")
	public BigDecimal getExpeWriteOffRcAmount() {
		return this.expeWriteOffRcAmount;
	}

	public void setExpeWriteOffRcAmount(BigDecimal expeWriteOffRcAmount) {
		this.expeWriteOffRcAmount = expeWriteOffRcAmount;
	}

	@Column(name = "EXPE_WRITEOFF_STATUS")
	public Byte getExpeWriteoffStatus() {
		return this.expeWriteoffStatus;
	}

	public void setExpeWriteoffStatus(Byte expeWriteoffStatus) {
		this.expeWriteoffStatus = expeWriteoffStatus;
	}

	@Column(name = "PATE_CODE")
	public String getPateCode() {
		return this.pateCode;
	}

	public void setPateCode(String pateCode) {
		this.pateCode = pateCode;
	}

	@Column(name = "UNIT_NAME")
	public String getUnitName() {
		return this.unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

}
