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
@Table(name = "F_CUSTOMS_DECLARATION")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FCustomsDeclaration extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -3124438432656520845L;
	private String consNo;
	private String consBizClass;
	private String consBizType;
	private Date consDate;
	private String consContractNo;	
	private Integer oriConsId;
	private String oriConsNo;
	private Integer custId;
	private String custName;
	private String custContact;
	private String custTel;
	private String custFax;
	private String custCustomsCode;
	private Integer salesRepId;
	private String salesRepName;
	private Integer operatorId;
	private String operatorName;
	private Integer grouId;
	private String grouName;
	private String cargoName;
	private String hsCode;
	private String otherDocs;
	private String cudeAttachedDocs;
	private String cudeRequirement;
	private String remarks;
	private Date docReceivedDate;
	private Byte contractReceived;
	private Byte invoiceReceived;
	private Byte manualReceived;
	private Byte packingListReceived;
	private Byte blReceived;
	private Byte licenceReceived;
	
	private String cudeApprovalNo;
	private String cudeAttachment;
	private String cudeBlNo;
	private String cudeCertificateNo;
	private String cudeCharge;
	private String cudeCompany;
	private String cudeCompanyAddress;
	private String cudeCompanyTel;
	private String cudeCompanyZip;
	private String cudeContainerNo;
	private String cudeConveyance;
	private String cudeCountry;
	private Date cudeCreateDate;
	private String cudeCreator;
	private String cudeCustomer;
	private String cudeCustomsNo;
	private Date cudeDeclarDate;
	private String cudeDeclarent;
	private String cudeDocColor;
	private Integer cudeDocNum;
	private String cudeDocReceiver;
	private Date cudeDocRecvDate;
	private Integer cudeDocReleaseBy;
	private Date cudeDocReleaseTime;
	private Date cudeDocSendDate;
	private Byte cudeDocStatus;
	private Date cudeEntryDate;
	private String cudeFreight;
	private String cudeGrossWeight;
	private Byte cudeInspectionFlag;
	private String cudeInsurance;
	private String cudeLevyPercent;
	private String cudeManu;
	private String cudeMarks;
	private String cudeNetWeight;
	private Byte cudeOpenFlag;
	private String cudePackageNum;
	private String cudePlace;
	private String cudePortDomestic;
	private String cudePortForeign;
	private String cudePreNo;
	private String cudeRecordNo;
	private Date cudeRefundDate;
	private Integer cudeRefundDocNum;
	private Byte cudeRefundFlag;
	private Date cudeReleaseDate;
	private String cudeRemarks;
	private String cudeShipper;
	private Date cudeShutoutDate;
	private Byte cudeStatus;
	private String cudeTaxLevy;
	private Byte cudeTransitedFlag;
	private Byte cudeType;
	private String cudeVendorContact;
	private Integer cudeVendorId;
	private String cudeVendorName;
	private String cudeVendorTel;
	private String cudeVendorFax;		
	private String exseCode;
	private String letyCode;
	private String packCode;
	private String tratCode;
	private String trteCode;
	private String trtyCode;
	private String usagCode;

	public FCustomsDeclaration() {
	}

	@Column(name = "LICENCE_RECEIVED")
	public Byte getLicenceReceived() {
		return this.licenceReceived;
	}

	public void setLicenceReceived(Byte licenceReceived) {
		this.licenceReceived = licenceReceived;
	}
	
	@Column(name = "BL_RECEIVED")
	public Byte getBlReceived() {
		return this.blReceived;
	}

	public void setBlReceived(Byte blReceived) {
		this.blReceived = blReceived;
	}
	
	@Column(name = "PACKING_LIST_RECEIVED")
	public Byte getPackingListReceived() {
		return this.packingListReceived;
	}

	public void setPackingListReceived(Byte packingListReceived) {
		this.packingListReceived = packingListReceived;
	}
	
	@Column(name = "MANUAL_RECEIVED")
	public Byte getManualReceived() {
		return this.manualReceived;
	}

	public void setManualReceived(Byte manualReceived) {
		this.manualReceived = manualReceived;
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
	
	@Temporal(TemporalType.DATE)
	@Column(name = "DOC_RECEIVED_DATE")
	public Date getDocReceivedDate() {
		return this.docReceivedDate;
	}

	public void setDocReceivedDate(Date docReceivedDate) {
		this.docReceivedDate = docReceivedDate;
	}
	
	@Column(name = "CARGO_NAME")
	public String getCargoName() {
		return this.cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}
	
	@Column(name = "HS_CODE")
	public String getHsCode() {
		return this.hsCode;
	}

	public void setHsCode(String hsCode) {
		this.hsCode = hsCode;
	}
	
	@Column(name = "OTHER_DOCS")
	public String getOtherDocs() {
		return this.otherDocs;
	}

	public void setOtherDocs(String otherDocs) {
		this.otherDocs = otherDocs;
	}
	
	@Column(name = "CUDE_ATTACHED_DOCS")
	public String getCudeAttachedDocs() {
		return this.cudeAttachedDocs;
	}

	public void setCudeAttachedDocs(String cudeAttachedDocs) {
		this.cudeAttachedDocs = cudeAttachedDocs;
	}
	
	@Column(name = "CUDE_REQUIREMENT")
	public String getCudeRequirement() {
		return this.cudeRequirement;
	}

	public void setCudeRequirement(String cudeRequirement) {
		this.cudeRequirement = cudeRequirement;
	}
	
	@Column(name = "REMARKS")
	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	
	@Column(name = "CONS_CONTRACT_NO")
	public String getConsContractNo() {
		return this.consContractNo;
	}

	public void setConsContractNo(String consContractNo) {
		this.consContractNo = consContractNo;
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

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_DATE")
	public Date getConsDate() {
		return this.consDate;
	}

	public void setConsDate(Date consDate) {
		this.consDate = consDate;
	}
	
	@Column(name = "CUDE_APPROVAL_NO")
	public String getCudeApprovalNo() {
		return this.cudeApprovalNo;
	}

	public void setCudeApprovalNo(String cudeApprovalNo) {
		this.cudeApprovalNo = cudeApprovalNo;
	}

	@Column(name = "CUDE_ATTACHMENT")
	public String getCudeAttachment() {
		return this.cudeAttachment;
	}

	public void setCudeAttachment(String cudeAttachment) {
		this.cudeAttachment = cudeAttachment;
	}

	@Column(name = "CUDE_BL_NO")
	public String getCudeBlNo() {
		return this.cudeBlNo;
	}

	public void setCudeBlNo(String cudeBlNo) {
		this.cudeBlNo = cudeBlNo;
	}

	@Column(name = "CUDE_CERTIFICATE_NO")
	public String getCudeCertificateNo() {
		return this.cudeCertificateNo;
	}

	public void setCudeCertificateNo(String cudeCertificateNo) {
		this.cudeCertificateNo = cudeCertificateNo;
	}

	@Column(name = "CUDE_CHARGE")
	public String getCudeCharge() {
		return this.cudeCharge;
	}

	public void setCudeCharge(String cudeCharge) {
		this.cudeCharge = cudeCharge;
	}

	@Column(name = "CUDE_COMPANY")
	public String getCudeCompany() {
		return this.cudeCompany;
	}

	public void setCudeCompany(String cudeCompany) {
		this.cudeCompany = cudeCompany;
	}

	@Column(name = "CUDE_COMPANY_ADDRESS")
	public String getCudeCompanyAddress() {
		return this.cudeCompanyAddress;
	}

	public void setCudeCompanyAddress(String cudeCompanyAddress) {
		this.cudeCompanyAddress = cudeCompanyAddress;
	}

	@Column(name = "CUDE_COMPANY_TEL")
	public String getCudeCompanyTel() {
		return this.cudeCompanyTel;
	}

	public void setCudeCompanyTel(String cudeCompanyTel) {
		this.cudeCompanyTel = cudeCompanyTel;
	}

	@Column(name = "CUDE_COMPANY_ZIP")
	public String getCudeCompanyZip() {
		return this.cudeCompanyZip;
	}

	public void setCudeCompanyZip(String cudeCompanyZip) {
		this.cudeCompanyZip = cudeCompanyZip;
	}

	@Column(name = "CUDE_CONTAINER_NO")
	public String getCudeContainerNo() {
		return this.cudeContainerNo;
	}

	public void setCudeContainerNo(String cudeContainerNo) {
		this.cudeContainerNo = cudeContainerNo;
	}

	@Column(name = "CUDE_CONVEYANCE")
	public String getCudeConveyance() {
		return this.cudeConveyance;
	}

	public void setCudeConveyance(String cudeConveyance) {
		this.cudeConveyance = cudeConveyance;
	}

	@Column(name = "CUDE_COUNTRY")
	public String getCudeCountry() {
		return this.cudeCountry;
	}

	public void setCudeCountry(String cudeCountry) {
		this.cudeCountry = cudeCountry;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CUDE_CREATE_DATE")
	public Date getCudeCreateDate() {
		return this.cudeCreateDate;
	}

	public void setCudeCreateDate(Date cudeCreateDate) {
		this.cudeCreateDate = cudeCreateDate;
	}

	@Column(name = "CUDE_CREATOR")
	public String getCudeCreator() {
		return this.cudeCreator;
	}

	public void setCudeCreator(String cudeCreator) {
		this.cudeCreator = cudeCreator;
	}

	@Column(name = "CUDE_CUSTOMER")
	public String getCudeCustomer() {
		return this.cudeCustomer;
	}

	public void setCudeCustomer(String cudeCustomer) {
		this.cudeCustomer = cudeCustomer;
	}

	@Column(name = "CUDE_CUSTOMS_NO")
	public String getCudeCustomsNo() {
		return this.cudeCustomsNo;
	}

	public void setCudeCustomsNo(String cudeCustomsNo) {
		this.cudeCustomsNo = cudeCustomsNo;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CUDE_DECLAR_DATE")
	public Date getCudeDeclarDate() {
		return this.cudeDeclarDate;
	}

	public void setCudeDeclarDate(Date cudeDeclarDate) {
		this.cudeDeclarDate = cudeDeclarDate;
	}

	@Column(name = "CUDE_DECLARENT")
	public String getCudeDeclarent() {
		return this.cudeDeclarent;
	}

	public void setCudeDeclarent(String cudeDeclarent) {
		this.cudeDeclarent = cudeDeclarent;
	}

	@Column(name = "CUDE_DOC_COLOR")
	public String getCudeDocColor() {
		return this.cudeDocColor;
	}

	public void setCudeDocColor(String cudeDocColor) {
		this.cudeDocColor = cudeDocColor;
	}

	@Column(name = "CUDE_DOC_NUM")
	public Integer getCudeDocNum() {
		return this.cudeDocNum;
	}

	public void setCudeDocNum(Integer cudeDocNum) {
		this.cudeDocNum = cudeDocNum;
	}

	@Column(name = "CUDE_DOC_RECEIVER")
	public String getCudeDocReceiver() {
		return this.cudeDocReceiver;
	}

	public void setCudeDocReceiver(String cudeDocReceiver) {
		this.cudeDocReceiver = cudeDocReceiver;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CUDE_DOC_RECV_DATE")
	public Date getCudeDocRecvDate() {
		return this.cudeDocRecvDate;
	}

	public void setCudeDocRecvDate(Date cudeDocRecvDate) {
		this.cudeDocRecvDate = cudeDocRecvDate;
	}

	@Column(name = "CUDE_DOC_RELEASE_BY")
	public Integer getCudeDocReleaseBy() {
		return this.cudeDocReleaseBy;
	}

	public void setCudeDocReleaseBy(Integer cudeDocReleaseBy) {
		this.cudeDocReleaseBy = cudeDocReleaseBy;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CUDE_DOC_RELEASE_TIME")
	public Date getCudeDocReleaseTime() {
		return this.cudeDocReleaseTime;
	}

	public void setCudeDocReleaseTime(Date cudeDocReleaseTime) {
		this.cudeDocReleaseTime = cudeDocReleaseTime;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CUDE_DOC_SEND_DATE")
	public Date getCudeDocSendDate() {
		return this.cudeDocSendDate;
	}

	public void setCudeDocSendDate(Date cudeDocSendDate) {
		this.cudeDocSendDate = cudeDocSendDate;
	}

	@Column(name = "CUDE_DOC_STATUS")
	public Byte getCudeDocStatus() {
		return this.cudeDocStatus;
	}

	public void setCudeDocStatus(Byte cudeDocStatus) {
		this.cudeDocStatus = cudeDocStatus;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CUDE_ENTRY_DATE")
	public Date getCudeEntryDate() {
		return this.cudeEntryDate;
	}

	public void setCudeEntryDate(Date cudeEntryDate) {
		this.cudeEntryDate = cudeEntryDate;
	}

	@Column(name = "CUDE_FREIGHT")
	public String getCudeFreight() {
		return this.cudeFreight;
	}

	public void setCudeFreight(String cudeFreight) {
		this.cudeFreight = cudeFreight;
	}

	@Column(name = "CUDE_GROSS_WEIGHT")
	public String getCudeGrossWeight() {
		return this.cudeGrossWeight;
	}

	public void setCudeGrossWeight(String cudeGrossWeight) {
		this.cudeGrossWeight = cudeGrossWeight;
	}

	@Column(name = "CUDE_INSPECTION_FLAG")
	public Byte getCudeInspectionFlag() {
		return this.cudeInspectionFlag;
	}

	public void setCudeInspectionFlag(Byte cudeInspectionFlag) {
		this.cudeInspectionFlag = cudeInspectionFlag;
	}

	@Column(name = "CUDE_INSURANCE")
	public String getCudeInsurance() {
		return this.cudeInsurance;
	}

	public void setCudeInsurance(String cudeInsurance) {
		this.cudeInsurance = cudeInsurance;
	}

	@Column(name = "CUDE_LEVY_PERCENT")
	public String getCudeLevyPercent() {
		return this.cudeLevyPercent;
	}

	public void setCudeLevyPercent(String cudeLevyPercent) {
		this.cudeLevyPercent = cudeLevyPercent;
	}

	@Column(name = "CUDE_MANU")
	public String getCudeManu() {
		return this.cudeManu;
	}

	public void setCudeManu(String cudeManu) {
		this.cudeManu = cudeManu;
	}

	@Column(name = "CUDE_MARKS")
	public String getCudeMarks() {
		return this.cudeMarks;
	}

	public void setCudeMarks(String cudeMarks) {
		this.cudeMarks = cudeMarks;
	}

	@Column(name = "CUDE_NET_WEIGHT")
	public String getCudeNetWeight() {
		return this.cudeNetWeight;
	}

	public void setCudeNetWeight(String cudeNetWeight) {
		this.cudeNetWeight = cudeNetWeight;
	}
	
	@Column(name = "CUDE_OPEN_FLAG")
	public Byte getCudeOpenFlag() {
		return this.cudeOpenFlag;
	}

	public void setCudeOpenFlag(Byte cudeOpenFlag) {
		this.cudeOpenFlag = cudeOpenFlag;
	}

	@Column(name = "CUDE_PACKAGE_NUM")
	public String getCudePackageNum() {
		return this.cudePackageNum;
	}

	public void setCudePackageNum(String cudePackageNum) {
		this.cudePackageNum = cudePackageNum;
	}

	@Column(name = "CUDE_PLACE")
	public String getCudePlace() {
		return this.cudePlace;
	}

	public void setCudePlace(String cudePlace) {
		this.cudePlace = cudePlace;
	}

	@Column(name = "CUDE_PORT_DOMESTIC")
	public String getCudePortDomestic() {
		return this.cudePortDomestic;
	}

	public void setCudePortDomestic(String cudePortDomestic) {
		this.cudePortDomestic = cudePortDomestic;
	}

	@Column(name = "CUDE_PORT_FOREIGN")
	public String getCudePortForeign() {
		return this.cudePortForeign;
	}

	public void setCudePortForeign(String cudePortForeign) {
		this.cudePortForeign = cudePortForeign;
	}

	@Column(name = "CUDE_PRE_NO")
	public String getCudePreNo() {
		return this.cudePreNo;
	}

	public void setCudePreNo(String cudePreNo) {
		this.cudePreNo = cudePreNo;
	}

	@Column(name = "CUDE_RECORD_NO")
	public String getCudeRecordNo() {
		return this.cudeRecordNo;
	}

	public void setCudeRecordNo(String cudeRecordNo) {
		this.cudeRecordNo = cudeRecordNo;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CUDE_REFUND_DATE")
	public Date getCudeRefundDate() {
		return this.cudeRefundDate;
	}

	public void setCudeRefundDate(Date cudeRefundDate) {
		this.cudeRefundDate = cudeRefundDate;
	}

	@Column(name = "CUDE_REFUND_DOC_NUM")
	public Integer getCudeRefundDocNum() {
		return this.cudeRefundDocNum;
	}

	public void setCudeRefundDocNum(Integer cudeRefundDocNum) {
		this.cudeRefundDocNum = cudeRefundDocNum;
	}

	@Column(name = "CUDE_REFUND_FLAG")
	public Byte getCudeRefundFlag() {
		return this.cudeRefundFlag;
	}

	public void setCudeRefundFlag(Byte cudeRefundFlag) {
		this.cudeRefundFlag = cudeRefundFlag;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CUDE_RELEASE_DATE")
	public Date getCudeReleaseDate() {
		return this.cudeReleaseDate;
	}

	public void setCudeReleaseDate(Date cudeReleaseDate) {
		this.cudeReleaseDate = cudeReleaseDate;
	}

	@Column(name = "CUDE_REMARKS")
	public String getCudeRemarks() {
		return this.cudeRemarks;
	}

	public void setCudeRemarks(String cudeRemarks) {
		this.cudeRemarks = cudeRemarks;
	}

	@Column(name = "CUDE_SHIPPER")
	public String getCudeShipper() {
		return this.cudeShipper;
	}

	public void setCudeShipper(String cudeShipper) {
		this.cudeShipper = cudeShipper;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CUDE_SHUTOUT_DATE")
	public Date getCudeShutoutDate() {
		return this.cudeShutoutDate;
	}

	public void setCudeShutoutDate(Date cudeShutoutDate) {
		this.cudeShutoutDate = cudeShutoutDate;
	}

	@Column(name = "CUDE_STATUS")
	public Byte getCudeStatus() {
		return this.cudeStatus;
	}

	public void setCudeStatus(Byte cudeStatus) {
		this.cudeStatus = cudeStatus;
	}

	@Column(name = "CUDE_TAX_LEVY")
	public String getCudeTaxLevy() {
		return this.cudeTaxLevy;
	}

	public void setCudeTaxLevy(String cudeTaxLevy) {
		this.cudeTaxLevy = cudeTaxLevy;
	}

	@Column(name = "CUDE_TRANSITED_FLAG")
	public Byte getCudeTransitedFlag() {
		return this.cudeTransitedFlag;
	}

	public void setCudeTransitedFlag(Byte cudeTransitedFlag) {
		this.cudeTransitedFlag = cudeTransitedFlag;
	}

	@Column(name = "CUDE_TYPE")
	public Byte getCudeType() {
		return this.cudeType;
	}

	public void setCudeType(Byte cudeType) {
		this.cudeType = cudeType;
	}

	@Column(name = "CUDE_VENDOR_CONTACT")
	public String getCudeVendorContact() {
		return this.cudeVendorContact;
	}

	public void setCudeVendorContact(String cudeVendorContact) {
		this.cudeVendorContact = cudeVendorContact;
	}

	@Column(name = "CUDE_VENDOR_ID")
	public Integer getCudeVendorId() {
		return this.cudeVendorId;
	}

	public void setCudeVendorId(Integer cudeVendorId) {
		this.cudeVendorId = cudeVendorId;
	}

	@Column(name = "CUDE_VENDOR_NAME")
	public String getCudeVendorName() {
		return this.cudeVendorName;
	}

	public void setCudeVendorName(String cudeVendorName) {
		this.cudeVendorName = cudeVendorName;
	}

	@Column(name = "CUDE_VENDOR_TEL")
	public String getCudeVendorTel() {
		return this.cudeVendorTel;
	}

	public void setCudeVendorTel(String cudeVendorTel) {
		this.cudeVendorTel = cudeVendorTel;
	}

	@Column(name = "CUDE_VENDOR_FAX")
	public String getCudeVendorFax() {
		return this.cudeVendorFax;
	}

	public void setCudeVendorFax(String cudeVendorFax) {
		this.cudeVendorFax = cudeVendorFax;
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
	
	@Column(name = "CUST_CUSTOMS_CODE")
	public String getCustCustomsCode() {
		return this.custCustomsCode;
	}

	public void setCustCustomsCode(String custCustomsCode) {
		this.custCustomsCode = custCustomsCode;
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
	
	@Column(name = "EXSE_CODE")
	public String getExseCode() {
		return this.exseCode;
	}

	public void setExseCode(String exseCode) {
		this.exseCode = exseCode;
	}

	@Column(name = "LETY_CODE")
	public String getLetyCode() {
		return this.letyCode;
	}

	public void setLetyCode(String letyCode) {
		this.letyCode = letyCode;
	}

	@Column(name = "PACK_CODE")
	public String getPackCode() {
		return this.packCode;
	}

	public void setPackCode(String packCode) {
		this.packCode = packCode;
	}

	@Column(name = "TRAT_CODE")
	public String getTratCode() {
		return this.tratCode;
	}

	public void setTratCode(String tratCode) {
		this.tratCode = tratCode;
	}

	@Column(name = "TRTE_CODE")
	public String getTrteCode() {
		return this.trteCode;
	}

	public void setTrteCode(String trteCode) {
		this.trteCode = trteCode;
	}

	@Column(name = "TRTY_CODE")
	public String getTrtyCode() {
		return this.trtyCode;
	}

	public void setTrtyCode(String trtyCode) {
		this.trtyCode = trtyCode;
	}

	@Column(name = "USAG_CODE")
	public String getUsagCode() {
		return this.usagCode;
	}

	public void setUsagCode(String usagCode) {
		this.usagCode = usagCode;
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
}
