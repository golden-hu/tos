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
@Table(name="W_SMART_EXPENSE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WSmartExpense extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	/*private String areaCode;
	private String areaName;
	private Byte areaType;
	private String warehouseCode;
	private Long warehouseId;
	private String warehouseName;*/
	
	private Integer accountId;
	private String accountName;
	private Integer custId;
	private String custName;
	private Integer charId;
	private String charName;
	private String charNameEn;
	private String unitName;
	private Double unitPrice;
	private Double num;
	private Double amount;
	private String currCode;
	private Double exRate;
	private Date fromDate;
	private Date endDate;
	private Date ownerMonth;	
	private Long storageNoteId;
	private String storageNoteNo;
	private Integer receivedCargoId;
	private Integer placedCargoId;
	private Integer pickedCargoId;
	private Byte exportFlag;
	private Integer expenseId;
	private char expeType;
	
	private String remarks;
	private String cargoName;
	private Long rateId;
	private String rateMode;
	

    public WSmartExpense() {
    }

    @Column(name="ACCOUNT_ID")
	public Integer getAccountId() {
		return accountId;
	}


	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}

	@Column(name="ACCOUNT_NAME")
	public String getAccountName() {
		return accountName;
	}


	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	@Column(name="CUST_ID")
	public Integer getCustId() {
		return custId;
	}


	public void setCustId(Integer custId) {
		this.custId = custId;
	}

	@Column(name="CUST_NAME")
	public String getCustName() {
		return custName;
	}


	public void setCustName(String custName) {
		this.custName = custName;
	}

	@Column(name="CHAR_ID")
	public Integer getCharId() {
		return charId;
	}


	public void setCharId(Integer charId) {
		this.charId = charId;
	}

	@Column(name="CHAR_NAME")
	public String getCharName() {
		return charName;
	}


	public void setCharName(String charName) {
		this.charName = charName;
	}

	@Column(name="CHAR_NAME_EN")
	public String getCharNameEn() {
		return charNameEn;
	}


	public void setCharNameEn(String charNameEn) {
		this.charNameEn = charNameEn;
	}
	@Column(name="UNIT_NAME")
	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	@Column(name="UNIT_PRICE")
	public Double getUnitPrice() {
		return unitPrice;
	}


	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}

	@Column(name="NUM")
	public Double getNum() {
		return num;
	}


	public void setNum(Double num) {
		this.num = num;
	}

	@Column(name="AMOUNT")
	public Double getAmount() {
		return amount;
	}


	public void setAmount(Double amount) {
		this.amount = amount;
	}

	@Column(name="CURR_CODE")
	public String getCurrCode() {
		return currCode;
	}


	public void setCurrCode(String currCode) {
		this.currCode = currCode;
	}

	@Column(name="EX_RATE")
	public Double getExRate() {
		return exRate;
	}


	public void setExRate(Double exRate) {
		this.exRate = exRate;
	}

	@Column(name="FROM_DATE")
	public Date getFromDate() {
		return fromDate;
	}


	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	@Column(name="END_DATE")
	public Date getEndDate() {
		return endDate;
	}


	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	@Column(name="OWNER_MONTH")
	public Date getOwnerMonth() {
		return ownerMonth;
	}


	public void setOwnerMonth(Date ownerMonth) {
		this.ownerMonth = ownerMonth;
	}

	@Column(name="STORAGE_NOTE_ID")
	public Long getStorageNoteId() {
		return storageNoteId;
	}


	public void setStorageNoteId(Long storageNoteId) {
		this.storageNoteId = storageNoteId;
	}

	@Column(name="STORAGE_NOTE_NO")
	public String getStorageNoteNo() {
		return storageNoteNo;
	}


	public void setStorageNoteNo(String storageNoteNo) {
		this.storageNoteNo = storageNoteNo;
	}

	@Column(name="RECEIVED_CARGO_ID")
	public Integer getReceivedCargoId() {
		return receivedCargoId;
	}


	public void setReceivedCargoId(Integer receivedCargoId) {
		this.receivedCargoId = receivedCargoId;
	}

	@Column(name="PLACED_CARGO_ID")
	public Integer getPlacedCargoId() {
		return placedCargoId;
	}


	public void setPlacedCargoId(Integer placedCargoId) {
		this.placedCargoId = placedCargoId;
	}

	@Column(name="PICKED_CARGO_ID")
	public Integer getPickedCargoId() {
		return pickedCargoId;
	}


	public void setPickedCargoId(Integer pickedCargoId) {
		this.pickedCargoId = pickedCargoId;
	}

	@Column(name="EXPORT_FLAG")
	public Byte getExportFlag() {
		return exportFlag;
	}


	public void setExportFlag(Byte exportFlag) {
		this.exportFlag = exportFlag;
	}

	@Column(name="EXPENSE_ID")
	public Integer getExpenseId() {
		return expenseId;
	}


	public void setExpenseId(Integer expenseId) {
		this.expenseId = expenseId;
	}


	@Column(name="EXPE_TYPE")
	public char getExpeType() {
		return expeType;
	}

	public void setExpeType(char expeType) {
		this.expeType = expeType;
	}

	@Column(name="REMARKS")
	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Column(name="CARGO_NAME")
	public String getCargoName() {
		return cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}
	@Column(name="RATE_ID")
	public Long getRateId() {
		return rateId;
	}

	public void setRateId(Long rateId) {
		this.rateId = rateId;
	}
	@Column(name="RATE_MODE")
	public String getRateMode() {
		return rateMode;
	}

	public void setRateMode(String rateMode) {
		this.rateMode = rateMode;
	}
    
    
	


}