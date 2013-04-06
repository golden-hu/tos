package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.util.Date;


/**
 * The persistent class for the w_pick_list database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_PICKED_CARGO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WPickedCargo extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private Double sendQuantity;		//已发货数量
	private Double sendGrossWeight;		//已发货毛重
	private Double sendNetWeight;		//已发货净重
	private Double sendMeasurement;		//已发货体积
	private Double sendVolume;			//已发货面积
	
	
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
	private Long custId;
	private String custName;
	
	
	private String orderNo;
	private Long packId;
	private String packName;
	private String palletNo;
	private Integer palletQuantity;//托盘数量
	private Double unitPrice;
	
	private Long unitId;
	private String unitName;	
	private Long wUnitId;			//重量单位id
	private String wUnitName;		//重量单位名称
	private Long mUnitId;			//面积单位id
	private String mUnitName;		//面积单位名称 
	private Long vUnitId;			//体积单位id
	private String vUnitName;		//体积单位名称	
	private Long pUnitId;
	private String pUnitName;
	private Long packUnitId;
	private String packUnitName;
	
	
	private Double quantity;
	private Double packages;	
	private Double grossWeight;
	private Double measurement;
	private Double netWeight;
	private Double volume;
	private Double packQuantity;
	
	
	//拣货数量
	private Double pickedQuantity;
	private Double pickedGrossWeight;	//拣货毛重
	private Double pickedNetWeight;		//拣货净重
	private Double pickedMeasurement;	//拣货体积
	private Double pickedVolume;		//拣货面积
	private Double pickedPackages;
	private Double pickedPackQuantity;
	
	private Double distGrossWeight;	    //已分配毛重
	private Double distNetWeight;		//已分配净重
	private Double distMeasure;	        //已分配体积
	private Double distVolume;		    //已分配面积
	private Double distQuantity;	    //已分配数量
	private Double distPackages;		//已分配件数
	
	private Double standardQuantity;
	private Double standardGrossWeight;	//拣货毛重
	private Double standardNetWeight;		//拣货净重
	private Double standardMeasure;	//拣货体积
	private Double standardVolume;		//拣货面积
	
	private String productNo;
	private Date productDate;
	private Date receivedDate;
	private Date pickedDate;
	
	private String specification;
	private Integer status;
	
	private Double pickedNoteCargoQuantity;		//保存货物明细表中的拣货扣减数量，为了删除拣货信息时，不会发生要通过换算系数来计算值进行回加，从而有小数位数的偏差
	
	private Long inStorageNoteId;
	private String inStorageNoteNo;
	private Long outStorageNoteId;
	private String outStorageNoteNo;
	private Long inStorageNoteCargoId;
	private Long outStorageNoteCargoId;
	private Long placedCargoId;
	
	
	
	
	private String warehouseCode;
	private Long warehouseId;
	private String warehouseName;

	private Double pickableQuantity;
	private String remarks;
	private Integer placedType;
	
    public WPickedCargo() {
    }


	@Column(name="SEND_QUANTITY")
	public Double getSendQuantity() {
		return this.sendQuantity;
	}

	public void setSendQuantity(Double sendQuantity) {
		this.sendQuantity = sendQuantity;
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


	@Column(name="MEASUREMENT")
	public Double getMeasurement() {
		return this.measurement;
	}

	public void setMeasurement(Double measurement) {
		this.measurement = measurement;
	}


	@Column(name="NET_WEIGHT")
	public Double getNetWeight() {
		return this.netWeight;
	}

	public void setNetWeight(Double netWeight) {
		this.netWeight = netWeight;
	}


	@Column(name="ORDER_NO")
	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}


	@Column(name="PACK_ID")
	public Long getPackId() {
		return this.packId;
	}

	public void setPackId(Long packId) {
		this.packId = packId;
	}


	@Column(name="PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}


	@Column(name="PALLET_NO")
	public String getPalletNo() {
		return this.palletNo;
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

	@Column(name="QUANTITY")
	public Double getQuantity() {
		return this.quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
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


	@Temporal( TemporalType.DATE)
	@Column(name="RECEIVED_DATE")
	public Date getReceivedDate() {
		return this.receivedDate;
	}

	public void setReceivedDate(Date receivedDate) {
		this.receivedDate = receivedDate;
	}

	@Temporal( TemporalType.DATE)
	@Column(name="PICKED_DATE")
	public Date getPickedDate() {
		return this.pickedDate;
	}

	public void setPickedDate(Date pickedDate) {
		this.pickedDate = pickedDate;
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
	
	

	@Column(name="PICKED_NOTE_CARGO_QUANTITY")
	public Double getPickedNoteCargoQuantity() {
		return pickedNoteCargoQuantity;
	}


	public void setPickedNoteCargoQuantity(Double pickedNoteCargoQuantity) {
		this.pickedNoteCargoQuantity = pickedNoteCargoQuantity;
	}


	@Column(name="OUT_STORAGE_NOTE_ID")
	public Long getOutStorageNoteId() {
		return this.outStorageNoteId;
	}

	public void setOutStorageNoteId(Long outStorageNoteId) {
		this.outStorageNoteId = outStorageNoteId;
	}


	@Column(name="OUT_STORAGE_NOTE_NO")
	public String getOutStorageNoteNo() {
		return this.outStorageNoteNo;
	}

	public void setOutStorageNoteNo(String outStorageNoteNo) {
		this.outStorageNoteNo = outStorageNoteNo;
	}

	@Column(name="IN_STORAGE_NOTE_ID")
	public Long getInStorageNoteId() {
		return this.inStorageNoteId;
	}

	public void setInStorageNoteId(Long inStorageNoteId) {
		this.inStorageNoteId = inStorageNoteId;
	}

	@Column(name="IN_STORAGE_NOTE_NO")
	public String getInStorageNoteNo() {
		return this.inStorageNoteNo;
	}

	public void setInStorageNoteNo(String inStorageNoteNo) {
		this.inStorageNoteNo = inStorageNoteNo;
	}
	
	@Column(name="IN_STORAGE_NOTE_CARGO_ID")
	public Long getInStorageNoteCargoId() {
		return this.inStorageNoteCargoId;
	}

	public void setInStorageNoteCargoId(Long inStorageNoteCargoId) {
		this.inStorageNoteCargoId = inStorageNoteCargoId;
	}
	
	@Column(name="OUT_STORAGE_NOTE_CARGO_ID")
	public Long getOutStorageNoteCargoId() {
		return this.outStorageNoteCargoId;
	}

	public void setOutStorageNoteCargoId(Long outStorageNoteCargoId) {
		this.outStorageNoteCargoId = outStorageNoteCargoId;
	}
	
	@Column(name="PLACED_CARGO_ID")
	public Long getPlacedCargoId() {
		return this.placedCargoId;
	}

	public void setPlacedCargoId(Long placedCargoId) {
		this.placedCargoId = placedCargoId;
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


	@Column(name="UNIT_PRICE")
	public Double getUnitPrice() {
		return this.unitPrice;
	}

	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
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
	public Double getPickableQuantity() {
		return pickableQuantity;
	}

	public void setPickableQuantity(Double pickableQuantity) {
		this.pickableQuantity = pickableQuantity;
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

	@Column(name="SEND_MEASUREMENT")
	public Double getSendMeasurement() {
		return sendMeasurement;
	}

	
	public void setSendMeasurement(Double sendMeasurement) {
		this.sendMeasurement = sendMeasurement;
	}

	@Column(name="SEND_VOLUME")
	public Double getSendVolume() {
		return sendVolume;
	}

	
	public void setSendVolume(Double sendVolume) {
		this.sendVolume = sendVolume;
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

	@Column(name="W_UNIT_ID")
	public Long getwUnitId() {
		return wUnitId;
	}

	
	public void setwUnitId(Long wUnitId) {
		this.wUnitId = wUnitId;
	}

	@Column(name="W_UNIT_NAME")
	public String getwUnitName() {
		return wUnitName;
	}


	public void setwUnitName(String wUnitName) {
		this.wUnitName = wUnitName;
	}

	@Column(name="M_UNIT_ID")
	public Long getmUnitId() {
		return mUnitId;
	}


	public void setmUnitId(Long mUnitId) {
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
	public Long getvUnitId() {
		return vUnitId;
	}


	public void setvUnitId(Long vUnitId) {
		this.vUnitId = vUnitId;
	}

	@Column(name="V_UNIT_NAME")
	public String getvUnitName() {
		return vUnitName;
	}


	public void setvUnitName(String vUnitName) {
		this.vUnitName = vUnitName;
	}

	@Column(name="P_UNIT_ID")
	public Long getpUnitId() {
		return pUnitId;
	}


	public void setpUnitId(Long pUnitId) {
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
	public Long getPackUnitId() {
		return packUnitId;
	}


	public void setPackUnitId(Long packUnitId) {
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

	@Column(name="PICKED_QUANTITY")
	public Double getPickedQuantity() {
		return pickedQuantity;
	}


	public void setPickedQuantity(Double pickedQuantity) {
		this.pickedQuantity = pickedQuantity;
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


	@Column(name="REMARKS")
	public String getRemarks() {
		return remarks;
	}


	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Column(name="PLACED_TYPE")
	public Integer getPlacedType() {
		return placedType;
	}


	public void setPlacedType(Integer placedType) {
		this.placedType = placedType;
	}
	
	
	
	
	
	
}