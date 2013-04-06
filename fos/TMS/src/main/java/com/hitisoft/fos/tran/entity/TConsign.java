package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fos.util.Constants;

import java.math.BigDecimal;
import java.util.Date;


/**
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="T_CONSIGN")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TConsign extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	//操作员ID
	private Integer consOperatorId;
	//操作员
	private String consOperatorName;
	//业务员ID
	private Integer salesRepId;
	//业务员名称
	private String salesRepName;
	//委托单号
	private String consNo;
	//手工单号
	private String consNoHandler;
	//委托日期
	private Date consDate;
	private Integer oriConsId;
	private String oriConsNo;
	//委托归属-记录委托方是发货方还是收货方
	private String consBelong;
	//委托联系人
	private String custContact;
	//委托单位ID
	private Integer custId;
	//委托单位
	private String custName;
	//委托单位简称
	private String custSname;
	//委托座机电话
	private String custTel;
	//委托单位传真
	private String custFax;
	//委托联系人手机
	private String custMobile;
	//发货单位ID
	private Integer shipperId;
	//发货单位
	private String shipperName;
	//发货联系人
	private String shipperContact;
	//发货人电话
	private String shipperTel;
	//发货人手机
	private String shipperMobile;
	//收货单位ID
	private Integer consigneeId;
	//收货单位
	private String consigneeName;
	//付款方式-收货单位支付给‘第三方物流’的付款方式
	private String consigneePateName;
	//收货联系人
	private String consigneeContact;
	//收货联系人手机
	private String consigneeMobile;
	//收货联系人固话
	private String consigneeTel;
	//收货地址
	private String deliveryAddress;
	//收货日期
	private Date deliveryDate;
	//收货时间
	private String deliveryTime;
	//收货省ID
	private Integer deliveryPlaceId;
	//收货省
	private String deliveryPlaceName;
	//收货城市ID
	private Integer deliveryCityId;
	//收货城市
	private String deliveryCity;
	//到付对象ID
	private Integer arrivePayId;
	//到付对象-收货单位直接大款给‘第三方物流’是记录的结算对象
	private String arrivePayName;
	//送货上楼
	private String deliveryDoor;
	//驾驶员ID
	private Integer driverId;
	//驾驶员
	private String driverName;
	//空载公里数
	private BigDecimal emptyMiles;
	//毛重合计
	private BigDecimal grossWeight;
	//业务部门ID
	private Integer grouId;
	//业务部门
	private String grouName;
	//重载公里数据
	private BigDecimal heavyMiles;
	//装货省ID
	private Integer loadPlaceId;
	//装货省名称
	private String loadPlaceName;
	//装货城市ID
	private Integer loadCityId;
	//装货城市
	private String loadCity;
	//装货地点【没有用到】
	private String loadPlace;
	//装货详细地址（提货地址）
	private String loadAddress;
	//装货联系人
	private String loadContact;
	//装货日期
	private Date loadDate;
	//装货联系电话
	private String loadTel;
	//装货时间
	private String loadTime;
	//体积合计(CBM)
	private BigDecimal measurement;
	//包装种类
	private String packName;
	//件数合计
	private Integer packages;
	//付款方式-委托方
	private String pateName;
	//备注
	private String remarks;
	//提货状态0：未提货 1：已提货 2：已到发运  3：已到达
	private Integer status;
	//‘派车状态’ 0未派车，1部分派车，2，全部派车
	private Integer transTaskStatus;
	//‘到货状态’ 0未到货，1部分到货，3，全部到货
	private Integer cargoArrivalStatus;
	
	//回单0:未上传，1：已上传
	private Integer receiptType;
	//费用 0：未确认 1：已确认
	private Integer consStatusExp;
	//车辆ID
	private Integer vehicleId;
	//车牌号
	private String vehicleNo;
	//计划到达日期
	private Date arScheduleDate;
	//到达日期-托运单到货日期
	private Date arNewDate;
	//是否签收0：没有签收 1：已签收
	private Integer signInStatus;
	//订单号
	private String orderNo;
	private String custGrouName;
	//业务类型'T'（陆运‘T’,空运‘A’,海运‘M’,快件‘E’）
	private String consBizType;
	//签收人
	private String signInContact;
	//签收日期
	private Date signInDate;
	//回访电话
	private String feedbackTel;
	//回访日期
	private Date feedbackDate;
	//货物类别
	private String cargoClassName;
	//货物类别ID
	private Integer cargoClassId;
	//货物名称
	private String cargoName;
	//货物价值
	private BigDecimal premiumValue;
	//保费
	private BigDecimal premiumExpense;
	//保费率
	private BigDecimal premiumRate;
	//货物价值(供应商)
	private BigDecimal premiumValueProvider;
	//保费(供应商)
	private BigDecimal premiumExpenseProvider;
	//保费率(供应商)
	private BigDecimal premiumRateProvider;
	//保险公司
	private String premiumCompany;
	//毛重合计(供应商)
	private BigDecimal grossWeightProvider;
	//体积合计(CBM)(供应商)
	private BigDecimal measurementProvider;
	//托运单颜色状态（标准此货问题状态）
	private String consColorStatus;
	
	//第一承运人
	private String motorcadeNo;
	private Integer motorcadeId;
	private String motorcadeName;
	private String motorcadeContact;
	private String motorcadeTel;
	private String motorcadeFax;
	private Integer motorcadeProvinceId;
	private String motorcadeProvince;
	private Integer motorcadeCityId;
	private String motorcadeCity;
	private String motorcadeAddress;
	private Date startDate;														//第一承运商-起运日期
	private Date endDate;														//完成日期（第一承运商-到货日期）
	private String  motorcadePateName;									//付款方式
	private BigDecimal motorcadeExpense;							//总费用（实付运费）
	private BigDecimal motorcadeExpense2;							//物流运费
	private BigDecimal motorcadeExpenseXff;
	private BigDecimal motorcadeExpenseDff;
	private BigDecimal motorcadeExpenseYjf;
	private BigDecimal motorcadeExpenseHdf;
	private BigDecimal motorcadeExpenseHkf;
	//第二承运人
	private Integer motorcade2Id;
	private String motorcade2Name;
	private String motorcade2No;
	private String motorcade2Contact;
	private String motorcade2Tel;
	private String motorcade2Fax;
	private Integer motorcade2ProvinceId;
	private String motorcade2Province;
	private Integer motorcade2CityId;
	private String motorcade2City;
	private String motorcade2Address;
	private BigDecimal motorcade2Expense;							//总费用（实付运费）
	private Date motorcade2StartDate;
	private Date motorcade2EndDate;
	//第三承运人
	private Integer motorcade3Id;
	private String motorcade3Name;
	private String motorcade3No;
	private String motorcade3Contact;
	private String motorcade3Tel;
	private String motorcade3Fax;
	private Integer motorcade3ProvinceId;
	private String motorcade3Province;
	private Integer motorcade3CityId;
	private String motorcade3City;
	private String motorcade3Address;
	private BigDecimal motorcade3Expense;							//总费用
	private Date motorcade3StartDate;
	private Date motorcade3EndDate;
	//运输方式：门到门 自提 等
	private String transportWay;
	//货物状况
	private String cargoStatus;
	//运发单位（工厂）
	private String transportPlace;
	//短信发送次数0：没有发送1：已经发送1次
	private Integer smsStatus;
	//发运网点
	private String startSite;
	//始发站
	private String startStation;
	//路由站
	private String routeStation;
	//目的站
	private String endStation;
	//到达网点
	private String endSite;
	//服务方式
	private String serviceWay;
	//返单类型
	private String feedbackWay;
	//返单份数
	private String feedbackNumber;
	//操作方式
	private String operateWay;
	//服务项目
	private String serviceItems;
	//代客卸载
	private String replaceLoad;
	/**
	 * 集装箱运输
	 */
	//合同号
	private String contractNo;
	//卸货港
	private String pol;
	//预提标记
	private Byte preFlag;
	//车尾标记
	private Byte rearFlag;
	//还箱堆场
	private String cyBack;
	//提箱堆场
	private String cyDraw;
	//提箱日期
	private Date drawDate;
	//箱检标记
	private Byte contFlag;
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
	//是否使用白卡
	private Byte icFlag;
	//商检
	private Byte inspFlag;
	/*作业类型
	0 提箱
	1 产地装箱
	2 验货
	3 转关*/
	private Integer operationType;
	//装货工厂
	private String loadFactory;
	/*运输类型
	0 拖车
	1 货车
	2 水路
	3 铁路*/
	private Integer tranType;
	//车辆类型
	private String transportVehicle;
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
	/**
	 * TMS不同业务版本标志
	 * 0:tms.html,1:tms_v2,2:tms_v3
	 * 3:tms_v4,	4:tms_v5
	 */
	private Integer versionFlag;
	
	/**
	 * 一下几种费用在托运单使用
	 */
	//运费
	private BigDecimal expenseYf;
	//保费
	private BigDecimal expenseBf;
	//代垫费
	private BigDecimal expenseDdf;
	//送货费
	private BigDecimal expenseShf;
	//提货费
	private BigDecimal expenseThf;
	//仓储费
	private BigDecimal expenseCcf;
	//现付-运费
	private BigDecimal expenseXff;
	//到付-运费
	private BigDecimal expenseDff;
	//月结-运费
	private BigDecimal expenseYjf;
	//回单付-运费
	private BigDecimal expenseHdf;
	//代收款（代收费）
	private BigDecimal expenseDsf;
	//委托方付费（实收运费）
	private BigDecimal expenseTotal;
	//总运费（单票运费）
	private BigDecimal expenseTotal2;
	//收货方付费（到付时付的费用）
	private BigDecimal expenseTotal3;
	//收款提交到费用结算,状态0：未提交1：已提交
	private Integer expeSubmitStatus;
	//收款提交到费用结算的日期
	private Date expeSubmitDate;
	//付款提交到费用结算,状态0：未提交1：已提交
	private Integer expeSubmitStatus2;
	//付款提交到费用结算的日期
	private Date expeSubmitDate2;
	//发货单位收核销状态0：未核销1：核销
	private Integer shipWriteOfStatusR;
	//收货单位收核销状态0：未核销1：核销
	private Integer consWriteOfStatusR;
	//物流商收核销状态0：未核销1：核销
	private Integer motoWriteOfStatusR;
	//付款给物流商核销状态0：未核销1：核销
	private Integer motoWriteOfStatusP;
	/**
	 * 一下几种状态是费用结算中使用
	 */
	private Byte consStatus;
	/*应收核销状态 0：未核销 1：部分核销 2：全部核销*/
	private Byte consStatusAr;
	/*应付核销状态 0：未核销 1：部分核销 2：全部核销*/
	private Byte consStatusAp;
	/*应收开票状态 0：未开票 1：部分开票 2：全部开票*/
	private Byte consStatusInvoR;
	/*应付开票状态 0：未开票 1：部分开票 2：全部开票*/
	private Byte consStatusInvoP;
	/*单票审核状态 0：未审核 1：已审核*/
	private Byte consStatusAud;
	/*单票锁定状态
	0：结算锁定（由费用录入完成确认时锁定）
	1：财务经理锁定（单票审核时锁定）*/
	private Byte consStatusLock;
	/**
	 * 一下几种费用是虚拟字段
	 * 模版导出使用
	 * */
	//提货费
	private BigDecimal loadExpense;
	//运费
	private BigDecimal transportExpense;
	//运费(付)
	private BigDecimal transportExpenseP;
	//送货费
	private BigDecimal dispatchExpense;
	//送货费(付)
	private BigDecimal dispatchExpenseP;
	//其他费
	private BigDecimal otherExpense;
	//其他费(付)
	private BigDecimal otherExpenseP;
	//代垫费
	private BigDecimal agencyReceiveExpense;
	//单票合计(收)
	private BigDecimal receiveTotalExpense;
	//单票合计(付)
	private BigDecimal receiveTotalExpenseP;
	//价格（收）
	private BigDecimal expeUnitPriceR;
	//价格（付）
	private BigDecimal expeUnitPriceP;
	//利润
	private BigDecimal margin;
	private String sumMonth;
	//委托号合计
	private Long sumConsNo;
	//件数合计
	private Long sumPackages;
	//毛重合计
	private BigDecimal sumGrossWeight;
	//应收合计
	private Double sumR;
	//应付合计
	private Double sumP;
	private Double sumRP;
	//毛利
	private Double grossProfit;
	private Double cnyGrossProfit;
	private Double usdGrossProfit;
	private Double otherGrossProfit;
	//毛利率(%)
	private String grossProfitRate;
	//应收USD
	private Double sumRUsd;
	//应收CNY
	private Double sumRCny;
	private Double sumROther;
	//应付USD
	private Double sumPUsd;
	//应付CNY
	private Double sumPCny;
	//
	private Double sumPOther;
	
	//应收USD已开票
	private Double sumRUsdInvoice;
	//应收CNY已开票
	private Double sumRCnyInvoice;
	//应付USD已开票
	private Double sumPUsdInvoice;
	//应付CNY已开票
	private Double sumPCnyInvoice;
	//应收USD已核销
	private Double sumRUsdWriteOff;
	//应收CNY已核销
	private Double sumRCnyWriteOff;
	//应付USD已核销
	private Double sumPUsdWriteOff;
	//应付CNY已核销
	private Double sumPCnyWriteOff;
	//0：不可编辑1：可编辑
	private Short editable;
	//台数
	private Integer packagesNo;
	//出货数量
	private Integer packagesOut;
	//包装件数
	private Integer packagesNumber;
	//利润
	private BigDecimal profit;
	//利润合计
	private double sumMargin;
	//中转回扣合计
	private double sumHk;
	//发货方收款合计
	private double sumShipperAmount;
	//收货方收款合计
	private double sumConsAmount;
		
    public TConsign() { }

    @Temporal( TemporalType.DATE)
	@Column(name="BACK_DATE")
	public Date getBackDate() {
		return this.backDate;
	}

	public void setBackDate(Date backDate) {
		this.backDate = backDate;
	}


	@Column(name="CARGO_NAME")
	public String getCargoName() {
		return this.cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}
	
    @Temporal( TemporalType.DATE)
	@Column(name="CONS_DATE")
	public Date getConsDate() {
		return this.consDate;
	}

	public void setConsDate(Date consDate) {
		this.consDate = consDate;
	}


	@Column(name="CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Column(name = "ORI_CONS_ID")
	public Integer getOriConsId() {
		return this.oriConsId;
	}

	public void setOriConsId(Integer oriConsId) {
		this.oriConsId = oriConsId;
	}

	@Column(name = "ORI_CONS_NO")
	public String getOriConsNo() {
		return this.oriConsNo;
	}

	public void setOriConsNo(String oriConsNo) {
		this.oriConsNo = oriConsNo;
	}
	

	@Column(name="CONT_FLAG")
	public Byte getContFlag() {
		return this.contFlag;
	}

	public void setContFlag(Byte contFlag) {
		this.contFlag = contFlag;
	}


	@Column(name="CONTAINER_COMPANY")
	public Integer getContainerCompany() {
		return this.containerCompany;
	}

	public void setContainerCompany(Integer containerCompany) {
		this.containerCompany = containerCompany;
	}


	@Column(name="CONTAINER_COMPANY_NAME")
	public String getContainerCompanyName() {
		return this.containerCompanyName;
	}

	public void setContainerCompanyName(String containerCompanyName) {
		this.containerCompanyName = containerCompanyName;
	}


	@Column(name="CONTAINER_INFO")
	public String getContainerInfo() {
		return this.containerInfo;
	}

	public void setContainerInfo(String containerInfo) {
		this.containerInfo = containerInfo;
	}


	@Column(name="CONTRACT_NO")
	public String getContractNo() {
		return this.contractNo;
	}

	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
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


	@Column(name="CUST_SNAME")
	public String getCustSname() {
		return this.custSname;
	}

	public void setCustSname(String custSname) {
		this.custSname = custSname;
	}


	@Column(name="CUST_TEL")
	public String getCustTel() {
		return this.custTel;
	}

	public void setCustTel(String custTel) {
		this.custTel = custTel;
	}

	@Column(name="CUSTOMS_ADDRESS")
	public String getCustomsAddress() {
		return this.customsAddress;
	}

	public void setCustomsAddress(String customsAddress) {
		this.customsAddress = customsAddress;
	}

	@Column(name="CUSTOMS_BROKER")
	public Integer getCustomsBroker() {
		return this.customsBroker;
	}

	public void setCustomsBroker(Integer customsBroker) {
		this.customsBroker = customsBroker;
	}

	@Column(name="CUSTOMS_BROKER_NAME")
	public String getCustomsBrokerName() {
		return this.customsBrokerName;
	}

	public void setCustomsBrokerName(String customsBrokerName) {
		this.customsBrokerName = customsBrokerName;
	}

	@Column(name="CUSTOMS_CONTACT")
	public String getCustomsContact() {
		return this.customsContact;
	}

	public void setCustomsContact(String customsContact) {
		this.customsContact = customsContact;
	}


	@Column(name="CUSTOMS_TEL")
	public String getCustomsTel() {
		return this.customsTel;
	}

	public void setCustomsTel(String customsTel) {
		this.customsTel = customsTel;
	}


	@Column(name="CY_BACK")
	public String getCyBack() {
		return this.cyBack;
	}

	public void setCyBack(String cyBack) {
		this.cyBack = cyBack;
	}


	@Column(name="CY_DRAW")
	public String getCyDraw() {
		return this.cyDraw;
	}

	public void setCyDraw(String cyDraw) {
		this.cyDraw = cyDraw;
	}


	@Column(name="DELIVERY_ADDRESS")
	public String getDeliveryAddress() {
		return this.deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="DELIVERY_DATE")
	public Date getDeliveryDate() {
		return this.deliveryDate;
	}

	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
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


    @Temporal( TemporalType.DATE)
	@Column(name="DRAW_DATE")
	public Date getDrawDate() {
		return this.drawDate;
	}

	public void setDrawDate(Date drawDate) {
		this.drawDate = drawDate;
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


	@Column(name="EMPTY_MILES")
	public BigDecimal getEmptyMiles() {
		return this.emptyMiles;
	}

	public void setEmptyMiles(BigDecimal emptyMiles) {
		this.emptyMiles = emptyMiles;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="END_DATE")
	public Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}


	@Column(name="GROSS_WEIGHT")
	public BigDecimal getGrossWeight() {
		return this.grossWeight;
	}

	public void setGrossWeight(BigDecimal grossWeight) {
		this.grossWeight = grossWeight;
	}


	@Column(name="GROU_ID")
	public Integer getGrouId() {
		return this.grouId;
	}

	public void setGrouId(Integer grouId) {
		this.grouId = grouId;
	}

	@Column(name="GROU_NAME")
	public String getGrouName() {
		return this.grouName;
	}

	public void setGrouName(String grouName) {
		this.grouName = grouName;
	}
	@Column(name="HEAVY_MILES")
	public BigDecimal getHeavyMiles() {
		return this.heavyMiles;
	}

	public void setHeavyMiles(BigDecimal heavyMiles) {
		this.heavyMiles = heavyMiles;
	}

	@Column(name="IC_DAYS")
	public Integer getIcDays() {
		return this.icDays;
	}

	public void setIcDays(Integer icDays) {
		this.icDays = icDays;
	}


	@Column(name="IC_FLAG")
	public Byte getIcFlag() {
		return this.icFlag;
	}

	public void setIcFlag(Byte icFlag) {
		this.icFlag = icFlag;
	}


	@Column(name="INSP_FLAG")
	public Byte getInspFlag() {
		return this.inspFlag;
	}

	public void setInspFlag(Byte inspFlag) {
		this.inspFlag = inspFlag;
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


    @Temporal( TemporalType.DATE)
	@Column(name="LOAD_DATE")
	public Date getLoadDate() {
		return this.loadDate;
	}

	public void setLoadDate(Date loadDate) {
		this.loadDate = loadDate;
	}


	@Column(name="LOAD_FACTORY")
	public String getLoadFactory() {
		return this.loadFactory;
	}

	public void setLoadFactory(String loadFactory) {
		this.loadFactory = loadFactory;
	}


	@Column(name="LOAD_PLACE")
	public String getLoadPlace() {
		return this.loadPlace;
	}

	public void setLoadPlace(String loadPlace) {
		this.loadPlace = loadPlace;
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

   // @Temporal( TemporalType.TIMESTAMP)
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


	@Column(name="MOTORCADE_CONTACT")
	public String getMotorcadeContact() {
		return this.motorcadeContact;
	}

	public void setMotorcadeContact(String motorcadeContact) {
		this.motorcadeContact = motorcadeContact;
	}


	@Column(name="MOTORCADE_FAX")
	public String getMotorcadeFax() {
		return this.motorcadeFax;
	}

	public void setMotorcadeFax(String motorcadeFax) {
		this.motorcadeFax = motorcadeFax;
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


	@Column(name="OPERATION_TYPE")
	public Integer getOperationType() {
		return this.operationType;
	}

	public void setOperationType(Integer operationType) {
		this.operationType = operationType;
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


	@Column(name="PATE_NAME")
	public String getPateName() {
		return this.pateName;
	}

	public void setPateName(String pateName) {
		this.pateName = pateName;
	}

	@Column(name="MOTORCADE_PATE_NAME")
	public String getMotorcadePateName() {
    	return motorcadePateName;
    }

	public void setMotorcadePateName(String motorcadePateName) {
    	this.motorcadePateName = motorcadePateName;
    }

	@Column(name="POL")
	public String getPol() {
		return this.pol;
	}

	public void setPol(String pol) {
		this.pol = pol;
	}


	@Column(name="PRE_FLAG")
	public Byte getPreFlag() {
		return this.preFlag;
	}

	public void setPreFlag(Byte preFlag) {
		this.preFlag = preFlag;
	}


	@Column(name="REAR_FLAG")
	public Byte getRearFlag() {
		return this.rearFlag;
	}

	public void setRearFlag(Byte rearFlag) {
		this.rearFlag = rearFlag;
	}


	@Column(name="REMARKS")
	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="SAIL_DATE")
	public Date getSailDate() {
		return this.sailDate;
	}

	public void setSailDate(Date sailDate) {
		this.sailDate = sailDate;
	}
	
    @Temporal( TemporalType.DATE)
	@Column(name="EXPIRY_DATE")
	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

	@Column(name="SALES_REP_ID")
	public Integer getSalesRepId() {
		return this.salesRepId;
	}

	public void setSalesRepId(Integer salesRepId) {
		this.salesRepId = salesRepId;
	}

	@Column(name="SALES_REP_NAME")
	public String getSalesRepName() {
		return this.salesRepName;
	}

	public void setSalesRepName(String salesRepName) {
		this.salesRepName = salesRepName;
	}

	@Column(name="SO_NO")
	public String getSoNo() {
		return this.soNo;
	}

	public void setSoNo(String soNo) {
		this.soNo = soNo;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="START_DATE")
	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}


	@Column(name="STATUS")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
	
	@Column(name="CONS_STATUS_EXP")
	public Integer getConsStatusExp() {
		return this.consStatusExp;
	}

	public void setConsStatusExp(Integer consStatusExp) {
		this.consStatusExp = consStatusExp;
	}


	@Column(name="TRAN_TYPE")
	public Integer getTranType() {
		return this.tranType;
	}

	public void setTranType(Integer tranType) {
		this.tranType = tranType;
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

	@Column(name="VESSEL")
	public String getVessel() {
		return this.vessel;
	}

	public void setVessel(String vessel) {
		this.vessel = vessel;
	}

	@Column(name="VOYAGE")
	public String getVoyage() {
		return this.voyage;
	}

	public void setVoyage(String voyage) {
		this.voyage = voyage;
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
	
	@Column(name="LOAD_CITY_ID")
	public Integer getLoadCityId() {
		return this.loadCityId;
	}

	public void setLoadCityId(Integer loadCityId) {
		this.loadCityId = loadCityId;
	}

	@Column(name="LOAD_CITY")
	public String getLoadCity() {
		return this.loadCity;
	}

	public void setLoadCity(String loadCity) {
		this.loadCity = loadCity;
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
	
	@Column(name="SHIPPER_ID")
	public Integer getShipperId() {
		return this.shipperId;
	}

	public void setShipperId(Integer shipperId) {
		this.shipperId = shipperId;
	}

	@Column(name="SHIPPER_NAME")
	public String getShipperName() {
		return this.shipperName;
	}

	public void setShipperName(String shipperName) {
		this.shipperName = shipperName;
	}

	@Column(name="SHIPPER_CONTACT")
	public String getShipperContact() {
		return this.shipperContact;
	}

	public void setShipperContact(String shipperContact) {
		this.shipperContact = shipperContact;
	}

	@Column(name="SHIPPER_TEL")
	public String getShipperTel() {
		return this.shipperTel;
	}

	public void setShipperTel(String shipperTel) {
		this.shipperTel = shipperTel;
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

	@Temporal( TemporalType.DATE)
	@Column(name="CONTRACT_DATE")
	public Date getContractDate() {
		return this.contractDate;
	}

	public void setContractDate(Date contractDate) {
		this.contractDate = contractDate;
	}

	@Temporal( TemporalType.DATE)
	@Column(name="AR_SCHEDULE_DATE")
	public Date getArScheduleDate() {
		return this.arScheduleDate;
	}

	public void setArScheduleDate(Date arScheduleDate) {
		this.arScheduleDate = arScheduleDate;
	}

	@Temporal( TemporalType.DATE)
	@Column(name="AR_NEW_DATE")
	public Date getArNewDate() {
		return this.arNewDate;
	}

	public void setArNewDate(Date arNewDate) {
		this.arNewDate = arNewDate;
	}

	@Column(name="SIGN_IN_STATUS")
	public Integer getSignInStatus() {
		return this.signInStatus;
	}

	public void setSignInStatus(Integer signInStatus) {
		this.signInStatus = signInStatus;
	}

	@Column(name="SO_NO2")
	public String getSoNo2() {
		return this.soNo2;
	}

	public void setSoNo2(String soNo2) {
		this.soNo2 = soNo2;
	}

	@Column(name="ORDER_NO")
	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	@Column(name="CUST_GROU_NAME")
	public String getCustGrouName() {
		return this.custGrouName;
	}

	public void setCustGrouName(String custGrouName) {
		this.custGrouName = custGrouName;
	}

	@Column(name="CONS_BIZ_TYPE")
	public String getConsBizType() {
		return this.consBizType;
	}

	public void setConsBizType(String consBizType) {
		this.consBizType = consBizType;
	}
	
	@Column(name="SIGN_IN_CONTACT")
	public String getSignInContact() {
		return this.signInContact;
	}

	public void setSignInContact(String signInContact) {
		this.signInContact = signInContact;
	}

	@Temporal( TemporalType.DATE)
	@Column(name="SING_IN_DATE")
	public Date getSignInDate() {
		return this.signInDate;
	}

	public void setSignInDate(Date signInDate) {
		this.signInDate = signInDate;
	}

	@Column(name="FEEDBACK_TEL")
	public String getFeedbackTel() {
		return this.feedbackTel;
	}

	public void setFeedbackTel(String feedbackTel) {
		this.feedbackTel = feedbackTel;
	}

	@Temporal( TemporalType.DATE)
	@Column(name="FEEDBACK_DATE")
	public Date getFeedbackDate() {
		return this.feedbackDate;
	}

	public void setFeedbackDate(Date feedbackDate) {
		this.feedbackDate = feedbackDate;
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

	@Column(name="PREMIUM_COMPANY")
	public String getPremiumCompany() {
		return this.premiumCompany;
	}

	public void setPremiumCompany(String premiumCompany) {
		this.premiumCompany = premiumCompany;
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
	
	@Column(name="MOTORCADE_PROVINCE_ID")
	public Integer getMotorcadeProvinceId() {
		return motorcadeProvinceId;
	}

	public void setMotorcadeProvinceId(Integer motorcadeProvinceId) {
		this.motorcadeProvinceId = motorcadeProvinceId;
	}

	@Column(name="MOTORCADE_PROVINCE")
	public String getMotorcadeProvince() {
		return motorcadeProvince;
	}

	public void setMotorcadeProvince(String motorcadeProvince) {
		this.motorcadeProvince = motorcadeProvince;
	}

	@Column(name="MOTORCADE_CITY_ID")
	public Integer getMotorcadeCityId() {
		return motorcadeCityId;
	}

	public void setMotorcadeCityId(Integer motorcadeCityId) {
		this.motorcadeCityId = motorcadeCityId;
	}

	@Column(name="MOTORCADE_CITY")
	public String getMotorcadeCity() {
		return motorcadeCity;
	}

	public void setMotorcadeCity(String motorcadeCity) {
		this.motorcadeCity = motorcadeCity;
	}

	@Column(name="MOTORCADE_ADDRESS")
	public String getMotorcadeAddress() {
		return motorcadeAddress;
	}

	public void setMotorcadeAddress(String motorcadeAddress) {
		this.motorcadeAddress = motorcadeAddress;
	}

	@Column(name="MOTORCADE_EXPENSE")
	public BigDecimal getMotorcadeExpense() {
		return motorcadeExpense;
	}

	public void setMotorcadeExpense(BigDecimal motorcadeExpense) {
		this.motorcadeExpense = motorcadeExpense;
	}

	@Column(name="MOTORCADE2_ID")
	public Integer getMotorcade2Id() {
		return motorcade2Id;
	}

	public void setMotorcade2Id(Integer motorcade2Id) {
		this.motorcade2Id = motorcade2Id;
	}

	@Column(name="MOTORCADE2_NAME")
	public String getMotorcade2Name() {
		return motorcade2Name;
	}

	public void setMotorcade2Name(String motorcade2Name) {
		this.motorcade2Name = motorcade2Name;
	}

	@Column(name="MOTORCADE_NO")
	public String getMotorcadeNo() {
		return this.motorcadeNo;
	}

	public void setMotorcadeNo(String motorcadeNo) {
		this.motorcadeNo = motorcadeNo;
	}
	
	@Column(name="MOTORCADE2_NO")
	public String getMotorcade2No() {
		return this.motorcade2No;
	}

	public void setMotorcade2No(String motorcade2No) {
		this.motorcade2No = motorcade2No;
	}
	
	@Column(name="MOTORCADE2_CONTACT")
	public String getMotorcade2Contact() {
		return motorcade2Contact;
	}

	public void setMotorcade2Contact(String motorcade2Contact) {
		this.motorcade2Contact = motorcade2Contact;
	}

	@Column(name="MOTORCADE2_TEL")
	public String getMotorcade2Tel() {
		return motorcade2Tel;
	}

	public void setMotorcade2Tel(String motorcade2Tel) {
		this.motorcade2Tel = motorcade2Tel;
	}

	@Column(name="MOTORCADE2_FAX")
	public String getMotorcade2Fax() {
		return motorcade2Fax;
	}

	public void setMotorcade2Fax(String motorcade2Fax) {
		this.motorcade2Fax = motorcade2Fax;
	}

	@Column(name="MOTORCADE2_PROVINCE_ID")
	public Integer getMotorcade2ProvinceId() {
		return motorcade2ProvinceId;
	}

	public void setMotorcade2ProvinceId(Integer motorcade2ProvinceId) {
		this.motorcade2ProvinceId = motorcade2ProvinceId;
	}

	@Column(name="MOTORCADE2_PROVINCE")
	public String getMotorcade2Province() {
		return motorcade2Province;
	}

	public void setMotorcade2Province(String motorcade2Province) {
		this.motorcade2Province = motorcade2Province;
	}

	@Column(name="MOTORCADE2_CITY_ID")
	public Integer getMotorcade2CityId() {
		return motorcade2CityId;
	}

	public void setMotorcade2CityId(Integer motorcade2CityId) {
		this.motorcade2CityId = motorcade2CityId;
	}

	@Column(name="MOTORCADE2_CITY")
	public String getMotorcade2City() {
		return motorcade2City;
	}

	public void setMotorcade2City(String motorcade2City) {
		this.motorcade2City = motorcade2City;
	}

	@Column(name="MOTORCADE2_ADDRESS")
	public String getMotorcade2Address() {
		return motorcade2Address;
	}

	public void setMotorcade2Address(String motorcade2Address) {
		this.motorcade2Address = motorcade2Address;
	}

	@Column(name="MOTORCADE2_EXPENSE")
	public BigDecimal getMotorcade2Expense() {
		return motorcade2Expense;
	}

	public void setMotorcade2Expense(BigDecimal motorcade2Expense) {
		this.motorcade2Expense = motorcade2Expense;
	}

	@Column(name="MOTORCADE3_ID")
	public Integer getMotorcade3Id() {
		return motorcade3Id;
	}

	public void setMotorcade3Id(Integer motorcade3Id) {
		this.motorcade3Id = motorcade3Id;
	}

	@Column(name="MOTORCADE3_NAME")
	public String getMotorcade3Name() {
		return motorcade3Name;
	}

	public void setMotorcade3Name(String motorcade3Name) {
		this.motorcade3Name = motorcade3Name;
	}

	@Column(name="MOTORCADE3_CONTACT")
	public String getMotorcade3Contact() {
		return motorcade3Contact;
	}

	public void setMotorcade3Contact(String motorcade3Contact) {
		this.motorcade3Contact = motorcade3Contact;
	}

	@Column(name="MOTORCADE3_NO")
	public String getMotorcade3No() {
		return this.motorcade3No;
	}

	public void setMotorcade3No(String motorcade3No) {
		this.motorcade3No = motorcade3No;
	}

	@Column(name="MOTORCADE3_TEL")
	public String getMotorcade3Tel() {
		return motorcade3Tel;
	}

	public void setMotorcade3Tel(String motorcade3Tel) {
		this.motorcade3Tel = motorcade3Tel;
	}

	@Column(name="MOTORCADE3_FAX")
	public String getMotorcade3Fax() {
		return motorcade3Fax;
	}

	public void setMotorcade3Fax(String motorcade3Fax) {
		this.motorcade3Fax = motorcade3Fax;
	}

	@Column(name="MOTORCADE3_PROVINCE_ID")
	public Integer getMotorcade3ProvinceId() {
		return motorcade3ProvinceId;
	}

	public void setMotorcade3ProvinceId(Integer motorcade3ProvinceId) {
		this.motorcade3ProvinceId = motorcade3ProvinceId;
	}

	@Column(name="MOTORCADE3_PROVINCE")
	public String getMotorcade3Province() {
		return motorcade3Province;
	}

	public void setMotorcade3Province(String motorcade3Province) {
		this.motorcade3Province = motorcade3Province;
	}

	@Column(name="MOTORCADE3_CITY_ID")
	public Integer getMotorcade3CityId() {
		return motorcade3CityId;
	}

	public void setMotorcade3CityId(Integer motorcade3CityId) {
		this.motorcade3CityId = motorcade3CityId;
	}

	@Column(name="MOTORCADE3_CITY")
	public String getMotorcade3City() {
		return motorcade3City;
	}

	public void setMotorcade3City(String motorcade3City) {
		this.motorcade3City = motorcade3City;
	}

	@Column(name="MOTORCADE3_ADDRESS")
	public String getMotorcade3Address() {
		return motorcade3Address;
	}

	public void setMotorcade3Address(String motorcade3Address) {
		this.motorcade3Address = motorcade3Address;
	}

	@Column(name="MOTORCADE3_EXPENSE")
	public BigDecimal getMotorcade3Expense() {
		return motorcade3Expense;
	}

	public void setMotorcade3Expense(BigDecimal motorcade3Expense) {
		this.motorcade3Expense = motorcade3Expense;
	}
	
	@Temporal( TemporalType.DATE)
	@Column(name="MOTORCADE2_START_DATE")
	public Date getMotorcade2StartDate() {
		return motorcade2StartDate;
	}

	public void setMotorcade2StartDate(Date motorcade2StartDate) {
		this.motorcade2StartDate = motorcade2StartDate;
	}

	@Temporal( TemporalType.DATE)
	@Column(name="MOTORCADE2_END_DATE")
	public Date getMotorcade2EndDate() {
		return motorcade2EndDate;
	}

	public void setMotorcade2EndDate(Date motorcade2EndDate) {
		this.motorcade2EndDate = motorcade2EndDate;
	}

	@Temporal( TemporalType.DATE)
	@Column(name="MOTORCADE3_START_DATE")
	public Date getMotorcade3StartDate() {
		return motorcade3StartDate;
	}

	public void setMotorcade3StartDate(Date motorcade3StartDate) {
		this.motorcade3StartDate = motorcade3StartDate;
	}

	@Temporal( TemporalType.DATE)
	@Column(name="MOTORCADE3_END_DATE")
	public Date getMotorcade3EndDate() {
		return motorcade3EndDate;
	}

	public void setMotorcade3EndDate(Date motorcade3EndDate) {
		this.motorcade3EndDate = motorcade3EndDate;
	}

	@Column(name="TRANSPORT_WAY")
	public String getTransportWay() {
		return transportWay;
	}

	public void setTransportWay(String transportWay) {
		this.transportWay = transportWay;
	}

	@Column(name="TRANSPORT_VEHICLE")
	public String getTransportVehicle() {
		return this.transportVehicle;
	}

	public void setTransportVehicle(String transportVehicle) {
		this.transportVehicle = transportVehicle;
	}

	@Column(name="CARGO_STATUS")
	public String getCargoStatus() {
		return this.cargoStatus;
	}

	public void setCargoStatus(String cargoStatus) {
		this.cargoStatus = cargoStatus;
	}

	@Column(name="TRANSPORT_PLACE")
	public String getTransportPlace() {
		return this.transportPlace;
	}

	public void setTransportPlace(String transportPlace) {
		this.transportPlace = transportPlace;
	}

	@Column(name="SMS_STATUS")
	public Integer getSmsStatus() {
		return this.smsStatus;
	}

	public void setSmsStatus(Integer smsStatus) {
		this.smsStatus = smsStatus;
	}

	@Column(name="START_SITE")
	public String getStartSite() {
		return this.startSite;
	}

	public void setStartSite(String startSite) {
		this.startSite = startSite;
	}

	@Column(name="START_STATION")
	public String getStartStation() {
		return this.startStation;
	}

	public void setStartStation(String startStation) {
		this.startStation = startStation;
	}

	@Column(name="ROUTE_STATION")
	public String getRouteStation() {
		return this.routeStation;
	}

	public void setRouteStation(String routeStation) {
		this.routeStation = routeStation;
	}

	@Column(name="END_STATION")
	public String getEndStation() {
		return this.endStation;
	}

	public void setEndStation(String endStation) {
		this.endStation = endStation;
	}

	@Column(name="END_SITE")
	public String getEndSite() {
		return this.endSite;
	}

	public void setEndSite(String endSite) {
		this.endSite = endSite;
	}

	@Column(name="CUST_MOBILE")
	public String getCustMobile() {
		return this.custMobile;
	}

	public void setCustMobile(String custMobile) {
		this.custMobile = custMobile;
	}

	@Column(name="CONSIGNEE_MOBILE")
	public String getConsigneeMobile() {
		return this.consigneeMobile;
	}

	public void setConsigneeMobile(String consigneeMobile) {
		this.consigneeMobile = consigneeMobile;
	}

	@Column(name="SERVICE_WAY")
	public String getServiceWay() {
		return this.serviceWay;
	}

	public void setServiceWay(String serviceWay) {
		this.serviceWay = serviceWay;
	}

	@Column(name="FEEDBACK_WAY")
	public String getFeedbackWay() {
		return this.feedbackWay;
	}

	public void setFeedbackWay(String feedbackWay) {
		this.feedbackWay = feedbackWay;
	}

	@Column(name="FEEDBACK_NUMBER")
	public String getFeedbackNumber() {
		return this.feedbackNumber;
	}

	public void setFeedbackNumber(String feedbackNumber) {
		this.feedbackNumber = feedbackNumber;
	}

	@Column(name="OPERATE_WAY")
	public String getOperateWay() {
		return this.operateWay;
	}

	public void setOperateWay(String operateWay) {
		this.operateWay = operateWay;
	}

	@Column(name="SERVICE_ITEMS")
	public String getServiceItems() {
		return this.serviceItems;
	}

	public void setServiceItems(String serviceItems) {
		this.serviceItems = serviceItems;
	}
	
	@Column(name = "DELIVERY_DOOR")
	public String getDeliveryDoor() {
		return deliveryDoor;
	}

	public void setDeliveryDoor(String deliveryDoor) {
		this.deliveryDoor = deliveryDoor;
	}

	@Column(name = "REPLACE_LOAD")
	public String getReplaceLoad() {
		return replaceLoad;
	}

	public void setReplaceLoad(String replaceLoad) {
		this.replaceLoad = replaceLoad;
	}
	
	@Transient
	public BigDecimal getLoadExpense() {
		return this.loadExpense;
	}

	public void setLoadExpense(BigDecimal loadExpense) {
		this.loadExpense = loadExpense;
	}
	@Transient
	public BigDecimal getTransportExpense() {
		return this.transportExpense;
	}

	public void setTransportExpense(BigDecimal transportExpense) {
		this.transportExpense = transportExpense;
	}
	@Transient
	public BigDecimal getDispatchExpense() {
		return this.dispatchExpense;
	}

	public void setDispatchExpense(BigDecimal dispatchExpense) {
		this.dispatchExpense = dispatchExpense;
	}
	@Transient
	public BigDecimal getOtherExpense() {
		return this.otherExpense;
	}

	public void setOtherExpense(BigDecimal otherExpense) {
		this.otherExpense = otherExpense;
	}

	@Transient
	public BigDecimal getAgencyReceiveExpense() {
		return this.agencyReceiveExpense;
	}

	public void setAgencyReceiveExpense(BigDecimal agencyReceiveExpense) {
		this.agencyReceiveExpense = agencyReceiveExpense;
	}
	
	@Column(name = "CONS_OPERATOR_ID")
	public Integer getConsOperatorId() {
		return this.consOperatorId;
	}

	public void setConsOperatorId(Integer consOperatorId) {
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

	@Column(name = "PREMIUM_VALUE_PROVIDER")
	public BigDecimal getPremiumValueProvider() {
		return this.premiumValueProvider;
	}

	public void setPremiumValueProvider(BigDecimal premiumValueProvider) {
		this.premiumValueProvider = premiumValueProvider;
	}

	@Column(name = "PREMIUM_EXPENSE_PROVIDER")
	public BigDecimal getPremiumExpenseProvider() {
		return this.premiumExpenseProvider;
	}

	public void setPremiumExpenseProvider(BigDecimal premiumExpenseProvider) {
		this.premiumExpenseProvider = premiumExpenseProvider;
	}

	@Column(name = "PREMIUM_RATE_PROVIDER")
	public BigDecimal getPremiumRateProvider() {
		return this.premiumRateProvider;
	}

	public void setPremiumRateProvider(BigDecimal premiumRateProvider) {
		this.premiumRateProvider = premiumRateProvider;
	}

	@Transient
	public Integer getPackagesNo() {
		return this.packagesNo;
	}

	public void setPackagesNo(Integer packagesNo) {
		this.packagesNo = packagesNo;
	}

	@Transient
	public Integer getPackagesOut() {
		return this.packagesOut;
	}

	public void setPackagesOut(Integer packagesOut) {
		this.packagesOut = packagesOut;
	}
	
	@Transient
	public Integer getPackagesNumber() {
		return this.packagesNumber;
	}

	public void setPackagesNumber(Integer packagesNumber) {
		this.packagesNumber = packagesNumber;
	}

	@Transient
	public BigDecimal getReceiveTotalExpense() {
		return this.receiveTotalExpense;
	}

	public void setReceiveTotalExpense(BigDecimal receiveTotalExpense) {
		this.receiveTotalExpense = receiveTotalExpense;
	}

	@Transient
	public BigDecimal getExpeUnitPriceR() {
		return this.expeUnitPriceR;
	}

	public void setExpeUnitPriceR(BigDecimal expeUnitPriceR) {
		this.expeUnitPriceR = expeUnitPriceR;
	}

	@Transient
	public BigDecimal getExpeUnitPriceP() {
		return this.expeUnitPriceP;
	}

	public void setExpeUnitPriceP(BigDecimal expeUnitPriceP) {
		this.expeUnitPriceP = expeUnitPriceP;
	}

	@Transient
	public BigDecimal getReceiveTotalExpenseP() {
		return this.receiveTotalExpenseP;
	}

	public void setReceiveTotalExpenseP(BigDecimal receiveTotalExpenseP) {
		this.receiveTotalExpenseP = receiveTotalExpenseP;
	}

	@Transient
	public BigDecimal getDispatchExpenseP() {
		return this.dispatchExpenseP;
	}

	public void setDispatchExpenseP(BigDecimal dispatchExpenseP) {
		this.dispatchExpenseP = dispatchExpenseP;
	}

	@Transient
	public BigDecimal getMargin() {
		return this.margin;
	}

	public void setMargin(BigDecimal margin) {
		this.margin = margin;
	}

	@Transient
	public BigDecimal getTransportExpenseP() {
		return this.transportExpenseP;
	}

	public void setTransportExpenseP(BigDecimal transportExpenseP) {
		this.transportExpenseP = transportExpenseP;
	}

	@Transient
	public BigDecimal getOtherExpenseP() {
		return this.otherExpenseP;
	}

	public void setOtherExpenseP(BigDecimal otherExpenseP) {
		this.otherExpenseP = otherExpenseP;
	}

	@Column(name="RECEIPT_TYPE")
	public Integer getReceiptType() {
		return receiptType;
	}

	public void setReceiptType(Integer receiptType) {
		this.receiptType = receiptType;
	}
	
	@Transient
	public BigDecimal getProfit() {
		return this.profit;
	}

	public void setProfit(BigDecimal profit) {
		this.profit = profit;
	}

	@Column(name = "EXPENSE_BF")
	public BigDecimal getExpenseBf() {
		return expenseBf;
	}

	public void setExpenseBf(BigDecimal expenseBf) {
		this.expenseBf = expenseBf;
	}

	@Column(name = "EXPENSE_DDF")
	public BigDecimal getExpenseDdf() {
		return expenseDdf;
	}

	public void setExpenseDdf(BigDecimal expenseDdf) {
		this.expenseDdf = expenseDdf;
	}

	@Column(name = "EXPENSE_SHF")
	public BigDecimal getExpenseShf() {
		return expenseShf;
	}

	public void setExpenseShf(BigDecimal expenseShf) {
		this.expenseShf = expenseShf;
	}

	@Column(name = "EXPENSE_YF")
	public BigDecimal getExpenseYf() {
		return expenseYf;
	}

	public void setExpenseYf(BigDecimal expenseYf) {
		this.expenseYf = expenseYf;
	}

	@Column(name = "EXPENSE_THF")
	public BigDecimal getExpenseThf() {
		return expenseThf;
	}

	public void setExpenseThf(BigDecimal expenseThf) {
		this.expenseThf = expenseThf;
	}
	
	@Column(name = "EXPENSE_CCF")
	public BigDecimal getExpenseCcf() {
		return expenseCcf;
	}

	public void setExpenseCcf(BigDecimal expenseCcf) {
		this.expenseCcf = expenseCcf;
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

	@Column(name = "EXPENSE_YJF")
	public BigDecimal getExpenseYjf() {
		return expenseYjf;
	}

	public void setExpenseYjf(BigDecimal expenseYjf) {
		this.expenseYjf = expenseYjf;
	}

	@Column(name = "EXPENSE_HDF")
	public BigDecimal getExpenseHdf() {
		return expenseHdf;
	}

	public void setExpenseHdf(BigDecimal expenseHdf) {
		this.expenseHdf = expenseHdf;
	}

	@Column(name = "EXPENSE_DSF")
	public BigDecimal getExpenseDsf() {
		return expenseDsf;
	}

	public void setExpenseDsf(BigDecimal expenseDsf) {
		this.expenseDsf = expenseDsf;
	}

	@Column(name = "CONS_NO_HANDLER")
	public String getConsNoHandler() {
		return consNoHandler;
	}

	public void setConsNoHandler(String consNoHandler) {
		this.consNoHandler = consNoHandler;
	}

	@Column(name = "MOTORCADE_EXPENSE_XFF")
	public BigDecimal getMotorcadeExpenseXff() {
		return motorcadeExpenseXff;
	}

	public void setMotorcadeExpenseXff(BigDecimal motorcadeExpenseXff) {
		this.motorcadeExpenseXff = motorcadeExpenseXff;
	}

	@Column(name = "MOTORCADE_EXPENSE_DFF")
	public BigDecimal getMotorcadeExpenseDff() {
		return motorcadeExpenseDff;
	}

	public void setMotorcadeExpenseDff(BigDecimal motorcadeExpenseDff) {
		this.motorcadeExpenseDff = motorcadeExpenseDff;
	}

	@Column(name = "MOTORCADE_EXPENSE_YJF")
	public BigDecimal getMotorcadeExpenseYjf() {
		return motorcadeExpenseYjf;
	}

	public void setMotorcadeExpenseYjf(BigDecimal motorcadeExpenseYjf) {
		this.motorcadeExpenseYjf = motorcadeExpenseYjf;
	}

	@Column(name = "MOTORCADE_EXPENSE_HDF")
	public BigDecimal getMotorcadeExpenseHdf() {
		return motorcadeExpenseHdf;
	}

	public void setMotorcadeExpenseHdf(BigDecimal motorcadeExpenseHdf) {
		this.motorcadeExpenseHdf = motorcadeExpenseHdf;
	}

	@Column(name = "MOTORCADE_EXPENSE_HKF")
	public BigDecimal getMotorcadeExpenseHkf() {
		return motorcadeExpenseHkf;
	}

	public void setMotorcadeExpenseHkf(BigDecimal motorcadeExpenseHkf) {
		this.motorcadeExpenseHkf = motorcadeExpenseHkf;
	}

	@Column(name = "EXPENSE_TOTAL")
	public BigDecimal getExpenseTotal() {
		return expenseTotal;
	}

	public void setExpenseTotal(BigDecimal expenseTotal) {
		this.expenseTotal = expenseTotal;
	}
	
	@Column(name = "EXPE_SUBMIT_STATUS")
	public Integer getExpeSubmitStatus() {
		return expeSubmitStatus;
	}

	public void setExpeSubmitStatus(Integer expeSubmitStatus) {
		this.expeSubmitStatus = expeSubmitStatus;
	}

	@Column(name = "EXPE_SUBMIT_STATUS2")
	public Integer getExpeSubmitStatus2() {
		return expeSubmitStatus2;
	}

	public void setExpeSubmitStatus2(Integer expeSubmitStatus2) {
		this.expeSubmitStatus2 = expeSubmitStatus2;
	}
	
	@Column(name = "EXPENSE_TOTAL2")
	public BigDecimal getExpenseTotal2() {
		return expenseTotal2;
	}

	public void setExpenseTotal2(BigDecimal expenseTotal2) {
		this.expenseTotal2 = expenseTotal2;
	}
	
	@Column(name = "EXPENSE_TOTAL3")
	public BigDecimal getExpenseTotal3() {
    	return expenseTotal3;
    }

	public void setExpenseTotal3(BigDecimal expenseTotal3) {
    	this.expenseTotal3 = expenseTotal3;
    }

	@Column(name="MOTORCADE_EXPENSE2")
	public BigDecimal getMotorcadeExpense2() {
		return motorcadeExpense2;
	}

	public void setMotorcadeExpense2(BigDecimal motorcadeExpense2) {
		this.motorcadeExpense2 = motorcadeExpense2;
	}
	@Transient
	public double getSumMargin() {
    	return sumMargin;
    }

	public void setSumMargin(double sumMargin) {
    	this.sumMargin = sumMargin;
    }
	@Transient
	public double getSumHk() {
    	return sumHk;
    }

	public void setSumHk(double sumHk) {
    	this.sumHk = sumHk;
    }
	
	@Column(name = "CONS_BELONG")
	public String getConsBelong() {
    	return consBelong;
    }
	public void setConsBelong(String consBelong) {
    	this.consBelong = consBelong;
    }
	
	@Column(name = "ARRIVE_PAY_ID")
	public Integer getArrivePayId() {
    	return arrivePayId;
    }

	public void setArrivePayId(Integer arrivePayId) {
    	this.arrivePayId = arrivePayId;
    }
	
	@Column(name = "ARRIVE_PAY_NAME")
	public String getArrivePayName() {
    	return arrivePayName;
    }

	public void setArrivePayName(String arrivePayName) {
    	this.arrivePayName = arrivePayName;
    }

	@Column(name = "SHIPPER_MOBILE")
	public String getShipperMobile() {
    	return shipperMobile;
    }

	public void setShipperMobile(String shipperMobile) {
    	this.shipperMobile = shipperMobile;
    }

	@Column(name = "CONSIGNEE_PATE_NAME")
	public String getConsigneePateName() {
    	return consigneePateName;
    }

	public void setConsigneePateName(String consigneePateName) {
    	this.consigneePateName = consigneePateName;
    }

	@Column(name = "SHIP_WRITE_OF_STATUS_R")
	public Integer getShipWriteOfStatusR() {
    	return shipWriteOfStatusR;
    }

	public void setShipWriteOfStatusR(Integer shipWriteOfStatusR) {
    	this.shipWriteOfStatusR = shipWriteOfStatusR;
    }

	@Column(name = "CONS_WRITE_OF_STATUS_R")
	public Integer getConsWriteOfStatusR() {
    	return consWriteOfStatusR;
    }

	public void setConsWriteOfStatusR(Integer consWriteOfStatusR) {
    	this.consWriteOfStatusR = consWriteOfStatusR;
    }

	@Column(name = "MOTO_WRITE_OF_STATUS_R")
	public Integer getMotoWriteOfStatusR() {
    	return motoWriteOfStatusR;
    }

	public void setMotoWriteOfStatusR(Integer motoWriteOfStatusR) {
    	this.motoWriteOfStatusR = motoWriteOfStatusR;
    }

	@Column(name = "MOTO_WRITE_OF_STATUS_P")
	public Integer getMotoWriteOfStatusP() {
    	return motoWriteOfStatusP;
    }

	public void setMotoWriteOfStatusP(Integer motoWriteOfStatusP) {
    	this.motoWriteOfStatusP = motoWriteOfStatusP;
    }
	
	@Transient
	public double getSumShipperAmount() {
    	return sumShipperAmount;
    }

	public void setSumShipperAmount(double sumShipperAmount) {
    	this.sumShipperAmount = sumShipperAmount;
    }

	@Transient
	public double getSumConsAmount() {
    	return sumConsAmount;
    }

	public void setSumConsAmount(double sumConsAmount) {
    	this.sumConsAmount = sumConsAmount;
    }

	@Column(name = "CONS_COLOR_STATUS")
	public String getConsColorStatus() {
    	return consColorStatus;
    }

	public void setConsColorStatus(String consColorStatus) {
    	this.consColorStatus = consColorStatus;
    }
	
	@Temporal( TemporalType.DATE)
	@Column(name = "EXPE_SUBMIT_DATE")
	public Date getExpeSubmitDate() {
    	return expeSubmitDate;
    }

	public void setExpeSubmitDate(Date expeSubmitDate) {
    	this.expeSubmitDate = expeSubmitDate;
    }
	
	@Temporal( TemporalType.DATE)
	@Column(name = "EXPE_SUBMIT_DATE2")
	public Date getExpeSubmitDate2() {
    	return expeSubmitDate2;
    }

	public void setExpeSubmitDate2(Date expeSubmitDate2) {
    	this.expeSubmitDate2 = expeSubmitDate2;
    }

	@Column(name = "TRANS_TASK_STATUS")
	public Integer getTransTaskStatus() {
    	return transTaskStatus;
    }

	public void setTransTaskStatus(Integer transTaskStatus) {
    	this.transTaskStatus = transTaskStatus;
    }
	
	@Column(name = "CARGO_ARRIVAL_STATUS")
	public Integer getCargoArrivalStatus() {
    	return cargoArrivalStatus;
    }

	public void setCargoArrivalStatus(Integer cargoArrivalStatus) {
    	this.cargoArrivalStatus = cargoArrivalStatus;
    }

	@Transient
	public Double getSumRP() {
    	return sumRP;
    }

	public void setSumRP(Double sumRP) {
    	this.sumRP = sumRP;
    }

	@Column(name = "DELIVERY_TIME")
	public String getDeliveryTime() {
    	return deliveryTime;
    }

	public void setDeliveryTime(String deliveryTime) {
    	this.deliveryTime = deliveryTime;
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

	@Column(name = "VERSION_FLAG")
	public Integer getVersionFlag() {
    	return versionFlag;
    }

	public void setVersionFlag(Integer versionFlag) {
    	this.versionFlag = versionFlag;
    }
	
	
}