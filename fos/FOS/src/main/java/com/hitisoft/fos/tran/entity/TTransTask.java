package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.math.BigDecimal;
import java.util.Date;

/**
 * The persistent class for the t_trans_task database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "T_TRANS_TASK")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TTransTask extends com.hitisoft.fw.orm.jpa.BaseDomain implements
		Serializable {
	private static final long serialVersionUID = 1L;
	private Date arriveTime;
	private Date arriveTimeDemand;
	private Date backTime;
	private String containerNo;
	private String cotyCode;
	private String cargoName;
	private Integer driverId;
	private String driverName;
	private String driverTel;
	private BigDecimal grossWeight;
	private Date leaveTime;
	private Date loadTime;
	private BigDecimal measurement;
	private String packName;
	private Integer packages;
	private Integer placeFromId;
	private String placeFromName;
	private Integer placeToId;
	private String placeToName;
	private String remarks;
	private String sealNo;
	private String startStation;
	private String endStation;
	private String consigneeName;
	private String consigneeContact;
	private String consigneeMobile;
	private String transTaskNo;
	private Integer vehicleId;
	private String vehicleNo;
	private Integer status;
	private String motorcadeContact;
	private Integer motorcadeId;
	private String motorcadeName;
	private String motorcadeTel;
	private Date startDate;
	private Date endDate;
	private Date requArrivalDate;
	private Date expcArrivalDate;
	private BigDecimal emptyMiles;
	private BigDecimal heavyMiles;
	private String pateName;
	// 体积合计
	private BigDecimal volume;

	private String sumT;
	private Long sumStartDate;
	private BigDecimal sumGrossWeight;
	private BigDecimal sumDistance;

	private String premiumNumber;
	private Date premiumDateFrom;
	private Date premiumDateTo;
	private BigDecimal premiumExpense;
	private String premiumCompany;

	private BigDecimal motorcadeExpense;
	// 现付-运费
	private BigDecimal expenseXff;
	// 到付-运费
	private BigDecimal expenseDff;
	// 回单付-运费
	private BigDecimal expenseHdf;
	// 月结-运费
	private BigDecimal expenseYjf;
	// 代收运费
	private BigDecimal expenseHkf;
	// 业务类型'T'
	private String consBizType;
	/* 费用 0：未确认 1：已确认 */
	private Integer consStatusExp;
	private String consBizClass;
	// 付款结算提交到费用结算,状态0：未提交1：已提交
	private Integer expeSubmitStatus;
	/* 单票审核状态 0：未审核 1：已审核 */
	private Byte consStatusAud;
	// 0：不可编辑1：可编辑
	private Short editable;
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

	private Date orderDate;
	/* 生成回单状态 0:未生成回单 1:生成回单 */
	private Integer receiptStatus;

	private Date distrDate;
	private String distrMethod;
	private BigDecimal distrExpense;
	
	public TTransTask() {

	}

	@Column(name = "DISTR_EXPENSE")
	public BigDecimal getDistrExpense() {
		return this.distrExpense;
	}

	public void setDistrExpense(BigDecimal distrExpense) {
		this.distrExpense = distrExpense;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "DISTR_DATE")
	public Date getDistrDate() {
		return this.distrDate;
	}

	public void setDistrDate(Date distrDate) {
		this.distrDate = distrDate;
	}

	@Column(name = "DISTR_METHOD")
	public String getDistrMethod() {
		return this.distrMethod;
	}

	public void setDistrMethod(String distrMethod) {
		this.distrMethod = distrMethod;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "ORDER_DATE")
	public Date getOrderDate() {
		return this.orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	@Transient
	public Short getEditable() {
		return this.editable;
	}

	public void setEditable(Short editable) {
		this.editable = editable;
	}

	@Column(name = "CONS_STATUS_AUD")
	public Byte getConsStatusAud() {
		return this.consStatusAud;
	}

	public void setConsStatusAud(Byte consStatusAud) {
		this.consStatusAud = consStatusAud;
	}

	@Column(name = "RECEIPT_STATUS")
	public Integer getReceiptStatus() {
		return receiptStatus;
	}

	public void setReceiptStatus(Integer receiptStatus) {
		this.receiptStatus = receiptStatus;
	}

	@Transient
	public Double getSumR() {
		return this.sumR;
	}

	public void setSumR(Double sumR) {
		this.sumR = sumR;
	}

	@Transient
	public Double getSumP() {
		return this.sumP;
	}

	public void setSumP(Double sumP) {
		this.sumP = sumP;
	}

	@Transient
	public Double getGrossProfit() {
		return this.grossProfit;
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
		return this.sumRUsd - this.sumPUsd;
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
		return sumPOther;
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

	@Column(name = "MOTORCADE_EXPENSE")
	public BigDecimal getMotorcadeExpense() {
		return motorcadeExpense;
	}

	public void setMotorcadeExpense(BigDecimal motorcadeExpense) {
		this.motorcadeExpense = motorcadeExpense;
	}

	@Column(name = "EXPE_SUBMIT_STATUS")
	public Integer getExpeSubmitStatus() {
		return expeSubmitStatus;
	}

	public void setExpeSubmitStatus(Integer expeSubmitStatus) {
		this.expeSubmitStatus = expeSubmitStatus;
	}

	@Column(name = "CONS_BIZ_CLASS")
	public String getConsBizClass() {
		return this.consBizClass;
	}

	public void setConsBizClass(String consBizClass) {
		this.consBizClass = consBizClass;
	}

	@Column(name = "CONS_BIZ_TYPE")
	public String getConsBizType() {
		return this.consBizType;
	}

	public void setConsBizType(String consBizType) {
		this.consBizType = consBizType;
	}

	@Column(name = "CONS_STATUS_EXP")
	public Integer getConsStatusExp() {
		return this.consStatusExp;
	}

	public void setConsStatusExp(Integer consStatusExp) {
		this.consStatusExp = consStatusExp;
	}

	@Column(name = "EXPENSE_HKF")
	public BigDecimal getExpenseHkf() {
		return expenseHkf;
	}

	public void setExpenseHkf(BigDecimal ExpenseHkf) {
		this.expenseHkf = ExpenseHkf;
	}

	@Column(name = "EXPENSE_YJF")
	public BigDecimal getExpenseYjf() {
		return expenseYjf;
	}

	public void setExpenseYjf(BigDecimal expenseYjf) {
		this.expenseYjf = expenseYjf;
	}

	@Column(name = "EXPENSE_XFF")
	public BigDecimal getExpenseXff() {
		return expenseXff;
	}

	public void setExpenseXff(BigDecimal expenseXff) {
		this.expenseXff = expenseXff;
	}

	@Column(name = "EXPENSE_DFF")
	public BigDecimal getExpenseDff() {
		return expenseDff;
	}

	public void setExpenseDff(BigDecimal expenseDff) {
		this.expenseDff = expenseDff;
	}

	@Column(name = "EXPENSE_HDF")
	public BigDecimal getExpenseHdf() {
		return expenseHdf;
	}

	public void setExpenseHdf(BigDecimal expenseHdf) {
		this.expenseHdf = expenseHdf;
	}

	@Column(name = "START_DATE")
	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	@Column(name = "END_DATE")
	public Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	@Column(name = "CONSIGNEE_NAME")
	public String getConsigneeName() {
		return consigneeName;
	}

	public void setConsigneeName(String consigneeName) {
		this.consigneeName = consigneeName;
	}

	@Column(name = "CONSIGNEE_CONTACT")
	public String getConsigneeContact() {
		return consigneeContact;
	}

	public void setConsigneeContact(String consigneeContact) {
		this.consigneeContact = consigneeContact;
	}

	@Column(name = "CONSIGNEE_MOBILE")
	public String getConsigneeMobile() {
		return consigneeMobile;
	}

	public void setConsigneeMobile(String consigneeMobile) {
		this.consigneeMobile = consigneeMobile;
	}

	@Column(name = "REQU_ARRIVAL_DATE")
	public Date getRequArrivalDate() {
		return requArrivalDate;
	}

	public void setRequArrivalDate(Date requArrivalDate) {
		this.requArrivalDate = requArrivalDate;
	}

	@Column(name = "EXPC_ARRIVAL_DATE")
	public Date getExpcArrivalDate() {
		return expcArrivalDate;
	}

	public void setExpcArrivalDate(Date expcArrivalDate) {
		this.expcArrivalDate = expcArrivalDate;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "ARRIVE_TIME")
	public Date getArriveTime() {
		return this.arriveTime;
	}

	public void setArriveTime(Date arriveTime) {
		this.arriveTime = arriveTime;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "ARRIVE_TIME_DEMAND")
	public Date getArriveTimeDemand() {
		return this.arriveTimeDemand;
	}

	public void setArriveTimeDemand(Date arriveTimeDemand) {
		this.arriveTimeDemand = arriveTimeDemand;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "BACK_TIME")
	public Date getBackTime() {
		return this.backTime;
	}

	public void setBackTime(Date backTime) {
		this.backTime = backTime;
	}

	@Column(name = "CARGO_NAME")
	public String getCargoName() {
		return this.cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}

	@Column(name = "CONTAINER_NO")
	public String getContainerNo() {
		return this.containerNo;
	}

	public void setContainerNo(String containerNo) {
		this.containerNo = containerNo;
	}

	@Column(name = "COTY_CODE")
	public String getCotyCode() {
		return this.cotyCode;
	}

	public void setCotyCode(String cotyCode) {
		this.cotyCode = cotyCode;
	}

	@Column(name = "DRIVER_ID")
	public Integer getDriverId() {
		return this.driverId;
	}

	public void setDriverId(Integer driverId) {
		this.driverId = driverId;
	}

	@Column(name = "DRIVER_NAME")
	public String getDriverName() {
		return this.driverName;
	}

	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}

	@Column(name = "DRIVER_TEL")
	public String getDriverTel() {
		return this.driverTel;
	}

	public void setDriverTel(String driverTel) {
		this.driverTel = driverTel;
	}

	@Column(name = "GROSS_WEIGHT")
	public BigDecimal getGrossWeight() {
		return this.grossWeight;
	}

	public void setGrossWeight(BigDecimal grossWeight) {
		this.grossWeight = grossWeight;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "LEAVE_TIME")
	public Date getLeaveTime() {
		return this.leaveTime;
	}

	public void setLeaveTime(Date leaveTime) {
		this.leaveTime = leaveTime;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "LOAD_TIME")
	public Date getLoadTime() {
		return this.loadTime;
	}

	public void setLoadTime(Date loadTime) {
		this.loadTime = loadTime;
	}

	@Column(name = "MEASUREMENT")
	public BigDecimal getMeasurement() {
		return this.measurement;
	}

	public void setMeasurement(BigDecimal measurement) {
		this.measurement = measurement;
	}

	@Column(name = "VOLUME")
	public BigDecimal getVolume() {
		return this.volume;
	}

	public void setVolume(BigDecimal volume) {
		this.volume = volume;
	}

	@Column(name = "PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}

	@Column(name = "PACKAGES")
	public Integer getPackages() {
		return this.packages;
	}

	public void setPackages(Integer packages) {
		this.packages = packages;
	}

	@Column(name = "PLACE_FROM_ID")
	public Integer getPlaceFromId() {
		return this.placeFromId;
	}

	public void setPlaceFromId(Integer placeFromId) {
		this.placeFromId = placeFromId;
	}

	@Column(name = "PLACE_FROM_NAME")
	public String getPlaceFromName() {
		return this.placeFromName;
	}

	public void setPlaceFromName(String placeFromName) {
		this.placeFromName = placeFromName;
	}

	@Column(name = "PLACE_TO_ID")
	public Integer getPlaceToId() {
		return this.placeToId;
	}

	public void setPlaceToId(Integer placeToId) {
		this.placeToId = placeToId;
	}

	@Column(name = "PLACE_TO_NAME")
	public String getPlaceToName() {
		return this.placeToName;
	}

	public void setPlaceToName(String placeToName) {
		this.placeToName = placeToName;
	}

	@Column(name = "REMARKS")
	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Column(name = "SEAL_NO")
	public String getSealNo() {
		return this.sealNo;
	}

	public void setSealNo(String sealNo) {
		this.sealNo = sealNo;
	}

	@Column(name = "TRANS_TASK_NO")
	public String getTransTaskNo() {
		return this.transTaskNo;
	}

	public void setTransTaskNo(String transTaskNo) {
		this.transTaskNo = transTaskNo;
	}

	@Column(name = "VEHICLE_ID")
	public Integer getVehicleId() {
		return this.vehicleId;
	}

	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}

	@Column(name = "VEHICLE_NO")
	public String getVehicleNo() {
		return this.vehicleNo;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}

	@Column(name = "STATUS")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Column(name = "MOTORCADE_CONTACT")
	public String getMotorcadeContact() {
		return this.motorcadeContact;
	}

	public void setMotorcadeContact(String motorcadeContact) {
		this.motorcadeContact = motorcadeContact;
	}

	@Column(name = "MOTORCADE_ID")
	public Integer getMotorcadeId() {
		return this.motorcadeId;
	}

	public void setMotorcadeId(Integer motorcadeId) {
		this.motorcadeId = motorcadeId;
	}

	@Column(name = "MOTORCADE_NAME")
	public String getMotorcadeName() {
		return this.motorcadeName;
	}

	public void setMotorcadeName(String motorcadeName) {
		this.motorcadeName = motorcadeName;
	}

	@Column(name = "MOTORCADE_TEL")
	public String getMotorcadeTel() {
		return this.motorcadeTel;
	}

	public void setMotorcadeTel(String motorcadeTel) {
		this.motorcadeTel = motorcadeTel;
	}

	@Column(name = "EMPTY_MILES")
	public BigDecimal getEmptyMiles() {
		return this.emptyMiles;
	}

	public void setEmptyMiles(BigDecimal emptyMiles) {
		this.emptyMiles = emptyMiles;
	}

	@Column(name = "HEAVY_MILES")
	public BigDecimal getHeavyMiles() {
		return this.heavyMiles;
	}

	public void setHeavyMiles(BigDecimal heavyMiles) {
		this.heavyMiles = heavyMiles;
	}

	@Column(name = "PATE_NAME")
	public String getPateName() {
		return this.pateName;
	}

	public void setPateName(String pateName) {
		this.pateName = pateName;
	}

	@Transient
	public Long getSumStartDate() {
		return sumStartDate;
	}

	public void setSumStartDate(Long sumStartDate) {
		this.sumStartDate = sumStartDate;
	}

	@Transient
	public BigDecimal getSumGrossWeight() {
		return sumGrossWeight;
	}

	public void setSumGrossWeight(BigDecimal sumGrossWeight) {
		this.sumGrossWeight = sumGrossWeight;
	}

	@Transient
	public BigDecimal getSumDistance() {
		return sumDistance;
	}

	public void setSumDistance(BigDecimal sumDistance) {
		this.sumDistance = sumDistance;
	}

	@Transient
	public String getSumT() {
		return sumT;
	}

	public void setSumT(String sumT) {
		this.sumT = sumT;
	}

	@Column(name = "PREMIUM_NUMBER")
	public String getPremiumNumber() {
		return this.premiumNumber;
	}

	public void setPremiumNumber(String premiumNumber) {
		this.premiumNumber = premiumNumber;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "PREMIUM_DATE_FROM")
	public Date getPremiumDateFrom() {
		return this.premiumDateFrom;
	}

	public void setPremiumDateFrom(Date premiumDateFrom) {
		this.premiumDateFrom = premiumDateFrom;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "PREMIUM_DATE_TO")
	public Date getPremiumDateTo() {
		return this.premiumDateTo;
	}

	public void setPremiumDateTo(Date premiumDateTo) {
		this.premiumDateTo = premiumDateTo;
	}

	@Column(name = "PREMIUM_EXPENSE")
	public BigDecimal getPremiumExpense() {
		return this.premiumExpense;
	}

	public void setPremiumExpense(BigDecimal premiumExpense) {
		this.premiumExpense = premiumExpense;
	}

	@Column(name = "PREMIUM_COMPANY")
	public String getPremiumCompany() {
		return this.premiumCompany;
	}

	public void setPremiumCompany(String premiumCompany) {
		this.premiumCompany = premiumCompany;
	}

	@Column(name = "START_STATION")
	public String getStartStation() {
		return startStation;
	}

	public void setStartStation(String startStation) {
		this.startStation = startStation;
	}

	@Column(name = "END_STATION")
	public String getEndStation() {
		return endStation;
	}

	public void setEndStation(String endStation) {
		this.endStation = endStation;
	}

}