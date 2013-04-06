package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "W_RATE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WRate extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private String rateCode;
	private String rateName;
	private Integer charId;
	private String charCode;
	private String charName;
	private Double minQuantity;
	
	private String unit;
	private String unitName;
	private String rateType;
	private Date fromDate;
	private Double unitPrice;
	private String currCode;
	private String warehouseType;
	private Byte costInFlag;
	private Byte strongInFlag;
	private Byte strongOutFlag;
	private Byte strongInsideFlag;
	private Byte strongOtherFlag;	
	private Integer freeTime;
	
	
	private Integer cargoId;
	private String cargoName;
	private Integer cargoOwnerId;
	private String cargoOwner;	
	private Integer placedCargoId;
	private Integer receviedCargoId;
	private Integer storageNoteId;
	private Integer storageNoteCargoId;
	private Integer pickedCargoId;
	private String categoryName;
	private Integer accountId;
	private String accountName;
	private Double quantity;
	private String storageFlag;
	protected String checkBy;
	protected Date checkTime;
	
		
	
	
	
	public WRate(){
		
	}
	
	@Column(name = "CHECK_BY")
	public String getCheckBy() {
		return checkBy;
	}


	public void setCheckBy(String checkBy) {
		this.checkBy = checkBy;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CHECK_TIME")
	public Date getCheckTime() {
		return checkTime;
	}


	public void setCheckTime(Date checkTime) {
		this.checkTime = checkTime;
	}

	@Column(name = "RATE_CODE")
	public String getRateCode() {
		return rateCode;
	}

	public void setRateCode(String rateCode) {
		this.rateCode = rateCode;
	}

	@Column(name = "RATE_NAME")
	public String getRateName() {
		return rateName;
	}

	public void setRateName(String rateName) {
		this.rateName = rateName;
	}
	@Column(name = "CHAR_ID")
	public Integer getCharId() {
		return charId;
	}

	public void setCharId(Integer charId) {
		this.charId = charId;
	}

	@Column(name = "CHAR_CODE")
	public String getCharCode() {
		return this.charCode;
	}

	public void setCharCode(String charCode) {
		this.charCode = charCode;
	}
	
	@Column(name = "CHAR_NAME")
	public String getCharName() {
		return this.charName;
	}

	public void setCharName(String charName) {
		this.charName = charName;
	}
	
	@Column(name = "MIN_QUANTITY")
	public Double getMinQuantity() {
		return this.minQuantity;
	}

	public void setMinQuantity(Double minQuantity) {
		this.minQuantity = minQuantity;
	}
	
	
	@Column(name = "UNIT")
	public String getUnit() {
		return this.unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}
	
	@Column(name = "UNIT_NAME")
	public String getUnitName() {
		return this.unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	
	@Column(name = "RATE_TYPE")
	public String getRateType() {
		return this.rateType;
	}

	public void setRateType(String rateType) {
		this.rateType = rateType;
	}
	
	@Temporal(TemporalType.DATE)
	@Column(name = "FROM_DATE")	
	public Date getFromDate() {
		return this.fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}
	
	@Column(name = "UNIT_PRICE")
	public Double getUnitPrice() {
		return this.unitPrice;
	}

	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}
	
	@Column(name = "CURR_CODE")
	public String getCurrCode() {
		return this.currCode;
	}

	public void setCurrCode(String currCode) {
		this.currCode = currCode;
	}
	
	@Column(name = "WAREHOUSE_TYPE")
	public String getWarehouseType() {
		return this.warehouseType;
	}

	public void setWarehouseType(String warehouseType) {
		this.warehouseType = warehouseType;
	}
	
	@Column(name = "COST_IN_FLAG")
	public Byte getCostInFlag() {
		return this.costInFlag;
	}

	public void setCostInFlag(Byte costInFlag) {
		this.costInFlag = costInFlag;
	}
	
	@Column(name = "STRONG_IN_FLAG")
	public Byte getStrongInFlag() {
		return this.strongInFlag;
	}

	public void setStrongInFlag(Byte strongInFlag) {
		this.strongInFlag = strongInFlag;
	}
	
	@Column(name = "STRONG_OUT_FLAG")
	public Byte getStrongOutFlag() {
		return this.strongOutFlag;
	}

	public void setStrongOutFlag(Byte strongOutFlag) {
		this.strongOutFlag = strongOutFlag;
	}
	
	@Column(name = "STRONG_INSIDE_FLAG")
	public Byte getStrongInsideFlag() {
		return this.strongInsideFlag;
	}

	public void setStrongInsideFlag(Byte strongInsideFlag) {
		this.strongInsideFlag = strongInsideFlag;
	}
	
	@Column(name = "STRONG_OTHER_FLAG")
	public Byte getStrongOtherFlag() {
		return this.strongOtherFlag;
	}

	public void setStrongOtherFlag(Byte strongOtherFlag) {
		this.strongOtherFlag = strongOtherFlag;
	}
	
	
	@Column(name = "FREE_TIME")
	public Integer getFreeTime() {
		return this.freeTime;
	}

	public void setFreeTime(Integer freeTime) {
		this.freeTime = freeTime;
	}
	
	
	@Transient
	public Integer getCargoId() {
		return cargoId;
	}

	public void setCargoId(Integer cargoId) {
		this.cargoId = cargoId;
	}
	@Transient
	public String getCargoName() {
		return cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}

	@Transient
	public Integer getCargoOwnerId() {
		return cargoOwnerId;
	}

	public void setCargoOwnerId(Integer cargoOwnerId) {
		this.cargoOwnerId = cargoOwnerId;
	}

	@Transient
	public String getCargoOwner() {
		return cargoOwner;
	}

	public void setCargoOwner(String cargoOwner) {
		this.cargoOwner = cargoOwner;
	}
	@Transient
	public Integer getPlacedCargoId() {
		return placedCargoId;
	}

	public void setPlacedCargoId(Integer placedCargoId) {
		this.placedCargoId = placedCargoId;
	}

	@Transient
	public Integer getReceviedCargoId() {
		return receviedCargoId;
	}

	public void setReceviedCargoId(Integer receviedCargoId) {
		this.receviedCargoId = receviedCargoId;
	}

	@Transient
	public Integer getStorageNoteId() {
		return storageNoteId;
	}

	public void setStorageNoteId(Integer storageNoteId) {
		this.storageNoteId = storageNoteId;
	}

	@Transient
	public Integer getStorageNoteCargoId() {
		return storageNoteCargoId;
	}

	public void setStorageNoteCargoId(Integer storageNoteCargoId) {
		this.storageNoteCargoId = storageNoteCargoId;
	}

	@Transient
	public Integer getPickedCargoId() {
		return pickedCargoId;
	}

	public void setPickedCargoId(Integer pickedCargoId) {
		this.pickedCargoId = pickedCargoId;
	}

	@Transient
	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	@Transient
	public Integer getAccountId() {
		return accountId;
	}

	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}

	@Transient
	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	@Transient
	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	//出现位置
	@Transient
	public String getStorageFlag() {
		return storageFlag;
	}

	public void setStorageFlag(String storageFlag) {
		this.storageFlag = storageFlag;
	}
	
	
	

}
