package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.util.Date;


/**
 * The persistent class for the w_operation_form database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_OPERATION_FORM")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WOperationForm extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private String checkComments;
	private Date checkTime;
	private Long checkerId;
	private String checkerName;
	private Long custId;
	private String custName;
	private Date operationDate;
	private String operationNo;
	private Integer operationType;
	private String remarks;
	private Byte status;
	private String storageNoteNo;
	private Long warehouseId;
	private String warehouseName;

    public WOperationForm() {
    }


	@Column(name="CHECK_COMMENTS")
	public String getCheckComments() {
		return this.checkComments;
	}

	public void setCheckComments(String checkComments) {
		this.checkComments = checkComments;
	}


    @Temporal( TemporalType.TIMESTAMP)
	@Column(name="CHECK_TIME")
	public Date getCheckTime() {
		return this.checkTime;
	}

	public void setCheckTime(Date checkTime) {
		this.checkTime = checkTime;
	}


	@Column(name="CHECKER_ID")
	public Long getCheckerId() {
		return this.checkerId;
	}

	public void setCheckerId(Long checkerId) {
		this.checkerId = checkerId;
	}


	@Column(name="CHECKER_NAME")
	public String getCheckerName() {
		return this.checkerName;
	}

	public void setCheckerName(String checkerName) {
		this.checkerName = checkerName;
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


    @Temporal( TemporalType.DATE)
	@Column(name="OPERATION_DATE")
	public Date getOperationDate() {
		return this.operationDate;
	}

	public void setOperationDate(Date operationDate) {
		this.operationDate = operationDate;
	}


	@Column(name="OPERATION_NO")
	public String getOperationNo() {
		return this.operationNo;
	}

	public void setOperationNo(String operationNo) {
		this.operationNo = operationNo;
	}


	@Column(name="OPERATION_TYPE")
	public Integer getOperationType() {
		return this.operationType;
	}

	public void setOperationType(Integer operationType) {
		this.operationType = operationType;
	}


	@Column(name="REMARKS")
	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}


	@Column(name="STATUS")
	public Byte getStatus() {
		return this.status;
	}

	public void setStatus(Byte status) {
		this.status = status;
	}


	@Column(name="STORAGE_NOTE_NO")
	public String getStorageNoteNo() {
		return this.storageNoteNo;
	}

	public void setStorageNoteNo(String storageNoteNo) {
		this.storageNoteNo = storageNoteNo;
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

}