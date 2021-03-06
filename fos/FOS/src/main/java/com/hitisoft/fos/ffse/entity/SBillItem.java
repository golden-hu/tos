package com.hitisoft.fos.ffse.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "S_BILL_ITEM")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SBillItem extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -1002758932640318560L;
	private Long billId;
	private Long expeId;
	private Long custId;
	private String custName;
	private String custSname;
	private Long charId;
	private String charName;
	private Long unitId;
	private String unitName;
	private String currCode;
	private String expeType;
	private Integer expePaymentType;
	private Date expeDate;
	private Double expeUnitPrice;
	private Double expeNum;
	private Double expeCommission;
	private Double expeCommissionRate;
	private Double expeTotalAmount;
	private Double expeExRate;
	private Short expeStatus;
	private String expeRemarks;
	private Short expeForwardFlag;
	private String consNo;
	private String consMblNo;
	private String consHblNo;
	private String consVessel;
	private String consVoyage;

	private String consPodEn;
	private String consPolEn;
	private String consCargoNameCn;
	private String consPackName;
	private Integer consTotalPackages;
	private Double consTotalGrossWeight;
	private Double consTotalNetWeight;
	private Double consTotalMeasurement;
	private String consContainersInfo;
	private Date consSailDate;
	
	public SBillItem() {
	}

	@Column(name = "BILL_ID")
	public Long getBillId() {
		return this.billId;
	}

	public void setBillId(Long billId) {
		this.billId = billId;
	}

	@Column(name = "EXPE_ID")
	public Long getExpeId() {
		return this.expeId;
	}

	public void setExpeId(Long expeId) {
		this.expeId = expeId;
	}

	@Column(name = "CUST_ID")
	public Long getCustId() {
		return this.custId;
	}

	public void setCustId(Long custId) {
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

	@Column(name = "CHAR_ID")
	public Long getCharId() {
		return this.charId;
	}

	public void setCharId(Long charId) {
		this.charId = charId;
	}

	@Column(name = "CHAR_NAME")
	public String getCharName() {
		return this.charName;
	}

	public void setCharName(String charName) {
		this.charName = charName;
	}

	@Column(name = "UNIT_ID")
	public Long getUnitId() {
		return this.unitId;
	}

	public void setUnitId(Long unitId) {
		this.unitId = unitId;
	}

	@Column(name = "UNIT_NAME")
	public String getUnitName() {
		return this.unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	@Column(name = "CURR_CODE")
	public String getCurrCode() {
		return this.currCode;
	}

	public void setCurrCode(String currCode) {
		this.currCode = currCode;
	}

	@Column(name = "EXPE_TYPE")
	public String getExpeType() {
		return this.expeType;
	}

	public void setExpeType(String expeType) {
		this.expeType = expeType;
	}

	@Column(name = "EXPE_PAYMENT_TYPE")
	public Integer getExpePaymentType() {
		return this.expePaymentType;
	}

	public void setExpePaymentType(Integer expePaymentType) {
		this.expePaymentType = expePaymentType;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "EXPE_DATE")
	public Date getExpeDate() {
		return this.expeDate;
	}

	public void setExpeDate(Date expeDate) {
		this.expeDate = expeDate;
	}

	@Column(name = "EXPE_UNIT_PRICE")
	public Double getExpeUnitPrice() {
		return this.expeUnitPrice;
	}

	public void setExpeUnitPrice(Double expeUnitPrice) {
		this.expeUnitPrice = expeUnitPrice;
	}

	@Column(name = "EXPE_NUM")
	public Double getExpeNum() {
		return this.expeNum;
	}

	public void setExpeNum(Double expeNum) {
		this.expeNum = expeNum;
	}

	@Column(name = "EXPE_COMMISSION")
	public Double getExpeCommission() {
		return this.expeCommission;
	}

	public void setExpeCommission(Double expeCommission) {
		this.expeCommission = expeCommission;
	}

	@Column(name = "EXPE_COMMISSION_RATE")
	public Double getExpeCommissionRate() {
		return this.expeCommissionRate;
	}

	public void setExpeCommissionRate(Double expeCommissionRate) {
		this.expeCommissionRate = expeCommissionRate;
	}

	@Column(name = "EXPE_TOTAL_AMOUNT")
	public Double getExpeTotalAmount() {
		return this.expeTotalAmount;
	}

	public void setExpeTotalAmount(Double expeTotalAmount) {
		this.expeTotalAmount = expeTotalAmount;
	}

	@Column(name = "EXPE_EX_RATE")
	public Double getExpeExRate() {
		return this.expeExRate;
	}

	public void setExpeExRate(Double expeExRate) {
		this.expeExRate = expeExRate;
	}

	@Column(name = "EXPE_STATUS")
	public Short getExpeStatus() {
		return this.expeStatus;
	}

	public void setExpeStatus(Short expeStatus) {
		this.expeStatus = expeStatus;
	}

	@Column(name = "EXPE_REMARKS")
	public String getExpeRemarks() {
		return this.expeRemarks;
	}

	public void setExpeRemarks(String expeRemarks) {
		this.expeRemarks = expeRemarks;
	}

	@Column(name = "EXPE_FORWARD_FLAG")
	public Short getExpeForwardFlag() {
		return this.expeForwardFlag;
	}

	public void setExpeForwardFlag(Short expeForwardFlag) {
		this.expeForwardFlag = expeForwardFlag;
	}

	@Column(name = "CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Column(name = "CONS_MBL_NO")
	public String getConsMblNo() {
		return this.consMblNo;
	}

	public void setConsMblNo(String consMblNo) {
		this.consMblNo = consMblNo;
	}

	@Column(name = "CONS_HBL_NO")
	public String getConsHblNo() {
		return this.consHblNo;
	}

	public void setConsHblNo(String consHblNo) {
		this.consHblNo = consHblNo;
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

	@Transient
	public String getConsPodEn() {
		return consPodEn;
	}
	
	public void setConsPodEn(String consPodEn) {
		this.consPodEn = consPodEn;
	}
	
	@Transient
	public String getConsPolEn() {
		return consPolEn;
	}
	
	public void setConsPolEn(String consPolEn) {
		this.consPolEn = consPolEn;
	}
	
	@Transient
	public String getConsCargoNameCn() {
		return consCargoNameCn;
	}
	
	public void setConsCargoNameCn(String consCargoNameCn) {
		this.consCargoNameCn = consCargoNameCn;
	}
	
	@Transient
	public String getConsPackName() {
		return consPackName;
	}
	
	public void setConsPackName(String consPackName) {
		this.consPackName = consPackName;
	}
	
	@Transient
	public Integer getConsTotalPackages() {
		return consTotalPackages;
	}
	
	public void setConsTotalPackages(Integer consTotalPackages) {
		this.consTotalPackages = consTotalPackages;
	}
	
	@Transient
	public Double getConsTotalGrossWeight() {
		return consTotalGrossWeight;
	}
	
	public void setConsTotalGrossWeight(Double consTotalGrossWeight) {
		this.consTotalGrossWeight = consTotalGrossWeight;
	}
	
	@Transient
	public Double getConsTotalNetWeight() {
		return consTotalNetWeight;
	}
	
	public void setConsTotalNetWeight(Double consTotalNetWeight) {
		this.consTotalNetWeight = consTotalNetWeight;
	}
	
	@Transient
	public Double getConsTotalMeasurement() {
		return consTotalMeasurement;
	}
	
	public void setConsTotalMeasurement(Double consTotalMeasurement) {
		this.consTotalMeasurement = consTotalMeasurement;
	}
	
	@Transient
	public String getConsContainersInfo() {
		return consContainersInfo;
	}
	
	public void setConsContainersInfo(String consContainersInfo) {
		this.consContainersInfo = consContainersInfo;
	}
	
	@Transient
	public Date getConsSailDate() {
		return consSailDate;
	}
	
	public void setConsSailDate(Date consSailDate) {
		this.consSailDate = consSailDate;
	}
}
