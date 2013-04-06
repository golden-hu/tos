package com.hitisoft.fos.ffop.entity;

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
@Table(name = "F_CONTAINER")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FContainer extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 4392241814760576016L;
	private String cargDanagerClass;
	private String cargFlashPoint;
	private String cargImdgPage;
	private String cargTemperature;
	private String cargUnNo;
	private Integer consId;
	private Integer consMasterId;
	private String consMasterNo;
	private String consNo;
	private String contCargoNameCn;
	private String contCargoNameEn;
	private String contDeliveryPlace;
	private String contFl;
	private BigDecimal contGrossWeight;
	private Date contLoadDate;
	private BigDecimal contMeasurement;
	private String contNo;
	private Integer contNum;
	private Integer contPackageNum;
	private String contPartOfFlag;
	private String contPod;
	private String contPol;
	private String contPreFlag;
	private String contRemarks;
	private String contSealNo;
	private String contSealNo2;
	private String contSealNo3;
	private Byte contSocFlag;
	private String contVessel;
	private String contVoyage;
	private Integer cotyId;
	private String packName;

	private String consMblNo;
	private String consPodEn;

	public FContainer() {
	}

	@Column(name = "CARG_DANAGER_CLASS")
	public String getCargDanagerClass() {
		return this.cargDanagerClass;
	}

	public void setCargDanagerClass(String cargDanagerClass) {
		this.cargDanagerClass = cargDanagerClass;
	}

	@Column(name = "CARG_FLASH_POINT")
	public String getCargFlashPoint() {
		return this.cargFlashPoint;
	}

	public void setCargFlashPoint(String cargFlashPoint) {
		this.cargFlashPoint = cargFlashPoint;
	}

	@Column(name = "CARG_IMDG_PAGE")
	public String getCargImdgPage() {
		return this.cargImdgPage;
	}

	public void setCargImdgPage(String cargImdgPage) {
		this.cargImdgPage = cargImdgPage;
	}

	@Column(name = "CARG_TEMPERATURE")
	public String getCargTemperature() {
		return this.cargTemperature;
	}

	public void setCargTemperature(String cargTemperature) {
		this.cargTemperature = cargTemperature;
	}

	@Column(name = "CARG_UN_NO")
	public String getCargUnNo() {
		return this.cargUnNo;
	}

	public void setCargUnNo(String cargUnNo) {
		this.cargUnNo = cargUnNo;
	}

	@Column(name = "CONS_ID")
	public Integer getConsId() {
		return this.consId;
	}

	public void setConsId(Integer consId) {
		this.consId = consId;
	}

	@Column(name = "CONS_MASTER_ID")
	public Integer getConsMasterId() {
		return this.consMasterId;
	}

	public void setConsMasterId(Integer consMasterId) {
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

	@Column(name = "CONT_CARGO_NAME_CN")
	public String getContCargoNameCn() {
		return this.contCargoNameCn;
	}

	public void setContCargoNameCn(String contCargoNameCn) {
		this.contCargoNameCn = contCargoNameCn;
	}

	@Column(name = "CONT_CARGO_NAME_EN")
	public String getContCargoNameEn() {
		return this.contCargoNameEn;
	}

	public void setContCargoNameEn(String contCargoNameEn) {
		this.contCargoNameEn = contCargoNameEn;
	}

	@Column(name = "CONT_DELIVERY_PLACE")
	public String getContDeliveryPlace() {
		return this.contDeliveryPlace;
	}

	public void setContDeliveryPlace(String contDeliveryPlace) {
		this.contDeliveryPlace = contDeliveryPlace;
	}

	@Column(name = "CONT_FL")
	public String getContFl() {
		return this.contFl;
	}

	public void setContFl(String contFl) {
		this.contFl = contFl;
	}

	@Column(name = "CONT_GROSS_WEIGHT")
	public BigDecimal getContGrossWeight() {
		return this.contGrossWeight;
	}

	public void setContGrossWeight(BigDecimal contGrossWeight) {
		this.contGrossWeight = contGrossWeight;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "CONT_LOAD_DATE")
	public Date getContLoadDate() {
		return this.contLoadDate;
	}

	public void setContLoadDate(Date contLoadDate) {
		this.contLoadDate = contLoadDate;
	}

	@Column(name = "CONT_MEASUREMENT")
	public BigDecimal getContMeasurement() {
		return this.contMeasurement;
	}

	public void setContMeasurement(BigDecimal contMeasurement) {
		this.contMeasurement = contMeasurement;
	}

	@Column(name = "CONT_NO")
	public String getContNo() {
		return this.contNo;
	}

	public void setContNo(String contNo) {
		this.contNo = contNo;
	}

	@Column(name = "CONT_NUM")
	public Integer getContNum() {
		return this.contNum;
	}

	public void setContNum(Integer contNum) {
		this.contNum = contNum;
	}

	@Column(name = "CONT_PACKAGE_NUM")
	public Integer getContPackageNum() {
		return this.contPackageNum;
	}

	public void setContPackageNum(Integer contPackageNum) {
		this.contPackageNum = contPackageNum;
	}

	@Column(name = "CONT_PART_OF_FLAG")
	public String getContPartOfFlag() {
		return this.contPartOfFlag;
	}

	public void setContPartOfFlag(String contPartOfFlag) {
		this.contPartOfFlag = contPartOfFlag;
	}

	@Column(name = "CONT_POD")
	public String getContPod() {
		return this.contPod;
	}

	public void setContPod(String contPod) {
		this.contPod = contPod;
	}

	@Column(name = "CONT_POL")
	public String getContPol() {
		return this.contPol;
	}

	public void setContPol(String contPol) {
		this.contPol = contPol;
	}

	@Column(name = "CONT_PRE_FLAG")
	public String getContPreFlag() {
		return this.contPreFlag;
	}

	public void setContPreFlag(String contPreFlag) {
		this.contPreFlag = contPreFlag;
	}

	@Column(name = "CONT_REMARKS")
	public String getContRemarks() {
		return this.contRemarks;
	}

	public void setContRemarks(String contRemarks) {
		this.contRemarks = contRemarks;
	}

	@Column(name = "CONT_SEAL_NO")
	public String getContSealNo() {
		return this.contSealNo;
	}

	public void setContSealNo(String contSealNo) {
		this.contSealNo = contSealNo;
	}

	@Column(name = "CONT_SEAL_NO2")
	public String getContSealNo2() {
		return this.contSealNo2;
	}

	public void setContSealNo2(String contSealNo2) {
		this.contSealNo2 = contSealNo2;
	}

	@Column(name = "CONT_SEAL_NO3")
	public String getContSealNo3() {
		return this.contSealNo3;
	}

	public void setContSealNo3(String contSealNo3) {
		this.contSealNo3 = contSealNo3;
	}

	@Column(name = "CONT_SOC_FLAG")
	public Byte getContSocFlag() {
		return this.contSocFlag;
	}

	public void setContSocFlag(Byte contSocFlag) {
		this.contSocFlag = contSocFlag;
	}

	@Column(name = "CONT_VESSEL")
	public String getContVessel() {
		return this.contVessel;
	}

	public void setContVessel(String contVessel) {
		this.contVessel = contVessel;
	}

	@Column(name = "CONT_VOYAGE")
	public String getContVoyage() {
		return this.contVoyage;
	}

	public void setContVoyage(String contVoyage) {
		this.contVoyage = contVoyage;
	}

	@Column(name = "COTY_ID")
	public Integer getCotyId() {
		return this.cotyId;
	}

	public void setCotyId(Integer cotyId) {
		this.cotyId = cotyId;
	}

	@Column(name = "PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}

	@Transient
	public String getConsMblNo() {
		return consMblNo;
	}

	public void setConsMblNo(String consMblNo) {
		this.consMblNo = consMblNo;
	}

	@Transient
	public String getConsPodEn() {
		return consPodEn;
	}

	public void setConsPodEn(String consPodEn) {
		this.consPodEn = consPodEn;
	}

}
