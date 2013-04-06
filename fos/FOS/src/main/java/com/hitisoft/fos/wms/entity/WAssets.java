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
@Table(name="W_ASSETS")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WAssets extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String storageNoteNo;
	private Integer storageNoteId;
	private Integer atClassId;
	private String atClassName;
	private Double quantity;
	private Integer atId;
	private String atCode;
	private String atName;
	private String atBrand;
	private String atSpec;
	private String atType;
	private String atColor;
	
	private Integer custId;
	private String custName;
	
	private Date actureTime;
	private String orderNo;
	private String entrustNo;
	private Integer status;
	

    public WAssets() {
    }

    @Column(name="STORAGE_NOTE_NO")
	public String getStorageNoteNo() {
		return storageNoteNo;
	}


	public void setStorageNoteNo(String storageNoteNo) {
		this.storageNoteNo = storageNoteNo;
	}

	 @Column(name="STORAGE_NOTE_ID")
	public Integer getStorageNoteId() {
		return storageNoteId;
	}


	public void setStorageNoteId(Integer storageNoteId) {
		this.storageNoteId = storageNoteId;
	}

	 @Column(name="AT_CLASS_ID")
	public Integer getAtClassId() {
		return atClassId;
	}


	public void setAtClassId(Integer atClassId) {
		this.atClassId = atClassId;
	}
	
	 @Column(name="AT_CLASS_NAME")
		public String getAtClassName() {
			return atClassName;
		}


		public void setAtClassName(String atClassName) {
			this.atClassName = atClassName;
		}

	 @Column(name="QUANTITY")
	public Double getQuantity() {
		return quantity;
	}


	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	@Column(name="AT_ID")
	public Integer getAtId() {
		return atId;
	}


	public void setAtId(Integer atId) {
		this.atId = atId;
	}

	@Column(name="AT_CODE")
	public String getAtCode() {
		return atCode;
	}


	public void setAtCode(String atCode) {
		this.atCode = atCode;
	}

	@Column(name="AT_NAME")
	public String getAtName() {
		return atName;
	}


	public void setAtName(String atName) {
		this.atName = atName;
	}

	@Column(name="AT_BRAND")
	public String getAtBrand() {
		return atBrand;
	}


	public void setAtBrand(String atBrand) {
		this.atBrand = atBrand;
	}

	@Column(name="AT_SPEC")
	public String getAtSpec() {
		return atSpec;
	}


	public void setAtSpec(String atSpec) {
		this.atSpec = atSpec;
	}

	@Column(name="AT_TYPE")
	public String getAtType() {
		return atType;
	}


	public void setAtType(String atType) {
		this.atType = atType;
	}

	@Column(name="AT_COLOR")
	public String getAtColor() {
		return atColor;
	}


	public void setAtColor(String atColor) {
		this.atColor = atColor;
	}
	@Transient
	public Integer getCustId() {
		return custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}
	@Transient
	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}
	@Transient
	public Date getActureTime() {
		return actureTime;
	}

	public void setActureTime(Date actureTime) {
		this.actureTime = actureTime;
	}
	@Transient
	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	@Transient
	public String getEntrustNo() {
		return entrustNo;
	}

	public void setEntrustNo(String entrustNo) {
		this.entrustNo = entrustNo;
	}
	@Transient
	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	

	

}