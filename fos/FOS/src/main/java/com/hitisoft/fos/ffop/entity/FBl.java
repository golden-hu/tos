package com.hitisoft.fos.ffop.entity;

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
@Table(name = "F_BL")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FBl extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -5634947020402293458L;
	private Byte bl500Flag;
	private String blAccountNo;
	private String blAccountingInfo;
	private Byte blAdvancedFlag;
	private String blAgentIataCode;
	private String blAmountInsurance;
	private Byte blBackFlag;
	private String blBookingRequirement;
	private String blByFirst;
	private String blBySecond;
	private String blByThird;
	private String blCargoDesc;
	private Integer blCarrier;
	private String blCarrierName;
	private BigDecimal blChargeRate;
	private BigDecimal blChargeWeight;
	private Byte blCleanFlag;
	private String blConsignee;
	private String blContainersInfo;
	private String blContainersNo;
	private String blDeliveryPlace;
	private String blDimension;
	private String blDvCarriage;
	private String blDvCustoms;
	private String blEta;
	private String blEtd;	
	private String blHandlingInfo;
	private String blIssueBy;
	private Date blIssueDate;
	private String blIssuePlace;
	private String blLoadDate;
	private Integer blMBlId;
	private String blMBlNo;
	private String blCargoMarks;
	private Byte blMasterFlag;
	private Byte blMergeFlag;
	private String blNo;
	private String blNotifyParty;
	private String blNotifyParty2;
	private String blOriginalNum;
	private BigDecimal blOtherDaCc;
	private BigDecimal blOtherDaPp;
	private BigDecimal blOtherDcCc;
	private BigDecimal blOtherDcPp;
	private String blOtherPayment;
	private String blOverseaAgency;	
	private String blPaidAt;
	private String blPaymentTerm;
	private String blPod;
	private String blPol;
	private String blPot;
	private String blPrecarriage;
	private String blRateClass;
	private String blReceiptPlace;
	private String blReceiver;
	private Integer blReleaseBy;
	private Date blReleaseDate;
	private String blReleaseRemarks;
	private String blRemarks;
	private String blGrossWeight;
	private String blMeasurement;
	private String blPackages;
	private String blShipper;
	private Byte blSplitFlag;
	private Byte blStatus;
	private BigDecimal blTaxCc;
	private BigDecimal blTaxPp;
	private Byte blThirdPlaceFlag;
	private String blToFirst;
	private String blToSecond;
	private String blToThird;
	private BigDecimal blTotalCc;
	private BigDecimal blTotalCharge;
	private BigDecimal blTotalPp;
	private String blTotalSay;
	private String blTransTerm;
	private String blTsRemarks;
	private String blType;
	private BigDecimal blValuationChargeCc;
	private BigDecimal blValuationChargePp;
	private String blValuePayment;
	private String blVessel;
	private String blVoyage;
	private BigDecimal blWeightChargeCc;
	private BigDecimal blWeightChargePp;
	private String blWeightPayment;
	private Double blCargoGrossWeight;
	private Double blCargoMeasurement;
	private Double blCargoNetWeight;
	private Integer blCargoPackages;
	private String consBizClass;
	private String consBizType;
	private String consTradeContractNo;
	private String consChargeRemarks;
	private Integer consId;
	private Integer consMasterId;
	private String consMasterNo;
	private String consNo;
	private String consShipType;
	private String currCode;
	private Integer custId;
	private String custName;
	private Integer istyId;
	private String packName;
	private String unitName;

	public FBl() {
	}

	@Column(name = "BL_500_FLAG")
	public Byte getBl500Flag() {
		return this.bl500Flag;
	}

	public void setBl500Flag(Byte bl500Flag) {
		this.bl500Flag = bl500Flag;
	}

	@Column(name = "BL_ACCOUNT_NO")
	public String getBlAccountNo() {
		return this.blAccountNo;
	}

	public void setBlAccountNo(String blAccountNo) {
		this.blAccountNo = blAccountNo;
	}

	@Column(name = "BL_ACCOUNTING_INFO")
	public String getBlAccountingInfo() {
		return this.blAccountingInfo;
	}

	public void setBlAccountingInfo(String blAccountingInfo) {
		this.blAccountingInfo = blAccountingInfo;
	}

	@Column(name = "BL_ADVANCED_FLAG")
	public Byte getBlAdvancedFlag() {
		return this.blAdvancedFlag;
	}

	public void setBlAdvancedFlag(Byte blAdvancedFlag) {
		this.blAdvancedFlag = blAdvancedFlag;
	}

	@Column(name = "BL_AGENT_IATA_CODE")
	public String getBlAgentIataCode() {
		return this.blAgentIataCode;
	}

	public void setBlAgentIataCode(String blAgentIataCode) {
		this.blAgentIataCode = blAgentIataCode;
	}

	@Column(name = "BL_AMOUNT_INSURANCE")
	public String getBlAmountInsurance() {
		return this.blAmountInsurance;
	}

	public void setBlAmountInsurance(String blAmountInsurance) {
		this.blAmountInsurance = blAmountInsurance;
	}

	@Column(name = "BL_BACK_FLAG")
	public Byte getBlBackFlag() {
		return this.blBackFlag;
	}

	public void setBlBackFlag(Byte blBackFlag) {
		this.blBackFlag = blBackFlag;
	}

	@Column(name = "BL_BOOKING_REQUIREMENT")
	public String getBlBookingRequirement() {
		return this.blBookingRequirement;
	}

	public void setBlBookingRequirement(String blBookingRequirement) {
		this.blBookingRequirement = blBookingRequirement;
	}

	@Column(name = "BL_BY_FIRST")
	public String getBlByFirst() {
		return this.blByFirst;
	}

	public void setBlByFirst(String blByFirst) {
		this.blByFirst = blByFirst;
	}

	@Column(name = "BL_BY_SECOND")
	public String getBlBySecond() {
		return this.blBySecond;
	}

	public void setBlBySecond(String blBySecond) {
		this.blBySecond = blBySecond;
	}

	@Column(name = "BL_BY_THIRD")
	public String getBlByThird() {
		return this.blByThird;
	}

	public void setBlByThird(String blByThird) {
		this.blByThird = blByThird;
	}

	@Column(name = "BL_CARGO_DESC")
	public String getBlCargoDesc() {
		return this.blCargoDesc;
	}

	public void setBlCargoDesc(String blCargoDesc) {
		this.blCargoDesc = blCargoDesc;
	}

	@Column(name = "BL_CARRIER")
	public Integer getBlCarrier() {
		return this.blCarrier;
	}

	public void setBlCarrier(Integer blCarrier) {
		this.blCarrier = blCarrier;
	}

	@Column(name = "BL_CARRIER_NAME")
	public String getBlCarrierName() {
		return this.blCarrierName;
	}

	public void setBlCarrierName(String blCarrierName) {
		this.blCarrierName = blCarrierName;
	}

	@Column(name = "BL_CHARGE_RATE")
	public BigDecimal getBlChargeRate() {
		return this.blChargeRate;
	}

	public void setBlChargeRate(BigDecimal blChargeRate) {
		this.blChargeRate = blChargeRate;
	}

	@Column(name = "BL_CHARGE_WEIGHT")
	public BigDecimal getBlChargeWeight() {
		return this.blChargeWeight;
	}

	public void setBlChargeWeight(BigDecimal blChargeWeight) {
		this.blChargeWeight = blChargeWeight;
	}

	@Column(name = "BL_CLEAN_FLAG")
	public Byte getBlCleanFlag() {
		return this.blCleanFlag;
	}

	public void setBlCleanFlag(Byte blCleanFlag) {
		this.blCleanFlag = blCleanFlag;
	}

	@Column(name = "BL_CONSIGNEE")
	public String getBlConsignee() {
		return this.blConsignee;
	}

	public void setBlConsignee(String blConsignee) {
		this.blConsignee = blConsignee;
	}

	@Column(name = "BL_CONTAINERS_INFO")
	public String getBlContainersInfo() {
		return this.blContainersInfo;
	}

	public void setBlContainersInfo(String blContainersInfo) {
		this.blContainersInfo = blContainersInfo;
	}

	@Column(name = "BL_CONTAINERS_NO")
	public String getBlContainersNo() {
		return this.blContainersNo;
	}

	public void setBlContainersNo(String blContainersNo) {
		this.blContainersNo = blContainersNo;
	}

	@Column(name = "BL_DELIVERY_PLACE")
	public String getBlDeliveryPlace() {
		return this.blDeliveryPlace;
	}

	public void setBlDeliveryPlace(String blDeliveryPlace) {
		this.blDeliveryPlace = blDeliveryPlace;
	}

	@Column(name = "BL_DIMENSION")
	public String getBlDimension() {
		return this.blDimension;
	}

	public void setBlDimension(String blDimension) {
		this.blDimension = blDimension;
	}

	@Column(name = "BL_DV_CARRIAGE")
	public String getBlDvCarriage() {
		return this.blDvCarriage;
	}

	public void setBlDvCarriage(String blDvCarriage) {
		this.blDvCarriage = blDvCarriage;
	}

	@Column(name = "BL_DV_CUSTOMS")
	public String getBlDvCustoms() {
		return this.blDvCustoms;
	}

	public void setBlDvCustoms(String blDvCustoms) {
		this.blDvCustoms = blDvCustoms;
	}

	@Column(name = "BL_ETA")
	public String getBlEta() {
		return this.blEta;
	}

	public void setBlEta(String blEta) {
		this.blEta = blEta;
	}

	@Column(name = "BL_ETD")
	public String getBlEtd() {
		return this.blEtd;
	}

	public void setBlEtd(String blEtd) {
		this.blEtd = blEtd;
	}

	
	@Column(name = "BL_HANDLING_INFO")
	public String getBlHandlingInfo() {
		return this.blHandlingInfo;
	}

	public void setBlHandlingInfo(String blHandlingInfo) {
		this.blHandlingInfo = blHandlingInfo;
	}

	@Column(name = "BL_ISSUE_BY")
	public String getBlIssueBy() {
		return this.blIssueBy;
	}

	public void setBlIssueBy(String blIssueBy) {
		this.blIssueBy = blIssueBy;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "BL_ISSUE_DATE")
	public Date getBlIssueDate() {
		return this.blIssueDate;
	}

	public void setBlIssueDate(Date blIssueDate) {
		this.blIssueDate = blIssueDate;
	}

	@Column(name = "BL_ISSUE_PLACE")
	public String getBlIssuePlace() {
		return this.blIssuePlace;
	}

	public void setBlIssuePlace(String blIssuePlace) {
		this.blIssuePlace = blIssuePlace;
	}

	@Column(name = "BL_LOAD_DATE")
	public String getBlLoadDate() {
		return this.blLoadDate;
	}

	public void setBlLoadDate(String blLoadDate) {
		this.blLoadDate = blLoadDate;
	}

	@Column(name = "BL_M_BL_ID")
	public Integer getBlMBlId() {
		return this.blMBlId;
	}

	public void setBlMBlId(Integer blMBlId) {
		this.blMBlId = blMBlId;
	}

	@Column(name = "BL_MBL_NO")
	public String getBlMBlNo() {
		return this.blMBlNo;
	}

	public void setBlMBlNo(String blMBlNo) {
		this.blMBlNo = blMBlNo;
	}

	@Column(name = "BL_CARGO_MARKS")
	public String getBlCargoMarks() {
		return this.blCargoMarks;
	}

	public void setBlCargoMarks(String blCargoMarks) {
		this.blCargoMarks = blCargoMarks;
	}

	@Column(name = "BL_MASTER_FLAG")
	public Byte getBlMasterFlag() {
		return this.blMasterFlag;
	}

	public void setBlMasterFlag(Byte blMasterFlag) {
		this.blMasterFlag = blMasterFlag;
	}

	@Column(name = "BL_MERGE_FLAG")
	public Byte getBlMergeFlag() {
		return this.blMergeFlag;
	}

	public void setBlMergeFlag(Byte blMergeFlag) {
		this.blMergeFlag = blMergeFlag;
	}

	@Column(name = "BL_NO")
	public String getBlNo() {
		return this.blNo;
	}

	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}

	@Column(name = "BL_NOTIFY_PARTY")
	public String getBlNotifyParty() {
		return this.blNotifyParty;
	}

	public void setBlNotifyParty(String blNotifyParty) {
		this.blNotifyParty = blNotifyParty;
	}

	@Column(name = "BL_NOTIFY_PARTY2")
	public String getBlNotifyParty2() {
		return this.blNotifyParty2;
	}

	public void setBlNotifyParty2(String blNotifyParty2) {
		this.blNotifyParty2 = blNotifyParty2;
	}

	@Column(name = "BL_ORIGINAL_NUM")
	public String getBlOriginalNum() {
		return this.blOriginalNum;
	}

	public void setBlOriginalNum(String blOriginalNum) {
		this.blOriginalNum = blOriginalNum;
	}

	@Column(name = "BL_OTHER_DA_CC")
	public BigDecimal getBlOtherDaCc() {
		return this.blOtherDaCc;
	}

	public void setBlOtherDaCc(BigDecimal blOtherDaCc) {
		this.blOtherDaCc = blOtherDaCc;
	}

	@Column(name = "BL_OTHER_DA_PP")
	public BigDecimal getBlOtherDaPp() {
		return this.blOtherDaPp;
	}

	public void setBlOtherDaPp(BigDecimal blOtherDaPp) {
		this.blOtherDaPp = blOtherDaPp;
	}

	@Column(name = "BL_OTHER_DC_CC")
	public BigDecimal getBlOtherDcCc() {
		return this.blOtherDcCc;
	}

	public void setBlOtherDcCc(BigDecimal blOtherDcCc) {
		this.blOtherDcCc = blOtherDcCc;
	}

	@Column(name = "BL_OTHER_DC_PP")
	public BigDecimal getBlOtherDcPp() {
		return this.blOtherDcPp;
	}

	public void setBlOtherDcPp(BigDecimal blOtherDcPp) {
		this.blOtherDcPp = blOtherDcPp;
	}

	@Column(name = "BL_OTHER_PAYMENT")
	public String getBlOtherPayment() {
		return this.blOtherPayment;
	}

	public void setBlOtherPayment(String blOtherPayment) {
		this.blOtherPayment = blOtherPayment;
	}

	@Column(name = "BL_OVERSEA_AGENCY")
	public String getBlOverseaAgency() {
		return this.blOverseaAgency;
	}

	public void setBlOverseaAgency(String blOverseaAgency) {
		this.blOverseaAgency = blOverseaAgency;
	}
	
	@Column(name = "BL_PAID_AT")
	public String getBlPaidAt() {
		return this.blPaidAt;
	}

	public void setBlPaidAt(String blPaidAt) {
		this.blPaidAt = blPaidAt;
	}

	@Column(name = "BL_PAYMENT_TERM")
	public String getBlPaymentTerm() {
		return this.blPaymentTerm;
	}

	public void setBlPaymentTerm(String blPaymentTerm) {
		this.blPaymentTerm = blPaymentTerm;
	}

	@Column(name = "BL_POD")
	public String getBlPod() {
		return this.blPod;
	}

	public void setBlPod(String blPod) {
		this.blPod = blPod;
	}

	@Column(name = "BL_POL")
	public String getBlPol() {
		return this.blPol;
	}

	public void setBlPol(String blPol) {
		this.blPol = blPol;
	}

	@Column(name = "BL_POT")
	public String getBlPot() {
		return this.blPot;
	}

	public void setBlPot(String blPot) {
		this.blPot = blPot;
	}

	@Column(name = "BL_PRECARRIAGE")
	public String getBlPrecarriage() {
		return this.blPrecarriage;
	}

	public void setBlPrecarriage(String blPrecarriage) {
		this.blPrecarriage = blPrecarriage;
	}

	@Column(name = "BL_RATE_CLASS")
	public String getBlRateClass() {
		return this.blRateClass;
	}

	public void setBlRateClass(String blRateClass) {
		this.blRateClass = blRateClass;
	}

	@Column(name = "BL_RECEIPT_PLACE")
	public String getBlReceiptPlace() {
		return this.blReceiptPlace;
	}

	public void setBlReceiptPlace(String blReceiptPlace) {
		this.blReceiptPlace = blReceiptPlace;
	}

	@Column(name = "BL_RECEIVER")
	public String getBlReceiver() {
		return this.blReceiver;
	}

	public void setBlReceiver(String blReceiver) {
		this.blReceiver = blReceiver;
	}

	@Column(name = "BL_RELEASE_BY")
	public Integer getBlReleaseBy() {
		return this.blReleaseBy;
	}

	public void setBlReleaseBy(Integer blReleaseBy) {
		this.blReleaseBy = blReleaseBy;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "BL_RELEASE_DATE")
	public Date getBlReleaseDate() {
		return this.blReleaseDate;
	}

	public void setBlReleaseDate(Date blReleaseDate) {
		this.blReleaseDate = blReleaseDate;
	}

	@Column(name = "BL_RELEASE_REMARKS")
	public String getBlReleaseRemarks() {
		return this.blReleaseRemarks;
	}

	public void setBlReleaseRemarks(String blReleaseRemarks) {
		this.blReleaseRemarks = blReleaseRemarks;
	}

	@Column(name = "BL_REMARKS")
	public String getBlRemarks() {
		return this.blRemarks;
	}

	public void setBlRemarks(String blRemarks) {
		this.blRemarks = blRemarks;
	}

	@Column(name = "BL_GROSS_WEIGHT")
	public String getBlGrossWeight() {
		return blGrossWeight;
	}

	public void setBlGrossWeight(String blGrossWeight) {
		this.blGrossWeight = blGrossWeight;
	}
	
	@Column(name = "BL_MEASUREMENT")
	public String getBlMeasurement() {
		return blMeasurement;
	}

	public void setBlMeasurement(String blMeasurement) {
		this.blMeasurement = blMeasurement;
	}
	
	@Column(name = "BL_PACKAGES")
	public String getBlPackages() {
		return blPackages;
	}

	public void setBlPackages(String blPackages) {
		this.blPackages = blPackages;
	}

	
	@Column(name = "BL_SHIPPER")
	public String getBlShipper() {
		return this.blShipper;
	}

	public void setBlShipper(String blShipper) {
		this.blShipper = blShipper;
	}

	@Column(name = "BL_SPLIT_FLAG")
	public Byte getBlSplitFlag() {
		return this.blSplitFlag;
	}

	public void setBlSplitFlag(Byte blSplitFlag) {
		this.blSplitFlag = blSplitFlag;
	}

	@Column(name = "BL_STATUS")
	public Byte getBlStatus() {
		return this.blStatus;
	}

	public void setBlStatus(Byte blStatus) {
		this.blStatus = blStatus;
	}

	@Column(name = "BL_TAX_CC")
	public BigDecimal getBlTaxCc() {
		return this.blTaxCc;
	}

	public void setBlTaxCc(BigDecimal blTaxCc) {
		this.blTaxCc = blTaxCc;
	}

	@Column(name = "BL_TAX_PP")
	public BigDecimal getBlTaxPp() {
		return this.blTaxPp;
	}

	public void setBlTaxPp(BigDecimal blTaxPp) {
		this.blTaxPp = blTaxPp;
	}

	@Column(name = "BL_THIRD_PLACE_FLAG")
	public Byte getBlThirdPlaceFlag() {
		return this.blThirdPlaceFlag;
	}

	public void setBlThirdPlaceFlag(Byte blThirdPlaceFlag) {
		this.blThirdPlaceFlag = blThirdPlaceFlag;
	}

	@Column(name = "BL_TO_FIRST")
	public String getBlToFirst() {
		return this.blToFirst;
	}

	public void setBlToFirst(String blToFirst) {
		this.blToFirst = blToFirst;
	}

	@Column(name = "BL_TO_SECOND")
	public String getBlToSecond() {
		return this.blToSecond;
	}

	public void setBlToSecond(String blToSecond) {
		this.blToSecond = blToSecond;
	}

	@Column(name = "BL_TO_THIRD")
	public String getBlToThird() {
		return this.blToThird;
	}

	public void setBlToThird(String blToThird) {
		this.blToThird = blToThird;
	}

	@Column(name = "BL_TOTAL_CC")
	public BigDecimal getBlTotalCc() {
		return this.blTotalCc;
	}

	public void setBlTotalCc(BigDecimal blTotalCc) {
		this.blTotalCc = blTotalCc;
	}

	@Column(name = "BL_TOTAL_CHARGE")
	public BigDecimal getBlTotalCharge() {
		return this.blTotalCharge;
	}

	public void setBlTotalCharge(BigDecimal blTotalCharge) {
		this.blTotalCharge = blTotalCharge;
	}

	@Column(name = "BL_TOTAL_PP")
	public BigDecimal getBlTotalPp() {
		return this.blTotalPp;
	}

	public void setBlTotalPp(BigDecimal blTotalPp) {
		this.blTotalPp = blTotalPp;
	}

	@Column(name = "BL_TOTAL_SAY")
	public String getBlTotalSay() {
		return this.blTotalSay;
	}

	public void setBlTotalSay(String blTotalSay) {
		this.blTotalSay = blTotalSay;
	}

	@Column(name = "BL_TRANS_TERM")
	public String getBlTransTerm() {
		return this.blTransTerm;
	}

	public void setBlTransTerm(String blTransTerm) {
		this.blTransTerm = blTransTerm;
	}

	@Column(name = "BL_TS_REMARKS")
	public String getBlTsRemarks() {
		return this.blTsRemarks;
	}

	public void setBlTsRemarks(String blTsRemarks) {
		this.blTsRemarks = blTsRemarks;
	}

	@Column(name = "BL_TYPE")
	public String getBlType() {
		return this.blType;
	}

	public void setBlType(String blType) {
		this.blType = blType;
	}

	@Column(name = "BL_VALUATION_CHARGE_CC")
	public BigDecimal getBlValuationChargeCc() {
		return this.blValuationChargeCc;
	}

	public void setBlValuationChargeCc(BigDecimal blValuationChargeCc) {
		this.blValuationChargeCc = blValuationChargeCc;
	}

	@Column(name = "BL_VALUATION_CHARGE_PP")
	public BigDecimal getBlValuationChargePp() {
		return this.blValuationChargePp;
	}

	public void setBlValuationChargePp(BigDecimal blValuationChargePp) {
		this.blValuationChargePp = blValuationChargePp;
	}

	@Column(name = "BL_VALUE_PAYMENT")
	public String getBlValuePayment() {
		return this.blValuePayment;
	}

	public void setBlValuePayment(String blValuePayment) {
		this.blValuePayment = blValuePayment;
	}

	@Column(name = "BL_VESSEL")
	public String getBlVessel() {
		return this.blVessel;
	}

	public void setBlVessel(String blVessel) {
		this.blVessel = blVessel;
	}

	@Column(name = "BL_VOYAGE")
	public String getBlVoyage() {
		return this.blVoyage;
	}

	public void setBlVoyage(String blVoyage) {
		this.blVoyage = blVoyage;
	}

	@Column(name = "BL_WEIGHT_CHARGE_CC")
	public BigDecimal getBlWeightChargeCc() {
		return this.blWeightChargeCc;
	}

	public void setBlWeightChargeCc(BigDecimal blWeightChargeCc) {
		this.blWeightChargeCc = blWeightChargeCc;
	}

	@Column(name = "BL_WEIGHT_CHARGE_PP")
	public BigDecimal getBlWeightChargePp() {
		return this.blWeightChargePp;
	}

	public void setBlWeightChargePp(BigDecimal blWeightChargePp) {
		this.blWeightChargePp = blWeightChargePp;
	}

	@Column(name = "BL_WEIGHT_PAYMENT")
	public String getBlWeightPayment() {
		return this.blWeightPayment;
	}

	public void setBlWeightPayment(String blWeightPayment) {
		this.blWeightPayment = blWeightPayment;
	}

	@Column(name = "BL_CARGO_GROSS_WEIGHT")
	public Double getBlCargoGrossWeight() {
		return this.blCargoGrossWeight;
	}

	public void setBlCargoGrossWeight(Double blCargoGrossWeight) {
		this.blCargoGrossWeight = blCargoGrossWeight;
	}

	@Column(name = "BL_CARGO_MEASUREMENT")
	public Double getBlCargoMeasurement() {
		return this.blCargoMeasurement;
	}

	public void setBlCargoMeasurement(Double blCargoMeasurement) {
		this.blCargoMeasurement = blCargoMeasurement;
	}

	@Column(name = "BL_CARGO_NET_WEIGHT")
	public Double getBlCargoNetWeight() {
		return this.blCargoNetWeight;
	}

	public void setBlCargoNetWeight(Double blCargoNetWeight) {
		this.blCargoNetWeight = blCargoNetWeight;
	}

	@Column(name = "BL_CARGO_PACKAGES")
	public Integer getBlCargoPackages() {
		return this.blCargoPackages;
	}

	public void setBlCargoPackages(Integer blCargoPackages) {
		this.blCargoPackages = blCargoPackages;
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

	@Column(name = "CONS_CHARGE_REMARKS")
	public String getConsChargeRemarks() {
		return this.consChargeRemarks;
	}

	public void setConsChargeRemarks(String consChargeRemarks) {
		this.consChargeRemarks = consChargeRemarks;
	}

	@Column(name = "CONS_TRADE_CONTRACT_NO")
	public String getConsTradeContractNo() {
		return this.consTradeContractNo;
	}

	public void setConsTradeContractNo(String consTradeContractNo) {
		this.consTradeContractNo = consTradeContractNo;
	}

	@Column(name = "CONS_ID")
	public Integer getConsId() {
		return this.consId;
	}

	public void setConsId(Integer consId) {
		this.consId = consId;
	}

	@Column(name = "CONS_MASTER_ID")
	public Integer getConsMasterId() {
		return this.consMasterId;
	}

	public void setConsMasterId(Integer consMasterId) {
		this.consMasterId = consMasterId;
	}

	@Column(name = "CONS_MASTER_NO")
	public String getConsMasterNo() {
		return this.consMasterNo;
	}

	public void setConsMasterNo(String consMasterNo) {
		this.consMasterNo = consMasterNo;
	}

	@Column(name = "CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Column(name = "CONS_SHIP_TYPE")
	public String getConsShipType() {
		return this.consShipType;
	}

	public void setConsShipType(String consShipType) {
		this.consShipType = consShipType;
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

	@Column(name = "ISTY_ID")
	public Integer getIstyId() {
		return this.istyId;
	}

	public void setIstyId(Integer istyId) {
		this.istyId = istyId;
	}

	@Column(name = "PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}

	@Column(name = "UNIT_NAME")
	public String getUnitName() {
		return this.unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

}
