package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import java.math.BigDecimal;
import java.util.Date;

/**
 * The persistent class for the t_container database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "T_CONTAINER")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TContainer extends com.hitisoft.fw.orm.jpa.BaseDomain implements
		Serializable {
	private static final long serialVersionUID = 1L;

	// 陆运单号
	private String consNo;
	// 委托日期
	private Date custDate;
	// 委托单位
	private String custName;
	// 委托单位编号
	private String custNo;
	// 委托单位联系人
	private String custContact;
	// 委托单位联系电话
	private String custMobile;
	// 委托单位传真
	private String custFax;
	// 委托单位联系地址
	private String custAddress;
	// 工厂名称
	private String factoryName;
	// 联系人
	private String factoryContact;
	// 联系电话
	private String factoryTel;
	// 装货地点
	private String stuffing;
	// 装货地址
	private String loadPlace;
	// 报关行
	private String customsBrokerName;
	// 报关方式
	private String customsBrokerFun;
	// 船公司
	private String shippingCompanies;
	// 船名
	private String vessel;
	// 航次
	private String voyage;
	// 起运地海关
	private String departureOffice;
	// 做柜时间--做箱时间
	private Date cabinetDate;
	// 做柜门点--做箱
	private String cabinetPoint;
	// 做柜地点--做箱
	private String cabinetLocations;
	// 做柜联系人--做箱
	private String cabinetContact;
	// 做柜联系电话--做箱
	private String cabinetTel;
	// 柜型--箱型
	private String containerType;
	// 订舱号--箱号
	private String bookingNumber;
	// 柜号--箱量
	private String containerNumber;
	// 封条号
	private String sealNumber;
	// 补料时间
	private Date feedingDate;
	// 截关时间
	private Date cutDate;
	// 指运地海关
	private String arriveOffice;
	// 是否双托
	private Byte dualTorr;
	// 码头查询
	private Byte pierQuery;
	// 订舱号2
	private String bookingNumber2;
	// 柜号2
	private String containerNumber2;
	// 封条号2
	private String sealNumber2;
	// 提柜堆场
	private String mentionCounterYear;
	// 提柜地点
	private String mentionCounterLocation;
	// 还柜堆场--还箱
	private String alsoCounterYear;
	// 还柜地址--还箱
	private String alseCounterLocation;
	// 车牌号
	private String vehicleNo;
	// 司机
	private String driverName;
	// 车队
	private String motorcadeName;
	// 托架号
	private String bayNumber;
	// 司机电话
	private String driverTel;
	// 公里数
	private BigDecimal miles;
	// 实际油耗
	private BigDecimal actualFuelConsumption;
	// 放行时间
	private Date releaseDate;
	// 还柜时间
	private Date alsoCabineDate;
	// 到厂时间
	private Date sceneDate;
	// 离厂时间
	private Date departureDate;
	// 所属部门
	private String deparTments;
	// 陆运单备注
	private String consignRemarks;
	// 跟单备注
	private String merchanRemarks;

	// 总费用(收)
	private BigDecimal rExpenseTotal;
	// 运费(收)
	private BigDecimal rFreight;
	// 压车费(收)
	private BigDecimal rPressureFare;
	// 报关费(收)
	private BigDecimal rDeclarationCharges;
	// 港建费(收)
	private BigDecimal rPortConstructionFee;
	// 保安费(收)
	private BigDecimal rSecurityCharge;
	// 打单费(收)
	private BigDecimal rSingleCharge;
	// 入仓费(收)
	private BigDecimal rWarehousingFee;
	// 超重费(收)
	private BigDecimal rOverweightCharges;
	// 异提费(收)
	private BigDecimal rMentionFees;
	// 补料费（收）
	private BigDecimal rFedCharges;
	// 押车费2(收)
	private BigDecimal rPressureFare2;
	// 其它费(收)
	private BigDecimal rOtherCharges;
	// 备注(收)
	private String rRemarks;

	// 总费用(付)
	private BigDecimal pExpenseTotal;
	// 运费(付)
	private BigDecimal pFreight;
	// 押车费(付)
	private BigDecimal pPressureFare;
	// 报关费((付)
	private BigDecimal pDeclarationCharges;
	// 港建费(付)
	private BigDecimal pPortConstructonFee;
	// 保安费(付)
	private BigDecimal pSecurityCharge;
	// 打单费(付)
	private BigDecimal pSingleCharge;
	// 补料费(付)
	private BigDecimal pFedCharges;
	// 超重费(付)
	private BigDecimal pOverweightCharges;
	// 高速费(付)
	private BigDecimal pHighFees;
	// 路桥费(付)
	private BigDecimal pRoadToll;
	// 坏/污箱费(付)
	private BigDecimal pBoxFee;
	// 其它费(付)
	private BigDecimal pOtherCharges;
	// 备注(付)
	private String pRemarks;

	// 总费用(车辆)
	private BigDecimal vExpenseTotal;
	// 出车费
	private BigDecimal vFare;
	// 提箱费
	private BigDecimal vSuitcaseFee;
	// 提成
	private BigDecimal vDeduct;
	// 路桥费
	private BigDecimal vRoadToll;
	// 油费
	private BigDecimal vFuelCosts;
	// 待时费
	private BigDecimal vPendingCharges;
	// 轮胎费
	private BigDecimal vtireFee;
	// 修理费
	private BigDecimal vRepairs;
	// 其他费
	private BigDecimal vOtherCharges;
	// 司机产值
	private BigDecimal vDriverValue;
	// 车辆备注
	private String vRemarks;

	/* 业务类别:集装箱运输，进出口委托*/
	private String consBizClass;
	// 提单号
	private String loadNumber;
	// 始发港
	private String departurePort;
	// 中转港
	private String transshipmentPort;
	// 目的港
	private String destinationPort;
	// 到港日期
	private Date arrivedDate;
	//开航日期
	private Date saillingDate;
	//闭港日期
	private Date closingDate;
	// 免费时间
	private Date freeDate1;
	private Date freeDate2;
	// 箱公司
	private String containerCompany;
	
	private String cargoName;
	private Integer packages;
	private BigDecimal grossWeight;
	private BigDecimal volume;
	
	public TContainer() {

	}

	@Column(name = "CONS_NO")
	public String getConsNo() {
		return consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Column(name = "CUST_NAME")
	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	@Column(name = "CUST_NO")
	public String getCustNo() {
		return custNo;
	}

	public void setCustNo(String custNo) {
		this.custNo = custNo;
	}

	@Column(name = "CUST_CONTACT")
	public String getCustContact() {
		return custContact;
	}

	public void setCustContact(String custContact) {
		this.custContact = custContact;
	}

	@Column(name = "FACTORY_NAME")
	public String getFactoryName() {
		return factoryName;
	}

	public void setFactoryName(String factoryName) {
		this.factoryName = factoryName;
	}

	@Column(name = "FACTORY_CONTACT")
	public String getFactoryContact() {
		return factoryContact;
	}

	public void setFactoryContact(String factoryContact) {
		this.factoryContact = factoryContact;
	}

	@Column(name = "FACTORY_TEL")
	public String getFactoryTel() {
		return factoryTel;
	}

	public void setFactoryTel(String factoryTel) {
		this.factoryTel = factoryTel;
	}

	@Column(name = "STUFFING")
	public String getStuffing() {
		return stuffing;
	}

	public void setStuffing(String stuffing) {
		this.stuffing = stuffing;
	}

	@Column(name = "LOAD_PLACE")
	public String getLoadPlace() {
		return loadPlace;
	}

	public void setLoadPlace(String loadPlace) {
		this.loadPlace = loadPlace;
	}

	@Column(name = "CUSTOMS_BROKER_NAME")
	public String getCustomsBrokerName() {
		return customsBrokerName;
	}

	public void setCustomsBrokerName(String customsBrokerName) {
		this.customsBrokerName = customsBrokerName;
	}

	@Column(name = "CUSTOMS_BROKER_FUN")
	public String getCustomsBrokerFun() {
		return customsBrokerFun;
	}

	public void setCustomsBrokerFun(String customsBrokerFun) {
		this.customsBrokerFun = customsBrokerFun;
	}

	@Column(name = "SHIPPING_COMPANIES")
	public String getShippingCompanies() {
		return shippingCompanies;
	}

	public void setShippingCompanies(String shippingCompanies) {
		this.shippingCompanies = shippingCompanies;
	}

	@Column(name = "VESSEL")
	public String getVessel() {
		return vessel;
	}

	public void setVessel(String vessel) {
		this.vessel = vessel;
	}

	@Column(name = "VOYAGE")
	public String getVoyage() {
		return voyage;
	}

	public void setVoyage(String voyage) {
		this.voyage = voyage;
	}

	@Column(name = "DEPARTURE_OFFICE")
	public String getDepartureOffice() {
		return departureOffice;
	}

	public void setDepartureOffice(String departureOffice) {
		this.departureOffice = departureOffice;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CABINET_DATE")
	public Date getCabinetDate() {
		return cabinetDate;
	}

	public void setCabinetDate(Date cabinetDate) {
		this.cabinetDate = cabinetDate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "FEEDING_DATE")
	public Date getFeedingDate() {
		return feedingDate;
	}

	public void setFeedingDate(Date feedingDate) {
		this.feedingDate = feedingDate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CUT_DATE")
	public Date getCutDate() {
		return cutDate;
	}

	public void setCutDate(Date cutDate) {
		this.cutDate = cutDate;
	}

	@Column(name = "ARRIVE_OFFICE")
	public String getArriveOffice() {
		return arriveOffice;
	}

	public void setArriveOffice(String arriveOffice) {
		this.arriveOffice = arriveOffice;
	}

	@Column(name = "CONTAINER_TYPE")
	public String getContainerType() {
		return containerType;
	}

	public void setContainerType(String containerType) {
		this.containerType = containerType;
	}

	@Column(name = "BOOKING_NUMBER")
	public String getBookingNumber() {
		return bookingNumber;
	}

	public void setBookingNumber(String bookingNumber) {
		this.bookingNumber = bookingNumber;
	}

	@Column(name = "CONTAINER_NUMBER")
	public String getContainerNumber() {
		return containerNumber;
	}

	public void setContainerNumber(String containerNumber) {
		this.containerNumber = containerNumber;
	}

	@Column(name = "SEAL_NUMBER")
	public String getSealNumber() {
		return sealNumber;
	}

	public void setSealNumber(String sealNumber) {
		this.sealNumber = sealNumber;
	}

	@Column(name = "DUAL_TORR")
	public Byte getDualTorr() {
		return dualTorr;
	}

	public void setDualTorr(Byte dualTorr) {
		this.dualTorr = dualTorr;
	}

	@Column(name = "PIER_QUERY")
	public Byte getPierQuery() {
		return pierQuery;
	}

	public void setPierQuery(Byte pierQuery) {
		this.pierQuery = pierQuery;
	}

	@Column(name = "BOOKING_NUMBER2")
	public String getBookingNumber2() {
		return bookingNumber2;
	}

	public void setBookingNumber2(String bookingNumber2) {
		this.bookingNumber2 = bookingNumber2;
	}

	@Column(name = "CONTAINER_NUMBER2")
	public String getContainerNumber2() {
		return containerNumber2;
	}

	public void setContainerNumber2(String containerNumber2) {
		this.containerNumber2 = containerNumber2;
	}

	@Column(name = "SEAL_NUMBER2")
	public String getSealNumber2() {
		return sealNumber2;
	}

	public void setSealNumber2(String sealNumber2) {
		this.sealNumber2 = sealNumber2;
	}

	@Column(name = "MENTION_COUNTER_YEAR")
	public String getMentionCounterYear() {
		return mentionCounterYear;
	}

	public void setMentionCounterYear(String mentionCounterYear) {
		this.mentionCounterYear = mentionCounterYear;
	}

	@Column(name = "MENTION_COUNTER_LOCATION")
	public String getMentionCounterLocation() {
		return mentionCounterLocation;
	}

	public void setMentionCounterLocation(String mentionCounterLocation) {
		this.mentionCounterLocation = mentionCounterLocation;
	}

	@Column(name = "ALSO_COUNTER_YEAR")
	public String getAlsoCounterYear() {
		return alsoCounterYear;
	}

	public void setAlsoCounterYear(String alsoCounterYear) {
		this.alsoCounterYear = alsoCounterYear;
	}

	@Column(name = "ALSE_COUNTER_LOCATION")
	public String getAlseCounterLocation() {
		return alseCounterLocation;
	}

	public void setAlseCounterLocation(String alseCounterLocation) {
		this.alseCounterLocation = alseCounterLocation;
	}

	@Column(name = "VEHICLE_NO")
	public String getVehicleNo() {
		return vehicleNo;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}

	@Column(name = "DRIVER_NAME")
	public String getDriverName() {
		return driverName;
	}

	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}

	@Column(name = "MOTORCADE_NAME")
	public String getMotorcadeName() {
		return motorcadeName;
	}

	public void setMotorcadeName(String motorcadeName) {
		this.motorcadeName = motorcadeName;
	}

	@Column(name = "BAY_NUMBER")
	public String getBayNumber() {
		return bayNumber;
	}

	public void setBayNumber(String bayNumber) {
		this.bayNumber = bayNumber;
	}

	@Column(name = "DRIVER_TEL")
	public String getDriverTel() {
		return driverTel;
	}

	public void setDriverTel(String driverTel) {
		this.driverTel = driverTel;
	}

	@Column(name = "MILES")
	public BigDecimal getMiles() {
		return miles;
	}

	public void setMiles(BigDecimal miles) {
		this.miles = miles;
	}

	@Column(name = "ACTUAL_FUEL_CONSUMPTION")
	public BigDecimal getActualFuelConsumption() {
		return actualFuelConsumption;
	}

	public void setActualFuelConsumption(BigDecimal actualFuelConsumption) {
		this.actualFuelConsumption = actualFuelConsumption;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "ALSO_CABINE_DATE")
	public Date getAlsoCabineDate() {
		return alsoCabineDate;
	}

	public void setAlsoCabineDate(Date alsoCabineDate) {
		this.alsoCabineDate = alsoCabineDate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "SCENE_DATE")
	public Date getSceneDate() {
		return sceneDate;
	}

	public void setSceneDate(Date sceneDate) {
		this.sceneDate = sceneDate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "DEPARTURE_DATE")
	public Date getDepartureDate() {
		return departureDate;
	}

	public void setDepartureDate(Date departureDate) {
		this.departureDate = departureDate;
	}

	@Column(name = "DEPAR_TMENTS")
	public String getDeparTments() {
		return deparTments;
	}

	public void setDeparTments(String deparTments) {
		this.deparTments = deparTments;
	}

	@Column(name = "CONSIGN_REMARKS")
	public String getConsignRemarks() {
		return consignRemarks;
	}

	public void setConsignRemarks(String consignRemarks) {
		this.consignRemarks = consignRemarks;
	}

	@Column(name = "MERCHAN_REMARKS")
	public String getMerchanRemarks() {
		return merchanRemarks;
	}

	public void setMerchanRemarks(String merchanRemarks) {
		this.merchanRemarks = merchanRemarks;
	}

	@Column(name = "R_FREIGHT")
	public BigDecimal getrFreight() {
		return rFreight;
	}

	public void setrFreight(BigDecimal rFreight) {
		this.rFreight = rFreight;
	}

	@Column(name = "R_PRESSURE_FARE")
	public BigDecimal getrPressureFare() {
		return rPressureFare;
	}

	public void setrPressureFare(BigDecimal rPressureFare) {
		this.rPressureFare = rPressureFare;
	}

	@Column(name = "R_DECLARATION_CHARGES")
	public BigDecimal getrDeclarationCharges() {
		return rDeclarationCharges;
	}

	public void setrDeclarationCharges(BigDecimal rDeclarationCharges) {
		this.rDeclarationCharges = rDeclarationCharges;
	}

	@Column(name = "R_PORT_CONSTRUCTION_FEE")
	public BigDecimal getrPortConstructionFee() {
		return rPortConstructionFee;
	}

	public void setrPortConstructionFee(BigDecimal rPortConstructionFee) {
		this.rPortConstructionFee = rPortConstructionFee;
	}

	@Column(name = "R_SECURITY_CHARGE")
	public BigDecimal getrSecurityCharge() {
		return rSecurityCharge;
	}

	public void setrSecurityCharge(BigDecimal rSecurityCharge) {
		this.rSecurityCharge = rSecurityCharge;
	}

	@Column(name = "R_SINGLE_CHARGE")
	public BigDecimal getrSingleCharge() {
		return rSingleCharge;
	}

	public void setrSingleCharge(BigDecimal rSingleCharge) {
		this.rSingleCharge = rSingleCharge;
	}

	@Column(name = "R_WAREHOUSING_FEE")
	public BigDecimal getrWarehousingFee() {
		return rWarehousingFee;
	}

	public void setrWarehousingFee(BigDecimal rWarehousingFee) {
		this.rWarehousingFee = rWarehousingFee;
	}

	@Column(name = "R_OVERWEIGHT_CHARGES")
	public BigDecimal getrOverweightCharges() {
		return rOverweightCharges;
	}

	public void setrOverweightCharges(BigDecimal rOverweightCharges) {
		this.rOverweightCharges = rOverweightCharges;
	}

	@Column(name = "R_MENTION_FEES")
	public BigDecimal getrMentionFees() {
		return rMentionFees;
	}

	public void setrMentionFees(BigDecimal rMentionFees) {
		this.rMentionFees = rMentionFees;
	}

	@Column(name = "R_FED_CHARGES")
	public BigDecimal getrFedCharges() {
		return rFedCharges;
	}

	public void setrFedCharges(BigDecimal rFedCharges) {
		this.rFedCharges = rFedCharges;
	}

	@Column(name = "R_PRESSURE_FARE2")
	public BigDecimal getrPressureFare2() {
		return rPressureFare2;
	}

	public void setrPressureFare2(BigDecimal rPressureFare2) {
		this.rPressureFare2 = rPressureFare2;
	}

	@Column(name = "R_OTHER_CHARGES")
	public BigDecimal getrOtherCharges() {
		return rOtherCharges;
	}

	public void setrOtherCharges(BigDecimal rOtherCharges) {
		this.rOtherCharges = rOtherCharges;
	}

	@Column(name = "R_REMARKS")
	public String getrRemarks() {
		return rRemarks;
	}

	public void setrRemarks(String rRemarks) {
		this.rRemarks = rRemarks;
	}

	@Column(name = "P_FREIGHT")
	public BigDecimal getpFreight() {
		return pFreight;
	}

	public void setpFreight(BigDecimal pFreight) {
		this.pFreight = pFreight;
	}

	@Column(name = "P_PRESSURE_FARE")
	public BigDecimal getpPressureFare() {
		return pPressureFare;
	}

	public void setpPressureFare(BigDecimal pPressureFare) {
		this.pPressureFare = pPressureFare;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "RELEASE_DATE")
	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}

	@Column(name = "P_PORT_CONSTRUCTON_FEE")
	public BigDecimal getpPortConstructonFee() {
		return pPortConstructonFee;
	}

	public void setpPortConstructonFee(BigDecimal pPortConstructonFee) {
		this.pPortConstructonFee = pPortConstructonFee;
	}

	@Column(name = "P_DECLARATION_CHARGES")
	public BigDecimal getpDeclarationCharges() {
		return pDeclarationCharges;
	}

	public void setpDeclarationCharges(BigDecimal pDeclarationCharges) {
		this.pDeclarationCharges = pDeclarationCharges;
	}

	@Column(name = "P_SECURITY_CHARGE")
	public BigDecimal getpSecurityCharge() {
		return pSecurityCharge;
	}

	public void setpSecurityCharge(BigDecimal pSecurityCharge) {
		this.pSecurityCharge = pSecurityCharge;
	}

	@Column(name = "P_SINGLE_CHARGE")
	public BigDecimal getpSingleCharge() {
		return pSingleCharge;
	}

	public void setpSingleCharge(BigDecimal pSingleCharge) {
		this.pSingleCharge = pSingleCharge;
	}

	@Column(name = "P_FED_CHARGES")
	public BigDecimal getpFedCharges() {
		return pFedCharges;
	}

	public void setpFedCharges(BigDecimal pFedCharges) {
		this.pFedCharges = pFedCharges;
	}

	@Column(name = "P_OVERWEIGHT_CHARGES")
	public BigDecimal getpOverweightCharges() {
		return pOverweightCharges;
	}

	public void setpOverweightCharges(BigDecimal pOverweightCharges) {
		this.pOverweightCharges = pOverweightCharges;
	}

	@Column(name = "P_HIGH_FEES")
	public BigDecimal getpHighFees() {
		return pHighFees;
	}

	public void setpHighFees(BigDecimal pHighFees) {
		this.pHighFees = pHighFees;
	}

	@Column(name = "P_ROAD_TOLL")
	public BigDecimal getpRoadToll() {
		return pRoadToll;
	}

	public void setpRoadToll(BigDecimal pRoadToll) {
		this.pRoadToll = pRoadToll;
	}

	@Column(name = "P_BOX_FEE")
	public BigDecimal getpBoxFee() {
		return pBoxFee;
	}

	public void setpBoxFee(BigDecimal pBoxFee) {
		this.pBoxFee = pBoxFee;
	}

	@Column(name = "P_OTHER_CHARGES")
	public BigDecimal getpOtherCharges() {
		return pOtherCharges;
	}

	public void setpOtherCharges(BigDecimal pOtherCharges) {
		this.pOtherCharges = pOtherCharges;
	}

	@Column(name = "P_REMARKS")
	public String getpRemarks() {
		return pRemarks;
	}

	public void setpRemarks(String pRemarks) {
		this.pRemarks = pRemarks;
	}

	@Column(name = "V_FARE")
	public BigDecimal getvFare() {
		return vFare;
	}

	public void setvFare(BigDecimal vFare) {
		this.vFare = vFare;
	}

	@Column(name = "V_SUITCASE_FEE")
	public BigDecimal getvSuitcaseFee() {
		return vSuitcaseFee;
	}

	public void setvSuitcaseFee(BigDecimal vSuitcaseFee) {
		this.vSuitcaseFee = vSuitcaseFee;
	}

	@Column(name = "V_DEDUCT")
	public BigDecimal getvDeduct() {
		return vDeduct;
	}

	public void setvDeduct(BigDecimal vDeduct) {
		this.vDeduct = vDeduct;
	}

	@Column(name = "V_ROAD_TOLL")
	public BigDecimal getvRoadToll() {
		return vRoadToll;
	}

	public void setvRoadToll(BigDecimal vRoadToll) {
		this.vRoadToll = vRoadToll;
	}

	@Column(name = "V_FUEL_COSTS")
	public BigDecimal getvFuelCosts() {
		return vFuelCosts;
	}

	public void setvFuelCosts(BigDecimal vFuelCosts) {
		this.vFuelCosts = vFuelCosts;
	}

	@Column(name = "V_PENDING_CHARGES")
	public BigDecimal getvPendingCharges() {
		return vPendingCharges;
	}

	public void setvPendingCharges(BigDecimal vPendingCharges) {
		this.vPendingCharges = vPendingCharges;
	}

	@Column(name = "V_TIRE_FEE")
	public BigDecimal getVtireFee() {
		return vtireFee;
	}

	public void setVtireFee(BigDecimal vtireFee) {
		this.vtireFee = vtireFee;
	}

	@Column(name = "V_REPAIRS")
	public BigDecimal getvRepairs() {
		return vRepairs;
	}

	public void setvRepairs(BigDecimal vRepairs) {
		this.vRepairs = vRepairs;
	}

	@Column(name = "V_OTHER_CHARGES")
	public BigDecimal getvOtherCharges() {
		return vOtherCharges;
	}

	public void setvOtherCharges(BigDecimal vOtherCharges) {
		this.vOtherCharges = vOtherCharges;
	}

	@Column(name = "V_DRIVER_VALUE")
	public BigDecimal getvDriverValue() {
		return vDriverValue;
	}

	public void setvDriverValue(BigDecimal vDriverValue) {
		this.vDriverValue = vDriverValue;
	}

	@Column(name = "V_REMARKS")
	public String getvRemarks() {
		return vRemarks;
	}

	public void setvRemarks(String vRemarks) {
		this.vRemarks = vRemarks;
	}

	@Column(name = "R_EXPENSE_TOTAL")
	public BigDecimal getrExpenseTotal() {
		return rExpenseTotal;
	}

	public void setrExpenseTotal(BigDecimal rExpenseTotal) {
		this.rExpenseTotal = rExpenseTotal;
	}

	@Column(name = "P_EXPENSE_TOTAL")
	public BigDecimal getpExpenseTotal() {
		return pExpenseTotal;
	}

	public void setpExpenseTotal(BigDecimal pExpenseTotal) {
		this.pExpenseTotal = pExpenseTotal;
	}

	@Column(name = "V_EXPENSE_TOTAL")
	public BigDecimal getvExpenseTotal() {
		return vExpenseTotal;
	}

	public void setvExpenseTotal(BigDecimal vExpenseTotal) {
		this.vExpenseTotal = vExpenseTotal;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CUST_DATE")
	public Date getCustDate() {
		return custDate;
	}

	public void setCustDate(Date custDate) {
		this.custDate = custDate;
	}

	@Column(name = "CUST_MOBILE")
	public String getCustMobile() {
		return custMobile;
	}

	public void setCustMobile(String custMobile) {
		this.custMobile = custMobile;
	}

	@Column(name = "CUST_FAX")
	public String getCustFax() {
		return custFax;
	}

	public void setCustFax(String custFax) {
		this.custFax = custFax;
	}

	@Column(name = "CUST_ADDRESS")
	public String getCustAddress() {
		return custAddress;
	}

	public void setCustAddress(String custAddress) {
		this.custAddress = custAddress;
	}

	@Column(name = "CABINET_POINT")
	public String getCabinetPoint() {
		return cabinetPoint;
	}

	public void setCabinetPoint(String cabinetPoint) {
		this.cabinetPoint = cabinetPoint;
	}

	@Column(name = "CABINET_LOCATIONS")
	public String getCabinetLocations() {
		return cabinetLocations;
	}

	public void setCabinetLocations(String cabinetLocations) {
		this.cabinetLocations = cabinetLocations;
	}

	@Column(name = "CABINET_CONTACT")
	public String getCabinetContact() {
		return cabinetContact;
	}

	public void setCabinetContact(String cabinetContact) {
		this.cabinetContact = cabinetContact;
	}

	@Column(name = "CABINET_TEL")
	public String getCabinetTel() {
		return cabinetTel;
	}

	public void setCabinetTel(String cabinetTel) {
		this.cabinetTel = cabinetTel;
	}

	@Column(name = "LOAD_NUMBER")
	public String getLoadNumber() {
		return loadNumber;
	}

	public void setLoadNumber(String loadNumber) {
		this.loadNumber = loadNumber;
	}

	@Column(name = "DEPARTURE_PORT")
	public String getDeparturePort() {
		return departurePort;
	}

	public void setDeparturePort(String departurePort) {
		this.departurePort = departurePort;
	}

	@Column(name = "TRANSSHIPMENT_PORT")
	public String getTransshipmentPort() {
		return transshipmentPort;
	}

	public void setTransshipmentPort(String transshipmentPort) {
		this.transshipmentPort = transshipmentPort;
	}

	@Column(name = "DESTINATION_PORT")
	public String getDestinationPort() {
		return destinationPort;
	}

	public void setDestinationPort(String destinationPort) {
		this.destinationPort = destinationPort;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "ARRIVED_DATE")
	public Date getArrivedDate() {
		return arrivedDate;
	}

	public void setArrivedDate(Date arrivedDate) {
		this.arrivedDate = arrivedDate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "FREE_DATE1")
	public Date getFreeDate1() {
		return freeDate1;
	}

	public void setFreeDate1(Date freeDate1) {
		this.freeDate1 = freeDate1;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "FREE_DATE2")
	public Date getFreeDate2() {
		return freeDate2;
	}

	public void setFreeDate2(Date freeDate2) {
		this.freeDate2 = freeDate2;
	}

	@Column(name = "CONTAINER_COMPANY")
	public String getContainerCompany() {
		return containerCompany;
	}

	public void setContainerCompany(String containerCompany) {
		this.containerCompany = containerCompany;
	}

	@Column(name = "CONS_BIZ_CLASS")
	public String getConsBizClass() {
		return consBizClass;
	}

	public void setConsBizClass(String consBizClass) {
		this.consBizClass = consBizClass;
	}

	@Column(name = "VOLUME")
	public BigDecimal getVolume() {
		return this.volume;
	}

	public void setVolume(BigDecimal volume) {
		this.volume = volume;
	}
	
	@Column(name = "CARGO_NAME")
	public String getCargoName() {
		return this.cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}
	
	@Column(name = "PACKAGES")
	public Integer getPackages() {
		return this.packages;
	}

	public void setPackages(Integer packages) {
		this.packages = packages;
	}
	
	@Column(name = "GROSS_WEIGHT")
	public BigDecimal getGrossWeight() {
		return this.grossWeight;
	}

	public void setGrossWeight(BigDecimal grossWeight) {
		this.grossWeight = grossWeight;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "SAILLING_DATE")
	public Date getSaillingDate() {
		return saillingDate;
	}

	public void setSaillingDate(Date saillingDate) {
		this.saillingDate = saillingDate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CLOSING_DATE")
	public Date getClosingDate() {
		return closingDate;
	}

	public void setClosingDate(Date closingDate) {
		this.closingDate = closingDate;
	}
	
}