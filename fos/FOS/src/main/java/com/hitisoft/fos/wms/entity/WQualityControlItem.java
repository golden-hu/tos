package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "W_QUALITY_CONTROL_ITEM")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WQualityControlItem extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Integer storageNoteId;//入库单ID
	private String storageNoteNo;//质检单编号单号
	private Integer receivedId;//收货ID
	private Integer cargoId; //货物ID
	private String cargoName;//货物名称
	private String skuNO; //货物编号
	private String specification; //规格
	private String cargoType; //货物型号
	private String cargoColor;//货物颜色
	private String qualityType; //品质
	private String qaFlagType;//质检状态
	private Double qaFlagQuantity;//质检数量
	private String qaFlagQuantityUnit;//质检数量单位
	private Double qaFlagPackages; //质检件数
	private String qaFlagPackagesUnit;//质检件数单位
	private Double qaFlagGrossWeight;//质检毛重
	private Double qaFlagNetWeight;//质检净重
	private String qaFlagWeightUnit;//质检重量单位
	private Double qaFlagVolume;//质检体积
	private Double qaFlagMeasure;//质检面积
	private String qaFlagMeasureUnit;//质检面积单位
	private String qaFlagVolumeUnit;//质检体积单位
	private Double qaFlagCasingQuantity;//质检包装数
	private String qaFlagCasingUnit;//质检包装数单位
	private Double qaFlagCasingQuantityTwo;//质检包装数2
	private String qaFlagCasingUnitTwo;//质检包装数单位2
	private Double qaFlagCasingQuantityThree;//质检包装数3
	private String qaFlagCasingUnitThree;//质检包装数单位3
	private Double qaFlagCasingQuantityFour;//质检包装数4
	private String qaFlagCasingUnitFour;//质检包装数单位4
	private Double qaFlagCasingQuantityFive;//质检包装数5
	private String qaFlagCasingUnitFive;//质检包装数单位5
	private String trayType;//托盘类型
	private String trayQuantity;//托盘数量
	private Date   qaFlagData;//质检时间
	private String qaFlagOperatorName;//质检操作人
	private Double placedQuantity;//上架数量
	private Double placedPackages;//上架件数
	private Double placedGrossWeight;//上架毛重
	private Double placedNetWeight;//上架净重
	private Double placedVolume;//上架体积
	private Double placedQuantityNot;//未上架数量
	private Double placedPackagesNot;//未上架件数
	private Double placedGrossWeightNot;//未上架毛重
	private Double placedNetWeightNot;//未上架净重
	private Double placedVolumeNot;//未上架体积
	private Double placedPackQuantity;//上架包装一数
	private Double placedPackQuantityTwo;
	private Double placedPackQuantityThree;
	private Double placedPackQuantityFour;
	private Double placedPackQuantityFive;
	private Double placedPackQuantityNot;//未上架包装一数
	private Double placedPackQuantityTwoNot;
	private Double placedPackQuantityThreeNot;
	private Double placedPackQuantityFourNot;
	private Double placedPackQuantityFiveNot;
	private Integer warehouseId;//仓库ID
	private String warehouseCode;//仓库代码
	private String warehouseName;//仓库名称
	private Integer areaId;//库区id
	private String areaCode;//库区代码
	private String areaName;//库区名称
	private Integer blockId;//库位id
	private String blockCode;//库位代码
	private String blockName;//库位名称
	private String orderNo;//订单编号
	private String cargoOwnerName;//货主
	
	public WQualityControlItem(){}

	@Column(name="STORAGE_NOTE_ID")
	public Integer getStorageNoteId() {
		return storageNoteId;
	}

	public void setStorageNoteId(Integer storageNoteId) {
		this.storageNoteId = storageNoteId;
	}

	@Column(name="STORAGE_NOTE_NO")
	public String getStorageNoteNo() {
		return storageNoteNo;
	}

	public void setStorageNoteNo(String storageNoteNo) {
		this.storageNoteNo = storageNoteNo;
	}

	@Column(name="RECEIVED_ID")
	public Integer getReceivedId() {
		return receivedId;
	}

	public void setReceivedId(Integer receivedId) {
		this.receivedId = receivedId;
	}

	@Column(name="CORGO_ID")
	public Integer getCargoId() {
		return cargoId;
	}

	public void setCargoId(Integer cargoId) {
		this.cargoId = cargoId;
	}

	@Column(name="CARGO_NAME")
	public String getCargoName() {
		return cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}

	@Column(name="SKU_NO")
	public String getSkuNO() {
		return skuNO;
	}

	public void setSkuNO(String skuNO) {
		this.skuNO = skuNO;
	}

	@Column(name="SPECIFICATION")
	public String getSpecification() {
		return specification;
	}

	public void setSpecification(String specification) {
		this.specification = specification;
	}

	@Column(name="CARGO_TYPE")
	public String getCargoType() {
		return cargoType;
	}

	public void setCargoType(String cargoType) {
		this.cargoType = cargoType;
	}

	@Column(name="CARGO_COLOR")
	public String getCargoColor() {
		return cargoColor;
	}

	public void setCargoColor(String cargoColor) {
		this.cargoColor = cargoColor;
	}

	@Column(name="QUALITY_TYPE")
	public String getQualityType() {
		return qualityType;
	}

	public void setQualityType(String qualityType) {
		this.qualityType = qualityType;
	}

	@Column(name="QA_FLAG_TYPE")
	public String getQaFlagType() {
		return qaFlagType;
	}

	public void setQaFlagType(String qaFlagType) {
		this.qaFlagType = qaFlagType;
	}

	@Column(name="QA_FLAG_QUANTITY")
	public Double getQaFlagQuantity() {
		return qaFlagQuantity;
	}

	public void setQaFlagQuantity(Double qaFlagQuantity) {
		this.qaFlagQuantity = qaFlagQuantity;
	}

	@Column(name="QA_FLAG_QUANTITY_UNIT")
	public String getQaFlagQuantityUnit() {
		return qaFlagQuantityUnit;
	}

	public void setQaFlagQuantityUnit(String qaFlagQuantityUnit) {
		this.qaFlagQuantityUnit = qaFlagQuantityUnit;
	}

	@Column(name="QA_FLAG_PACKAGES")
	public Double getQaFlagPackages() {
		return qaFlagPackages;
	}

	public void setQaFlagPackages(Double qaFlagPackages) {
		this.qaFlagPackages = qaFlagPackages;
	}

	@Column(name="QA_FLAG_PACKAGES_UNIT")
	public String getQaFlagPackagesUnit() {
		return qaFlagPackagesUnit;
	}

	public void setQaFlagPackagesUnit(String qaFlagPackagesUnit) {
		this.qaFlagPackagesUnit = qaFlagPackagesUnit;
	}

	@Column(name="QA_FLAG_GROSS_WEIGHT")
	public Double getQaFlagGrossWeight() {
		return qaFlagGrossWeight;
	}

	public void setQaFlagGrossWeight(Double qaFlagGrossWeight) {
		this.qaFlagGrossWeight = qaFlagGrossWeight;
	}

	@Column(name="QA_FLAG_NET_WEIGHT")
	public Double getQaFlagNetWeight() {
		return qaFlagNetWeight;
	}

	public void setQaFlagNetWeight(Double qaFlagNetWeight) {
		this.qaFlagNetWeight = qaFlagNetWeight;
	}

	@Column(name="QA_FLAG_WEIGHT_UNIT")
	public String getQaFlagWeightUnit() {
		return qaFlagWeightUnit;
	}

	public void setQaFlagWeightUnit(String qaFlagWeightUnit) {
		this.qaFlagWeightUnit = qaFlagWeightUnit;
	}

	@Column(name="QA_FLAG_VOLUME")
	public Double getQaFlagVolume() {
		return qaFlagVolume;
	}

	public void setQaFlagVolume(Double qaFlagVolume) {
		this.qaFlagVolume = qaFlagVolume;
	}

	@Column(name="QA_FLAG_VOLUME_UNIT")
	public String getQaFlagVolumeUnit() {
		return qaFlagVolumeUnit;
	}

	public void setQaFlagVolumeUnit(String qaFlagVolumeUnit) {
		this.qaFlagVolumeUnit = qaFlagVolumeUnit;
	}

	@Column(name="QA_FLAG_CASING_QUANTITY")
	public Double getQaFlagCasingQuantity() {
		return qaFlagCasingQuantity;
	}

	public void setQaFlagCasingQuantity(Double qaFlagCasingQuantity) {
		this.qaFlagCasingQuantity = qaFlagCasingQuantity;
	}

	@Column(name="QA_FLAG_CASING_UNIT")
	public String getQaFlagCasingUnit() {
		return qaFlagCasingUnit;
	}

	public void setQaFlagCasingUnit(String qaFlagCasingUnit) {
		this.qaFlagCasingUnit = qaFlagCasingUnit;
	}

	@Column(name="TRAY_TYPE")
	public String getTrayType() {
		return trayType;
	}

	public void setTrayType(String trayType) {
		this.trayType = trayType;
	}

	@Column(name="TRAY_QUANTITY")
	public String getTrayQuantity() {
		return trayQuantity;
	}

	public void setTrayQuantity(String trayQuantity) {
		this.trayQuantity = trayQuantity;
	}

	@Column(name="QA_FLAG_DATA")
	public Date getQaFlagData() {
		return qaFlagData;
	}

	public void setQaFlagData(Date qaFlagData) {
		this.qaFlagData = qaFlagData;
	}

	@Column(name="QA_FLAG_OPERATOR_NAME")
	public String getQaFlagOperatorName() {
		return qaFlagOperatorName;
	}

	public void setQaFlagOperatorName(String qaFlagOperatorName) {
		this.qaFlagOperatorName = qaFlagOperatorName;
	}

	@Column(name="PLACED_QUANTITY")
	public Double getPlacedQuantity() {
		return placedQuantity;
	}

	public void setPlacedQuantity(Double placedQuantity) {
		this.placedQuantity = placedQuantity;
	}

	@Column(name="PLACED_PACKAGES")
	public Double getPlacedPackages() {
		return placedPackages;
	}

	public void setPlacedPackages(Double placedPackages) {
		this.placedPackages = placedPackages;
	}

	@Column(name="PLACED_GROSS_WEIGHT")
	public Double getPlacedGrossWeight() {
		return placedGrossWeight;
	}

	public void setPlacedGrossWeight(Double placedGrossWeight) {
		this.placedGrossWeight = placedGrossWeight;
	}

	@Column(name="PLACED_NET_WEIGHT")
	public Double getPlacedNetWeight() {
		return placedNetWeight;
	}

	public void setPlacedNetWeight(Double placedNetWeight) {
		this.placedNetWeight = placedNetWeight;
	}

	@Column(name="PLACED_VOLUME")
	public Double getPlacedVolume() {
		return placedVolume;
	}

	public void setPlacedVolume(Double placedVolume) {
		this.placedVolume = placedVolume;
	}

	@Column(name="PLACED_PACK_QUANTITY")
	public Double getPlacedPackQuantity() {
		return placedPackQuantity;
	}

	public void setPlacedPackQuantity(Double placedPackQuantity) {
		this.placedPackQuantity = placedPackQuantity;
	}

	@Column(name="PLACED_PACK_QUANTITY_TWO")
	public Double getPlacedPackQuantityTwo() {
		return placedPackQuantityTwo;
	}

	public void setPlacedPackQuantityTwo(Double placedPackQuantityTwo) {
		this.placedPackQuantityTwo = placedPackQuantityTwo;
	}

	@Column(name="PLACED_PACK_QUANTITY_THREE")
	public Double getPlacedPackQuantityThree() {
		return placedPackQuantityThree;
	}

	public void setPlacedPackQuantityThree(Double placedPackQuantityThree) {
		this.placedPackQuantityThree = placedPackQuantityThree;
	}

	@Column(name="PLACED_PACK_QUANTITY_FOUR")
	public Double getPlacedPackQuantityFour() {
		return placedPackQuantityFour;
	}

	public void setPlacedPackQuantityFour(Double placedPackQuantityFour) {
		this.placedPackQuantityFour = placedPackQuantityFour;
	}

	@Column(name="PLACED_PACK_QUANTITY_FIVE")
	public Double getPlacedPackQuantityFive() {
		return placedPackQuantityFive;
	}


	@Column(name="PLACED_QUANTITY_NOT")
	public Double getPlacedQuantityNot() {
		return placedQuantityNot;
	}

	public void setPlacedQuantityNot(Double placedQuantityNot) {
		this.placedQuantityNot = placedQuantityNot;
	}

	@Column(name="PLACED_PACKAGES_NO")
	public Double getPlacedPackagesNot() {
		return placedPackagesNot;
	}

	public void setPlacedPackagesNot(Double placedPackagesNot) {
		this.placedPackagesNot = placedPackagesNot;
	}

	@Column(name="PLACED_GROSS_WEIGHT_NOT")
	public Double getPlacedGrossWeightNot() {
		return placedGrossWeightNot;
	}

	public void setPlacedGrossWeightNot(Double placedGrossWeightNot) {
		this.placedGrossWeightNot = placedGrossWeightNot;
	}

	@Column(name="PLACED_NET_WEIGHT_NOT")
	public Double getPlacedNetWeightNot() {
		return placedNetWeightNot;
	}

	public void setPlacedNetWeightNot(Double placedNetWeightNot) {
		this.placedNetWeightNot = placedNetWeightNot;
	}

	@Column(name="PLACED_VOLUME_NOT")
	public Double getPlacedVolumeNot() {
		return placedVolumeNot;
	}

	public void setPlacedVolumeNot(Double placedVolumeNot) {
		this.placedVolumeNot = placedVolumeNot;
	}

	@Column(name="PLACED_PACE_QUANTITY_NOT")
	public Double getPlacedPackQuantityNot() {
		return placedPackQuantityNot;
	}

	public void setPlacedPackQuantityNot(Double placedPackQuantityNot) {
		this.placedPackQuantityNot = placedPackQuantityNot;
	}

	@Column(name="PLACED_PACE_QUANTITY_TWO_NOT")
	public Double getPlacedPackQuantityTwoNot() {
		return placedPackQuantityTwoNot;
	}

	public void setPlacedPackQuantityTwoNot(Double placedPackQuantityTwoNot) {
		this.placedPackQuantityTwoNot = placedPackQuantityTwoNot;
	}

	@Column(name="PLACED_PACE_QUANTITY_THREE_NOT")
	public Double getPlacedPackQuantityThreeNot() {
		return placedPackQuantityThreeNot;
	}

	public void setPlacedPackQuantityThreeNot(Double placedPackQuantityThreeNot) {
		this.placedPackQuantityThreeNot = placedPackQuantityThreeNot;
	}

	@Column(name="PLACED_PACE_QUANTITY_FOUR_NOT")
	public Double getPlacedPackQuantityFourNot() {
		return placedPackQuantityFourNot;
	}

	public void setPlacedPackQuantityFourNot(Double placedPackQuantityFourNot) {
		this.placedPackQuantityFourNot = placedPackQuantityFourNot;
	}

	@Column(name="PLACED_PACE_QUANTITY_FIVE_NOT")
	public Double getPlacedPackQuantityFiveNot() {
		return placedPackQuantityFiveNot;
	}

	public void setPlacedPackQuantityFiveNot(Double placedPackQuantityFiveNot) {
		this.placedPackQuantityFiveNot = placedPackQuantityFiveNot;
	}

	@Column(name="QA_FLAG_CASING_QUANTITY_TWO")
	public Double getQaFlagCasingQuantityTwo() {
		return qaFlagCasingQuantityTwo;
	}

	public void setQaFlagCasingQuantityTwo(Double qaFlagCasingQuantityTwo) {
		this.qaFlagCasingQuantityTwo = qaFlagCasingQuantityTwo;
	}

	@Column(name="QA_FLAG_CASING_UNIT_TWO")
	public String getQaFlagCasingUnitTwo() {
		return qaFlagCasingUnitTwo;
	}

	public void setQaFlagCasingUnitTwo(String qaFlagCasingUnitTwo) {
		this.qaFlagCasingUnitTwo = qaFlagCasingUnitTwo;
	}

	@Column(name="QA_FLAG_CASING_QUANTITY_THREE")
	public Double getQaFlagCasingQuantityThree() {
		return qaFlagCasingQuantityThree;
	}

	public void setQaFlagCasingQuantityThree(Double qaFlagCasingQuantityThree) {
		this.qaFlagCasingQuantityThree = qaFlagCasingQuantityThree;
	}

	@Column(name="QA_FLAG_CASING_UNIT_THREE")
	public String getQaFlagCasingUnitThree() {
		return qaFlagCasingUnitThree;
	}

	public void setQaFlagCasingUnitThree(String qaFlagCasingUnitThree) {
		this.qaFlagCasingUnitThree = qaFlagCasingUnitThree;
	}

	@Column(name="QA_FLAG_CASING_QUANTITY_FOUR")
	public Double getQaFlagCasingQuantityFour() {
		return qaFlagCasingQuantityFour;
	}

	public void setQaFlagCasingQuantityFour(Double qaFlagCasingQuantityFour) {
		this.qaFlagCasingQuantityFour = qaFlagCasingQuantityFour;
	}

	@Column(name="QA_FLAG_CASING_UNIT_FOUR")
	public String getQaFlagCasingUnitFour() {
		return qaFlagCasingUnitFour;
	}

	public void setQaFlagCasingUnitFour(String qaFlagCasingUnitFour) {
		this.qaFlagCasingUnitFour = qaFlagCasingUnitFour;
	}

	@Column(name="QA_FLAG_CASING_QUANTITY_FIVE")
	public Double getQaFlagCasingQuantityFive() {
		return qaFlagCasingQuantityFive;
	}

	public void setQaFlagCasingQuantityFive(Double qaFlagCasingQuantityFive) {
		this.qaFlagCasingQuantityFive = qaFlagCasingQuantityFive;
	}

	@Column(name="QA_FLAG_CASING_UNIT_FIVE")
	public String getQaFlagCasingUnitFive() {
		return qaFlagCasingUnitFive;
	}

	public void setQaFlagCasingUnitFive(String qaFlagCasingUnitFive) {
		this.qaFlagCasingUnitFive = qaFlagCasingUnitFive;
	}

	public void setPlacedPackQuantityFive(Double placedPackQuantityFive) {
		this.placedPackQuantityFive = placedPackQuantityFive;
	}

	@Column(name="QA_FLAG_MEASURE")
	public Double getQaFlagMeasure() {
		return qaFlagMeasure;
	}

	public void setQaFlagMeasure(Double qaFlagMeasure) {
		this.qaFlagMeasure = qaFlagMeasure;
	}

	@Column(name="QA_FLAG_MEASURE_UNIT")
	public String getQaFlagMeasureUnit() {
		return qaFlagMeasureUnit;
	}

	public void setQaFlagMeasureUnit(String qaFlagMeasureUnit) {
		this.qaFlagMeasureUnit = qaFlagMeasureUnit;
	}

	@Column(name="WAREHOUSE_ID")
	public Integer getWarehouseId() {
		return warehouseId;
	}

	public void setWarehouseId(Integer warehouseId) {
		this.warehouseId = warehouseId;
	}

	@Column(name="WAREHOUSE_CODE")
	public String getWarehouseCode() {
		return warehouseCode;
	}

	public void setWarehouseCode(String warehouseCode) {
		this.warehouseCode = warehouseCode;
	}

	@Column(name="WAREHOUSE_NAME")
	public String getWarehouseName() {
		return warehouseName;
	}

	public void setWarehouseName(String warehouseName) {
		this.warehouseName = warehouseName;
	}

	@Column(name="AREA_ID")
	public Integer getAreaId() {
		return areaId;
	}

	public void setAreaId(Integer areaId) {
		this.areaId = areaId;
	}

	@Column(name="AREA_CODE")
	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}

	@Column(name="AREA_NAME")
	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	@Column(name="BLOCK_ID")
	public Integer getBlockId() {
		return blockId;
	}

	public void setBlockId(Integer blockId) {
		this.blockId = blockId;
	}

	@Column(name="BLOCK_CODE")
	public String getBlockCode() {
		return blockCode;
	}

	public void setBlockCode(String blockCode) {
		this.blockCode = blockCode;
	}

	@Column(name="BLOCK_NAME")
	public String getBlockName() {
		return blockName;
	}

	public void setBlockName(String blockName) {
		this.blockName = blockName;
	}

	@Transient
	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	@Transient
	public String getCargoOwnerName() {
		return cargoOwnerName;
	}

	public void setCargoOwnerName(String cargoOwnerName) {
		this.cargoOwnerName = cargoOwnerName;
	}
	
	
	
	
}
