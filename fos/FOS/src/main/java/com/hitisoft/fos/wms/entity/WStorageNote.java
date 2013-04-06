package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fos.util.Constants;

import java.util.Date;


/**
 * The persistent class for the w_storage_note database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_STORAGE_NOTE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WStorageNote extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private String consBizType;
	private Date actureTime;
	private String batchNo;
	private String orderNo;
	private Double cargoValue;
	private Integer consId;
	private String consNo;
	private String contractNo;
	
	private String blNo;
	private String countryOfOrigin;
	private String countryOfGoal;
	private String destination;
	private String masterTransNo;
	private String pod;
	private String pol;
	private String loadAddress;
	private Date loadDate;
	
	private String currCode;
	private String custContact;
	private String custFax;
	private Integer custId;
	private String custName;
	private String custRequirement;
	private String custTel;
	
	private Double grossWeight;	
	private Double measure;
	private Double netWeight;
	
	
	private Integer pateId;
	private String pateName;
	private String pateRemark;
	private String deliName;
	private String deliRemark;
	
	private Date planedTime;
	
	private String productionNo;
	private Double quantity;
	private String refNo;
	private String remarks;
	private String settlementObjectContact;
	private Integer settlementObjectId;
	private String settlementObjectName;
	private String settlementObjectTel;
	private Integer status;
	private String storageNoteNo;
	private Byte storageType;
	private Date storageDate;
	
	private String transNo;
	
	private Integer unitId;
	private String unitName;
	private Integer wUnitId;
	private String wUnitName;
	private String warehouseCode;
	private Integer warehouseId;
	private String warehouseName;
	private Integer operatorId;
	private String operatorName;
    private Integer storageClassId;
    private String storageClass;
    private String entrustNo;
    private Integer cargoOwnerId;
    private String cargoOwnerCode;
    private String cargoOwnerName;
    private Integer orderStatus;
    private Integer audiStatus;
    private Integer containerQuantity;
    private Integer accountId;
    private String accountCode;
    private String accountName;
    private String accountContact;
    private String invoiceNo;
    private Double volume;
    private Integer vUnitId;
    private String vUnitName;
    private Byte storageFlag;
    
    //add by golden @20120828
    private Integer tankNum;
    private String tankType;
    
    private Integer actionGategoryId;
    private String actionGategory;
    
    private String truckType;
    private String driver;
    private String truckNumber;
    private String transCarrierId;
    private String transCarrier;
    private String transRemarks;
	
	
    ////////////////////////////////////////////////////////////////////////////////
    ///以下这些是虚拟字段////////////////////////////////////////////////
	private Double sumR;
	private Double sumP;
	private Double grossProfit;
	private Double cnyGrossProfit;
	private Double usdGrossProfit;
	private Double otherGrossProfit;
	
	private String grossProfitRate;
	private Double sumRUsd;
	private Double sumRCny;
	private Double sumROther;
	private Double sumPUsd;
	private Double sumPCny;
	private Double sumPOther;
	
	private Double sumRUsdInvoice;
	private Double sumRCnyInvoice;
	private Double sumPUsdInvoice;
	private Double sumPCnyInvoice;
	private Double sumRUsdWriteOff;
	private Double sumRCnyWriteOff;
	private Double sumPUsdWriteOff;
	private Double sumPCnyWriteOff;
	private Short editable;
    
    
    
    
    
    
    
    
    public WStorageNote() {
	
	}

    @Column(name="CONS_BIZ_TYPE")
    public String getConsBizType() {
		return consBizType;
	}


	public void setConsBizType(String consBizType) {
		this.consBizType = consBizType;
	}


	@Temporal( TemporalType.DATE)
	@Column(name="ACTURE_TIME")
	public Date getActureTime() {
		return this.actureTime;
	}

	public void setActureTime(Date actureTime) {
		this.actureTime = actureTime;
	}


	@Column(name="BATCH_NO")
	public String getBatchNo() {
		return this.batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}


	@Column(name="BL_NO")
	public String getBlNo() {
		return this.blNo;
	}

	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}


	@Column(name="CARGO_VALUE")
	public Double getCargoValue() {
		return this.cargoValue;
	}

	public void setCargoValue(Double cargoValue) {
		this.cargoValue = cargoValue;
	}

	
	@Column(name="CONS_ID")
	public Integer getConsId() {
		return this.consId;
	}

	public void setConsId(Integer consId) {
		this.consId = consId;
	}


	@Column(name="CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}


	@Column(name="CONTRACT_NO")
	public String getContractNo() {
		return this.contractNo;
	}

	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}


	@Column(name="COUNTRY_OF_ORIGIN")
	public String getCountryOfOrigin() {
		return this.countryOfOrigin;
	}

	public void setCountryOfOrigin(String countryOfOrigin) {
		this.countryOfOrigin = countryOfOrigin;
	}


	@Column(name="CURR_CODE")
	public String getCurrCode() {
		return this.currCode;
	}

	public void setCurrCode(String currCode) {
		this.currCode = currCode;
	}


	@Column(name="CUST_CONTACT")
	public String getCustContact() {
		return this.custContact;
	}

	public void setCustContact(String custContact) {
		this.custContact = custContact;
	}


	@Column(name="CUST_FAX")
	public String getCustFax() {
		return this.custFax;
	}

	public void setCustFax(String custFax) {
		this.custFax = custFax;
	}


	@Column(name="CUST_ID")
	public Integer getCustId() {
		return this.custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}


	@Column(name="CUST_NAME")
	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}


	@Column(name="CUST_REQUIREMENT")
	public String getCustRequirement() {
		return this.custRequirement;
	}

	public void setCustRequirement(String custRequirement) {
		this.custRequirement = custRequirement;
	}


	@Column(name="CUST_TEL")
	public String getCustTel() {
		return this.custTel;
	}

	public void setCustTel(String custTel) {
		this.custTel = custTel;
	}


	@Column(name="DESTINATION")
	public String getDestination() {
		return this.destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}


	@Column(name="GROSS_WEIGHT")
	public Double getGrossWeight() {
		return this.grossWeight;
	}

	public void setGrossWeight(Double grossWeight) {
		this.grossWeight = grossWeight;
	}


	@Column(name="LOAD_ADDRESS")
	public String getLoadAddress() {
		return this.loadAddress;
	}

	public void setLoadAddress(String loadAddress) {
		this.loadAddress = loadAddress;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="LOAD_DATE")
	public Date getLoadDate() {
		return this.loadDate;
	}

	public void setLoadDate(Date loadDate) {
		this.loadDate = loadDate;
	}


	@Column(name="MASTER_TRANS_NO")
	public String getMasterTransNo() {
		return this.masterTransNo;
	}

	public void setMasterTransNo(String masterTransNo) {
		this.masterTransNo = masterTransNo;
	}


	@Column(name="MEASURE")
	public Double getMeasure() {
		return this.measure;
	}

	public void setMeasure(Double measure) {
		this.measure = measure;
	}


	@Column(name="NET_WEIGHT")
	public Double getNetWeight() {
		return this.netWeight;
	}

	public void setNetWeight(Double netWeight) {
		this.netWeight = netWeight;
	}


	@Column(name="ORDER_NO")
	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}


	@Column(name="PATE_ID")
	public Integer getPateId() {
		return this.pateId;
	}

	public void setPateId(Integer pateId) {
		this.pateId = pateId;
	}


	@Column(name="PATE_NAME")
	public String getPateName() {
		return this.pateName;
	}

	public void setPateName(String pateName) {
		this.pateName = pateName;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="PLANED_TIME")
	public Date getPlanedTime() {
		return this.planedTime;
	}

	public void setPlanedTime(Date planedTime) {
		this.planedTime = planedTime;
	}


	@Column(name="POD")
	public String getPod() {
		return this.pod;
	}

	public void setPod(String pod) {
		this.pod = pod;
	}


	@Column(name="POL")
	public String getPol() {
		return this.pol;
	}

	public void setPol(String pol) {
		this.pol = pol;
	}


	@Column(name="PRODUCTION_NO")
	public String getProductionNo() {
		return this.productionNo;
	}

	public void setProductionNo(String productionNo) {
		this.productionNo = productionNo;
	}


	@Column(name="QUANTITY")
	public Double getQuantity() {
		return this.quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}


	@Column(name="REF_NO")
	public String getRefNo() {
		return this.refNo;
	}

	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}


	@Column(name="REMARKS")
	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}


	@Column(name="SETTLEMENT_OBJECT_CONTACT")
	public String getSettlementObjectContact() {
		return this.settlementObjectContact;
	}

	public void setSettlementObjectContact(String settlementObjectContact) {
		this.settlementObjectContact = settlementObjectContact;
	}


	@Column(name="SETTLEMENT_OBJECT_ID")
	public Integer getSettlementObjectId() {
		return this.settlementObjectId;
	}

	public void setSettlementObjectId(Integer settlementObjectId) {
		this.settlementObjectId = settlementObjectId;
	}


	@Column(name="SETTLEMENT_OBJECT_NAME")
	public String getSettlementObjectName() {
		return this.settlementObjectName;
	}

	public void setSettlementObjectName(String settlementObjectName) {
		this.settlementObjectName = settlementObjectName;
	}


	@Column(name="SETTLEMENT_OBJECT_TEL")
	public String getSettlementObjectTel() {
		return this.settlementObjectTel;
	}

	public void setSettlementObjectTel(String settlementObjectTel) {
		this.settlementObjectTel = settlementObjectTel;
	}


	@Column(name="STATUS")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}


	@Column(name="STORAGE_NOTE_NO")
	public String getStorageNoteNo() {
		return this.storageNoteNo;
	}

	public void setStorageNoteNo(String storageNoteNo) {
		this.storageNoteNo = storageNoteNo;
	}


	@Column(name="STORAGE_TYPE")
	public Byte getStorageType() {
		return this.storageType;
	}

	public void setStorageType(Byte storageType) {
		this.storageType = storageType;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="STORAGE_DATE")
	public Date getStorageDate() {
		return this.storageDate;
	}

	public void setStorageDate(Date storageDate) {
		this.storageDate = storageDate;
	}


	@Column(name="TRANS_NO")
	public String getTransNo() {
		return this.transNo;
	}

	public void setTransNo(String transNo) {
		this.transNo = transNo;
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


	@Column(name="WAREHOUSE_CODE")
	public String getWarehouseCode() {
		return this.warehouseCode;
	}

	public void setWarehouseCode(String warehouseCode) {
		this.warehouseCode = warehouseCode;
	}


	@Column(name="WAREHOUSE_ID")
	public Integer getWarehouseId() {
		return this.warehouseId;
	}

	public void setWarehouseId(Integer warehouseId) {
		this.warehouseId = warehouseId;
	}


	@Column(name="WAREHOUSE_NAME")
	public String getWarehouseName() {
		return this.warehouseName;
	}

	public void setWarehouseName(String warehouseName) {
		this.warehouseName = warehouseName;
	}

	@Column(name="OPERATOR_ID")
	public Integer getOperatorId() {
		return this.operatorId;
	}

	public void setOperatorId(Integer operatorId) {
		this.operatorId = operatorId;
	}


	@Column(name="OPERATOR_NAME")
	public String getOperatorName() {
		return this.operatorName;
	}

	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}
	
	@Column(name="STORAGE_CLASS")
	public String getStorageClass() {
		return this.storageClass;
	}

	public void setStorageClass(String storageClass) {
		this.storageClass = storageClass;
	}
	
	@Column(name="STORAGE_CLASS_ID")
	public Integer getStorageClassId() {
		return this.storageClassId;
	}

	public void setStorageClassId(Integer storageClassId) {
		this.storageClassId = storageClassId;
	}
	
	@Column(name="ENTRUST_NO")
	public String getEntrustNo() {
		return this.entrustNo;
	}

	public void setEntrustNo(String entrustNo) {
		this.entrustNo = entrustNo;
	}
    
	@Column(name="CARGO_OWNER_ID")
	public Integer getCargoOwnerId() {
		return cargoOwnerId;
	}


	public void setCargoOwnerId(Integer cargoOwnerId) {
		this.cargoOwnerId = cargoOwnerId;
	}

	@Column(name="CARGO_OWNER_CODE")
	public String getCargoOwnerCode() {
		return cargoOwnerCode;
	}


	public void setCargoOwnerCode(String cargoOwnerCode) {
		this.cargoOwnerCode = cargoOwnerCode;
	}

	@Column(name="CARGO_OWNER_NAME")
	public String getCargoOwnerName() {
		return cargoOwnerName;
	}


	public void setCargoOwnerName(String cargoOwnerName) {
		this.cargoOwnerName = cargoOwnerName;
	}

	@Column(name="ORDER_STATUS")
	public Integer getOrderStatus() {
		return orderStatus;
	}

	
	public void setOrderStatus(Integer orderStatus) {
		this.orderStatus = orderStatus;
	}
	
	
	
	@Column(name="AUDI_STATUS")
	public Integer getAudiStatus() {
		return audiStatus;
	}


	public void setAudiStatus(Integer audiStatus) {
		this.audiStatus = audiStatus;
	}


	@Column(name="CONTAINER_QUANTITY")
	public Integer getContainerQuantity() {
		return containerQuantity;
	}

	
	public void setContainerQuantity(Integer containerQuantity) {
		this.containerQuantity = containerQuantity;
	}

	@Column(name="ACCOUNT_ID")
	public Integer getAccountId() {
		return accountId;
	}

	
	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}

	@Column(name="ACCOUNT_CODE")
	public String getAccountCode() {
		return accountCode;
	}

	
	public void setAccountCode(String accountCode) {
		this.accountCode = accountCode;
	}

	@Column(name="ACCOUNT_NAME")
	public String getAccountName() {
		return accountName;
	}

	
	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	@Column(name="ACCOUNT_CONTACT")
	public String getAccountContact() {
		return accountContact;
	}

	
	public void setAccountContact(String accountContact) {
		this.accountContact = accountContact;
	}

	@Column(name="INVOICE_NO")
	public String getInvoiceNo() {
		return invoiceNo;
	}

	
	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	@Column(name="VOLUME")
	public Double getVolume() {
		return volume;
	}


	public void setVolume(Double volume) {
		this.volume = volume;
	}

	@Column(name="V_UNIT_ID")
	public Integer getvUnitId() {
		return vUnitId;
	}


	public void setvUnitId(Integer vUnitId) {
		this.vUnitId = vUnitId;
	}

	@Column(name="V_UNIT_NAME")
	public String getvUnitName() {
		return vUnitName;
	}


	public void setvUnitName(String vUnitName) {
		this.vUnitName = vUnitName;
	}

	@Column(name="STORAGE_FLAG")
	public Byte getStorageFlag() {
		return storageFlag;
	}


	public void setStorageFlag(Byte storageFlag) {
		this.storageFlag = storageFlag;
	}
	
	@Column(name="TANK_NUM")
	public Integer getTankNum() {
		return tankNum;
	}


	public void setTankNum(Integer tankNum) {
		this.tankNum = tankNum;
	}

	@Column(name="TANK_TYPE")
	public String getTankType() {
		return tankType;
	}


	public void setTankType(String tankType) {
		this.tankType = tankType;
	}
	
	@Column(name="ACTION_GATEGORY_ID")
	public Integer getActionGategoryId() {
		return actionGategoryId;
	}


	public void setActionGategoryId(Integer actionGategoryId) {
		this.actionGategoryId = actionGategoryId;
	}

	@Column(name="ACTION_GATEGORY")
	public String getActionGategory() {
		return actionGategory;
	}


	public void setActionGategory(String actionGategory) {
		this.actionGategory = actionGategory;
	}
	
	

	@Column(name="TRUCK_NUMBER")
	public String getTruckNumber() {
		return truckNumber;
	}


	public void setTruckNumber(String truckNumber) {
		this.truckNumber = truckNumber;
	}

	@Column(name="TRANS_CARRIER")
	public String getTransCarrier() {
		return transCarrier;
	}


	public void setTransCarrier(String transCarrier) {
		this.transCarrier = transCarrier;
	}	
	
	@Column(name="TRANS_REMARKS")
	public String getTransRemarks() {
		return transRemarks;
	}


	public void setTransRemarks(String transRemarks) {
		this.transRemarks = transRemarks;
	}
	
	@Column(name="TRANS_CARRIER_ID")
	public String getTransCarrierId() {
		return transCarrierId;
	}

	public void setTransCarrierId(String transCarrierId) {
		this.transCarrierId = transCarrierId;
	}
	
	@Column(name="COUNTRY_OF_GOAL")
	public String getCountryOfGoal() {
		return countryOfGoal;
	}

	public void setCountryOfGoal(String countryOfGoal) {
		this.countryOfGoal = countryOfGoal;
	}
	@Column(name="PATE_REMARK")
	public String getPateRemark() {
		return pateRemark;
	}

	public void setPateRemark(String pateRemark) {
		this.pateRemark = pateRemark;
	}
	@Column(name="DELI_NAME")
	public String getDeliName() {
		return deliName;
	}

	public void setDeliName(String deliName) {
		this.deliName = deliName;
	}
	@Column(name="DELI_REMARK")
	public String getDeliRemark() {
		return deliRemark;
	}

	public void setDeliRemark(String deliRemark) {
		this.deliRemark = deliRemark;
	}
	@Column(name="TRUCK_TYPE")
	public String getTruckType() {
		return truckType;
	}

	public void setTruckType(String truckType) {
		this.truckType = truckType;
	}
	@Column(name="DRIVER")
	public String getDriver() {
		return driver;
	}

	public void setDriver(String driver) {
		this.driver = driver;
	}
	

	
	/////////////////////以下这些为虚似字段，是为了做费用统计时用的。
	
	

	@Transient
	public Double getSumR() {
		return sumR;
	}

	public void setSumR(Double sumR) {
		this.sumR = sumR;
	}

	@Transient
	public Double getSumP() {
		return sumP;
	}

	public void setSumP(Double sumP) {
		this.sumP = sumP;
	}

	@Transient
	public Double getGrossProfit() {
		return grossProfit;
	}

	public void setGrossProfit(Double grossProfit) {
		this.grossProfit = grossProfit;
	}

	@Transient
	public String getGrossProfitRate() {
		return grossProfitRate;
	}

	public void setGrossProfitRate(String grossProfitRate) {
		this.grossProfitRate = grossProfitRate;
	}

	@Transient
	public Double getSumRUsd() {
		return sumRUsd;
	}

	public void setSumRUsd(Double sumRUsd) {
		this.sumRUsd = sumRUsd;
	}

	@Transient
	public Double getSumRCny() {
		return sumRCny;
	}

	public void setSumRCny(Double sumRCny) {
		this.sumRCny = sumRCny;
	}

	@Transient
	public Double getCnyGrossProfit() {
		return this.sumRCny - this.sumPCny;
	}

	public void setCnyGrossProfit(Double cnyGrossProfit) {
		this.cnyGrossProfit = cnyGrossProfit;
	}
	
	@Transient
	public Double getUsdGrossProfit() {
		return sumRUsd - sumPUsd;
	}

	public void setUsdGrossProfit(Double usdGrossProfit) {
		this.usdGrossProfit = usdGrossProfit;
	}
	
	@Transient
	public Double getOtherGrossProfit() {
		return this.otherGrossProfit;
	}

	public void setOtherGrossProfit(Double otherGrossProfit) {
		this.otherGrossProfit = otherGrossProfit;
	}
	
	@Transient
	public Double getSumROther() {
		return this.sumR - this.sumRCny - this.sumRUsd;
	}

	public void setSumROther(Double sumROther) {
		this.sumROther = sumROther;
	}
	
	@Transient
	public Double getSumPUsd() {
		return sumPUsd;
	}

	public void setSumPUsd(Double sumPUsd) {
		this.sumPUsd = sumPUsd;
	}

	@Transient
	public Double getSumPCny() {
		return sumPCny;
	}

	public void setSumPCny(Double sumPCny) {
		this.sumPCny = sumPCny;
	}

	@Transient
	public Double getSumPOther() {
		return this.sumP-this.sumPUsd-this.sumPCny;
		
	}

	public void setSumPOther(Double sumPOther) {
		this.sumPOther = sumPOther;
	}


	@Transient
	public Double getSumRUsdInvoice() {
		return sumRUsdInvoice;
	}

	public void setSumRUsdInvoice(Double sumRUsdInvoice) {
		this.sumRUsdInvoice = sumRUsdInvoice;
	}

	@Transient
	public Double getSumRCnyInvoice() {
		return sumRCnyInvoice;
	}

	public void setSumRCnyInvoice(Double sumRCnyInvoice) {
		this.sumRCnyInvoice = sumRCnyInvoice;
	}

	@Transient
	public Double getSumPUsdInvoice() {
		return sumPUsdInvoice;
	}

	public void setSumPUsdInvoice(Double sumPUsdInvoice) {
		this.sumPUsdInvoice = sumPUsdInvoice;
	}

	@Transient
	public Double getSumPCnyInvoice() {
		return sumPCnyInvoice;
	}

	public void setSumPCnyInvoice(Double sumPCnyInvoice) {
		this.sumPCnyInvoice = sumPCnyInvoice;
	}

	@Transient
	public Double getSumRUsdWriteOff() {
		return sumRUsdWriteOff;
	}

	public void setSumRUsdWriteOff(Double sumRUsdWriteOff) {
		this.sumRUsdWriteOff = sumRUsdWriteOff;
	}

	@Transient
	public Double getSumRCnyWriteOff() {
		return sumRCnyWriteOff;
	}

	public void setSumRCnyWriteOff(Double sumRCnyWriteOff) {
		this.sumRCnyWriteOff = sumRCnyWriteOff;
	}

	@Transient
	public Double getSumPUsdWriteOff() {
		return sumPUsdWriteOff;
	}

	public void setSumPUsdWriteOff(Double sumPUsdWriteOff) {
		this.sumPUsdWriteOff = sumPUsdWriteOff;
	}

	@Transient
	public Double getSumPCnyWriteOff() {
		return sumPCnyWriteOff;
	}

	public void setSumPCnyWriteOff(Double sumPCnyWriteOff) {
		this.sumPCnyWriteOff = sumPCnyWriteOff;
	}

	

	@Transient
	public Short getEditable() {
		return editable;
	}

	public void setEditable(Short editable) {
		this.editable = editable;
	}

}