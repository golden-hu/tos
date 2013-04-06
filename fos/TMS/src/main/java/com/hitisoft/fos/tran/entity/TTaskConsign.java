package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.math.BigDecimal;
import java.util.Date;

/**
 * The persistent class for the t_cargo database table.
 * //派车对应的陆运单（一次派车对应一个或多个陆运单）
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="T_TASK_CONS")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TTaskConsign extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	//派车单ID
	private Integer transTaskId;
	
	//陆运ID
	private Integer consId;
	//陆运单号
	private String consNo;
	//手工单号
	private String consNoHandler;
	//委托联系人
	private String custContact;
	//委托单位ID
	private Integer custId;
	//委托单位
	private String custName;
	//委托座机电话
	private String custTel;
	//委托单位传真
	private String custFax;
	//委托联系人手机
	private String custMobile;
	//收获地址
	private String deliveryAddress;
	//收货省ID
	private Integer deliveryPlaceId;
	//收货省
	private String deliveryPlaceName;
	//收货城市ID
	private Integer deliveryCityId;
	//收货城市
	private String deliveryCity;
	//收获单位ID
	private Integer consigneeId;
	//收获单位
	private String consigneeName;
	//收货联系人
	private String consigneeContact;
	//收货联系人电话
	private String consigneeTel;
	//毛重
	private BigDecimal grossWeight;
	//装货地址
	private String loadAddress;
	//装货联系人
	private String loadContact;
	//装货工厂（发货人）
	private String loadFactory;
	//装货省ID
	private Integer loadPlaceId;
	//装货省ID
	private String loadPlaceName;
	//电话
	private String loadTel;
	//尺寸 体积
	private BigDecimal measurement;
	//包装种类
	private String packName;
	//台数
	private Integer packages;
	//备注
	private String remarks;
	//货物分类
	private String cargoClassName;
	//货物分类ID
	private Integer cargoClassId;
	//货物名称
	private String cargoName;
	//保险价值
	private BigDecimal premiumValue;
	//保险费
	private BigDecimal premiumExpense;
	//保险费率
	private BigDecimal premiumRate;
	//供应商 毛重
	private BigDecimal grossWeightProvider;
	//供应商 尺寸
	private BigDecimal measurementProvider;
	//配载状态 0：未配载  1：已配载(此陆运单已被装车)
	private Integer status;
	/**
	 * 集装箱运输
	 */
	//始发站
	private String startStation;
	//路由站
	private String routeStation;
	//目的站
	private String endStation;
	//合同号
	private String contractNo;
	//卸货港
	private String pol;	
	//还箱堆场
	private String cyBack;
	//提箱堆场
	private String cyDraw;
	//提箱日期
	private Date drawDate;	
	//箱公司ID
	private Integer containerCompany;
	//箱公司名称
	private String containerCompanyName;
	//箱信息
	private String containerInfo;
	//到岗日期
	private Date expiryDate;
	//还箱日期
	private Date backDate;
	//开航日期
	private Date sailDate;
	//订舱号1
	private String soNo;
	//订舱号2
	private String soNo2;
	//M B/L No. 
	private String consMblNo;
	//M B/L No. 
	private String consHblNo;
	//箱型
	private String contType;
	//箱型2
	private String contType2;
	//箱号
	private String contNo;
	//箱号2
	private String contNo2;
	//封条号
	private String contSealNo;
	//封条号2
	private String contSealNo2;
	//船名
	private String vessel;
	//航次
	private String voyage;
	//合同有效期
	private Date contractDate;
	//白卡使用天数
	private Integer icDays;	
	//报关行ID
	private Integer customsBroker;
	//报关行名称
	private String customsBrokerName;
	//报关公司地址
	private String customsAddress;
	//报关公司联系人
	private String customsContact;
	//报关公司电话
	private String customsTel;
	
	
	
	
	
	
	
	
	
    public TTaskConsign() { }

	@Column(name="CARGO_NAME")
	public String getCargoName() {
		return this.cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
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

	@Column(name="DELIVERY_ADDRESS")
	public String getDeliveryAddress() {
		return this.deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}


	@Column(name="DELIVERY_PLACE_ID")
	public Integer getDeliveryPlaceId() {
		return this.deliveryPlaceId;
	}

	public void setDeliveryPlaceId(Integer deliveryPlaceId) {
		this.deliveryPlaceId = deliveryPlaceId;
	}


	@Column(name="DELIVERY_PLACE_NAME")
	public String getDeliveryPlaceName() {
		return this.deliveryPlaceName;
	}

	public void setDeliveryPlaceName(String deliveryPlaceName) {
		this.deliveryPlaceName = deliveryPlaceName;
	}


	@Column(name="GROSS_WEIGHT")
	public BigDecimal getGrossWeight() {
		return this.grossWeight;
	}

	public void setGrossWeight(BigDecimal grossWeight) {
		this.grossWeight = grossWeight;
	}


	@Column(name="LOAD_ADDRESS")
	public String getLoadAddress() {
		return this.loadAddress;
	}

	public void setLoadAddress(String loadAddress) {
		this.loadAddress = loadAddress;
	}


	@Column(name="LOAD_CONTACT")
	public String getLoadContact() {
		return this.loadContact;
	}

	public void setLoadContact(String loadContact) {
		this.loadContact = loadContact;
	}


	@Column(name="LOAD_FACTORY")
	public String getLoadFactory() {
		return this.loadFactory;
	}

	public void setLoadFactory(String loadFactory) {
		this.loadFactory = loadFactory;
	}


	@Column(name="LOAD_PLACE_ID")
	public Integer getLoadPlaceId() {
		return this.loadPlaceId;
	}

	public void setLoadPlaceId(Integer loadPlaceId) {
		this.loadPlaceId = loadPlaceId;
	}


	@Column(name="LOAD_PLACE_NAME")
	public String getLoadPlaceName() {
		return this.loadPlaceName;
	}

	public void setLoadPlaceName(String loadPlaceName) {
		this.loadPlaceName = loadPlaceName;
	}


	@Column(name="LOAD_TEL")
	public String getLoadTel() {
		return this.loadTel;
	}

	public void setLoadTel(String loadTel) {
		this.loadTel = loadTel;
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

	@Column(name="REMARKS")
	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}


	@Column(name="TRANS_TASK_ID")
	public Integer getTransTaskId() {
		return this.transTaskId;
	}

	public void setTransTaskId(Integer transTaskId) {
		this.transTaskId = transTaskId;
	}

	@Column(name="CONSIGNEE_ID")
	public Integer getConsigneeId() {
		return this.consigneeId;
	}


	public void setConsigneeId(Integer consigneeId) {
		this.consigneeId = consigneeId;
	}

	@Column(name="CONSIGNEE_NAME")
	public String getConsigneeName() {
		return this.consigneeName;
	}


	public void setConsigneeName(String consigneeName) {
		this.consigneeName = consigneeName;
	}

	@Column(name="CONSIGNEE_CONTACT")
	public String getConsigneeContact() {
		return this.consigneeContact;
	}


	public void setConsigneeContact(String consigneeContact) {
		this.consigneeContact = consigneeContact;
	}

	@Column(name="CONSIGNEE_TEL")
	public String getConsigneeTel() {
		return this.consigneeTel;
	}


	public void setConsigneeTel(String consigneeTel) {
		this.consigneeTel = consigneeTel;
	}
	
	@Column(name="DELIVERY_CITY_ID")
	public Integer getDeliveryCityId() {
		return this.deliveryCityId;
	}

	public void setDeliveryCityId(Integer deliveryCityId) {
		this.deliveryCityId = deliveryCityId;
	}

	@Column(name="DELIVERY_CITY")
	public String getDeliveryCity() {
		return this.deliveryCity;
	}

	public void setDeliveryCity(String deliveryCity) {
		this.deliveryCity = deliveryCity;
	}
	
	@Column(name="CARGO_CLASS_NAME")
	public String getCargoClassName() {
		return this.cargoClassName;
	}

	public void setCargoClassName(String cargoClassName) {
		this.cargoClassName = cargoClassName;
	}

	@Column(name="CARGO_CALSS_ID")
	public Integer getCargoClassId() {
		return this.cargoClassId;
	}

	public void setCargoClassId(Integer cargoClassId) {
		this.cargoClassId = cargoClassId;
	}

	@Column(name="PREMIUM_VALUE")
	public BigDecimal getPremiumValue() {
		return this.premiumValue;
	}

	public void setPremiumValue(BigDecimal premiumValue) {
		this.premiumValue = premiumValue;
	}

	@Column(name="PREMIUM_EXPENSE")
	public BigDecimal getPremiumExpense() {
		return this.premiumExpense;
	}

	public void setPremiumExpense(BigDecimal premiumExpense) {
		this.premiumExpense = premiumExpense;
	}

	@Column(name="PREMIUM_RATE")
	public BigDecimal getPremiumRate() {
		return this.premiumRate;
	}

	public void setPremiumRate(BigDecimal premiumRate) {
		this.premiumRate = premiumRate;
	}

	@Column(name="GROSS_WEIGHT_PROVIDER")
	public BigDecimal getGrossWeightProvider() {
		return grossWeightProvider;
	}

	public void setGrossWeightProvider(BigDecimal grossWeightProvider) {
		this.grossWeightProvider = grossWeightProvider;
	}

	@Column(name="MEASUREMENT_PROVIDER")
	public BigDecimal getMeasurementProvider() {
		return measurementProvider;
	}

	public void setMeasurementProvider(BigDecimal measurementProvider) {
		this.measurementProvider = measurementProvider;
	}
	
	@Column(name="STATUS")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
	
	@Column(name = "CONS_NO_HANDLER")
	public String getConsNoHandler() {
		return consNoHandler;
	}

	public void setConsNoHandler(String consNoHandler) {
		this.consNoHandler = consNoHandler;
	}

	@Column(name = "CUST_CONTACT")
	public String getCustContact() {
    	return custContact;
    }

	public void setCustContact(String custContact) {
    	this.custContact = custContact;
    }

	@Column(name = "CUST_ID")
	public Integer getCustId() {
    	return custId;
    }

	public void setCustId(Integer custId) {
    	this.custId = custId;
    }

	@Column(name = "CUST_NAME")
	public String getCustName() {
    	return custName;
    }

	public void setCustName(String custName) {
    	this.custName = custName;
    }

	@Column(name = "CUST_TEL")
	public String getCustTel() {
    	return custTel;
    }

	public void setCustTel(String custTel) {
    	this.custTel = custTel;
    }

	@Column(name = "CUST_FAX")
	public String getCustFax() {
    	return custFax;
    }

	public void setCustFax(String custFax) {
    	this.custFax = custFax;
    }

	@Column(name = "CUST_MOBILE")
	public String getCustMobile() {
    	return custMobile;
    }

	public void setCustMobile(String custMobile) {
    	this.custMobile = custMobile;
    }

	@Column(name="START_STATION")
	public String getStartStation() {
    	return startStation;
    }

	public void setStartStation(String startStation) {
    	this.startStation = startStation;
    }

	@Column(name="ROUTE_STATION")
	public String getRouteStation() {
    	return routeStation;
    }

	public void setRouteStation(String routeStation) {
    	this.routeStation = routeStation;
    }

	@Column(name="END_STATION")
	public String getEndStation() {
    	return endStation;
    }

	public void setEndStation(String endStation) {
    	this.endStation = endStation;
    }

	@Column(name="CONTRACT_NO")
	public String getContractNo() {
    	return contractNo;
    }

	public void setContractNo(String contractNo) {
    	this.contractNo = contractNo;
    }

	@Column(name="POL")
	public String getPol() {
    	return pol;
    }

	public void setPol(String pol) {
    	this.pol = pol;
    }

	@Column(name="CY_BACK")
	public String getCyBack() {
    	return cyBack;
    }

	public void setCyBack(String cyBack) {
    	this.cyBack = cyBack;
    }

	@Column(name="CY_DRAW")
	public String getCyDraw() {
    	return cyDraw;
    }

	public void setCyDraw(String cyDraw) {
    	this.cyDraw = cyDraw;
    }

	@Temporal( TemporalType.DATE)
	@Column(name="DRAW_DATE")
	public Date getDrawDate() {
    	return drawDate;
    }

	public void setDrawDate(Date drawDate) {
    	this.drawDate = drawDate;
    }

	@Column(name="CONTAINER_COMPANY")
	public Integer getContainerCompany() {
    	return containerCompany;
    }

	public void setContainerCompany(Integer containerCompany) {
    	this.containerCompany = containerCompany;
    }

	@Column(name="CONTAINER_COMPANY_NAME")
	public String getContainerCompanyName() {
    	return containerCompanyName;
    }

	public void setContainerCompanyName(String containerCompanyName) {
    	this.containerCompanyName = containerCompanyName;
    }

	@Column(name="CONTAINER_INFO")
	public String getContainerInfo() {
    	return containerInfo;
    }

	public void setContainerInfo(String containerInfo) {
    	this.containerInfo = containerInfo;
    }

    @Temporal( TemporalType.DATE)
	@Column(name="EXPIRY_DATE")
	public Date getExpiryDate() {
    	return expiryDate;
    }

	public void setExpiryDate(Date expiryDate) {
    	this.expiryDate = expiryDate;
    }

	@Temporal( TemporalType.DATE)
	@Column(name="BACK_DATE")
	public Date getBackDate() {
    	return backDate;
    }

	public void setBackDate(Date backDate) {
    	this.backDate = backDate;
    }

	@Temporal( TemporalType.DATE)
	@Column(name="SAIL_DATE")
	public Date getSailDate() {
    	return sailDate;
    }

	public void setSailDate(Date sailDate) {
    	this.sailDate = sailDate;
    }

	@Column(name="SO_NO")
	public String getSoNo() {
    	return soNo;
    }

	public void setSoNo(String soNo) {
    	this.soNo = soNo;
    }

	@Column(name="SO_NO2")
	public String getSoNo2() {
    	return soNo2;
    }

	public void setSoNo2(String soNo2) {
    	this.soNo2 = soNo2;
    }

	@Column(name = "CONS_MBL_NO")
	public String getConsMblNo() {
    	return consMblNo;
    }

	public void setConsMblNo(String consMblNo) {
    	this.consMblNo = consMblNo;
    }

	@Column(name = "CONS_HBL_NO")
	public String getConsHblNo() {
    	return consHblNo;
    }

	public void setConsHblNo(String consHblNo) {
    	this.consHblNo = consHblNo;
    }

	@Column(name = "CONT_TYPE")
	public String getContType() {
    	return contType;
    }

	public void setContType(String contType) {
    	this.contType = contType;
    }

	@Column(name = "CONT_TYPE2")
	public String getContType2() {
    	return contType2;
    }

	public void setContType2(String contType2) {
    	this.contType2 = contType2;
    }

	@Column(name = "CONT_NO")
	public String getContNo() {
    	return contNo;
    }

	public void setContNo(String contNo) {
    	this.contNo = contNo;
    }

	@Column(name = "CONT_NO2")
	public String getContNo2() {
    	return contNo2;
    }

	public void setContNo2(String contNo2) {
    	this.contNo2 = contNo2;
    }

	@Column(name = "CONT_SEAL_NO")
	public String getContSealNo() {
    	return contSealNo;
    }

	public void setContSealNo(String contSealNo) {
    	this.contSealNo = contSealNo;
    }

	@Column(name = "CONT_SEAL_NO2")
	public String getContSealNo2() {
    	return contSealNo2;
    }

	public void setContSealNo2(String contSealNo2) {
    	this.contSealNo2 = contSealNo2;
    }

	@Column(name="VESSEL")
	public String getVessel() {
    	return vessel;
    }

	public void setVessel(String vessel) {
    	this.vessel = vessel;
    }

	@Column(name="VOYAGE")
	public String getVoyage() {
    	return voyage;
    }

	public void setVoyage(String voyage) {
    	this.voyage = voyage;
    }

	@Temporal( TemporalType.DATE)
	@Column(name="CONTRACT_DATE")
	public Date getContractDate() {
    	return contractDate;
    }

	public void setContractDate(Date contractDate) {
    	this.contractDate = contractDate;
    }

	@Column(name="IC_DAYS")
	public Integer getIcDays() {
    	return icDays;
    }

	public void setIcDays(Integer icDays) {
    	this.icDays = icDays;
    }

	@Column(name="CUSTOMS_BROKER")
	public Integer getCustomsBroker() {
    	return customsBroker;
    }

	public void setCustomsBroker(Integer customsBroker) {
    	this.customsBroker = customsBroker;
    }

	@Column(name="CUSTOMS_BROKER_NAME")
	public String getCustomsBrokerName() {
    	return customsBrokerName;
    }

	public void setCustomsBrokerName(String customsBrokerName) {
    	this.customsBrokerName = customsBrokerName;
    }

	@Column(name="CUSTOMS_ADDRESS")
	public String getCustomsAddress() {
    	return customsAddress;
    }

	public void setCustomsAddress(String customsAddress) {
    	this.customsAddress = customsAddress;
    }

	@Column(name="CUSTOMS_CONTACT")
	public String getCustomsContact() {
    	return customsContact;
    }

	public void setCustomsContact(String customsContact) {
    	this.customsContact = customsContact;
    }

	@Column(name="CUSTOMS_TEL")
	public String getCustomsTel() {
    	return customsTel;
    }

	public void setCustomsTel(String customsTel) {
    	this.customsTel = customsTel;
    }
	
	
	
}