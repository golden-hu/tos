package com.hitisoft.fos.ffse.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "S_EXPENSE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SExpense extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 3963354582704087863L;
	/*费用名称表ID*/
	private Long charId;
	private String charName;
	private String charNameEn;
	/*费用类型ID*/
	private Long chclId;
	private String chclCode;
	/*业务性质 E：出口 I：进口 C：内贸*/
	private String consBizClass;
	/*业务类型 M：海运 A：空运 C：报关 I：报检 T：陆运 W：仓储*/
	private String consBizType;
	/*结算对象ID*/
	private Long consCustId;
	private String consCustName;
	private String consHblNo;
	private String consMblNo;
	private String consPolEn;
	private String consPodEn;
	private String consNo;
	private String consNoM;
	private Date consDate;//接单日期
	private Date consSailDate;//开航、发车日期
	private String shliCode; //航线代码
	private Long consSalesRepId;
	private String consSalesRepName;
	private Long consOperatorId;
	private String consOperatorName;
	private Long grouId;	
	private String grouName;
	
	private Long consId;
	private Long consIdM;
	
	
	/*装运方式 FCL LCL BULK*/
	private String consShipType;
	private String vessName;
	private String voyaName;
	/*币别代码*/
	private String currCode;
	private Integer custId;
	/*结算对象名称*/
	private String custName;
	private String custSname;
	private Byte expeAllocatedFlag;
	private Byte expeAllocationFlag;
	private BigDecimal expeCommission;
	private BigDecimal expeCommissionRate;
	/*费用发生日期*/
	private Date expeDate;
	 //汇率
	private BigDecimal expeExRate;
	//代收代付标志
	private Byte expeForwardFlag;
	private Integer expeIdM;
	//已开账单金额
	private BigDecimal expeInvoiceAmount;
	private String expeInvoiceBy;
	/*账单日期*/
	private Date expeInvoiceDate;
	//账单号/系统发票号
	private String expeInvoiceNo;
	/*账单状态 0：未开票 1：部分开票 2：全部开票*/
	private Byte expeInvoiceStatus;
	
	//对账单状态 0 ：未生成对账单 1：已生成对账单 2：已对账
	private Byte expeBillStatus;
	
	private String expeBillNo;
	
	//数量
	private BigDecimal expeNum;
	private BigDecimal expeNum2;
	//本币金额
	private BigDecimal expeRcAmount;
	private String expeRemarks;
	/*费用状态 0：未确认 1：已确认*/
	private Byte expeStatus;
	//税务发票号
	private String expeTaxInvoiceNo;
	//金额
	private BigDecimal expeTotalAmount;
	/*收付类型 R:应收 P:应付*/
	private String expeType;
	/*单价*/
	private BigDecimal expeUnitPrice;
	private String expeUpdateBy;
	private Date expeUpdateTime;
	/*已核销金额*/
	private BigDecimal expeWriteOffAmount;
	private String expeWriteOffBy;
	private Date expeWriteOffDate;
	/*折算本位币的已核销金额*/
	private BigDecimal expeWriteOffRcAmount;
	/*核销状态 0：未核销 1：部分核销 2：已核销*/
	private Byte expeWriteoffStatus;
	private String pateCode;
	private String unitName;
	
	private Short editable;
	
	private Integer objectType= 0;
	private Integer objectId1 = 0;
	private String objectName1;
	private Integer objectId2 = 0;
	private String objectName2;
	
	public SExpense() {
	}

	@Column(name = "CHAR_ID")
	public Long getCharId() {
		return this.charId;
	}

	public void setCharId(Long charId) {
		this.charId = charId;
	}

	@Column(name = "CHAR_NAME")
	public String getCharName() {
		return this.charName;
	}

	public void setCharName(String charName) {
		this.charName = charName;
	}

	@Column(name = "CHAR_NAME_EN")
	public String getCharNameEn() {
		return this.charNameEn;
	}

	public void setCharNameEn(String charNameEn) {
		this.charNameEn = charNameEn;
	}

	@Column(name = "CHCL_ID")
	public Long getChclId() {
		return this.chclId;
	}

	public void setChclId(Long chclId) {
		this.chclId = chclId;
	}

	@Column(name = "CHCL_CODE")
	public String getChclCode() {
		return this.chclCode;
	}

	public void setChclCode(String chclCode) {
		this.chclCode = chclCode;
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

	@Column(name = "CONS_CUST_ID")
	public Long getConsCustId() {
		return this.consCustId;
	}

	public void setConsCustId(Long consCustId) {
		this.consCustId = consCustId;
	}

	@Column(name = "CONS_CUST_NAME")
	public String getConsCustName() {
		return this.consCustName;
	}

	public void setConsCustName(String consCustName) {
		this.consCustName = consCustName;
	}

	@Column(name = "CONS_HBL_NO")
	public String getConsHblNo() {
		return this.consHblNo;
	}

	public void setConsHblNo(String consHblNo) {
		this.consHblNo = consHblNo;
	}

	@Column(name = "CONS_ID")
	public Long getConsId() {
		return this.consId;
	}

	public void setConsId(Long consId) {
		this.consId = consId;
	}

	@Column(name = "CONS_ID_M")
	public Long getConsIdM() {
		return this.consIdM;
	}

	public void setConsIdM(Long consIdM) {
		this.consIdM = consIdM;
	}

	@Column(name = "CONS_MBL_NO")
	public String getConsMblNo() {
		return this.consMblNo;
	}

	public void setConsMblNo(String consMblNo) {
		this.consMblNo = consMblNo;
	}

	@Column(name = "CONS_POL_EN")
	public String getConsPolEn() {
		return this.consPolEn;
	}

	public void setConsPolEn(String consPolEn) {
		this.consPolEn = consPolEn;
	}
	
	@Column(name = "CONS_POD_EN")
	public String getConsPodEn() {
		return this.consPodEn;
	}

	public void setConsPodEn(String consPodEn) {
		this.consPodEn = consPodEn;
	}
	
	@Column(name = "CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Column(name = "CONS_NO_M")
	public String getConsNoM() {
		return this.consNoM;
	}

	public void setConsNoM(String consNoM) {
		this.consNoM = consNoM;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_SAIL_DATE")
	public Date getConsSailDate() {
		return this.consSailDate;
	}

	public void setConsSailDate(Date consSailDate) {
		this.consSailDate = consSailDate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONS_DATE")
	public Date getConsDate() {
		return this.consDate;
	}

	public void setConsDate(Date consDate) {
		this.consDate = consDate;
	}
	
	@Column(name = "CONS_SHIP_TYPE")
	public String getConsShipType() {
		return this.consShipType;
	}

	public void setConsShipType(String consShipType) {
		this.consShipType = consShipType;
	}

	@Column(name = "VESS_NAME")
	public String getVessName() {
		return this.vessName;
	}

	public void setVessName(String vessName) {
		this.vessName = vessName;
	}

	@Column(name = "VOYA_NAME")
	public String getVoyaName() {
		return this.voyaName;
	}

	public void setVoyaName(String voyaName) {
		this.voyaName = voyaName;
	}

	@Column(name = "CURR_CODE")
	public String getCurrCode() {
		return this.currCode;
	}

	public void setCurrCode(String currCode) {
		this.currCode = currCode;
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

	@Column(name = "EXPE_ALLOCATED_FLAG")
	public Byte getExpeAllocatedFlag() {
		return this.expeAllocatedFlag;
	}

	public void setExpeAllocatedFlag(Byte expeAllocatedFlag) {
		this.expeAllocatedFlag = expeAllocatedFlag;
	}

	@Column(name = "EXPE_ALLOCATION_FLAG")
	public Byte getExpeAllocationFlag() {
		return this.expeAllocationFlag;
	}

	public void setExpeAllocationFlag(Byte expeAllocationFlag) {
		this.expeAllocationFlag = expeAllocationFlag;
	}

	@Column(name = "EXPE_COMMISSION")
	public BigDecimal getExpeCommission() {
		return this.expeCommission;
	}

	public void setExpeCommission(BigDecimal expeCommission) {
		this.expeCommission = expeCommission;
	}

	@Column(name = "EXPE_COMMISSION_RATE")
	public BigDecimal getExpeCommissionRate() {
		return this.expeCommissionRate;
	}

	public void setExpeCommissionRate(BigDecimal expeCommissionRate) {
		this.expeCommissionRate = expeCommissionRate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "EXPE_DATE")
	public Date getExpeDate() {
		return this.expeDate;
	}

	public void setExpeDate(Date expeDate) {
		this.expeDate = expeDate;
	}

	@Column(name = "EXPE_EX_RATE")
	public BigDecimal getExpeExRate() {
		return this.expeExRate;
	}

	public void setExpeExRate(BigDecimal expeExRate) {
		this.expeExRate = expeExRate;
	}

	@Column(name = "EXPE_FORWARD_FLAG")
	public Byte getExpeForwardFlag() {
		return this.expeForwardFlag;
	}

	public void setExpeForwardFlag(Byte expeForwardFlag) {
		this.expeForwardFlag = expeForwardFlag;
	}

	@Column(name = "EXPE_ID_M")
	public Integer getExpeIdM() {
		return this.expeIdM;
	}

	public void setExpeIdM(Integer expeIdM) {
		this.expeIdM = expeIdM;
	}
	
	@Column(name = "EXPE_INVOICE_AMOUNT")
	public BigDecimal getExpeInvoiceAmount() {
		return this.expeInvoiceAmount;
	}

	public void setExpeInvoiceAmount(BigDecimal expeInvoiceAmount) {
		this.expeInvoiceAmount = expeInvoiceAmount;
	}

	@Column(name = "EXPE_INVOICE_BY")
	public String getExpeInvoiceBy() {
		return this.expeInvoiceBy;
	}

	public void setExpeInvoiceBy(String expeInvoiceBy) {
		this.expeInvoiceBy = expeInvoiceBy;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "EXPE_INVOICE_DATE")
	public Date getExpeInvoiceDate() {
		return this.expeInvoiceDate;
	}

	public void setExpeInvoiceDate(Date expeInvoiceDate) {
		this.expeInvoiceDate = expeInvoiceDate;
	}

	@Column(name = "EXPE_BILL_NO")
	public String getExpeBillNo() {
		return this.expeBillNo;
	}

	
	public void setExpeBillNo(String expeBillNo) {
		this.expeBillNo = expeBillNo;
	}
	
	@Column(name = "EXPE_BILL_STATUS")
	public Byte getExpeBillStatus() {
		return this.expeBillStatus;
	}

	public void setExpeBillStatus(Byte expeBillStatus) {
		this.expeBillStatus = expeBillStatus;
	}
	
	@Column(name = "EXPE_INVOICE_NO")
	public String getExpeInvoiceNo() {
		return this.expeInvoiceNo;
	}

	
	public void setExpeInvoiceNo(String expeInvoiceNo) {
		this.expeInvoiceNo = expeInvoiceNo;
	}

	@Column(name = "EXPE_INVOICE_STATUS")
	public Byte getExpeInvoiceStatus() {
		return this.expeInvoiceStatus;
	}

	public void setExpeInvoiceStatus(Byte expeInvoiceStatus) {
		this.expeInvoiceStatus = expeInvoiceStatus;
	}

	@Column(name = "EXPE_NUM")
	public BigDecimal getExpeNum() {
		return this.expeNum;
	}

	public void setExpeNum(BigDecimal expeNum) {
		this.expeNum = expeNum;
	}

	@Column(name = "EXPE_NUM2")
	public BigDecimal getExpeNum2() {
		return this.expeNum2;
	}

	public void setExpeNum2(BigDecimal expeNum2) {
		this.expeNum2 = expeNum2;
	}

	@Column(name = "EXPE_RC_AMOUNT")
	public BigDecimal getExpeRcAmount() {
		return this.expeRcAmount;
	}

	public void setExpeRcAmount(BigDecimal expeRcAmount) {
		this.expeRcAmount = expeRcAmount;
	}

	@Column(name = "EXPE_REMARKS")
	public String getExpeRemarks() {
		return this.expeRemarks;
	}

	public void setExpeRemarks(String expeRemarks) {
		this.expeRemarks = expeRemarks;
	}

	@Column(name = "EXPE_STATUS")
	public Byte getExpeStatus() {
		return this.expeStatus;
	}

	public void setExpeStatus(Byte expeStatus) {
		this.expeStatus = expeStatus;
	}

	@Column(name = "EXPE_TAX_INVOICE_NO")
	public String getExpeTaxInvoiceNo() {
		return this.expeTaxInvoiceNo;
	}

	public void setExpeTaxInvoiceNo(String expeTaxInvoiceNo) {
		this.expeTaxInvoiceNo = expeTaxInvoiceNo;
	}

	@Column(name = "EXPE_TOTAL_AMOUNT")
	public BigDecimal getExpeTotalAmount() {
		return this.expeTotalAmount;
	}

	public void setExpeTotalAmount(BigDecimal expeTotalAmount) {
		this.expeTotalAmount = expeTotalAmount;
	}

	@Column(name = "EXPE_TYPE")
	public String getExpeType() {
		return this.expeType;
	}

	public void setExpeType(String expeType) {
		this.expeType = expeType;
	}

	@Column(name = "EXPE_UNIT_PRICE")
	public BigDecimal getExpeUnitPrice() {
		return this.expeUnitPrice;
	}

	public void setExpeUnitPrice(BigDecimal expeUnitPrice) {
		this.expeUnitPrice = expeUnitPrice;
	}

	@Column(name = "EXPE_UPDATE_BY")
	public String getExpeUpdateBy() {
		return this.expeUpdateBy;
	}

	public void setExpeUpdateBy(String expeUpdateBy) {
		this.expeUpdateBy = expeUpdateBy;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "EXPE_UPDATE_TIME")
	public Date getExpeUpdateTime() {
		return this.expeUpdateTime;
	}

	public void setExpeUpdateTime(Date expeUpdateTime) {
		this.expeUpdateTime = expeUpdateTime;
	}

	@Column(name = "EXPE_WRITE_OFF_AMOUNT")
	public BigDecimal getExpeWriteOffAmount() {
		return this.expeWriteOffAmount;
	}

	public void setExpeWriteOffAmount(BigDecimal expeWriteOffAmount) {
		this.expeWriteOffAmount = expeWriteOffAmount;
	}

	@Column(name = "EXPE_WRITE_OFF_BY")
	public String getExpeWriteOffBy() {
		return this.expeWriteOffBy;
	}

	public void setExpeWriteOffBy(String expeWriteOffBy) {
		this.expeWriteOffBy = expeWriteOffBy;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "EXPE_WRITE_OFF_DATE")
	public Date getExpeWriteOffDate() {
		return this.expeWriteOffDate;
	}

	public void setExpeWriteOffDate(Date expeWriteOffDate) {
		this.expeWriteOffDate = expeWriteOffDate;
	}

	@Column(name = "EXPE_WRITE_OFF_RC_AMOUNT")
	public BigDecimal getExpeWriteOffRcAmount() {
		return this.expeWriteOffRcAmount;
	}

	public void setExpeWriteOffRcAmount(BigDecimal expeWriteOffRcAmount) {
		this.expeWriteOffRcAmount = expeWriteOffRcAmount;
	}

	@Column(name = "EXPE_WRITEOFF_STATUS")
	public Byte getExpeWriteoffStatus() {
		return this.expeWriteoffStatus;
	}

	public void setExpeWriteoffStatus(Byte expeWriteoffStatus) {
		this.expeWriteoffStatus = expeWriteoffStatus;
	}

	@Column(name = "PATE_CODE")
	public String getPateCode() {
		return this.pateCode;
	}

	public void setPateCode(String pateCode) {
		this.pateCode = pateCode;
	}

	@Column(name = "UNIT_NAME")
	public String getUnitName() {
		return this.unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	@Transient
	public Short getEditable() {
		return editable;
	}

	public void setEditable(Short editable) {
		this.editable = editable;
	}
	
	@Column(name = "OBJECT_TYPE")
	public Integer getObjectType() {
		return objectType;
	}

	public void setObjectType(Integer objectType) {
		this.objectType = objectType;
	}
	
	@Column(name = "OBJECT_ID1")
	public Integer getObjectId1() {
		return objectId1;
	}

	public void setObjectId1(Integer objectId1) {
		this.objectId1 = objectId1;
	}
	
	@Column(name = "OBJECT_NAME1")
	public String getObjectName1() {
		return this.objectName1;
	}

	public void setObjectName1(String objectName1) {
		this.objectName1 = objectName1;
	}
	
	@Column(name = "OBJECT_ID2")
	public Integer getObjectId2() {
		return this.objectId2;
	}
	
	public void setObjectId2(Integer objectId2) {
		this.objectId2 = objectId2;
	}
	
	@Column(name = "OBJECT_NAME2")
	public String getObjectName2() {
		return this.objectName2;
	}
	
	public void setObjectName2(String objectName2) {
		this.objectName2 = objectName2;
	}
	
	@Column(name = "SHLI_CODE")
	public String getShliCode() {
		return this.shliCode;
	}

	public void setShliCode(String shliCode) {
		this.shliCode = shliCode;
	}
	
	@Column(name = "CONS_SALES_REP_ID")
	public Long getConsSalesRepId() {
		return this.consSalesRepId;
	}

	public void setConsSalesRepId(Long consSalesRepId) {
		this.consSalesRepId = consSalesRepId;
	}

	@Column(name = "CONS_SALES_REP_NAME")
	public String getConsSalesRepName() {
		return this.consSalesRepName;
	}

	public void setConsSalesRepName(String consSalesRepName) {
		this.consSalesRepName = consSalesRepName;
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
}
