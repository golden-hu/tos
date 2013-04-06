package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;


/**
 * The persistent class for the w_area database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WInventory extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String cargoName;		//商品名称
	private Integer cargoId;		//商品Id
	//0906
	private String categoryName;  //商品类别
	private String skuNo;			//skuNo
	private String storageNoteNo;	//入库单号
	private Date storageDate;		//入库日期
	private String blockName;		//库位名称
	private String blockCode;		//库位代码
	private Integer blockId;		//库位Id
	//0906
    private Integer blockLayer;     //层数
	
	private String areaCode;		//库区代码
	private String areaName;		//库区名称
	private Integer areaId;			//库区Id
	private String warehouseCode;   //仓库代码
	private Integer warehouseId;	//仓库Id
	private String warehouseName;		//仓库名称 
	private String cargoOwner;			//货主
	private Integer cargoOwnerId;		
	private String custName;			//寄仓单位
	private Integer custId;
	private String cargoType;
	private String cargoBrand;
	private String accountName;
	private Integer accountId;
	private Double quantity;				//数量
	private String qUnitName;				//数量单位
	//0906
	private Integer qUnitId;
	private Double packages;				//件数
	private Integer pUnitId;				//件数单位ID
	
	private String pUnitName;				//件数单位
	private Double netWeight;				//净重
	private Double grossWeight;				//毛重
	private String wUnitName;				//重量单位
	private Integer wUnitId;
	//0906
	private Double volume;
	private String vUnitName;
	private Integer vUnitId;
	private Double measure;					//面积
	private String mUnitName;				//面积单位
	private Integer mUnitId;
	private Integer stockDays;				//库龄
	private String orderNo;					//订单号
	private String batchNo;					//批次号
	private String entrustNo;
	private String warehouseProperty;
	private Date productDate;					//生产日期
	private String productNo;
	private String goodRule;
	private Integer cargoAges;					//货龄
	private String cargoProperty;				//商品属性
	private Double bornQuantity;				//bornQuantity 残损量
	private String remarks;						//备注
	private String supplier;
	private String operator;
	private String placedName;
	private String opType;
	private String realSignName;
	private String bornRemarks;					//残损备注
	private String retalFlag;
	private String stockDaysAnalysis;
	private Date actureTime;
	
	private Integer storageNoteId;
	private Integer placedCargoId;
	private Integer receivedCargoId;
	private Integer pickedCargoId;
	private Integer storageNoteCargoId;
	
	private Byte storageType;				//仓单类型
	private Date receivedDate;				//收货日期
	//0906
	private Date placedDate;//上架日期
	
	private String makeReportUser;			//制表人员
	private Date   makeReportDate;			//制表日期
	
	private String unitNameQuantity;
	private String unitNameWeight;
	//0906
	private String status;//状态
	
    public WInventory() {
    }

	public String getCargoName() {
		return cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}

	public Integer getCargoId() {
		return cargoId;
	}

	public void setCargoId(Integer cargoId) {
		this.cargoId = cargoId;
	}

	public String getSkuNo() {
		return skuNo;
	}

	public void setSkuNo(String skuNo) {
		this.skuNo = skuNo;
	}

	public String getStorageNoteNo() {
		return storageNoteNo;
	}

	public void setStorageNoteNo(String storageNoteNo) {
		this.storageNoteNo = storageNoteNo;
	}

	public Date getStorageDate() {
		return storageDate;
	}

	public void setStorageDate(Date storageDate) {
		this.storageDate = storageDate;
	}

	public String getBlockName() {
		return blockName;
	}

	public void setBlockName(String blockName) {
		this.blockName = blockName;
	}

	public String getBlockCode() {
		return blockCode;
	}

	public void setBlockCode(String blockCode) {
		this.blockCode = blockCode;
	}

	public Integer getBlockId() {
		return blockId;
	}

	public void setBlockId(Integer blockId) {
		this.blockId = blockId;
	}

	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public Integer getAreaId() {
		return areaId;
	}

	public void setAreaId(Integer areaId) {
		this.areaId = areaId;
	}

	public String getWarehouseCode() {
		return warehouseCode;
	}

	public void setWarehouseCode(String warehouseCode) {
		this.warehouseCode = warehouseCode;
	}

	public Integer getWarehouseId() {
		return warehouseId;
	}

	public void setWarehouseId(Integer warehouseId) {
		this.warehouseId = warehouseId;
	}

	public String getWarehouseName() {
		return warehouseName;
	}

	public void setWarehouseName(String warehouseName) {
		this.warehouseName = warehouseName;
	}

	public String getCargoOwner() {
		return cargoOwner;
	}

	public void setCargoOwner(String cargoOwner) {
		this.cargoOwner = cargoOwner;
	}

	public Integer getCargoOwnerId() {
		return cargoOwnerId;
	}

	public void setCargoOwnerId(Integer cargoOwnerId) {
		this.cargoOwnerId = cargoOwnerId;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public Integer getCustId() {
		return custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}

	public String getCargoType() {
		return cargoType;
	}

	public void setCargoType(String cargoType) {
		this.cargoType = cargoType;
	}

	public String getCargoBrand() {
		return cargoBrand;
	}

	public void setCargoBrand(String cargoBrand) {
		this.cargoBrand = cargoBrand;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public Integer getAccountId() {
		return accountId;
	}

	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}

	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	public String getqUnitName() {
		return qUnitName;
	}

	public void setqUnitName(String qUnitName) {
		this.qUnitName = qUnitName;
	}

	public Integer getqUnitId() {
		return qUnitId;
	}

	public void setqUnitId(Integer qUnitId) {
		this.qUnitId = qUnitId;
	}
	
	public Double getPackages() {
		return packages;
	}

	public void setPackages(Double packages) {
		this.packages = packages;
	}

	public Integer getpUnitId() {
		return pUnitId;
	}

	public void setpUnitId(Integer pUnitId) {
		this.pUnitId = pUnitId;
	}

	public String getpUnitName() {
		return pUnitName;
	}

	public void setpUnitName(String pUnitName) {
		this.pUnitName = pUnitName;
	}

	public Double getNetWeight() {
		return netWeight;
	}

	public void setNetWeight(Double netWeight) {
		this.netWeight = netWeight;
	}

	public Double getGrossWeight() {
		return grossWeight;
	}

	public void setGrossWeight(Double grossWeight) {
		this.grossWeight = grossWeight;
	}

	public String getwUnitName() {
		return wUnitName;
	}

	public void setwUnitName(String wUnitName) {
		this.wUnitName = wUnitName;
	}

	public Integer getwUnitId() {
		return wUnitId;
	}

	public void setwUnitId(Integer wUnitId) {
		this.wUnitId = wUnitId;
	}

	public Double getVolume() {
		return volume;
	}

	public void setVolume(Double volume) {
		this.volume = volume;
	}

	public String getvUnitName() {
		return vUnitName;
	}

	public void setvUnitName(String vUnitName) {
		this.vUnitName = vUnitName;
	}

	public Integer getvUnitId() {
		return vUnitId;
	}

	public void setvUnitId(Integer vUnitId) {
		this.vUnitId = vUnitId;
	}

	public Double getMeasure() {
		return measure;
	}

	public void setMeasure(Double measure) {
		this.measure = measure;
	}

	public String getmUnitName() {
		return mUnitName;
	}

	public void setmUnitName(String mUnitName) {
		this.mUnitName = mUnitName;
	}

	public Integer getmUnitId() {
		return mUnitId;
	}

	public void setmUnitId(Integer mUnitId) {
		this.mUnitId = mUnitId;
	}

	public Integer getStockDays() {
		return stockDays;
	}

	public void setStockDays(Integer stockDays) {
		this.stockDays = stockDays;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}

	public String getWarehouseProperty() {
		return warehouseProperty;
	}

	public void setWarehouseProperty(String warehouseProperty) {
		this.warehouseProperty = warehouseProperty;
	}

	public Date getProductDate() {
		return productDate;
	}

	public void setProductDate(Date productDate) {
		this.productDate = productDate;
	}

	public String getGoodRule() {
		return goodRule;
	}

	public void setGoodRule(String goodRule) {
		this.goodRule = goodRule;
	}

	public Integer getCargoAges() {
		return cargoAges;
	}

	public void setCargoAges(Integer cargoAges) {
		this.cargoAges = cargoAges;
	}

	public String getCargoProperty() {
		return cargoProperty;
	}

	public void setCargoProperty(String cargoProperty) {
		this.cargoProperty = cargoProperty;
	}

	public Double getBornQuantity() {
		return bornQuantity;
	}

	public void setBornQuantity(Double bornQuantity) {
		this.bornQuantity = bornQuantity;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public String getPlacedName() {
		return placedName;
	}

	public void setPlacedName(String placedName) {
		this.placedName = placedName;
	}

	public String getOpType() {
		return opType;
	}

	public void setOpType(String opType) {
		this.opType = opType;
	}

	public String getRealSignName() {
		return realSignName;
	}

	public void setRealSignName(String realSignName) {
		this.realSignName = realSignName;
	}

	public String getBornRemarks() {
		return bornRemarks;
	}

	public void setBornRemarks(String bornRemarks) {
		this.bornRemarks = bornRemarks;
	}

	public String getRetalFlag() {
		return retalFlag;
	}

	public void setRetalFlag(String retalFlag) {
		this.retalFlag = retalFlag;
	}

	public String getStockDaysAnalysis() {
		return stockDaysAnalysis;
	}

	public void setStockDaysAnalysis(String stockDaysAnalysis) {
		this.stockDaysAnalysis = stockDaysAnalysis;
	}
	
	public Date getActureTime() {
		return actureTime;
	}

	public void setActureTime(Date actureTime) {
		this.actureTime = actureTime;
	}

	public Integer getStorageNoteId() {
		return storageNoteId;
	}

	public void setStorageNoteId(Integer storageNoteId) {
		this.storageNoteId = storageNoteId;
	}

	public Integer getPlacedCargoId() {
		return placedCargoId;
	}

	public void setPlacedCargoId(Integer placedCargoId) {
		this.placedCargoId = placedCargoId;
	}

	public Integer getReceivedCargoId() {
		return receivedCargoId;
	}

	public void setReceivedCargoId(Integer receivedCargoId) {
		this.receivedCargoId = receivedCargoId;
	}

	public Integer getPickedCargoId() {
		return pickedCargoId;
	}

	public void setPickedCargoId(Integer pickedCargoId) {
		this.pickedCargoId = pickedCargoId;
	}

	public Integer getStorageNoteCargoId() {
		return storageNoteCargoId;
	}

	public void setStorageNoteCargoId(Integer storageNoteCargoId) {
		this.storageNoteCargoId = storageNoteCargoId;
	}

	public Byte getStorageType() {
		return storageType;
	}

	public void setStorageType(Byte storageType) {
		this.storageType = storageType;
	}

	public Date getReceivedDate() {
		return receivedDate;
	}

	public void setReceivedDate(Date receivedDate) {
		this.receivedDate = receivedDate;
	}



	public String getUnitNameQuantity() {
		return unitNameQuantity;
	}

	public void setUnitNameQuantity(String unitNameQuantity) {
		this.unitNameQuantity = unitNameQuantity;
	}

	public String getUnitNameWeight() {
		return unitNameWeight;
	}

	public void setUnitNameWeight(String unitNameWeight) {
		this.unitNameWeight = unitNameWeight;
	}

	public String getMakeReportUser() {
		return makeReportUser;
	}

	public void setMakeReportUser(String makeReportUser) {
		this.makeReportUser = makeReportUser;
	}

	public Date getMakeReportDate() {
		return makeReportDate;
	}

	public void setMakeReportDate(Date makeReportDate) {
		this.makeReportDate = makeReportDate;
	}

	public String getEntrustNo() {
		return entrustNo;
	}

	public void setEntrustNo(String entrustNo) {
		this.entrustNo = entrustNo;
	}

	public String getProductNo() {
		return productNo;
	}

	public void setProductNo(String productNo) {
		this.productNo = productNo;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Integer getBlockLayer() {
		return blockLayer;
	}

	public void setBlockLayer(Integer blockLayer) {
		this.blockLayer = blockLayer;
	}

	public Date getPlacedDate() {
		return placedDate;
	}

	public void setPlacedDate(Date placedDate) {
		this.placedDate = placedDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
    
	
	
	
	
     
	
}