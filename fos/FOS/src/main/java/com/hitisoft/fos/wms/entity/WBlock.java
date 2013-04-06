package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;


/**
 * The persistent class for the w_block database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_BLOCK")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WBlock extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private String areaCode;
	private Long areaId;
	private String areaName;
	private String warehouseCode;
	private Long warehouseId;
	private String warehouseName;
	private Byte batchMixFlag;
	private String blockCode;
	private Integer blockCol;
	private String blockGroup;
	private Double blockHeight;
	private Integer blockLayer;
	private Double blockLength;
	private String blockName;
	private String blockNameEn;
	private Integer blockRow;
	private Byte blockType;
	private Double blockWidth;
	private Double blockX;
	private Double blockY;
	private Double blockZ;
	private Byte cargoMixFlag;
	private String inAreaCode;
	private Long inAreaId;
	private String inAreaName;
	private Integer maxPallet;
	private Double maxQuantity;
	private Double maxVolume;
	private Double maxWeight;
	private String outAreaCode;
	private Long outAreaId;
	private String outAreaName;
	private String remark;
	

	private String shelvesOrder;  //上架顺序
	private String pickOrder; //拣货顺序
	private String locationUsing; //库位使用
	private String locationAttribute; //库位属性
	private String locationProcessing; //库位处理
	private String turnoverDemand; //周转需求
	private String inventoryCondition; //库存环境 
	private String localGroup1; //库位组1
	private String localGroup2; //库位组2
	private Double maxArea; //最大面积
	private Integer coordinateZ; //z坐标
	private Integer storeTypeId; //存放类别ID
	private String storeTypeName; //存放类别名称 
	private String locationBarCode; //库位条码
	private String status; //状态
	
	////////虚拟字段
	private Double nowQuantity;
	private Double nowPackages;
	private Double nowGrossWeight;
	private Double nowNetWeight;
	private Double nowVolume;
	private Double nowMeasure;
	
	
    public WBlock() {
    }


	@Column(name="AREA_CODE")
	public String getAreaCode() {
		return this.areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}

	@Column(name="STATUS")
	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name="SHELVES_ORDER")
	public String getShelvesOrder() {
		return shelvesOrder;
	}


	public void setShelvesOrder(String shelvesOrder) {
		this.shelvesOrder = shelvesOrder;
	}


	@Column(name="PICK_ORDER")
	public String getPickOrder() {
		return pickOrder;
	}


	public void setPickOrder(String pickOrder) {
		this.pickOrder = pickOrder;
	}


	@Column(name="LOCATION_USING")
	public String getLocationUsing() {
		return locationUsing;
	}


	public void setLocationUsing(String locationUsing) {
		this.locationUsing = locationUsing;
	}


	@Column(name="LOCATION_ATTRIBUTE")
	public String getLocationAttribute() {
		return locationAttribute;
	}


	public void setLocationAttribute(String locationAttribute) {
		this.locationAttribute = locationAttribute;
	}


	@Column(name="LOCATION_PROCESSING")
	public String getLocationProcessing() {
		return locationProcessing;
	}


	public void setLocationProcessing(String locationProcessing) {
		this.locationProcessing = locationProcessing;
	}


	@Column(name="TURNOVER_DEMAND")
	public String getTurnoverDemand() {
		return turnoverDemand;
	}


	public void setTurnoverDemand(String turnoverDemand) {
		this.turnoverDemand = turnoverDemand;
	}


	@Column(name="INVENTORY_CONDITION")
	public String getInventoryCondition() {
		return inventoryCondition;
	}


	public void setInventoryCondition(String inventoryCondition) {
		this.inventoryCondition = inventoryCondition;
	}


	@Column(name="LOCAL_GROUP1")
	public String getLocalGroup1() {
		return localGroup1;
	}


	public void setLocalGroup1(String localGroup1) {
		this.localGroup1 = localGroup1;
	}


	@Column(name="LOCAL_GROUP2")
	public String getLocalGroup2() {
		return localGroup2;
	}


	public void setLocalGroup2(String localGroup2) {
		this.localGroup2 = localGroup2;
	}


	@Column(name="MAX_AREA")
	public Double getMaxArea() {
		return maxArea;
	}


	public void setMaxArea(Double maxArea) {
		this.maxArea = maxArea;
	}


	@Column(name="COORDINATE_Z")
	public Integer getCoordinateZ() {
		return coordinateZ;
	}


	public void setCoordinateZ(Integer coordinateZ) {
		this.coordinateZ = coordinateZ;
	}


	@Column(name="STORE_TYPE_ID")
	public Integer getStoreTypeId() {
		return storeTypeId;
	}


	public void setStoreTypeId(Integer storeTypeId) {
		this.storeTypeId = storeTypeId;
	}


	@Column(name="STORE_TYPE_NAME")
	public String getStoreTypeName() {
		return storeTypeName;
	}


	public void setStoreTypeName(String storeTypeName) {
		this.storeTypeName = storeTypeName;
	}


	@Column(name="LOCATION_BAR_CODE")
	public String getLocationBarCode() {
		return locationBarCode;
	}


	public void setLocationBarCode(String locationBarCode) {
		this.locationBarCode = locationBarCode;
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


	@Column(name="BATCH_MIX_FLAG")
	public Byte getBatchMixFlag() {
		return this.batchMixFlag;
	}

	public void setBatchMixFlag(Byte batchMixFlag) {
		this.batchMixFlag = batchMixFlag;
	}


	@Column(name="BLOCK_CODE")
	public String getBlockCode() {
		return this.blockCode;
	}

	public void setBlockCode(String blockCode) {
		this.blockCode = blockCode;
	}


	@Column(name="BLOCK_COL")
	public Integer getBlockCol() {
		return this.blockCol;
	}

	public void setBlockCol(Integer blockCol) {
		this.blockCol = blockCol;
	}


	@Column(name="BLOCK_GROUP")
	public String getBlockGroup() {
		return this.blockGroup;
	}

	public void setBlockGroup(String blockGroup) {
		this.blockGroup = blockGroup;
	}


	@Column(name="BLOCK_HEIGHT")
	public Double getBlockHeight() {
		return this.blockHeight;
	}

	public void setBlockHeight(Double blockHeight) {
		this.blockHeight = blockHeight;
	}


	@Column(name="BLOCK_LAYER")
	public Integer getBlockLayer() {
		return this.blockLayer;
	}

	public void setBlockLayer(Integer blockLayer) {
		this.blockLayer = blockLayer;
	}


	@Column(name="BLOCK_LENGTH")
	public Double getBlockLength() {
		return this.blockLength;
	}

	public void setBlockLength(Double blockLength) {
		this.blockLength = blockLength;
	}


	@Column(name="BLOCK_NAME")
	public String getBlockName() {
		return this.blockName;
	}

	public void setBlockName(String blockName) {
		this.blockName = blockName;
	}


	@Column(name="BLOCK_NAME_EN")
	public String getBlockNameEn() {
		return this.blockNameEn;
	}

	public void setBlockNameEn(String blockNameEn) {
		this.blockNameEn = blockNameEn;
	}


	@Column(name="BLOCK_ROW")
	public Integer getBlockRow() {
		return this.blockRow;
	}

	public void setBlockRow(Integer blockRow) {
		this.blockRow = blockRow;
	}


	@Column(name="BLOCK_TYPE")
	public Byte getBlockType() {
		return this.blockType;
	}

	public void setBlockType(Byte blockType) {
		this.blockType = blockType;
	}


	@Column(name="BLOCK_WIDTH")
	public Double getBlockWidth() {
		return this.blockWidth;
	}

	public void setBlockWidth(Double blockWidth) {
		this.blockWidth = blockWidth;
	}


	@Column(name="BLOCK_X")
	public Double getBlockX() {
		return this.blockX;
	}

	public void setBlockX(Double blockX) {
		this.blockX = blockX;
	}


	@Column(name="BLOCK_Y")
	public Double getBlockY() {
		return this.blockY;
	}

	public void setBlockY(Double blockY) {
		this.blockY = blockY;
	}


	@Column(name="BLOCK_Z")
	public Double getBlockZ() {
		return this.blockZ;
	}

	public void setBlockZ(Double blockZ) {
		this.blockZ = blockZ;
	}


	@Column(name="CARGO_MIX_FLAG")
	public Byte getCargoMixFlag() {
		return this.cargoMixFlag;
	}

	public void setCargoMixFlag(Byte cargoMixFlag) {
		this.cargoMixFlag = cargoMixFlag;
	}


	@Column(name="IN_AREA_CODE")
	public String getInAreaCode() {
		return this.inAreaCode;
	}

	public void setInAreaCode(String inAreaCode) {
		this.inAreaCode = inAreaCode;
	}


	@Column(name="IN_AREA_ID")
	public Long getInAreaId() {
		return this.inAreaId;
	}

	public void setInAreaId(Long inAreaId) {
		this.inAreaId = inAreaId;
	}


	@Column(name="IN_AREA_NAME")
	public String getInAreaName() {
		return this.inAreaName;
	}

	public void setInAreaName(String inAreaName) {
		this.inAreaName = inAreaName;
	}


	@Column(name="MAX_PALLET")
	public Integer getMaxPallet() {
		return this.maxPallet;
	}

	public void setMaxPallet(Integer maxPallet) {
		this.maxPallet = maxPallet;
	}


	@Column(name="MAX_QUANTITY")
	public Double getMaxQuantity() {
		return this.maxQuantity;
	}

	public void setMaxQuantity(Double maxQuantity) {
		this.maxQuantity = maxQuantity;
	}


	@Column(name="MAX_VOLUME")
	public Double getMaxVolume() {
		return this.maxVolume;
	}

	public void setMaxVolume(Double maxVolume) {
		this.maxVolume = maxVolume;
	}


	@Column(name="MAX_WEIGHT")
	public Double getMaxWeight() {
		return this.maxWeight;
	}

	public void setMaxWeight(Double maxWeight) {
		this.maxWeight = maxWeight;
	}


	@Column(name="OUT_AREA_CODE")
	public String getOutAreaCode() {
		return this.outAreaCode;
	}

	public void setOutAreaCode(String outAreaCode) {
		this.outAreaCode = outAreaCode;
	}


	@Column(name="OUT_AREA_ID")
	public Long getOutAreaId() {
		return this.outAreaId;
	}

	public void setOutAreaId(Long outAreaId) {
		this.outAreaId = outAreaId;
	}


	@Column(name="OUT_AREA_NAME")
	public String getOutAreaName() {
		return this.outAreaName;
	}

	public void setOutAreaName(String outAreaName) {
		this.outAreaName = outAreaName;
	}


	@Column(name="REMARK")
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	
	/////虚拟字段
	
	@Transient
	public Double getNowQuantity() {
		return nowQuantity;
	}

	@Transient
	public void setNowQuantity(Double nowQuantity) {
		this.nowQuantity = nowQuantity;
	}

	@Transient
	public Double getNowPackages() {
		return nowPackages;
	}


	public void setNowPackages(Double nowPackages) {
		this.nowPackages = nowPackages;
	}

	@Transient
	public Double getNowGrossWeight() {
		return nowGrossWeight;
	}


	public void setNowGrossWeight(Double nowGrossWeight) {
		this.nowGrossWeight = nowGrossWeight;
	}

	@Transient
	public Double getNowNetWeight() {
		return nowNetWeight;
	}


	public void setNowNetWeight(Double nowNetWeight) {
		this.nowNetWeight = nowNetWeight;
	}

	@Transient
	public Double getNowVolume() {
		return nowVolume;
	}


	public void setNowVolume(Double nowVolume) {
		this.nowVolume = nowVolume;
	}

	@Transient
	public Double getNowMeasure() {
		return nowMeasure;
	}


	public void setNowMeasure(Double nowMeasure) {
		this.nowMeasure = nowMeasure;
	}
	
	

	
}