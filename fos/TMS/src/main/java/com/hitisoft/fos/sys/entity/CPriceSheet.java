package com.hitisoft.fos.sys.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "C_PRICE_SHEET")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CPriceSheet extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 6066842036335868722L;
	private String prshBizType;
	private Integer prshCarrier;
	private String prshCarrierName;
	private String prshContractNo;
	private Date prshEndDate;
	private String prshPolEn;
	private String prshPolHarbour;
	private String prshRemarks;
	private Date prshStartDate;
	private Byte prshStatus;
	private Integer prshVendorId;
	private String prshVendorName;
	private String shliName;
	private String vessName;
	private String voyaName;

	public CPriceSheet() {
	}

	@Column(name = "PRSH_BIZ_TYPE")
	public String getPrshBizType() {
		return this.prshBizType;
	}

	public void setPrshBizType(String prshBizType) {
		this.prshBizType = prshBizType;
	}

	@Column(name = "PRSH_CARRIER")
	public Integer getPrshCarrier() {
		return this.prshCarrier;
	}

	public void setPrshCarrier(Integer prshCarrier) {
		this.prshCarrier = prshCarrier;
	}

	@Column(name = "PRSH_CARRIER_NAME")
	public String getPrshCarrierName() {
		return this.prshCarrierName;
	}

	public void setPrshCarrierName(String prshCarrierName) {
		this.prshCarrierName = prshCarrierName;
	}

	@Column(name = "PRSH_CONTRACT_NO")
	public String getPrshContractNo() {
		return this.prshContractNo;
	}

	public void setPrshContractNo(String prshContractNo) {
		this.prshContractNo = prshContractNo;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "PRSH_END_DATE")
	public Date getPrshEndDate() {
		return this.prshEndDate;
	}

	public void setPrshEndDate(Date prshEndDate) {
		this.prshEndDate = prshEndDate;
	}

	@Column(name = "PRSH_POL_EN")
	public String getPrshPolEn() {
		return this.prshPolEn;
	}

	public void setPrshPolEn(String prshPolEn) {
		this.prshPolEn = prshPolEn;
	}

	@Column(name = "PRSH_POL_HARBOUR")
	public String getPrshPolHarbour() {
		return this.prshPolHarbour;
	}

	public void setPrshPolHarbour(String prshPolHarbour) {
		this.prshPolHarbour = prshPolHarbour;
	}

	@Column(name = "PRSH_REMARKS")
	public String getPrshRemarks() {
		return this.prshRemarks;
	}

	public void setPrshRemarks(String prshRemarks) {
		this.prshRemarks = prshRemarks;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "PRSH_START_DATE")
	public Date getPrshStartDate() {
		return this.prshStartDate;
	}

	public void setPrshStartDate(Date prshStartDate) {
		this.prshStartDate = prshStartDate;
	}

	@Column(name = "PRSH_STATUS")
	public Byte getPrshStatus() {
		return this.prshStatus;
	}

	public void setPrshStatus(Byte prshStatus) {
		this.prshStatus = prshStatus;
	}

	@Column(name = "PRSH_VENDOR_ID")
	public Integer getPrshVendorId() {
		return this.prshVendorId;
	}

	public void setPrshVendorId(Integer prshVendorId) {
		this.prshVendorId = prshVendorId;
	}

	@Column(name = "PRSH_VENDOR_NAME")
	public String getPrshVendorName() {
		return this.prshVendorName;
	}

	public void setPrshVendorName(String prshVendorName) {
		this.prshVendorName = prshVendorName;
	}

	@Column(name = "SHLI_NAME")
	public String getShliName() {
		return this.shliName;
	}

	public void setShliName(String shliName) {
		this.shliName = shliName;
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

}
