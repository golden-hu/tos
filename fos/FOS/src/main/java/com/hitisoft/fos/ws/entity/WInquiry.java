package com.hitisoft.fos.ws.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "W_INQUIRY")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WInquiry extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 8392012249908797320L;
	private Integer pateId;
	private String pateName;
	private String tranCode;
	private Integer tranId;
	private String winqBizType;
	private String winqCargoDesc;
	private BigDecimal winqCargoGw;
	private BigDecimal winqCargoMeasurement;
	private Integer winqCargoPackages;
	private String winqDeliveryPlace;
	private Integer winqPod;
	private String winqPodEn;
	private Integer winqPol;
	private String winqPolEn;
	private String winqReceiptPlace;
	private String winqRemarks;
	private Byte winqStatus;
	private Integer wusrId;
	private String wusrFirstName;
	private String wusrName;
	private String wusrMobile;
	private String wusrEmail;
	private String wusrCompanyName;
	private String wusrTel;
	private Integer custId;

	public WInquiry() {
	}

	@Column(name = "PATE_ID")
	public Integer getPateId() {
		return this.pateId;
	}

	public void setPateId(Integer pateId) {
		this.pateId = pateId;
	}

	@Column(name = "PATE_NAME")
	public String getPateName() {
		return this.pateName;
	}

	public void setPateName(String pateName) {
		this.pateName = pateName;
	}

	@Column(name = "TRAN_CODE")
	public String getTranCode() {
		return this.tranCode;
	}

	public void setTranCode(String tranCode) {
		this.tranCode = tranCode;
	}

	@Column(name = "TRAN_ID")
	public Integer getTranId() {
		return this.tranId;
	}

	public void setTranId(Integer tranId) {
		this.tranId = tranId;
	}

	@Column(name = "WINQ_BIZ_TYPE")
	public String getWinqBizType() {
		return this.winqBizType;
	}

	public void setWinqBizType(String winqBizType) {
		this.winqBizType = winqBizType;
	}

	@Lob()
	@Column(name = "WINQ_CARGO_DESC")
	public String getWinqCargoDesc() {
		return this.winqCargoDesc;
	}

	public void setWinqCargoDesc(String winqCargoDesc) {
		this.winqCargoDesc = winqCargoDesc;
	}

	@Column(name = "WINQ_CARGO_GW")
	public BigDecimal getWinqCargoGw() {
		return this.winqCargoGw;
	}

	public void setWinqCargoGw(BigDecimal winqCargoGw) {
		this.winqCargoGw = winqCargoGw;
	}

	@Column(name = "WINQ_CARGO_MEASUREMENT")
	public BigDecimal getWinqCargoMeasurement() {
		return this.winqCargoMeasurement;
	}

	public void setWinqCargoMeasurement(BigDecimal winqCargoMeasurement) {
		this.winqCargoMeasurement = winqCargoMeasurement;
	}

	@Column(name = "WINQ_CARGO_PACKAGES")
	public Integer getWinqCargoPackages() {
		return this.winqCargoPackages;
	}

	public void setWinqCargoPackages(Integer winqCargoPackages) {
		this.winqCargoPackages = winqCargoPackages;
	}

	@Column(name = "WINQ_DELIVERY_PLACE")
	public String getWinqDeliveryPlace() {
		return this.winqDeliveryPlace;
	}

	public void setWinqDeliveryPlace(String winqDeliveryPlace) {
		this.winqDeliveryPlace = winqDeliveryPlace;
	}

	@Column(name = "WINQ_POD")
	public Integer getWinqPod() {
		return this.winqPod;
	}

	public void setWinqPod(Integer winqPod) {
		this.winqPod = winqPod;
	}

	@Column(name = "WINQ_POD_EN")
	public String getWinqPodEn() {
		return this.winqPodEn;
	}

	public void setWinqPodEn(String winqPodEn) {
		this.winqPodEn = winqPodEn;
	}

	@Column(name = "WINQ_POL")
	public Integer getWinqPol() {
		return this.winqPol;
	}

	public void setWinqPol(Integer winqPol) {
		this.winqPol = winqPol;
	}

	@Column(name = "WINQ_POL_EN")
	public String getWinqPolEn() {
		return this.winqPolEn;
	}

	public void setWinqPolEn(String winqPolEn) {
		this.winqPolEn = winqPolEn;
	}

	@Column(name = "WINQ_RECEIPT_PLACE")
	public String getWinqReceiptPlace() {
		return this.winqReceiptPlace;
	}

	public void setWinqReceiptPlace(String winqReceiptPlace) {
		this.winqReceiptPlace = winqReceiptPlace;
	}

	@Lob()
	@Column(name = "WINQ_REMARKS")
	public String getWinqRemarks() {
		return this.winqRemarks;
	}

	public void setWinqRemarks(String winqRemarks) {
		this.winqRemarks = winqRemarks;
	}

	@Column(name = "WINQ_STATUS")
	public Byte getWinqStatus() {
		return this.winqStatus;
	}

	public void setWinqStatus(Byte winqStatus) {
		this.winqStatus = winqStatus;
	}

	@Column(name = "WUSR_ID")
	public Integer getWusrId() {
		return this.wusrId;
	}

	public void setWusrId(Integer wusrId) {
		this.wusrId = wusrId;
	}

	@Transient
	public String getWusrFirstName() {
		return wusrFirstName;
	}

	public void setWusrFirstName(String wusrFirstName) {
		this.wusrFirstName = wusrFirstName;
	}

	@Transient
	public String getWusrName() {
		return wusrName;
	}

	public void setWusrName(String wusrName) {
		this.wusrName = wusrName;
	}

	@Transient
	public String getWusrMobile() {
		return wusrMobile;
	}

	public void setWusrMobile(String wusrMobile) {
		this.wusrMobile = wusrMobile;
	}

	@Transient
	public String getWusrEmail() {
		return wusrEmail;
	}

	public void setWusrEmail(String wusrEmail) {
		this.wusrEmail = wusrEmail;
	}

	@Transient
	public String getWusrCompanyName() {
		return wusrCompanyName;
	}

	public void setWusrCompanyName(String wusrCompanyName) {
		this.wusrCompanyName = wusrCompanyName;
	}

	@Transient
	public String getWusrTel() {
		return wusrTel;
	}

	public void setWusrTel(String wusrTel) {
		this.wusrTel = wusrTel;
	}

	@Transient
	public Integer getCustId() {
		return custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}
}
