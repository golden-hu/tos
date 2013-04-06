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
@Table(name = "S_PR_ITEM")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
//付款申请项
public class SPrItem extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -1002758932640318560L;
	private String currCode;
	private String custName;
	private String custSname;
	private String inovAccount;
	private BigDecimal invoAmount;
	private BigDecimal invoAmountWriteOff;
	private String invoBank;
	private Date invoCheckDate;
	private String invoChecker;
	private Date invoDate;
	private Date invoDueDate;
	private BigDecimal invoExRate;
	private Integer invoId;
	private Date invoIssueDate;
	private String invoIssuer;
	private String invoNo;
	private String invoTaxNo;
	private BigDecimal prAmount;
	private Integer prId;

	public SPrItem() {
	}

	@Column(name = "CURR_CODE")
	public String getCurrCode() {
		return this.currCode;
	}

	public void setCurrCode(String currCode) {
		this.currCode = currCode;
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

	@Column(name = "INOV_ACCOUNT")
	public String getInovAccount() {
		return this.inovAccount;
	}

	public void setInovAccount(String inovAccount) {
		this.inovAccount = inovAccount;
	}

	@Column(name = "INVO_AMOUNT")
	public BigDecimal getInvoAmount() {
		return this.invoAmount;
	}

	public void setInvoAmount(BigDecimal invoAmount) {
		this.invoAmount = invoAmount;
	}

	@Column(name = "INVO_AMOUNT_WRITE_OFF")
	public BigDecimal getInvoAmountWriteOff() {
		return this.invoAmountWriteOff;
	}

	public void setInvoAmountWriteOff(BigDecimal invoAmountWriteOff) {
		this.invoAmountWriteOff = invoAmountWriteOff;
	}

	@Column(name = "INVO_BANK")
	public String getInvoBank() {
		return this.invoBank;
	}

	public void setInvoBank(String invoBank) {
		this.invoBank = invoBank;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INVO_CHECK_DATE")
	public Date getInvoCheckDate() {
		return this.invoCheckDate;
	}

	public void setInvoCheckDate(Date invoCheckDate) {
		this.invoCheckDate = invoCheckDate;
	}

	@Column(name = "INVO_CHECKER")
	public String getInvoChecker() {
		return this.invoChecker;
	}

	public void setInvoChecker(String invoChecker) {
		this.invoChecker = invoChecker;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INVO_DATE")
	public Date getInvoDate() {
		return this.invoDate;
	}

	public void setInvoDate(Date invoDate) {
		this.invoDate = invoDate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INVO_DUE_DATE")
	public Date getInvoDueDate() {
		return this.invoDueDate;
	}

	public void setInvoDueDate(Date invoDueDate) {
		this.invoDueDate = invoDueDate;
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

	@Temporal(TemporalType.DATE)
	@Column(name = "INVO_ISSUE_DATE")
	public Date getInvoIssueDate() {
		return this.invoIssueDate;
	}

	public void setInvoIssueDate(Date invoIssueDate) {
		this.invoIssueDate = invoIssueDate;
	}

	@Column(name = "INVO_ISSUER")
	public String getInvoIssuer() {
		return this.invoIssuer;
	}

	public void setInvoIssuer(String invoIssuer) {
		this.invoIssuer = invoIssuer;
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

	@Column(name = "PR_AMOUNT")
	public BigDecimal getPrAmount() {
		return this.prAmount;
	}

	public void setPrAmount(BigDecimal prAmount) {
		this.prAmount = prAmount;
	}

	@Column(name = "PR_ID")
	public Integer getPrId() {
		return this.prId;
	}

	public void setPrId(Integer prId) {
		this.prId = prId;
	}

}
