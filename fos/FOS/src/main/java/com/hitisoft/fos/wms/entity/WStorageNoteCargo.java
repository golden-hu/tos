package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.util.Date;


/**
 * The persistent class for the w_storage_list database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_STORAGE_NOTE_CARGO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WStorageNoteCargo extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Double adjustQuantity;//调整数量
	private Double allotQuantity;//已分配数量
	private Double pickedQuantity;//已拣货数量
	private Double pickedGrossWeight;//已拣货毛重
	private Double pickedNetWeight;//已拣货净重
	private Double pickedVolume;//已拣货体积
	private Double pickedMeaSure;//已拣货面积
	private Double pickedPackages;//已拣货件数
	
	private Double distGrossWeight;	    //已分配毛重
	private Double distNetWeight;		//已分配净重
	private Double distMeasure;	        //已分配体积
	private Double distVolume;		    //已分配面积
	private Double distQuantity;	    //已分配数量
	private Double distPackages;		//已分配件数
	
	private Double placedQuantity;//上架数量
	private Double planedQuantity;//预期数量
	private Double receivedQuantity;//收货数量
	private Double sendQuantity;//已发货数量
	private Double sendGrossWeight;//已发货毛重
	private Double sendNetWeight;//已发货净重
	private Double sendVolume;//已发货体积
	private Double sendMeaSure;//已发货面积
	private Double sendPackages;//已发货件数
	//库区
	private String areaCode;
	private Integer areaId;
	private String areaName;
	
	private String batchNo;
	//库位
	private String blockCode;
	private Integer blockId;
	private String blockName;
	
	private String skuNo;
	private Integer cargoId;
	private String cargoName;
	private Double grossWeight;
	
	private Double netWeight;
	private Integer packId;
	private String packName;
	
	private String productNo;
	private Date productDate;
	private Byte qualityType;
	private String qaDescription;
	private Byte qaFlag;
	private String qaNo;
	private Byte qaType;	
	private Integer sampleNum;
	private Double sampleRate;	
	private String specification;
	private Integer status;
	private Integer storageNoteId;
	private String storageNoteNo;
	private Integer unitId;
	private String unitName;
	private Double unitPrice;
	private Integer wUnitId;
	private String wUnitName;
	private String warehouseCode;
	private Integer warehouseId;
	private String warehouseName;
	private Byte storageType;
	private Integer custId;
	private String custName;
	
	private Date actureTime;
	private String orderNo;
	private String entrustNo;
	
	private String cargoType;
	private String cargoColor;
	private String brand;
	private String inChargesUnit;
	private Integer inChargesUnitId;
	private String outChargesUnit;
	private Integer outChargesUnitId;
	private Double quantity;
	private Double planedPackages;
	private Double packages;
	private String pUnit;
	private Integer pUnitId;
	private Double planedGrossWeight;
	private Double planedNetWeight;
	private Double planedVolume;
	private Double volume;
	private String vUnitName;
	private Integer vUnitId;
	private Double planedMeasure;
	private Double measure;
	private String mUnitName;
	private Integer mUnitId;
	
	private Double planedCasing1;
	private Double casing1;
	private String c1UnitName;
	private Integer c1UnitId;
	private Double planedCasing2;
	private Double casing2;
	private String c2UnitName;
	private Integer c2UnitId;
	private Double planedCasing3;
	private Double casing3;
	private String c3UnitName;
	private Integer c3UnitId;
	private Double planedCasing4;
	private Double casing4;
	private String c4UnitName;
	private Integer c4UnitId;
	private Double planedCasing5;
	private Double casing5;
	private String c5UnitName;
	private Integer c5UnitId;
	private Double leavePlanedQuantity;
	private Double leavePlanedPackages;
	private Double leavePlanedGrossWeight;
	private Double leavePlanedNetWeight;
	private Double leavePlanedMeasure;
	private Double leavePlanedVolume;
	private Double leaveQuantity;
	private Double leavePackages;
	private Double leaveGrossWeight;
	private Double leaveNetWeight;
	private Double leaveMeasure;
	private Double leaveVolume;
	private Double damageQuantity;//破损数量
	private Double damageGrossWeight;//破损
	private Double damageNetWeight;//破损
	private Double damageVolume;//破损
	private Double damageMeaSure;//破损
	private Double damagePackages;//破损
	private String loadingaddress;
	private String unloadingaddress;
	private String typepayment;
	private String goodsrule;
	private String cargoOwnerName;
	
	private Integer receivedId;//收货ID
	private String receivedNo;//收货单号
	private Integer qualityVontrolId;//质检ID
	private String qualityVontrolNo;//质检单编号
	private Integer placedId; //上架ID
	private String placedNo; //上架单号
	private String qaFlagType;//质检状态
	private Double qaFlagQuantity;//质检数量
	private Double qaFlagPackages; //质检件数
	private Double qaFlagGrossWeight;//质检毛重
	private Double qaFlagNetWeight;//质检净重
	private Double qaFlagVolume;//质检体积
	private Double qaFlagCasingQuantity;//质检包装数
	private String qaFlagCasingUnit;//质检包装数单位
	private String trayType;//托盘类型
	private String trayQuantity;//托盘数量
	private Date qaFlagData;//质检时间
	private String qaFlagOperatorName;//质检操作人
	private Double placedPackages;//上架件数
	private Double placedGrossWeight;//上架毛重
	private Double placedNetWeight;//上架净重
	private Double placedVolume;//上架体积
	
	private Double placedMeasure;//上架面积
	
	private String barCode;     //商品条码
	private Double placedPackQuantity;//上架包装一数
	private Double placedPackQuantityTwo;
	private Double placedPackQuantityThree;
	private Double placedPackQuantityFour;
	private Double placedPackQuantityFive;
	private Double planPack;//计划包装数
	private Double planPackTwo;
	private Double planPackThree;
	private Double planPackFour;
	private Double planPackFive;
	private Double receivedPackages;//收货件数
	private Double receivedGrossWeight;//收货毛重
	private Double receivedNetWeight;//收货净重
	private Double receivedVolume;//收货体积
	private Double receivedMeasure;//收货面积
	private Double receivedPackQuantity;//收货包装1
	private Double receivedPackQuantityTwo;//收货包装2
	private Double receivedPackQuantityThree;//收货包装3
	private Double receivedPackQuantityFour;//收货包装4
	private Double receivedPackQuantityFive;//收货包装5
	private Double storageNoteOutQuantity;//出库数量
	private Double storageNoteOutPackages;//出库件数
	private Double storageNoteOutWeight;//出库毛重
	private Double storageNoteOutNetWeight;//出库净重
	private Double storageNoteOutVolume;//出库体积
	private Double storageNoteOutpack;//出库包装1
	private Double storageNoteOutpackTwo;//出库包装2
	private Double storageNoteOutpackThree;//出库包装3
	private Double storageNoteOutpackFour;//出库包装4
	private Double storageNoteOutpackFive;//出库包装5
	
	// add @20120819
	private Double DismantlingQuantity;
	private Date effectiveDate;
	private Double standardQuantity;
	private Double standardGrossWeight;
	private Double standardNetWeight;
	private Double standardVolume;
	private Double standardMeasure;
	private String remarks;	
	
    public WStorageNoteCargo() {
    }

    @Column(name="LOADING_ADDRESS")
	public String getLoadingaddress() {
		return loadingaddress;
	}
	public void setLoadingaddress(String loadingaddress) {
		this.loadingaddress = loadingaddress;
	}

	@Column(name="RECEIVED_ID")
	public Integer getReceivedId() {
		return receivedId;
	}

	public void setReceivedId(Integer receivedId) {
		this.receivedId = receivedId;
	}

	@Column(name="BAR_CODE")
	public String getBarCode() {
		return barCode;
	}

	public void setBarCode(String barCode) {
		this.barCode = barCode;
	}

	
	@Column(name="PLACED_MEASURE")
	public Double getPlacedMeasure() {
		return placedMeasure;
	}

	public void setPlacedMeasure(Double placedMeasure) {
		this.placedMeasure = placedMeasure;
	}

	@Column(name="RECEIVED_NO")
	public String getReceivedNo() {
		return receivedNo;
	}

	public void setReceivedNo(String receivedNo) {
		this.receivedNo = receivedNo;
	}

	@Column(name="QUALITY_VONTROL_ID")
	public Integer getQualityVontrolId() {
		return qualityVontrolId;
	}

	public void setQualityVontrolId(Integer qualityVontrolId) {
		this.qualityVontrolId = qualityVontrolId;
	}

	@Column(name="QUALITY_VONTROL_NO")
	public String getQualityVontrolNo() {
		return qualityVontrolNo;
	}

	public void setQualityVontrolNo(String qualityVontrolNo) {
		this.qualityVontrolNo = qualityVontrolNo;
	}

	@Column(name="PLACED_ID")
	public Integer getPlacedId() {
		return placedId;
	}

	public void setPlacedId(Integer placedId) {
		this.placedId = placedId;
	}

	@Column(name="PLACED_NO")
	public String getPlacedNo() {
		return placedNo;
	}

	public void setPlacedNo(String placedNo) {
		this.placedNo = placedNo;
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

	@Column(name="QA_FLAG_PACKAGES")
	public Double getQaFlagPackages() {
		return qaFlagPackages;
	}

	public void setQaFlagPackages(Double qaFlagPackages) {
		this.qaFlagPackages = qaFlagPackages;
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

	@Column(name="QA_FLAG_VOLUME")
	public Double getQaFlagVolume() {
		return qaFlagVolume;
	}

	public void setQaFlagVolume(Double qaFlagVolume) {
		this.qaFlagVolume = qaFlagVolume;
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

	public void setPlacedPackQuantityFive(Double placedPackQuantityFive) {
		this.placedPackQuantityFive = placedPackQuantityFive;
	}

	@Column(name="PLAN_PACK")
	public Double getPlanPack() {
		return planPack;
	}

	public void setPlanPack(Double planPack) {
		this.planPack = planPack;
	}

	@Column(name="PLAN_PACK_TWO")
	public Double getPlanPackTwo() {
		return planPackTwo;
	}

	public void setPlanPackTwo(Double planPackTwo) {
		this.planPackTwo = planPackTwo;
	}

	@Column(name="PLAN_PACK_THREE")
	public Double getPlanPackThree() {
		return planPackThree;
	}

	public void setPlanPackThree(Double planPackThree) {
		this.planPackThree = planPackThree;
	}

	@Column(name="PLAN_PACK_FOUR")
	public Double getPlanPackFour() {
		return planPackFour;
	}

	public void setPlanPackFour(Double planPackFour) {
		this.planPackFour = planPackFour;
	}

	@Column(name="PLAN_PACK_FIVE")
	public Double getPlanPackFive() {
		return planPackFive;
	}

	public void setPlanPackFive(Double planPackFive) {
		this.planPackFive = planPackFive;
	}

	@Column(name="RECEIVED_PACKAGES")
	public Double getReceivedPackages() {
		return receivedPackages;
	}

	public void setReceivedPackages(Double receivedPackages) {
		this.receivedPackages = receivedPackages;
	}

	@Column(name="RECEIVED_GROSS_WEIGHT")
	public Double getReceivedGrossWeight() {
		return receivedGrossWeight;
	}

	public void setReceivedGrossWeight(Double receivedGrossWeight) {
		this.receivedGrossWeight = receivedGrossWeight;
	}

	@Column(name="RECEIVED_NET_WEIGHT")
	public Double getReceivedNetWeight() {
		return receivedNetWeight;
	}

	public void setReceivedNetWeight(Double receivedNetWeight) {
		this.receivedNetWeight = receivedNetWeight;
	}

	@Column(name="RECEIVED_VOLUME")
	public Double getReceivedVolume() {
		return receivedVolume;
	}

	public void setReceivedVolume(Double receivedVolume) {
		this.receivedVolume = receivedVolume;
	}

	@Column(name="RECEIVED_PACK_QUANTITY")
	public Double getReceivedPackQuantity() {
		return receivedPackQuantity;
	}

	public void setReceivedPackQuantity(Double receivedPackQuantity) {
		this.receivedPackQuantity = receivedPackQuantity;
	}

	@Column(name="RECEIVED_PACK_QUANTITY_TWO")
	public Double getReceivedPackQuantityTwo() {
		return receivedPackQuantityTwo;
	}

	public void setReceivedPackQuantityTwo(Double receivedPackQuantityTwo) {
		this.receivedPackQuantityTwo = receivedPackQuantityTwo;
	}

	@Column(name="RECEIVED_PACK_QUANTITY_THREE")
	public Double getReceivedPackQuantityThree() {
		return receivedPackQuantityThree;
	}

	public void setReceivedPackQuantityThree(Double receivedPackQuantityThree) {
		this.receivedPackQuantityThree = receivedPackQuantityThree;
	}

	@Column(name="RECEIVED_PACK_QUANTITY_FOUR")
	public Double getReceivedPackQuantityFour() {
		return receivedPackQuantityFour;
	}

	public void setReceivedPackQuantityFour(Double receivedPackQuantityFour) {
		this.receivedPackQuantityFour = receivedPackQuantityFour;
	}

	@Column(name="RECEIVED_PACK_QUANTITY_FIVE")
	public Double getReceivedPackQuantityFive() {
		return receivedPackQuantityFive;
	}

	public void setReceivedPackQuantityFive(Double receivedPackQuantityFive) {
		this.receivedPackQuantityFive = receivedPackQuantityFive;
	}

	@Column(name="STORAGE_NOTE_OUT_QUANTITY")
	public Double getStorageNoteOutQuantity() {
		return storageNoteOutQuantity;
	}

	public void setStorageNoteOutQuantity(Double storageNoteOutQuantity) {
		this.storageNoteOutQuantity = storageNoteOutQuantity;
	}

	@Column(name="STORAGE_NOTE_OUT_PACKAGES")
	public Double getStorageNoteOutPackages() {
		return storageNoteOutPackages;
	}

	public void setStorageNoteOutPackages(Double storageNoteOutPackages) {
		this.storageNoteOutPackages = storageNoteOutPackages;
	}

	@Column(name="STORAGE_NOTE_OUT_WEIGHT")
	public Double getStorageNoteOutWeight() {
		return storageNoteOutWeight;
	}

	public void setStorageNoteOutWeight(Double storageNoteOutWeight) {
		this.storageNoteOutWeight = storageNoteOutWeight;
	}

	@Column(name="STORAGE_NOTE_OUT_ENT_WEIGHT")
	public Double getStorageNoteOutNetWeight() {
		return storageNoteOutNetWeight;
	}

	public void setStorageNoteOutNetWeight(Double storageNoteOutNetWeight) {
		this.storageNoteOutNetWeight = storageNoteOutNetWeight;
	}

	@Column(name="STORAGE_NOTE_OUT_VOLUME")
	public Double getStorageNoteOutVolume() {
		return storageNoteOutVolume;
	}

	public void setStorageNoteOutVolume(Double storageNoteOutVolume) {
		this.storageNoteOutVolume = storageNoteOutVolume;
	}

	@Column(name="STORAGE_NOTE_OUT_PACK")
	public Double getStorageNoteOutpack() {
		return storageNoteOutpack;
	}

	public void setStorageNoteOutpack(Double storageNoteOutpack) {
		this.storageNoteOutpack = storageNoteOutpack;
	}

	@Column(name="STORAGE_NOTE_OUT_PACK_TWO")
	public Double getStorageNoteOutpackTwo() {
		return storageNoteOutpackTwo;
	}

	public void setStorageNoteOutpackTwo(Double storageNoteOutpackTwo) {
		this.storageNoteOutpackTwo = storageNoteOutpackTwo;
	}

	@Column(name="STORAGE_NOTE_OUT_PACK_THREE")
	public Double getStorageNoteOutpackThree() {
		return storageNoteOutpackThree;
	}

	public void setStorageNoteOutpackThree(Double storageNoteOutpackThree) {
		this.storageNoteOutpackThree = storageNoteOutpackThree;
	}

	@Column(name="STORAGE_NOTE_OUT_PACK_FOUR")
	public Double getStorageNoteOutpackFour() {
		return storageNoteOutpackFour;
	}

	public void setStorageNoteOutpackFour(Double storageNoteOutpackFour) {
		this.storageNoteOutpackFour = storageNoteOutpackFour;
	}

	@Column(name="STORAGE_NOTE_OUT_PACK_FIVE")
	public Double getStorageNoteOutpackFive() {
		return storageNoteOutpackFive;
	}

	public void setStorageNoteOutpackFive(Double storageNoteOutpackFive) {
		this.storageNoteOutpackFive = storageNoteOutpackFive;
	}

	@Column(name="UNLOADING_ADDRESS")
	public String getUnloadingaddress() {
		return unloadingaddress;
	}
	public void setUnloadingaddress(String unloadingaddress) {
		this.unloadingaddress = unloadingaddress;
	}
	@Column(name="TYPE_PAYMENT")
	public String getTypepayment() {
		return typepayment;
	}
	public void setTypepayment(String typepayment) {
		this.typepayment = typepayment;
	}
	@Column(name="GOODS_RULE")
	public String getGoodsrule() {
		return goodsrule;
	}
	public void setGoodsrule(String goodsrule) {
		this.goodsrule = goodsrule;
	}
	@Column(name="ADJUST_QUANTITY")
	public Double getAdjustQuantity() {
		return this.adjustQuantity;
	}

	public void setAdjustQuantity(Double adjustQuantity) {
		this.adjustQuantity = adjustQuantity;
	}


	@Column(name="ALLOT_QUANTITY")
	public Double getAllotQuantity() {
		return this.allotQuantity;
	}

	public void setAllotQuantity(Double allotQuantity) {
		this.allotQuantity = allotQuantity;
	}


	@Column(name="AREA_CODE")
	public String getAreaCode() {
		return this.areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}


	@Column(name="AREA_ID")
	public Integer getAreaId() {
		return this.areaId;
	}

	public void setAreaId(Integer areaId) {
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
	public Integer getBlockId() {
		return this.blockId;
	}

	public void setBlockId(Integer blockId) {
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
	public Integer getCargoId() {
		return this.cargoId;
	}

	public void setCargoId(Integer cargoId) {
		this.cargoId = cargoId;
	}


	@Column(name="CARGO_NAME")
	public String getCargoName() {
		return this.cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}


	@Column(name="GROSS_WEIGHT")
	public Double getGrossWeight() {
		return this.grossWeight;
	}

	public void setGrossWeight(Double grossWeight) {
		this.grossWeight = grossWeight;
	}
	
	@Column(name="NET_WEIGHT")
	public Double getNetWeight() {
		return this.netWeight;
	}

	public void setNetWeight(Double netWeight) {
		this.netWeight = netWeight;
	}


	@Column(name="PACK_ID")
	public Integer getPackId() {
		return this.packId;
	}

	public void setPackId(Integer packId) {
		this.packId = packId;
	}


	@Column(name="PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}


	@Column(name="PICKED_QUANTITY")
	public Double getPickedQuantity() {
		return this.pickedQuantity;
	}

	public void setPickedQuantity(Double pickedQuantity) {
		this.pickedQuantity = pickedQuantity;
	}


	@Column(name="PLACED_QUANTITY")
	public Double getPlacedQuantity() {
		return this.placedQuantity;
	}

	public void setPlacedQuantity(Double placedQuantity) {
		this.placedQuantity = placedQuantity;
	}


	@Column(name="PLANED_QUANTITY")
	public Double getPlanedQuantity() {
		return this.planedQuantity;
	}

	public void setPlanedQuantity(Double planedQuantity) {
		this.planedQuantity = planedQuantity;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="PRODUCT_DATE")
	public Date getProductDate() {
		return this.productDate;
	}

	public void setProductDate(Date productDate) {
		this.productDate = productDate;
	}
	
	@Column(name="PRODUCT_NO")
	public String getProductNo() {
		return this.productNo;
	}

	public void setProductNo(String productNo) {
		this.productNo = productNo;
	}


	@Column(name="QA_DESCRIPTION")
	public String getQaDescription() {
		return this.qaDescription;
	}

	public void setQaDescription(String qaDescription) {
		this.qaDescription = qaDescription;
	}


	@Column(name="QA_FLAG")
	public Byte getQaFlag() {
		return this.qaFlag;
	}

	public void setQaFlag(Byte qaFlag) {
		this.qaFlag = qaFlag;
	}


	@Column(name="QA_NO")
	public String getQaNo() {
		return this.qaNo;
	}

	public void setQaNo(String qaNo) {
		this.qaNo = qaNo;
	}


	@Column(name="QA_TYPE")
	public Byte getQaType() {
		return this.qaType;
	}

	public void setQaType(Byte qaType) {
		this.qaType = qaType;
	}

	@Column(name="QUALITY_TYPE")
	public Byte getQualityType() {
		return this.qualityType;
	}

	public void setQualityType(Byte qualityType) {
		this.qualityType = qualityType;
	}

	@Column(name="RECEIVED_QUANTITY")
	public Double getReceivedQuantity() {
		return this.receivedQuantity;
	}

	public void setReceivedQuantity(Double receivedQuantity) {
		this.receivedQuantity = receivedQuantity;
	}


	@Column(name="SAMPLE_NUM")
	public Integer getSampleNum() {
		return this.sampleNum;
	}

	public void setSampleNum(Integer sampleNum) {
		this.sampleNum = sampleNum;
	}


	@Column(name="SAMPLE_RATE")
	public Double getSampleRate() {
		return this.sampleRate;
	}

	public void setSampleRate(Double sampleRate) {
		this.sampleRate = sampleRate;
	}


	@Column(name="SEND_QUANTITY")
	public Double getSendQuantity() {
		return this.sendQuantity;
	}

	public void setSendQuantity(Double sendQuantity) {
		this.sendQuantity = sendQuantity;
	}


	@Column(name="SPECIFICATION")
	public String getSpecification() {
		return this.specification;
	}

	public void setSpecification(String specification) {
		this.specification = specification;
	}


	@Column(name="STATUS")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}


	@Column(name="STORAGE_NOTE_ID")
	public Integer getStorageNoteId() {
		return this.storageNoteId;
	}

	public void setStorageNoteId(Integer storageNoteId) {
		this.storageNoteId = storageNoteId;
	}

	@Column(name="STORAGE_NOTE_NO")
	public String getStorageNoteNo() {
		return this.storageNoteNo;
	}

	public void setStorageNoteNo(String storageNoteNo) {
		this.storageNoteNo = storageNoteNo;
	}
	
	@Column(name="UNIT_ID")
	public Integer getUnitId() {
		return this.unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}


	@Column(name="UNIT_NAME")
	public String getUnitName() {
		return this.unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}


	@Column(name="UNIT_PRICE")
	public Double getUnitPrice() {
		return this.unitPrice;
	}

	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}


	@Column(name="W_UNIT_ID")
	public Integer getwUnitId() {
		return this.wUnitId;
	}

	public void setwUnitId(Integer wUnitId) {
		this.wUnitId = wUnitId;
	}


	@Column(name="W_UNIT_NAME")
	public String getwUnitName() {
		return this.wUnitName;
	}

	public void setwUnitName(String wUnitName) {
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
	public Integer getWarehouseId() {
		return this.warehouseId;
	}

	public void setWarehouseId(Integer warehouseId) {
		this.warehouseId = warehouseId;
	}


	@Column(name="WAREHOUSE_NAME")
	public String getWarehouseName() {
		return this.warehouseName;
	}

	public void setWarehouseName(String warehouseName) {
		this.warehouseName = warehouseName;
	}

	@Column(name="STORAGE_TYPE")
	public Byte getStorageType() {
		return this.storageType;
	}


	public void setStorageType(Byte storageType) {
		this.storageType = storageType;
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

	@Column(name="BRAND")
	public String getBrand() {
		return brand;
	}


	public void setBrand(String brand) {
		this.brand = brand;
	}

	@Column(name="IN_CHARGES_UNIT")
	public String getInChargesUnit() {
		return inChargesUnit;
	}


	public void setInChargesUnit(String inChargesUnit) {
		this.inChargesUnit = inChargesUnit;
	}

	@Column(name="IN_CHARGES_UNIT_ID")
	public Integer getInChargesUnitId() {
		return inChargesUnitId;
	}


	public void setInChargesUnitId(Integer inChargesUnitId) {
		this.inChargesUnitId = inChargesUnitId;
	}

	@Column(name="OUT_CHARGES_UNIT")
	public String getOutChargesUnit() {
		return outChargesUnit;
	}


	public void setOutChargesUnit(String outChargesUnit) {
		this.outChargesUnit = outChargesUnit;
	}

	@Column(name="OUT_CHARGES_UNIT_ID")
	public Integer getOutChargesUnitId() {
		return outChargesUnitId;
	}


	public void setOutChargesUnitId(Integer outChargesUnitId) {
		this.outChargesUnitId = outChargesUnitId;
	}

	@Column(name="QUANTITY")
	public Double getQuantity() {
		return quantity;
	}


	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	@Column(name="PLANED_PACKAGES")
	public Double getPlanedPackages() {
		return planedPackages;
	}


	public void setPlanedPackages(Double planedPackages) {
		this.planedPackages = planedPackages;
	}

	@Column(name="PACKAGES")
	public Double getPackages() {
		return packages;
	}


	public void setPackages(Double packages) {
		this.packages = packages;
	}

	@Column(name="P_UNIT")
	public String getpUnit() {
		return pUnit;
	}


	public void setpUnit(String pUnit) {
		this.pUnit = pUnit;
	}

	@Column(name="P_UNIT_ID")
	public Integer getpUnitId() {
		return pUnitId;
	}


	public void setpUnitId(Integer pUnitId) {
		this.pUnitId = pUnitId;
	}

	@Column(name="PLANED_GROSS_WEIGHT")
	public Double getPlanedGrossWeight() {
		return planedGrossWeight;
	}


	public void setPlanedGrossWeight(Double planedGrossWeight) {
		this.planedGrossWeight = planedGrossWeight;
	}

	@Column(name="PLANED_NET_WEIGHT")
	public Double getPlanedNetWeight() {
		return planedNetWeight;
	}


	public void setPlanedNetWeight(Double planedNetWeight) {
		this.planedNetWeight = planedNetWeight;
	}

	@Column(name="PLANED_VOLUME")
	public Double getPlanedVolume() {
		return planedVolume;
	}


	public void setPlanedVolume(Double planedVolume) {
		this.planedVolume = planedVolume;
	}

	@Column(name="VOLUME")
	public Double getVolume() {
		return volume;
	}


	public void setVolume(Double volume) {
		this.volume = volume;
	}

	@Column(name="V_UNIT_NAME")
	public String getvUnitName() {
		return vUnitName;
	}


	public void setvUnitName(String vUnitName) {
		this.vUnitName = vUnitName;
	}

	@Column(name="V_UNIT_ID")
	public Integer getvUnitId() {
		return vUnitId;
	}


	public void setvUnitId(Integer vUnitId) {
		this.vUnitId = vUnitId;
	}

	@Column(name="PLANED_MEASURE")
	public Double getPlanedMeasure() {
		return planedMeasure;
	}


	public void setPlanedMeasure(Double planedMeasure) {
		this.planedMeasure = planedMeasure;
	}

	@Column(name="MEASURE")
	public Double getMeasure() {
		return measure;
	}


	public void setMeasure(Double measure) {
		this.measure = measure;
	}

	@Column(name="M_UNIT_NAME")
	public String getmUnitName() {
		return mUnitName;
	}


	public void setmUnitName(String mUnitName) {
		this.mUnitName = mUnitName;
	}

	@Column(name="M_UNIT_ID")
	public Integer getmUnitId() {
		return mUnitId;
	}


	public void setmUnitId(Integer mUnitId) {
		this.mUnitId = mUnitId;
	}

	@Column(name="PLANED_CASING1")
	public Double getPlanedCasing1() {
		return planedCasing1;
	}


	public void setPlanedCasing1(Double planedCasing1) {
		this.planedCasing1 = planedCasing1;
	}

	@Column(name="CASING1")
	public Double getCasing1() {
		return casing1;
	}


	public void setCasing1(Double casing1) {
		this.casing1 = casing1;
	}

	@Column(name="C1_UNIT_NAME")
	public String getC1UnitName() {
		return c1UnitName;
	}


	public void setC1UnitName(String c1UnitName) {
		this.c1UnitName = c1UnitName;
	}

	@Column(name="C1_UNIT_ID")
	public Integer getC1UnitId() {
		return c1UnitId;
	}


	public void setC1UnitId(Integer c1UnitId) {
		this.c1UnitId = c1UnitId;
	}

	@Column(name="PLANED_CASING2")
	public Double getPlanedCasing2() {
		return planedCasing2;
	}

	
	public void setPlanedCasing2(Double planedCasing2) {
		this.planedCasing2 = planedCasing2;
	}

	@Column(name="CASING2")
	public Double getCasing2() {
		return casing2;
	}

	
	public void setCasing2(Double casing2) {
		this.casing2 = casing2;
	}

	@Column(name="C2_UNIT_NAME")
	public String getC2UnitName() {
		return c2UnitName;
	}


	public void setC2UnitName(String c2UnitName) {
		this.c2UnitName = c2UnitName;
	}

	@Column(name="C2_UNIT_ID")
	public Integer getC2UnitId() {
		return c2UnitId;
	}


	public void setC2UnitId(Integer c2UnitId) {
		this.c2UnitId = c2UnitId;
	}

	@Column(name="PLANED_CASING3")
	public Double getPlanedCasing3() {
		return planedCasing3;
	}


	public void setPlanedCasing3(Double planedCasing3) {
		this.planedCasing3 = planedCasing3;
	}

	@Column(name="CASING3")
	public Double getCasing3() {
		return casing3;
	}


	public void setCasing3(Double casing3) {
		this.casing3 = casing3;
	}

	@Column(name="C3_UNIT_NAME")
	public String getC3UnitName() {
		return c3UnitName;
	}


	public void setC3UnitName(String c3UnitName) {
		this.c3UnitName = c3UnitName;
	}

	@Column(name="C3_UNIT_ID")
	public Integer getC3UnitId() {
		return c3UnitId;
	}


	public void setC3UnitId(Integer c3UnitId) {
		this.c3UnitId = c3UnitId;
	}

	@Column(name="PLANED_CASING4")
	public Double getPlanedCasing4() {
		return planedCasing4;
	}


	public void setPlanedCasing4(Double planedCasing4) {
		this.planedCasing4 = planedCasing4;
	}

	@Column(name="CASING4")
	public Double getCasing4() {
		return casing4;
	}


	public void setCasing4(Double casing4) {
		this.casing4 = casing4;
	}

	@Column(name="C4_UNIT_NAME")
	public String getC4UnitName() {
		return c4UnitName;
	}


	public void setC4UnitName(String c4UnitName) {
		this.c4UnitName = c4UnitName;
	}

	@Column(name="C4_UNIT_ID")
	public Integer getC4UnitId() {
		return c4UnitId;
	}


	public void setC4UnitId(Integer c4UnitId) {
		this.c4UnitId = c4UnitId;
	}

	@Column(name="PLANED_CASING5")
	public Double getPlanedCasing5() {
		return planedCasing5;
	}


	public void setPlanedCasing5(Double planedCasing5) {
		this.planedCasing5 = planedCasing5;
	}

	@Column(name="CASING5")
	public Double getCasing5() {
		return casing5;
	}


	public void setCasing5(Double casing5) {
		this.casing5 = casing5;
	}

	@Column(name="C5_UNIT_NAME")
	public String getC5UnitName() {
		return c5UnitName;
	}


	public void setC5UnitName(String c5UnitName) {
		this.c5UnitName = c5UnitName;
	}

	@Column(name="C5_UNIT_ID")
	public Integer getC5UnitId() {
		return c5UnitId;
	}


	public void setC5UnitId(Integer c5UnitId) {
		this.c5UnitId = c5UnitId;
	}

	@Column(name="LEAVE_PLANED_QUANTITY")
	public Double getLeavePlanedQuantity() {
		return leavePlanedQuantity;
	}


	public void setLeavePlanedQuantity(Double leavePlanedQuantity) {
		this.leavePlanedQuantity = leavePlanedQuantity;
	}

	@Column(name="LEAVE_PLANED_PACKAGES")
	public Double getLeavePlanedPackages() {
		return leavePlanedPackages;
	}


	public void setLeavePlanedPackages(Double leavePlanedPackages) {
		this.leavePlanedPackages = leavePlanedPackages;
	}

	@Column(name="LEAVE_PLANED_GROSS_WEIGHT")
	public Double getLeavePlanedGrossWeight() {
		return leavePlanedGrossWeight;
	}


	public void setLeavePlanedGrossWeight(Double leavePlanedGrossWeight) {
		this.leavePlanedGrossWeight = leavePlanedGrossWeight;
	}

	@Column(name="LEAVE_PLANED_NET_WEIGHT")
	public Double getLeavePlanedNetWeight() {
		return leavePlanedNetWeight;
	}


	public void setLeavePlanedNetWeight(Double leavePlanedNetWeight) {
		this.leavePlanedNetWeight = leavePlanedNetWeight;
	}

	@Column(name="LEAVE_PLANED_MEASURE")
	public Double getLeavePlanedMeasure() {
		return leavePlanedMeasure;
	}


	public void setLeavePlanedMeasure(Double leavePlanedMeasure) {
		this.leavePlanedMeasure = leavePlanedMeasure;
	}

	@Column(name="LEAVE_PLANED_VOLUME")
	public Double getLeavePlanedVolume() {
		return leavePlanedVolume;
	}


	public void setLeavePlanedVolume(Double leavePlanedVolume) {
		this.leavePlanedVolume = leavePlanedVolume;
	}

	@Column(name="LEAVE_QUANTITY")
	public Double getLeaveQuantity() {
		return leaveQuantity;
	}


	public void setLeaveQuantity(Double leaveQuantity) {
		this.leaveQuantity = leaveQuantity;
	}

	@Column(name="LEAVE_PACKAGES")
	public Double getLeavePackages() {
		return leavePackages;
	}


	public void setLeavePackages(Double leavePackages) {
		this.leavePackages = leavePackages;
	}

	@Column(name="LEAVE_GROSS_WEIGHT")
	public Double getLeaveGrossWeight() {
		return leaveGrossWeight;
	}


	public void setLeaveGrossWeight(Double leaveGrossWeight) {
		this.leaveGrossWeight = leaveGrossWeight;
	}

	@Column(name="LEAVE_NET_WEIGHT")
	public Double getLeaveNetWeight() {
		return leaveNetWeight;
	}


	public void setLeaveNetWeight(Double leaveNetWeight) {
		this.leaveNetWeight = leaveNetWeight;
	}

	@Column(name="LEAVE_MEASURE")
	public Double getLeaveMeasure() {
		return leaveMeasure;
	}


	public void setLeaveMeasure(Double leaveMeasure) {
		this.leaveMeasure = leaveMeasure;
	}

	@Column(name="LEAVE_VOLUME")
	public Double getLeaveVolume() {
		return leaveVolume;
	}


	public void setLeaveVolume(Double leaveVolume) {
		this.leaveVolume = leaveVolume;
	}

	@Column(name="DAMAGE_QUANTITY")
	public Double getDamageQuantity() {
		return damageQuantity;
	}


	public void setDamageQuantity(Double damageQuantity) {
		this.damageQuantity = damageQuantity;
	}


	@Transient
	public Integer getCustId() {
		return this.custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}
	
	@Transient
	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}
	
	@Transient
	public Date getActureTime(){
		return this.actureTime;
	
	}
	public void setActureTime(Date actureTime){
		this.actureTime=actureTime;
	}
	
	@Transient
	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	@Transient
	public String getEntrustNo() {
		return entrustNo;
	}

	public void setEntrustNo(String entrustNo) {
		this.entrustNo = entrustNo;
	}

	@Transient
	public String getCargoOwnerName() {
		return cargoOwnerName;
	}


	public void setCargoOwnerName(String cargoOwnerName) {
		this.cargoOwnerName = cargoOwnerName;
	}

	@Column(name="PICKED_GROSS_WEIGHT")
	public Double getPickedGrossWeight() {
		return pickedGrossWeight;
	}

	public void setPickedGrossWeight(Double pickedGrossWeight) {
		this.pickedGrossWeight = pickedGrossWeight;
	}

	@Column(name="PICKED_NET_WEIGHT")
	public Double getPickedNetWeight() {
		return pickedNetWeight;
	}

	public void setPickedNetWeight(Double pickedNetWeight) {
		this.pickedNetWeight = pickedNetWeight;
	}

	@Column(name="PICKED_VOLUME")
	public Double getPickedVolume() {
		return pickedVolume;
	}

	public void setPickedVolume(Double pickedVolume) {
		this.pickedVolume = pickedVolume;
	}

	@Column(name="PICKED_MEASURE")
	public Double getPickedMeaSure() {
		return pickedMeaSure;
	}

	public void setPickedMeaSure(Double pickedMeaSure) {
		this.pickedMeaSure = pickedMeaSure;
	}

	@Column(name="PICKED_PACKAGES")
	public Double getPickedPackages() {
		return pickedPackages;
	}

	public void setPickedPackages(Double pickedPackages) {
		this.pickedPackages = pickedPackages;
	}
	@Column(name="DIST_GROSS_WEIGHT")
	public Double getDistGrossWeight() {
		return distGrossWeight;
	}
	public void setDistGrossWeight(Double distGrossWeight) {
		this.distGrossWeight = distGrossWeight;
	}

	@Column(name="DIST_NET_WEIGHT")
	public Double getDistNetWeight() {
		return distNetWeight;
	}
	public void setDistNetWeight(Double distNetWeight) {
		this.distNetWeight = distNetWeight;
	}

	@Column(name="DIST_MEASURE")
	public Double getDistMeasure() {
		return distMeasure;
	}

	public void setDistMeasure(Double distMeasure) {
		this.distMeasure = distMeasure;
	}


	@Column(name="DIST_VOLUME")
	public Double getDistVolume() {
		return distVolume;
	}
	public void setDistVolume(Double distVolume) {
		this.distVolume = distVolume;
	}

	@Column(name="DIST_QUANTITY")
	public Double getDistQuantity() {
		return distQuantity;
	}
	
	public void setDistQuantity(Double distQuantity) {
		this.distQuantity = distQuantity;
	}

	@Column(name="DIST_PACKAGES")
	public Double getDistPackages() {
		return distPackages;
	}
	public void setDistPackages(Double distPackages) {
		this.distPackages = distPackages;
	}

	@Column(name="SEND_GROSS_WEIGHT")
	public Double getSendGrossWeight() {
		return sendGrossWeight;
	}

	public void setSendGrossWeight(Double sendGrossWeight) {
		this.sendGrossWeight = sendGrossWeight;
	}

	@Column(name="SEND_NET_WEIGHT")
	public Double getSendNetWeight() {
		return sendNetWeight;
	}

	public void setSendNetWeight(Double sendNetWeight) {
		this.sendNetWeight = sendNetWeight;
	}

	@Column(name="SEND_VOLUME")
	public Double getSendVolume() {
		return sendVolume;
	}

	public void setSendVolume(Double sendVolume) {
		this.sendVolume = sendVolume;
	}

	@Column(name="SEND_MEASURE")
	public Double getSendMeaSure() {
		return sendMeaSure;
	}

	public void setSendMeaSure(Double sendMeaSure) {
		this.sendMeaSure = sendMeaSure;
	}

	@Column(name="SEND_PACKAGES")
	public Double getSendPackages() {
		return sendPackages;
	}

	public void setSendPackages(Double sendPackages) {
		this.sendPackages = sendPackages;
	}

	@Column(name="DAMAGE_GROSS_WEIGHT")
	public Double getDamageGrossWeight() {
		return damageGrossWeight;
	}

	public void setDamageGrossWeight(Double damageGrossWeight) {
		this.damageGrossWeight = damageGrossWeight;
	}

	@Column(name="DAMAGE_NET_WEIGHT")
	public Double getDamageNetWeight() {
		return damageNetWeight;
	}

	public void setDamageNetWeight(Double damageNetWeight) {
		this.damageNetWeight = damageNetWeight;
	}

	@Column(name="DAMAGE_VOLUME")
	public Double getDamageVolume() {
		return damageVolume;
	}

	public void setDamageVolume(Double damageVolume) {
		this.damageVolume = damageVolume;
	}

	@Column(name="DAMAGE_MEASURE")
	public Double getDamageMeaSure() {
		return damageMeaSure;
	}

	public void setDamageMeaSure(Double damageMeaSure) {
		this.damageMeaSure = damageMeaSure;
	}

	@Column(name="DAMAGE_PACKAGES")
	public Double getDamagePackages() {
		return damagePackages;
	}

	public void setDamagePackages(Double damagePackages) {
		this.damagePackages = damagePackages;
	}

	@Column(name="RECEIVED_MEASURE")
	public Double getReceivedMeasure() {
		return receivedMeasure;
	}

	public void setReceivedMeasure(Double receivedMeasure) {
		this.receivedMeasure = receivedMeasure;
	}

	
	@Column(name="DISMANTLING_QUANTITY")
	public Double getDismantlingQuantity() {
		return DismantlingQuantity;
	}

	public void setDismantlingQuantity(Double dismantlingQuantity) {
		DismantlingQuantity = dismantlingQuantity;
	}
	
	@Column(name="EFFECTIVE_DATE")
	public Date getEffectiveDate() {
		return effectiveDate;
	}

	public void setEffectiveDate(Date effectiveDate) {
		this.effectiveDate = effectiveDate;
	}

	@Column(name="STANDARD_QUANTITY")
	public Double getStandardQuantity() {
		return standardQuantity;
	}

	public void setStandardQuantity(Double standardQuantity) {
		this.standardQuantity = standardQuantity;
	}

	@Column(name="STANDARD_GROSS_WEIGHT")
	public Double getStandardGrossWeight() {
		return standardGrossWeight;
	}

	public void setStandardGrossWeight(Double standardGrossWeight) {
		this.standardGrossWeight = standardGrossWeight;
	}

	@Column(name="STANDARD_NET_WEIGHT")
	public Double getStandardNetWeight() {
		return standardNetWeight;
	}

	public void setStandardNetWeight(Double standardNetWeight) {
		this.standardNetWeight = standardNetWeight;
	}
	
	@Column(name="STANDARD_VOLUME")
	public Double getStandardVolume() {
		return standardVolume;
	}

	public void setStandardVolume(Double standardVolume) {
		this.standardVolume = standardVolume;
	}

	@Column(name="STANDARD_MEAS")
	public Double getStandardMeasure() {
		return standardMeasure;
	}

	public void setStandardMeasure(Double standardMeasure) {
		this.standardMeasure = standardMeasure;
	}
	@Column(name="REMARKS")
	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	
	
	
	
	
	
}