package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.math.BigDecimal;
import java.util.Date;

/**
 * The persistent class for the t_cargo database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "T_CARGO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TCargo extends com.hitisoft.fw.orm.jpa.BaseDomain implements
		Serializable {
	private static final long serialVersionUID = 1L;
	private String cargoName;
	private Integer consId;
	private String consNo;
	private Integer consCargoId;
	private String deliveryAddress;
	private Integer deliveryPlaceId;
	private String deliveryPlaceName;
	private Integer deliveryCityId;
	private String deliveryCity;
	private Integer consigneeId;
	private String consigneeName;
	private String consigneeContact;
	private String consigneeTel;
	private String loadAddress;
	private String loadContact;
	private String loadFactory;
	private Integer loadPlaceId;
	private String loadPlaceName;
	private String loadTel;
	private String packName;
	private String remarks;
	private Integer transTaskId;
	private BigDecimal measurement;
	private String cargoClassName;
	private Integer cargoClassId;
	private BigDecimal premiumValue;
	private BigDecimal premiumExpense;
	private BigDecimal premiumRate;
	private BigDecimal grossWeightProvider;
	private BigDecimal measurementProvider;
	private Integer cargoStatus;
	// 净重
	private BigDecimal netWeightProvider;

	// 件数合计
	private Integer packages;
	// 毛重合计
	private BigDecimal grossWeight;
	// 体积合计
	private BigDecimal volume;
	
	private String distrAddress;
	private Date deliveryTime;
	
	public TCargo() {
	}
	
	@Column(name = "DISTR_ADDRESS")
	public String getDistrAddress() {
		return this.distrAddress;
	}

	public void setDistrAddress(String distrAddress) {
		this.distrAddress = distrAddress;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "DELIVERY_TIME")
	public Date getDeliveryTime() {
		return this.deliveryTime;
	}

	public void setDeliveryTime(Date deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	@Column(name = "PACKAGES")
	public Integer getPackages() {
		return this.packages;
	}

	public void setPackages(Integer packages) {
		this.packages = packages;
	}

	@Column(name = "GROSS_WEIGHT")
	public BigDecimal getGrossWeight() {
		return this.grossWeight;
	}

	public void setGrossWeight(BigDecimal grossWeight) {
		this.grossWeight = grossWeight;
	}

	@Column(name = "MEASUREMENT")
	public BigDecimal getMeasurement() {
		return this.measurement;
	}

	public void setMeasurement(BigDecimal measurement) {
		this.measurement = measurement;
	}

	@Column(name = "VOLUME")
	public BigDecimal getVolume() {
		return this.volume;
	}

	public void setVolume(BigDecimal volume) {
		this.volume = volume;
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

	@Column(name = "CONS_ID")
	public Integer getConsId() {
		return this.consId;
	}

	public void setConsId(Integer consId) {
		this.consId = consId;
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

	@Column(name = "REMARKS")
	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Column(name = "TRANS_TASK_ID")
	public Integer getTransTaskId() {
		return this.transTaskId;
	}

	public void setTransTaskId(Integer transTaskId) {
		this.transTaskId = transTaskId;
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

	@Column(name = "CONS_CARGO_ID")
	public Integer getConsCargoId() {
		return this.consCargoId;
	}

	public void setConsCargoId(Integer consCargoId) {
		this.consCargoId = consCargoId;
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

	@Column(name = "CARGO_STATUS")
	public Integer getCargoStatus() {
		return cargoStatus;
	}

	public void setCargoStatus(Integer cargoStatus) {
		this.cargoStatus = cargoStatus;
	}

}