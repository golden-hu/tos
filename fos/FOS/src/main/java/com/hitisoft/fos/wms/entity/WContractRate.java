package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import java.util.Date;


import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "W_CONTRACT_RATE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WContractRate extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long contractId;
	private Integer cargoId;	
	private String skuNo;
	private String cargoName;
	private Integer charId;	
	private String charCode;
	private String charName;
	private Byte costInFlag;
	private Byte costOutFlag;
	private String pateName;
	private Integer unitId;	
	private String unitCode;
	private String unitName;
	private Double unitPrice;
	private String currCode;
	private String unitTime;
	
	private String puuid;
	
	private String remark;
	
	public WContractRate(){
		
	}
	
	
	@Column(name = "CONTRACT_ID")
	public Long getContractId() {
		return contractId;
	}



	public void setContractId(Long contractId) {
		this.contractId = contractId;
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


	@Column(name = "CHAR_ID")
	public Integer getCharId() {
		return charId;
	}



	public void setCharId(Integer charId) {
		this.charId = charId;
	}


	@Column(name = "CHAR_CODE")
	public String getCharCode() {
		return charCode;
	}



	public void setCharCode(String charCode) {
		this.charCode = charCode;
	}


	@Column(name = "CHAR_NAME")
	public String getCharName() {
		return charName;
	}



	public void setCharName(String charName) {
		this.charName = charName;
	}


	@Column(name = "COST_IN_FLAG")
	public Byte getCostInFlag() {
		return costInFlag;
	}



	public void setCostInFlag(Byte costInFlag) {
		this.costInFlag = costInFlag;
	}


	@Column(name = "COST_OUT_FLAG")
	public Byte getCostOutFlag() {
		return costOutFlag;
	}



	public void setCostOutFlag(Byte costOutFlag) {
		this.costOutFlag = costOutFlag;
	}


	@Column(name = "PATE_NAME")
	public String getPateName() {
		return pateName;
	}



	public void setPateName(String pateName) {
		this.pateName = pateName;
	}


	@Column(name = "UNIT_ID")
	public Integer getUnitId() {
		return unitId;
	}



	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}


	@Column(name = "UNIT_CODE")
	public String getUnitCode() {
		return unitCode;
	}



	public void setUnitCode(String unitCode) {
		this.unitCode = unitCode;
	}


	@Column(name = "UNIT_NAME")
	public String getUnitName() {
		return unitName;
	}



	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}


	@Column(name = "UNIT_PRICE")
	public Double getUnitPrice() {
		return unitPrice;
	}



	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}


	@Column(name = "CURR_CODE")
	public String getCurrCode() {
		return currCode;
	}



	public void setCurrCode(String currCode) {
		this.currCode = currCode;
	}


	@Column(name = "UNIT_TIME")
	public String getUnitTime() {
		return unitTime;
	}



	public void setUnitTime(String unitTime) {
		this.unitTime = unitTime;
	}



	@Column(name = "REMARK")
	public String getRemark() {
		return remark;
	}


	public void setRemark(String remark) {
		this.remark = remark;
	}


	@Transient
	public String getPuuid() {
		return puuid;
	}

	public void setPuuid(String puuid) {
		this.puuid = puuid;
	}
	

}
