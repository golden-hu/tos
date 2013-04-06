package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * The persistent class for the t_cargo database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "T_CONTAINER_CARGO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TContainerCargo extends com.hitisoft.fw.orm.jpa.BaseDomain implements
		Serializable {
	private static final long serialVersionUID = 1L;
	private String cargoName;
	private Long consId;
	// 陆运单号
	private String consNo;
	private Long consCargoId;
	private String deliveryAddress;
	private Integer deliveryPlaceId;
	private String deliveryPlaceName;
	private Integer deliveryCityId;
	private String deliveryCity;
	private Integer consigneeId;
	private String consigneeName;
	private String consigneeContact;
	private String consigneeTel;

	private String loadContact;
	private String loadFactory;
	private Integer loadPlaceId;
	private String loadPlaceName;
	private String loadTel;
	private Integer status;
	private String packName;
	private BigDecimal measurement;
	private String remarks;
	private String cargoClassName;
	private Integer cargoClassId;
	private BigDecimal premiumValue;
	private BigDecimal premiumExpense;
	private BigDecimal premiumRate;
	private BigDecimal premiumValueProvider;
	private BigDecimal premiumExpenseProvider;
	private BigDecimal premiumRateProvider;
	private BigDecimal grossWeightProvider;
	private BigDecimal measurementProvider;
	// 订单编号
	private String orderNo;
	// 台数
	private String packagesNo;
	// 出货数量
	private Integer pachagesOut;
	// 包装件数
	private Integer packagesNumber;
	// 虚拟字段
	private String loadAddress;
	private Date consDate;
	private Date loadDate;
	private Date arNewDate;
	private String transportWay;
	private Integer notPachagesOut;
	private String transportPlace;
	// 净重
	private BigDecimal netWeightProvider;
	// 件数合计
	private Integer packages;
	// 已派车数量
	private Integer dispatchPackages;
	// 已发车数量
	private Integer departurePackages;
	// 已到站数量
	private Integer stationPackages;
	// 已签收数量
	private Integer signPackages;
	// 毛重合计
	private BigDecimal grossWeight;
	// 已派车毛重
	private BigDecimal dispatchGrossWeight;
	// 已发车毛重
	private BigDecimal departureGrossWeight;
	// 已到站毛重
	private BigDecimal stationGrossWeight;
	// 已签收毛重
	private BigDecimal signGrossWeight;
	// 体积合计
	private BigDecimal volume;
	// 已派车体积
	private BigDecimal dispatchVolume;
	// 已发车体积
	private BigDecimal departureVolume;
	// 已到站体积
	private BigDecimal stationVolume;
	// 已签收体积
	private BigDecimal signVolume;

	// 未派车数量
	private Integer surplusPackages;
	// 未派车毛重
	private BigDecimal surplusGrossWeight;
	// 未派车体积
	private BigDecimal surplusVolume;

	public TContainerCargo() {

	}

	@Column(name = "CONS_ID")
	public Long getConsId() {
		return consId;
	}

	public void setConsId(Long consId) {
		this.consId = consId;
	}

	@Column(name = "CONS_CARGO_ID")
	public Long getConsCargoId() {
		return consCargoId;
	}

	public void setConsCargoId(Long consCargoId) {
		this.consCargoId = consCargoId;
	}

	@Column(name = "NET_WEIGHT_PROVIDER")
	public BigDecimal getNetWeightProvider() {
		return netWeightProvider;
	}

	public void setNetWeightProvider(BigDecimal netWeightProvider) {
		this.netWeightProvider = netWeightProvider;
	}

	@Column(name = "CARGO_NAME")
	public String getCargoName() {
		return this.cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}

	@Column(name = "CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Column(name = "DELIVERY_ADDRESS")
	public String getDeliveryAddress() {
		return this.deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	@Column(name = "DELIVERY_PLACE_ID")
	public Integer getDeliveryPlaceId() {
		return this.deliveryPlaceId;
	}

	public void setDeliveryPlaceId(Integer deliveryPlaceId) {
		this.deliveryPlaceId = deliveryPlaceId;
	}

	@Column(name = "DELIVERY_PLACE_NAME")
	public String getDeliveryPlaceName() {
		return this.deliveryPlaceName;
	}

	public void setDeliveryPlaceName(String deliveryPlaceName) {
		this.deliveryPlaceName = deliveryPlaceName;
	}

	@Column(name = "LOAD_ADDRESS")
	public String getLoadAddress() {
		return this.loadAddress;
	}

	public void setLoadAddress(String loadAddress) {
		this.loadAddress = loadAddress;
	}

	@Column(name = "LOAD_CONTACT")
	public String getLoadContact() {
		return this.loadContact;
	}

	public void setLoadContact(String loadContact) {
		this.loadContact = loadContact;
	}

	@Column(name = "LOAD_FACTORY")
	public String getLoadFactory() {
		return this.loadFactory;
	}

	public void setLoadFactory(String loadFactory) {
		this.loadFactory = loadFactory;
	}

	@Column(name = "LOAD_PLACE_ID")
	public Integer getLoadPlaceId() {
		return this.loadPlaceId;
	}

	public void setLoadPlaceId(Integer loadPlaceId) {
		this.loadPlaceId = loadPlaceId;
	}

	@Column(name = "LOAD_PLACE_NAME")
	public String getLoadPlaceName() {
		return this.loadPlaceName;
	}

	public void setLoadPlaceName(String loadPlaceName) {
		this.loadPlaceName = loadPlaceName;
	}

	@Column(name = "LOAD_TEL")
	public String getLoadTel() {
		return this.loadTel;
	}

	public void setLoadTel(String loadTel) {
		this.loadTel = loadTel;
	}

	@Column(name = "PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}

	@Column(name = "PACKAGES")
	public Integer getPackages() {
		return this.packages;
	}

	public void setPackages(Integer packages) {
		this.packages = packages;
	}

	@Column(name = "DISPATCH_PACKAGES")
	public Integer getDispatchPackages() {
		return this.dispatchPackages;
	}

	public void setDispatchPackages(Integer dispatchPackages) {
		this.dispatchPackages = dispatchPackages;
	}

	@Column(name = "DEPARTURE_PACKAGES")
	public Integer getDeparturePackages() {
		return this.departurePackages;
	}

	public void setDeparturePackages(Integer departurePackages) {
		this.departurePackages = departurePackages;
	}

	@Column(name = "STATION_PACKAGES")
	public Integer getStationPackages() {
		return this.stationPackages;
	}

	public void setStationPackages(Integer stationPackages) {
		this.stationPackages = stationPackages;
	}

	@Column(name = "SIGN_PACKAGES")
	public Integer getSignPackages() {
		return this.signPackages;
	}

	public void setSignPackages(Integer signPackages) {
		this.signPackages = signPackages;
	}

	@Column(name = "GROSS_WEIGHT")
	public BigDecimal getGrossWeight() {
		return this.grossWeight;
	}

	public void setGrossWeight(BigDecimal grossWeight) {
		this.grossWeight = grossWeight;
	}

	@Column(name = "DISPATCH_GROSS_WEIGHT")
	public BigDecimal getDispatchGrossWeight() {
		return this.dispatchGrossWeight;
	}

	public void setDispatchGrossWeight(BigDecimal dispatchGrossWeight) {
		this.dispatchGrossWeight = dispatchGrossWeight;
	}

	@Column(name = "DEPARTURE_GROSS_WEIGHT")
	public BigDecimal getDepartureGrossWeight() {
		return this.departureGrossWeight;
	}

	public void setDepartureGrossWeight(BigDecimal departureGrossWeight) {
		this.departureGrossWeight = departureGrossWeight;
	}

	@Column(name = "STATION_GROSS_WEIGHT")
	public BigDecimal getStationGrossWeight() {
		return this.stationGrossWeight;
	}

	public void setStationGrossWeight(BigDecimal stationGrossWeight) {
		this.stationGrossWeight = stationGrossWeight;
	}

	@Column(name = "SIGN_GROSS_WEIGHT")
	public BigDecimal getSignGrossWeight() {
		return this.signGrossWeight;
	}

	public void setSignGrossWeight(BigDecimal signGrossWeight) {
		this.signGrossWeight = signGrossWeight;
	}

	@Column(name = "VOLUME")
	public BigDecimal getVolume() {
		return this.volume;
	}

	public void setVolume(BigDecimal volume) {
		this.volume = volume;
	}

	@Column(name = "MEASUREMENT")
	public BigDecimal getMeasurement() {
		return this.measurement;
	}

	public void setMeasurement(BigDecimal measurement) {
		this.measurement = measurement;
	}

	@Column(name = "DISPATCH_VOLUME")
	public BigDecimal getDispatchVolume() {
		return this.dispatchVolume;
	}

	public void setDispatchVolume(BigDecimal dispatchVolume) {
		this.dispatchVolume = dispatchVolume;
	}

	@Column(name = "DEPARTURE_VOLUME")
	public BigDecimal getDepartureVolume() {
		return this.departureVolume;
	}

	public void setDepartureVolume(BigDecimal departureVolume) {
		this.departureVolume = departureVolume;
	}

	@Column(name = "STATION_VOLUME")
	public BigDecimal getStationVolume() {
		return this.stationVolume;
	}

	public void setStationVolume(BigDecimal stationVolume) {
		this.stationVolume = stationVolume;
	}

	@Column(name = "SIGN_VOLUME")
	public BigDecimal getSignVolume() {
		return this.signVolume;
	}

	public void setSignVolume(BigDecimal signVolume) {
		this.signVolume = signVolume;
	}

	@Transient
	public Integer getSurplusPackages() {
		return this.surplusPackages;
	}

	public void setSurplusPackages(Integer surplusPackages) {
		this.surplusPackages = surplusPackages;
	}

	@Transient
	public BigDecimal getSurplusGrossWeight() {
		return this.surplusGrossWeight;
	}

	public void setSurplusGrossWeight(BigDecimal surplusGrossWeight) {
		this.surplusGrossWeight = surplusGrossWeight;
	}

	@Transient
	public BigDecimal getSurplusVolume() {
		return this.surplusVolume;
	}

	public void setSurplusVolume(BigDecimal surplusVolume) {
		this.surplusVolume = surplusVolume;
	}

	@Column(name = "REMARKS")
	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Column(name = "DELIVERY_CITY_ID")
	public Integer getDeliveryCityId() {
		return this.deliveryCityId;
	}

	public void setDeliveryCityId(Integer deliveryCityId) {
		this.deliveryCityId = deliveryCityId;
	}

	@Column(name = "DELIVERY_CITY")
	public String getDeliveryCity() {
		return this.deliveryCity;
	}

	public void setDeliveryCity(String deliveryCity) {
		this.deliveryCity = deliveryCity;
	}

	@Column(name = "CONSIGNEE_ID")
	public Integer getConsigneeId() {
		return this.consigneeId;
	}

	public void setConsigneeId(Integer consigneeId) {
		this.consigneeId = consigneeId;
	}

	@Column(name = "CONSIGNEE_NAME")
	public String getConsigneeName() {
		return this.consigneeName;
	}

	public void setConsigneeName(String consigneeName) {
		this.consigneeName = consigneeName;
	}

	@Column(name = "CONSIGNEE_CONTACT")
	public String getConsigneeContact() {
		return this.consigneeContact;
	}

	public void setConsigneeContact(String consigneeContact) {
		this.consigneeContact = consigneeContact;
	}

	@Column(name = "CONSIGNEE_TEL")
	public String getConsigneeTel() {
		return this.consigneeTel;
	}

	public void setConsigneeTel(String consigneeTel) {
		this.consigneeTel = consigneeTel;
	}

	@Column(name = "STATUS")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Column(name = "CARGO_CLASS_NAME")
	public String getCargoClassName() {
		return this.cargoClassName;
	}

	public void setCargoClassName(String cargoClassName) {
		this.cargoClassName = cargoClassName;
	}

	@Column(name = "CARGO_CALSS_ID")
	public Integer getCargoClassId() {
		return this.cargoClassId;
	}

	public void setCargoClassId(Integer cargoClassId) {
		this.cargoClassId = cargoClassId;
	}

	@Column(name = "PREMIUM_VALUE")
	public BigDecimal getPremiumValue() {
		return this.premiumValue;
	}

	public void setPremiumValue(BigDecimal premiumValue) {
		this.premiumValue = premiumValue;
	}

	@Column(name = "PREMIUM_EXPENSE")
	public BigDecimal getPremiumExpense() {
		return this.premiumExpense;
	}

	public void setPremiumExpense(BigDecimal premiumExpense) {
		this.premiumExpense = premiumExpense;
	}

	@Column(name = "PREMIUM_RATE")
	public BigDecimal getPremiumRate() {
		return this.premiumRate;
	}

	public void setPremiumRate(BigDecimal premiumRate) {
		this.premiumRate = premiumRate;
	}

	@Column(name = "GROSS_WEIGHT_PROVIDER")
	public BigDecimal getGrossWeightProvider() {
		return grossWeightProvider;
	}

	public void setGrossWeightProvider(BigDecimal grossWeightProvider) {
		this.grossWeightProvider = grossWeightProvider;
	}

	@Column(name = "MEASUREMENT_PROVIDER")
	public BigDecimal getMeasurementProvider() {
		return measurementProvider;
	}

	public void setMeasurementProvider(BigDecimal measurementProvider) {
		this.measurementProvider = measurementProvider;
	}

	@Column(name = "ORDER_NO")
	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	@Column(name = "PACKAGES_NO")
	public String getPackagesNo() {
		return this.packagesNo;
	}

	public void setPackagesNo(String packagesNo) {
		this.packagesNo = packagesNo;
	}

	@Column(name = "PACKAGES_OUT")
	public Integer getPachagesOut() {
		return this.pachagesOut;
	}

	public void setPachagesOut(Integer pachagesOut) {
		this.pachagesOut = pachagesOut;
	}

	@Temporal(TemporalType.DATE)
	@Transient
	public Date getConsDate() {
		return this.consDate;
	}

	public void setConsDate(Date consDate) {
		this.consDate = consDate;
	}

	@Temporal(TemporalType.DATE)
	@Transient
	public Date getLoadDate() {
		return this.loadDate;
	}

	public void setLoadDate(Date loadDate) {
		this.loadDate = loadDate;
	}

	@Temporal(TemporalType.DATE)
	@Transient
	public Date getArNewDate() {
		return this.arNewDate;
	}

	public void setArNewDate(Date arNewDate) {
		this.arNewDate = arNewDate;
	}

	@Transient
	public String getTransportWay() {
		return this.transportWay;
	}

	public void setTransportWay(String transportWay) {
		this.transportWay = transportWay;
	}

	@Transient
	public Integer getNotPachagesOut() {
		return this.notPachagesOut;
	}

	public void setNotPachagesOut(Integer notPachagesOut) {
		this.notPachagesOut = notPachagesOut;
	}

	@Column(name = "PREMIUM_VALUE_PROVIDER")
	public BigDecimal getPremiumValueProvider() {
		return this.premiumValueProvider;
	}

	public void setPremiumValueProvider(BigDecimal premiumValueProvider) {
		this.premiumValueProvider = premiumValueProvider;
	}

	@Column(name = "PREMIUM_EXPENSE_PROVIDER")
	public BigDecimal getPremiumExpenseProvider() {
		return this.premiumExpenseProvider;
	}

	public void setPremiumExpenseProvider(BigDecimal premiumExpenseProvider) {
		this.premiumExpenseProvider = premiumExpenseProvider;
	}

	@Column(name = "PREMIUM_RATE_PROVIDER")
	public BigDecimal getPremiumRateProvider() {
		return this.premiumRateProvider;
	}

	public void setPremiumRateProvider(BigDecimal premiumRateProvider) {
		this.premiumRateProvider = premiumRateProvider;
	}

	@Column(name = "PACKAGES_NUMBER")
	public Integer getPackagesNumber() {
		return this.packagesNumber;
	}

	public void setPackagesNumber(Integer packagesNumber) {
		this.packagesNumber = packagesNumber;
	}

	@Transient
	public String getTransportPlace() {
		return this.transportPlace;
	}

	public void setTransportPlace(String transportPlace) {
		this.transportPlace = transportPlace;
	}

}