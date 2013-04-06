package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.math.BigDecimal;

/**
 * The persistent class for the t_cargo database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="T_CARGO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TCargo extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	//派车单ID
	private Integer transTaskId;
	//派车单号
	private String transTaskNo;
	//托运单中货物ID
	private Integer consCargoId;
	//陆运ID
	private Integer consId;
	//陆运单号
	private String consNo;
	//手工单号
	private String consNoHandler;
	//收获地址
	private String deliveryAddress;
	//收货省ID
	private Integer deliveryPlaceId;
	//收货省
	private String deliveryPlaceName;
	//收货城市ID
	private Integer deliveryCityId;
	//收货城市
	private String deliveryCity;
	//收获单位ID
	private Integer consigneeId;
	//收获单位
	private String consigneeName;
	//收货联系人
	private String consigneeContact;
	//收货联系人电话
	private String consigneeTel;
	//装货地址
	private String loadAddress;
	//装货联系人
	private String loadContact;
	//装货工厂（发货人）
	private String loadFactory;
	//装货省ID
	private Integer loadPlaceId;
	//装货省ID
	private String loadPlaceName;
	//电话
	private String loadTel;
	//包装种类
	private String packName;
	//件数
	private Integer packages;
	//毛重
	private BigDecimal grossWeight;
	//尺寸 体积
	private BigDecimal measurement;
	//派车后到货件数
	private Integer packageArrival;
	//派车后到货件数 毛重
	private BigDecimal grossWeightArrival;
	//派车后到货件数 体积
	private BigDecimal measurementArrival;
	//派车后到货缺少件数
	private Integer packagesLack;
	//派车后到货缺少件数 毛重
	private BigDecimal grossWeightLack;
	//派车后到货缺少件数 体积
	private BigDecimal measurementLack;
	
	//委托件数
	private Integer consPackages;
	//委托毛重
	private BigDecimal consGrossWeight;
	//委托体积
	private BigDecimal consMeasurement;
	
	//备注
	private String remarks;
	//货物分类
	private String cargoClassName;
	//货物分类ID
	private Integer cargoClassId;
	//货物名称
	private String cargoName;
	//保险价值
	private BigDecimal premiumValue;
	//保险费
	private BigDecimal premiumExpense;
	//保险费率
	private BigDecimal premiumRate;
	//供应商 毛重
	private BigDecimal grossWeightProvider;
	//供应商 尺寸
	private BigDecimal measurementProvider;
	//‘客户签收状态’ 0未签收，1已签收
	private Integer signInStatus;
	
    public TCargo() { }

	@Column(name="CARGO_NAME")
	public String getCargoName() {
		return this.cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}


	@Column(name="CONS_ID")
	public Integer getConsId() {
		return this.consId;
	}

	public void setConsId(Integer consId) {
		this.consId = consId;
	}

	@Column(name="CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Column(name="DELIVERY_ADDRESS")
	public String getDeliveryAddress() {
		return this.deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}


	@Column(name="DELIVERY_PLACE_ID")
	public Integer getDeliveryPlaceId() {
		return this.deliveryPlaceId;
	}

	public void setDeliveryPlaceId(Integer deliveryPlaceId) {
		this.deliveryPlaceId = deliveryPlaceId;
	}


	@Column(name="DELIVERY_PLACE_NAME")
	public String getDeliveryPlaceName() {
		return this.deliveryPlaceName;
	}

	public void setDeliveryPlaceName(String deliveryPlaceName) {
		this.deliveryPlaceName = deliveryPlaceName;
	}


	@Column(name="GROSS_WEIGHT")
	public BigDecimal getGrossWeight() {
		return this.grossWeight;
	}

	public void setGrossWeight(BigDecimal grossWeight) {
		this.grossWeight = grossWeight;
	}


	@Column(name="LOAD_ADDRESS")
	public String getLoadAddress() {
		return this.loadAddress;
	}

	public void setLoadAddress(String loadAddress) {
		this.loadAddress = loadAddress;
	}


	@Column(name="LOAD_CONTACT")
	public String getLoadContact() {
		return this.loadContact;
	}

	public void setLoadContact(String loadContact) {
		this.loadContact = loadContact;
	}


	@Column(name="LOAD_FACTORY")
	public String getLoadFactory() {
		return this.loadFactory;
	}

	public void setLoadFactory(String loadFactory) {
		this.loadFactory = loadFactory;
	}


	@Column(name="LOAD_PLACE_ID")
	public Integer getLoadPlaceId() {
		return this.loadPlaceId;
	}

	public void setLoadPlaceId(Integer loadPlaceId) {
		this.loadPlaceId = loadPlaceId;
	}


	@Column(name="LOAD_PLACE_NAME")
	public String getLoadPlaceName() {
		return this.loadPlaceName;
	}

	public void setLoadPlaceName(String loadPlaceName) {
		this.loadPlaceName = loadPlaceName;
	}


	@Column(name="LOAD_TEL")
	public String getLoadTel() {
		return this.loadTel;
	}

	public void setLoadTel(String loadTel) {
		this.loadTel = loadTel;
	}


	@Column(name="MEASUREMENT")
	public BigDecimal getMeasurement() {
		return this.measurement;
	}

	public void setMeasurement(BigDecimal measurement) {
		this.measurement = measurement;
	}


	@Column(name="PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}


	@Column(name="PACKAGES")
	public Integer getPackages() {
		return this.packages;
	}

	public void setPackages(Integer packages) {
		this.packages = packages;
	}

	@Column(name="REMARKS")
	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}


	@Column(name="TRANS_TASK_ID")
	public Integer getTransTaskId() {
		return this.transTaskId;
	}

	public void setTransTaskId(Integer transTaskId) {
		this.transTaskId = transTaskId;
	}

	@Column(name="CONSIGNEE_ID")
	public Integer getConsigneeId() {
		return this.consigneeId;
	}


	public void setConsigneeId(Integer consigneeId) {
		this.consigneeId = consigneeId;
	}

	@Column(name="CONSIGNEE_NAME")
	public String getConsigneeName() {
		return this.consigneeName;
	}


	public void setConsigneeName(String consigneeName) {
		this.consigneeName = consigneeName;
	}

	@Column(name="CONSIGNEE_CONTACT")
	public String getConsigneeContact() {
		return this.consigneeContact;
	}


	public void setConsigneeContact(String consigneeContact) {
		this.consigneeContact = consigneeContact;
	}

	@Column(name="CONSIGNEE_TEL")
	public String getConsigneeTel() {
		return this.consigneeTel;
	}


	public void setConsigneeTel(String consigneeTel) {
		this.consigneeTel = consigneeTel;
	}
	
	@Column(name="DELIVERY_CITY_ID")
	public Integer getDeliveryCityId() {
		return this.deliveryCityId;
	}

	public void setDeliveryCityId(Integer deliveryCityId) {
		this.deliveryCityId = deliveryCityId;
	}

	@Column(name="DELIVERY_CITY")
	public String getDeliveryCity() {
		return this.deliveryCity;
	}

	public void setDeliveryCity(String deliveryCity) {
		this.deliveryCity = deliveryCity;
	}
	
	@Column(name="CONS_CARGO_ID")
	public Integer getConsCargoId() {
		return this.consCargoId;
	}
	
	public void setConsCargoId(Integer consCargoId) {
		this.consCargoId = consCargoId;
	}
	
	@Column(name="CARGO_CLASS_NAME")
	public String getCargoClassName() {
		return this.cargoClassName;
	}

	public void setCargoClassName(String cargoClassName) {
		this.cargoClassName = cargoClassName;
	}

	@Column(name="CARGO_CALSS_ID")
	public Integer getCargoClassId() {
		return this.cargoClassId;
	}

	public void setCargoClassId(Integer cargoClassId) {
		this.cargoClassId = cargoClassId;
	}

	@Column(name="PREMIUM_VALUE")
	public BigDecimal getPremiumValue() {
		return this.premiumValue;
	}

	public void setPremiumValue(BigDecimal premiumValue) {
		this.premiumValue = premiumValue;
	}

	@Column(name="PREMIUM_EXPENSE")
	public BigDecimal getPremiumExpense() {
		return this.premiumExpense;
	}

	public void setPremiumExpense(BigDecimal premiumExpense) {
		this.premiumExpense = premiumExpense;
	}

	@Column(name="PREMIUM_RATE")
	public BigDecimal getPremiumRate() {
		return this.premiumRate;
	}

	public void setPremiumRate(BigDecimal premiumRate) {
		this.premiumRate = premiumRate;
	}

	@Column(name="GROSS_WEIGHT_PROVIDER")
	public BigDecimal getGrossWeightProvider() {
		return grossWeightProvider;
	}

	public void setGrossWeightProvider(BigDecimal grossWeightProvider) {
		this.grossWeightProvider = grossWeightProvider;
	}

	@Column(name="MEASUREMENT_PROVIDER")
	public BigDecimal getMeasurementProvider() {
		return measurementProvider;
	}

	public void setMeasurementProvider(BigDecimal measurementProvider) {
		this.measurementProvider = measurementProvider;
	}

	@Column(name="CONS_NO_HANDLER")
	public String getConsNoHandler() {
    	return consNoHandler;
    }

	public void setConsNoHandler(String consNoHandler) {
    	this.consNoHandler = consNoHandler;
    }

	@Column(name="PACKAGES_ARRIVAL")
	public Integer getPackageArrival() {
    	return packageArrival;
    }


	public void setPackageArrival(Integer packageArrival) {
    	this.packageArrival = packageArrival;
    }

	@Column(name="GROSS_WEIGHT_ARRIVAL")
	public BigDecimal getGrossWeightArrival() {
    	return grossWeightArrival;
    }


	public void setGrossWeightArrival(BigDecimal grossWeightArrival) {
    	this.grossWeightArrival = grossWeightArrival;
    }

	@Column(name="MEASUREMENT_ARRIVAL")
	public BigDecimal getMeasurementArrival() {
    	return measurementArrival;
    }

	public void setMeasurementArrival(BigDecimal measurementArrival) {
    	this.measurementArrival = measurementArrival;
    }

	@Column(name="SIGN_IN_STATUS")
	public Integer getSignInStatus() {
    	return signInStatus;
    }

	public void setSignInStatus(Integer signInStatus) {
    	this.signInStatus = signInStatus;
    }
	
	@Column(name="PACKAGES_LACK")
	public Integer getPackagesLack() {
    	return packagesLack;
    }

	public void setPackagesLack(Integer packagesLack) {
    	this.packagesLack = packagesLack;
    }

	@Column(name="GROSS_WEIGHT_LACK")
	public BigDecimal getGrossWeightLack() {
    	return grossWeightLack;
    }

	public void setGrossWeightLack(BigDecimal grossWeightLack) {
    	this.grossWeightLack = grossWeightLack;
    }

	@Column(name="MEASUREMENT_LACK")
	public BigDecimal getMeasurementLack() {
    	return measurementLack;
    }

	public void setMeasurementLack(BigDecimal measurementLack) {
    	this.measurementLack = measurementLack;
    }

	@Column(name="TRANS_TASK_NO")
	public String getTransTaskNo() {
    	return transTaskNo;
    }

	public void setTransTaskNo(String taskNo) {
    	this.transTaskNo = taskNo;
    }

	@Column(name="CONS_PACKAGES")
	public Integer getConsPackages() {
    	return consPackages;
    }

	public void setConsPackages(Integer consPackages) {
    	this.consPackages = consPackages;
    }

	@Column(name="CONS_GROSS_WEIGHT")
	public BigDecimal getConsGrossWeight() {
    	return consGrossWeight;
    }

	public void setConsGrossWeight(BigDecimal consGrossWeight) {
    	this.consGrossWeight = consGrossWeight;
    }

	@Column(name="CONS_MEASUREMENT")
	public BigDecimal getConsMeasurement() {
    	return consMeasurement;
    }

	public void setConsMeasurement(BigDecimal consMeasurement) {
    	this.consMeasurement = consMeasurement;
    }
	
}