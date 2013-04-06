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
@Table(name = "F_DO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FDo extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 2121879320010008386L;
	private Integer consId;
	private String consNo;
	private Date doArriveDate;
	private String doCargoDirection;
	private String doCargoName;
	private String doConsignee;
	private String doContainerNo;
	private BigDecimal doGrossWeight;
	private String doHarbour;
	private Date doInDate;
	private String doMarks;
	private BigDecimal doMeasurement;
	private BigDecimal doNetWeight;
	private String doNo;
	private Date doOutDate;
	private BigDecimal doPackages;
	private String doPort;
	private String doRemarks;
	private Byte doStatus;
	private String doVessel;
	private String doVoyage;
	private String doWarehouseAddress;
	private String doWarehouseContact;
	private Integer doWarehouseId;
	private String doWarehouseName;
	private String doWarehouseTel;
	private String hblNo;
	private String packName;

	public FDo() {
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

	@Temporal(TemporalType.DATE)
	@Column(name = "DO_ARRIVE_DATE")
	public Date getDoArriveDate() {
		return this.doArriveDate;
	}

	public void setDoArriveDate(Date doArriveDate) {
		this.doArriveDate = doArriveDate;
	}

	@Column(name = "DO_CARGO_DIRECTION")
	public String getDoCargoDirection() {
		return this.doCargoDirection;
	}

	public void setDoCargoDirection(String doCargoDirection) {
		this.doCargoDirection = doCargoDirection;
	}

	@Column(name = "DO_CARGO_NAME")
	public String getDoCargoName() {
		return this.doCargoName;
	}

	public void setDoCargoName(String doCargoName) {
		this.doCargoName = doCargoName;
	}

	@Column(name = "DO_CONSIGNEE")
	public String getDoConsignee() {
		return this.doConsignee;
	}

	public void setDoConsignee(String doConsignee) {
		this.doConsignee = doConsignee;
	}

	@Column(name = "DO_CONTAINER_NO")
	public String getDoContainerNo() {
		return this.doContainerNo;
	}

	public void setDoContainerNo(String doContainerNo) {
		this.doContainerNo = doContainerNo;
	}

	@Column(name = "DO_GROSS_WEIGHT")
	public BigDecimal getDoGrossWeight() {
		return this.doGrossWeight;
	}

	public void setDoGrossWeight(BigDecimal doGrossWeight) {
		this.doGrossWeight = doGrossWeight;
	}

	@Column(name = "DO_HARBOUR")
	public String getDoHarbour() {
		return this.doHarbour;
	}

	public void setDoHarbour(String doHarbour) {
		this.doHarbour = doHarbour;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "DO_IN_DATE")
	public Date getDoInDate() {
		return this.doInDate;
	}

	public void setDoInDate(Date doInDate) {
		this.doInDate = doInDate;
	}

	@Column(name = "DO_MARKS")
	public String getDoMarks() {
		return this.doMarks;
	}

	public void setDoMarks(String doMarks) {
		this.doMarks = doMarks;
	}

	@Column(name = "DO_MEASUREMENT")
	public BigDecimal getDoMeasurement() {
		return this.doMeasurement;
	}

	public void setDoMeasurement(BigDecimal doMeasurement) {
		this.doMeasurement = doMeasurement;
	}

	@Column(name = "DO_NET_WEIGHT")
	public BigDecimal getDoNetWeight() {
		return this.doNetWeight;
	}

	public void setDoNetWeight(BigDecimal doNetWeight) {
		this.doNetWeight = doNetWeight;
	}

	@Column(name = "DO_NO")
	public String getDoNo() {
		return this.doNo;
	}

	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "DO_OUT_DATE")
	public Date getDoOutDate() {
		return this.doOutDate;
	}

	public void setDoOutDate(Date doOutDate) {
		this.doOutDate = doOutDate;
	}

	@Column(name = "DO_PACKAGES")
	public BigDecimal getDoPackages() {
		return this.doPackages;
	}

	public void setDoPackages(BigDecimal doPackages) {
		this.doPackages = doPackages;
	}

	@Column(name = "DO_PORT")
	public String getDoPort() {
		return this.doPort;
	}

	public void setDoPort(String doPort) {
		this.doPort = doPort;
	}

	@Column(name = "DO_REMARKS")
	public String getDoRemarks() {
		return this.doRemarks;
	}

	public void setDoRemarks(String doRemarks) {
		this.doRemarks = doRemarks;
	}

	@Column(name = "DO_STATUS")
	public Byte getDoStatus() {
		return this.doStatus;
	}

	public void setDoStatus(Byte doStatus) {
		this.doStatus = doStatus;
	}

	@Column(name = "DO_VESSEL")
	public String getDoVessel() {
		return this.doVessel;
	}

	public void setDoVessel(String doVessel) {
		this.doVessel = doVessel;
	}

	@Column(name = "DO_VOYAGE")
	public String getDoVoyage() {
		return this.doVoyage;
	}

	public void setDoVoyage(String doVoyage) {
		this.doVoyage = doVoyage;
	}

	@Column(name = "DO_WAREHOUSE_ADDRESS")
	public String getDoWarehouseAddress() {
		return this.doWarehouseAddress;
	}

	public void setDoWarehouseAddress(String doWarehouseAddress) {
		this.doWarehouseAddress = doWarehouseAddress;
	}

	@Column(name = "DO_WAREHOUSE_CONTACT")
	public String getDoWarehouseContact() {
		return this.doWarehouseContact;
	}

	public void setDoWarehouseContact(String doWarehouseContact) {
		this.doWarehouseContact = doWarehouseContact;
	}

	@Column(name = "DO_WAREHOUSE_ID")
	public Integer getDoWarehouseId() {
		return this.doWarehouseId;
	}

	public void setDoWarehouseId(Integer doWarehouseId) {
		this.doWarehouseId = doWarehouseId;
	}

	@Column(name = "DO_WAREHOUSE_NAME")
	public String getDoWarehouseName() {
		return this.doWarehouseName;
	}

	public void setDoWarehouseName(String doWarehouseName) {
		this.doWarehouseName = doWarehouseName;
	}

	@Column(name = "DO_WAREHOUSE_TEL")
	public String getDoWarehouseTel() {
		return this.doWarehouseTel;
	}

	public void setDoWarehouseTel(String doWarehouseTel) {
		this.doWarehouseTel = doWarehouseTel;
	}

	@Column(name = "HBL_NO")
	public String getHblNo() {
		return this.hblNo;
	}

	public void setHblNo(String hblNo) {
		this.hblNo = hblNo;
	}

	@Column(name = "PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}

}
