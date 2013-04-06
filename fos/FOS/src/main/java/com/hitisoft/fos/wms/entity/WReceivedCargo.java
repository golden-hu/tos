package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.util.Date;
import javax.persistence.Transient;

/**
 * The persistent class for the w_received_list database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_RECEIVED_CARGO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WReceivedCargo extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private String areaCode;
	private Long areaId;
	private String areaName;
	private String batchNo;
	private String skuNo;
	private Long cargoId;
	private String cargoName;
	private Double damagedQuantity;	
	
	private Double quantity;//收货数量
	private Double packages;//件数
	private Double grossWeight;//毛重
	private Double netWeight;//净重
	private Double volume;//体积
	private Double measure;//面积
	private Double receivedQuantity;//收毛重
	private Double receivedGrossWeight;//收毛重
	private Double receivedNetWeight;//收货净重
	private Double receivedVolume;//收货体积
	private Double receivedMeasure;//收货面积
	private Double receivedPackages;//收货件数
	private Double receivedPackQuantity;
	private Double placedQuantity;//上架数量
	private Double placedGrossWeight;//上架毛重
	private Double placedNetWeight;//上架净重
	private Double placedVolume;//上架体积
	
	private Double placedMeasure;//上架面积
	private Double placedPackages;//上架件数
	private Double placedPackQuantity;
	private Integer status;
	private Long storageNoteCargoId;
	private Long storageNoteId;
	private String storageNoteNo;
	private String specification;
	
	private String warehouseCode;
	private Long warehouseId;
	private String warehouseName;
	
	
	private String productNo;
	private Date productDate;
	private Date receivedDate;
	private Date effectiveDate;
	private Date placedDate;
	
	private Long blockId;
	private String blockCode;
	private String blockName;
	
	
	
	private String qualityType;//品质
	
	private String orderNo;//订单号
	
	private Long cargoOwnerId;
	private String cargoOwnerName;//货主
	
	private String packName;//包装一单位
	private String packNameTwo;//包装二单位
	private String packNameThree;//包装三单位
	private String packNameFour;//包装四单位
	private String packNameFive;//包装五单位
	private Double unitNum;//包装一数量
	private Double unitNumTwo;//包装二数量
	private Double unitNumThree;//包装三数量
	private Double unitNumFour;//包装四数量
	private Double unitNumFive;//包装五数量
	
	private Double unReceviedQuantiy;//未收货数量
	private Double unReceviedPackages;//未收货件数
	private Double unReceviedGrossWeight;//未收货毛重
	private Double unReceviedNetWeight;//未收货净重
	private Double unReceviedVolume;//未收货体积
	private Double unReceivedUnitNum1;//未收货包装一数量
	private Double unReceivedUnitNum2;//未收货包装二数量
	private Double unReceivedUnitNum3;//未收货包装三数量
	private Double unReceivedUnitNum4;//未收货包装四数量
	private Double unReceivedUnitNum5;//未收货包装五数量
	private Double leavePlanedQuantity;//剩余数量
	private Double leavePlanedPackages;//剩余件数
	private Double leavePlanedGrossWeight;//剩余毛重
	private Double leavePlanedNetWeight;//剩余净重
	private Double leavePlanedVolume;//剩余体积
	private Double leaveUnitNum1;//剩余外包装一数量
	private Double leaveUnitNum2;//剩余外包装二数量
	private Double leaveUnitNum3;//剩余外包装三数量
	private Double leaveUnitNum4;//剩余外包装四数量
	private Double leaveUnitNum5;//剩余外包装五数量
	
	private Double standardQuantity; 
	private Double standardGrossWeight; 
	private Double standardNetWeight; 
	private Double standardVolume; 
	private Double standardMeasure; 

	private Long unitId;
	private String unitName;
	private Integer wUnitId;
	private Integer mUnitId;
	private Integer vUnitId;
	private Integer pUnitId;
	private Integer packUnitId;
	private Integer packUnitName;
	
	private String pUnit;//件数单位
	private String wUnitName;//重量单位
	private String vUnitName;//体积单位
	private String mUnitName;//面积单位
	
	private Double unQaQuantity;//未收货数量
	private Double unQaPackages;//未收货件数
	private Double unQaGrossWeight;//未收货毛重
	private Double unQaNetWeight;//未收货净重
	private Double unQaVolume;//未收货体积
	private Double unQaMeasure;//未收货体积
	
	private Double qaQuantity;//未收货数量
	private Double qaPackages;//未收货件数
	private Double qaGrossWeight;//未收货毛重
	private Double qaNetWeight;//未收货净重
	private Double qaVolume;//未收货体积
	private Double qaMeasure;//未收货体积
	
	private String remarks;
	
	///========虚拟字段
	private Double planedQuantity;//未收货数量
	private Double planedPackages;//未收货件数
	private Double planedGrossWeight;//未收货毛重
	private Double planedNetWeight;//未收货净重
	private Double planedVolume;//未收货体积
	private Double planedMeasure;//未收货体积
	private Double planedPackQuantity;//未收货体积
	
	private Integer palletQuantity;//托盘数量
	
	
    public WReceivedCargo() {
    }


	@Column(name="AREA_CODE")
	public String getAreaCode() {
		return this.areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}


	@Column(name="QUALITY_TYPE")
	public String getQualityType() {
		return qualityType;
	}


	public void setQualityType(String qualityType) {
		this.qualityType = qualityType;
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

	@Column(name="STANDARD_MEASURE")
	public Double getStandardMeasure() {
		return standardMeasure;
	}


	public void setStandardMeasure(Double standardMeasure) {
		this.standardMeasure = standardMeasure;
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


	@Column(name="SKU_NO")
	public String getSkuNo() {
		return this.skuNo;
	}

	public void setSkuNo(String skuNo) {
		this.skuNo = skuNo;
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


	@Column(name="W_UNIT_NAME")
	public String getwUnitName() {
		return wUnitName;
	}


	public void setwUnitName(String wUnitName) {
		this.wUnitName = wUnitName;
	}


	@Column(name="GROSS_WEIGHT")
	public Double getGrossWeight() {
		return grossWeight;
	}


	public void setGrossWeight(Double grossWeight) {
		this.grossWeight = grossWeight;
	}


	@Column(name="NET_WEIGHT")
	public Double getNetWeight() {
		return netWeight;
	}


	public void setNetWeight(Double netWeight) {
		this.netWeight = netWeight;
	}


	@Column(name="VOLUME")
	public Double getVolume() {
		return volume;
	}


	public void setVolume(Double volume) {
		this.volume = volume;
	}


	
	@Column(name="PLACED_GROSS_WEIGHT")
	public Double getPlacedGrossWeight() {
		return placedGrossWeight;
	}


	public void setPlacedGrossWeight(Double placedGrossWeight) {
		this.placedGrossWeight = placedGrossWeight;
	}


	@Column(name="V_UNIT_NAME")
	public String getvUnitName() {
		return vUnitName;
	}


	public void setvUnitName(String vUnitName) {
		this.vUnitName = vUnitName;
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
	@Column(name="PLACED_QUANTITY")
	public Double getPlacedQuantity() {
		return this.placedQuantity;
	}

	public void setPlacedQuantity(Double placedQuantity) {
		this.placedQuantity = placedQuantity;
	}
		
	
	@Column(name="DAMAGED_QUANTITY")
	public Double getDamagedQuantity() {
		return this.damagedQuantity;
	}

	public void setDamagedQuantity(Double damagedQuantity) {
		this.damagedQuantity = damagedQuantity;
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
		return productNo;
	}


	public void setProductNo(String productNo) {
		this.productNo = productNo;
	}


	@Column(name="QUANTITY")
	public Double getQuantity() {
		return this.quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
	


	@Column(name="STATUS")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
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

	@Column(name="STORAGE_NOTE_NO")
	public String getStorageNoteNo() {
		return this.storageNoteNo;
	}

	public void setStorageNoteNo(String storageNoteNo) {
		this.storageNoteNo = storageNoteNo;
	}
	
	@Column(name="SPECIFICATION")
	public String getSpecification() {
		return this.specification;
	}

	public void setSpecification(String specification) {
		this.specification = specification;
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
	
	@Column(name="BLOCK_ID")
	public Long getBlockId() {
		return blockId;
	}


	public void setBlockId(Long blockId) {
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
	
	
	@Column(name="ORDER_NO")
	public String getOrderNo() {
		return orderNo;
	}


	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}


	@Column(name="CARGO_OWNER_NAME")
	public String getCargoOwnerName() {
		return cargoOwnerName;
	}


	public void setCargoOwnerName(String cargoOwnerName) {
		this.cargoOwnerName = cargoOwnerName;
	}


	@Column(name="PACK_NAME")
	public String getPackName() {
		return packName;
	}


	public void setPackName(String packName) {
		this.packName = packName;
	}


	@Column(name="PACK_NAME_TWO")
	public String getPackNameTwo() {
		return packNameTwo;
	}


	public void setPackNameTwo(String packNameTwo) {
		this.packNameTwo = packNameTwo;
	}


	@Column(name="PACK_NAME_THREE")
	public String getPackNameThree() {
		return packNameThree;
	}


	public void setPackNameThree(String packNameThree) {
		this.packNameThree = packNameThree;
	}


	@Column(name="PACK_NAME_FOUR")
	public String getPackNameFour() {
		return packNameFour;
	}


	public void setPackNameFour(String packNameFour) {
		this.packNameFour = packNameFour;
	}


	@Column(name="PACK_NAME_FIVE")
	public String getPackNameFive() {
		return packNameFive;
	}


	public void setPackNameFive(String packNameFive) {
		this.packNameFive = packNameFive;
	}


	@Column(name="UNIT_NUM")
	public Double getUnitNum() {
		return unitNum;
	}


	public void setUnitNum(Double unitNum) {
		this.unitNum = unitNum;
	}


	@Column(name="UNIT_NUM_TWO")
	public Double getUnitNumTwo() {
		return unitNumTwo;
	}


	public void setUnitNumTwo(Double unitNumTwo) {
		this.unitNumTwo = unitNumTwo;
	}


	@Column(name="UNIT_NUM_THREE")
	public Double getUnitNumThree() {
		return unitNumThree;
	}


	public void setUnitNumThree(Double unitNumThree) {
		this.unitNumThree = unitNumThree;
	}


	@Column(name="UNIT_NUM_FOUR")
	public Double getUnitNumFour() {
		return unitNumFour;
	}


	public void setUnitNumFour(Double unitNumFour) {
		this.unitNumFour = unitNumFour;
	}


	@Column(name="UNIT_NUM_FIVE")
	public Double getUnitNumFive() {
		return unitNumFive;
	}


	public void setUnitNumFive(Double unitNumFive) {
		this.unitNumFive = unitNumFive;
	}

	@Column(name="REMARKS")
	public String getRemarks() {
		return remarks;
	}


	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}


	//==========================
	@Transient
	public Double getUnReceviedQuantiy() {
		return unReceviedQuantiy;
	}


	public void setUnReceviedQuantiy(Double unReceviedQuantiy) {
		this.unReceviedQuantiy = unReceviedQuantiy;
	}


	@Transient
	public Double getUnReceviedPackages() {
		return unReceviedPackages;
	}


	public void setUnReceviedPackages(Double unReceviedPackages) {
		this.unReceviedPackages = unReceviedPackages;
	}


	@Transient
	public Double getUnReceviedGrossWeight() {
		return unReceviedGrossWeight;
	}


	public void setUnReceviedGrossWeight(Double unReceviedGrossWeight) {
		this.unReceviedGrossWeight = unReceviedGrossWeight;
	}


	@Transient
	public Double getUnReceviedNetWeight() {
		return unReceviedNetWeight;
	}


	public void setUnReceviedNetWeight(Double unReceviedNetWeight) {
		this.unReceviedNetWeight = unReceviedNetWeight;
	}


	@Transient
	public Double getUnReceviedVolume() {
		return unReceviedVolume;
	}


	public void setUnReceviedVolume(Double unReceviedVolume) {
		this.unReceviedVolume = unReceviedVolume;
	}


	@Transient
	public Double getUnReceivedUnitNum1() {
		return unReceivedUnitNum1;
	}


	public void setUnReceivedUnitNum1(Double unReceivedUnitNum1) {
		this.unReceivedUnitNum1 = unReceivedUnitNum1;
	}


	@Transient
	public Double getUnReceivedUnitNum2() {
		return unReceivedUnitNum2;
	}


	public void setUnReceivedUnitNum2(Double unReceivedUnitNum2) {
		this.unReceivedUnitNum2 = unReceivedUnitNum2;
	}


	@Transient
	public Double getUnReceivedUnitNum3() {
		return unReceivedUnitNum3;
	}


	public void setUnReceivedUnitNum3(Double unReceivedUnitNum3) {
		this.unReceivedUnitNum3 = unReceivedUnitNum3;
	}


	@Transient
	public Double getUnReceivedUnitNum4() {
		return unReceivedUnitNum4;
	}


	public void setUnReceivedUnitNum4(Double unReceivedUnitNum4) {
		this.unReceivedUnitNum4 = unReceivedUnitNum4;
	}


	@Transient
	public Double getUnReceivedUnitNum5() {
		return unReceivedUnitNum5;
	}


	public void setUnReceivedUnitNum5(Double unReceivedUnitNum5) {
		this.unReceivedUnitNum5 = unReceivedUnitNum5;
	}


	@Transient
	public Double getLeavePlanedQuantity() {
		return leavePlanedQuantity;
	}


	public void setLeavePlanedQuantity(Double leavePlanedQuantity) {
		this.leavePlanedQuantity = leavePlanedQuantity;
	}


	@Transient
	public Double getLeavePlanedPackages() {
		return leavePlanedPackages;
	}


	public void setLeavePlanedPackages(Double leavePlanedPackages) {
		this.leavePlanedPackages = leavePlanedPackages;
	}


	@Transient
	public Double getLeavePlanedGrossWeight() {
		return leavePlanedGrossWeight;
	}


	public void setLeavePlanedGrossWeight(Double leavePlanedGrossWeight) {
		this.leavePlanedGrossWeight = leavePlanedGrossWeight;
	}


	@Transient
	public Double getLeavePlanedNetWeight() {
		return leavePlanedNetWeight;
	}


	public void setLeavePlanedNetWeight(Double leavePlanedNetWeight) {
		this.leavePlanedNetWeight = leavePlanedNetWeight;
	}


	@Transient
	public Double getLeavePlanedVolume() {
		return leavePlanedVolume;
	}


	public void setLeavePlanedVolume(Double leavePlanedVolume) {
		this.leavePlanedVolume = leavePlanedVolume;
	}


	@Transient
	public Double getLeaveUnitNum1() {
		return leaveUnitNum1;
	}


	public void setLeaveUnitNum1(Double leaveUnitNum1) {
		this.leaveUnitNum1 = leaveUnitNum1;
	}


	@Transient
	public Double getLeaveUnitNum2() {
		return leaveUnitNum2;
	}


	public void setLeaveUnitNum2(Double leaveUnitNum2) {
		this.leaveUnitNum2 = leaveUnitNum2;
	}


	@Transient
	public Double getLeaveUnitNum3() {
		return leaveUnitNum3;
	}


	public void setLeaveUnitNum3(Double leaveUnitNum3) {
		this.leaveUnitNum3 = leaveUnitNum3;
	}


	@Transient
	public Double getLeaveUnitNum4() {
		return leaveUnitNum4;
	}


	public void setLeaveUnitNum4(Double leaveUnitNum4) {
		this.leaveUnitNum4 = leaveUnitNum4;
	}


	@Transient
	public Double getLeaveUnitNum5() {
		return leaveUnitNum5;
	}


	public void setLeaveUnitNum5(Double leaveUnitNum5) {
		this.leaveUnitNum5 = leaveUnitNum5;
	}


	@Transient
	public Double getPlanedQuantity() {
		return planedQuantity;
	}

	public void setPlanedQuantity(Double planedQuantity) {
		this.planedQuantity = planedQuantity;
	}
	
	
	
	@Transient
	public Double getPlanedPackages() {
		return planedPackages;
	}


	public void setPlanedPackages(Double planedPackages) {
		this.planedPackages = planedPackages;
	}

	@Transient
	public Double getPlanedGrossWeight() {
		return planedGrossWeight;
	}


	public void setPlanedGrossWeight(Double planedGrossWeight) {
		this.planedGrossWeight = planedGrossWeight;
	}

	@Transient
	public Double getPlanedNetWeight() {
		return planedNetWeight;
	}


	public void setPlanedNetWeight(Double planedNetWeight) {
		this.planedNetWeight = planedNetWeight;
	}

	@Transient
	public Double getPlanedVolume() {
		return planedVolume;
	}


	public void setPlanedVolume(Double planedVolume) {
		this.planedVolume = planedVolume;
	}

	@Transient
	public Double getPlanedMeasure() {
		return planedMeasure;
	}


	public void setPlanedMeasure(Double planedMeasure) {
		this.planedMeasure = planedMeasure;
	}

	@Transient
	public Double getPlanedPackQuantity() {
		return planedPackQuantity;
	}


	public void setPlanedPackQuantity(Double planedPackQuantity) {
		this.planedPackQuantity = planedPackQuantity;
	}


	@Temporal( TemporalType.DATE)
	@Column(name="RECEIVED_DATE")
	public Date getReceivedDate() {
		return this.receivedDate;
	}

	public void setReceivedDate(Date receivedDate) {
		this.receivedDate = receivedDate;
	}


	@Column(name="RECEIVED_QUANTITY")
	public Double getReceivedQuantity() {
		return receivedQuantity;
	}

	public void setReceivedQuantity(Double receivedQuantity) {
		this.receivedQuantity = receivedQuantity;
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


	@Column(name="RECEIVED_MEASURE")
	public Double getReceivedMeasure() {
		return receivedMeasure;
	}


	public void setReceivedMeasure(Double receivedMeasure) {
		this.receivedMeasure = receivedMeasure;
	}


	@Column(name="RECEIVED_PACKAGES")
	public Double getReceivedPackages() {
		return receivedPackages;
	}


	public void setReceivedPackages(Double receivedPackages) {
		this.receivedPackages = receivedPackages;
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

	@Column(name="PLACED_MEASURE")
	public Double getPlacedMeasure() {
		return placedMeasure;
	}


	public void setPlacedMeasure(Double placedMeasure) {
		this.placedMeasure = placedMeasure;
	}


	@Column(name="PLACED_PACEAGES")
	public Double getPlacedPackages() {
		return placedPackages;
	}


	public void setPlacedPackages(Double placedPackages) {
		this.placedPackages = placedPackages;
	}


	@Column(name="W_UNIT_ID")
	public Integer getwUnitId() {
		return wUnitId;
	}


	public void setwUnitId(Integer wUnitId) {
		this.wUnitId = wUnitId;
	}


	@Column(name="M_UNIT_ID")
	public Integer getmUnitId() {
		return mUnitId;
	}


	public void setmUnitId(Integer mUnitId) {
		this.mUnitId = mUnitId;
	}


	@Column(name="V_UNIT_ID")
	public Integer getvUnitId() {
		return vUnitId;
	}


	public void setvUnitId(Integer vUnitId) {
		this.vUnitId = vUnitId;
	}


	@Column(name="UN_QA_QUANTITY")
	public Double getUnQaQuantity() {
		return unQaQuantity;
	}


	public void setUnQaQuantity(Double unQaQuantity) {
		this.unQaQuantity = unQaQuantity;
	}


	@Column(name="UN_QA_PACKAGES")
	public Double getUnQaPackages() {
		return unQaPackages;
	}


	public void setUnQaPackages(Double unQaPackages) {
		this.unQaPackages = unQaPackages;
	}


	@Column(name="UN_QA_GROSS_WEIGHT")
	public Double getUnQaGrossWeight() {
		return unQaGrossWeight;
	}


	public void setUnQaGrossWeight(Double unQaGrossWeight) {
		this.unQaGrossWeight = unQaGrossWeight;
	}


	@Column(name="UN_QA_NET_WEIGHT")
	public Double getUnQaNetWeight() {
		return unQaNetWeight;
	}


	public void setUnQaNetWeight(Double unQaNetWeight) {
		this.unQaNetWeight = unQaNetWeight;
	}


	@Column(name="UN_QA_VOLUME")
	public Double getUnQaVolume() {
		return unQaVolume;
	}


	public void setUnQaVolume(Double unQaVolume) {
		this.unQaVolume = unQaVolume;
	}


	@Column(name="UN_QA_MEASURE")
	public Double getUnQaMeasure() {
		return unQaMeasure;
	}


	public void setUnQaMeasure(Double unQaMeasure) {
		this.unQaMeasure = unQaMeasure;
	}


	@Column(name="QA_QUANTITY")
	public Double getQaQuantity() {
		return qaQuantity;
	}

	public void setQaQuantity(Double qaQuantity) {
		this.qaQuantity = qaQuantity;
	}
	


	@Column(name="QA_PACKAGES")
	public Double getQaPackages() {
		return qaPackages;
	}


	public void setQaPackages(Double qaPackages) {
		this.qaPackages = qaPackages;
	}


	@Column(name="QA_GROSS_WEIGHT")
	public Double getQaGrossWeight() {
		return qaGrossWeight;
	}


	public void setQaGrossWeight(Double qaGrossWeight) {
		this.qaGrossWeight = qaGrossWeight;
	}


	@Column(name="QA_NET_WEIGHT")
	public Double getQaNetWeight() {
		return qaNetWeight;
	}


	public void setQaNetWeight(Double qaNetWeight) {
		this.qaNetWeight = qaNetWeight;
	}


	@Column(name="QA_VOLUME")
	public Double getQaVolume() {
		return qaVolume;
	}


	public void setQaVolume(Double qaVolume) {
		this.qaVolume = qaVolume;
	}


	@Column(name="QA_MEASURE")
	public Double getQaMeasure() {
		return qaMeasure;
	}


	public void setQaMeasure(Double qaMeasure) {
		this.qaMeasure = qaMeasure;
	}

	@Column(name="EFFECTIVE_DATE")
	public Date getEffectiveDate() {
		return effectiveDate;
	}


	public void setEffectiveDate(Date effectiveDate) {
		this.effectiveDate = effectiveDate;
	}

	@Column(name="PLACED_DATE")
	public Date getPlacedDate() {
		return placedDate;
	}


	public void setPlacedDate(Date placedDate) {
		this.placedDate = placedDate;
	}

	@Column(name="RECEIVED_PACK_QUANTITY")
	public Double getReceivedPackQuantity() {
		return receivedPackQuantity;
	}


	public void setReceivedPackQuantity(Double receivedPackQuantity) {
		this.receivedPackQuantity = receivedPackQuantity;
	}

	@Column(name="PLACED_PACK_QUANTITY")
	public Double getPlacedPackQuantity() {
		return placedPackQuantity;
	}


	public void setPlacedPackQuantity(Double placedPackQuantity) {
		this.placedPackQuantity = placedPackQuantity;
	}

	@Column(name="CARGO_OWNER_ID")
	public Long getCargoOwnerId() {
		return cargoOwnerId;
	}


	public void setCargoOwnerId(Long cargoOwnerId) {
		this.cargoOwnerId = cargoOwnerId;
	}

	@Column(name="P_UNIT_ID")
	public Integer getpUnitId() {
		return pUnitId;
	}


	public void setpUnitId(Integer pUnitId) {
		this.pUnitId = pUnitId;
	}

	@Column(name="PACK_UNIT_ID")
	public Integer getPackUnitId() {
		return packUnitId;
	}


	public void setPackUnitId(Integer packUnitId) {
		this.packUnitId = packUnitId;
	}

	@Column(name="PACK_UNIT_NAME")
	public Integer getPackUnitName() {
		return packUnitName;
	}


	public void setPackUnitName(Integer packUnitName) {
		this.packUnitName = packUnitName;
	}

	@Column(name="PALLET_QUANTITY")
	public Integer getPalletQuantity() {
		return palletQuantity;
	}


	public void setPalletQuantity(Integer palletQuantity) {
		this.palletQuantity = palletQuantity;
	}
	
	
	
	
	

}
