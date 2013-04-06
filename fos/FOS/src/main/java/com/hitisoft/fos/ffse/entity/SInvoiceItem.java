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
@Table(name = "S_INVOICE_ITEM")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SInvoiceItem extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -2802109911810943798L;
	private String charName;
	private String charNameEn;
	private String consHblNo;
	private Integer consId;
	private String consMblNo;
	private String consNo;
	private Date consSailDate;
	private String consVessel;
	private String consVoyage;
	private Integer custId;
	private String custName;
	private String custSname;
	private BigDecimal expeCommission;
	private BigDecimal expeCommissionRate;
	/*原币种*/
	private String expeCurrCode;
	private BigDecimal expeExRate;
	private Integer expeId;
	/*费用上次已开票金额，（如果是跨币种开票，折算成费用原币种金额）*/
	private BigDecimal expeInvoiceAmount;
	/*数量*/
	private BigDecimal expeNum;
	private String expeRemarks;
	/*费用金额*/
	private BigDecimal expeTotalAmount;
	/*R:应收 P:应付*/
	private String expeType;
	/*单价*/
	private BigDecimal expeUnitPrice;
	private Byte initCancelFlag;
	/*开票币种，对于SINVOICE的CURR_CODE*/
	private String initCurrCode;
	/*SINVOICE_ITEM的开票汇率
	在新增SINVOICE_ITEM,系统判断如果SINVOICE_ITEM对应的费用行币种如果和发票的币种相同，就取发票汇率，如果不同，就取费用的币种对应的CNY的系统当前汇率。在发票编辑界面用户可以手工调整该汇率。*/
	private BigDecimal initExRate;
	/*折算成开票币种的本次开票金额
	INIT_INVOICE_AMOUNT_ORI乘以INIT_EX_RATE再除以SINVOICE的汇率（即INVO_EX_RATE).*/
	private BigDecimal initInvoiceAmount;
	/*折算成费用原币种的本次开票金额
	在新增SINVOICE_ITEM,系统自动取SINVOICE_ITEM对应的费用行上EXPE_TOTAL_AMOUNT和EXPE_INVOICE_AMOUNT的差值。*/
	private BigDecimal initInvoiceAmountOri;
	/*折算成费用原币种的已核销金额
	每次核销时后台自动累积所有和本记录INIT_ID相同的S_VOUCHER_ITEM上的VOIT_AMOUNT_ORI_W到本字段*/
	private BigDecimal initInvoiceAmountOriW;
	/*折算成开票币种的已核销金额
	每次核销时后台自动累积所有和本记录INIT_ID相同的S_VOUCHER_ITEM上的VOIT_AMOUNT_W到本字段*/
	private BigDecimal initInvoiceAmountW;
	private Integer initWriteOffBy;
	private Date initWriteOffDate;
	/*收付款系统凭证号*/
	private String initWriteOffNo;
	/*核销状态 0：未核销 1：部分核销 2：已核销*/
	private Byte initWriteOffStatus;
	private Date invoDate;
	private BigDecimal invoExRate;
	private Integer invoId;
	private String invoNo;
	private String invoTaxNo;
	private String unitName;
	/*收付款系统凭证号*/
	private String voucNo;

	private String consBizType;
	
	public SInvoiceItem() {
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

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_SAIL_DATE")
	public Date getConsSailDate() {
		return this.consSailDate;
	}

	public void setConsSailDate(Date consSailDate) {
		this.consSailDate = consSailDate;
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

	@Column(name = "EXPE_CURR_CODE")
	public String getExpeCurrCode() {
		return this.expeCurrCode;
	}

	public void setExpeCurrCode(String expeCurrCode) {
		this.expeCurrCode = expeCurrCode;
	}

	@Column(name = "EXPE_EX_RATE")
	public BigDecimal getExpeExRate() {
		return this.expeExRate;
	}

	public void setExpeExRate(BigDecimal expeExRate) {
		this.expeExRate = expeExRate;
	}

	@Column(name = "EXPE_ID")
	public Integer getExpeId() {
		return this.expeId;
	}

	public void setExpeId(Integer expeId) {
		this.expeId = expeId;
	}

	@Column(name = "EXPE_INVOICE_AMOUNT")
	public BigDecimal getExpeInvoiceAmount() {
		return this.expeInvoiceAmount;
	}

	public void setExpeInvoiceAmount(BigDecimal expeInvoiceAmount) {
		this.expeInvoiceAmount = expeInvoiceAmount;
	}

	@Column(name = "EXPE_NUM")
	public BigDecimal getExpeNum() {
		return this.expeNum;
	}

	public void setExpeNum(BigDecimal expeNum) {
		this.expeNum = expeNum;
	}

	@Column(name = "EXPE_REMARKS")
	public String getExpeRemarks() {
		return this.expeRemarks;
	}

	public void setExpeRemarks(String expeRemarks) {
		this.expeRemarks = expeRemarks;
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

	@Column(name = "INIT_CANCEL_FLAG")
	public Byte getInitCancelFlag() {
		return this.initCancelFlag;
	}

	public void setInitCancelFlag(Byte initCancelFlag) {
		this.initCancelFlag = initCancelFlag;
	}

	@Column(name = "INIT_CURR_CODE")
	public String getInitCurrCode() {
		return this.initCurrCode;
	}

	public void setInitCurrCode(String initCurrCode) {
		this.initCurrCode = initCurrCode;
	}

	@Column(name = "INIT_EX_RATE")
	public BigDecimal getInitExRate() {
		return this.initExRate;
	}

	public void setInitExRate(BigDecimal initExRate) {
		this.initExRate = initExRate;
	}

	@Column(name = "INIT_INVOICE_AMOUNT")
	public BigDecimal getInitInvoiceAmount() {
		return this.initInvoiceAmount;
	}

	public void setInitInvoiceAmount(BigDecimal initInvoiceAmount) {
		this.initInvoiceAmount = initInvoiceAmount;
	}

	@Column(name = "INIT_INVOICE_AMOUNT_ORI")
	public BigDecimal getInitInvoiceAmountOri() {
		return this.initInvoiceAmountOri;
	}

	public void setInitInvoiceAmountOri(BigDecimal initInvoiceAmountOri) {
		this.initInvoiceAmountOri = initInvoiceAmountOri;
	}

	@Column(name = "INIT_INVOICE_AMOUNT_ORI_W")
	public BigDecimal getInitInvoiceAmountOriW() {
		return this.initInvoiceAmountOriW;
	}

	public void setInitInvoiceAmountOriW(BigDecimal initInvoiceAmountOriW) {
		this.initInvoiceAmountOriW = initInvoiceAmountOriW;
	}

	@Column(name = "INIT_INVOICE_AMOUNT_W")
	public BigDecimal getInitInvoiceAmountW() {
		return this.initInvoiceAmountW;
	}

	public void setInitInvoiceAmountW(BigDecimal initInvoiceAmountW) {
		this.initInvoiceAmountW = initInvoiceAmountW;
	}

	@Column(name = "INIT_WRITE_OFF_BY")
	public Integer getInitWriteOffBy() {
		return this.initWriteOffBy;
	}

	public void setInitWriteOffBy(Integer initWriteOffBy) {
		this.initWriteOffBy = initWriteOffBy;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INIT_WRITE_OFF_DATE")
	public Date getInitWriteOffDate() {
		return this.initWriteOffDate;
	}

	public void setInitWriteOffDate(Date initWriteOffDate) {
		this.initWriteOffDate = initWriteOffDate;
	}

	@Column(name = "INIT_WRITE_OFF_NO")
	public String getInitWriteOffNo() {
		return this.initWriteOffNo;
	}

	public void setInitWriteOffNo(String initWriteOffNo) {
		this.initWriteOffNo = initWriteOffNo;
	}

	@Column(name = "INIT_WRITE_OFF_STATUS")
	public Byte getInitWriteOffStatus() {
		return this.initWriteOffStatus;
	}

	public void setInitWriteOffStatus(Byte initWriteOffStatus) {
		this.initWriteOffStatus = initWriteOffStatus;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INVO_DATE")
	public Date getInvoDate() {
		return this.invoDate;
	}

	public void setInvoDate(Date invoDate) {
		this.invoDate = invoDate;
	}

	@Column(name = "INVO_EX_RATE")
	public BigDecimal getInvoExRate() {
		return this.invoExRate;
	}

	public void setInvoExRate(BigDecimal invoExRate) {
		this.invoExRate = invoExRate;
	}

	@Column(name = "INVO_ID")
	public Integer getInvoId() {
		return this.invoId;
	}

	public void setInvoId(Integer invoId) {
		this.invoId = invoId;
	}

	@Column(name = "INVO_NO")
	public String getInvoNo() {
		return this.invoNo;
	}

	public void setInvoNo(String invoNo) {
		this.invoNo = invoNo;
	}

	@Column(name = "INVO_TAX_NO")
	public String getInvoTaxNo() {
		return this.invoTaxNo;
	}

	public void setInvoTaxNo(String invoTaxNo) {
		this.invoTaxNo = invoTaxNo;
	}

	@Column(name = "UNIT_NAME")
	public String getUnitName() {
		return this.unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	@Column(name = "VOUC_NO")
	public String getVoucNo() {
		return this.voucNo;
	}

	public void setVoucNo(String voucNo) {
		this.voucNo = voucNo;
	}

	@Column(name="CONS_BIZ_TYPE")
	public String getConsBizType() {
		return this.consBizType;
	}

	public void setConsBizType(String consBizType) {
		this.consBizType = consBizType;
	}
	
}
