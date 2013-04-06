package com.hitisoft.fos.ffse.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "S_INVOICE_ENTRY")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
/**
 * 发票明细
 */
public class SInvoiceEntry extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -7893855542427033645L;
	private String charName;
	private String charNameEn;
	private String consHblNo;
	private Integer consId;
	private String consMblNo;
	private String consNo;
	//手工单号
	private String consNoHandler;
	private String consVessel;
	private String consVoyage;
	private String currCode;
	private BigDecimal expeCommission;
	private BigDecimal expeCommissionRate;
	private Integer expeId;
	private BigDecimal inenExRate;
	private BigDecimal inenInvoiceAmount;
	private BigDecimal inenNum;
	private String inenPaymentType;
	private BigDecimal inenTotalAmount;
	private BigDecimal inenUnitPrice;
	private Integer invoId;
	private String unitName;

	private String consBizType;
	
	public SInvoiceEntry() {
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

	@Column(name = "EXPE_ID")
	public Integer getExpeId() {
		return this.expeId;
	}

	public void setExpeId(Integer expeId) {
		this.expeId = expeId;
	}

	@Column(name = "INEN_EX_RATE")
	public BigDecimal getInenExRate() {
		return this.inenExRate;
	}

	public void setInenExRate(BigDecimal inenExRate) {
		this.inenExRate = inenExRate;
	}

	@Column(name = "INEN_INVOICE_AMOUNT")
	public BigDecimal getInenInvoiceAmount() {
		return this.inenInvoiceAmount;
	}

	public void setInenInvoiceAmount(BigDecimal inenInvoiceAmount) {
		this.inenInvoiceAmount = inenInvoiceAmount;
	}

	@Column(name = "INEN_NUM")
	public BigDecimal getInenNum() {
		return this.inenNum;
	}

	public void setInenNum(BigDecimal inenNum) {
		this.inenNum = inenNum;
	}

	@Column(name = "INEN_PAYMENT_TYPE")
	public String getInenPaymentType() {
		return this.inenPaymentType;
	}

	public void setInenPaymentType(String inenPaymentType) {
		this.inenPaymentType = inenPaymentType;
	}

	@Column(name = "INEN_TOTAL_AMOUNT")
	public BigDecimal getInenTotalAmount() {
		return this.inenTotalAmount;
	}

	public void setInenTotalAmount(BigDecimal inenTotalAmount) {
		this.inenTotalAmount = inenTotalAmount;
	}

	@Column(name = "INEN_UNIT_PRICE")
	public BigDecimal getInenUnitPrice() {
		return this.inenUnitPrice;
	}

	public void setInenUnitPrice(BigDecimal inenUnitPrice) {
		this.inenUnitPrice = inenUnitPrice;
	}

	@Column(name = "INVO_ID")
	public Integer getInvoId() {
		return this.invoId;
	}

	public void setInvoId(Integer invoId) {
		this.invoId = invoId;
	}

	@Column(name = "UNIT_NAME")
	public String getUnitName() {
		return this.unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	@Column(name="CONS_BIZ_TYPE")
	public String getConsBizType() {
		return this.consBizType;
	}

	public void setConsBizType(String consBizType) {
		this.consBizType = consBizType;
	}
	
	@Column(name = "CONS_NO_HANDLER")
	public String getConsNoHandler() {
    	return consNoHandler;
    }

	public void setConsNoHandler(String consNoHandler) {
    	this.consNoHandler = consNoHandler;
    }
}
