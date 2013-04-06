package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;


/**
 * The persistent class for the w_operation_list database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_OPERATION_LIST")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WOperationList extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private String skuNo;
	private Integer cargoId;
	private String cargoName;
	private String contractNo;
	private Double feeAmount;
	private Double grossWeight;
	private Double measurement;
	private Double netWeight;
	private Double operationFeeRate;
	private Integer operationFormId;
	private Double operationHours;
	private Double operationQuantity;
	private Integer operationTypeId;
	private String operationTypeName;
	private Integer operationUnitId;
	private String operationUnitName;
	private String operatorTypeCode;
	private Double quantity;
	private Byte status;
	private Integer unitId;
	private String unitName;
	private Integer vendorId;
	private String vendorName;
	private Integer wUnitId;
	private String wUnitName;

    public WOperationList() {
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

	@Column(name="CONTRACT_NO")
	public String getContractNo() {
		return this.contractNo;
	}

	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}


	@Column(name="FEE_AMOUNT")
	public Double getFeeAmount() {
		return this.feeAmount;
	}

	public void setFeeAmount(Double feeAmount) {
		this.feeAmount = feeAmount;
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


	@Column(name="OPERATION_FEE_RATE")
	public Double getOperationFeeRate() {
		return this.operationFeeRate;
	}

	public void setOperationFeeRate(Double operationFeeRate) {
		this.operationFeeRate = operationFeeRate;
	}


	@Column(name="OPERATION_FORM_ID")
	public Integer getOperationFormId() {
		return this.operationFormId;
	}

	public void setOperationFormId(Integer operationFormId) {
		this.operationFormId = operationFormId;
	}


	@Column(name="OPERATION_HOURS")
	public Double getOperationHours() {
		return this.operationHours;
	}

	public void setOperationHours(Double operationHours) {
		this.operationHours = operationHours;
	}


	@Column(name="OPERATION_QUANTITY")
	public Double getOperationQuantity() {
		return this.operationQuantity;
	}

	public void setOperationQuantity(Double operationQuantity) {
		this.operationQuantity = operationQuantity;
	}


	@Column(name="OPERATION_TYPE_ID")
	public Integer getOperationTypeId() {
		return this.operationTypeId;
	}

	public void setOperationTypeId(Integer operationTypeId) {
		this.operationTypeId = operationTypeId;
	}


	@Column(name="OPERATION_TYPE_NAME")
	public String getOperationTypeName() {
		return this.operationTypeName;
	}

	public void setOperationTypeName(String operationTypeName) {
		this.operationTypeName = operationTypeName;
	}


	@Column(name="OPERATION_UNIT_ID")
	public Integer getOperationUnitId() {
		return this.operationUnitId;
	}

	public void setOperationUnitId(Integer operationUnitId) {
		this.operationUnitId = operationUnitId;
	}


	@Column(name="OPERATION_UNIT_NAME")
	public String getOperationUnitName() {
		return this.operationUnitName;
	}

	public void setOperationUnitName(String operationUnitName) {
		this.operationUnitName = operationUnitName;
	}


	@Column(name="OPERATOR_TYPE_CODE")
	public String getOperatorTypeCode() {
		return this.operatorTypeCode;
	}

	public void setOperatorTypeCode(String operatorTypeCode) {
		this.operatorTypeCode = operatorTypeCode;
	}


	@Column(name="QUANTITY")
	public Double getQuantity() {
		return this.quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}


	@Column(name="STATUS")
	public Byte getStatus() {
		return this.status;
	}

	public void setStatus(Byte status) {
		this.status = status;
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


	@Column(name="VENDOR_ID")
	public Integer getVendorId() {
		return this.vendorId;
	}

	public void setVendorId(Integer vendorId) {
		this.vendorId = vendorId;
	}


	@Column(name="VENDOR_NAME")
	public String getVendorName() {
		return this.vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}


	@Column(name="W_UNIT_ID")
	public Integer getWUnitId() {
		return this.wUnitId;
	}

	public void setWUnitId(Integer wUnitId) {
		this.wUnitId = wUnitId;
	}


	@Column(name="W_UNIT_NAME")
	public String getWUnitName() {
		return this.wUnitName;
	}

	public void setWUnitName(String wUnitName) {
		this.wUnitName = wUnitName;
	}

}