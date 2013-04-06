package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * The persistent class for the w_placed_list database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_PLACED_CARGO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WPlacedCargo extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer custId;
	private String custName;
	private Long storageNoteCargoId;
	private Long receivedCargoId;
	private Long storageNoteId;
	private String storageNoteNo;
	
	private String skuNo;
	private Long cargoId;
	private String cargoName;
	private String specification;
	private String cargoType;
	private String cargoColor;
	private String cargoCategory;
	
	private String productNo;
	private Date productDate;
	private Date effectiveDate;
	
	private String batchNo;
	
	private String warehouseCode;
	private Long warehouseId;
	private String warehouseName;
	private String areaCode;
	private Long areaId;
	private String areaName;
	private String blockCode;
	private Long blockId;
	private String blockName;
	private Integer blockLayer;
	
	private String barCode;
	private String orderNo;
	private String containerNo;
	
	private String qualityType;  //品质
	private Date qaFlagDate;  //检验时间
	
	private Long unitId;
	private String unitName;
	private Integer wUnitId;			//重量单位id
	private String wUnitName;			//重量单位名称
	private Integer mUnitId;			//体积单位id
	private String mUnitName;			//体积单位名称
	private Integer vUnitId;			//面积单位id
	private String vUnitName;			//面积单位名称
	private Integer pUnitId;			
	private String pUnitName;			
	private Integer packUnitId;			
	private String packUnitName;			
	
	
	
	private Double quantity;			//上架数量
	private Double packages;			//上架数量
	private Double grossWeight;	        //上架毛重
	private Double netWeight;		  
	private Double measure;	        //上架体积
	private Double volume;		        //上架面积
	private Double packQuantity;
	
	private Double placedGrossWeight;	//上架毛重
	private Double placedNetWeight;		//上架净重
	private Double placedMeasure;	//上架体积
	private Double placedVolume;		//上架面积
	private Double placedQuantity;	    //上架数量
	private Double placedPackages;		//上架件数
	private Double distGrossWeight;	    //已分配毛重
	private Double distNetWeight;		//已分配净重
	private Double distMeasure;	        //已分配体积
	private Double distVolume;		    //已分配面积
	private Double distQuantity;	    //已分配数量
	private Double distPackages;		//已分配件数

	private Double pickedQuantity;		//已拣货数量
	private Double pickedPackages;
	private Double pickedGrossWeight;	//已拣货毛重
	private Double pickedNetWeight;		//已拣货净重
	private Double pickedMeasurement;	//已拣货体积
	private Double pickedVolume;		//已拣货面积
	private Double pickedPackQuantity;
	private Double pickableQuantity;
	
	
	private Double sendQuantity;
	
	private Double nowQuantity;			//当前数量
	private Double nowPackages;
	private Double nowGrossWeight;		//当前毛重
	private Double nowNetWeight;		//当前净重
	private Double nowMeasurement;		//当前体积
	private Double nowVolume;			//当前面积
	
	private Double standardQuantity;	 //标准最小数量	
	private Double standardGrossWeight;	 //标准最小毛重
	private Double standardNetWeight;		  
	private Double standardMeasure;	     //标准最小体积
	private Double standardVolume;		 //标准最小面积
	
	private String palletNo; //托盘号
	private Integer palletQuantity;//托盘数量
	private Date placedDate;  //上架时间
	
	private Double notPlacedQuantity;
	private Date receivedDate;
	
	private Integer status;
	private Integer placedType;
	
	private Integer transNoteId;
	private Integer transListId;
	
	
	private Date actureTime;
	
	private String cargoNo;
	private Date lastSmartCostDate;
	
	private String custContact;//费用关系人 note
	private Double planedMeasure;//面积	
	private Double planedVolume;//体积	
	private Double planedGrossWeight;//毛重
	private Double planedNetWeight;//净重
	
	
	private String freezeName;
	private Date freezetime;
	private String freezeCancelName;
	private Date freezeCancelTime;
	private Integer statusFrozen;
	
	//虚拟字段
	
	//用于暂时保存拣货的数量
	private Double lastPickedQuantity;		//最后拣货数量
	private Double lastPickedPackages;
	private Double lastPickedGrossWeight;	//最后拣货毛重
	private Double lastPickedNetWeight;		//最后拣货净重
	private Double lastPickedMeasure;	//最后拣货体积
	private Double lastPickedVolume;		//最后拣货面积
	private Double lastPickedPackQuantity;  //最后拣货包装
	
	private String dates;
	private String trayQuantity;
	private Integer selectFlag;
	
	private String fromWarehouseCode;
	private Long fromWarehouseId;
	private String fromWarehouseName;
	private String fromAreaCode;
	private Long fromAreaId;
	private String fromAreaName;
	private String fromBlockCode;
	private Long fromBlockId;
	private String fromBlockName;
	private Long fromPlacedCargoId;
	private Date changeDate;
	private Double adjustQuantity;        //调整数量
	private Integer safeDays;             //保质期天数
	private long overdueDays;//超期天数
	private String frozenCategoryCode;    //冻结状态code
	private String frozenCategory;        //冻结状态
	private String remarks;
	
	
	//以下是虚拟字段
	private String cargoOwnerName;
	private String categoryName;//产品类别
	
	
	
	
	
    public WPlacedCargo() {
    }

    


	@Column(name="STATUS_FROZEN")
    public Integer getStatusFrozen() {
		return statusFrozen;
	}

	public void setStatusFrozen(Integer statusFrozen) {
		this.statusFrozen = statusFrozen;
	}

	@Transient
	public String getCustContact() {
		return custContact;
	}


	public void setCustContact(String custContact) {
		this.custContact = custContact;
	}

	
	@Transient
	public Integer getSafeDays() {
		return safeDays;
	}

	public void setSafeDays(Integer safeDays) {
		this.safeDays = safeDays;
	}

	@Transient
	public Double getPlanedMeasure() {
		return planedMeasure;
	}


	public void setPlanedMeasure(Double planedMeasure) {
		this.planedMeasure = planedMeasure;
	}



	@Transient
	public Double getPlanedVolume() {
		return planedVolume;
	}


	public void setPlanedVolume(Double planedVolume) {
		this.planedVolume = planedVolume;
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


	@Column(name="BAR_CODE")
	public String getBarCode() {
		return this.barCode;
	}

	public void setBarCode(String barCode) {
		this.barCode = barCode;
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

	@Column(name="CUST_ID")
	public Integer getCustId() {
		return this.custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}


	@Column(name="CUST_NAME")
	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	@Column(name="ORDER_NO")
	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
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

	@Column(name="CONTAINER_NO")
	public String getContainerNo() {
		return this.containerNo;
	}

	public void setContainerNo(String containerNo) {
		this.containerNo = containerNo;
	}


	@Column(name="QUANTITY")
	public Double getQuantity() {
		return this.quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	@Column(name="PICKED_QUANTITY")
	public Double getPickedQuantity() {
		return this.pickedQuantity;
	}

	public void setPickedQuantity(Double pickedQuantity) {
		this.pickedQuantity = pickedQuantity;
	}
	
	@Column(name="SEND_QUANTITY")
	public Double getSendQuantity() {
		return this.sendQuantity;
	}

	public void setSendQuantity(Double sendQuantity) {
		this.sendQuantity = sendQuantity;
	}
	
	@Column(name="NOW_QUANTITY")
	public Double getNowQuantity() {
		return nowQuantity;
	}


	public void setNowQuantity(Double nowQuantity) {
		this.nowQuantity = nowQuantity;
	}

	@Column(name="NOW_PACKAGES")
	public Double getNowPackages() {
		return nowPackages;
	}


	public void setNowPackages(Double nowPackages) {
		this.nowPackages = nowPackages;
	}


	@Column(name="STORAGE_NOTE_CARGO_ID")
	public Long getStorageNoteCargoId() {
		return this.storageNoteCargoId;
	}

	public void setStorageNoteCargoId(Long storageNoteCargoId) {
		this.storageNoteCargoId = storageNoteCargoId;
	}

	@Column(name="RECEIVED_CARGO_ID")
	public Long getReceivedCargoId() {
		return this.receivedCargoId;
	}

	public void setReceivedCargoId(Long receivedCargoId) {
		this.receivedCargoId = receivedCargoId;
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

	@Transient
	public Double getNotPlacedQuantity() {
		return this.notPlacedQuantity;
	}

	public void setNotPlacedQuantity(Double notPlacedQuantity) {
		this.notPlacedQuantity = notPlacedQuantity;
	}
	
	@Temporal(TemporalType.DATE)
	@Column(name="RECEIVED_DATE")
	public Date getReceivedDate() {
		return this.receivedDate;
	}

	public void setReceivedDate(Date receivedDate) {
		this.receivedDate = receivedDate;
	}
	
	@Temporal(TemporalType.DATE)
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
	
	@Column(name="STATUS")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
	
	@Column(name="PLACED_TYPE")
	public Integer getPlacedType() {
		return placedType;
	}

	public void setPlacedType(Integer placedType) {
		this.placedType = placedType;
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
	
	
	@Column(name="CARGO_NO")
	public String getCargoNo() {
		return cargoNo;
	}


	public void setCargoNo(String cargoNo) {
		this.cargoNo = cargoNo;
	}
	
	@Column(name="TRANS_NOTE_ID")
	public Integer getTransNoteId() {
		return transNoteId;
	}


	public void setTransNoteId(Integer transNoteId) {
		this.transNoteId = transNoteId;
	}
	
	@Column(name="TRANS_LIST_ID")
	public Integer getTransListId() {
		return transListId;
	}


	public void setTransListId(Integer transListId) {
		this.transListId = transListId;
	}


	@Transient
	public Double getPickableQuantity() {
		return this.pickableQuantity;
	}

	public void setPickableQuantity(Double pickableQuantity) {
		this.pickableQuantity = pickableQuantity;
	}
	
	
	@Column(name="FREEZE_NAME")
	public String getFreezeName() {
		return freezeName;
	}


	public void setFreezeName(String freezeName) {
		this.freezeName = freezeName;
	}


	@Temporal(TemporalType.DATE)
	@Column(name="FREEZE_TIME")
	public Date getFreezetime() {
		return freezetime;
	}


	public void setFreezetime(Date freezetime) {
		this.freezetime = freezetime;
	}


	@Column(name="FREEZE_CANCEL_NAME")
	public String getFreezeCancelName() {
		return freezeCancelName;
	}


	public void setFreezeCancelName(String freezeCancelName) {
		this.freezeCancelName = freezeCancelName;
	}


	@Temporal(TemporalType.DATE)
	@Column(name="FREEZE_CANCEL_TIME")
	public Date getFreezeCancelTime() {
		return freezeCancelTime;
	}


	public void setFreezeCancelTime(Date freezeCancelTime) {
		this.freezeCancelTime = freezeCancelTime;
	}


	@Transient
	public Date getActureTime(){
		return this.actureTime;
	
	}
	public void setActureTime(Date actureTime){
		this.actureTime=actureTime;
	}

	@Column(name="LAST_SMART_COST_DATE")
	public Date getLastSmartCostDate() {
		return lastSmartCostDate;
	}


	public void setLastSmartCostDate(Date lastSmartCostDate) {
		this.lastSmartCostDate = lastSmartCostDate;
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

	@Column(name="PLACED_MEASURE")
	public Double getPlacedMeasure() {
		return placedMeasure;
	}


	public void setPlacedMeasure(Double placedMeasure) {
		this.placedMeasure = placedMeasure;
	}

	@Column(name="PLACED_VOLUME")
	public Double getPlacedVolume() {
		return placedVolume;
	}


	public void setPlacedVolume(Double placedVolume) {
		this.placedVolume = placedVolume;
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

	@Column(name="PICKED_MEASUREMENT")
	public Double getPickedMeasurement() {
		return pickedMeasurement;
	}


	public void setPickedMeasurement(Double pickedMeasurement) {
		this.pickedMeasurement = pickedMeasurement;
	}

	@Column(name="PICKED_VOLUME")
	public Double getPickedVolume() {
		return pickedVolume;
	}


	public void setPickedVolume(Double pickedVolume) {
		this.pickedVolume = pickedVolume;
	}

	@Column(name="NOW_GROSS_WEIGHT")
	public Double getNowGrossWeight() {
		return nowGrossWeight;
	}


	public void setNowGrossWeight(Double nowGrossWeight) {
		this.nowGrossWeight = nowGrossWeight;
	}

	@Column(name="NOW_NET_WEIGHT")
	public Double getNowNetWeight() {
		return nowNetWeight;
	}


	public void setNowNetWeight(Double nowNetWeight) {
		this.nowNetWeight = nowNetWeight;
	}

	@Column(name="NOW_MEASUREMENT")
	public Double getNowMeasurement() {
		return nowMeasurement;
	}

	public void setNowMeasurement(Double nowMeasurement) {
		this.nowMeasurement = nowMeasurement;
	}

	@Column(name="NOW_VOLUME")
	public Double getNowVolume() {
		return nowVolume;
	}

	public void setNowVolume(Double nowVolume) {
		this.nowVolume = nowVolume;
	}

	@Column(name="W_UNIT_ID")
	public Integer getwUnitId() {
		return wUnitId;
	}

	public void setwUnitId(Integer wUnitId) {
		this.wUnitId = wUnitId;
	}

	@Column(name="W_UNIT_NAME")
	public String getWUnitName() {
		return wUnitName;
	}

	public void setWUnitName(String wUnitName) {
		this.wUnitName = wUnitName;
	}

	@Column(name="M_UNIT_ID")
	public Integer getmUnitId() {
		return mUnitId;
	}

	public void setmUnitId(Integer mUnitId) {
		this.mUnitId = mUnitId;
	}

	@Column(name="M_UNIT_NAME")
	public String getmUnitName() {
		return mUnitName;
	}

	public void setmUnitName(String mUnitName) {
		this.mUnitName = mUnitName;
	}

	@Column(name="V_UNIT_ID")
	public Integer getvUnitId() {
		return vUnitId;
	}

	public void setvUnitId(Integer vUnitId) {
		this.vUnitId = vUnitId;
	}

	@Column(name="V_UNIT_NAME")
	public String getVUnitName() {
		return vUnitName;
	}

	public void setVUnitName(String vUnitName) {
		this.vUnitName = vUnitName;
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
	
	@Transient
	public String getCargoCategory() {
		return cargoCategory;
	}

	public void setCargoCategory(String cargoCategory) {
		this.cargoCategory = cargoCategory;
	}

	@Column(name="EFFECTIVE_DATE")
	public Date getEffectiveDate() {
		return effectiveDate;
	}

	public void setEffectiveDate(Date effectiveDate) {
		this.effectiveDate = effectiveDate;
	}

	@Column(name="QUALITY_TYPE")
	public String getQualityType() {
		return qualityType;
	}

	public void setQualityType(String qualityType) {
		this.qualityType = qualityType;
	}

	@Column(name="QA_FLAG_DATE")
	public Date getQaFlagDate() {
		return qaFlagDate;
	}

	public void setQaFlagDate(Date qaFlagDate) {
		this.qaFlagDate = qaFlagDate;
	}

	@Column(name="P_UNIT_ID")
	public Integer getpUnitId() {
		return pUnitId;
	}


	public void setpUnitId(Integer pUnitId) {
		this.pUnitId = pUnitId;
	}

	@Column(name="P_UNIT_NAME")
	public String getpUnitName() {
		return pUnitName;
	}

	public void setpUnitName(String pUnitName) {
		this.pUnitName = pUnitName;
	}

	@Column(name="PACK_UNIT_ID")
	public Integer getPackUnitId() {
		return packUnitId;
	}

	public void setPackUnitId(Integer packUnitId) {
		this.packUnitId = packUnitId;
	}

	@Column(name="PACK_UNIT_NAME")
	public String getPackUnitName() {
		return packUnitName;
	}

	public void setPackUnitName(String packUnitName) {
		this.packUnitName = packUnitName;
	}

	@Column(name="PACKAGES")
	public Double getPackages() {
		return packages;
	}

	public void setPackages(Double packages) {
		this.packages = packages;
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

	@Column(name="MEASURE")
	public Double getMeasure() {
		return measure;
	}

	public void setMeasure(Double measure) {
		this.measure = measure;
	}

	@Column(name="VOLUME")
	public Double getVolume() {
		return volume;
	}

	public void setVolume(Double volume) {
		this.volume = volume;
	}

	@Column(name="PACK_QUANTITY")
	public Double getPackQuantity() {
		return packQuantity;
	}

	public void setPackQuantity(Double packQuantity) {
		this.packQuantity = packQuantity;
	}

	@Column(name="PICKED_PACKAGES")
	public Double getPickedPackages() {
		return pickedPackages;
	}

	public void setPickedPackages(Double pickedPackages) {
		this.pickedPackages = pickedPackages;
	}

	@Column(name="PICKED_PACK_QUANTITY")
	public Double getPickedPackQuantity() {
		return pickedPackQuantity;
	}

	public void setPickedPackQuantity(Double pickedPackQuantity) {
		this.pickedPackQuantity = pickedPackQuantity;
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

	@Column(name="STANDARD_MEASURE")
	public Double getStandardMeasure() {
		return standardMeasure;
	}

	public void setStandardMeasure(Double standardMeasure) {
		this.standardMeasure = standardMeasure;
	}

	@Column(name="STANDARD_VOLUME")
	public Double getStandardVolume() {
		return standardVolume;
	}

	public void setStandardVolume(Double standardVolume) {
		this.standardVolume = standardVolume;
	}

	@Column(name="PALLET_NO")
	public String getPalletNo() {
		return palletNo;
	}

	public void setPalletNo(String palletNo) {
		this.palletNo = palletNo;
	}
	
	@Column(name="PALLET_QUANTITY")
	public Integer getPalletQuantity() {
		return palletQuantity;
	}

	public void setPalletQuantity(Integer palletQuantity) {
		this.palletQuantity = palletQuantity;
	}

	@Temporal(TemporalType.DATE)
	@Column(name="PLACED_DATE")
	public Date getPlacedDate() {
		return placedDate;
	}

	public void setPlacedDate(Date placedDate) {
		this.placedDate = placedDate;
	}
	
	
	@Column(name="FROM_WAREHOUSE_CODE")
	public String getFromWarehouseCode() {
		return fromWarehouseCode;
	}

	public void setFromWarehouseCode(String fromWarehouseCode) {
		this.fromWarehouseCode = fromWarehouseCode;
	}

	@Column(name="FROM_WAREHOUSE_ID")
	public Long getFromWarehouseId() {
		return fromWarehouseId;
	}

	public void setFromWarehouseId(Long fromWarehouseId) {
		this.fromWarehouseId = fromWarehouseId;
	}

	@Column(name="FROM_WAREHOUSE_NAME")
	public String getFromWarehouseName() {
		return fromWarehouseName;
	}

	public void setFromWarehouseName(String fromWarehouseName) {
		this.fromWarehouseName = fromWarehouseName;
	}

	@Column(name="FROM_AREA_CODE")
	public String getFromAreaCode() {
		return fromAreaCode;
	}

	public void setFromAreaCode(String fromAreaCode) {
		this.fromAreaCode = fromAreaCode;
	}

	@Column(name="FROM_AREA_ID")
	public Long getFromAreaId() {
		return fromAreaId;
	}

	public void setFromAreaId(Long fromAreaId) {
		this.fromAreaId = fromAreaId;
	}

	@Column(name="FROM_AREA_NAME")
	public String getFromAreaName() {
		return fromAreaName;
	}

	public void setFromAreaName(String fromAreaName) {
		this.fromAreaName = fromAreaName;
	}

	@Column(name="FROM_BLOCK_CODE")
	public String getFromBlockCode() {
		return fromBlockCode;
	}

	public void setFromBlockCode(String fromBlockCode) {
		this.fromBlockCode = fromBlockCode;
	}

	@Column(name="FROM_BLOCK_ID")
	public Long getFromBlockId() {
		return fromBlockId;
	}
	
	public void setFromBlockId(Long fromBlockId) {
		this.fromBlockId = fromBlockId;
	}

	@Column(name="FROM_BLOCK_NAME")
	public String getFromBlockName() {
		return fromBlockName;
	}

	public void setFromBlockName(String fromBlockName) {
		this.fromBlockName = fromBlockName;
	}

	@Column(name="FROM_PLACED_CARGO_ID")
	public Long getFromPlacedCargoId() {
		return fromPlacedCargoId;
	}

	public void setFromPlacedCargoId(Long fromPlacedCargoId) {
		this.fromPlacedCargoId = fromPlacedCargoId;
	}

	@Column(name="CHANGE_DATE")
	public Date getChangeDate() {
		return changeDate;
	}

	public void setChangeDate(Date changeDate) {
		this.changeDate = changeDate;
	}
	

	@Column(name="REMARKS")
	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	@Column(name="FROZEN_CATEGORY_CODE")
	public String getFrozenCategoryCode() {
		return frozenCategoryCode;
	}

	public void setFrozenCategoryCode(String frozenCategoryCode) {
		this.frozenCategoryCode = frozenCategoryCode;
	}

	@Column(name="FROZEN_CATEGORY")
	public String getFrozenCategory() {
		return frozenCategory;
	}

	public void setFrozenCategory(String frozenCategory) {
		this.frozenCategory = frozenCategory;
	}

	@Temporal(TemporalType.DATE)
	@Transient
	public String getDates() {
		return dates;
	}


	public void setDates(String dates) {
		this.dates = dates;
	}


	@Transient
	public String getTrayQuantity() {
		return trayQuantity;
	}


	public void setTrayQuantity(String trayQuantity) {
		this.trayQuantity = trayQuantity;
	}

	@Transient
	public Integer getBlockLayer() {
		return blockLayer;
	}


	public void setBlockLayer(Integer blockLayer) {
		this.blockLayer = blockLayer;
	}

	@Transient
	public Integer getSelectFlag() {
		return selectFlag;
	}


	public void setSelectFlag(Integer selectFlag) {
		this.selectFlag = selectFlag;
	}

	@Transient
	public Double getLastPickedQuantity() {
		return lastPickedQuantity;
	}


	public void setLastPickedQuantity(Double lastPickedQuantity) {
		this.lastPickedQuantity = lastPickedQuantity;
	}

	@Transient
	public Double getLastPickedPackages() {
		return lastPickedPackages;
	}


	public void setLastPickedPackages(Double lastPickedPackages) {
		this.lastPickedPackages = lastPickedPackages;
	}

	@Transient
	public Double getLastPickedGrossWeight() {
		return lastPickedGrossWeight;
	}


	public void setLastPickedGrossWeight(Double lastPickedGrossWeight) {
		this.lastPickedGrossWeight = lastPickedGrossWeight;
	}

	@Transient
	public Double getLastPickedNetWeight() {
		return lastPickedNetWeight;
	}


	public void setLastPickedNetWeight(Double lastPickedNetWeight) {
		this.lastPickedNetWeight = lastPickedNetWeight;
	}

	@Transient
	public Double getLastPickedMeasure() {
		return lastPickedMeasure;
	}


	public void setLastPickedMeasure(Double lastPickedMeasure) {
		this.lastPickedMeasure = lastPickedMeasure;
	}

	@Transient
	public Double getLastPickedVolume() {
		return lastPickedVolume;
	}


	public void setLastPickedVolume(Double lastPickedVolume) {
		this.lastPickedVolume = lastPickedVolume;
	}

	@Transient
	public Double getLastPickedPackQuantity() {
		return lastPickedPackQuantity;
	}


	public void setLastPickedPackQuantity(Double lastPickedPackQuantity) {
		this.lastPickedPackQuantity = lastPickedPackQuantity;
	}


	@Transient
	public Double getAdjustQuantity() {
		return adjustQuantity;
	}

	public void setAdjustQuantity(Double adjustQuantity) {
		this.adjustQuantity = adjustQuantity;
	}



	@Transient
	public long getOverdueDays() {
		return overdueDays;
	}
	
	public void setOverdueDays(long overdueDays) {
		this.overdueDays = overdueDays;
	}

	@Transient
	public String getCargoOwnerName() {
		return cargoOwnerName;
	}

	public void setCargoOwnerName(String cargoOwnerName) {
		this.cargoOwnerName = cargoOwnerName;
	}

	@Transient
	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	
	

}