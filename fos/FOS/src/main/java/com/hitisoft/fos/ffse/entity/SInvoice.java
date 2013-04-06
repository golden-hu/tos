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
@Table(name = "S_INVOICE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SInvoice extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 7128208068302088486L;
	/*开票币种*/
	private String currCode;
	private Integer custId;
	private String custName;
	private String custSname;
	/*账户*/
	private String invoAccount;
	/*发票金额*/
	private BigDecimal invoAmount;
	private String invoAmountCapital;
	/*发票大写金额*/
	private String invoAmountCapitalEn;
	/*已核销金额*/
	private BigDecimal invoAmountWriteOff;
	/*银行*/
	private String invoBank;
	/*业务类型*/
	private String invoBizClass;
	/*提单号*/
	private String invoBlNo;
	private String invoCargoGrossWeight;
	private String invoCargoMeasurement;
	/*货物描述*/
	private String invoCargoName;
	/*件、重、尺*/
	private String invoCargoPackages;
	/*审核日期*/
	private Date invoCheckDate;
	/*支票号*/
	private String invoCheckNo;
	/*审核人*/
	private String invoChecker;
	/*委托编号*/
	private String invoConsNo;
	/*箱形箱量*/
	private String invoContainersInfo;
	private String invoContractNo;
	/*开票日期*/
	private Date invoDate;
	private Byte invoDebitnoteFlag;
	private String invoDeliveryPlace;
	/*付款期限*/
	private Date invoDueDate;
	/*托收单号*/
	private String invoEntrustNo;
	private BigDecimal invoExRate;
	private Date invoIssueDate;
	/*制单人*/
	private String invoIssuer;
	private String invoNo;
	private String invoOperator;
	/*付款方式 1：现金 2：支票 3：托收 4：转账 5：其他*/
	private Byte invoPaymentType;
	private String invoPod;
	private String invoPol;
	private Byte invoPrFlag;
	/*打印次数*/
	private Integer invoPrintTimes;
	private String invoRemarks;
	/*开船日期*/
	private Date invoSailDate;
	/*签收人*/
	private String invoSigner;
	/*签收日期*/
	private Date invoSingDate;
	/*发票状态 应收： 0：未审核 1：已审核 2：已作废*/
	private Byte invoStatus;
	private String invoTaxNo;
	/*发票抬头*/
	private String invoTitle;
	/*发票类型 R:应收 P:应付*/
	private String invoType;
	/*上传财务标志*/
	private Byte invoUploadFlag;
	private Date invoUploadTime;
	/*船名*/
	private String invoVessel;
	/*航次*/
	private String invoVoyage;
	private Integer invoWriteOffBy;
	private Date invoWriteOffDate;
	/*核销号*/
	private String invoWriteOffNo;
	/*核销状态 0：未核销 1：部分核销 2：已核销*/
	private Integer invoWriteOffStatus;
	private String voucNo;
	//业务类型
	private String consBizType;
	
	public SInvoice() {
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

	@Column(name = "INVO_ACCOUNT")
	public String getInvoAccount() {
		return this.invoAccount;
	}

	public void setInvoAccount(String invoAccount) {
		this.invoAccount = invoAccount;
	}

	@Column(name = "INVO_AMOUNT")
	public BigDecimal getInvoAmount() {
		return this.invoAmount;
	}

	public void setInvoAmount(BigDecimal invoAmount) {
		this.invoAmount = invoAmount;
	}

	@Column(name = "INVO_AMOUNT_CAPITAL")
	public String getInvoAmountCapital() {
		return this.invoAmountCapital;
	}

	public void setInvoAmountCapital(String invoAmountCapital) {
		this.invoAmountCapital = invoAmountCapital;
	}

	@Column(name = "INVO_AMOUNT_CAPITAL_EN")
	public String getInvoAmountCapitalEn() {
		return this.invoAmountCapitalEn;
	}

	public void setInvoAmountCapitalEn(String invoAmountCapitalEn) {
		this.invoAmountCapitalEn = invoAmountCapitalEn;
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

	@Column(name = "INVO_BIZ_CLASS")
	public String getInvoBizClass() {
		return this.invoBizClass;
	}

	public void setInvoBizClass(String invoBizClass) {
		this.invoBizClass = invoBizClass;
	}

	@Column(name = "INVO_BL_NO")
	public String getInvoBlNo() {
		return this.invoBlNo;
	}

	public void setInvoBlNo(String invoBlNo) {
		this.invoBlNo = invoBlNo;
	}

	@Column(name = "INVO_CARGO_GROSS_WEIGHT")
	public String getInvoCargoGrossWeight() {
		return this.invoCargoGrossWeight;
	}

	public void setInvoCargoGrossWeight(String invoCargoGrossWeight) {
		this.invoCargoGrossWeight = invoCargoGrossWeight;
	}

	@Column(name = "INVO_CARGO_MEASUREMENT")
	public String getInvoCargoMeasurement() {
		return this.invoCargoMeasurement;
	}

	public void setInvoCargoMeasurement(String invoCargoMeasurement) {
		this.invoCargoMeasurement = invoCargoMeasurement;
	}

	@Column(name = "INVO_CARGO_NAME")
	public String getInvoCargoName() {
		return this.invoCargoName;
	}

	public void setInvoCargoName(String invoCargoName) {
		this.invoCargoName = invoCargoName;
	}

	@Column(name = "INVO_CARGO_PACKAGES")
	public String getInvoCargoPackages() {
		return this.invoCargoPackages;
	}

	public void setInvoCargoPackages(String invoCargoPackages) {
		this.invoCargoPackages = invoCargoPackages;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INVO_CHECK_DATE")
	public Date getInvoCheckDate() {
		return this.invoCheckDate;
	}

	public void setInvoCheckDate(Date invoCheckDate) {
		this.invoCheckDate = invoCheckDate;
	}

	@Column(name = "INVO_CHECK_NO")
	public String getInvoCheckNo() {
		return this.invoCheckNo;
	}

	public void setInvoCheckNo(String invoCheckNo) {
		this.invoCheckNo = invoCheckNo;
	}

	@Column(name = "INVO_CHECKER")
	public String getInvoChecker() {
		return this.invoChecker;
	}

	public void setInvoChecker(String invoChecker) {
		this.invoChecker = invoChecker;
	}

	@Column(name = "INVO_CONS_NO")
	public String getInvoConsNo() {
		return this.invoConsNo;
	}

	public void setInvoConsNo(String invoConsNo) {
		this.invoConsNo = invoConsNo;
	}

	@Column(name = "INVO_CONTAINERS_INFO")
	public String getInvoContainersInfo() {
		return this.invoContainersInfo;
	}

	public void setInvoContainersInfo(String invoContainersInfo) {
		this.invoContainersInfo = invoContainersInfo;
	}

	@Column(name = "INVO_CONTRACT_NO")
	public String getInvoContractNo() {
		return this.invoContractNo;
	}

	public void setInvoContractNo(String invoContractNo) {
		this.invoContractNo = invoContractNo;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INVO_DATE")
	public Date getInvoDate() {
		return this.invoDate;
	}

	public void setInvoDate(Date invoDate) {
		this.invoDate = invoDate;
	}

	@Column(name = "INVO_DEBITNOTE_FLAG")
	public Byte getInvoDebitnoteFlag() {
		return this.invoDebitnoteFlag;
	}

	public void setInvoDebitnoteFlag(Byte invoDebitnoteFlag) {
		this.invoDebitnoteFlag = invoDebitnoteFlag;
	}

	@Column(name = "INVO_DELIVERY_PLACE")
	public String getInvoDeliveryPlace() {
		return this.invoDeliveryPlace;
	}

	public void setInvoDeliveryPlace(String invoDeliveryPlace) {
		this.invoDeliveryPlace = invoDeliveryPlace;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INVO_DUE_DATE")
	public Date getInvoDueDate() {
		return this.invoDueDate;
	}

	public void setInvoDueDate(Date invoDueDate) {
		this.invoDueDate = invoDueDate;
	}

	@Column(name = "INVO_ENTRUST_NO")
	public String getInvoEntrustNo() {
		return this.invoEntrustNo;
	}

	public void setInvoEntrustNo(String invoEntrustNo) {
		this.invoEntrustNo = invoEntrustNo;
	}

	@Column(name = "INVO_EX_RATE")
	public BigDecimal getInvoExRate() {
		return this.invoExRate;
	}

	public void setInvoExRate(BigDecimal invoExRate) {
		this.invoExRate = invoExRate;
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

	@Column(name = "INVO_OPERATOR")
	public String getInvoOperator() {
		return this.invoOperator;
	}

	public void setInvoOperator(String invoOperator) {
		this.invoOperator = invoOperator;
	}

	@Column(name = "INVO_PAYMENT_TYPE")
	public Byte getInvoPaymentType() {
		return this.invoPaymentType;
	}

	public void setInvoPaymentType(Byte invoPaymentType) {
		this.invoPaymentType = invoPaymentType;
	}

	@Column(name = "INVO_POD")
	public String getInvoPod() {
		return this.invoPod;
	}

	public void setInvoPod(String invoPod) {
		this.invoPod = invoPod;
	}

	@Column(name = "INVO_POL")
	public String getInvoPol() {
		return this.invoPol;
	}

	public void setInvoPol(String invoPol) {
		this.invoPol = invoPol;
	}

	@Column(name = "INVO_PR_FLAG")
	public Byte getInvoPrFlag() {
		return this.invoPrFlag;
	}

	public void setInvoPrFlag(Byte invoPrFlag) {
		this.invoPrFlag = invoPrFlag;
	}

	@Column(name = "INVO_PRINT_TIMES")
	public Integer getInvoPrintTimes() {
		return this.invoPrintTimes;
	}

	public void setInvoPrintTimes(Integer invoPrintTimes) {
		this.invoPrintTimes = invoPrintTimes;
	}

	@Column(name = "INVO_REMARKS")
	public String getInvoRemarks() {
		return this.invoRemarks;
	}

	public void setInvoRemarks(String invoRemarks) {
		this.invoRemarks = invoRemarks;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INVO_SAIL_DATE")
	public Date getInvoSailDate() {
		return this.invoSailDate;
	}

	public void setInvoSailDate(Date invoSailDate) {
		this.invoSailDate = invoSailDate;
	}

	@Column(name = "INVO_SIGNER")
	public String getInvoSigner() {
		return this.invoSigner;
	}

	public void setInvoSigner(String invoSigner) {
		this.invoSigner = invoSigner;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INVO_SING_DATE")
	public Date getInvoSingDate() {
		return this.invoSingDate;
	}

	public void setInvoSingDate(Date invoSingDate) {
		this.invoSingDate = invoSingDate;
	}

	@Column(name = "INVO_STATUS")
	public Byte getInvoStatus() {
		return this.invoStatus;
	}

	public void setInvoStatus(Byte invoStatus) {
		this.invoStatus = invoStatus;
	}

	@Column(name = "INVO_TAX_NO")
	public String getInvoTaxNo() {
		return this.invoTaxNo;
	}

	public void setInvoTaxNo(String invoTaxNo) {
		this.invoTaxNo = invoTaxNo;
	}

	@Column(name = "INVO_TITLE")
	public String getInvoTitle() {
		return this.invoTitle;
	}

	public void setInvoTitle(String invoTitle) {
		this.invoTitle = invoTitle;
	}

	@Column(name = "INVO_TYPE")
	public String getInvoType() {
		return this.invoType;
	}

	public void setInvoType(String invoType) {
		this.invoType = invoType;
	}

	@Column(name = "INVO_UPLOAD_FLAG")
	public Byte getInvoUploadFlag() {
		return this.invoUploadFlag;
	}

	public void setInvoUploadFlag(Byte invoUploadFlag) {
		this.invoUploadFlag = invoUploadFlag;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "INVO_UPLOAD_TIME")
	public Date getInvoUploadTime() {
		return this.invoUploadTime;
	}

	public void setInvoUploadTime(Date invoUploadTime) {
		this.invoUploadTime = invoUploadTime;
	}

	@Column(name = "INVO_VESSEL")
	public String getInvoVessel() {
		return this.invoVessel;
	}

	public void setInvoVessel(String invoVessel) {
		this.invoVessel = invoVessel;
	}

	@Column(name = "INVO_VOYAGE")
	public String getInvoVoyage() {
		return this.invoVoyage;
	}

	public void setInvoVoyage(String invoVoyage) {
		this.invoVoyage = invoVoyage;
	}

	@Column(name = "INVO_WRITE_OFF_BY")
	public Integer getInvoWriteOffBy() {
		return this.invoWriteOffBy;
	}

	public void setInvoWriteOffBy(Integer invoWriteOffBy) {
		this.invoWriteOffBy = invoWriteOffBy;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INVO_WRITE_OFF_DATE")
	public Date getInvoWriteOffDate() {
		return this.invoWriteOffDate;
	}

	public void setInvoWriteOffDate(Date invoWriteOffDate) {
		this.invoWriteOffDate = invoWriteOffDate;
	}

	@Column(name = "INVO_WRITE_OFF_NO")
	public String getInvoWriteOffNo() {
		return this.invoWriteOffNo;
	}

	public void setInvoWriteOffNo(String invoWriteOffNo) {
		this.invoWriteOffNo = invoWriteOffNo;
	}

	@Column(name = "INVO_WRITE_OFF_STATUS")
	public Integer getInvoWriteOffStatus() {
		return this.invoWriteOffStatus;
	}

	public void setInvoWriteOffStatus(Integer invoWriteOffStatus) {
		this.invoWriteOffStatus = invoWriteOffStatus;
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
