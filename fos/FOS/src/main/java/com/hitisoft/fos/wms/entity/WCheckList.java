package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.util.Date;


/**
 * The persistent class for the w_check_list database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_CHECK_LIST")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WCheckList extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private Double accountQuantity;
	private String adjustPerson;
	private Double adjustQuantity;
	private String adjustReason;
	private Date adjustTime;
	private String areaCode;
	private Long areaId;
	private String areaName;
	private String batchNo;
	private String blockCode;
	private Long blockId;
	private String blockName;
	private String skuNo;
	private Long cargoId;
	private String cargoName;
	private Long checkNoteId;
	private String checkNoteNo;
	private Double checkQuantity;
	private Long custId;
	private String custName;
	private Double grossWeight;
	private Byte lossOrProfit;
	private Double lossQuantity;
	private Double netWeight;
	private Long unitId;
	private String unitName;
	private Long wUnitId;
	private String wUnitName;
	private String warehouseCode;
	private Long warehouseId;
	private String warehouseName;
	private Long storageNoteCargoId;
	private Long storageNoteId;
	private String storageNoteNo;
	private Long placedCargoId;
	private String productNo;
	private String newProductNo;
	private Date newProductDate;
	private Byte adjustOver;

    public WCheckList() {
    }


	@Column(name="ACCOUNT_QUANTITY")
	public Double getAccountQuantity() {
		return this.accountQuantity;
	}

	public void setAccountQuantity(Double accountQuantity) {
		this.accountQuantity = accountQuantity;
	}


	@Column(name="ADJUST_PERSON")
	public String getAdjustPerson() {
		return this.adjustPerson;
	}

	public void setAdjustPerson(String adjustPerson) {
		this.adjustPerson = adjustPerson;
	}


	@Column(name="ADJUST_QUANTITY")
	public Double getAdjustQuantity() {
		return this.adjustQuantity;
	}

	public void setAdjustQuantity(Double adjustQuantity) {
		this.adjustQuantity = adjustQuantity;
	}


	@Column(name="ADJUST_REASON")
	public String getAdjustReason() {
		return this.adjustReason;
	}

	public void setAdjustReason(String adjustReason) {
		this.adjustReason = adjustReason;
	}


    @Temporal( TemporalType.TIMESTAMP)
	@Column(name="ADJUST_TIME")
	public Date getAdjustTime() {
		return this.adjustTime;
	}

	public void setAdjustTime(Date adjustTime) {
		this.adjustTime = adjustTime;
	}


	@Column(name="AREA_CODE")
	public String getAreaCode() {
		return this.areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}


	@Column(name="AREA_ID")
	public Long getAreaId() {
		return this.areaId;
	}

	public void setAreaId(Long areaId) {
		this.areaId = areaId;
	}


	@Column(name="AREA_NAME")
	public String getAreaName() {
		return this.areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}


	@Column(name="BATCH_NO")
	public String getBatchNo() {
		return this.batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}


	@Column(name="BLOCK_CODE")
	public String getBlockCode() {
		return this.blockCode;
	}

	public void setBlockCode(String blockCode) {
		this.blockCode = blockCode;
	}


	@Column(name="BLOCK_ID")
	public Long getBlockId() {
		return this.blockId;
	}

	public void setBlockId(Long blockId) {
		this.blockId = blockId;
	}


	@Column(name="BLOCK_NAME")
	public String getBlockName() {
		return this.blockName;
	}

	public void setBlockName(String blockName) {
		this.blockName = blockName;
	}


	@Column(name="SKU_NO")
	public String getSkuNo() {
		return this.skuNo;
	}

	public void setSkuNo(String skuNo) {
		this.skuNo = skuNo;
	}


	@Column(name="CARGO_ID")
	public Long getCargoId() {
		return this.cargoId;
	}

	public void setCargoId(Long cargoId) {
		this.cargoId = cargoId;
	}


	@Column(name="CARGO_NAME")
	public String getCargoName() {
		return this.cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}


	@Column(name="CHECK_NOTE_ID")
	public Long getCheckNoteId() {
		return this.checkNoteId;
	}

	public void setCheckNoteId(Long checkNoteId) {
		this.checkNoteId = checkNoteId;
	}


	@Column(name="CHECK_NOTE_NO")
	public String getCheckNoteNo() {
		return this.checkNoteNo;
	}

	public void setCheckNoteNo(String checkNoteNo) {
		this.checkNoteNo = checkNoteNo;
	}


	@Column(name="CHECK_QUANTITY")
	public Double getCheckQuantity() {
		return this.checkQuantity;
	}

	public void setCheckQuantity(Double checkQuantity) {
		this.checkQuantity = checkQuantity;
	}


	@Column(name="CUST_ID")
	public Long getCustId() {
		return this.custId;
	}

	public void setCustId(Long custId) {
		this.custId = custId;
	}


	@Column(name="CUST_NAME")
	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}


	@Column(name="GROSS_WEIGHT")
	public Double getGrossWeight() {
		return this.grossWeight;
	}

	public void setGrossWeight(Double grossWeight) {
		this.grossWeight = grossWeight;
	}


	@Column(name="LOSS_OR_PROFIT")
	public Byte getLossOrProfit() {
		return this.lossOrProfit;
	}

	public void setLossOrProfit(Byte lossOrProfit) {
		this.lossOrProfit = lossOrProfit;
	}


	@Column(name="LOSS_QUANTITY")
	public Double getLossQuantity() {
		return this.lossQuantity;
	}

	public void setLossQuantity(Double lossQuantity) {
		this.lossQuantity = lossQuantity;
	}


	@Column(name="NET_WEIGHT")
	public Double getNetWeight() {
		return this.netWeight;
	}

	public void setNetWeight(Double netWeight) {
		this.netWeight = netWeight;
	}


	@Column(name="UNIT_ID")
	public Long getUnitId() {
		return this.unitId;
	}

	public void setUnitId(Long unitId) {
		this.unitId = unitId;
	}


	@Column(name="UNIT_NAME")
	public String getUnitName() {
		return this.unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}


	@Column(name="W_UNIT_ID")
	public Long getWUnitId() {
		return this.wUnitId;
	}

	public void setWUnitId(Long wUnitId) {
		this.wUnitId = wUnitId;
	}


	@Column(name="W_UNIT_NAME")
	public String getWUnitName() {
		return this.wUnitName;
	}

	public void setWUnitName(String wUnitName) {
		this.wUnitName = wUnitName;
	}


	@Column(name="WAREHOUSE_CODE")
	public String getWarehouseCode() {
		return this.warehouseCode;
	}

	public void setWarehouseCode(String warehouseCode) {
		this.warehouseCode = warehouseCode;
	}


	@Column(name="WAREHOUSE_ID")
	public Long getWarehouseId() {
		return this.warehouseId;
	}

	public void setWarehouseId(Long warehouseId) {
		this.warehouseId = warehouseId;
	}


	@Column(name="WAREHOUSE_NAME")
	public String getWarehouseName() {
		return this.warehouseName;
	}

	public void setWarehouseName(String warehouseName) {
		this.warehouseName = warehouseName;
	}
	
	@Column(name="STORAGE_NOTE_CARGO_ID")
	public Long getStorageNoteCargoId() {
		return this.storageNoteCargoId;
	}

	public void setStorageNoteCargoId(Long storageNoteCargoId) {
		this.storageNoteCargoId = storageNoteCargoId;
	}
	
	@Column(name="STORAGE_NOTE_ID")
	public Long getStorageNoteId() {
		return this.storageNoteId;
	}

	public void setStorageNoteId(Long storageNoteId) {
		this.storageNoteId = storageNoteId;
	}
	
	@Column(name="PLACED_CARGO_ID")
	public Long getPlacedCargoId() {
		return this.placedCargoId;
	}

	public void setPlacedCargoId(Long placedCargoId) {
		this.placedCargoId = placedCargoId;
	}

	@Column(name="PRODUCT_NO")
	public String getProductNo() {
		return productNo;
	}


	public void setProductNo(String productNo) {
		this.productNo = productNo;
	}

	@Column(name="STORAGE_NOTE_NO")
	public String getStorageNoteNo() {
		return storageNoteNo;
	}


	public void setStorageNoteNo(String storageNoteNo) {
		this.storageNoteNo = storageNoteNo;
	}

	@Column(name="ADJUST_OVER")
	public Byte getAdjustOver() {
		return adjustOver;
	}


	public void setAdjustOver(Byte adjustOver) {
		this.adjustOver = adjustOver;
	}

	@Column(name="NEW_PRODUCT_NO")
	public String getNewProductNo() {
		return newProductNo;
	}


	public void setNewProductNo(String newProductNo) {
		this.newProductNo = newProductNo;
	}

	@Column(name="NEW_PRODUCT_DATE")
	public Date getNewProductDate() {
		return newProductDate;
	}


	public void setNewProductDate(Date newProductDate) {
		this.newProductDate = newProductDate;
	}

}