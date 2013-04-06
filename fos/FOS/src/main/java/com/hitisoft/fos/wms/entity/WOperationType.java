package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;


/**
 * The persistent class for the w_operation_type database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_OPERATION_TYPE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WOperationType extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private Double feeRate;
	private String operationTypeCode;
	private String operationTypeName;
	private Integer unitId;
	private String unitName;

    public WOperationType() {
    }


	@Column(name="FEE_RATE")
	public Double getFeeRate() {
		return this.feeRate;
	}

	public void setFeeRate(Double feeRate) {
		this.feeRate = feeRate;
	}


	@Column(name="OPERATION_TYPE_CODE")
	public String getOperationTypeCode() {
		return this.operationTypeCode;
	}

	public void setOperationTypeCode(String operationTypeCode) {
		this.operationTypeCode = operationTypeCode;
	}


	@Column(name="OPERATION_TYPE_NAME")
	public String getOperationTypeName() {
		return this.operationTypeName;
	}

	public void setOperationTypeName(String operationTypeName) {
		this.operationTypeName = operationTypeName;
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

}