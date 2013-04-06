package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.math.BigDecimal;
import java.util.Date;


/**
 * 调度
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="T_TRANS_TASK")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TTransTask extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	//派车单号
	private String transTaskNo;
	//实际到达时间
	private Date arriveTime;
	//车辆预计到达时间
	private Date arriveTimeDemand;
	//返回时间
	private Date backTime;
	//箱号
	private String containerNo;
	//箱型
	private String cotyCode;
	//货物名称
	private String cargoName;
	//驾驶员ID
	private Integer driverId;
	//驾驶员
	private String driverName;
	//司机电话
	private String driverTel;
	//包装种类
	private String packName;
	//车辆装货的件数合计
	private Integer packages;
	//装车货物的毛重合计
	private BigDecimal grossWeight;
	//装车的体积合计
	private BigDecimal measurement;
	//装货日期
	private Date loadDate;
	//车辆装载时间
	private String loadTime;
	//发货地点ID
	private Integer placeFromId;
	//发货地点
	private String placeFromName;
	//交货地点ID
	private Integer placeToId;
	//交货地点
	private String placeToName;
	//备注
	private String remarks;
	//封号
	private String sealNo;
	//车辆ID
	private Integer vehicleId;
	//车牌号
	private String vehicleNo;
	//运输单状态：0：未派车，已开始(已发运)‘1’，已完成(已回场)‘2’
	private Integer status;
	//运输单回单状态0：未生成回单 1：生成回单
	private Integer receiptStatus;
	//车队联系人
	private String motorcadeContact;
	//车队ID
	private Integer motorcadeId;
	//车队名称
	private String motorcadeName;
	//车队电话
	private String motorcadeTel;
	//发车日期
	private Date startDate;
	//发车时间
	private String startTime;
	//派车完成日期
	private Date endDate;
	//完成时间
	private String endTime;
	//车辆离开时间
	private Date leaveTime;
	//空载
	private BigDecimal emptyMiles;
	//重载
	private BigDecimal heavyMiles;
	//运费条款
	private String pateName;
	//保单号
	private String premiumNumber;
	//车辆保险期(从):
	private Date premiumDateFrom;
	//车辆保险期(到):
	private Date premiumDateTo;
	//保险费
	private BigDecimal premiumExpense;
	//保险公司
	private String 	premiumCompany;
	//到岗日期
	private Date expiryDate;
	//到岗时间
	private String expiryTime;
	
	//调度派车标志 0：派车提货  1：派车送货  2：集装箱派车
	private Integer dispatchFlag;
	
	//一下是虚拟字段
	//0：不可编辑1：可编辑
	private Short editable;
	
	private String sumT;
	
	private Long sumStartDate;
	//车辆的装载货物毛重合计
	private BigDecimal sumGrossWeight;
	
	private BigDecimal sumDistance;
	
	public TTransTask() { }

	@Temporal( TemporalType.DATE)
	@Column(name="START_DATE")
    public Date getStartDate() {
		return this.startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	@Temporal( TemporalType.DATE)
	@Column(name="END_DATE")
	public Date getEndDate() {
		return this.endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
    @Temporal( TemporalType.TIMESTAMP)
	@Column(name="ARRIVE_TIME")
	public Date getArriveTime() {
		return this.arriveTime;
	}

	public void setArriveTime(Date arriveTime) {
		this.arriveTime = arriveTime;
	}


    @Temporal( TemporalType.TIMESTAMP)
	@Column(name="ARRIVE_TIME_DEMAND")
	public Date getArriveTimeDemand() {
		return this.arriveTimeDemand;
	}

	public void setArriveTimeDemand(Date arriveTimeDemand) {
		this.arriveTimeDemand = arriveTimeDemand;
	}


    @Temporal( TemporalType.TIMESTAMP)
	@Column(name="BACK_TIME")
	public Date getBackTime() {
		return this.backTime;
	}

	public void setBackTime(Date backTime) {
		this.backTime = backTime;
	}
	
	@Column(name="CARGO_NAME")
	public String getCargoName() {
		return this.cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}

	@Column(name="CONTAINER_NO")
	public String getContainerNo() {
		return this.containerNo;
	}

	public void setContainerNo(String containerNo) {
		this.containerNo = containerNo;
	}


	@Column(name="COTY_CODE")
	public String getCotyCode() {
		return this.cotyCode;
	}

	public void setCotyCode(String cotyCode) {
		this.cotyCode = cotyCode;
	}


	@Column(name="DRIVER_ID")
	public Integer getDriverId() {
		return this.driverId;
	}

	public void setDriverId(Integer driverId) {
		this.driverId = driverId;
	}


	@Column(name="DRIVER_NAME")
	public String getDriverName() {
		return this.driverName;
	}

	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}


	@Column(name="DRIVER_TEL")
	public String getDriverTel() {
		return this.driverTel;
	}

	public void setDriverTel(String driverTel) {
		this.driverTel = driverTel;
	}


	@Column(name="GROSS_WEIGHT")
	public BigDecimal getGrossWeight() {
		return this.grossWeight;
	}

	public void setGrossWeight(BigDecimal grossWeight) {
		this.grossWeight = grossWeight;
	}


    @Temporal( TemporalType.TIMESTAMP)
	@Column(name="LEAVE_TIME")
	public Date getLeaveTime() {
		return this.leaveTime;
	}

	public void setLeaveTime(Date leaveTime) {
		this.leaveTime = leaveTime;
	}

	@Column(name="LOAD_TIME")
	public String getLoadTime() {
		return this.loadTime;
	}

	public void setLoadTime(String loadTime) {
		this.loadTime = loadTime;
	}


	@Column(name="MEASUREMENT")
	public BigDecimal getMeasurement() {
		return this.measurement;
	}

	public void setMeasurement(BigDecimal measurement) {
		this.measurement = measurement;
	}


	@Column(name="PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}


	@Column(name="PACKAGES")
	public Integer getPackages() {
		return this.packages;
	}

	public void setPackages(Integer packages) {
		this.packages = packages;
	}


	@Column(name="PLACE_FROM_ID")
	public Integer getPlaceFromId() {
		return this.placeFromId;
	}

	public void setPlaceFromId(Integer placeFromId) {
		this.placeFromId = placeFromId;
	}


	@Column(name="PLACE_FROM_NAME")
	public String getPlaceFromName() {
		return this.placeFromName;
	}

	public void setPlaceFromName(String placeFromName) {
		this.placeFromName = placeFromName;
	}


	@Column(name="PLACE_TO_ID")
	public Integer getPlaceToId() {
		return this.placeToId;
	}

	public void setPlaceToId(Integer placeToId) {
		this.placeToId = placeToId;
	}


	@Column(name="PLACE_TO_NAME")
	public String getPlaceToName() {
		return this.placeToName;
	}

	public void setPlaceToName(String placeToName) {
		this.placeToName = placeToName;
	}


	@Column(name="REMARKS")
	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}


	@Column(name="SEAL_NO")
	public String getSealNo() {
		return this.sealNo;
	}

	public void setSealNo(String sealNo) {
		this.sealNo = sealNo;
	}


	@Column(name="TRANS_TASK_NO")
	public String getTransTaskNo() {
		return this.transTaskNo;
	}

	public void setTransTaskNo(String transTaskNo) {
		this.transTaskNo = transTaskNo;
	}


	@Column(name="VEHICLE_ID")
	public Integer getVehicleId() {
		return this.vehicleId;
	}

	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}


	@Column(name="VEHICLE_NO")
	public String getVehicleNo() {
		return this.vehicleNo;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}

	@Column(name="STATUS")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
	
	@Column(name="MOTORCADE_CONTACT")
	public String getMotorcadeContact() {
		return this.motorcadeContact;
	}

	public void setMotorcadeContact(String motorcadeContact) {
		this.motorcadeContact = motorcadeContact;
	}


	@Column(name="MOTORCADE_ID")
	public Integer getMotorcadeId() {
		return this.motorcadeId;
	}

	public void setMotorcadeId(Integer motorcadeId) {
		this.motorcadeId = motorcadeId;
	}


	@Column(name="MOTORCADE_NAME")
	public String getMotorcadeName() {
		return this.motorcadeName;
	}

	public void setMotorcadeName(String motorcadeName) {
		this.motorcadeName = motorcadeName;
	}


	@Column(name="MOTORCADE_TEL")
	public String getMotorcadeTel() {
		return this.motorcadeTel;
	}

	public void setMotorcadeTel(String motorcadeTel) {
		this.motorcadeTel = motorcadeTel;
	}
	
	@Column(name="EMPTY_MILES")
	public BigDecimal getEmptyMiles() {
		return this.emptyMiles;
	}

	public void setEmptyMiles(BigDecimal emptyMiles) {
		this.emptyMiles = emptyMiles;
	}
	
	@Column(name="HEAVY_MILES")
	public BigDecimal getHeavyMiles() {
		return this.heavyMiles;
	}

	public void setHeavyMiles(BigDecimal heavyMiles) {
		this.heavyMiles = heavyMiles;
	}
	
	@Column(name="PATE_NAME")
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
	
	@Column(name="PREMIUM_NUMBER")
	public String getPremiumNumber() {
		return this.premiumNumber;
	}


	public void setPremiumNumber(String premiumNumber) {
		this.premiumNumber = premiumNumber;
	}

	@Temporal( TemporalType.DATE)
	@Column(name="PREMIUM_DATE_FROM")
	public Date getPremiumDateFrom() {
		return this.premiumDateFrom;
	}


	public void setPremiumDateFrom(Date premiumDateFrom) {
		this.premiumDateFrom = premiumDateFrom;
	}

	@Temporal( TemporalType.DATE)
	@Column(name="PREMIUM_DATE_TO")
	public Date getPremiumDateTo() {
		return this.premiumDateTo;
	}


	public void setPremiumDateTo(Date premiumDateTo) {
		this.premiumDateTo = premiumDateTo;
	}
	
	@Column(name="PREMIUM_EXPENSE")
	public BigDecimal getPremiumExpense() {
		return this.premiumExpense;
	}


	public void setPremiumExpense(BigDecimal premiumExpense) {
		this.premiumExpense = premiumExpense;
	}

	@Column(name="PREMIUM_COMPANY")
	public String getPremiumCompany() {
		return this.premiumCompany;
	}

	public void setPremiumCompany(String premiumCompany) {
		this.premiumCompany = premiumCompany;
	}

	@Transient
	public Short getEditable() {
		return this.editable;
	}

	public void setEditable(Short editable) {
		this.editable = editable;
	}

	@Column(name="RECEIPT_STATUS")
	public Integer getReceiptStatus() {
    	return receiptStatus;
    }

	public void setReceiptStatus(Integer receiptStatus) {
    	this.receiptStatus = receiptStatus;
    }

	@Column(name="DISPATCH_FLAG")
	public Integer getDispatchFlag() {
    	return dispatchFlag;
    }

	public void setDispatchFlag(Integer dispatchFlag) {
    	this.dispatchFlag = dispatchFlag;
    }

	@Temporal( TemporalType.DATE)
	@Column(name="LOAD_DATE")
	public Date getLoadDate() {
    	return loadDate;
    }

	public void setLoadDate(Date loadDate) {
    	this.loadDate = loadDate;
    }

	@Column(name="START_TIME")
	public String getStartTime() {
    	return startTime;
    }

	public void setStartTime(String startTime) {
    	this.startTime = startTime;
    }

	@Temporal( TemporalType.DATE)
	@Column(name="EXPIRY_DATE")
	public Date getExpiryDate() {
    	return expiryDate;
    }

	public void setExpiryDate(Date expiryDate) {
    	this.expiryDate = expiryDate;
    }

	@Column(name="EXPIRY_TIME")
	public String getExpiryTime() {
    	return expiryTime;
    }

	public void setExpiryTime(String expiryTime) {
    	this.expiryTime = expiryTime;
    }

	@Column(name="END_TIME")
	public String getEndTime() {
    	return endTime;
    }

	public void setEndTime(String endTime) {
    	this.endTime = endTime;
    }
	
	
}