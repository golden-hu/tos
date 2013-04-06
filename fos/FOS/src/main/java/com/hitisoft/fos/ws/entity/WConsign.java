package com.hitisoft.fos.ws.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "W_CONSIGN")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WConsign extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 7643484185809508261L;
	private String cargBigFlag;
	private String cargDanagerFlag;
	private String cargReeterFlag;
	private String consBizClass;
	private String consBizType;
	private String consCargoDesc;
	private String consCargoMarks;
	private Integer consCarrier;
	private String consCarrierName;
	private String consConsignee;
	private String consContainersInfo;
	private String consContractNo;
	private Date consDate;
	private String consDeliveryPlace;
	private String consDestination;
	private Integer consId;
	private String consMblNo;
	private String consNo;
	private String consNotifyParty;
	private String consNotifyParty2;
	private String consOriginalBlNum;
	private Byte consPartialFlag;
	private Integer consPod;
	private String consPodEn;
	private Integer consPol;
	private String consPolEn;
	private Integer consPot;
	private String consPotEn;
	private String consPrecarriage;
	private String consReceiptPlace;
	private String consRefNo;
	private String consRemarks;
	private String consServiceRequired;
	private String consShipType;
	private String consShipper;
	private Byte consStatus;
	private BigDecimal consTotalGrossWeight;
	private BigDecimal consTotalMeasurement;
	private Integer consTotalPackages;
	private String consTradeCountry;
	private Byte consTransFlag;
	private Integer custId;
	private String custName;
	private Integer packId;
	private String packName;
	private Integer pateId;
	private String pateName;
	private String tranCode;
	private Integer tranId;
	private Integer vessId;
	private String vessName;
	private String vessNameCn;
	private Integer voyaId;
	private String voyaName;
	private String wconNo;
	private Integer wusrId;
	private String wusrFirstName;
	private String wusrName;
	private String wusrMobile;
	private String wusrEmail;
	private String wusrCompanyName;
	private String wusrTel;

	public WConsign() {
	}

	@Column(name = "CARG_BIG_FLAG")
	public String getCargBigFlag() {
		return this.cargBigFlag;
	}

	public void setCargBigFlag(String cargBigFlag) {
		this.cargBigFlag = cargBigFlag;
	}

	@Column(name = "CARG_DANAGER_FLAG")
	public String getCargDanagerFlag() {
		return this.cargDanagerFlag;
	}

	public void setCargDanagerFlag(String cargDanagerFlag) {
		this.cargDanagerFlag = cargDanagerFlag;
	}

	@Column(name = "CARG_REETER_FLAG")
	public String getCargReeterFlag() {
		return this.cargReeterFlag;
	}

	public void setCargReeterFlag(String cargReeterFlag) {
		this.cargReeterFlag = cargReeterFlag;
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

	@Column(name = "CONS_CARRIER")
	public Integer getConsCarrier() {
		return this.consCarrier;
	}

	public void setConsCarrier(Integer consCarrier) {
		this.consCarrier = consCarrier;
	}

	@Column(name = "CONS_CARRIER_NAME")
	public String getConsCarrierName() {
		return this.consCarrierName;
	}

	public void setConsCarrierName(String consCarrierName) {
		this.consCarrierName = consCarrierName;
	}

	@Column(name = "CONS_CONSIGNEE")
	public String getConsConsignee() {
		return this.consConsignee;
	}

	public void setConsConsignee(String consConsignee) {
		this.consConsignee = consConsignee;
	}

	@Column(name = "CONS_CONTAINERS_INFO")
	public String getConsContainersInfo() {
		return this.consContainersInfo;
	}

	public void setConsContainersInfo(String consContainersInfo) {
		this.consContainersInfo = consContainersInfo;
	}

	@Column(name = "CONS_CONTRACT_NO")
	public String getConsContractNo() {
		return this.consContractNo;
	}

	public void setConsContractNo(String consContractNo) {
		this.consContractNo = consContractNo;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_DATE")
	public Date getConsDate() {
		return this.consDate;
	}

	public void setConsDate(Date consDate) {
		this.consDate = consDate;
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

	@Column(name = "CONS_ORIGINAL_BL_NUM")
	public String getConsOriginalBlNum() {
		return this.consOriginalBlNum;
	}

	public void setConsOriginalBlNum(String consOriginalBlNum) {
		this.consOriginalBlNum = consOriginalBlNum;
	}

	@Column(name = "CONS_PARTIAL_FLAG")
	public Byte getConsPartialFlag() {
		return this.consPartialFlag;
	}

	public void setConsPartialFlag(Byte consPartialFlag) {
		this.consPartialFlag = consPartialFlag;
	}

	@Column(name = "CONS_POD")
	public Integer getConsPod() {
		return this.consPod;
	}

	public void setConsPod(Integer consPod) {
		this.consPod = consPod;
	}

	@Column(name = "CONS_POD_EN")
	public String getConsPodEn() {
		return this.consPodEn;
	}

	public void setConsPodEn(String consPodEn) {
		this.consPodEn = consPodEn;
	}

	@Column(name = "CONS_POL")
	public Integer getConsPol() {
		return this.consPol;
	}

	public void setConsPol(Integer consPol) {
		this.consPol = consPol;
	}

	@Column(name = "CONS_POL_EN")
	public String getConsPolEn() {
		return this.consPolEn;
	}

	public void setConsPolEn(String consPolEn) {
		this.consPolEn = consPolEn;
	}

	@Column(name = "CONS_POT")
	public Integer getConsPot() {
		return this.consPot;
	}

	public void setConsPot(Integer consPot) {
		this.consPot = consPot;
	}

	@Column(name = "CONS_POT_EN")
	public String getConsPotEn() {
		return this.consPotEn;
	}

	public void setConsPotEn(String consPotEn) {
		this.consPotEn = consPotEn;
	}

	@Column(name = "CONS_PRECARRIAGE")
	public String getConsPrecarriage() {
		return this.consPrecarriage;
	}

	public void setConsPrecarriage(String consPrecarriage) {
		this.consPrecarriage = consPrecarriage;
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

	@Column(name = "CONS_SERVICE_REQUIRED")
	public String getConsServiceRequired() {
		return this.consServiceRequired;
	}

	public void setConsServiceRequired(String consServiceRequired) {
		this.consServiceRequired = consServiceRequired;
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

	@Column(name = "CONS_STATUS")
	public Byte getConsStatus() {
		return this.consStatus;
	}

	public void setConsStatus(Byte consStatus) {
		this.consStatus = consStatus;
	}

	@Column(name = "CONS_TOTAL_GROSS_WEIGHT")
	public BigDecimal getConsTotalGrossWeight() {
		return this.consTotalGrossWeight;
	}

	public void setConsTotalGrossWeight(BigDecimal consTotalGrossWeight) {
		this.consTotalGrossWeight = consTotalGrossWeight;
	}

	@Column(name = "CONS_TOTAL_MEASUREMENT")
	public BigDecimal getConsTotalMeasurement() {
		return this.consTotalMeasurement;
	}

	public void setConsTotalMeasurement(BigDecimal consTotalMeasurement) {
		this.consTotalMeasurement = consTotalMeasurement;
	}

	@Column(name = "CONS_TOTAL_PACKAGES")
	public Integer getConsTotalPackages() {
		return this.consTotalPackages;
	}

	public void setConsTotalPackages(Integer consTotalPackages) {
		this.consTotalPackages = consTotalPackages;
	}

	@Column(name = "CONS_TRADE_COUNTRY")
	public String getConsTradeCountry() {
		return this.consTradeCountry;
	}

	public void setConsTradeCountry(String consTradeCountry) {
		this.consTradeCountry = consTradeCountry;
	}

	@Column(name = "CONS_TRANS_FLAG")
	public Byte getConsTransFlag() {
		return this.consTransFlag;
	}

	public void setConsTransFlag(Byte consTransFlag) {
		this.consTransFlag = consTransFlag;
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

	@Column(name = "PACK_ID")
	public Integer getPackId() {
		return this.packId;
	}

	public void setPackId(Integer packId) {
		this.packId = packId;
	}

	@Column(name = "PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}

	@Column(name = "PATE_ID")
	public Integer getPateId() {
		return this.pateId;
	}

	public void setPateId(Integer pateId) {
		this.pateId = pateId;
	}

	@Column(name = "PATE_NAME")
	public String getPateName() {
		return this.pateName;
	}

	public void setPateName(String pateName) {
		this.pateName = pateName;
	}

	@Column(name = "TRAN_CODE")
	public String getTranCode() {
		return this.tranCode;
	}

	public void setTranCode(String tranCode) {
		this.tranCode = tranCode;
	}

	@Column(name = "TRAN_ID")
	public Integer getTranId() {
		return this.tranId;
	}

	public void setTranId(Integer tranId) {
		this.tranId = tranId;
	}

	@Column(name = "VESS_ID")
	public Integer getVessId() {
		return this.vessId;
	}

	public void setVessId(Integer vessId) {
		this.vessId = vessId;
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

	@Column(name = "VOYA_ID")
	public Integer getVoyaId() {
		return this.voyaId;
	}

	public void setVoyaId(Integer voyaId) {
		this.voyaId = voyaId;
	}

	@Column(name = "VOYA_NAME")
	public String getVoyaName() {
		return this.voyaName;
	}

	public void setVoyaName(String voyaName) {
		this.voyaName = voyaName;
	}

	@Column(name = "WCON_NO")
	public String getWconNo() {
		return this.wconNo;
	}

	public void setWconNo(String wconNo) {
		this.wconNo = wconNo;
	}

	@Column(name = "WUSR_ID")
	public Integer getWusrId() {
		return this.wusrId;
	}

	public void setWusrId(Integer wusrId) {
		this.wusrId = wusrId;
	}

	@Transient
	public String getWusrFirstName() {
		return wusrFirstName;
	}

	public void setWusrFirstName(String wusrFirstName) {
		this.wusrFirstName = wusrFirstName;
	}

	@Transient
	public String getWusrName() {
		return wusrName;
	}

	public void setWusrName(String wusrName) {
		this.wusrName = wusrName;
	}

	@Transient
	public String getWusrMobile() {
		return wusrMobile;
	}

	public void setWusrMobile(String wusrMobile) {
		this.wusrMobile = wusrMobile;
	}

	@Transient
	public String getWusrEmail() {
		return wusrEmail;
	}

	public void setWusrEmail(String wusrEmail) {
		this.wusrEmail = wusrEmail;
	}

	@Transient
	public String getWusrCompanyName() {
		return wusrCompanyName;
	}

	public void setWusrCompanyName(String wusrCompanyName) {
		this.wusrCompanyName = wusrCompanyName;
	}

	@Transient
	public String getWusrTel() {
		return wusrTel;
	}

	public void setWusrTel(String wusrTel) {
		this.wusrTel = wusrTel;
	}
}
