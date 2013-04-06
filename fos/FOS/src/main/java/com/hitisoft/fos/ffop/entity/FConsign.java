package com.hitisoft.fos.ffop.entity;

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

import com.hitisoft.fos.util.Constants;
import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "F_CONSIGN")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FConsign extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 7660776941357715073L;
	private String consNo;
	private String consBizType;
	private String consBizClass;
	private String consShipType;
	private String consLclType;
	private Byte consMasterFlag;
	private Long consMasterId;
	private String consMasterNo;
	private String consRefNo;
	private String consContractNo;
	private String consSource;
	private Date consDate;
	private Long consSalesRepId;
	private String consSalesRepName;
	private Long consOperatorId;
	private String consOperatorName;
	private String consCreditNo;
	private String consInsuranceFee;
	private Long custId;
	private String custName;
	private String custSname;
	private String custContact;	
	private String custTel;
	private String custFax;
	private Integer custSalesId;
	private String custSalesName;
	private Long consOverseaAgency;
	private String consOverseaAgencyName;
	private String consShipper;
	private String consConsignee;
	private String consNotifyParty;
	private String consNotifyParty2;
	private String consFShipper;
	private String consFConsignee;
	private String consFNotifyParty;
	private String consPodEn;
	private String consPolEn;
	private String consPotEn;
	private String consPackingListNo;
	
	private String consBVessel;
	private String consBVoyage;
	private String consBPodEn;
	
	private String consPodCode;
	private String consPolCode;
	private String consPotCode;
	
	private String consReceiptPlace;
	private String consDeliveryPlace;
	private String consDestination;	
	private String consTranCountry;
	private String consTradeCountry;
	private String consHarbour;
	private Long consCargoOwner;
	private String consCargoOwnerName;
	private Long consCfs;
	private String consCfsName;	
	private String consWarehouseNo;
	private Long consWarehouse;
	private String consWarehouseName;
	private String consWarehouseContact;
	private String consWarehouseTel;
	private String consWarehouseAddress;	
	private String consWarehouseRemarks;
	private Date consContainerLoadDate;
	private Long consContainerCompany;
	private String consContainerCompanyName;
	private Long consCustomsVendor;
	private String consCustomsVendorName;
	private Long consInspectionVendor;
	private String consInspectionVendorName;
	private Long consTrackVendor;
	private String consTrackVendorName;
	private String consTrackContact;
	private String consTrackTel;
	private String consLoadFactory;
	private String consLoadContact;
	private String consLoadTel;
	private Date consLoadDate;
	private String consLoadAddress;	
	private String consLoadRemarks;
	
	private Long consDoAgency;
	private String consDoAgencyName;
	private Long consBookingAgency;
	private String consBookingAgencyName;
	private String consBookingAgencyContact;
	private String consBookingAgencyTel;
	private String consBookingAgencySname;
	private Date consBookingDate;
	private String consBookingContractNo;
	private String consSoNo;
	private String consPrecarriage;
	private Long consCarrier;
	private String consCarrierCode;	
	private String consCarrierName;	
	private String vessName;
	private String vessNameCn;
	private String voyaName;
	private Date consEta;
	private Date consEtd;
	private Date consShipDate;	
	private Date consExpiryDate;
	private Date consDeliveryDate;	
	private Date consSailDate;	
	private Date consBlIssueDate;
	private Date consChangeDate;
	private String consMblNo;	
	private String consHblNo;
	private String consScacCode;
	private String consCargoDesc;
	private String consCargoMarks;
	private String consSendSingleAddress;
	private String consCargoNameEn;
	private String consCargoNameCn;
	private String consCargoSpecial;
	private Integer consTotalPackages;
	private String consTotalPackagesInWord;
	private Double consTotalNetWeight;
	private Double consTotalGrossWeight;
	private Double consTotalMeasurement;
	private Double consTotalChargeWeight;
	private Integer consTotalContainers;
	private Integer consContainersTeu;
	private String consContainersNo;
	private String consContainersInfo;
	private String consSealNo;
	private Integer blCargoPackages;
	private Double blCargoGrossWeight;
	private Double blCargoNetWeight;
	private Double blCargoMeasurement;
	private Byte cargBigFlag;	
	private Byte cargReeterFlag;
	private Byte cargDanagerFlag;
	private String unitCode;
	private String unitCodeCarrier;
	private String packName;
	private String coclName;
	private String caclName;
	private String trteName;
	private String trtyName;
	private String tranCode;
	private String tranCodeCarrier;
	private String pateCode;
	private String pateCodeCarrier;
	private Integer istyId;
	private Integer shliId;
	private String shliCode;	
	private Integer swithId;
	private String consBlIssuePlace;
	private String consBlRemarks;
	private String consPaidAt;
	private Byte consTransFlag;
	private Byte consPartialFlag;	
	private Byte consFumigateFlag;
	private Byte consQuarantineFlag;	
	private Byte consTransferringFlag;
	private Byte consShutoutFlag;
	private String consOriginalBlNum;	
	private Integer consCopyBlNum;
	private String consRemarks;
	private String consBookRemarks;
	private String consServiceRequired;
	private String consServiceSpec;
	private String consSplitNo;
	private String consShipCode;
	private String consSplitContact;
	private String consSplitTel;
	private String consSplitConsignee;
	private String consSplitConsigneeTel;
	private Byte consStatus;
	private Byte consStatusExp;
	private Byte consStatusAp;
	private Byte consStatusAr;	
	private Byte consStatusInvoP;
	private Byte consStatusInvoR;
	private Byte consStatusAud;
	private Byte consStatusLock;
	private String consChargeRemarks;
	private String consBookingDeclareNoUs;
	private Byte consUsFullShip;
	private Byte consCudeType;
	private Byte consInvoiceFlag;		
	private Byte consInspectionFlag;
	private Byte consWsFlag;
	private Byte consWsAcceptFlag;
	
	private Byte consVerificationFlag;
	private String consVerificationNo;
	private Double consBulkyCarrier;
	private Double consBulkyCustomer;
	private Double consChargeWeightCarrier;
	private Double consChargeWeightCustomer;
	private Double consTotalGrossWeightCustomer;
	private Double consTotalMeasurementCustomer;
	
	private Byte consExternalFlag;
	private String consCompany;	
	private Date consCloseDate;
	private Date consCustomsDeclarDate;
	private String consCustomsDeclarTime;
	private String consCustomsDeclarationNo;
	
	private Long wconId;
	private Long grouId;	
	private String grouName;
	private String attr1;
	private String attr2;
	private String attr3;
	private String attr4;
	
	private Double sumR;
	private Double sumP;
	private Double grossProfit;
	private Double cnyGrossProfit;
	private Double usdGrossProfit;
	private Double otherGrossProfit;
	
	private String grossProfitRate;
	private Double sumRUsd;
	private Double sumRCny;
	private Double sumROther;
	private Double sumPUsd;
	private Double sumPCny;
	private Double sumPOther;
	
	private Double sumRUsdInvoice;
	private Double sumRCnyInvoice;
	private Double sumPUsdInvoice;
	private Double sumPCnyInvoice;
	private Double sumRUsdWriteOff;
	private Double sumRCnyWriteOff;
	private Double sumPUsdWriteOff;
	private Double sumPCnyWriteOff;
	private Short editable;
	
	private Double vWeight;
	private Double vMeasurement;
	private String vCustName;

	public FConsign() {
	}

	@Column(name = "ATTR1")
	public String getAttr1() {
		return this.attr1;
	}

	public void setAttr1(String attr1) {
		this.attr1 = attr1;
	}

	@Column(name = "ATTR2")
	public String getAttr2() {
		return this.attr2;
	}

	public void setAttr2(String attr2) {
		this.attr2 = attr2;
	}

	@Column(name = "ATTR3")
	public String getAttr3() {
		return this.attr3;
	}

	public void setAttr3(String attr3) {
		this.attr3 = attr3;
	}

	@Column(name = "ATTR4")
	public String getAttr4() {
		return this.attr4;
	}

	public void setAttr4(String attr4) {
		this.attr4 = attr4;
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

	@Column(name = "CACL_NAME")
	public String getCaclName() {
		return this.caclName;
	}

	public void setCaclName(String caclName) {
		this.caclName = caclName;
	}

	@Column(name = "CARG_BIG_FLAG")
	public Byte getCargBigFlag() {
		return this.cargBigFlag;
	}

	public void setCargBigFlag(Byte cargBigFlag) {
		this.cargBigFlag = cargBigFlag;
	}

	@Column(name = "CARG_DANAGER_FLAG")
	public Byte getCargDanagerFlag() {
		return this.cargDanagerFlag;
	}

	public void setCargDanagerFlag(Byte cargDanagerFlag) {
		this.cargDanagerFlag = cargDanagerFlag;
	}

	@Column(name = "CARG_REETER_FLAG")
	public Byte getCargReeterFlag() {
		return this.cargReeterFlag;
	}

	public void setCargReeterFlag(Byte cargReeterFlag) {
		this.cargReeterFlag = cargReeterFlag;
	}

	@Column(name = "COCL_NAME")
	public String getCoclName() {
		return this.coclName;
	}

	public void setCoclName(String coclName) {
		this.coclName = coclName;
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

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_BL_ISSUE_DATE")
	public Date getConsBlIssueDate() {
		return this.consBlIssueDate;
	}

	public void setConsBlIssueDate(Date consBlIssueDate) {
		this.consBlIssueDate = consBlIssueDate;
	}
	
	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_CHANGE_DATE")
	public Date getConsChangeDate() {
		return consChangeDate;
	}
	public void setConsChangeDate(Date consChangeDate) {
		this.consChangeDate = consChangeDate;
	}

	@Column(name = "CONS_BL_ISSUE_PLACE")
	public String getConsBlIssuePlace() {
		return this.consBlIssuePlace;
	}

	public void setConsBlIssuePlace(String consBlIssuePlace) {
		this.consBlIssuePlace = consBlIssuePlace;
	}

	@Column(name = "CONS_BL_REMARKS")
	public String getConsBlRemarks() {
		return this.consBlRemarks;
	}

	public void setConsBlRemarks(String consBlRemarks) {
		this.consBlRemarks = consBlRemarks;
	}

	@Column(name = "CONS_BOOK_REMARKS")
	public String getConsBookRemarks() {
		return this.consBookRemarks;
	}

	public void setConsBookRemarks(String consBookRemarks) {
		this.consBookRemarks = consBookRemarks;
	}

	@Column(name = "CONS_BOOKING_AGENCY")
	public Long getConsBookingAgency() {
		return this.consBookingAgency;
	}

	public void setConsBookingAgency(Long consBookingAgency) {
		this.consBookingAgency = consBookingAgency;
	}

	@Column(name = "CONS_BOOKING_AGENCY_NAME")
	public String getConsBookingAgencyName() {
		return this.consBookingAgencyName;
	}

	public void setConsBookingAgencyName(String consBookingAgencyName) {
		this.consBookingAgencyName = consBookingAgencyName;
	}

	@Column(name = "CONS_BOOKING_AGENCY_CONTACT")
	public String getConsBookingAgencyContact() {
		return consBookingAgencyContact;
	}
	public void setConsBookingAgencyContact(String consBookingAgencyContact) {
		this.consBookingAgencyContact = consBookingAgencyContact;
	}

	@Column(name = "CONS_BOOKING_AGENCY_TEL")
	public String getConsBookingAgencyTel() {
		return consBookingAgencyTel;
	}
	public void setConsBookingAgencyTel(String consBookingAgencyTel) {
		this.consBookingAgencyTel = consBookingAgencyTel;
	}
	
	@Column(name = "CONS_BOOKING_AGENCY_SNAME")
	public String getConsBookingAgencySname() {
		return this.consBookingAgencySname;
	}

	public void setConsBookingAgencySname(String consBookingAgencySname) {
		this.consBookingAgencySname = consBookingAgencySname;
	}

	
	@Column(name = "CONS_BOOKING_CONTRACT_NO")
	public String getConsBookingContractNo() {
		return this.consBookingContractNo;
	}

	public void setConsBookingContractNo(String consBookingContractNo) {
		this.consBookingContractNo = consBookingContractNo;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_BOOKING_DATE")
	public Date getConsBookingDate() {
		return this.consBookingDate;
	}

	public void setConsBookingDate(Date consBookingDate) {
		this.consBookingDate = consBookingDate;
	}

	@Column(name = "CONS_BOOKING_DECLARE_NO_US")
	public String getConsBookingDeclareNoUs() {
		return this.consBookingDeclareNoUs;
	}

	public void setConsBookingDeclareNoUs(String consBookingDeclareNoUs) {
		this.consBookingDeclareNoUs = consBookingDeclareNoUs;
	}

	@Column(name = "CONS_CARGO_DESC")
	public String getConsCargoDesc() {
		return this.consCargoDesc;
	}

	public void setConsCargoDesc(String consCargoDesc) {
		this.consCargoDesc = consCargoDesc;
	}
	
	@Column(name = "CONS_CARGO_MARKS")
	public String getConsCargoMarks() {
		return this.consCargoMarks;
	}

	public void setConsCargoMarks(String consCargoMarks) {
		this.consCargoMarks = consCargoMarks;
	}
	
	@Column(name = "CONS_SEND_SINGLE_ADDRESS")
	public String getConsSendSingleAddress() {
		return consSendSingleAddress;
	}

	public void setConsSendSingleAddress(String consSendSingleAddress) {
		this.consSendSingleAddress = consSendSingleAddress;
	}

	@Column(name = "CONS_CARGO_NAME_CN")
	public String getConsCargoNameCn() {
		return this.consCargoNameCn;
	}

	public void setConsCargoNameCn(String consCargoNameCn) {
		this.consCargoNameCn = consCargoNameCn;
	}

	@Column(name = "CONS_CARGO_NAME_EN")
	public String getConsCargoNameEn() {
		return this.consCargoNameEn;
	}

	public void setConsCargoNameEn(String consCargoNameEn) {
		this.consCargoNameEn = consCargoNameEn;
	}

	@Column(name = "CONS_CARGO_OWNER")
	public Long getConsCargoOwner() {
		return this.consCargoOwner;
	}

	public void setConsCargoOwner(Long consCargoOwner) {
		this.consCargoOwner = consCargoOwner;
	}

	@Column(name = "CONS_CARGO_OWNER_NAME")
	public String getConsCargoOwnerName() {
		return this.consCargoOwnerName;
	}

	public void setConsCargoOwnerName(String consCargoOwnerName) {
		this.consCargoOwnerName = consCargoOwnerName;
	}

	@Column(name = "CONS_CARGO_SPECIAL")
	public String getConsCargoSpecial() {
		return this.consCargoSpecial;
	}

	public void setConsCargoSpecial(String consCargoSpecial) {
		this.consCargoSpecial = consCargoSpecial;
	}

	@Column(name = "CONS_CARRIER")
	public Long getConsCarrier() {
		return this.consCarrier;
	}

	public void setConsCarrier(Long consCarrier) {
		this.consCarrier = consCarrier;
	}

	@Column(name = "CONS_CARRIER_NAME")
	public String getConsCarrierName() {
		return this.consCarrierName;
	}

	public void setConsCarrierName(String consCarrierName) {
		this.consCarrierName = consCarrierName;
	}

	@Column(name = "CONS_CARRIER_CODE")
	public String getConsCarrierCode() {
		return this.consCarrierCode;
	}

	public void setConsCarrierCode(String consCarrierCode) {
		this.consCarrierCode = consCarrierCode;
	}
	
	@Column(name = "CONS_CFS")
	public Long getConsCfs() {
		return this.consCfs;
	}

	public void setConsCfs(Long consCfs) {
		this.consCfs = consCfs;
	}

	@Column(name = "CONS_CFS_NAME")
	public String getConsCfsName() {
		return this.consCfsName;
	}

	public void setConsCfsName(String consCfsName) {
		this.consCfsName = consCfsName;
	}

	@Column(name = "CONS_CHARGE_REMARKS")
	public String getConsChargeRemarks() {
		return this.consChargeRemarks;
	}

	public void setConsChargeRemarks(String consChargeRemarks) {
		this.consChargeRemarks = consChargeRemarks;
	}

	@Column(name = "CONS_CONSIGNEE")
	public String getConsConsignee() {
		return this.consConsignee;
	}

	public void setConsConsignee(String consConsignee) {
		this.consConsignee = consConsignee;
	}

	@Column(name = "CONS_CONTAINER_COMPANY")
	public Long getConsContainerCompany() {
		return this.consContainerCompany;
	}

	public void setConsContainerCompany(Long consContainerCompany) {
		this.consContainerCompany = consContainerCompany;
	}

	@Column(name = "CONS_CONTAINER_COMPANY_NAME")
	public String getConsContainerCompanyName() {
		return this.consContainerCompanyName;
	}

	public void setConsContainerCompanyName(String consContainerCompanyName) {
		this.consContainerCompanyName = consContainerCompanyName;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_CONTAINER_LOAD_DATE")
	public Date getConsContainerLoadDate() {
		return this.consContainerLoadDate;
	}

	public void setConsContainerLoadDate(Date consContainerLoadDate) {
		this.consContainerLoadDate = consContainerLoadDate;
	}

	@Column(name = "CONS_CONTAINERS_NO")
	public String getConsContainersNo() {
		return this.consContainersNo;
	}

	public void setConsContainersNo(String consContainersNo) {
		this.consContainersNo = consContainersNo;
	}

	@Column(name = "CONS_CONTAINERS_INFO")
	public String getConsContainersInfo() {
		return this.consContainersInfo;
	}

	public void setConsContainersInfo(String consContainersInfo) {
		this.consContainersInfo = consContainersInfo;
	}

	@Column(name = "CONS_CONTAINERS_TEU")
	public Integer getConsContainersTeu() {
		return this.consContainersTeu;
	}

	public void setConsContainersTeu(Integer consContainersTeu) {
		this.consContainersTeu = consContainersTeu;
	}

	@Column(name = "CONS_CONTRACT_NO")
	public String getConsContractNo() {
		return this.consContractNo;
	}

	public void setConsContractNo(String consContractNo) {
		this.consContractNo = consContractNo;
	}

	@Column(name = "CONS_COPY_BL_NUM")
	public Integer getConsCopyBlNum() {
		return this.consCopyBlNum;
	}

	public void setConsCopyBlNum(Integer consCopyBlNum) {
		this.consCopyBlNum = consCopyBlNum;
	}

	@Column(name = "CONS_CREDIT_NO")
	public String getConsCreditNo() {
		return this.consCreditNo;
	}

	public void setConsCreditNo(String consCreditNo) {
		this.consCreditNo = consCreditNo;
	}

	@Column(name = "CONS_CUDE_TYPE")
	public Byte getConsCudeType() {
		return this.consCudeType;
	}

	public void setConsCudeType(Byte consCudeType) {
		this.consCudeType = consCudeType;
	}

	@Column(name = "CONS_CUSTOMS_VENDOR")
	public Long getConsCustomsVendor() {
		return this.consCustomsVendor;
	}

	public void setConsCustomsVendor(Long consCustomsVendor) {
		this.consCustomsVendor = consCustomsVendor;
	}

	@Column(name = "CONS_CUSTOMS_VENDOR_NAME")
	public String getConsCustomsVendorName() {
		return this.consCustomsVendorName;
	}

	public void setConsCustomsVendorName(String consCustomsVendorName) {
		this.consCustomsVendorName = consCustomsVendorName;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_DATE")
	public Date getConsDate() {
		return this.consDate;
	}

	public void setConsDate(Date consDate) {
		this.consDate = consDate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_DELIVERY_DATE")
	public Date getConsDeliveryDate() {
		return this.consDeliveryDate;
	}

	public void setConsDeliveryDate(Date consDeliveryDate) {
		this.consDeliveryDate = consDeliveryDate;
	}

	@Column(name = "CONS_DELIVERY_PLACE")
	public String getConsDeliveryPlace() {
		return this.consDeliveryPlace;
	}

	public void setConsDeliveryPlace(String consDeliveryPlace) {
		this.consDeliveryPlace = consDeliveryPlace;
	}

	@Column(name = "CONS_DESTINATION")
	public String getConsDestination() {
		return this.consDestination;
	}

	public void setConsDestination(String consDestination) {
		this.consDestination = consDestination;
	}

	@Column(name = "CONS_DO_AGENCY")
	public Long getConsDoAgency() {
		return this.consDoAgency;
	}

	public void setConsDoAgency(Long consDoAgency) {
		this.consDoAgency = consDoAgency;
	}

	@Column(name = "CONS_DO_AGENCY_NAME")
	public String getConsDoAgencyName() {
		return this.consDoAgencyName;
	}

	public void setConsDoAgencyName(String consDoAgencyName) {
		this.consDoAgencyName = consDoAgencyName;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_ETA")
	public Date getConsEta() {
		return this.consEta;
	}

	public void setConsEta(Date consEta) {
		this.consEta = consEta;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_ETD")
	public Date getConsEtd() {
		return this.consEtd;
	}

	public void setConsEtd(Date consEtd) {
		this.consEtd = consEtd;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_EXPIRY_DATE")
	public Date getConsExpiryDate() {
		return this.consExpiryDate;
	}

	public void setConsExpiryDate(Date consExpiryDate) {
		this.consExpiryDate = consExpiryDate;
	}

	@Column(name = "CONS_F_CONSIGNEE")
	public String getConsFConsignee() {
		return this.consFConsignee;
	}

	public void setConsFConsignee(String consFConsignee) {
		this.consFConsignee = consFConsignee;
	}

	@Column(name = "CONS_F_NOTIFY_PARTY")
	public String getConsFNotifyParty() {
		return this.consFNotifyParty;
	}

	public void setConsFNotifyParty(String consFNotifyParty) {
		this.consFNotifyParty = consFNotifyParty;
	}

	@Column(name = "CONS_F_SHIPPER")
	public String getConsFShipper() {
		return this.consFShipper;
	}

	public void setConsFShipper(String consFShipper) {
		this.consFShipper = consFShipper;
	}

	@Column(name = "CONS_FUMIGATE_FLAG")
	public Byte getConsFumigateFlag() {
		return this.consFumigateFlag;
	}

	public void setConsFumigateFlag(Byte consFumigateFlag) {
		this.consFumigateFlag = consFumigateFlag;
	}

	@Column(name = "CONS_HARBOUR")
	public String getConsHarbour() {
		return this.consHarbour;
	}

	public void setConsHarbour(String consHarbour) {
		this.consHarbour = consHarbour;
	}

	@Column(name = "CONS_HBL_NO")
	public String getConsHblNo() {
		return this.consHblNo;
	}

	public void setConsHblNo(String consHblNo) {
		this.consHblNo = consHblNo;
	}

	@Column(name = "CONS_INSPECTION_FLAG")
	public Byte getConsInspectionFlag() {
		return this.consInspectionFlag;
	}

	public void setConsInspectionFlag(Byte consInspectionFlag) {
		this.consInspectionFlag = consInspectionFlag;
	}

	@Column(name = "CONS_INSPECTION_VENDOR")
	public Long getConsInspectionVendor() {
		return this.consInspectionVendor;
	}

	public void setConsInspectionVendor(Long consInspectionVendor) {
		this.consInspectionVendor = consInspectionVendor;
	}

	@Column(name = "CONS_INSPECTION_VENDOR_NAME")
	public String getConsInspectionVendorName() {
		return this.consInspectionVendorName;
	}

	public void setConsInspectionVendorName(String consInspectionVendorName) {
		this.consInspectionVendorName = consInspectionVendorName;
	}

	@Column(name = "CONS_INSURANCE_FEE")
	public String getConsInsuranceFee() {
		return this.consInsuranceFee;
	}

	public void setConsInsuranceFee(String consInsuranceFee) {
		this.consInsuranceFee = consInsuranceFee;
	}

	@Column(name = "CONS_INVOICE_FLAG")
	public Byte getConsInvoiceFlag() {
		return this.consInvoiceFlag;
	}

	public void setConsInvoiceFlag(Byte consInvoiceFlag) {
		this.consInvoiceFlag = consInvoiceFlag;
	}

	@Column(name = "CONS_LCL_TYPE")
	public String getConsLclType() {
		return this.consLclType;
	}

	public void setConsLclType(String consLclType) {
		this.consLclType = consLclType;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_LOAD_DATE")
	public Date getConsLoadDate() {
		return this.consLoadDate;
	}

	public void setConsLoadDate(Date consLoadDate) {
		this.consLoadDate = consLoadDate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_SHIP_DATE")
	public Date getConsShipDate() {
		return this.consShipDate;
	}

	public void setConsShipDate(Date consShipDate) {
		this.consShipDate = consShipDate;
	}
	
	@Column(name = "CONS_MASTER_FLAG")
	public Byte getConsMasterFlag() {
		return this.consMasterFlag;
	}

	public void setConsMasterFlag(Byte consMasterFlag) {
		this.consMasterFlag = consMasterFlag;
	}

	@Column(name = "CONS_MASTER_ID")
	public Long getConsMasterId() {
		return this.consMasterId;
	}

	public void setConsMasterId(Long consMasterId) {
		this.consMasterId = consMasterId;
	}

	@Column(name = "CONS_MASTER_NO")
	public String getConsMasterNo() {
		return this.consMasterNo;
	}

	public void setConsMasterNo(String consMasterNo) {
		this.consMasterNo = consMasterNo;
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

	@Column(name = "CONS_NOTIFY_PARTY")
	public String getConsNotifyParty() {
		return this.consNotifyParty;
	}

	public void setConsNotifyParty(String consNotifyParty) {
		this.consNotifyParty = consNotifyParty;
	}

	@Column(name = "CONS_NOTIFY_PARTY2")
	public String getConsNotifyParty2() {
		return this.consNotifyParty2;
	}

	public void setConsNotifyParty2(String consNotifyParty2) {
		this.consNotifyParty2 = consNotifyParty2;
	}

	@Column(name = "CONS_OPERATOR_ID")
	public Long getConsOperatorId() {
		return this.consOperatorId;
	}

	public void setConsOperatorId(Long consOperatorId) {
		this.consOperatorId = consOperatorId;
	}

	@Column(name = "CONS_OPERATOR_NAME")
	public String getConsOperatorName() {
		return this.consOperatorName;
	}

	public void setConsOperatorName(String consOperatorName) {
		this.consOperatorName = consOperatorName;
	}

	@Column(name = "CONS_ORIGINAL_BL_NUM")
	public String getConsOriginalBlNum() {
		return this.consOriginalBlNum;
	}

	public void setConsOriginalBlNum(String consOriginalBlNum) {
		this.consOriginalBlNum = consOriginalBlNum;
	}

	@Column(name = "CONS_OVERSEA_AGENCY")
	public Long getConsOverseaAgency() {
		return this.consOverseaAgency;
	}

	public void setConsOverseaAgency(Long consOverseaAgency) {
		this.consOverseaAgency = consOverseaAgency;
	}

	@Column(name = "CONS_OVERSEA_AGENCY_NAME")
	public String getConsOverseaAgencyName() {
		return this.consOverseaAgencyName;
	}

	public void setConsOverseaAgencyName(String consOverseaAgencyName) {
		this.consOverseaAgencyName = consOverseaAgencyName;
	}

	@Column(name = "CONS_PAID_AT")
	public String getConsPaidAt() {
		return this.consPaidAt;
	}

	public void setConsPaidAt(String consPaidAt) {
		this.consPaidAt = consPaidAt;
	}

	@Column(name = "CONS_PARTIAL_FLAG")
	public Byte getConsPartialFlag() {
		return this.consPartialFlag;
	}

	public void setConsPartialFlag(Byte consPartialFlag) {
		this.consPartialFlag = consPartialFlag;
	}

	@Column(name = "CONS_POD_EN")
	public String getConsPodEn() {
		return this.consPodEn;
	}

	public void setConsPodEn(String consPodEn) {
		this.consPodEn = consPodEn;
	}

	@Column(name = "CONS_POD_CODE")
	public String getConsPodCode() {
		return this.consPodCode;
	}

	public void setConsPodCode(String consPodCode) {
		this.consPodCode = consPodCode;
	}
	
	@Column(name = "CONS_POL_EN")
	public String getConsPolEn() {
		return this.consPolEn;
	}

	public void setConsPolEn(String consPolEn) {
		this.consPolEn = consPolEn;
	}

	@Column(name = "CONS_POL_CODE")
	public String getConsPolCode() {
		return this.consPolCode;
	}

	public void setConsPolCode(String consPolCode) {
		this.consPolCode = consPolCode;
	}
	
	@Column(name = "CONS_POT_EN")
	public String getConsPotEn() {
		return this.consPotEn;
	}

	public void setConsPotEn(String consPotEn) {
		this.consPotEn = consPotEn;
	}

	@Column(name = "CONS_PACKING_LIST_NO")
	public String getConsPackingListNo() {
		return consPackingListNo;
	}
	public void setConsPackingListNo(String consPackingListNo) {
		this.consPackingListNo = consPackingListNo;
	}
	
	@Column(name = "CONS_BVESSEL")
	public String getConsBVessel() {
		return consBVessel;
	}
	public void setConsBVessel(String consBVessel) {
		this.consBVessel = consBVessel;
	}

	@Column(name = "CONS_BVOYAGE")
	public String getConsBVoyage() {
		return consBVoyage;
	}
	public void setConsBVoyage(String consBVoyage) {
		this.consBVoyage = consBVoyage;
	}
	
	@Column(name = "CONS_BPODEN")
	public String getConsBPodEn() {
		return consBPodEn;
	}
	public void setConsBPodEn(String consBPodEn) {
		this.consBPodEn = consBPodEn;
	}
	
	@Column(name = "CONS_POT_CODE")
	public String getConsPotCode() {
		return this.consPotCode;
	}

	public void setConsPotCode(String consPotCode) {
		this.consPotCode = consPotCode;
	}
	
	@Column(name = "CONS_PRECARRIAGE")
	public String getConsPrecarriage() {
		return this.consPrecarriage;
	}

	public void setConsPrecarriage(String consPrecarriage) {
		this.consPrecarriage = consPrecarriage;
	}

	@Column(name = "CONS_QUARANTINE_FLAG")
	public Byte getConsQuarantineFlag() {
		return this.consQuarantineFlag;
	}

	public void setConsQuarantineFlag(Byte consQuarantineFlag) {
		this.consQuarantineFlag = consQuarantineFlag;
	}

	@Column(name = "CONS_RECEIPT_PLACE")
	public String getConsReceiptPlace() {
		return this.consReceiptPlace;
	}

	public void setConsReceiptPlace(String consReceiptPlace) {
		this.consReceiptPlace = consReceiptPlace;
	}

	@Column(name = "CONS_REF_NO")
	public String getConsRefNo() {
		return this.consRefNo;
	}

	public void setConsRefNo(String consRefNo) {
		this.consRefNo = consRefNo;
	}

	@Column(name = "CONS_REMARKS")
	public String getConsRemarks() {
		return this.consRemarks;
	}

	public void setConsRemarks(String consRemarks) {
		this.consRemarks = consRemarks;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_SAIL_DATE")
	public Date getConsSailDate() {
		return this.consSailDate;
	}

	public void setConsSailDate(Date consSailDate) {
		this.consSailDate = consSailDate;
	}

	@Column(name = "CONS_SALES_REP_ID")
	public Long getConsSalesRepId() {
		return this.consSalesRepId;
	}

	public void setConsSalesRepId(Long consSalesRepId) {
		this.consSalesRepId = consSalesRepId;
	}

	@Column(name = "CONS_SALES_REP_NAME")
	public String getConsSalesRepName() {
		return this.consSalesRepName;
	}

	public void setConsSalesRepName(String consSalesRepName) {
		this.consSalesRepName = consSalesRepName;
	}

	@Column(name = "CONS_SCAC_CODE")
	public String getConsScacCode() {
		return this.consScacCode;
	}

	public void setConsScacCode(String consScacCode) {
		this.consScacCode = consScacCode;
	}

	@Column(name = "CONS_SEAL_NO")
	public String getConsSealNo() {
		return this.consSealNo;
	}

	public void setConsSealNo(String consSealNo) {
		this.consSealNo = consSealNo;
	}

	@Column(name = "CONS_SERVICE_REQUIRED")
	public String getConsServiceRequired() {
		return this.consServiceRequired;
	}

	public void setConsServiceRequired(String consServiceRequired) {
		this.consServiceRequired = consServiceRequired;
	}

	@Column(name = "CONS_SERVICE_SPEC")
	public String getConsServiceSpec() {
		return this.consServiceSpec;
	}

	public void setConsServiceSpec(String consServiceSpec) {
		this.consServiceSpec = consServiceSpec;
	}

	@Column(name = "CONS_SHIP_CODE")
	public String getConsShipCode() {
		return this.consShipCode;
	}

	public void setConsShipCode(String consShipCode) {
		this.consShipCode = consShipCode;
	}

	@Column(name = "CONS_SHIP_TYPE")
	public String getConsShipType() {
		return this.consShipType;
	}

	public void setConsShipType(String consShipType) {
		this.consShipType = consShipType;
	}
	
	@Column(name = "CONS_SHIPPER")
	public String getConsShipper() {
		return this.consShipper;
	}

	public void setConsShipper(String consShipper) {
		this.consShipper = consShipper;
	}

	@Column(name = "CONS_SO_NO")
	public String getConsSoNo() {
		return this.consSoNo;
	}

	public void setConsSoNo(String consSoNo) {
		this.consSoNo = consSoNo;
	}

	@Column(name = "CONS_SOURCE")
	public String getConsSource() {
		return this.consSource;
	}

	public void setConsSource(String consSource) {
		this.consSource = consSource;
	}

	@Column(name = "CONS_SPLIT_CONSIGNEE")
	public String getConsSplitConsignee() {
		return this.consSplitConsignee;
	}

	public void setConsSplitConsignee(String consSplitConsignee) {
		this.consSplitConsignee = consSplitConsignee;
	}

	@Column(name = "CONS_SPLIT_CONSIGNEE_TEL")
	public String getConsSplitConsigneeTel() {
		return this.consSplitConsigneeTel;
	}

	public void setConsSplitConsigneeTel(String consSplitConsigneeTel) {
		this.consSplitConsigneeTel = consSplitConsigneeTel;
	}

	@Column(name = "CONS_SPLIT_CONTACT")
	public String getConsSplitContact() {
		return this.consSplitContact;
	}

	public void setConsSplitContact(String consSplitContact) {
		this.consSplitContact = consSplitContact;
	}

	@Column(name = "CONS_SPLIT_NO")
	public String getConsSplitNo() {
		return this.consSplitNo;
	}

	public void setConsSplitNo(String consSplitNo) {
		this.consSplitNo = consSplitNo;
	}

	@Column(name = "CONS_SPLIT_TEL")
	public String getConsSplitTel() {
		return this.consSplitTel;
	}

	public void setConsSplitTel(String consSplitTel) {
		this.consSplitTel = consSplitTel;
	}

	@Column(name = "CONS_STATUS")
	public Byte getConsStatus() {
		return this.consStatus;
	}

	public void setConsStatus(Byte consStatus) {
		this.consStatus = consStatus;
	}

	@Column(name = "CONS_STATUS_AP")
	public Byte getConsStatusAp() {
		return this.consStatusAp;
	}

	public void setConsStatusAp(Byte consStatusAp) {
		this.consStatusAp = consStatusAp;
	}

	@Column(name = "CONS_STATUS_AR")
	public Byte getConsStatusAr() {
		return this.consStatusAr;
	}

	public void setConsStatusAr(Byte consStatusAr) {
		this.consStatusAr = consStatusAr;
	}

	@Column(name = "CONS_STATUS_AUD")
	public Byte getConsStatusAud() {
		return this.consStatusAud;
	}

	public void setConsStatusAud(Byte consStatusAud) {
		this.consStatusAud = consStatusAud;
	}

	@Column(name = "CONS_STATUS_EXP")
	public Byte getConsStatusExp() {
		return this.consStatusExp;
	}

	public void setConsStatusExp(Byte consStatusExp) {
		this.consStatusExp = consStatusExp;
	}

	@Column(name = "CONS_STATUS_INVO_P")
	public Byte getConsStatusInvoP() {
		return this.consStatusInvoP;
	}

	public void setConsStatusInvoP(Byte consStatusInvoP) {
		this.consStatusInvoP = consStatusInvoP;
	}

	@Column(name = "CONS_STATUS_INVO_R")
	public Byte getConsStatusInvoR() {
		return this.consStatusInvoR;
	}

	public void setConsStatusInvoR(Byte consStatusInvoR) {
		this.consStatusInvoR = consStatusInvoR;
	}

	@Column(name = "CONS_STATUS_LOCK")
	public Byte getConsStatusLock() {
		return this.consStatusLock;
	}

	public void setConsStatusLock(Byte consStatusLock) {
		this.consStatusLock = consStatusLock;
	}

	@Column(name = "CONS_TOTAL_CHARGE_WEIGHT")
	public Double getConsTotalChargeWeight() {
		return this.consTotalChargeWeight;
	}

	public void setConsTotalChargeWeight(Double consTotalChargeWeight) {
		this.consTotalChargeWeight = consTotalChargeWeight;
	}
	
	@Column(name = "CONS_BULKY_CARRIER")
	public Double getConsBulkyCarrier() {
		return this.consBulkyCarrier;
	}

	public void setConsBulkyCarrier(Double consBulkyCarrier) {
		this.consBulkyCarrier = consBulkyCarrier;
	}
	
	@Column(name = "CONS_BULKY_CUSTOMER")
	public Double getConsBulkyCustomer() {
		return this.consBulkyCustomer;
	}

	public void setConsBulkyCustomer(Double consBulkyCustomer) {
		this.consBulkyCustomer = consBulkyCustomer;
	}
	
	@Column(name = "CONS_CHARGE_WEIGHT_CARRIER")
	public Double getConsChargeWeightCarrier() {
		return this.consChargeWeightCarrier;
	}

	public void setConsChargeWeightCarrier(Double consChargeWeightCarrier) {
		this.consChargeWeightCarrier = consChargeWeightCarrier;
	}
	
	@Column(name = "CONS_CHARGE_WEIGHT_CUSTOMER")
	public Double getConsChargeWeightCustomer() {
		return this.consChargeWeightCustomer;
	}

	public void setConsChargeWeightCustomer(Double consChargeWeightCustomer) {
		this.consChargeWeightCustomer = consChargeWeightCustomer;
	}
	
	@Column(name = "CONS_TOTAL_GROSS_WEIGHT_CUSTOMER")
	public Double getConsTotalGrossWeightCustomer() {
		return this.consTotalGrossWeightCustomer;
	}

	public void setConsTotalGrossWeightCustomer(Double consTotalGrossWeightCustomer) {
		this.consTotalGrossWeightCustomer = consTotalGrossWeightCustomer;
	}
	
	@Column(name = "CONS_TOTAL_MEASUREMENT_CUSTOMER")
	public Double getConsTotalMeasurementCustomer() {
		return this.consTotalMeasurementCustomer;
	}

	public void setConsTotalMeasurementCustomer(Double consTotalMeasurementCustomer) {
		this.consTotalMeasurementCustomer = consTotalMeasurementCustomer;
	}
	
	@Column(name = "CONS_TOTAL_CONTAINERS")
	public Integer getConsTotalContainers() {
		return this.consTotalContainers;
	}

	public void setConsTotalContainers(Integer consTotalContainers) {
		this.consTotalContainers = consTotalContainers;
	}

	@Column(name = "CONS_TOTAL_GROSS_WEIGHT")
	public Double getConsTotalGrossWeight() {
		return this.consTotalGrossWeight;
	}

	public void setConsTotalGrossWeight(Double consTotalGrossWeight) {
		this.consTotalGrossWeight = consTotalGrossWeight;
	}

	@Column(name = "CONS_TOTAL_MEASUREMENT")
	public Double getConsTotalMeasurement() {
		return this.consTotalMeasurement;
	}

	public void setConsTotalMeasurement(Double consTotalMeasurement) {
		this.consTotalMeasurement = consTotalMeasurement;
	}

	@Column(name = "CONS_TOTAL_NET_WEIGHT")
	public Double getConsTotalNetWeight() {
		return this.consTotalNetWeight;
	}

	public void setConsTotalNetWeight(Double consTotalNetWeight) {
		this.consTotalNetWeight = consTotalNetWeight;
	}

	@Column(name = "CONS_TOTAL_PACKAGES")
	public Integer getConsTotalPackages() {
		return this.consTotalPackages;
	}

	public void setConsTotalPackages(Integer consTotalPackages) {
		this.consTotalPackages = consTotalPackages;
	}

	@Column(name = "CONS_TOTAL_PACKAGES_IN_WORD")
	public String getConsTotalPackagesInWord() {
		return this.consTotalPackagesInWord;
	}

	public void setConsTotalPackagesInWord(String consTotalPackagesInWord) {
		this.consTotalPackagesInWord = consTotalPackagesInWord;
	}

	@Column(name = "CONS_TRACK_CONTACT")
	public String getConsTrackContact() {
		return this.consTrackContact;
	}

	public void setConsTrackContact(String consTrackContact) {
		this.consTrackContact = consTrackContact;
	}

	@Column(name = "CONS_LOAD_ADDRESS")
	public String getConsLoadAddress() {
		return this.consLoadAddress;
	}

	public void setConsLoadAddress(String consLoadAddress) {
		this.consLoadAddress = consLoadAddress;
	}

	@Column(name = "CONS_LOAD_REMARKS")
	public String getConsLoadRemarks() {
		return this.consLoadRemarks;
	}

	public void setConsLoadRemarks(String consLoadRemarks) {
		this.consLoadRemarks = consLoadRemarks;
	}

	@Column(name = "CONS_TRACK_TEL")
	public String getConsTrackTel() {
		return this.consTrackTel;
	}

	public void setConsTrackTel(String consTrackTel) {
		this.consTrackTel = consTrackTel;
	}

	@Column(name = "CONS_LOAD_TEL")
	public String getConsLoadTel() {
		return this.consLoadTel;
	}

	public void setConsLoadTel(String consLoadTel) {
		this.consLoadTel = consLoadTel;
	}
	
	@Column(name = "CONS_LOAD_CONTACT")
	public String getConsLoadContact() {
		return this.consLoadContact;
	}

	public void setConsLoadContact(String consLoadContact) {
		this.consLoadContact = consLoadContact;
	}
	
	@Column(name = "CONS_LOAD_FACTORY")
	public String getConsLoadFactory() {
		return this.consLoadFactory;
	}

	public void setConsLoadFactory(String consLoadFactory) {
		this.consLoadFactory = consLoadFactory;
	}
	
	@Column(name = "CONS_TRACK_VENDOR")
	public Long getConsTrackVendor() {
		return this.consTrackVendor;
	}

	public void setConsTrackVendor(Long consTrackVendor) {
		this.consTrackVendor = consTrackVendor;
	}

	@Column(name = "CONS_TRACK_VENDOR_NAME")
	public String getConsTrackVendorName() {
		return this.consTrackVendorName;
	}

	public void setConsTrackVendorName(String consTrackVendorName) {
		this.consTrackVendorName = consTrackVendorName;
	}

	@Column(name = "CONS_TRADE_COUNTRY")
	public String getConsTradeCountry() {
		return this.consTradeCountry;
	}

	public void setConsTradeCountry(String consTradeCountry) {
		this.consTradeCountry = consTradeCountry;
	}

	@Column(name = "CONS_TRAN_COUNTRY")
	public String getConsTranCountry() {
		return this.consTranCountry;
	}

	public void setConsTranCountry(String consTranCountry) {
		this.consTranCountry = consTranCountry;
	}

	@Column(name = "CONS_TRANS_FLAG")
	public Byte getConsTransFlag() {
		return this.consTransFlag;
	}

	public void setConsTransFlag(Byte consTransFlag) {
		this.consTransFlag = consTransFlag;
	}

	@Column(name = "CONS_TRANSFERRING_FLAG")
	public Byte getConsTransferringFlag() {
		return this.consTransferringFlag;
	}
	public void setConsTransferringFlag(Byte consTransferringFlag) {
		this.consTransferringFlag = consTransferringFlag;
	}
	
	@Column(name = "CONS_SHUTOUT_FLAG")
	public Byte getConsShutoutFlag() {
		return consShutoutFlag;
	}
	public void setConsShutoutFlag(Byte consShutoutFlag) {
		this.consShutoutFlag = consShutoutFlag;
	}

	@Column(name = "CONS_US_FULL_SHIP")
	public Byte getConsUsFullShip() {
		return this.consUsFullShip;
	}

	public void setConsUsFullShip(Byte consUsFullShip) {
		this.consUsFullShip = consUsFullShip;
	}
	
	@Column(name = "CONS_WAREHOUSE_NO")
	public String getConsWarehouseNo() {
		return consWarehouseNo;
	}

	public void setConsWarehouseNo(String consWarehouseNo) {
		this.consWarehouseNo = consWarehouseNo;
	}

	@Column(name = "CONS_WAREHOUSE")
	public Long getConsWarehouse() {
		return this.consWarehouse;
	}

	public void setConsWarehouse(Long consWarehouse) {
		this.consWarehouse = consWarehouse;
	}

	@Column(name = "CONS_WAREHOUSE_ADDRESS")
	public String getConsWarehouseAddress() {
		return this.consWarehouseAddress;
	}

	public void setConsWarehouseAddress(String consWarehouseAddress) {
		this.consWarehouseAddress = consWarehouseAddress;
	}

	@Column(name = "CONS_WAREHOUSE_CONTACT")
	public String getConsWarehouseContact() {
		return this.consWarehouseContact;
	}

	public void setConsWarehouseContact(String consWarehouseContact) {
		this.consWarehouseContact = consWarehouseContact;
	}

	@Column(name = "CONS_WAREHOUSE_NAME")
	public String getConsWarehouseName() {
		return this.consWarehouseName;
	}

	public void setConsWarehouseName(String consWarehouseName) {
		this.consWarehouseName = consWarehouseName;
	}

	@Column(name = "CONS_WAREHOUSE_REMARKS")
	public String getConsWarehouseRemarks() {
		return this.consWarehouseRemarks;
	}

	public void setConsWarehouseRemarks(String consWarehouseRemarks) {
		this.consWarehouseRemarks = consWarehouseRemarks;
	}

	@Column(name = "CONS_WAREHOUSE_TEL")
	public String getConsWarehouseTel() {
		return this.consWarehouseTel;
	}

	public void setConsWarehouseTel(String consWarehouseTel) {
		this.consWarehouseTel = consWarehouseTel;
	}

	@Column(name = "CONS_WS_ACCEPT_FLAG")
	public Byte getConsWsAcceptFlag() {
		return this.consWsAcceptFlag;
	}

	public void setConsWsAcceptFlag(Byte consWsAcceptFlag) {
		this.consWsAcceptFlag = consWsAcceptFlag;
	}

	@Column(name = "CONS_WS_FLAG")
	public Byte getConsWsFlag() {
		return this.consWsFlag;
	}

	public void setConsWsFlag(Byte consWsFlag) {
		this.consWsFlag = consWsFlag;
	}

	@Column(name = "CONS_VERIFICATION_FLAG")
	public Byte getConsVerificationFlag() {
		return this.consVerificationFlag;
	}

	public void setConsVerificationFlag(Byte consVerificationFlag) {
		this.consVerificationFlag = consVerificationFlag;
	}
	
	@Column(name = "CONS_EXTERNAL_FLAG")
	public Byte getConsExternalFlag() {
		return this.consExternalFlag;
	}

	public void setConsExternalFlag(Byte consExternalFlag) {
		this.consExternalFlag = consExternalFlag;
	}
	
	@Column(name = "CONS_VERIFICATION_NO")
	public String getConsVerification() {
		return this.consVerificationNo;
	}

	public void setConsVerification(String consVerificationNo) {
		this.consVerificationNo = consVerificationNo;
	}	
	
	@Column(name = "CUST_CONTACT")
	public String getCustContact() {
		return this.custContact;
	}

	public void setCustContact(String custContact) {
		this.custContact = custContact;
	}

	@Column(name = "CUST_FAX")
	public String getCustFax() {
		return this.custFax;
	}

	public void setCustFax(String custFax) {
		this.custFax = custFax;
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

	@Column(name = "CUST_SALES_ID")
	public Integer getCustSalesId() {
		return this.custSalesId;
	}

	public void setCustSalesId(Integer custSalesId) {
		this.custSalesId = custSalesId;
	}

	@Column(name = "CUST_SALES_NAME")
	public String getCustSalesName() {
		return this.custSalesName;
	}

	public void setCustSalesName(String custSalesName) {
		this.custSalesName = custSalesName;
	}

	@Column(name = "CUST_SNAME")
	public String getCustSname() {
		return this.custSname;
	}

	public void setCustSname(String custSname) {
		this.custSname = custSname;
	}

	@Column(name = "CUST_TEL")
	public String getCustTel() {
		return this.custTel;
	}

	public void setCustTel(String custTel) {
		this.custTel = custTel;
	}

	@Column(name = "GROU_ID")
	public Long getGrouId() {
		return this.grouId;
	}

	public void setGrouId(Long grouId) {
		this.grouId = grouId;
	}

	@Column(name = "GROU_NAME")
	public String getGrouName() {
		return this.grouName;
	}

	public void setGrouName(String grouName) {
		this.grouName = grouName;
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

	@Column(name = "PATE_CODE")
	public String getPateCode() {
		return this.pateCode;
	}

	public void setPateCode(String pateCode) {
		this.pateCode = pateCode;
	}

	@Column(name = "PATE_CODE_CARRIER")
	public String getPateCodeCarrier() {
		return this.pateCodeCarrier;
	}

	public void setPateCodeCarrier(String pateCodeCarrier) {
		this.pateCodeCarrier = pateCodeCarrier;
	}

	@Column(name = "SHLI_CODE")
	public String getShliCode() {
		return this.shliCode;
	}

	public void setShliCode(String shliCode) {
		this.shliCode = shliCode;
	}

	@Column(name = "SHLI_ID")
	public Integer getShliId() {
		return this.shliId;
	}

	public void setShliId(Integer shliId) {
		this.shliId = shliId;
	}

	@Column(name = "SWITH_ID")
	public Integer getSwithId() {
		return this.swithId;
	}

	public void setSwithId(Integer swithId) {
		this.swithId = swithId;
	}

	@Column(name = "TRAN_CODE")
	public String getTranCode() {
		return this.tranCode;
	}

	public void setTranCode(String tranCode) {
		this.tranCode = tranCode;
	}

	@Column(name = "TRAN_CODE_CARRIER")
	public String getTranCodeCarrier() {
		return this.tranCodeCarrier;
	}

	public void setTranCodeCarrier(String tranCodeCarrier) {
		this.tranCodeCarrier = tranCodeCarrier;
	}

	@Column(name = "TRTE_NAME")
	public String getTrteName() {
		return this.trteName;
	}

	public void setTrteName(String trteName) {
		this.trteName = trteName;
	}

	@Column(name = "TRTY_NAME")
	public String getTrtyName() {
		return this.trtyName;
	}

	public void setTrtyName(String trtyName) {
		this.trtyName = trtyName;
	}

	@Column(name = "UNIT_CODE")
	public String getUnitCode() {
		return this.unitCode;
	}

	public void setUnitCode(String unitCode) {
		this.unitCode = unitCode;
	}

	@Column(name = "UNIT_CODE_CARRIER")
	public String getUnitCodeCarrier() {
		return this.unitCodeCarrier;
	}

	public void setUnitCodeCarrier(String unitCodeCarrier) {
		this.unitCodeCarrier = unitCodeCarrier;
	}

	@Column(name = "VESS_NAME")
	public String getVessName() {
		return this.vessName;
	}

	public void setVessName(String vessName) {
		this.vessName = vessName;
	}

	@Column(name = "VESS_NAME_CN")
	public String getVessNameCn() {
		return this.vessNameCn;
	}

	public void setVessNameCn(String vessNameCn) {
		this.vessNameCn = vessNameCn;
	}

	
	@Column(name = "VOYA_NAME")
	public String getVoyaName() {
		return this.voyaName;
	}

	public void setVoyaName(String voyaName) {
		this.voyaName = voyaName;
	}

	@Column(name = "WCON_ID")
	public Long getWconId() {
		return this.wconId;
	}

	public void setWconId(Long wconId) {
		this.wconId = wconId;
	}

	@Column(name = "CONS_COMPANY")
	public String getConsCompany() {
		return this.consCompany;
	}

	public void setConsCompany(String consCompany) {
		this.consCompany = consCompany;
	}
	
	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_CLOSE_DATE")
	public Date getConsCloseDate() {
		return this.consCloseDate;
	}

	public void setConsCloseDate(Date consCloseDate) {
		this.consCloseDate = consCloseDate;
	}
	
	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_CUSTOMS_DECLAR_DATE")
	public Date getConsCustomsDeclarDate() {
		return this.consCustomsDeclarDate;
	}

	public void setConsCustomsDeclarDate(Date consCustomsDeclarDate) {
		this.consCustomsDeclarDate = consCustomsDeclarDate;
	}
	
	@Column(name = "CONS_CUSTOMS_DECLAR_TIME")
	public String getConsCustomsDeclarTime() {
		return consCustomsDeclarTime;
	}

	public void setConsCustomsDeclarTime(String consCustomsDeclarTime) {
		this.consCustomsDeclarTime = consCustomsDeclarTime;
	}
	
	@Column(name = "CONS_CUSTOMS_DECLARATION_NO")
	public String getConsCustomsDeclarationNo() {
		return this.consCustomsDeclarationNo;
	}

	public void setConsCustomsDeclarationNo(String consCustomsDeclarationNo) {
		this.consCustomsDeclarationNo = consCustomsDeclarationNo;
	}
	
	@Transient
	public Double getSumR() {
		return sumR;
	}

	public void setSumR(Double sumR) {
		this.sumR = sumR;
	}

	@Transient
	public Double getSumP() {
		return sumP;
	}

	public void setSumP(Double sumP) {
		this.sumP = sumP;
	}

	@Transient
	public Double getGrossProfit() {
		return grossProfit;
	}

	public void setGrossProfit(Double grossProfit) {
		this.grossProfit = grossProfit;
	}

	@Transient
	public String getGrossProfitRate() {
		return grossProfitRate;
	}

	public void setGrossProfitRate(String grossProfitRate) {
		this.grossProfitRate = grossProfitRate;
	}

	@Transient
	public Double getSumRUsd() {
		return sumRUsd;
	}

	public void setSumRUsd(Double sumRUsd) {
		this.sumRUsd = sumRUsd;
	}

	@Transient
	public Double getSumRCny() {
		return sumRCny;
	}

	public void setSumRCny(Double sumRCny) {
		this.sumRCny = sumRCny;
	}
	
	@Transient
	public Double getSumROther() {
		return sumROther;
	}

	public void setSumROther(Double sumROther) {
		this.sumROther = sumROther;
	}
	
	@Transient
	public Double getCnyGrossProfit() {
		return this.sumRCny - this.sumPCny;
	}

	public void setCnyGrossProfit(Double cnyGrossProfit) {
		this.cnyGrossProfit = cnyGrossProfit;
	}
	
	@Transient
	public Double getUsdGrossProfit() {
		return sumRUsd - sumPUsd;
	}

	public void setUsdGrossProfit(Double usdGrossProfit) {
		this.usdGrossProfit = usdGrossProfit;
	}
	
	@Transient
	public Double getOtherGrossProfit() {
		return this.otherGrossProfit;
	}

	public void setOtherGrossProfit(Double otherGrossProfit) {
		this.otherGrossProfit = otherGrossProfit;
	}
	
	
	
	@Transient
	public Double getSumPUsd() {
		return sumPUsd;
	}

	public void setSumPUsd(Double sumPUsd) {
		this.sumPUsd = sumPUsd;
	}

	@Transient
	public Double getSumPCny() {
		return sumPCny;
	}

	public void setSumPCny(Double sumPCny) {
		this.sumPCny = sumPCny;
	}

	@Transient
	public Double getSumPOther() {
		return sumPOther;
	}

	public void setSumPOther(Double sumPOther) {
		this.sumPOther = sumPOther;
	}
	
	@Transient
	public Double getSumRUsdInvoice() {
		return sumRUsdInvoice;
	}

	public void setSumRUsdInvoice(Double sumRUsdInvoice) {
		this.sumRUsdInvoice = sumRUsdInvoice;
	}

	@Transient
	public Double getSumRCnyInvoice() {
		return sumRCnyInvoice;
	}

	public void setSumRCnyInvoice(Double sumRCnyInvoice) {
		this.sumRCnyInvoice = sumRCnyInvoice;
	}

	@Transient
	public Double getSumPUsdInvoice() {
		return sumPUsdInvoice;
	}

	public void setSumPUsdInvoice(Double sumPUsdInvoice) {
		this.sumPUsdInvoice = sumPUsdInvoice;
	}

	@Transient
	public Double getSumPCnyInvoice() {
		return sumPCnyInvoice;
	}

	public void setSumPCnyInvoice(Double sumPCnyInvoice) {
		this.sumPCnyInvoice = sumPCnyInvoice;
	}

	@Transient
	public Double getSumRUsdWriteOff() {
		return sumRUsdWriteOff;
	}

	public void setSumRUsdWriteOff(Double sumRUsdWriteOff) {
		this.sumRUsdWriteOff = sumRUsdWriteOff;
	}

	@Transient
	public Double getSumRCnyWriteOff() {
		return sumRCnyWriteOff;
	}

	public void setSumRCnyWriteOff(Double sumRCnyWriteOff) {
		this.sumRCnyWriteOff = sumRCnyWriteOff;
	}

	@Transient
	public Double getSumPUsdWriteOff() {
		return sumPUsdWriteOff;
	}

	public void setSumPUsdWriteOff(Double sumPUsdWriteOff) {
		this.sumPUsdWriteOff = sumPUsdWriteOff;
	}

	@Transient
	public Double getSumPCnyWriteOff() {
		return sumPCnyWriteOff;
	}

	public void setSumPCnyWriteOff(Double sumPCnyWriteOff) {
		this.sumPCnyWriteOff = sumPCnyWriteOff;
	}

	@Transient
	public String getClassType() {
		String s = getConsBizType();
		if (Constants.CONS_BIZ_TYPE_MARINE.equals(getConsBizType())
				&& Constants.CONS_SHIP_TYPE_LCL.equals(getConsShipType())) {
			s = Constants.CONS_NO_LCL;
		}
		return s;
	}

	@Transient
	public Short getEditable() {
		return editable;
	}

	public void setEditable(Short editable) {
		this.editable = editable;
	}

	@Transient
	public Double getVWeight() {
		return vWeight;
	}

	public void setVWeight(Double vWeight) {
		this.vWeight = vWeight;
	}

	@Transient
	public Double getVMeasurement() {
		return vMeasurement;
	}

	public void setVMeasurement(Double vMeasurement) {
		this.vMeasurement = vMeasurement;
	}
	
	@Transient
	public String getVCustName() {
		return vCustName;
	}

	public void setVCustName(String vCustName) {
		this.vCustName = vCustName;
	}

}
