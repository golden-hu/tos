package com.hitisoft.fos.ffop.entity;

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
@Table(name = "F_INSPECTION")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FInspection extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -6101790072908885458L;
	private String consNo;
	private String consBizClass;
	private String consBizType;
	private Date consDate;
	private Integer oriConsId;
	private String oriConsNo;
	private Integer custId;
	private String custName;
	private String custContact;
	private String custTel;
	private String custFax;
	private Integer salesRepId;
	private String salesRepName;
	private Integer operatorId;
	private String operatorName;
	private Integer grouId;
	private String grouName;
	private String cargoName;
	private String otherDocs;
	private String inspAttachedDocs;
	private String inspRequirement;
	private String remarks;
	private Date docReceivedDate;
	private Byte contractReceived;
	private Byte invoiceReceived;
	private Byte packingListReceived;
	private Byte licenceReceived;
	private Byte creditReceived;
	private Byte blReceived;
	private Byte factoryInspReceived;
	private Byte packagesInspReceived;
	
	private Byte qualityRequired;
	private Byte weightRequired;
	private Byte quantityRequired;
	private Byte veterinaryRequired;
	private Byte healthRequired;
	private Byte sanitationRequired;
	private Byte animalRequired;
	
	private String inspCargoAddress;
	private String inspCargoName;
	private String inspCertificateNo;
	private Byte inspCheckFlag;
	private Date inspClaimDate;
	private Date inspCompleteDate;
	private String inspConsigneeCn;
	private String inspConsigneeEn;
	private String inspContainerInfo;
	private String inspContractNo;
	private String inspConveyance;
	private String inspCreditNo;
	private Date inspDate;
	private String inspHsNo;
	private String inspMadeIn;
	private String inspMarks;
	private String inspNo;
	private String inspNoteNo;
	private String inspNum;
	private String inspPackages;
	private String inspPassNo;
	private String inspPod;
	private String inspPol;
	private String inspPot;
	private Date inspReceiveDate;
	private String inspReceiver;
	private String inspRefNo;
	private String inspRegisterNo;
	private String inspRemarks;
	private String inspShipperCn;
	private String inspShipperEn;
	private Date inspShippingDate;
	private String inspSpecialTerm;
	private Date inspStartDate;
	private Byte inspStatus;
	private String inspTradeCountry;
	private String inspTradeType;
	private String inspUsage;
	private String inspValue;
	private String inspVendorContact;
	private Integer inspVendorId;
	private String inspVendorName;
	private String inspVendorTel;
	private String inspVendorFax;
	
	public FInspection() {
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_DATE")
	public Date getConsDate() {
		return this.consDate;
	}

	public void setConsDate(Date consDate) {
		this.consDate = consDate;
	}
	
	@Column(name = "ORI_CONS_ID")
	public Integer getOriConsId() {
		return this.oriConsId;
	}

	public void setOriConsId(Integer oriConsId) {
		this.oriConsId = oriConsId;
	}

	@Column(name = "ORI_CONS_NO")
	public String getOriConsNo() {
		return this.oriConsNo;
	}

	public void setOriConsNo(String oriConsNo) {
		this.oriConsNo = oriConsNo;
	}

	@Column(name = "CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Column(name = "CONS_BIZ_CLASS")
	public String getConsBizClass() {
		return this.consBizClass;
	}

	public void setConsBizClass(String consBizClass) {
		this.consBizClass = consBizClass;
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

	@Column(name = "CUST_CONTACT")
	public String getCustContact() {
		return this.custContact;
	}

	public void setCustContact(String custContact) {
		this.custContact = custContact;
	}

	@Column(name = "CUST_TEL")
	public String getCustTel() {
		return this.custTel;
	}

	public void setCustTel(String custTel) {
		this.custTel = custTel;
	}
	
	@Column(name = "CUST_FAX")
	public String getCustFax() {
		return this.custFax;
	}

	public void setCustFax(String custFax) {
		this.custFax = custFax;
	}
	
	@Column(name = "SALES_REP_ID")
	public Integer getSalesRepId() {
		return this.salesRepId;
	}

	public void setSalesRepId(Integer salesRepId) {
		this.salesRepId = salesRepId;
	}
	
	@Column(name = "SALES_REP_NAME")
	public String getSalesRepName() {
		return this.salesRepName;
	}

	public void setSalesRepName(String salesRepName) {
		this.salesRepName = salesRepName;
	}
	
	@Column(name = "OPERATOR_ID")
	public Integer getOperatorId() {
		return this.operatorId;
	}

	public void setOperatorId(Integer operatorId) {
		this.operatorId = operatorId;
	}
	
	@Column(name = "OPERATOR_NAME")
	public String getOperatorName() {
		return this.operatorName;
	}

	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}
	
	@Column(name = "GROU_ID")
	public Integer getGrouId() {
		return this.grouId;
	}

	public void setGrouId(Integer grouId) {
		this.grouId = grouId;
	}
	
	@Column(name = "GROU_NAME")
	public String getGrouName() {
		return this.grouName;
	}

	public void setGrouName(String grouName) {
		this.grouName = grouName;
	}
	
	@Column(name = "CARGO_NAME")
	public String getCargoName() {
		return this.cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}
	
	@Column(name = "OTHER_DOCS")
	public String getOtherDocs() {
		return this.otherDocs;
	}

	public void setOtherDocs(String otherDocs) {
		this.otherDocs = otherDocs;
	}
	
	@Column(name = "INSP_ATTACHED_DOCS")
	public String getInspAttachedDocs() {
		return this.inspAttachedDocs;
	}

	public void setInspAttachedDocs(String inspAttachedDocs) {
		this.inspAttachedDocs = inspAttachedDocs;
	}
	
	@Temporal(TemporalType.DATE)
	@Column(name = "DOC_RECEIVED_DATE")
	public Date getDocReceivedDate() {
		return this.docReceivedDate;
	}

	public void setDocReceivedDate(Date docReceivedDate) {
		this.docReceivedDate = docReceivedDate;
	}
	
	@Column(name = "LICENCE_RECEIVED")
	public Byte getLicenceReceived() {
		return this.licenceReceived;
	}

	public void setLicenceReceived(Byte licenceReceived) {
		this.licenceReceived = licenceReceived;
	}
	
	@Column(name = "PACKING_LIST_RECEIVED")
	public Byte getPackingListReceived() {
		return this.packingListReceived;
	}

	public void setPackingListReceived(Byte packingListReceived) {
		this.packingListReceived = packingListReceived;
	}
	
	@Column(name = "INVOICE_RECEIVED")
	public Byte getInvoiceReceived() {
		return this.invoiceReceived;
	}

	public void setInvoiceReceived(Byte invoiceReceived) {
		this.invoiceReceived = invoiceReceived;
	}
	
	@Column(name = "CONTRACT_RECEIVED")
	public Byte getContractReceived() {
		return this.contractReceived;
	}

	public void setContractReceived(Byte contractReceived) {
		this.contractReceived = contractReceived;
	}
	
	@Column(name = "CREDIT_RECEIVED")
	public Byte getCreditReceived() {
		return this.creditReceived;
	}

	public void setCreditReceived(Byte creditReceived) {
		this.creditReceived = creditReceived;
	}
	
	@Column(name = "BL_RECEIVED")
	public Byte getBlReceived() {
		return this.blReceived;
	}

	public void setBlReceived(Byte blReceived) {
		this.blReceived = blReceived;
	}
	
	@Column(name = "FACTORY_INSP_RECEIVED")
	public Byte getFactoryInspReceived() {
		return this.factoryInspReceived;
	}

	public void setFactoryInspReceived(Byte factoryInspReceived) {
		this.factoryInspReceived = factoryInspReceived;
	}
	
	@Column(name = "PACKAGES_INSP_RECEIVED")
	public Byte getPackagesInspReceived() {
		return this.packagesInspReceived;
	}

	public void setPackagesInspReceived(Byte packagesInspReceived) {
		this.packagesInspReceived = packagesInspReceived;
	}
	
	@Column(name = "QUALITY_REQUIRED")
	public Byte getQualityRequired() {
		return this.qualityRequired;
	}

	public void setQualityRequired(Byte qualityRequired) {
		this.qualityRequired = qualityRequired;
	}
	
	@Column(name = "WEIGHT_REQUIRED")
	public Byte getWeightRequired() {
		return this.weightRequired;
	}

	public void setWeightRequired(Byte weightRequired) {
		this.weightRequired = weightRequired;
	}
	
	@Column(name = "QUANTITY_REQUIRED")
	public Byte getQuantityRequired() {
		return this.quantityRequired;
	}

	public void setQuantityRequired(Byte quantityRequired) {
		this.quantityRequired = quantityRequired;
	}
	
	@Column(name = "VETERINARY_REQUIRED")
	public Byte getVeterinaryRequired() {
		return this.veterinaryRequired;
	}

	public void setVeterinaryRequired(Byte veterinaryRequired) {
		this.veterinaryRequired = veterinaryRequired;
	}
	
	@Column(name = "HEALTH_REQUIRED")
	public Byte getHealthRequired() {
		return this.healthRequired;
	}

	public void setHealthRequired(Byte healthRequired) {
		this.healthRequired = healthRequired;
	}
	
	@Column(name = "SANITATION_REQUIRED")
	public Byte getSanitationRequired() {
		return this.sanitationRequired;
	}

	public void setSanitationRequired(Byte sanitationRequired) {
		this.sanitationRequired = sanitationRequired;
	}
	
	@Column(name = "ANIMAL_REQUIRED")
	public Byte getAnimalRequired() {
		return this.animalRequired;
	}

	public void setAnimalRequired(Byte animalRequired) {
		this.animalRequired = animalRequired;
	}
	
	@Column(name = "INSP_REQUIREMENT")
	public String getInspRequirement() {
		return this.inspRequirement;
	}

	public void setInspRequirement(String inspRequirement) {
		this.inspRequirement = inspRequirement;
	}
	
	@Column(name = "REMARKS")
	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	@Column(name = "INSP_CARGO_ADDRESS")
	public String getInspCargoAddress() {
		return this.inspCargoAddress;
	}

	public void setInspCargoAddress(String inspCargoAddress) {
		this.inspCargoAddress = inspCargoAddress;
	}

	@Column(name = "INSP_CARGO_NAME")
	public String getInspCargoName() {
		return this.inspCargoName;
	}

	public void setInspCargoName(String inspCargoName) {
		this.inspCargoName = inspCargoName;
	}

	@Column(name = "INSP_CERTIFICATE_NO")
	public String getInspCertificateNo() {
		return this.inspCertificateNo;
	}

	public void setInspCertificateNo(String inspCertificateNo) {
		this.inspCertificateNo = inspCertificateNo;
	}

	@Column(name = "INSP_CHECK_FLAG")
	public Byte getInspCheckFlag() {
		return this.inspCheckFlag;
	}

	public void setInspCheckFlag(Byte inspCheckFlag) {
		this.inspCheckFlag = inspCheckFlag;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INSP_CLAIM_DATE")
	public Date getInspClaimDate() {
		return this.inspClaimDate;
	}

	public void setInspClaimDate(Date inspClaimDate) {
		this.inspClaimDate = inspClaimDate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INSP_COMPLETE_DATE")
	public Date getInspCompleteDate() {
		return this.inspCompleteDate;
	}

	public void setInspCompleteDate(Date inspCompleteDate) {
		this.inspCompleteDate = inspCompleteDate;
	}

	@Column(name = "INSP_CONSIGNEE_CN")
	public String getInspConsigneeCn() {
		return this.inspConsigneeCn;
	}

	public void setInspConsigneeCn(String inspConsigneeCn) {
		this.inspConsigneeCn = inspConsigneeCn;
	}

	@Column(name = "INSP_CONSIGNEE_EN")
	public String getInspConsigneeEn() {
		return this.inspConsigneeEn;
	}

	public void setInspConsigneeEn(String inspConsigneeEn) {
		this.inspConsigneeEn = inspConsigneeEn;
	}

	@Column(name = "INSP_CONTAINER_INFO")
	public String getInspContainerInfo() {
		return this.inspContainerInfo;
	}

	public void setInspContainerInfo(String inspContainerInfo) {
		this.inspContainerInfo = inspContainerInfo;
	}

	@Column(name = "INSP_CONTRACT_NO")
	public String getInspContractNo() {
		return this.inspContractNo;
	}

	public void setInspContractNo(String inspContractNo) {
		this.inspContractNo = inspContractNo;
	}

	@Column(name = "INSP_CONVEYANCE")
	public String getInspConveyance() {
		return this.inspConveyance;
	}

	public void setInspConveyance(String inspConveyance) {
		this.inspConveyance = inspConveyance;
	}

	@Column(name = "INSP_CREDIT_NO")
	public String getInspCreditNo() {
		return this.inspCreditNo;
	}

	public void setInspCreditNo(String inspCreditNo) {
		this.inspCreditNo = inspCreditNo;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INSP_DATE")
	public Date getInspDate() {
		return this.inspDate;
	}

	public void setInspDate(Date inspDate) {
		this.inspDate = inspDate;
	}

	@Column(name = "INSP_HS_NO")
	public String getInspHsNo() {
		return this.inspHsNo;
	}

	public void setInspHsNo(String inspHsNo) {
		this.inspHsNo = inspHsNo;
	}

	@Column(name = "INSP_MADE_IN")
	public String getInspMadeIn() {
		return this.inspMadeIn;
	}

	public void setInspMadeIn(String inspMadeIn) {
		this.inspMadeIn = inspMadeIn;
	}

	@Column(name = "INSP_MARKS")
	public String getInspMarks() {
		return this.inspMarks;
	}

	public void setInspMarks(String inspMarks) {
		this.inspMarks = inspMarks;
	}

	@Column(name = "INSP_NO")
	public String getInspNo() {
		return this.inspNo;
	}

	public void setInspNo(String inspNo) {
		this.inspNo = inspNo;
	}

	@Column(name = "INSP_NOTE_NO")
	public String getInspNoteNo() {
		return this.inspNoteNo;
	}

	public void setInspNoteNo(String inspNoteNo) {
		this.inspNoteNo = inspNoteNo;
	}

	@Column(name = "INSP_NUM")
	public String getInspNum() {
		return this.inspNum;
	}

	public void setInspNum(String inspNum) {
		this.inspNum = inspNum;
	}

	@Column(name = "INSP_PACKAGES")
	public String getInspPackages() {
		return this.inspPackages;
	}

	public void setInspPackages(String inspPackages) {
		this.inspPackages = inspPackages;
	}

	@Column(name = "INSP_PASS_NO")
	public String getInspPassNo() {
		return this.inspPassNo;
	}

	public void setInspPassNo(String inspPassNo) {
		this.inspPassNo = inspPassNo;
	}

	@Column(name = "INSP_POD")
	public String getInspPod() {
		return this.inspPod;
	}

	public void setInspPod(String inspPod) {
		this.inspPod = inspPod;
	}

	@Column(name = "INSP_POL")
	public String getInspPol() {
		return this.inspPol;
	}

	public void setInspPol(String inspPol) {
		this.inspPol = inspPol;
	}

	@Column(name = "INSP_POT")
	public String getInspPot() {
		return this.inspPot;
	}

	public void setInspPot(String inspPot) {
		this.inspPot = inspPot;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INSP_RECEIVE_DATE")
	public Date getInspReceiveDate() {
		return this.inspReceiveDate;
	}

	public void setInspReceiveDate(Date inspReceiveDate) {
		this.inspReceiveDate = inspReceiveDate;
	}

	@Column(name = "INSP_RECEIVER")
	public String getInspReceiver() {
		return this.inspReceiver;
	}

	public void setInspReceiver(String inspReceiver) {
		this.inspReceiver = inspReceiver;
	}

	@Column(name = "INSP_REF_NO")
	public String getInspRefNo() {
		return this.inspRefNo;
	}

	public void setInspRefNo(String inspRefNo) {
		this.inspRefNo = inspRefNo;
	}

	@Column(name = "INSP_REGISTER_NO")
	public String getInspRegisterNo() {
		return this.inspRegisterNo;
	}

	public void setInspRegisterNo(String inspRegisterNo) {
		this.inspRegisterNo = inspRegisterNo;
	}

	@Column(name = "INSP_REMARKS")
	public String getInspRemarks() {
		return this.inspRemarks;
	}

	public void setInspRemarks(String inspRemarks) {
		this.inspRemarks = inspRemarks;
	}

	@Column(name = "INSP_SHIPPER_CN")
	public String getInspShipperCn() {
		return this.inspShipperCn;
	}

	public void setInspShipperCn(String inspShipperCn) {
		this.inspShipperCn = inspShipperCn;
	}

	@Column(name = "INSP_SHIPPER_EN")
	public String getInspShipperEn() {
		return this.inspShipperEn;
	}

	public void setInspShipperEn(String inspShipperEn) {
		this.inspShipperEn = inspShipperEn;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INSP_SHIPPING_DATE")
	public Date getInspShippingDate() {
		return this.inspShippingDate;
	}

	public void setInspShippingDate(Date inspShippingDate) {
		this.inspShippingDate = inspShippingDate;
	}

	@Column(name = "INSP_SPECIAL_TERM")
	public String getInspSpecialTerm() {
		return this.inspSpecialTerm;
	}

	public void setInspSpecialTerm(String inspSpecialTerm) {
		this.inspSpecialTerm = inspSpecialTerm;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INSP_START_DATE")
	public Date getInspStartDate() {
		return this.inspStartDate;
	}

	public void setInspStartDate(Date inspStartDate) {
		this.inspStartDate = inspStartDate;
	}

	@Column(name = "INSP_STATUS")
	public Byte getInspStatus() {
		return this.inspStatus;
	}

	public void setInspStatus(Byte inspStatus) {
		this.inspStatus = inspStatus;
	}

	@Column(name = "INSP_TRADE_COUNTRY")
	public String getInspTradeCountry() {
		return this.inspTradeCountry;
	}

	public void setInspTradeCountry(String inspTradeCountry) {
		this.inspTradeCountry = inspTradeCountry;
	}

	@Column(name = "INSP_TRADE_TYPE")
	public String getInspTradeType() {
		return this.inspTradeType;
	}

	public void setInspTradeType(String inspTradeType) {
		this.inspTradeType = inspTradeType;
	}

	@Column(name = "INSP_USAGE")
	public String getInspUsage() {
		return this.inspUsage;
	}

	public void setInspUsage(String inspUsage) {
		this.inspUsage = inspUsage;
	}

	@Column(name = "INSP_VALUE")
	public String getInspValue() {
		return this.inspValue;
	}

	public void setInspValue(String inspValue) {
		this.inspValue = inspValue;
	}

	@Column(name = "INSP_VENDOR_CONTACT")
	public String getInspVendorContact() {
		return this.inspVendorContact;
	}

	public void setInspVendorContact(String inspVendorContact) {
		this.inspVendorContact = inspVendorContact;
	}

	@Column(name = "INSP_VENDOR_ID")
	public Integer getInspVendorId() {
		return this.inspVendorId;
	}

	public void setInspVendorId(Integer inspVendorId) {
		this.inspVendorId = inspVendorId;
	}

	@Column(name = "INSP_VENDOR_NAME")
	public String getInspVendorName() {
		return this.inspVendorName;
	}

	public void setInspVendorName(String inspVendorName) {
		this.inspVendorName = inspVendorName;
	}

	@Column(name = "INSP_VENDOR_TEL")
	public String getInspVendorTel() {
		return this.inspVendorTel;
	}

	public void setInspVendorTel(String inspVendorTel) {
		this.inspVendorTel = inspVendorTel;
	}

	@Column(name = "INSP_VENDOR_FAX")
	public String getInspVendorFax() {
		return this.inspVendorFax;
	}

	public void setInspVendorFax(String inspVendorFax) {
		this.inspVendorFax = inspVendorFax;
	}
	
	@Column(name = "CONS_BIZ_TYPE")
	public String getConsBizType() {
		return this.consBizType;
	}

	public void setConsBizType(String consBizType) {
		this.consBizType = consBizType;
	}
}
