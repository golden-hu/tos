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
@Table(name = "S_VOUCHER")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
//核销记录
public class SVoucher extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -3739824174659926877L;
	//币种
	private String currCode;
	//客户银行帐号
	private String custAccount;
	//客户银行
	private String custBank;
	//结算对象ID
	private Integer custId;
	//结算对象
	private String custName;
	//结算对象简称
	private String custSname;
	//银行帐号
	private String voucAccount;
	//收/付款金额
	private BigDecimal voucAmount;
	//银行名称
	private String voucBank;
	//银行水单日期
	private Date voucBankReciptDate;
	//银行水单号
	private String voucBankReciptNo;
	//结转金额（其它应收款、预收款）
	private BigDecimal voucCarryAmount;
	//结转类型 P:结转成预收款 R:结转成其他应收款
	private String voucCarryType;
	//复核日期
	private Date voucCheckDate;
	//支票号
	private String voucCheckNo;
	//复核人
	private Integer voucChecker;
	//业务号
	private String voucConsNo;
	//收付款日期
	private Date voucDate;
	//汇率
	private BigDecimal voucExRate;
	//处理金额（银行手续费、汇兑损益）
	private BigDecimal voucFixAmount;
	//总帐日期
	private Date voucGlDate;
	//分提单号
	private String voucHblNo;
	//核销账单日期
	private Date voucInvoiceDate;
	//账单号，如果对应多个，由后台用，分割拼成一个字符串
	private String voucInvoiceNo;
	//主提单号
	private String voucMblNo;
	//核销生成号
	private String voucNo;
	//支付方式
	private Byte voucPaymentType;
	//备注
	private String voucRemarks;
	//开航日期
	private Date voucSailDate;
	//状态 	0：未审核 1：已审核 2：已作废
	private Byte voucStatus;
	//税务发票号，如果对应多个，由后台用，分割拼成一个字符串
	private String voucTaxInvoiceNo;
	//收、付款凭证 R:收款凭证 P:付款凭证
	private String voucType;
	
	private Byte voucUploadFlag;
	//船名
	private String voucVessel;
	//航次
	private String voucVoyage;
	//已核销金额
	private BigDecimal voucWriteOffAmount;
	//凭证号/核销号
	private String voucWriteOffNo;
	//0：未核销 1：部分核销 2：已核销
	private Byte voucWriteOffStatus;
	//业务类型
	private String consBizType;
	
	public SVoucher() { }

	@Column(name = "CURR_CODE")
	public String getCurrCode() {
		return this.currCode;
	}

	public void setCurrCode(String currCode) {
		this.currCode = currCode;
	}

	@Column(name = "CUST_ACCOUNT")
	public String getCustAccount() {
		return this.custAccount;
	}

	public void setCustAccount(String custAccount) {
		this.custAccount = custAccount;
	}

	@Column(name = "CUST_BANK")
	public String getCustBank() {
		return this.custBank;
	}

	public void setCustBank(String custBank) {
		this.custBank = custBank;
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

	@Column(name = "VOUC_ACCOUNT")
	public String getVoucAccount() {
		return this.voucAccount;
	}

	public void setVoucAccount(String voucAccount) {
		this.voucAccount = voucAccount;
	}

	@Column(name = "VOUC_AMOUNT")
	public BigDecimal getVoucAmount() {
		return this.voucAmount;
	}

	public void setVoucAmount(BigDecimal voucAmount) {
		this.voucAmount = voucAmount;
	}

	@Column(name = "VOUC_BANK")
	public String getVoucBank() {
		return this.voucBank;
	}

	public void setVoucBank(String voucBank) {
		this.voucBank = voucBank;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "VOUC_BANK_RECIPT_DATE")
	public Date getVoucBankReciptDate() {
		return this.voucBankReciptDate;
	}

	public void setVoucBankReciptDate(Date voucBankReciptDate) {
		this.voucBankReciptDate = voucBankReciptDate;
	}

	@Column(name = "VOUC_BANK_RECIPT_NO")
	public String getVoucBankReciptNo() {
		return this.voucBankReciptNo;
	}

	public void setVoucBankReciptNo(String voucBankReciptNo) {
		this.voucBankReciptNo = voucBankReciptNo;
	}

	@Column(name = "VOUC_CARRY_AMOUNT")
	public BigDecimal getVoucCarryAmount() {
		return this.voucCarryAmount;
	}

	public void setVoucCarryAmount(BigDecimal voucCarryAmount) {
		this.voucCarryAmount = voucCarryAmount;
	}

	@Column(name = "VOUC_CARRY_TYPE")
	public String getVoucCarryType() {
		return this.voucCarryType;
	}

	public void setVoucCarryType(String voucCarryType) {
		this.voucCarryType = voucCarryType;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "VOUC_CHECK_DATE")
	public Date getVoucCheckDate() {
		return this.voucCheckDate;
	}

	public void setVoucCheckDate(Date voucCheckDate) {
		this.voucCheckDate = voucCheckDate;
	}

	@Column(name = "VOUC_CHECK_NO")
	public String getVoucCheckNo() {
		return this.voucCheckNo;
	}

	public void setVoucCheckNo(String voucCheckNo) {
		this.voucCheckNo = voucCheckNo;
	}

	@Column(name = "VOUC_CHECKER")
	public Integer getVoucChecker() {
		return this.voucChecker;
	}

	public void setVoucChecker(Integer voucChecker) {
		this.voucChecker = voucChecker;
	}

	@Column(name = "VOUC_CONS_NO")
	public String getVoucConsNo() {
		return this.voucConsNo;
	}

	public void setVoucConsNo(String voucConsNo) {
		this.voucConsNo = voucConsNo;
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

	@Column(name = "VOUC_FIX_AMOUNT")
	public BigDecimal getVoucFixAmount() {
		return this.voucFixAmount;
	}

	public void setVoucFixAmount(BigDecimal voucFixAmount) {
		this.voucFixAmount = voucFixAmount;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "VOUC_GL_DATE")
	public Date getVoucGlDate() {
		return this.voucGlDate;
	}

	public void setVoucGlDate(Date voucGlDate) {
		this.voucGlDate = voucGlDate;
	}

	@Column(name = "VOUC_HBL_NO")
	public String getVoucHblNo() {
		return this.voucHblNo;
	}

	public void setVoucHblNo(String voucHblNo) {
		this.voucHblNo = voucHblNo;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "VOUC_INVOICE_DATE")
	public Date getVoucInvoiceDate() {
		return this.voucInvoiceDate;
	}

	public void setVoucInvoiceDate(Date voucInvoiceDate) {
		this.voucInvoiceDate = voucInvoiceDate;
	}

	@Column(name = "VOUC_INVOICE_NO")
	public String getVoucInvoiceNo() {
		return this.voucInvoiceNo;
	}

	public void setVoucInvoiceNo(String voucInvoiceNo) {
		this.voucInvoiceNo = voucInvoiceNo;
	}

	@Column(name = "VOUC_MBL_NO")
	public String getVoucMblNo() {
		return this.voucMblNo;
	}

	public void setVoucMblNo(String voucMblNo) {
		this.voucMblNo = voucMblNo;
	}

	@Column(name = "VOUC_NO")
	public String getVoucNo() {
		return this.voucNo;
	}

	public void setVoucNo(String voucNo) {
		this.voucNo = voucNo;
	}

	@Column(name = "VOUC_PAYMENT_TYPE")
	public Byte getVoucPaymentType() {
		return this.voucPaymentType;
	}

	public void setVoucPaymentType(Byte voucPaymentType) {
		this.voucPaymentType = voucPaymentType;
	}

	@Column(name = "VOUC_REMARKS")
	public String getVoucRemarks() {
		return this.voucRemarks;
	}

	public void setVoucRemarks(String voucRemarks) {
		this.voucRemarks = voucRemarks;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "VOUC_SAIL_DATE")
	public Date getVoucSailDate() {
		return this.voucSailDate;
	}

	public void setVoucSailDate(Date voucSailDate) {
		this.voucSailDate = voucSailDate;
	}

	@Column(name = "VOUC_STATUS")
	public Byte getVoucStatus() {
		return this.voucStatus;
	}

	public void setVoucStatus(Byte voucStatus) {
		this.voucStatus = voucStatus;
	}

	@Column(name = "VOUC_TAX_INVOICE_NO")
	public String getVoucTaxInvoiceNo() {
		return this.voucTaxInvoiceNo;
	}

	public void setVoucTaxInvoiceNo(String voucTaxInvoiceNo) {
		this.voucTaxInvoiceNo = voucTaxInvoiceNo;
	}

	@Column(name = "VOUC_TYPE")
	public String getVoucType() {
		return this.voucType;
	}

	public void setVoucType(String voucType) {
		this.voucType = voucType;
	}

	@Column(name = "VOUC_UPLOAD_FLAG")
	public Byte getVoucUploadFlag() {
		return this.voucUploadFlag;
	}

	public void setVoucUploadFlag(Byte voucUploadFlag) {
		this.voucUploadFlag = voucUploadFlag;
	}

	@Column(name = "VOUC_VESSEL")
	public String getVoucVessel() {
		return this.voucVessel;
	}

	public void setVoucVessel(String voucVessel) {
		this.voucVessel = voucVessel;
	}

	@Column(name = "VOUC_VOYAGE")
	public String getVoucVoyage() {
		return this.voucVoyage;
	}

	public void setVoucVoyage(String voucVoyage) {
		this.voucVoyage = voucVoyage;
	}

	@Column(name = "VOUC_WRITE_OFF_AMOUNT")
	public BigDecimal getVoucWriteOffAmount() {
		return this.voucWriteOffAmount;
	}

	public void setVoucWriteOffAmount(BigDecimal voucWriteOffAmount) {
		this.voucWriteOffAmount = voucWriteOffAmount;
	}

	@Column(name = "VOUC_WRITE_OFF_NO")
	public String getVoucWriteOffNo() {
		return this.voucWriteOffNo;
	}

	public void setVoucWriteOffNo(String voucWriteOffNo) {
		this.voucWriteOffNo = voucWriteOffNo;
	}

	@Column(name = "VOUC_WRITE_OFF_STATUS")
	public Byte getVoucWriteOffStatus() {
		return this.voucWriteOffStatus;
	}

	public void setVoucWriteOffStatus(Byte voucWriteOffStatus) {
		this.voucWriteOffStatus = voucWriteOffStatus;
	}

	@Column(name="CONS_BIZ_TYPE")
	public String getConsBizType() {
		return this.consBizType;
	}

	public void setConsBizType(String consBizType) {
		this.consBizType = consBizType;
	}
}
