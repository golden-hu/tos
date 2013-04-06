package com.hitisoft.fos.wms.entity;

import java.io.Serializable;

import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "W_STOCK_TAKING_LIST")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WStockTakingList extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable{
	private static final long serialVersionUID = 1L;	
	
	private Integer warehouseId;
	private String warehouseCode;
	private String warehouseName;
	private Integer custId;
	private String custCode;
	private String custName;
	private Integer cargoId;
	private String cargoName;
	private Integer blockId;
	private String blockCode;
	private String blockName;
	private Integer areaId;
	private String areaCode;
	private String areaName;
	private Double bookQuantity;
	private Integer wUnitId;
	private String wUnitName;
	private Double grossWeight;
	private Double measurement;
	private Double realQuantity;
	private Double realWeight;
	private Double realMeasurement;
	private String remarks;
	private Integer stockTakingId;
	
	
	public WStockTakingList(){
		
	}
	
	@Column(name = "WAREHOUSE_ID")
	public Integer getWarehouseId() {
		return this.warehouseId;
	}

	public void setWarehouseId(Integer warehouseId) {
		this.warehouseId = warehouseId;
	}
	
	@Column(name = "WAREHOUSE_CODE")
	public String getWarehouseCode() {
		return this.warehouseCode;
	}

	public void setWarehouseCode(String warehouseCode) {
		this.warehouseCode = warehouseCode;
	}
	
	@Column(name = "WAREHOUSE_NAME")
	public String getWarehouseName() {
		return this.warehouseName;
	}

	public void setWarehouseName(String warehouseName) {
		this.warehouseName = warehouseName;
	}
	
	@Column(name = "CUST_ID")
	public Integer getCustId() {
		return this.custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}
	
	@Column(name = "Cust_CODE")
	public String getCustCode() {
		return this.custCode;
	}

	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}
	
	@Column(name = "CUST_NAME")
	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}
	
	@Column(name = "CARGO_ID")
	public Integer getCargoId() {
		return this.cargoId;
	}

	public void setCargoId(Integer cargoId) {
		this.cargoId = cargoId;
	}
	
	@Column(name = "CARGO_CODE")
	public String getCargoName() {
		return this.cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}
	
	@Column(name = "BLOCK_ID")
	public Integer getBlockId() {
		return this.blockId;
	}

	public void setBlockId(Integer blockId) {
		this.blockId = blockId;
	}
	
	@Column(name = "BLOCK_CODE")
	public String getBlockCode() {
		return this.blockCode;
	}

	public void setBlockCode(String blockCode) {
		this.blockCode = blockCode;
	}
	
	@Column(name = "BLOCK_NAME")
	public String getBlockName() {
		return this.blockName;
	}
	
	public void setBlockName(String blockName) {
		this.blockName = blockName;
	}
	
	@Column(name = "AREA_ID")
	public Integer getAreaId() {
		return this.areaId;
	}

	public void setAreaId(Integer areaId) {
		this.areaId = areaId;
	}
	
	@Column(name = "AREA_CODE")
	public String getAreaCode() {
		return this.areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	
	@Column(name = "AREA_NAME")
	public String getAreaName() {
		return this.areaName;
	}
	
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	
	@Column(name = "BOOK_QUANTITY")
	public Double getBookQuantity() {
		return this.bookQuantity;
	}
	
	public void setBookQuantity(Double bookQuantity) {
		this.bookQuantity = bookQuantity;
	}
	
	@Column(name = "W_UNIT_ID")
	public Integer getWUnitId() {
		return this.wUnitId;
	}
	
	public void setWUnitId(Integer wUnitId) {
		this.wUnitId = wUnitId;
	}
	
	@Column(name = "W_UNIT_NAME")
	public String getWUnitName() {
		return this.wUnitName;
	}
	
	public void setWUnitName(String wUnitName) {
		this.wUnitName = wUnitName;
	}
	
	@Column(name = "GROSS_WEIGHT ")
	public Double getGrossWeight() {
		return this.grossWeight;
	}
	
	public void setGrossWeight(Double grossWeight) {
		this.grossWeight = grossWeight;
	}
	
	@Column(name = "MEASUREMENT ")
	public Double getMeasurement() {
		return this.measurement;
	}
	
	public void setMeasurement(Double measurement) {
		this.measurement = measurement;
	}
	
	@Column(name = "REAL_QUANTITY ")
	public Double getRealQuantity() {
		return this.realQuantity;
	}
	
	public void setRealQuantity(Double realQuantity) {
		this.realQuantity = realQuantity;
	}
	
	@Column(name = "REAL_WEIGHT ")
	public Double getRealWeight() {
		return this.realWeight;
	}
	
	public void setRealWeight(Double realWeight) {
		this.realWeight = realWeight;
	}
	
	@Column(name = "REAL_MEASUREMENT ")
	public Double getRealMeasurement() {
		return this.realMeasurement;
	}
	
	public void setRealMeasurement(Double realMeasurement) {
		this.realMeasurement = realMeasurement;
	}
	
	@Column(name = "REMARKS ")
	public String getRemarks() {
		return this.remarks;
	}
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	@Column(name = "STOCK_TAKING_ID ")
	public Integer getStockTakingId() {
		return this.stockTakingId;
	}
	
	public void setStockTakingId(Integer stockTakingId) {
		this.stockTakingId = stockTakingId;
	}
	
	
}
