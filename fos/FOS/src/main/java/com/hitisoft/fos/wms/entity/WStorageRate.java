package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "W_STORAGE_RATE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WStorageRate extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private String storageNoteNo;
	private Integer storageNoteId;
	private Integer storageNoteCargoId;
	
	private Integer cargoId;
	private String skuNo;
	private String cargoName;
	
	private String rateCode;
	private String rateName;
	private Integer rateId;
	private String charCode;
	private String charName;
	
	private String unit;
	private Integer unitId;
	private String unitName;
	
	//private Date fromDate;
	private Double unitPrice;
	private Double quantity;
	private Double amount;
	private Double taskTime;
	
	private Double cargoQuantity;
	private Integer qUnitId;
	private String qUnitName;
	
	private Double cargoWeight;
	private Integer wUnitId;
	private String wUnitName;
	
	private Double cargoVolume;
	private Integer vUnitId;
	private String vUnitName;
	
	private String currCode;
	
	private Byte costInFlag;
	
	
	private Integer accountId;
	private String accountCode;
	private String accountName;
	

	
		
	
	
	
	public WStorageRate(){
		
	}
	@Column(name = "RATE_NAME")
	public String getRateName() {
		return rateName;
	}

	public void setRateName(String rateName) {
		this.rateName = rateName;
	}

	@Column(name = "RATE_ID")
	public Integer getRateId() {
		return rateId;
	}

	public void setRateId(Integer rateId) {
		this.rateId = rateId;
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
	
	@Column(name = "UNIT_ID")
	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	@Column(name = "UNIT_NAME")
	public String getUnitName() {
		return this.unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
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

	
	@Column(name = "COST_IN_FLAG")
	public Byte getCostInFlag() {
		return this.costInFlag;
	}

	public void setCostInFlag(Byte costInFlag) {
		this.costInFlag = costInFlag;
	}
	


	@Column(name = "STORAGE_NOTE_ID")
	public Integer getStorageNoteId() {
		return storageNoteId;
	}

	public void setStorageNoteId(Integer storageNoteId) {
		this.storageNoteId = storageNoteId;
	}


	@Column(name = "ACCOUNT_ID")
	public Integer getAccountId() {
		return accountId;
	}

	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}

	@Column(name = "ACCOUNT_NAME")
	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}
	@Column(name = "STORAGE_NOTE_NO")
	public String getStorageNoteNo() {
		return storageNoteNo;
	}

	public void setStorageNoteNo(String storageNoteNo) {
		this.storageNoteNo = storageNoteNo;
	}
	@Column(name = "ACCOUNT_CODE")
	public String getAccountCode() {
		return accountCode;
	}

	public void setAccountCode(String accountCode) {
		this.accountCode = accountCode;
	}
	@Column(name = "STORAGE_NOTE_CARGO_ID")
	public Integer getStorageNoteCargoId() {
		return storageNoteCargoId;
	}
	public void setStorageNoteCargoId(Integer storageNoteCargoId) {
		this.storageNoteCargoId = storageNoteCargoId;
	}
	@Column(name = "CARGO_ID")
	public Integer getCargoId() {
		return cargoId;
	}
	public void setCargoId(Integer cargoId) {
		this.cargoId = cargoId;
	}
	@Column(name = "SKU_NO")
	public String getSkuNo() {
		return skuNo;
	}
	public void setSkuNo(String skuNo) {
		this.skuNo = skuNo;
	}
	@Column(name = "CARGO_NAME")
	public String getCargoName() {
		return cargoName;
	}
	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}
	@Column(name = "RATE_CODE")
	public String getRateCode() {
		return rateCode;
	}
	public void setRateCode(String rateCode) {
		this.rateCode = rateCode;
	}
	@Column(name = "UNIT")
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	@Column(name = "QUANTITY")
	public Double getQuantity() {
		return quantity;
	}
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
	@Column(name = "AMOUNT")
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	@Column(name = "TASK_TIME")
	public Double getTaskTime() {
		return taskTime;
	}
	public void setTaskTime(Double taskTime) {
		this.taskTime = taskTime;
	}
	@Column(name = "CARGO_QUANTITY")
	public Double getCargoQuantity() {
		return cargoQuantity;
	}
	public void setCargoQuantity(Double cargoQuantity) {
		this.cargoQuantity = cargoQuantity;
	}
	@Column(name = "Q_UNIT_ID")
	public Integer getqUnitId() {
		return qUnitId;
	}
	public void setqUnitId(Integer qUnitId) {
		this.qUnitId = qUnitId;
	}
	@Column(name = "Q_UNIT_NAME")
	public String getqUnitName() {
		return qUnitName;
	}
	public void setqUnitName(String qUnitName) {
		this.qUnitName = qUnitName;
	}
	@Column(name = "CARGO_WEIGHT")
	public Double getCargoWeight() {
		return cargoWeight;
	}
	public void setCargoWeight(Double cargoWeight) {
		this.cargoWeight = cargoWeight;
	}
	@Column(name = "W_UNIT_ID")
	public Integer getwUnitId() {
		return wUnitId;
	}
	public void setwUnitId(Integer wUnitId) {
		this.wUnitId = wUnitId;
	}
	@Column(name = "W_UNIT_NAME")
	public String getwUnitName() {
		return wUnitName;
	}
	public void setwUnitName(String wUnitName) {
		this.wUnitName = wUnitName;
	}
	@Column(name = "CARGO_VOLUME")
	public Double getCargoVolume() {
		return cargoVolume;
	}
	public void setCargoVolume(Double cargoVolume) {
		this.cargoVolume = cargoVolume;
	}
	@Column(name = "V_UNIT_ID")
	public Integer getvUnitId() {
		return vUnitId;
	}
	public void setvUnitId(Integer vUnitId) {
		this.vUnitId = vUnitId;
	}
	@Column(name = "V_UNIT_NAME")
	public String getvUnitName() {
		return vUnitName;
	}
	public void setvUnitName(String vUnitName) {
		this.vUnitName = vUnitName;
	}
	
	
	

}
