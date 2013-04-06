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
@Table(name = "S_PR")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
//付款申请
public class SPr extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -3680145944802313891L;
	private String currCode;
	private String custAccount;
	private String custBank;
	private Integer custId;
	private String custName;
	private String custSname;
	private String prAccount;
	private BigDecimal prAmount;
	private Integer prApproveBy;
	private Date prApproveDate;
	private String prBank;
	private Date prDate;
	private BigDecimal prExRate;
	private Integer prFinApproveBy;
	private Date prFinApproveDate;
	private String prNo;
	private String prPayType;
	private Integer prPaymentType;
	private Byte prPrintFlag;
	private String prRemarks;
	private Byte prStatus;
	private String prType;

	public SPr() {
	}

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

	@Column(name = "PR_ACCOUNT")
	public String getPrAccount() {
		return this.prAccount;
	}

	public void setPrAccount(String prAccount) {
		this.prAccount = prAccount;
	}

	@Column(name = "PR_AMOUNT")
	public BigDecimal getPrAmount() {
		return this.prAmount;
	}

	public void setPrAmount(BigDecimal prAmount) {
		this.prAmount = prAmount;
	}

	@Column(name = "PR_APPROVE_BY")
	public Integer getPrApproveBy() {
		return this.prApproveBy;
	}

	public void setPrApproveBy(Integer prApproveBy) {
		this.prApproveBy = prApproveBy;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "PR_APPROVE_DATE")
	public Date getPrApproveDate() {
		return this.prApproveDate;
	}

	public void setPrApproveDate(Date prApproveDate) {
		this.prApproveDate = prApproveDate;
	}

	@Column(name = "PR_BANK")
	public String getPrBank() {
		return this.prBank;
	}

	public void setPrBank(String prBank) {
		this.prBank = prBank;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "PR_DATE")
	public Date getPrDate() {
		return this.prDate;
	}

	public void setPrDate(Date prDate) {
		this.prDate = prDate;
	}

	@Column(name = "PR_EX_RATE")
	public BigDecimal getPrExRate() {
		return this.prExRate;
	}

	public void setPrExRate(BigDecimal prExRate) {
		this.prExRate = prExRate;
	}

	@Column(name = "PR_FIN_APPROVE_BY")
	public Integer getPrFinApproveBy() {
		return this.prFinApproveBy;
	}

	public void setPrFinApproveBy(Integer prFinApproveBy) {
		this.prFinApproveBy = prFinApproveBy;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "PR_FIN_APPROVE_DATE")
	public Date getPrFinApproveDate() {
		return this.prFinApproveDate;
	}

	public void setPrFinApproveDate(Date prFinApproveDate) {
		this.prFinApproveDate = prFinApproveDate;
	}

	@Column(name = "PR_NO")
	public String getPrNo() {
		return this.prNo;
	}

	public void setPrNo(String prNo) {
		this.prNo = prNo;
	}

	@Column(name = "PR_PAY_TYPE")
	public String getPrPayType() {
		return this.prPayType;
	}

	public void setPrPayType(String prPayType) {
		this.prPayType = prPayType;
	}

	@Column(name = "PR_PAYMENT_TYPE")
	public Integer getPrPaymentType() {
		return this.prPaymentType;
	}

	public void setPrPaymentType(Integer prPaymentType) {
		this.prPaymentType = prPaymentType;
	}

	@Column(name = "PR_PRINT_FLAG")
	public Byte getPrPrintFlag() {
		return this.prPrintFlag;
	}

	public void setPrPrintFlag(Byte prPrintFlag) {
		this.prPrintFlag = prPrintFlag;
	}

	@Column(name = "PR_REMARKS")
	public String getPrRemarks() {
		return this.prRemarks;
	}

	public void setPrRemarks(String prRemarks) {
		this.prRemarks = prRemarks;
	}

	@Column(name = "PR_STATUS")
	public Byte getPrStatus() {
		return this.prStatus;
	}

	public void setPrStatus(Byte prStatus) {
		this.prStatus = prStatus;
	}

	@Column(name = "PR_TYPE")
	public String getPrType() {
		return this.prType;
	}

	public void setPrType(String prType) {
		this.prType = prType;
	}

}
