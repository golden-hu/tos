package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.math.BigDecimal;


/**
 * The persistent class for the t_repair_item database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="T_REPAIR_ITEM")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TRepairItem extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private BigDecimal hours;
	private BigDecimal hoursFee;
	private BigDecimal hoursPrice;
	private String itemName;
	private BigDecimal partsFee;
	private BigDecimal partsNum;
	private BigDecimal partsPrice;
	private String remark;
	private Integer repairLogId;
	private BigDecimal totalAmount;

    public TRepairItem() {
    }


	@Column(name="HOURS")
	public BigDecimal getHours() {
		return this.hours;
	}

	public void setHours(BigDecimal hours) {
		this.hours = hours;
	}


	@Column(name="HOURS_FEE")
	public BigDecimal getHoursFee() {
		return this.hoursFee;
	}

	public void setHoursFee(BigDecimal hoursFee) {
		this.hoursFee = hoursFee;
	}


	@Column(name="HOURS_PRICE")
	public BigDecimal getHoursPrice() {
		return this.hoursPrice;
	}

	public void setHoursPrice(BigDecimal hoursPrice) {
		this.hoursPrice = hoursPrice;
	}


	@Column(name="ITEM_NAME")
	public String getItemName() {
		return this.itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}


	@Column(name="PARTS_FEE")
	public BigDecimal getPartsFee() {
		return this.partsFee;
	}

	public void setPartsFee(BigDecimal partsFee) {
		this.partsFee = partsFee;
	}


	@Column(name="PARTS_NUM")
	public BigDecimal getPartsNum() {
		return this.partsNum;
	}

	public void setPartsNum(BigDecimal partsNum) {
		this.partsNum = partsNum;
	}


	@Column(name="PARTS_PRICE")
	public BigDecimal getPartsPrice() {
		return this.partsPrice;
	}

	public void setPartsPrice(BigDecimal partsPrice) {
		this.partsPrice = partsPrice;
	}


	@Column(name="REMARK")
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}


	@Column(name="REPAIR_LOG_ID")
	public Integer getRepairLogId() {
		return this.repairLogId;
	}

	public void setRepairLogId(Integer repairLogId) {
		this.repairLogId = repairLogId;
	}


	@Column(name="TOTAL_AMOUNT")
	public BigDecimal getTotalAmount() {
		return this.totalAmount;
	}

	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}

}