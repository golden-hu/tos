package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * The persistent class for the w_cargo database table.
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_CARGO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WCargo extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer allotRule;
	private Long warehouseId;
	private String warehouseCode;
	private String warehouseName;
	private Long areaId;
	private String areaCode;
	private String areaName;
	private String blockCode;
	private Long blockId;
	private String blockName;
	private String skuNo;	
	private Double height;
	private Double length;
	private String cargoName;
	private String cargoNameEn;
	private Long cargoOwnerId;
	private String cargoOwnerName;
	private Double width;
	private Long categoryId;
	private String categoryCode;
	private String categoryName;
	private String hsCode;
	
	private Byte isDangerous;
	private Byte isRefrigeration;
	private Byte isEntity;
	private Byte isDisabled;
	private String msdsCode;
	
	private Integer pickRule;
	private Integer preAllotRule;
	private Double price;
	
	private Long numUnitId;
	private String numUnitName;
	
	private Long wUnitId;
	private String wUnitName;
	
	private Long lUnitId;
	private String lUnitName;
	
	private Long inUnitId;
	private String inUnitName;
	private Long outUnitId;
	private String outUnitName;
	private Integer printUnitId;
	private String printUnitName;
	private String remark;
	private Double stockMax;
	private Double stockMin;
	private Double appendNum;
	private Double temperatureMax;
	private Double temperatureMin;
	private Double grossWeight;
	private Double netWeight;
	
	
	private Double volume;//现在用的体积
	private Integer vUnitId;
	private String vUnitName;//体积单位
	private String specification;
	private String cargoType;//货物型号
	private Byte chargeType;
	
	private Double measure;//面积
	private String mUnit;//面积单位
	private Integer mUnitId;
	private Integer pUnitId;//件数id
	private String pUnitName;//件数单位
	private Double pQuantity;//件数
	private String cargoAttribute;//商品属性
	private String cargoBrand;//商品品牌
	private Integer safeDays;//保质期天数
	private String cargoColor;//商品颜色
	
	
	private Integer packageId;	//包装ID
	private String packageName;	//包装名称
	private String packageEn;	//包装英文名称
	private String packageCh;	//包装中文名称
	
	private Integer p1UnitId;   //第二级包装ID
	private String p1UnitName;  //第二级包装名称
	private Double p1Quantity;  //第二级最小包装数量
	private Double p1L;			//第二级包装长
	private Double p1W;			//第二级包装宽
	private Double p1H;			//第二级包装高
	private Double p1GW;		//第二级包装毛重
	private Double p1NW;		//第二级包装净重
	private Double p1V;			//第二级包装体积
	
	private Integer p2UnitId;   //第三级包装ID
	private String p2UnitName;  //第三级包装名称
	private Double p2Quantity;  //第三级最小包装数量
	private Double p2L;			//第三级包装长
	private Double p2W;			//第三级包装宽
	private Double p2H;			//第三级包装高
	private Double p2GW;		//第三级包装毛重
	private Double p2NW;		//第三级包装净重
	private Double p2V;			//第三级包装体积
	
	private Integer p3UnitId;   //第四级包装ID
	private String p3UnitName;  //第四级包装名称
	private Double p3Quantity;  //第四级最小包装数量
	private Double p3L;			//第四级包装长
	private Double p3W;			//第四级包装宽
	private Double p3H;			//第四级包装高
	private Double p3GW;		//第四级包装毛重
	private Double p3NW;		//第四级包装净重
	private Double p3V;			//第四级包装体积
	
	private Integer p4UnitId;   //第五级包装ID
	private String p4UnitName;  //第五级包装名称
	private Double p4Quantity;  //第五级最小包装数量
	private Double p4L;			//第五级包装长
	private Double p4W;			//第五级包装宽
	private Double p4H;			//第五级包装高
	private Double p4GW;		//第五级包装毛重
	private Double p4NW;		//第五级包装净重
	private Double p4V;			//第五级包装体积
	
	private Integer inUnitValue;//入库默认包装    0：最小单位;  1：二级包装;  2：三级包装;  3：四级包装;	  4：5级包装
	private Integer outUnitValue;//出库默认包装  0：最小单位;  1：二级包装;  2：三级包装;  3：四级包装;	  4：5级包装
	
    public WCargo() {
    }

	@Column(name="ALLOT_RULE")
	public Integer getAllotRule() {
		return this.allotRule;
	}

	public void setAllotRule(Integer allotRule) {
		this.allotRule = allotRule;
	}

	@Column(name="CARGO_COLOR")
	public String getCargoColor() {
		return cargoColor;
	}


	public void setCargoColor(String cargoColor) {
		this.cargoColor = cargoColor;
	}


	@Column(name="VOLUME")
	public Double getVolume() {
		return volume;
	}


	public void setVolume(Double volume) {
		this.volume = volume;
	}


	
	@Column(name="SAFE_DAYS")
	public Integer getSafeDays() {
		return safeDays;
	}


	public void setSafeDays(Integer safeDays) {
		this.safeDays = safeDays;
	}


	@Column(name="V_UNIT_NAME")
	public String getVUnitName() {
		return vUnitName;
	}


	public void setVUnitName(String vUnitName) {
		this.vUnitName = vUnitName;
	}
	
	@Column(name="V_UNIT_ID")
	public Integer getVUnitId() {
		return vUnitId;
	}


	public void setVUnitId(Integer vUnitId) {
		this.vUnitId = vUnitId;
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


	@Column(name="P_QUANTITY")
	public Double getPQuantity() {
		return pQuantity;
	}


	public void setPQuantity(Double pQuantity) {
		this.pQuantity = pQuantity;
	}


	@Column(name="CARGO_ATTRIBUTE")
	public String getCargoAttribute() {
		return cargoAttribute;
	}


	public void setCargoAttribute(String cargoAttribute) {
		this.cargoAttribute = cargoAttribute;
	}


	@Column(name="CARGO_BRAND")
	public String getCargoBrand() {
		return cargoBrand;
	}


	public void setCargoBrand(String cargoBrand) {
		this.cargoBrand = cargoBrand;
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
	

	@Column(name="HEIGHT")
	public Double getHeight() {
		return this.height;
	}

	public void setHeight(Double height) {
		this.height = height;
	}


	@Column(name="LENGTH")
	public Double getLength() {
		return this.length;
	}

	public void setLength(Double length) {
		this.length = length;
	}

	
	@Column(name="CARGO_NAME")
	public String getCargoName() {
		return this.cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}


	@Column(name="CARGO_NAME_EN")
	public String getCargoNameEn() {
		return this.cargoNameEn;
	}

	public void setCargoNameEn(String cargoNameEn) {
		this.cargoNameEn = cargoNameEn;
	}


	@Column(name="CARGO_OWNER_ID")
	public Long getCargoOwnerId() {
		return this.cargoOwnerId;
	}

	public void setCargoOwnerId(Long cargoOwnerId) {
		this.cargoOwnerId = cargoOwnerId;
	}


	@Column(name="CARGO_OWNER_NAME")
	public String getCargoOwnerName() {
		return this.cargoOwnerName;
	}

	public void setCargoOwnerName(String cargoOwnerName) {
		this.cargoOwnerName = cargoOwnerName;
	}


	@Column(name="WIDTH")
	public Double getWidth() {
		return this.width;
	}

	public void setWidth(Double width) {
		this.width = width;
	}


	@Column(name="CATEGORY_ID")
	public Long getCategoryId() {
		return this.categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	
	@Column(name="CATEGORY_CODE")
	public String getCategoryCode() {
		return this.categoryCode;
	}

	public void setCategoryCode(String categoryCode) {
		this.categoryCode = categoryCode;
	}


	@Column(name="CATEGORY_NAME")
	public String getCategoryName() {
		return this.categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}


	@Column(name="HS_CODE")
	public String getHsCode() {
		return this.hsCode;
	}

	public void setHsCode(String hsCode) {
		this.hsCode = hsCode;
	}


	@Column(name="IN_UNIT_ID")
	public Long getInUnitId() {
		return this.inUnitId;
	}

	public void setInUnitId(Long inUnitId) {
		this.inUnitId = inUnitId;
	}


	@Column(name="IN_UNIT_NAME")
	public String getInUnitName() {
		return this.inUnitName;
	}

	public void setInUnitName(String inUnitName) {
		this.inUnitName = inUnitName;
	}


	@Column(name="IS_DANGEROUS")
	public Byte getIsDangerous() {
		return this.isDangerous;
	}

	public void setIsDangerous(Byte isDangerous) {
		this.isDangerous = isDangerous;
	}


	@Column(name="IS_REFRIGERATION")
	public Byte getIsRefrigeration() {
		return this.isRefrigeration;
	}

	public void setIsRefrigeration(Byte isRefrigeration) {
		this.isRefrigeration = isRefrigeration;
	}
	

	@Column(name="IS_ENTITY")
	public Byte getIsEntity() {
		return isEntity;
	}

	public void setIsEntity(Byte isEntity) {
		this.isEntity = isEntity;
	}
	@Column(name="IS_DISABLED")
	public Byte getIsDisabled() {
		return isDisabled;
	}

	public void setIsDisabled(Byte isDisabled) {
		this.isDisabled = isDisabled;
	}

	@Column(name="MSDS_CODE")
	public String getMsdsCode() {
		return this.msdsCode;
	}

	public void setMsdsCode(String msdsCode) {
		this.msdsCode = msdsCode;
	}


	@Column(name="OUT_UNIT_ID")
	public Long getOutUnitId() {
		return this.outUnitId;
	}

	public void setOutUnitId(Long outUnitId) {
		this.outUnitId = outUnitId;
	}


	@Column(name="OUT_UNIT_NAME")
	public String getOutUnitName() {
		return this.outUnitName;
	}

	public void setOutUnitName(String outUnitName) {
		this.outUnitName = outUnitName;
	}


	@Column(name="PICK_RULE")
	public Integer getPickRule() {
		return this.pickRule;
	}

	public void setPickRule(Integer pickRule) {
		this.pickRule = pickRule;
	}


	@Column(name="PRE_ALLOT_RULE")
	public Integer getPreAllotRule() {
		return this.preAllotRule;
	}

	public void setPreAllotRule(Integer preAllotRule) {
		this.preAllotRule = preAllotRule;
	}


	@Column(name="PRICE")
	public Double getPrice() {
		return this.price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}


	@Column(name="PRINT_UNIT_ID")
	public Integer getPrintUnitId() {
		return this.printUnitId;
	}

	public void setPrintUnitId(Integer printUnitId) {
		this.printUnitId = printUnitId;
	}


	@Column(name="PRINT_UNIT_NAME")
	public String getPrintUnitName() {
		return this.printUnitName;
	}

	public void setPrintUnitName(String printUnitName) {
		this.printUnitName = printUnitName;
	}


	@Column(name="REMARK")
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	@Column(name="STOCK_MAX")
	public Double getStockMax() {
		return this.stockMax;
	}

	public void setStockMax(Double stockMax) {
		this.stockMax = stockMax;
	}


	@Column(name="STOCK_MIN")
	public Double getStockMin() {
		return this.stockMin;
	}

	public void setStockMin(Double stockMin) {
		this.stockMin = stockMin;
	}


	@Column(name="TEMPERATURE_MAX")
	public Double getTemperatureMax() {
		return this.temperatureMax;
	}

	public void setTemperatureMax(Double temperatureMax) {
		this.temperatureMax = temperatureMax;
	}


	@Column(name="TEMPERATURE_MIN")
	public Double getTemperatureMin() {
		return this.temperatureMin;
	}

	public void setTemperatureMin(Double temperatureMin) {
		this.temperatureMin = temperatureMin;
	}
	
	@Column(name="APPEND_NUM")
	public Double getAppendNum() {
		return this.appendNum;
	}

	public void setAppendNum(Double appendNum) {
		this.appendNum = appendNum;
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
	
	
	@Column(name="MEASURE")
	public Double getMeasure() {
		return measure;
	}


	public void setMeasure(Double measure) {
		this.measure = measure;
	}

	@Column(name="M_UNIT")
	public String getmUnit() {
		return mUnit;
	}


	public void setmUnit(String mUnit) {
		this.mUnit = mUnit;
	}

	@Column(name="M_UNIT_ID")
	public Integer getmUnitId() {
		return mUnitId;
	}


	public void setmUnitId(Integer mUnitId) {
		this.mUnitId = mUnitId;
	}

	@Column(name="SPECIFICATION")
	public String getSpecification() {
		return this.specification;
	}

	public void setSpecification(String specification) {
		this.specification = specification;
	}
	
	@Column(name="CHARGE_TYPE")
	public Byte getChargeType() {
		return this.chargeType;
	}

	public void setChargeType(Byte chargeType) {
		this.chargeType = chargeType;
	}

	@Column(name="WAREHOUSE_ID")
	public Long getWarehouseId() {
		return warehouseId;
	}


	public void setWarehouseId(Long warehouseId) {
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

	@Column(name="NUM_UNIT_ID")
	public Long getNumUnitId() {
		return numUnitId;
	}

	
	public void setNumUnitId(Long numUnitId) {
		this.numUnitId = numUnitId;
	}

	@Column(name="NUM_UNIT_NAME")
	public String getNumUnitName() {
		return numUnitName;
	}


	public void setNumUnitName(String numUnitName) {
		this.numUnitName = numUnitName;
	}

	@Column(name="W_UNIT_ID")
	public Long getWUnitId() {
		return wUnitId;
	}


	public void setWUnitId(Long wUnitId) {
		this.wUnitId = wUnitId;
	}

	@Column(name="W_UNIT_NAME")
	public String getWeightUnitName() {
		return wUnitName;
	}


	public void setWeightUnitName(String wUnitName) {
		this.wUnitName = wUnitName;
	}

	@Column(name="L_UNIT_ID")
	public Long getLUnitId() {
		return lUnitId;
	}


	public void setLUnitId(Long lUnitId) {
		this.lUnitId = lUnitId;
	}

	@Column(name="L_UNIT_NAME")
	public String getLUnitName() {
		return lUnitName;
	}


	public void setLUnitName(String lUnitName) {
		this.lUnitName = lUnitName;
	}

	@Column(name="CARGO_TYPE")
	public String getCargoType() {
		return cargoType;
	}


	public void setCargoType(String cargoType) {
		this.cargoType = cargoType;
	}

	@Column(name="PACKAGE_ID")
	public Integer getPackageId() {
		return packageId;
	}


	public void setPackageId(Integer packageId) {
		this.packageId = packageId;
	}

	@Column(name="PACKAGE_NAME")
	public String getPackageName() {
		return packageName;
	}


	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	@Column(name="PACKAGE_EN")
	public String getPackageEn() {
		return packageEn;
	}


	public void setPackageEn(String packageEn) {
		this.packageEn = packageEn;
	}

	@Column(name="PACKAGE_CH")
	public String getPackageCh() {
		return packageCh;
	}


	public void setPackageCh(String packageCh) {
		this.packageCh = packageCh;
	}

	@Column(name="P1_UNIT_ID")
	public Integer getP1UnitId() {
		return p1UnitId;
	}

	public void setP1UnitId(Integer p1UnitId) {
		this.p1UnitId = p1UnitId;
	}

	@Column(name="P1_UNIT_NAME")
	public String getP1UnitName() {
		return p1UnitName;
	}

	public void setP1UnitName(String p1UnitName) {
		this.p1UnitName = p1UnitName;
	}

	@Column(name="P1_QUANTITY")
	public Double getP1Quantity() {
		return p1Quantity;
	}

	public void setP1Quantity(Double p1Quantity) {
		this.p1Quantity = p1Quantity;
	}

	@Column(name="P1_L")
	public Double getP1L() {
		return p1L;
	}

	public void setP1L(Double p1l) {
		p1L = p1l;
	}

	@Column(name="P1_W")
	public Double getP1W() {
		return p1W;
	}

	public void setP1W(Double p1w) {
		p1W = p1w;
	}

	@Column(name="P1_H")
	public Double getP1H() {
		return p1H;
	}

	public void setP1H(Double p1h) {
		p1H = p1h;
	}

	@Column(name="P1_GW")
	public Double getP1GW() {
		return p1GW;
	}

	public void setP1GW(Double p1gw) {
		p1GW = p1gw;
	}

	@Column(name="P1_NW")
	public Double getP1NW() {
		return p1NW;
	}

	public void setP1NW(Double p1nw) {
		p1NW = p1nw;
	}

	@Column(name="P1_V")
	public Double getP1V() {
		return p1V;
	}

	public void setP1V(Double p1v) {
		p1V = p1v;
	}

	@Column(name="P2_UNIT_ID")
	public Integer getP2UnitId() {
		return p2UnitId;
	}

	public void setP2UnitId(Integer p2UnitId) {
		this.p2UnitId = p2UnitId;
	}

	@Column(name="P2_UNIT_NAME")
	public String getP2UnitName() {
		return p2UnitName;
	}

	public void setP2UnitName(String p2UnitName) {
		this.p2UnitName = p2UnitName;
	}

	@Column(name="P2_QUANTITY")
	public Double getP2Quantity() {
		return p2Quantity;
	}

	public void setP2Quantity(Double p2Quantity) {
		this.p2Quantity = p2Quantity;
	}

	@Column(name="P2_L")
	public Double getP2L() {
		return p2L;
	}

	public void setP2L(Double p2l) {
		p2L = p2l;
	}

	@Column(name="P2_W")
	public Double getP2W() {
		return p2W;
	}

	public void setP2W(Double p2w) {
		p2W = p2w;
	}

	@Column(name="P2_H")
	public Double getP2H() {
		return p2H;
	}

	public void setP2H(Double p2h) {
		p2H = p2h;
	}

	@Column(name="P2_GW")
	public Double getP2GW() {
		return p2GW;
	}

	public void setP2GW(Double p2gw) {
		p2GW = p2gw;
	}

	@Column(name="P2_NW")
	public Double getP2NW() {
		return p2NW;
	}

	public void setP2NW(Double p2nw) {
		p2NW = p2nw;
	}

	@Column(name="P2_V")
	public Double getP2V() {
		return p2V;
	}

	public void setP2V(Double p2v) {
		p2V = p2v;
	}

	@Column(name="P3_UNIT_ID")
	public Integer getP3UnitId() {
		return p3UnitId;
	}

	public void setP3UnitId(Integer p3UnitId) {
		this.p3UnitId = p3UnitId;
	}

	@Column(name="P3_UNIT_NAME")
	public String getP3UnitName() {
		return p3UnitName;
	}

	public void setP3UnitName(String p3UnitName) {
		this.p3UnitName = p3UnitName;
	}

	@Column(name="P3_QUANTITY")
	public Double getP3Quantity() {
		return p3Quantity;
	}

	public void setP3Quantity(Double p3Quantity) {
		this.p3Quantity = p3Quantity;
	}

	@Column(name="P3_L")
	public Double getP3L() {
		return p3L;
	}

	public void setP3L(Double p3l) {
		p3L = p3l;
	}

	@Column(name="P3_W")
	public Double getP3W() {
		return p3W;
	}

	public void setP3W(Double p3w) {
		p3W = p3w;
	}

	@Column(name="P3_H")
	public Double getP3H() {
		return p3H;
	}

	public void setP3H(Double p3h) {
		p3H = p3h;
	}

	@Column(name="P3_GW")
	public Double getP3GW() {
		return p3GW;
	}

	public void setP3GW(Double p3gw) {
		p3GW = p3gw;
	}

	@Column(name="P3_NW")
	public Double getP3NW() {
		return p3NW;
	}

	public void setP3NW(Double p3nw) {
		p3NW = p3nw;
	}

	@Column(name="P3_V")
	public Double getP3V() {
		return p3V;
	}

	public void setP3V(Double p3v) {
		p3V = p3v;
	}

	@Column(name="P4_UNIT_ID")
	public Integer getP4UnitId() {
		return p4UnitId;
	}

	public void setP4UnitId(Integer p4UnitId) {
		this.p4UnitId = p4UnitId;
	}

	@Column(name="P4_UNIT_NAME")
	public String getP4UnitName() {
		return p4UnitName;
	}

	public void setP4UnitName(String p4UnitName) {
		this.p4UnitName = p4UnitName;
	}

	@Column(name="P4_QUANTITY")
	public Double getP4Quantity() {
		return p4Quantity;
	}

	public void setP4Quantity(Double p4Quantity) {
		this.p4Quantity = p4Quantity;
	}

	@Column(name="P4_L")
	public Double getP4L() {
		return p4L;
	}

	public void setP4L(Double p4l) {
		p4L = p4l;
	}

	@Column(name="P4_W")
	public Double getP4W() {
		return p4W;
	}

	public void setP4W(Double p4w) {
		p4W = p4w;
	}

	@Column(name="P4_H")
	public Double getP4H() {
		return p4H;
	}

	public void setP4H(Double p4h) {
		p4H = p4h;
	}

	@Column(name="P4_GW")
	public Double getP4GW() {
		return p4GW;
	}

	public void setP4GW(Double p4gw) {
		p4GW = p4gw;
	}

	@Column(name="P4_NW")
	public Double getP4NW() {
		return p4NW;
	}

	public void setP4NW(Double p4nw) {
		p4NW = p4nw;
	}

	@Column(name="P4_V")
	public Double getP4V() {
		return p4V;
	}

	public void setP4V(Double p4v) {
		p4V = p4v;
	}

	@Column(name="IN_UNIT_VALUE")
	public Integer getInUnitValue() {
		return inUnitValue;
	}

	public void setInUnitValue(Integer inUnitValue) {
		this.inUnitValue = inUnitValue;
	}

	@Column(name="OUT_UNIT_VALUE")
	public Integer getOutUnitValue() {
		return outUnitValue;
	}

	public void setOutUnitValue(Integer outUnitValue) {
		this.outUnitValue = outUnitValue;
	}

	
	

}