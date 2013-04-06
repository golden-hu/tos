package com.hitisoft.fos.ffse.entity;

import java.io.Serializable;
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
@Table(name = "S_BILL")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SBill extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -3680145944802313891L;
	//对帐单号
	private String billNo;
	//客户ID
	private Integer custId;
	//客户名称
	private String custName;
	//客户名称
	private String custSname;
	//对账单类型R:应收 P:应付
	private String billType;
	//对账日期
	private Date billDate;
	//币种代码 
	private String currCode;
	//合计金额
	private Double billAmount;
	//人民币合计
	private Double billAmountCny;
	//美元合计
	private Double billAmountUsd;
	//船名
	private String billVessel;
	//航次
	private String billVoyage;
	//提单号
	private String billBlNo;
	//开船日期
	private Date billSailDate;
	//装货港
	private String billPol;
	//卸货港
	private String billPod;
	//送货地
	private String billDeliveryPlace;
	//备注
	private String billRemarks;
	//制单人
	private String billIssuer;
	//制单日期
	private Date billIssueDate;
	//委托编号
	private String billConsNo;
	//货物描述
	private String billCargoName;
	//件、重、尺
	private String billCargoQwm;
	//箱形箱量
	private String billContainersInfo;
	//对账单状态0：未对账 1：已对账 2：已作废
	private Byte billStatus;

	public SBill() { }

	@Column(name = "BILL_NO")
	public String getBillNo() {
		return this.billNo;
	}

	public void setBillNo(String billNo) {
		this.billNo = billNo;
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

	@Column(name = "BILL_TYPE")
	public String getBillType() {
		return this.billType;
	}

	public void setBillType(String billType) {
		this.billType = billType;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "BILL_DATE")
	public Date getBillDate() {
		return this.billDate;
	}

	public void setBillDate(Date billDate) {
		this.billDate = billDate;
	}

	@Column(name = "CURR_CODE")
	public String getCurrCode() {
		return this.currCode;
	}

	public void setCurrCode(String currCode) {
		this.currCode = currCode;
	}

	@Column(name = "BILL_AMOUNT")
	public Double getBillAmount() {
		return this.billAmount;
	}

	public void setBillAmount(Double billAmount) {
		this.billAmount = billAmount;
	}

	@Column(name = "BILL_AMOUNT_CNY")
	public Double getBillAmountCny() {
		return this.billAmountCny;
	}

	public void setBillAmountCny(Double billAmountCny) {
		this.billAmountCny = billAmountCny;
	}

	@Column(name = "BILL_AMOUNT_USD")
	public Double getBillAmountUsd() {
		return this.billAmountUsd;
	}

	public void setBillAmountUsd(Double billAmountUsd) {
		this.billAmountUsd = billAmountUsd;
	}

	@Column(name = "BILL_VESSEL")
	public String getBillVessel() {
		return this.billVessel;
	}

	public void setBillVessel(String billVessel) {
		this.billVessel = billVessel;
	}

	@Column(name = "BILL_VOYAGE")
	public String getBillVoyage() {
		return this.billVoyage;
	}

	public void setBillVoyage(String billVoyage) {
		this.billVoyage = billVoyage;
	}

	@Column(name = "BILL_BL_NO")
	public String getBillBlNo() {
		return this.billBlNo;
	}

	public void setBillBlNo(String billBlNo) {
		this.billBlNo = billBlNo;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "BILL_SAIL_DATE")
	public Date getBillSailDate() {
		return this.billSailDate;
	}

	public void setBillSailDate(Date billSailDate) {
		this.billSailDate = billSailDate;
	}

	@Column(name = "BILL_POL")
	public String getBillPol() {
		return this.billPol;
	}

	public void setBillPol(String billPol) {
		this.billPol = billPol;
	}

	@Column(name = "BILL_POD")
	public String getBillPod() {
		return this.billPod;
	}

	public void setBillPod(String billPod) {
		this.billPod = billPod;
	}

	@Column(name = "BILL_DELIVERY_PLACE")
	public String getBillDeliveryPlace() {
		return this.billDeliveryPlace;
	}

	public void setBillDeliveryPlace(String billDeliveryPlace) {
		this.billDeliveryPlace = billDeliveryPlace;
	}

	@Column(name = "BILL_REMARKS")
	public String getBillRemarks() {
		return this.billRemarks;
	}

	public void setBillRemarks(String billRemarks) {
		this.billRemarks = billRemarks;
	}

	@Column(name = "BILL_ISSUER")
	public String getBillIssuer() {
		return this.billIssuer;
	}

	public void setBillIssuer(String billIssuer) {
		this.billIssuer = billIssuer;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "BILL_ISSUE_DATE")
	public Date getBillIssueDate() {
		return this.billIssueDate;
	}

	public void setBillIssueDate(Date billIssueDate) {
		this.billIssueDate = billIssueDate;
	}

	@Column(name = "BILL_CONS_NO")
	public String getBillConsNo() {
		return this.billConsNo;
	}

	public void setBillConsNo(String billConsNo) {
		this.billConsNo = billConsNo;
	}

	@Column(name = "BILL_CARGO_NAME")
	public String getBillCargoName() {
		return this.billCargoName;
	}

	public void setBillCargoName(String billCargoName) {
		this.billCargoName = billCargoName;
	}

	@Column(name = "BILL_CARGO_QWM")
	public String getBillCargoQwm() {
		return this.billCargoQwm;
	}

	public void setBillCargoQwm(String billCargoQwm) {
		this.billCargoQwm = billCargoQwm;
	}

	@Column(name = "BILL_CONTAINERS_INFO")
	public String getBillContainersInfo() {
		return this.billContainersInfo;
	}

	public void setBillContainersInfo(String billContainersInfo) {
		this.billContainersInfo = billContainersInfo;
	}

	@Column(name = "BILL_STATUS")
	public Byte getBillStatus() {
		return this.billStatus;
	}

	public void setBillStatus(Byte billStatus) {
		this.billStatus = billStatus;
	}

}
