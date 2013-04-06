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
@Table(name = "F_WAREHOUSE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FWarehouse extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 6032606326370272205L;
	private Integer consId;
	private String consNo;
	private String packName;
	private Date wareAcceptDate;
	private Byte wareAcceptStatus;
	private Date wareBookDate;
	private String wareCargoName;
	private String wareContainerNo;
	private String wareCustomerContact;
	private String wareCustomerFax;
	private String wareCustomerTel;
	private Date wareDate;
	private BigDecimal wareGrossWeight;
	private String wareLoadFlag;
	private String wareMblNo;
	private BigDecimal wareMeasurement;
	private BigDecimal wareNetWeight;
	private String wareNo;
	private Integer wareOperator;
	private String wareOperatorFax;
	private String wareOperatorTel;
	private Integer warePackagesNum;
	private String wareRefNo;
	private String wareRemarks;
	private BigDecimal wareTotalGrossWeight;
	private BigDecimal wareTotalMeasurement;
	private Integer wareTotalPackages;
	private String wareTrackNo;
	private Integer wareTransVendor;
	private String wareTransVendorName;
	private String wareType;
	private String wareVendorContact;
	private String wareVendorFax;
	private Integer wareVendorId;
	private String wareVendorName;
	private String wareVendorTel;
	private String wareVessel;
	private String wareVoyage;

	public FWarehouse() {
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

	@Column(name = "PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "WARE_ACCEPT_DATE")
	public Date getWareAcceptDate() {
		return this.wareAcceptDate;
	}

	public void setWareAcceptDate(Date wareAcceptDate) {
		this.wareAcceptDate = wareAcceptDate;
	}

	@Column(name = "WARE_ACCEPT_STATUS")
	public Byte getWareAcceptStatus() {
		return this.wareAcceptStatus;
	}

	public void setWareAcceptStatus(Byte wareAcceptStatus) {
		this.wareAcceptStatus = wareAcceptStatus;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "WARE_BOOK_DATE")
	public Date getWareBookDate() {
		return this.wareBookDate;
	}

	public void setWareBookDate(Date wareBookDate) {
		this.wareBookDate = wareBookDate;
	}

	@Column(name = "WARE_CARGO_NAME")
	public String getWareCargoName() {
		return this.wareCargoName;
	}

	public void setWareCargoName(String wareCargoName) {
		this.wareCargoName = wareCargoName;
	}

	@Column(name = "WARE_CONTAINER_NO")
	public String getWareContainerNo() {
		return this.wareContainerNo;
	}

	public void setWareContainerNo(String wareContainerNo) {
		this.wareContainerNo = wareContainerNo;
	}

	@Column(name = "WARE_CUSTOMER_CONTACT")
	public String getWareCustomerContact() {
		return this.wareCustomerContact;
	}

	public void setWareCustomerContact(String wareCustomerContact) {
		this.wareCustomerContact = wareCustomerContact;
	}

	@Column(name = "WARE_CUSTOMER_FAX")
	public String getWareCustomerFax() {
		return this.wareCustomerFax;
	}

	public void setWareCustomerFax(String wareCustomerFax) {
		this.wareCustomerFax = wareCustomerFax;
	}

	@Column(name = "WARE_CUSTOMER_TEL")
	public String getWareCustomerTel() {
		return this.wareCustomerTel;
	}

	public void setWareCustomerTel(String wareCustomerTel) {
		this.wareCustomerTel = wareCustomerTel;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "WARE_DATE")
	public Date getWareDate() {
		return this.wareDate;
	}

	public void setWareDate(Date wareDate) {
		this.wareDate = wareDate;
	}

	@Column(name = "WARE_GROSS_WEIGHT")
	public BigDecimal getWareGrossWeight() {
		return this.wareGrossWeight;
	}

	public void setWareGrossWeight(BigDecimal wareGrossWeight) {
		this.wareGrossWeight = wareGrossWeight;
	}

	@Column(name = "WARE_LOAD_FLAG")
	public String getWareLoadFlag() {
		return this.wareLoadFlag;
	}

	public void setWareLoadFlag(String wareLoadFlag) {
		this.wareLoadFlag = wareLoadFlag;
	}

	@Column(name = "WARE_MBL_NO")
	public String getWareMblNo() {
		return this.wareMblNo;
	}

	public void setWareMblNo(String wareMblNo) {
		this.wareMblNo = wareMblNo;
	}

	@Column(name = "WARE_MEASUREMENT")
	public BigDecimal getWareMeasurement() {
		return this.wareMeasurement;
	}

	public void setWareMeasurement(BigDecimal wareMeasurement) {
		this.wareMeasurement = wareMeasurement;
	}

	@Column(name = "WARE_NET_WEIGHT")
	public BigDecimal getWareNetWeight() {
		return this.wareNetWeight;
	}

	public void setWareNetWeight(BigDecimal wareNetWeight) {
		this.wareNetWeight = wareNetWeight;
	}

	@Column(name = "WARE_NO")
	public String getWareNo() {
		return this.wareNo;
	}

	public void setWareNo(String wareNo) {
		this.wareNo = wareNo;
	}

	@Column(name = "WARE_OPERATOR")
	public Integer getWareOperator() {
		return this.wareOperator;
	}

	public void setWareOperator(Integer wareOperator) {
		this.wareOperator = wareOperator;
	}

	@Column(name = "WARE_OPERATOR_FAX")
	public String getWareOperatorFax() {
		return this.wareOperatorFax;
	}

	public void setWareOperatorFax(String wareOperatorFax) {
		this.wareOperatorFax = wareOperatorFax;
	}

	@Column(name = "WARE_OPERATOR_TEL")
	public String getWareOperatorTel() {
		return this.wareOperatorTel;
	}

	public void setWareOperatorTel(String wareOperatorTel) {
		this.wareOperatorTel = wareOperatorTel;
	}

	@Column(name = "WARE_PACKAGES_NUM")
	public Integer getWarePackagesNum() {
		return this.warePackagesNum;
	}

	public void setWarePackagesNum(Integer warePackagesNum) {
		this.warePackagesNum = warePackagesNum;
	}

	@Column(name = "WARE_REF_NO")
	public String getWareRefNo() {
		return this.wareRefNo;
	}

	public void setWareRefNo(String wareRefNo) {
		this.wareRefNo = wareRefNo;
	}

	@Column(name = "WARE_REMARKS")
	public String getWareRemarks() {
		return this.wareRemarks;
	}

	public void setWareRemarks(String wareRemarks) {
		this.wareRemarks = wareRemarks;
	}

	@Column(name = "WARE_TOTAL_GROSS_WEIGHT")
	public BigDecimal getWareTotalGrossWeight() {
		return this.wareTotalGrossWeight;
	}

	public void setWareTotalGrossWeight(BigDecimal wareTotalGrossWeight) {
		this.wareTotalGrossWeight = wareTotalGrossWeight;
	}

	@Column(name = "WARE_TOTAL_MEASUREMENT")
	public BigDecimal getWareTotalMeasurement() {
		return this.wareTotalMeasurement;
	}

	public void setWareTotalMeasurement(BigDecimal wareTotalMeasurement) {
		this.wareTotalMeasurement = wareTotalMeasurement;
	}

	@Column(name = "WARE_TOTAL_PACKAGES")
	public Integer getWareTotalPackages() {
		return this.wareTotalPackages;
	}

	public void setWareTotalPackages(Integer wareTotalPackages) {
		this.wareTotalPackages = wareTotalPackages;
	}

	@Column(name = "WARE_TRACK_NO")
	public String getWareTrackNo() {
		return this.wareTrackNo;
	}

	public void setWareTrackNo(String wareTrackNo) {
		this.wareTrackNo = wareTrackNo;
	}

	@Column(name = "WARE_TRANS_VENDOR")
	public Integer getWareTransVendor() {
		return this.wareTransVendor;
	}

	public void setWareTransVendor(Integer wareTransVendor) {
		this.wareTransVendor = wareTransVendor;
	}

	@Column(name = "WARE_TRANS_VENDOR_NAME")
	public String getWareTransVendorName() {
		return this.wareTransVendorName;
	}

	public void setWareTransVendorName(String wareTransVendorName) {
		this.wareTransVendorName = wareTransVendorName;
	}

	@Column(name = "WARE_TYPE")
	public String getWareType() {
		return this.wareType;
	}

	public void setWareType(String wareType) {
		this.wareType = wareType;
	}

	@Column(name = "WARE_VENDOR_CONTACT")
	public String getWareVendorContact() {
		return this.wareVendorContact;
	}

	public void setWareVendorContact(String wareVendorContact) {
		this.wareVendorContact = wareVendorContact;
	}

	@Column(name = "WARE_VENDOR_FAX")
	public String getWareVendorFax() {
		return this.wareVendorFax;
	}

	public void setWareVendorFax(String wareVendorFax) {
		this.wareVendorFax = wareVendorFax;
	}

	@Column(name = "WARE_VENDOR_ID")
	public Integer getWareVendorId() {
		return this.wareVendorId;
	}

	public void setWareVendorId(Integer wareVendorId) {
		this.wareVendorId = wareVendorId;
	}

	@Column(name = "WARE_VENDOR_NAME")
	public String getWareVendorName() {
		return this.wareVendorName;
	}

	public void setWareVendorName(String wareVendorName) {
		this.wareVendorName = wareVendorName;
	}

	@Column(name = "WARE_VENDOR_TEL")
	public String getWareVendorTel() {
		return this.wareVendorTel;
	}

	public void setWareVendorTel(String wareVendorTel) {
		this.wareVendorTel = wareVendorTel;
	}

	@Column(name = "WARE_VESSEL")
	public String getWareVessel() {
		return this.wareVessel;
	}

	public void setWareVessel(String wareVessel) {
		this.wareVessel = wareVessel;
	}

	@Column(name = "WARE_VOYAGE")
	public String getWareVoyage() {
		return this.wareVoyage;
	}

	public void setWareVoyage(String wareVoyage) {
		this.wareVoyage = wareVoyage;
	}

}
