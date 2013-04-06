package com.hitisoft.fos.ffop.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "F_CARGO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FCargo extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 5871780935159976951L;
	private String cargBigFlag;
	private Byte cargCudeType;
	private String cargDanagerClass;
	private String cargDanagerFlag;
	private String cargDanagerProperty;
	private String cargEmgTel;
	private String cargEmsNo;
	private String cargFlashPoint;
	private Double cargGrossWeight;
	private Double cargHigh;
	private Double cargHumidity;
	private String cargImdgPage;
	private Double cargLength;
	private String cargManuNo;
	private String cargMarks;
	private Double cargMeasurement;
	private Double cargMeasurementCustomer;
	private Double cargGrossWeightCustomer;
	private String cargMfagNo;
	private String cargNameCn;
	private String cargNameEn;
	private Double cargNetWeight;
	private String cargNo;
	private Integer cargPackageNum;
	private Integer cargPackageSNum;
	private String cargPkgGroup;
	private String cargPollutionFlag;
	private Byte cargQuitFlag;
	private String cargReeterFlag;
	private String cargSpec;
	private String cargSubLabel;
	private Double cargTemperature;
	private Double cargTemperatureHigh;
	private Double cargTemperatureLow;
	private String cargTemperatureUnit;
	private String cargUnNo;
	private String cargVentOutlet;
	private Double cargWidth;
	private Long consId;
	private Long consMasterId;
	private String consMasterNo;
	private String consNo;
	private String packName;
	private String packNameS;
	private String unitName;

	private String consMblNo;
	private String consHblNo;
	private String custName;
	private Integer cargContStatus;
	private String consCustName;

	public FCargo() {
	}

	@Column(name = "CARG_BIG_FLAG")
	public String getCargBigFlag() {
		return this.cargBigFlag;
	}

	public void setCargBigFlag(String cargBigFlag) {
		this.cargBigFlag = cargBigFlag;
	}

	@Column(name = "CARG_CUDE_TYPE")
	public Byte getCargCudeType() {
		return this.cargCudeType;
	}

	public void setCargCudeType(Byte cargCudeType) {
		this.cargCudeType = cargCudeType;
	}

	@Column(name = "CARG_DANAGER_CLASS")
	public String getCargDanagerClass() {
		return this.cargDanagerClass;
	}

	public void setCargDanagerClass(String cargDanagerClass) {
		this.cargDanagerClass = cargDanagerClass;
	}

	@Column(name = "CARG_DANAGER_FLAG")
	public String getCargDanagerFlag() {
		return this.cargDanagerFlag;
	}

	public void setCargDanagerFlag(String cargDanagerFlag) {
		this.cargDanagerFlag = cargDanagerFlag;
	}

	@Column(name = "CARG_DANAGER_PROPERTY")
	public String getCargDanagerProperty() {
		return this.cargDanagerProperty;
	}

	public void setCargDanagerProperty(String cargDanagerProperty) {
		this.cargDanagerProperty = cargDanagerProperty;
	}

	@Column(name = "CARG_EMG_TEL")
	public String getCargEmgTel() {
		return this.cargEmgTel;
	}

	public void setCargEmgTel(String cargEmgTel) {
		this.cargEmgTel = cargEmgTel;
	}

	@Column(name = "CARG_EMS_NO")
	public String getCargEmsNo() {
		return this.cargEmsNo;
	}

	public void setCargEmsNo(String cargEmsNo) {
		this.cargEmsNo = cargEmsNo;
	}

	@Column(name = "CARG_FLASH_POINT")
	public String getCargFlashPoint() {
		return this.cargFlashPoint;
	}

	public void setCargFlashPoint(String cargFlashPoint) {
		this.cargFlashPoint = cargFlashPoint;
	}

	@Column(name = "CARG_GROSS_WEIGHT")
	public Double getCargGrossWeight() {
		return this.cargGrossWeight;
	}

	public void setCargGrossWeight(Double cargGrossWeight) {
		this.cargGrossWeight = cargGrossWeight;
	}

	@Column(name = "CARG_HIGH")
	public Double getCargHigh() {
		return this.cargHigh;
	}

	public void setCargHigh(Double cargHigh) {
		this.cargHigh = cargHigh;
	}

	@Column(name = "CARG_HUMIDITY")
	public Double getCargHumidity() {
		return this.cargHumidity;
	}

	public void setCargHumidity(Double cargHumidity) {
		this.cargHumidity = cargHumidity;
	}

	@Column(name = "CARG_IMDG_PAGE")
	public String getCargImdgPage() {
		return this.cargImdgPage;
	}

	public void setCargImdgPage(String cargImdgPage) {
		this.cargImdgPage = cargImdgPage;
	}

	@Column(name = "CARG_LENGTH")
	public Double getCargLength() {
		return this.cargLength;
	}

	public void setCargLength(Double cargLength) {
		this.cargLength = cargLength;
	}

	@Column(name = "CARG_MANU_NO")
	public String getCargManuNo() {
		return this.cargManuNo;
	}

	public void setCargManuNo(String cargManuNo) {
		this.cargManuNo = cargManuNo;
	}

	@Column(name = "CARG_MARKS")
	public String getCargMarks() {
		return this.cargMarks;
	}

	public void setCargMarks(String cargMarks) {
		this.cargMarks = cargMarks;
	}

	@Column(name = "CARG_MEASUREMENT")
	public Double getCargMeasurement() {
		return this.cargMeasurement;
	}

	public void setCargMeasurement(Double cargMeasurement) {
		this.cargMeasurement = cargMeasurement;
	}

	@Column(name = "CARG_MEASUREMENT_CUSTOMER")
	public Double getCargMeasurementCustomer() {
		return cargMeasurementCustomer;
	}

	public void setCargMeasurementCustomer(Double cargMeasurementCustomer) {
		this.cargMeasurementCustomer = cargMeasurementCustomer;
	}

	@Column(name = "CARG_GROSS_WEIGHT_CUSTOMER")
	public Double getCargGrossWeightCustomer() {
		return cargGrossWeightCustomer;
	}

	public void setCargGrossWeightCustomer(Double cargGrossWeightCustomer) {
		this.cargGrossWeightCustomer = cargGrossWeightCustomer;
	}
	
	@Column(name = "CARG_MFAG_NO")
	public String getCargMfagNo() {
		return this.cargMfagNo;
	}

	public void setCargMfagNo(String cargMfagNo) {
		this.cargMfagNo = cargMfagNo;
	}

	@Column(name = "CARG_NAME_CN")
	public String getCargNameCn() {
		return this.cargNameCn;
	}

	public void setCargNameCn(String cargNameCn) {
		this.cargNameCn = cargNameCn;
	}

	@Column(name = "CARG_NAME_EN")
	public String getCargNameEn() {
		return this.cargNameEn;
	}

	public void setCargNameEn(String cargNameEn) {
		this.cargNameEn = cargNameEn;
	}

	@Column(name = "CARG_NET_WEIGHT")
	public Double getCargNetWeight() {
		return this.cargNetWeight;
	}

	public void setCargNetWeight(Double cargNetWeight) {
		this.cargNetWeight = cargNetWeight;
	}

	@Column(name = "CARG_NO")
	public String getCargNo() {
		return this.cargNo;
	}

	public void setCargNo(String cargNo) {
		this.cargNo = cargNo;
	}

	@Column(name = "CARG_PACKAGE_NUM")
	public Integer getCargPackageNum() {
		return this.cargPackageNum;
	}

	public void setCargPackageNum(Integer cargPackageNum) {
		this.cargPackageNum = cargPackageNum;
	}

	@Column(name = "CARG_PACKAGE_S_NUM")
	public Integer getCargPackageSNum() {
		return this.cargPackageSNum;
	}

	public void setCargPackageSNum(Integer cargPackageSNum) {
		this.cargPackageSNum = cargPackageSNum;
	}

	@Column(name = "CARG_PKG_GROUP")
	public String getCargPkgGroup() {
		return this.cargPkgGroup;
	}

	public void setCargPkgGroup(String cargPkgGroup) {
		this.cargPkgGroup = cargPkgGroup;
	}

	@Column(name = "CARG_POLLUTION_FLAG")
	public String getCargPollutionFlag() {
		return this.cargPollutionFlag;
	}

	public void setCargPollutionFlag(String cargPollutionFlag) {
		this.cargPollutionFlag = cargPollutionFlag;
	}

	@Column(name = "CARG_QUIT_FLAG")
	public Byte getCargQuitFlag() {
		return this.cargQuitFlag;
	}

	public void setCargQuitFlag(Byte cargQuitFlag) {
		this.cargQuitFlag = cargQuitFlag;
	}

	@Column(name = "CARG_REETER_FLAG")
	public String getCargReeterFlag() {
		return this.cargReeterFlag;
	}

	public void setCargReeterFlag(String cargReeterFlag) {
		this.cargReeterFlag = cargReeterFlag;
	}

	@Column(name = "CARG_SPEC")
	public String getCargSpec() {
		return this.cargSpec;
	}

	public void setCargSpec(String cargSpec) {
		this.cargSpec = cargSpec;
	}

	@Column(name = "CARG_SUB_LABEL")
	public String getCargSubLabel() {
		return this.cargSubLabel;
	}

	public void setCargSubLabel(String cargSubLabel) {
		this.cargSubLabel = cargSubLabel;
	}

	@Column(name = "CARG_TEMPERATURE")
	public Double getCargTemperature() {
		return this.cargTemperature;
	}

	public void setCargTemperature(Double cargTemperature) {
		this.cargTemperature = cargTemperature;
	}

	@Column(name = "CARG_TEMPERATURE_HIGH")
	public Double getCargTemperatureHigh() {
		return this.cargTemperatureHigh;
	}

	public void setCargTemperatureHigh(Double cargTemperatureHigh) {
		this.cargTemperatureHigh = cargTemperatureHigh;
	}

	@Column(name = "CARG_TEMPERATURE_LOW")
	public Double getCargTemperatureLow() {
		return this.cargTemperatureLow;
	}

	public void setCargTemperatureLow(Double cargTemperatureLow) {
		this.cargTemperatureLow = cargTemperatureLow;
	}

	@Column(name = "CARG_TEMPERATURE_UNIT")
	public String getCargTemperatureUnit() {
		return this.cargTemperatureUnit;
	}

	public void setCargTemperatureUnit(String cargTemperatureUnit) {
		this.cargTemperatureUnit = cargTemperatureUnit;
	}

	@Column(name = "CARG_UN_NO")
	public String getCargUnNo() {
		return this.cargUnNo;
	}

	public void setCargUnNo(String cargUnNo) {
		this.cargUnNo = cargUnNo;
	}

	@Column(name = "CARG_VENT_OUTLET")
	public String getCargVentOutlet() {
		return this.cargVentOutlet;
	}

	public void setCargVentOutlet(String cargVentOutlet) {
		this.cargVentOutlet = cargVentOutlet;
	}

	@Column(name = "CARG_WIDTH")
	public Double getCargWidth() {
		return this.cargWidth;
	}

	public void setCargWidth(Double cargWidth) {
		this.cargWidth = cargWidth;
	}

	@Column(name = "CONS_ID")
	public Long getConsId() {
		return this.consId;
	}

	public void setConsId(Long consId) {
		this.consId = consId;
	}

	@Column(name = "CONS_MASTER_ID")
	public Long getConsMasterId() {
		return this.consMasterId;
	}

	public void setConsMasterId(Long consMasterId) {
		this.consMasterId = consMasterId;
	}

	@Column(name = "CONS_MASTER_NO")
	public String getConsMasterNo() {
		return this.consMasterNo;
	}

	public void setConsMasterNo(String consMasterNo) {
		this.consMasterNo = consMasterNo;
	}

	@Column(name = "CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Column(name = "PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}

	@Column(name = "PACK_NAME_S")
	public String getPackNameS() {
		return this.packNameS;
	}

	public void setPackNameS(String packNameS) {
		this.packNameS = packNameS;
	}

	@Column(name = "UNIT_NAME")
	public String getUnitName() {
		return this.unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
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
	
	@Column(name = "CARG_CONT_STATUS")
	public Integer getCargContStatus() {
		return cargContStatus;
	}

	public void setCargContStatus(Integer cargContStatus) {
		this.cargContStatus = cargContStatus;
	}
	
	@Column(name = "CONS_CUST_NAME")
	public String getConsCustName() {
		return consCustName;
	}

	public void setConsCustName(String consCustName) {
		this.consCustName = consCustName;
	}
	
	@Transient
	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

}
