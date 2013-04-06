package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import java.math.BigDecimal;
import java.util.Date;

/**
 * The persistent class for the t_consign database table.
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "T_CONSIGN")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TConsign extends com.hitisoft.fw.orm.jpa.BaseDomain implements
		Serializable {
	private static final long serialVersionUID = 1L;

	// 接单日期
	private Date consDate;
	// 运单号
	private String consNo;
	// 手工单号
	private String consNoHandler;
	// 业务部门ID
	private Long grouId;
	// 业务部门
	private String grouName;
	// 业务员ID
	private Long salesRepId;
	// 业务员名称
	private String salesRepName;
	// 操作员ID
	private Long consOperatorId;
	// 操作员
	private String consOperatorName;
	// 合同号
	private String contractNo;
	// 合同有效期
	private Date contractDate;
	// 0：不可编辑1：可编辑(虚拟字段)
	private Short editable;

	// 委托单位ID
	private Integer custId;
	// 委托单位
	private String custName;
	private String custSname;
	// 委托单位座机电话
	private String custTel;
	// 委托单位联系人
	private String custContact;
	// 委托单位联系人手机号
	private String custMobile;
	// 委托单位传真
	private String custFax;

	// 提货日期
	private Date loadDate;
	// 提货联系人
	private String loadContact;
	// 提货地点
	private String loadPlaceName;
	// 提货地址
	private String loadAddress;
	// 提货联系电话
	private String loadTel;

	// 发货单位ID
	private Integer shipperId;
	// 发货单位
	private String shipperName;
	// 发货联系人
	private String shipperContact;
	// 发货人手机号
	private String shipperMobile;
	// 发货人电话
	private String shipperTel;
	// 发货人电话
	private String shipperFax;
	// 发货地址
	private String shipperAddress;

	// 发货点
	private String startStation;
	// 中转点
	private String routeStation;
	// 收货点
	private String endStation;

	// 收货单位ID
	private Integer consigneeId;
	// 收货单位
	private String consigneeName;
	// 收货联系人
	private String consigneeContact;
	// 收货人手机号
	private String consigneeMobile;
	// 收货联系人固话
	private String consigneeTel;
	// 收货单位传真
	private String consigneeFax;
	// 收货地址
	private String consigneeAddress;

	private String deliveryAddress;
	private Integer deliveryPlaceId;
	private String deliveryPlaceName;
	private Integer deliveryCityId;
	private String deliveryCity;

	// 司机ID
	private Integer driverId;
	// 司机
	private String driverName;
	// 司机电话
	private String driverTel;
	// 车辆ID
	private Integer vehicleId;
	// 车牌号
	private String vehicleNo;
	// 运输方式
	private String transportWay;
	// 车辆类型
	private String transportVehicle;
	// 空载公里数
	private BigDecimal emptyMiles;
	// 重载公里数
	private BigDecimal heavyMiles;

	// 车队ID
	private Integer motorcadeId;
	// 车队
	private String motorcadeName;
	// 车队编号
	private String motorcadeNo;
	// 车队联系人
	private String motorcadeContact;
	// 车队电话
	private String motorcadeTel;
	// 车队传真
	private String motorcadeFax;
	// 车队地址
	private String motorcadeAddress;

	// 到货日期
	private Date arNewDate;
	// 发车日期
	private Date startDate;
	// 完成日期
	private Date endDate;
	// 要求到站日期
	private Date requArrivalDate;
	// 预计到站日期
	private Date expcArrivalDate;
	// 配送方式
	private String distrMethod;
	// 签收人
	private String signInContact;
	// 签收日期
	private Date signInDate;
	/* 是否签收0：没有签收 1：已签收 */
	private Integer signInStatus;
	// 回访电话
	private String feedbackTel;
	// 回单日期
	private Date feedbackDate;
	// 回单类型
	private String feedbackWay;
	// 回单份数
	private String feedbackNumber;
	/* 生成回单状态 0:未生成回单 1:生成回单 */
	private Integer receiptStatus;
	// 是否破损
	private Integer demageStatus;
	// 货物状况
	private String cargoRemarks;
	// 备注
	private String remarks;

	// 保险日期（从）
	private Date premiumDateFrom;
	// 保险日期（到）
	private Date premiumDateTo;
	// 保费率
	private BigDecimal premiumRate;
	// 保单号
	private String premiumNumber;
	// 保险公司
	private String premiumCompany;

	/*
	 * 货物状态1：新增;2：提货;3: 到货;4：部分发车;5：全部发车; 6：部分到站;7：全部到站;8：部分签收;9：全部签收
	 */
	private Integer status;
	// 业务类型'T'
	private String consBizType;
	/* 业务类别 陆运：O;派车：T;配送：P */
	private String consBizClass;

	// 面积
	private BigDecimal measurement;
	// 净重
	private BigDecimal netWeightProvider;
	// 件数合计
	private Integer packages;
	// 毛重合计
	private BigDecimal grossWeight;
	// 体积合计
	private BigDecimal volume;
	// 已派车数量
	private Integer dispatchPackages;
	// 已发车数量
	private Integer departurePackages;
	// 已到站数量
	private Integer stationPackages;
	// 已签收数量
	private Integer signPackages;

	// 订单编号
	private String orderNo;
	// 货物名称
	private String cargoName;
	// 包装种类
	private String packName;
	// 货物类别ID
	private Integer cargoClassId;
	// 货物类别
	private String cargoClassName;
	// 货物价值
	private BigDecimal premiumValue;

	// 付款方式
	private String payMethod;
	// 收款结算提交到费用结算,状态0：未提交1：已提交
	private Integer expeSubmitStatus;
	/* 费用 0：未确认 1：已确认 */
	private Integer consStatusExp;
	// 保费
	private BigDecimal premiumExpense;
	// 提货费
	private BigDecimal loadExpense;
	// 仓储费
	private BigDecimal storehouseExpense;
	// 代垫费
	private BigDecimal agencyReceiveExpense;
	// 其他费
	private BigDecimal otherExpense;
	// 现付
	private BigDecimal expenseSpot;
	// 到付
	private BigDecimal expenseFreight;
	// 回单付
	private BigDecimal expenseReceipt;
	// 月结
	private BigDecimal expenseMonth;
	// 中转回扣
	private BigDecimal expenseDiscount;

	// 陆运：总费用；派车：物流费；配送：配送费
	private BigDecimal expenseTotal;

	private Byte consStatus;
	/* 应收核销状态 0：未核销 1：部分核销 2：全部核销 */
	private Byte consStatusAr;
	/* 应付核销状态 0：未核销 1：部分核销 2：全部核销 */
	private Byte consStatusAp;
	/* 应收开票状态 0：未开票 1：部分开票 2：全部开票 */
	private Byte consStatusInvoR;
	/* 应付开票状态 0：未开票 1：部分开票 2：全部开票 */
	private Byte consStatusInvoP;
	/* 单票审核状态 0：未审核 1：已审核 */
	private Byte consStatusAud;
	/* 单票锁定状态 0：结算锁定（由费用录入完成确认时锁定） 1：财务经理锁定（单票审核时锁定） */
	private Byte consStatusLock;

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

	private String sumMonth;
	private Long sumConsNo;
	private Long sumPackages;
	private BigDecimal sumGrossWeight;

	public TConsign() {

	}

	@Column(name = "CONS_BIZ_CLASS")
	public String getConsBizClass() {
		return this.consBizClass;
	}

	public void setConsBizClass(String consBizClass) {
		this.consBizClass = consBizClass;
	}

	@Column(name = "NET_WEIGHT_PROVIDER")
	public BigDecimal getNetWeightProvider() {
		return netWeightProvider;
	}

	public void setNetWeightProvider(BigDecimal netWeightProvider) {
		this.netWeightProvider = netWeightProvider;
	}

	@Column(name = "EXPE_SUBMIT_STATUS")
	public Integer getExpeSubmitStatus() {
		return expeSubmitStatus;
	}

	public void setExpeSubmitStatus(Integer expeSubmitStatus) {
		this.expeSubmitStatus = expeSubmitStatus;
	}

	@Column(name = "EXPENSE_TOTAL")
	public BigDecimal getExpenseTotal() {
		return expenseTotal;
	}

	public void setExpenseTotal(BigDecimal expenseTotal) {
		this.expenseTotal = expenseTotal;
	}

	@Column(name = "CONS_NO_HANDLER")
	public String getConsNoHandler() {
		return consNoHandler;
	}

	public void setConsNoHandler(String consNoHandler) {
		this.consNoHandler = consNoHandler;
	}

	@Column(name = "CARGO_NAME")
	public String getCargoName() {
		return this.cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_DATE")
	public Date getConsDate() {
		return this.consDate;
	}

	public void setConsDate(Date consDate) {
		this.consDate = consDate;
	}

	@Column(name = "CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Column(name = "CONTRACT_NO")
	public String getContractNo() {
		return this.contractNo;
	}

	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}

	@Column(name = "CUST_CONTACT")
	public String getCustContact() {
		return this.custContact;
	}

	public void setCustContact(String custContact) {
		this.custContact = custContact;
	}

	@Column(name = "CUST_FAX")
	public String getCustFax() {
		return this.custFax;
	}

	public void setCustFax(String custFax) {
		this.custFax = custFax;
	}

	@Column(name = "CUST_ID")
	public Integer getCustId() {
		return this.custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}

	@Column(name = "CUST_NAME")
	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	@Column(name = "CUST_SNAME")
	public String getCustSname() {
		return this.custSname;
	}

	public void setCustSname(String custSname) {
		this.custSname = custSname;
	}

	@Column(name = "CUST_TEL")
	public String getCustTel() {
		return this.custTel;
	}

	public void setCustTel(String custTel) {
		this.custTel = custTel;
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

	@Column(name = "EMPTY_MILES")
	public BigDecimal getEmptyMiles() {
		return this.emptyMiles;
	}

	public void setEmptyMiles(BigDecimal emptyMiles) {
		this.emptyMiles = emptyMiles;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "END_DATE")
	public Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	@Column(name = "PACKAGES")
	public Integer getPackages() {
		return this.packages;
	}

	public void setPackages(Integer packages) {
		this.packages = packages;
	}

	@Column(name = "DISPATCH_PACKAGES")
	public Integer getDispatchPackages() {
		return this.dispatchPackages;
	}

	public void setDispatchPackages(Integer dispatchPackages) {
		this.dispatchPackages = dispatchPackages;
	}

	@Column(name = "DEPARTURE_PACKAGES")
	public Integer getDeparturePackages() {
		return this.departurePackages;
	}

	public void setDeparturePackages(Integer departurePackages) {
		this.departurePackages = departurePackages;
	}

	@Column(name = "STATION_PACKAGES")
	public Integer getStationPackages() {
		return this.stationPackages;
	}

	public void setStationPackages(Integer stationPackages) {
		this.stationPackages = stationPackages;
	}

	@Column(name = "SIGN_PACKAGES")
	public Integer getSignPackages() {
		return this.signPackages;
	}

	public void setSignPackages(Integer signPackages) {
		this.signPackages = signPackages;
	}

	@Column(name = "GROSS_WEIGHT")
	public BigDecimal getGrossWeight() {
		return this.grossWeight;
	}

	public void setGrossWeight(BigDecimal grossWeight) {
		this.grossWeight = grossWeight;
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

	@Column(name = "GROU_ID")
	public Long getGrouId() {
		return this.grouId;
	}

	public void setGrouId(Long grouId) {
		this.grouId = grouId;
	}

	@Column(name = "GROU_NAME")
	public String getGrouName() {
		return this.grouName;
	}

	public void setGrouName(String grouName) {
		this.grouName = grouName;
	}

	@Column(name = "HEAVY_MILES")
	public BigDecimal getHeavyMiles() {
		return this.heavyMiles;
	}

	public void setHeavyMiles(BigDecimal heavyMiles) {
		this.heavyMiles = heavyMiles;
	}

	@Column(name = "LOAD_ADDRESS")
	public String getLoadAddress() {
		return this.loadAddress;
	}

	public void setLoadAddress(String loadAddress) {
		this.loadAddress = loadAddress;
	}

	@Column(name = "LOAD_CONTACT")
	public String getLoadContact() {
		return this.loadContact;
	}

	public void setLoadContact(String loadContact) {
		this.loadContact = loadContact;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "LOAD_DATE")
	public Date getLoadDate() {
		return this.loadDate;
	}

	public void setLoadDate(Date loadDate) {
		this.loadDate = loadDate;
	}

	@Column(name = "LOAD_PLACE_NAME")
	public String getLoadPlaceName() {
		return this.loadPlaceName;
	}

	public void setLoadPlaceName(String loadPlaceName) {
		this.loadPlaceName = loadPlaceName;
	}

	@Column(name = "LOAD_TEL")
	public String getLoadTel() {
		return this.loadTel;
	}

	public void setLoadTel(String loadTel) {
		this.loadTel = loadTel;
	}

	@Column(name = "MOTORCADE_CONTACT")
	public String getMotorcadeContact() {
		return this.motorcadeContact;
	}

	public void setMotorcadeContact(String motorcadeContact) {
		this.motorcadeContact = motorcadeContact;
	}

	@Column(name = "MOTORCADE_FAX")
	public String getMotorcadeFax() {
		return this.motorcadeFax;
	}

	public void setMotorcadeFax(String motorcadeFax) {
		this.motorcadeFax = motorcadeFax;
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

	@Column(name = "PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}

	@Column(name = "REMARKS")
	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Column(name = "SALES_REP_ID")
	public Long getSalesRepId() {
		return this.salesRepId;
	}

	public void setSalesRepId(Long salesRepId) {
		this.salesRepId = salesRepId;
	}

	@Column(name = "SALES_REP_NAME")
	public String getSalesRepName() {
		return this.salesRepName;
	}

	public void setSalesRepName(String salesRepName) {
		this.salesRepName = salesRepName;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "START_DATE")
	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	@Column(name = "STATUS")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Column(name = "DEMAGE_STATUS")
	public Integer getDemageStatus() {
		return this.demageStatus;
	}

	public void setDemageStatus(Integer demageStatus) {
		this.demageStatus = demageStatus;
	}

	@Column(name = "CONS_STATUS_EXP")
	public Integer getConsStatusExp() {
		return this.consStatusExp;
	}

	public void setConsStatusExp(Integer consStatusExp) {
		this.consStatusExp = consStatusExp;
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

	@Column(name = "SHIPPER_ID")
	public Integer getShipperId() {
		return this.shipperId;
	}

	public void setShipperId(Integer shipperId) {
		this.shipperId = shipperId;
	}

	@Column(name = "SHIPPER_NAME")
	public String getShipperName() {
		return this.shipperName;
	}

	public void setShipperName(String shipperName) {
		this.shipperName = shipperName;
	}

	@Column(name = "SHIPPER_CONTACT")
	public String getShipperContact() {
		return this.shipperContact;
	}

	public void setShipperContact(String shipperContact) {
		this.shipperContact = shipperContact;
	}

	@Column(name = "SHIPPER_TEL")
	public String getShipperTel() {
		return this.shipperTel;
	}

	public void setShipperTel(String shipperTel) {
		this.shipperTel = shipperTel;
	}

	@Column(name = "CONSIGNEE_ID")
	public Integer getConsigneeId() {
		return this.consigneeId;
	}

	public void setConsigneeId(Integer consigneeId) {
		this.consigneeId = consigneeId;
	}

	@Column(name = "CONSIGNEE_NAME")
	public String getConsigneeName() {
		return this.consigneeName;
	}

	public void setConsigneeName(String consigneeName) {
		this.consigneeName = consigneeName;
	}

	@Column(name = "CONSIGNEE_CONTACT")
	public String getConsigneeContact() {
		return this.consigneeContact;
	}

	public void setConsigneeContact(String consigneeContact) {
		this.consigneeContact = consigneeContact;
	}

	@Column(name = "CONSIGNEE_TEL")
	public String getConsigneeTel() {
		return this.consigneeTel;
	}

	public void setConsigneeTel(String consigneeTel) {
		this.consigneeTel = consigneeTel;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONTRACT_DATE")
	public Date getContractDate() {
		return this.contractDate;
	}

	public void setContractDate(Date contractDate) {
		this.contractDate = contractDate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "AR_NEW_DATE")
	public Date getArNewDate() {
		return this.arNewDate;
	}

	public void setArNewDate(Date arNewDate) {
		this.arNewDate = arNewDate;
	}

	@Column(name = "SIGN_IN_STATUS")
	public Integer getSignInStatus() {
		return this.signInStatus;
	}

	public void setSignInStatus(Integer signInStatus) {
		this.signInStatus = signInStatus;
	}

	@Column(name = "ORDER_NO")
	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	@Column(name = "CONS_BIZ_TYPE")
	public String getConsBizType() {
		return this.consBizType;
	}

	public void setConsBizType(String consBizType) {
		this.consBizType = consBizType;
	}

	@Column(name = "SIGN_IN_CONTACT")
	public String getSignInContact() {
		return this.signInContact;
	}

	public void setSignInContact(String signInContact) {
		this.signInContact = signInContact;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "SING_IN_DATE")
	public Date getSignInDate() {
		return this.signInDate;
	}

	public void setSignInDate(Date signInDate) {
		this.signInDate = signInDate;
	}

	@Column(name = "FEEDBACK_TEL")
	public String getFeedbackTel() {
		return this.feedbackTel;
	}

	public void setFeedbackTel(String feedbackTel) {
		this.feedbackTel = feedbackTel;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "FEEDBACK_DATE")
	public Date getFeedbackDate() {
		return this.feedbackDate;
	}

	public void setFeedbackDate(Date feedbackDate) {
		this.feedbackDate = feedbackDate;
	}

	@Column(name = "CARGO_CLASS_NAME")
	public String getCargoClassName() {
		return this.cargoClassName;
	}

	public void setCargoClassName(String cargoClassName) {
		this.cargoClassName = cargoClassName;
	}

	@Column(name = "CARGO_CALSS_ID")
	public Integer getCargoClassId() {
		return this.cargoClassId;
	}

	public void setCargoClassId(Integer cargoClassId) {
		this.cargoClassId = cargoClassId;
	}

	@Column(name = "PREMIUM_VALUE")
	public BigDecimal getPremiumValue() {
		return this.premiumValue;
	}

	public void setPremiumValue(BigDecimal premiumValue) {
		this.premiumValue = premiumValue;
	}

	@Column(name = "PREMIUM_EXPENSE")
	public BigDecimal getPremiumExpense() {
		return this.premiumExpense;
	}

	public void setPremiumExpense(BigDecimal premiumExpense) {
		this.premiumExpense = premiumExpense;
	}

	@Column(name = "PREMIUM_RATE")
	public BigDecimal getPremiumRate() {
		return this.premiumRate;
	}

	public void setPremiumRate(BigDecimal premiumRate) {
		this.premiumRate = premiumRate;
	}

	@Column(name = "PREMIUM_COMPANY")
	public String getPremiumCompany() {
		return this.premiumCompany;
	}

	public void setPremiumCompany(String premiumCompany) {
		this.premiumCompany = premiumCompany;
	}

	@Column(name = "MOTORCADE_NO")
	public String getMotorcadeNo() {
		return this.motorcadeNo;
	}

	public void setMotorcadeNo(String motorcadeNo) {
		this.motorcadeNo = motorcadeNo;
	}

	@Column(name = "TRANSPORT_WAY")
	public String getTransportWay() {
		return transportWay;
	}

	public void setTransportWay(String transportWay) {
		this.transportWay = transportWay;
	}

	@Column(name = "TRANSPORT_VEHICLE")
	public String getTransportVehicle() {
		return this.transportVehicle;
	}

	public void setTransportVehicle(String transportVehicle) {
		this.transportVehicle = transportVehicle;
	}

	@Column(name = "START_STATION")
	public String getStartStation() {
		return this.startStation;
	}

	public void setStartStation(String startStation) {
		this.startStation = startStation;
	}

	@Column(name = "ROUTE_STATION")
	public String getRouteStation() {
		return this.routeStation;
	}

	public void setRouteStation(String routeStation) {
		this.routeStation = routeStation;
	}

	@Column(name = "END_STATION")
	public String getEndStation() {
		return this.endStation;
	}

	public void setEndStation(String endStation) {
		this.endStation = endStation;
	}

	@Column(name = "CUST_MOBILE")
	public String getCustMobile() {
		return this.custMobile;
	}

	public void setCustMobile(String custMobile) {
		this.custMobile = custMobile;
	}

	@Column(name = "CONSIGNEE_MOBILE")
	public String getConsigneeMobile() {
		return this.consigneeMobile;
	}

	public void setConsigneeMobile(String consigneeMobile) {
		this.consigneeMobile = consigneeMobile;
	}

	@Column(name = "FEEDBACK_WAY")
	public String getFeedbackWay() {
		return this.feedbackWay;
	}

	public void setFeedbackWay(String feedbackWay) {
		this.feedbackWay = feedbackWay;
	}

	@Column(name = "FEEDBACK_NUMBER")
	public String getFeedbackNumber() {
		return this.feedbackNumber;
	}

	public void setFeedbackNumber(String feedbackNumber) {
		this.feedbackNumber = feedbackNumber;
	}

	@Column(name = "LOAD_EXPENSE")
	public BigDecimal getLoadExpense() {
		return this.loadExpense;
	}

	public void setLoadExpense(BigDecimal loadExpense) {
		this.loadExpense = loadExpense;
	}

	@Column(name = "OTHER_EXPENSE")
	public BigDecimal getOtherExpense() {
		return this.otherExpense;
	}

	public void setOtherExpense(BigDecimal otherExpense) {
		this.otherExpense = otherExpense;
	}

	@Column(name = "AGENCY_RECEIVE_EXPENSE")
	public BigDecimal getAgencyReceiveExpense() {
		return this.agencyReceiveExpense;
	}

	public void setAgencyReceiveExpense(BigDecimal agencyReceiveExpense) {
		this.agencyReceiveExpense = agencyReceiveExpense;
	}

	@Column(name = "CONS_OPERATOR_ID")
	public Long getConsOperatorId() {
		return this.consOperatorId;
	}

	public void setConsOperatorId(Long consOperatorId) {
		this.consOperatorId = consOperatorId;
	}

	@Column(name = "CONS_OPERATOR_NAME")
	public String getConsOperatorName() {
		return this.consOperatorName;
	}

	public void setConsOperatorName(String consOperatorName) {
		this.consOperatorName = consOperatorName;
	}

	@Column(name = "CONS_STATUS")
	public Byte getConsStatus() {
		return this.consStatus;
	}

	public void setConsStatus(Byte consStatus) {
		this.consStatus = consStatus;
	}

	@Column(name = "CONS_STATUS_AR")
	public Byte getConsStatusAr() {
		return this.consStatusAr;
	}

	public void setConsStatusAr(Byte consStatusAr) {
		this.consStatusAr = consStatusAr;
	}

	@Column(name = "CONS_STATUS_AP")
	public Byte getConsStatusAp() {
		return this.consStatusAp;
	}

	public void setConsStatusAp(Byte consStatusAp) {
		this.consStatusAp = consStatusAp;
	}

	@Column(name = "CONS_STATUS_INVO_R")
	public Byte getConsStatusInvoR() {
		return this.consStatusInvoR;
	}

	public void setConsStatusInvoR(Byte consStatusInvoR) {
		this.consStatusInvoR = consStatusInvoR;
	}

	@Column(name = "CONS_STATUS_INVO_P")
	public Byte getConsStatusInvoP() {
		return this.consStatusInvoP;
	}

	public void setConsStatusInvoP(Byte consStatusInvoP) {
		this.consStatusInvoP = consStatusInvoP;
	}

	@Column(name = "CONS_STATUS_AUD")
	public Byte getConsStatusAud() {
		return this.consStatusAud;
	}

	public void setConsStatusAud(Byte consStatusAud) {
		this.consStatusAud = consStatusAud;
	}

	@Column(name = "CONS_STATUS_LOCK")
	public Byte getConsStatusLock() {
		return this.consStatusLock;
	}

	public void setConsStatusLock(Byte consStatusLock) {
		this.consStatusLock = consStatusLock;
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

	@Transient
	public Short getEditable() {
		return this.editable;
	}

	public void setEditable(Short editable) {
		this.editable = editable;
	}

	@Column(name = "SHIPPER_MOBILE")
	public String getShipperMobile() {
		return shipperMobile;
	}

	public void setShipperMobile(String shipperMobile) {
		this.shipperMobile = shipperMobile;
	}

	@Column(name = "SHIPPER_FAX")
	public String getShipperFax() {
		return shipperFax;
	}

	public void setShipperFax(String shipperFax) {
		this.shipperFax = shipperFax;
	}

	@Column(name = "SHIPPER_ADDRESS")
	public String getShipperAddress() {
		return shipperAddress;
	}

	public void setShipperAddress(String shipperAddress) {
		this.shipperAddress = shipperAddress;
	}

	@Column(name = "CONSIGNEE_FAX")
	public String getConsigneeFax() {
		return consigneeFax;
	}

	public void setConsigneeFax(String consigneeFax) {
		this.consigneeFax = consigneeFax;
	}

	@Column(name = "CONSIGNEE_ADDRESS")
	public String getConsigneeAddress() {
		return consigneeAddress;
	}

	public void setConsigneeAddress(String consigneeAddress) {
		this.consigneeAddress = consigneeAddress;
	}

	@Column(name = "DRIVER_TEL")
	public String getDriverTel() {
		return driverTel;
	}

	public void setDriverTel(String driverTel) {
		this.driverTel = driverTel;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "REQU_ARRIVAL_DATE")
	public Date getRequArrivalDate() {
		return requArrivalDate;
	}

	public void setRequArrivalDate(Date requArrivalDate) {
		this.requArrivalDate = requArrivalDate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "EXPC_ARRIVAL_DATE")
	public Date getExpcArrivalDate() {
		return expcArrivalDate;
	}

	public void setExpcArrivalDate(Date expcArrivalDate) {
		this.expcArrivalDate = expcArrivalDate;
	}

	@Column(name = "DISTR_METHOD")
	public String getDistrMethod() {
		return distrMethod;
	}

	public void setDistrMethod(String distrMethod) {
		this.distrMethod = distrMethod;
	}

	@Column(name = "RECEIPT_STATUS")
	public Integer getReceiptStatus() {
		return receiptStatus;
	}

	public void setReceiptStatus(Integer receiptStatus) {
		this.receiptStatus = receiptStatus;
	}

	@Column(name = "CARGO_REMARKS")
	public String getCargoRemarks() {
		return cargoRemarks;
	}

	public void setCargoRemarks(String cargoRemarks) {
		this.cargoRemarks = cargoRemarks;
	}

	@Column(name = "PREMIUM_DATE_FROM")
	public Date getPremiumDateFrom() {
		return premiumDateFrom;
	}

	public void setPremiumDateFrom(Date premiumDateFrom) {
		this.premiumDateFrom = premiumDateFrom;
	}

	@Column(name = "PREMIUM_DATE_TO")
	public Date getPremiumDateTo() {
		return premiumDateTo;
	}

	public void setPremiumDateTo(Date premiumDateTo) {
		this.premiumDateTo = premiumDateTo;
	}

	@Column(name = "PREMIUM_NUMBER")
	public String getPremiumNumber() {
		return premiumNumber;
	}

	public void setPremiumNumber(String premiumNumber) {
		this.premiumNumber = premiumNumber;
	}

	@Column(name = "PAY_METHOD")
	public String getPayMethod() {
		return payMethod;
	}

	public void setPayMethod(String payMethod) {
		this.payMethod = payMethod;
	}

	@Column(name = "STOREHOUSE_EXPENSE")
	public BigDecimal getStorehouseExpense() {
		return storehouseExpense;
	}

	public void setStorehouseExpense(BigDecimal storehouseExpense) {
		this.storehouseExpense = storehouseExpense;
	}

	@Column(name = "EXPENSE_SPOT")
	public BigDecimal getExpenseSpot() {
		return expenseSpot;
	}

	public void setExpenseSpot(BigDecimal expenseSpot) {
		this.expenseSpot = expenseSpot;
	}

	@Column(name = "EXPENSE_FREIGHT")
	public BigDecimal getExpenseFreight() {
		return expenseFreight;
	}

	public void setExpenseFreight(BigDecimal expenseFreight) {
		this.expenseFreight = expenseFreight;
	}

	@Column(name = "EXPENSE_RECEIPT")
	public BigDecimal getExpenseReceipt() {
		return expenseReceipt;
	}

	public void setExpenseReceipt(BigDecimal expenseReceipt) {
		this.expenseReceipt = expenseReceipt;
	}

	@Column(name = "EXPENSE_MONTH")
	public BigDecimal getExpenseMonth() {
		return expenseMonth;
	}

	public void setExpenseMonth(BigDecimal expenseMonth) {
		this.expenseMonth = expenseMonth;
	}

	@Column(name = "EXPENSE_DISCOUNT")
	public BigDecimal getExpenseDiscount() {
		return expenseDiscount;
	}

	public void setExpenseDiscount(BigDecimal expenseDiscount) {
		this.expenseDiscount = expenseDiscount;
	}

	@Column(name = "MOTORCADE_ADDRESS")
	public String getMotorcadeAddress() {
		return motorcadeAddress;
	}

	public void setMotorcadeAddress(String motorcadeAddress) {
		this.motorcadeAddress = motorcadeAddress;
	}

	@Column(name = "DELIVERY_ADDRESS")
	public String getDeliveryAddress() {
		return this.deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	@Column(name = "DELIVERY_PLACE_ID")
	public Integer getDeliveryPlaceId() {
		return this.deliveryPlaceId;
	}

	public void setDeliveryPlaceId(Integer deliveryPlaceId) {
		this.deliveryPlaceId = deliveryPlaceId;
	}

	@Column(name = "DELIVERY_PLACE_NAME")
	public String getDeliveryPlaceName() {
		return this.deliveryPlaceName;
	}

	public void setDeliveryPlaceName(String deliveryPlaceName) {
		this.deliveryPlaceName = deliveryPlaceName;
	}

	@Column(name = "DELIVERY_CITY_ID")
	public Integer getDeliveryCityId() {
		return this.deliveryCityId;
	}

	public void setDeliveryCityId(Integer deliveryCityId) {
		this.deliveryCityId = deliveryCityId;
	}

	@Column(name = "DELIVERY_CITY")
	public String getDeliveryCity() {
		return this.deliveryCity;
	}

	public void setDeliveryCity(String deliveryCity) {
		this.deliveryCity = deliveryCity;
	}

	@Transient
	public String getSumMonth() {
		return sumMonth;
	}

	public void setSumMonth(String sumMonth) {
		this.sumMonth = sumMonth;
	}

	@Transient
	public Long getSumConsNo() {
		return this.sumConsNo;
	}

	public void setSumConsNo(Long sumConsNo) {
		this.sumConsNo = sumConsNo;
	}

	@Transient
	public Long getSumPackages() {
		return this.sumPackages;
	}

	public void setSumPackages(Long sumPackages) {
		this.sumPackages = sumPackages;
	}

	@Transient
	public BigDecimal getSumGrossWeight() {
		return this.sumGrossWeight;
	}

	public void setSumGrossWeight(BigDecimal sumGrossWeight) {
		this.sumGrossWeight = sumGrossWeight;
	}
}