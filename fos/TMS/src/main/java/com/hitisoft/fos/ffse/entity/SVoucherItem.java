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
@Table(name = "S_VOUCHER_ITEM")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
/**
 * 核销明细
 */
public class SVoucherItem extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -5998082262563128266L;
	
	//业务编号
	private Integer consId;
	//主提单号
	private String consMblNo;
	//分提单号
	private String consHblNo;
	//业务号
	private String consNo;
	//业务号
	private String consNoHandler;
	//开航日期
	private Date consSailDate;
	//船名
	private String consVessel;
	//航次
	private String consVoyage;
	//客户编号
	private Integer custId;
	//客户名称
	private String custName;
	//客户简称
	private String custSname;
	//费用名称
	private String charName;
	//佣金
	private BigDecimal expeCommission;
	//佣金率
	private BigDecimal expeCommissionRate;
	//费用原币种
	private String expeCurrCode;
	//费用初始汇率
	private BigDecimal expeExRate;
	//SEXPENSE费用编号
	private Integer expeId;
	//数量
	private BigDecimal expeNum;
	//费用原币金额
	private BigDecimal expeTotalAmount;
	//费用类别R:收 P:付
	private String expeType;
	//单价
	private BigDecimal expeUnitPrice;
	//币种
	private String initCurrCode;
	//开票汇率
	private BigDecimal initExRate;
	//SINVOICE_ITEM编号
	private Integer initId;
	
	//折算费用原币种的开票金额
	private BigDecimal initInvoiceAmountOri;
	//折算开票币种的开票金额
	private BigDecimal initInvoiceAmount;
	
	//折算成费用原币的已核销金额
	private BigDecimal initInvoiceAmountOriW;
	//折算成开票币种的已核销金额
	private BigDecimal initInvoiceAmountW;
	
	//SINVOICE编号
	private Integer invoId;
	//系统账单号
	private String invoNo;
	//税务发票号
	private String invoTaxNo;
	//开票日期
	private Date invoDate;
	//汇率
	private BigDecimal invoExRate;
	//计费单位
	private String unitName;
	
	//折算成费用原币种的本次核销金额
	private BigDecimal voitAmountOriW;
	//折算成开票币种的本次核销金额
	private BigDecimal voitAmountW;
	//折算成收付款凭证币种的本次核销金额
	private BigDecimal voitAmountVoucW;
	//作废标志0：未作废  1：已作废
	private Byte voitCancelFlag;
	//收付款凭证币种
	private String voitCurrCode;
	
	private BigDecimal voitExRate;
	//备注
	private String voitRemarks;
	//凭证号/核销号
	private String voitWriteOffNo;
	//销日期
	private Date voucDate;
	private BigDecimal voucExRate;
	//收付账款编号
	private Integer voucId;
	//系统生成的收付款账款号
	private String voucNo;

	//业务类型
	private String consBizType;
	
	public SVoucherItem() {	}

	@Column(name = "CHAR_NAME")
	public String getCharName() {
		return this.charName;
	}

	public void setCharName(String charName) {
		this.charName = charName;
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

	@Column(name = "CONS_NO_HANDLER")
	public String getConsNoHandler() {
    	return consNoHandler;
    }

	public void setConsNoHandler(String consNoHandler) {
    	this.consNoHandler = consNoHandler;
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

	@Column(name = "EXPE_NUM")
	public BigDecimal getExpeNum() {
		return this.expeNum;
	}

	public void setExpeNum(BigDecimal expeNum) {
		this.expeNum = expeNum;
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

	@Column(name = "INIT_ID")
	public Integer getInitId() {
		return this.initId;
	}

	public void setInitId(Integer initId) {
		this.initId = initId;
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

	@Column(name = "VOIT_AMOUNT_ORI_W")
	public BigDecimal getVoitAmountOriW() {
		return this.voitAmountOriW;
	}

	public void setVoitAmountOriW(BigDecimal voitAmountOriW) {
		this.voitAmountOriW = voitAmountOriW;
	}

	@Column(name = "VOIT_AMOUNT_VOUC_W")
	public BigDecimal getVoitAmountVoucW() {
		return this.voitAmountVoucW;
	}

	public void setVoitAmountVoucW(BigDecimal voitAmountVoucW) {
		this.voitAmountVoucW = voitAmountVoucW;
	}

	@Column(name = "VOIT_AMOUNT_W")
	public BigDecimal getVoitAmountW() {
		return this.voitAmountW;
	}

	public void setVoitAmountW(BigDecimal voitAmountW) {
		this.voitAmountW = voitAmountW;
	}

	@Column(name = "VOIT_CANCEL_FLAG")
	public Byte getVoitCancelFlag() {
		return this.voitCancelFlag;
	}

	public void setVoitCancelFlag(Byte voitCancelFlag) {
		this.voitCancelFlag = voitCancelFlag;
	}

	@Column(name = "VOIT_CURR_CODE")
	public String getVoitCurrCode() {
		return this.voitCurrCode;
	}

	public void setVoitCurrCode(String voitCurrCode) {
		this.voitCurrCode = voitCurrCode;
	}

	@Column(name = "VOIT_EX_RATE")
	public BigDecimal getVoitExRate() {
		return this.voitExRate;
	}

	public void setVoitExRate(BigDecimal voitExRate) {
		this.voitExRate = voitExRate;
	}

	@Column(name = "VOIT_REMARKS")
	public String getVoitRemarks() {
		return this.voitRemarks;
	}

	public void setVoitRemarks(String voitRemarks) {
		this.voitRemarks = voitRemarks;
	}

	@Column(name = "VOIT_WRITE_OFF_NO")
	public String getVoitWriteOffNo() {
		return this.voitWriteOffNo;
	}

	public void setVoitWriteOffNo(String voitWriteOffNo) {
		this.voitWriteOffNo = voitWriteOffNo;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "VOUC_DATE")
	public Date getVoucDate() {
		return this.voucDate;
	}

	public void setVoucDate(Date voucDate) {
		this.voucDate = voucDate;
	}

	@Column(name = "VOUC_EX_RATE")
	public BigDecimal getVoucExRate() {
		return this.voucExRate;
	}

	public void setVoucExRate(BigDecimal voucExRate) {
		this.voucExRate = voucExRate;
	}

	@Column(name = "VOUC_ID")
	public Integer getVoucId() {
		return this.voucId;
	}

	public void setVoucId(Integer voucId) {
		this.voucId = voucId;
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
