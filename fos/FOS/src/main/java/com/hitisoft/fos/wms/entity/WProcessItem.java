package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "W_PROCESSITEM")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WProcessItem extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String contractNo;//合同号
	private String prodectName;//产品名称
	private String prodectNo;//产品编号
	private String homeworkName;//作业名称
	private String homeworkCode;//作业代码
	private Double homeworkRate;//杂作业费率
	private String homeworkUnit;//杂作业单位
	private Double homeworkQuantity;//杂作业数量
	private Double workHours;//工时
	private Double sumNum;//金额
	private Double quantity;//数量
	private String unitQuantity;//数量单位
	private Double weight;//重量
	private Long wProcessId;//ProcessId
	private String unitWeight;//重量单位
	private Double bulk;//体积
	private String unitBulk;//体积单位
	private Integer number;//件数
	private String unitNumber;//件数单位
	private String unitProvide;//供货单位
	private String puuid;//uuid
	
	
	public WProcessItem() {}

	
	@Transient
	public String getPuuid() {
		return puuid;
	}

	public void setPuuid(String puuid) {
		this.puuid = puuid;
	}

	@Column(name="WPROCESS_ID")
	public Long getwProcessId() {
		return wProcessId;
	}



	public void setwProcessId(Long wProcessId) {
		this.wProcessId = wProcessId;
	}



	@Column(name="CONTRACT_NO")
	public String getContractNo() {
		return contractNo;
	}

	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}

	@Column(name="PRODECT_NAME")
	public String getProdectName() {
		return prodectName;
	}

	public void setProdectName(String prodectName) {
		this.prodectName = prodectName;
	}

	@Column(name="PRODECT_NO")
	public String getProdectNo() {
		return prodectNo;
	}

	public void setProdectNo(String prodectNo) {
		this.prodectNo = prodectNo;
	}

	@Column(name="HOMEWORK_NAME")
	public String getHomeworkName() {
		return homeworkName;
	}

	public void setHomeworkName(String homeworkName) {
		this.homeworkName = homeworkName;
	}

	@Column(name="HOMEWORK_CODE")
	public String getHomeworkCode() {
		return homeworkCode;
	}

	public void setHomeworkCode(String homeworkCode) {
		this.homeworkCode = homeworkCode;
	}

	@Column(name="HOMEWORK_RATE")
	public Double getHomeworkRate() {
		return homeworkRate;
	}

	public void setHomeworkRate(Double homeworkRate) {
		this.homeworkRate = homeworkRate;
	}

	@Column(name="HOMEWORK_UNIT")
	public String getHomeworkUnit() {
		return homeworkUnit;
	}

	public void setHomeworkUnit(String homeworkUnit) {
		this.homeworkUnit = homeworkUnit;
	}

	@Column(name="HOMEWORK_QUANTITY")
	public Double getHomeworkQuantity() {
		return homeworkQuantity;
	}

	public void setHomeworkQuantity(Double homeworkQuantity) {
		this.homeworkQuantity = homeworkQuantity;
	}

	
	@Column(name="WORK_HOURS")
	public Double getWorkHours() {
		return workHours;
	}



	public void setWorkHours(Double workHours) {
		this.workHours = workHours;
	}



	@Column(name="SUN_NUM")
	public Double getSumNum() {
		return sumNum;
	}


	public void setSumNum(Double sumNum) {
		this.sumNum = sumNum;
	}



	@Column(name="QUANTITY")
	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	@Column(name="UNIT_QUANTITY")
	public String getUnitQuantity() {
		return unitQuantity;
	}

	public void setUnitQuantity(String unitQuantity) {
		this.unitQuantity = unitQuantity;
	}

	@Column(name="WEIGHT")
	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	@Column(name="UNIT_WEIGHT")
	public String getUnitWeight() {
		return unitWeight;
	}

	public void setUnitWeight(String unitWeight) {
		this.unitWeight = unitWeight;
	}

	@Column(name="BULK")
	public Double getBulk() {
		return bulk;
	}

	public void setBulk(Double bulk) {
		this.bulk = bulk;
	}

	@Column(name="UNIT_BULK")
	public String getUnitBulk() {
		return unitBulk;
	}

	public void setUnitBulk(String unitBulk) {
		this.unitBulk = unitBulk;
	}

	@Column(name="NUMBER")
	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	@Column(name="UNIT_NUMBER")
	public String getUnitNumber() {
		return unitNumber;
	}

	public void setUnitNumber(String unitNumber) {
		this.unitNumber = unitNumber;
	}

	@Column(name="UNIT_PUOVIDE")
	public String getUnitProvide() {
		return unitProvide;
	}

	public void setUnitProvide(String unitProvide) {
		this.unitProvide = unitProvide;
	}
	
	
	

}
