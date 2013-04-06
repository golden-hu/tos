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
@Table(name = "F_RAILWAY_BL")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FRailwayBl extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -6195295616911603602L;
	private Integer consId;
	private String consNo;
	private String currCode;
	private Integer custId;
	private String custName;
	private String packName;
	private String rablAgencyName;
	private Byte rablBulkFlag;
	private String rablCargoMarks;
	private String rablCargoNameCn;
	private String rablCargoNameEn;
	private String rablChargeRemarks;
	private String rablConsignee;
	private String rablContainerDesc;
	private String rablContainerNo;
	private String rablContainerNoO;
	private Byte rablContainerStatus;
	private String rablContainerType;
	private String rablContainerWeight;
	private String rablContractNo;
	private String rablCountry;
	private String rablDeliveryPlace;
	private Date rablEtd;
	private String rablGrossWeight;
	private String rablHsCode;
	private String rablInvoicePrice;
	private String rablMeasurement;
	private String rablNo;
	private String rablNotifyParty;
	private String rablPackages;
	private String rablRailwayNotes;
	private String rablRemarks;
	private String rablReturnPlace;
	private String rablSealNo;
	private String rablSealNo2;
	private String rablShipper;
	private String rablShipperNotes;
	private Byte rablSocFlag;
	private String rablStationD;
	private String rablStationT;
	private Byte rablStatus;

	public FRailwayBl() {
	}

	@Column(name = "CONS_ID")
	public Integer getConsId() {
		return this.consId;
	}

	public void setConsId(Integer consId) {
		this.consId = consId;
	}

	@Column(name = "CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
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

	@Column(name = "PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}

	@Column(name = "RABL_AGENCY_NAME")
	public String getRablAgencyName() {
		return this.rablAgencyName;
	}

	public void setRablAgencyName(String rablAgencyName) {
		this.rablAgencyName = rablAgencyName;
	}

	@Column(name = "RABL_BULK_FLAG")
	public Byte getRablBulkFlag() {
		return this.rablBulkFlag;
	}

	public void setRablBulkFlag(Byte rablBulkFlag) {
		this.rablBulkFlag = rablBulkFlag;
	}

	@Column(name = "RABL_CARGO_MARKS")
	public String getRablCargoMarks() {
		return this.rablCargoMarks;
	}

	public void setRablCargoMarks(String rablCargoMarks) {
		this.rablCargoMarks = rablCargoMarks;
	}

	@Column(name = "RABL_CARGO_NAME_CN")
	public String getRablCargoNameCn() {
		return this.rablCargoNameCn;
	}

	public void setRablCargoNameCn(String rablCargoNameCn) {
		this.rablCargoNameCn = rablCargoNameCn;
	}

	@Column(name = "RABL_CARGO_NAME_EN")
	public String getRablCargoNameEn() {
		return this.rablCargoNameEn;
	}

	public void setRablCargoNameEn(String rablCargoNameEn) {
		this.rablCargoNameEn = rablCargoNameEn;
	}

	@Column(name = "RABL_CHARGE_REMARKS")
	public String getRablChargeRemarks() {
		return this.rablChargeRemarks;
	}

	public void setRablChargeRemarks(String rablChargeRemarks) {
		this.rablChargeRemarks = rablChargeRemarks;
	}

	@Column(name = "RABL_CONSIGNEE")
	public String getRablConsignee() {
		return this.rablConsignee;
	}

	public void setRablConsignee(String rablConsignee) {
		this.rablConsignee = rablConsignee;
	}

	@Column(name = "RABL_CONTAINER_DESC")
	public String getRablContainerDesc() {
		return this.rablContainerDesc;
	}

	public void setRablContainerDesc(String rablContainerDesc) {
		this.rablContainerDesc = rablContainerDesc;
	}

	@Column(name = "RABL_CONTAINER_NO")
	public String getRablContainerNo() {
		return this.rablContainerNo;
	}

	public void setRablContainerNo(String rablContainerNo) {
		this.rablContainerNo = rablContainerNo;
	}

	@Column(name = "RABL_CONTAINER_NO_O")
	public String getRablContainerNoO() {
		return this.rablContainerNoO;
	}

	public void setRablContainerNoO(String rablContainerNoO) {
		this.rablContainerNoO = rablContainerNoO;
	}

	@Column(name = "RABL_CONTAINER_STATUS")
	public Byte getRablContainerStatus() {
		return this.rablContainerStatus;
	}

	public void setRablContainerStatus(Byte rablContainerStatus) {
		this.rablContainerStatus = rablContainerStatus;
	}

	@Column(name = "RABL_CONTAINER_TYPE")
	public String getRablContainerType() {
		return this.rablContainerType;
	}

	public void setRablContainerType(String rablContainerType) {
		this.rablContainerType = rablContainerType;
	}

	@Column(name = "RABL_CONTAINER_WEIGHT")
	public String getRablContainerWeight() {
		return this.rablContainerWeight;
	}

	public void setRablContainerWeight(String rablContainerWeight) {
		this.rablContainerWeight = rablContainerWeight;
	}

	@Column(name = "RABL_CONTRACT_NO")
	public String getRablContractNo() {
		return this.rablContractNo;
	}

	public void setRablContractNo(String rablContractNo) {
		this.rablContractNo = rablContractNo;
	}

	@Column(name = "RABL_COUNTRY")
	public String getRablCountry() {
		return this.rablCountry;
	}

	public void setRablCountry(String rablCountry) {
		this.rablCountry = rablCountry;
	}

	@Column(name = "RABL_DELIVERY_PLACE")
	public String getRablDeliveryPlace() {
		return this.rablDeliveryPlace;
	}

	public void setRablDeliveryPlace(String rablDeliveryPlace) {
		this.rablDeliveryPlace = rablDeliveryPlace;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "RABL_ETD")
	public Date getRablEtd() {
		return this.rablEtd;
	}

	public void setRablEtd(Date rablEtd) {
		this.rablEtd = rablEtd;
	}

	@Column(name = "RABL_GROSS_WEIGHT")
	public String getRablGrossWeight() {
		return this.rablGrossWeight;
	}

	public void setRablGrossWeight(String rablGrossWeight) {
		this.rablGrossWeight = rablGrossWeight;
	}

	@Column(name = "RABL_HS_CODE")
	public String getRablHsCode() {
		return this.rablHsCode;
	}

	public void setRablHsCode(String rablHsCode) {
		this.rablHsCode = rablHsCode;
	}

	@Column(name = "RABL_INVOICE_PRICE")
	public String getRablInvoicePrice() {
		return this.rablInvoicePrice;
	}

	public void setRablInvoicePrice(String rablInvoicePrice) {
		this.rablInvoicePrice = rablInvoicePrice;
	}

	@Column(name = "RABL_MEASUREMENT")
	public String getRablMeasurement() {
		return this.rablMeasurement;
	}

	public void setRablMeasurement(String rablMeasurement) {
		this.rablMeasurement = rablMeasurement;
	}

	@Column(name = "RABL_NO")
	public String getRablNo() {
		return this.rablNo;
	}

	public void setRablNo(String rablNo) {
		this.rablNo = rablNo;
	}

	@Column(name = "RABL_NOTIFY_PARTY")
	public String getRablNotifyParty() {
		return this.rablNotifyParty;
	}

	public void setRablNotifyParty(String rablNotifyParty) {
		this.rablNotifyParty = rablNotifyParty;
	}

	@Column(name = "RABL_PACKAGES")
	public String getRablPackages() {
		return this.rablPackages;
	}

	public void setRablPackages(String rablPackages) {
		this.rablPackages = rablPackages;
	}

	@Column(name = "RABL_RAILWAY_NOTES")
	public String getRablRailwayNotes() {
		return this.rablRailwayNotes;
	}

	public void setRablRailwayNotes(String rablRailwayNotes) {
		this.rablRailwayNotes = rablRailwayNotes;
	}

	@Column(name = "RABL_REMARKS")
	public String getRablRemarks() {
		return this.rablRemarks;
	}

	public void setRablRemarks(String rablRemarks) {
		this.rablRemarks = rablRemarks;
	}

	@Column(name = "RABL_RETURN_PLACE")
	public String getRablReturnPlace() {
		return this.rablReturnPlace;
	}

	public void setRablReturnPlace(String rablReturnPlace) {
		this.rablReturnPlace = rablReturnPlace;
	}

	@Column(name = "RABL_SEAL_NO")
	public String getRablSealNo() {
		return this.rablSealNo;
	}

	public void setRablSealNo(String rablSealNo) {
		this.rablSealNo = rablSealNo;
	}

	@Column(name = "RABL_SEAL_NO2")
	public String getRablSealNo2() {
		return this.rablSealNo2;
	}

	public void setRablSealNo2(String rablSealNo2) {
		this.rablSealNo2 = rablSealNo2;
	}

	@Column(name = "RABL_SHIPPER")
	public String getRablShipper() {
		return this.rablShipper;
	}

	public void setRablShipper(String rablShipper) {
		this.rablShipper = rablShipper;
	}

	@Column(name = "RABL_SHIPPER_NOTES")
	public String getRablShipperNotes() {
		return this.rablShipperNotes;
	}

	public void setRablShipperNotes(String rablShipperNotes) {
		this.rablShipperNotes = rablShipperNotes;
	}

	@Column(name = "RABL_SOC_FLAG")
	public Byte getRablSocFlag() {
		return this.rablSocFlag;
	}

	public void setRablSocFlag(Byte rablSocFlag) {
		this.rablSocFlag = rablSocFlag;
	}

	@Column(name = "RABL_STATION_D")
	public String getRablStationD() {
		return this.rablStationD;
	}

	public void setRablStationD(String rablStationD) {
		this.rablStationD = rablStationD;
	}

	@Column(name = "RABL_STATION_T")
	public String getRablStationT() {
		return this.rablStationT;
	}

	public void setRablStationT(String rablStationT) {
		this.rablStationT = rablStationT;
	}

	@Column(name = "RABL_STATUS")
	public Byte getRablStatus() {
		return this.rablStatus;
	}

	public void setRablStatus(Byte rablStatus) {
		this.rablStatus = rablStatus;
	}

}
