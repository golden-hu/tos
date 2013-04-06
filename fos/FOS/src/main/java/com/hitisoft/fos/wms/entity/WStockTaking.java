package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "W_STOCK_TAKING")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WStockTaking extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private String stockTakingNo;
	private String stockClass;
	private Integer stockClassId     ;
	private Date stockDate;
	private String stockBy;
	private Integer warehouseId;
	private String warehouseCode;
	private String warehouseName;
	private String stockStatus;
	private Integer custId;
	private String custCode;
	private String custName;
	private Integer cargoId;
	private String cargoName;
	private String custNo;
	private String orderNo;
	private Integer fromBlockId;
	private String fromBlockCode;
	private String fromBlockName;
	private Integer endBlockId;
	private String endBlockCode;
	private String endBlockName;
	private Integer fromAreaId;
	private String fromAreaCode;
	private String fromAreaName;
	private Integer endAreaId;
	private String endAreaCode;
	private String endAreaName;
	private Date fromDate;
	private Date endDate;
	private String remarks;
	
	
	
	public WStockTaking(){
		
	}
	
	@Column(name = "STOCK_TAKING_NO")
	public String getStockTakingNo() {
		return this.stockTakingNo;
	}

	public void setStockTakingNo(String stockTakingNo) {
		this.stockTakingNo = stockTakingNo;
	}
	
	@Column(name = "STOCK_CLASS")
	public String getStockClass() {
		return this.stockClass;
	}

	public void setStockClass(String stockClass) {
		this.stockClass = stockClass;
	}
	
	@Column(name = "STOCK_CLASS_ID")
	public Integer getStockClassId() {
		return this.stockClassId;
	}

	public void setStockClassId(Integer stockClassId) {
		this.stockClassId = stockClassId;
	}
	
	@Column(name = "STOCK_DATE")
	public Date getStockDate() {
		return this.stockDate;
	}

	public void setStockDate(Date stockDate) {
		this.stockDate = stockDate;
	}
	
	@Column(name = "STOCK_BY")
	public String getStockBy() {
		return this.stockBy;
	}

	public void setStockBy(String stockBy) {
		this.stockBy = stockBy;
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
	
	@Column(name = "STOCK_STATUS")
	public String getStockStatus() {
		return this.stockStatus;
	}

	public void setStockStatus(String stockStatus) {
		this.stockStatus = stockStatus;
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
	
	@Column(name = "CUST_NO")
	public String getCustNo() {
		return this.custNo;
	}

	public void setCustNo(String custNo) {
		this.custNo = custNo;
	}
	
	@Column(name = "ORDER_NO")
	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	
	@Column(name = "FROM_BLOCK_ID")
	public Integer getFromBlockId() {
		return this.fromBlockId;
	}

	public void setFromBlockId(Integer fromBlockId) {
		this.fromBlockId = fromBlockId;
	}
	
	@Column(name = "FROM_BLOCK_CODE")
	public String getFromBlockCode() {
		return this.fromBlockCode;
	}

	public void setFromBlockCode(String fromBlockCode) {
		this.fromBlockCode = fromBlockCode;
	}
	
	@Column(name = "FROM_BLOCK_NAME")
	public String getFromBlockName() {
		return this.fromBlockName;
	}
	
	public void setFromBlockName(String fromBlockName) {
		this.fromBlockName = fromBlockName;
	}
	
	@Column(name = "END_BLOCK_ID")
	public Integer getEndBlockId() {
		return this.endBlockId;
	}

	public void setEndBlockId(Integer endBlockId) {
		this.endBlockId = endBlockId;
	}
	
	@Column(name = "END_BLOCK_CODE")
	public String getEndBlockCode() {
		return this.endBlockCode;
	}

	public void setEndBlockCode(String endBlockCode) {
		this.endBlockCode = endBlockCode;
	}
	
	@Column(name = "END_BLOCK_NAME")
	public String getEndBlockName() {
		return this.endBlockName;
	}
	
	public void setEndBlockName(String endBlockName) {
		this.endBlockName = endBlockName;
	}
	
	@Column(name = "FROM_AREA_ID")
	public Integer getFromAreaId() {
		return this.fromAreaId;
	}

	public void setFromAreaId(Integer fromAreaId) {
		this.fromAreaId = fromAreaId;
	}
	
	@Column(name = "FROM_AREA_CODE")
	public String getFromAreaCode() {
		return this.fromAreaCode;
	}

	public void setFromAreaCode(String fromAreaCode) {
		this.fromAreaCode = fromAreaCode;
	}
	
	@Column(name = "FROM_AREA_NAME")
	public String getFromAreaName() {
		return this.fromAreaName;
	}
	
	public void setFromAreaName(String fromAreaName) {
		this.fromAreaName = fromAreaName;
	}
	
	@Column(name = "END_AREA_ID")
	public Integer getEndAreaId() {
		return this.endAreaId;
	}

	public void setEndAreaId(Integer endAreaId) {
		this.endAreaId = endAreaId;
	}
	
	@Column(name = "END_AREA_CODE")
	public String getEndAreaCode() {
		return this.endAreaCode;
	}

	public void setEndAreaCode(String endAreaCode) {
		this.endAreaCode = endAreaCode;
	}
	
	@Column(name = "END_AREA_NAME")
	public String getEndAreaName() {
		return this.endAreaName;
	}
	
	public void setEndAreaName(String endAreaName) {
		this.endAreaName = endAreaName;
	}
	
	@Column(name = "FROM_DATE")
	public Date getFromDate() {
		return this.fromDate;
	}
	
	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}
	
	@Column(name = "END_DATE")
	public Date getEndDate() {
		return this.endDate;
	}
	
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	@Column(name = "REMARKS")
	public String getRemarks() {
		return this.remarks;
	}
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	

}
