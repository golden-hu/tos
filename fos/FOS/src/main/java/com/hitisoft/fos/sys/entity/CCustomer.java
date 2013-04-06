package com.hitisoft.fos.sys.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "C_CUSTOMER")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CCustomer extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 4792346404728344710L;
	private String attr1;
	private String attr2;
	private String attr3;
	private String attr4;
	private String attr8;
	private String attr9;
	private String attr10;
	private String custCountry;
	private Integer cucaId;
	private String custAccountCny;
	private String custAccountUsd;
	private String custActive;
	private String custAddress;
	private String custAddress2;
	private String custAddress3;
	private Byte custAirFlag;
	private Byte custApFlag;
	private Byte custArFlag;
	private String custBankCny;
	private String custBankUsd;
	private Byte custBookerFlag;
	private Byte custBookingAgencyFlag;
	private Byte custCarrierFlag;
	private Byte custCfsFlag;
	private String custChargeTo;
	private String custCity;
	private String custClass;
	private String custCode;
	private Byte custConsigneeFlag;
	private String custContact;
	private Byte custContainerFlag;
	private Integer custCreditAmount;
	private Integer custCreditDay;
	private Byte custCustomFlag;
	private Byte custDoAgencyFlag;
	private String custEmail;
	private Byte custExpressFlag;
	private String custFax;
	private String custFax2;
	private Integer custIndustry;
	private Byte custInspectionFlag;
	private Byte custInsuranceFlag;
	private String custInvoiceHeader;
	private String custNameCn;
	private String custNameEn;
	private Byte custNotifyFlag;
	private Byte custOverseaAgencyFlag;
	private String custProvince;
	private String custRemarks;
	private Integer custSalesId;
	private String custSalesName;
	private String custShipTo;
	private String custShipper;
	private Byte custShipperFlag;
	private String custSnameCn;
	private String custSnameEn;
	private String custTel;
	private String custTel2;
	private Byte custTrackFlag;
	private Integer custType;
	private String custUrl;
	private Byte custWarehouseFlag;
	private String custZip;
	private Byte custOilFlag;
	private Byte custFactoryFlag;
	
	private Byte marineFlag;
	private Byte airFlag;
	private Byte expressFlag;
	private Byte customsFlag;
	private Byte wmsFlag;
	private Byte tmsFlag;
	
	//添加上级公司id  ADD BY Yongzhixiang  2012-07-02
	private Long parentId;
	
	
	@Column(name="PARENT_ID")
	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public CCustomer() {
	}

	@Column(name = "ATTR1")
	public String getAttr1() {
		return this.attr1;
	}

	public void setAttr1(String attr1) {
		this.attr1 = attr1;
	}

	@Column(name = "ATTR2")
	public String getAttr2() {
		return this.attr2;
	}

	public void setAttr2(String attr2) {
		this.attr2 = attr2;
	}

	@Column(name = "ATTR3")
	public String getAttr3() {
		return this.attr3;
	}

	public void setAttr3(String attr3) {
		this.attr3 = attr3;
	}

	@Column(name = "ATTR4")
	public String getAttr4() {
		return this.attr4;
	}

	public void setAttr4(String attr4) {
		this.attr4 = attr4;
	}

	@Column(name = "CUST_COUNTRY")
	public String getCustCountry() {
		return this.custCountry;
	}

	public void setCustCountry(String custCountry) {
		this.custCountry = custCountry;
	}

	@Column(name = "CUCA_ID")
	public Integer getCucaId() {
		return this.cucaId;
	}

	public void setCucaId(Integer cucaId) {
		this.cucaId = cucaId;
	}

	@Column(name = "CUST_ACCOUNT_CNY")
	public String getCustAccountCny() {
		return this.custAccountCny;
	}

	public void setCustAccountCny(String custAccountCny) {
		this.custAccountCny = custAccountCny;
	}

	@Column(name = "CUST_ACCOUNT_USD")
	public String getCustAccountUsd() {
		return this.custAccountUsd;
	}

	public void setCustAccountUsd(String custAccountUsd) {
		this.custAccountUsd = custAccountUsd;
	}

	@Column(name = "CUST_ACTIVE")
	public String getCustActive() {
		return this.custActive;
	}

	public void setCustActive(String custActive) {
		this.custActive = custActive;
	}

	@Column(name = "CUST_ADDRESS")
	public String getCustAddress() {
		return this.custAddress;
	}

	public void setCustAddress(String custAddress) {
		this.custAddress = custAddress;
	}

	@Column(name = "CUST_ADDRESS2")
	public String getCustAddress2() {
		return this.custAddress2;
	}

	public void setCustAddress2(String custAddress2) {
		this.custAddress2 = custAddress2;
	}

	@Column(name = "CUST_ADDRESS3")
	public String getCustAddress3() {
		return this.custAddress3;
	}

	public void setCustAddress3(String custAddress3) {
		this.custAddress3 = custAddress3;
	}

	@Column(name = "CUST_AIR_FLAG")
	public Byte getCustAirFlag() {
		return this.custAirFlag;
	}

	public void setCustAirFlag(Byte custAirFlag) {
		this.custAirFlag = custAirFlag;
	}

	@Column(name = "CUST_AP_FLAG")
	public Byte getCustApFlag() {
		return this.custApFlag;
	}

	public void setCustApFlag(Byte custApFlag) {
		this.custApFlag = custApFlag;
	}

	@Column(name = "CUST_AR_FLAG")
	public Byte getCustArFlag() {
		return this.custArFlag;
	}

	public void setCustArFlag(Byte custArFlag) {
		this.custArFlag = custArFlag;
	}

	@Column(name = "CUST_BANK_CNY")
	public String getCustBankCny() {
		return this.custBankCny;
	}

	public void setCustBankCny(String custBankCny) {
		this.custBankCny = custBankCny;
	}

	@Column(name = "CUST_BANK_USD")
	public String getCustBankUsd() {
		return this.custBankUsd;
	}

	public void setCustBankUsd(String custBankUsd) {
		this.custBankUsd = custBankUsd;
	}

	@Column(name = "CUST_BOOKER_FLAG")
	public Byte getCustBookerFlag() {
		return this.custBookerFlag;
	}

	public void setCustBookerFlag(Byte custBookerFlag) {
		this.custBookerFlag = custBookerFlag;
	}

	@Column(name = "CUST_BOOKING_AGENCY_FLAG")
	public Byte getCustBookingAgencyFlag() {
		return this.custBookingAgencyFlag;
	}

	public void setCustBookingAgencyFlag(Byte custBookingAgencyFlag) {
		this.custBookingAgencyFlag = custBookingAgencyFlag;
	}

	@Column(name = "CUST_CARRIER_FLAG")
	public Byte getCustCarrierFlag() {
		return this.custCarrierFlag;
	}

	public void setCustCarrierFlag(Byte custCarrierFlag) {
		this.custCarrierFlag = custCarrierFlag;
	}

	@Column(name = "CUST_CFS_FLAG")
	public Byte getCustCfsFlag() {
		return this.custCfsFlag;
	}

	public void setCustCfsFlag(Byte custCfsFlag) {
		this.custCfsFlag = custCfsFlag;
	}

	@Column(name = "CUST_CHARGE_TO")
	public String getCustChargeTo() {
		return this.custChargeTo;
	}

	public void setCustChargeTo(String custChargeTo) {
		this.custChargeTo = custChargeTo;
	}

	@Column(name = "CUST_CITY")
	public String getCustCity() {
		return this.custCity;
	}

	public void setCustCity(String custCity) {
		this.custCity = custCity;
	}

	@Column(name = "CUST_CLASS")
	public String getCustClass() {
		return this.custClass;
	}

	public void setCustClass(String custClass) {
		this.custClass = custClass;
	}

	@Column(name = "CUST_CODE")
	public String getCustCode() {
		return this.custCode;
	}

	public void setCustCode(String custCode) {
		this.custCode = custCode;
	}

	@Column(name = "CUST_CONSIGNEE_FLAG")
	public Byte getCustConsigneeFlag() {
		return this.custConsigneeFlag;
	}

	public void setCustConsigneeFlag(Byte custConsigneeFlag) {
		this.custConsigneeFlag = custConsigneeFlag;
	}

	@Column(name = "CUST_CONTACT")
	public String getCustContact() {
		return this.custContact;
	}

	public void setCustContact(String custContact) {
		this.custContact = custContact;
	}

	@Column(name = "CUST_CONTAINER_FLAG")
	public Byte getCustContainerFlag() {
		return this.custContainerFlag;
	}

	public void setCustContainerFlag(Byte custContainerFlag) {
		this.custContainerFlag = custContainerFlag;
	}

	@Column(name = "CUST_CREDIT_AMOUNT")
	public Integer getCustCreditAmount() {
		return this.custCreditAmount;
	}

	public void setCustCreditAmount(Integer custCreditAmount) {
		this.custCreditAmount = custCreditAmount;
	}

	@Column(name = "CUST_CREDIT_DAY")
	public Integer getCustCreditDay() {
		return this.custCreditDay;
	}

	public void setCustCreditDay(Integer custCreditDay) {
		this.custCreditDay = custCreditDay;
	}

	@Column(name = "CUST_CUSTOM_FLAG")
	public Byte getCustCustomFlag() {
		return this.custCustomFlag;
	}

	public void setCustCustomFlag(Byte custCustomFlag) {
		this.custCustomFlag = custCustomFlag;
	}

	@Column(name = "CUST_DO_AGENCY_FLAG")
	public Byte getCustDoAgencyFlag() {
		return this.custDoAgencyFlag;
	}

	public void setCustDoAgencyFlag(Byte custDoAgencyFlag) {
		this.custDoAgencyFlag = custDoAgencyFlag;
	}

	@Column(name = "CUST_EMAIL")
	public String getCustEmail() {
		return this.custEmail;
	}

	public void setCustEmail(String custEmail) {
		this.custEmail = custEmail;
	}

	@Column(name = "CUST_EXPRESS_FLAG")
	public Byte getCustExpressFlag() {
		return this.custExpressFlag;
	}

	public void setCustExpressFlag(Byte custExpressFlag) {
		this.custExpressFlag = custExpressFlag;
	}

	@Column(name = "CUST_FAX")
	public String getCustFax() {
		return this.custFax;
	}

	public void setCustFax(String custFax) {
		this.custFax = custFax;
	}

	@Column(name = "CUST_FAX2")
	public String getCustFax2() {
		return this.custFax2;
	}

	public void setCustFax2(String custFax2) {
		this.custFax2 = custFax2;
	}

	@Column(name = "CUST_INDUSTRY")
	public Integer getCustIndustry() {
		return this.custIndustry;
	}

	public void setCustIndustry(Integer custIndustry) {
		this.custIndustry = custIndustry;
	}

	@Column(name = "CUST_INSPECTION_FLAG")
	public Byte getCustInspectionFlag() {
		return this.custInspectionFlag;
	}

	public void setCustInspectionFlag(Byte custInspectionFlag) {
		this.custInspectionFlag = custInspectionFlag;
	}

	@Column(name = "CUST_INSURANCE_FLAG")
	public Byte getCustInsuranceFlag() {
		return this.custInsuranceFlag;
	}

	public void setCustInsuranceFlag(Byte custInsuranceFlag) {
		this.custInsuranceFlag = custInsuranceFlag;
	}

	@Column(name = "CUST_INVOICE_HEADER")
	public String getCustInvoiceHeader() {
		return this.custInvoiceHeader;
	}

	public void setCustInvoiceHeader(String custInvoiceHeader) {
		this.custInvoiceHeader = custInvoiceHeader;
	}

	@Column(name = "CUST_NAME_CN")
	public String getCustNameCn() {
		return this.custNameCn;
	}

	public void setCustNameCn(String custNameCn) {
		this.custNameCn = custNameCn;
	}

	@Column(name = "CUST_NAME_EN")
	public String getCustNameEn() {
		return this.custNameEn;
	}

	public void setCustNameEn(String custNameEn) {
		this.custNameEn = custNameEn;
	}

	@Column(name = "CUST_NOTIFY_FLAG")
	public Byte getCustNotifyFlag() {
		return this.custNotifyFlag;
	}

	public void setCustNotifyFlag(Byte custNotifyFlag) {
		this.custNotifyFlag = custNotifyFlag;
	}

	@Column(name = "CUST_OVERSEA_AGENCY_FLAG")
	public Byte getCustOverseaAgencyFlag() {
		return this.custOverseaAgencyFlag;
	}

	public void setCustOverseaAgencyFlag(Byte custOverseaAgencyFlag) {
		this.custOverseaAgencyFlag = custOverseaAgencyFlag;
	}

	@Column(name = "CUST_PROVINCE")
	public String getCustProvince() {
		return this.custProvince;
	}

	public void setCustProvince(String custProvince) {
		this.custProvince = custProvince;
	}

	@Column(name = "CUST_REMARKS")
	public String getCustRemarks() {
		return this.custRemarks;
	}

	public void setCustRemarks(String custRemarks) {
		this.custRemarks = custRemarks;
	}

	@Column(name = "CUST_SALES_ID")
	public Integer getCustSalesId() {
		return this.custSalesId;
	}

	public void setCustSalesId(Integer custSalesId) {
		this.custSalesId = custSalesId;
	}

	@Column(name = "CUST_SALES_NAME")
	public String getCustSalesName() {
		return this.custSalesName;
	}

	public void setCustSalesName(String custSalesName) {
		this.custSalesName = custSalesName;
	}

	@Column(name = "CUST_SHIP_TO")
	public String getCustShipTo() {
		return this.custShipTo;
	}

	public void setCustShipTo(String custShipTo) {
		this.custShipTo = custShipTo;
	}

	@Column(name = "CUST_SHIPPER")
	public String getCustShipper() {
		return this.custShipper;
	}

	public void setCustShipper(String custShipper) {
		this.custShipper = custShipper;
	}

	@Column(name = "CUST_SHIPPER_FLAG")
	public Byte getCustShipperFlag() {
		return this.custShipperFlag;
	}

	public void setCustShipperFlag(Byte custShipperFlag) {
		this.custShipperFlag = custShipperFlag;
	}

	@Column(name = "CUST_SNAME_CN")
	public String getCustSnameCn() {
		return this.custSnameCn;
	}

	public void setCustSnameCn(String custSnameCn) {
		this.custSnameCn = custSnameCn;
	}

	@Column(name = "CUST_SNAME_EN")
	public String getCustSnameEn() {
		return this.custSnameEn;
	}

	public void setCustSnameEn(String custSnameEn) {
		this.custSnameEn = custSnameEn;
	}

	@Column(name = "CUST_TEL")
	public String getCustTel() {
		return this.custTel;
	}

	public void setCustTel(String custTel) {
		this.custTel = custTel;
	}

	@Column(name = "CUST_TEL2")
	public String getCustTel2() {
		return this.custTel2;
	}

	public void setCustTel2(String custTel2) {
		this.custTel2 = custTel2;
	}

	@Column(name = "CUST_TRACK_FLAG")
	public Byte getCustTrackFlag() {
		return this.custTrackFlag;
	}

	public void setCustTrackFlag(Byte custTrackFlag) {
		this.custTrackFlag = custTrackFlag;
	}

	@Column(name = "CUST_TYPE")
	public Integer getCustType() {
		return this.custType;
	}

	public void setCustType(Integer custType) {
		this.custType = custType;
	}

	@Column(name = "CUST_URL")
	public String getCustUrl() {
		return this.custUrl;
	}

	public void setCustUrl(String custUrl) {
		this.custUrl = custUrl;
	}

	@Column(name = "CUST_WAREHOUSE_FLAG")
	public Byte getCustWarehouseFlag() {
		return this.custWarehouseFlag;
	}

	public void setCustWarehouseFlag(Byte custWarehouseFlag) {
		this.custWarehouseFlag = custWarehouseFlag;
	}

	@Column(name = "CUST_ZIP")
	public String getCustZip() {
		return this.custZip;
	}

	public void setCustZip(String custZip) {
		this.custZip = custZip;
	}
	

	@Column(name = "ATTR8")
	public String getAttr8() {
		return this.attr8;
	}

	public void setAttr8(String attr8) {
		this.attr8 = attr8;
	}

	@Column(name = "ATTR9")
	public String getAttr9() {
		return this.attr9;
	}

	public void setAttr9(String attr9) {
		this.attr9 = attr9;
	}
	
	@Column(name = "ATTR10")
	public String getAttr10() {
		return this.attr10;
	}

	public void setAttr10(String attr10) {
		this.attr10 = attr10;
	}

	@Column(name = "CUST_OIL_FLAG")
	public Byte getCustOilFlag() {
		return this.custOilFlag;
	}

	public void setCustOilFlag(Byte custOilFlag) {
		this.custOilFlag = custOilFlag;
	}

	@Column(name = "CUST_FACTORY_FLAG")
	public Byte getCustFactoryFlag() {
		return this.custFactoryFlag;
	}

	public void setCustFactoryFlag(Byte custFactoryFlag) {
		this.custFactoryFlag = custFactoryFlag;
	}

	@Column(name = "MARINE_FLAG")
	public Byte getMarineFlag() {
		return this.marineFlag;
	}

	public void setMarineFlag(Byte marineFlag) {
		this.marineFlag = marineFlag;
	}

	@Column(name = "AIR_FLAG")
	public Byte getAirFlag() {
		return this.airFlag;
	}

	public void setAirFlag(Byte airFlag) {
		this.airFlag = airFlag;
	}

	@Column(name = "EXPRESS_FLAG")
	public Byte getExpressFlag() {
		return this.expressFlag;
	}

	public void setExpressFlag(Byte expressFlag) {
		this.expressFlag = expressFlag;
	}

	@Column(name = "CUSTOMS_FLAG")
	public Byte getCustomsFlag() {
		return this.customsFlag;
	}

	public void setCustomsFlag(Byte customsFlag) {
		this.customsFlag = customsFlag;
	}

	@Column(name = "WMS_FLAG")
	public Byte getWmsFlag() {
		return this.wmsFlag;
	}

	public void setWmsFlag(Byte wmsFlag) {
		this.wmsFlag = wmsFlag;
	}

	@Column(name = "TMS_FLAG")
	public Byte getTmsFlag() {
		return this.tmsFlag;
	}

	public void setTmsFlag(Byte tmsFlag) {
		this.tmsFlag = tmsFlag;
	}
	
}
