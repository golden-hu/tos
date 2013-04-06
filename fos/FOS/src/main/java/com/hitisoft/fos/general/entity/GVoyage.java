package com.hitisoft.fos.general.entity;

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
@Table(name = "G_VOYAGE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GVoyage extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -1486795001834166630L;
	private Byte active;
	private String shliName;
	private Integer vessId;
	private String vessName;
	private String vessNameCn;
	private Date voyaBerthingDate;
	private String voyaBerthingDateT;
	private Integer voyaCarrier;
	private String voyaCarrierLine;
	private String voyaCarrierName;
	private Integer voyaDispatcherId;
	private String voyaDispatcherName;
	private Date voyaEta;
	private String voyaEtaT;
	private Date voyaEtd;
	private String voyaEtdT;
	private String voyaHarbourName;
	private String voyaName;
	private Integer voyaOperatorId;
	private String voyaOperatorName;
	private String voyaPorts;
	private Date voyaSailDate;
	private String voyaSailDateT;
	private Byte voyaSailedFlag;
	private Byte voyaShipMapFlag;
	public GVoyage() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "SHLI_NAME")
	public String getShliName() {
		return this.shliName;
	}

	public void setShliName(String shliName) {
		this.shliName = shliName;
	}

	@Column(name = "VESS_ID")
	public Integer getVessId() {
		return this.vessId;
	}

	public void setVessId(Integer vessId) {
		this.vessId = vessId;
	}

	@Column(name = "VESS_NAME")
	public String getVessName() {
		return this.vessName;
	}

	public void setVessName(String vessName) {
		this.vessName = vessName;
	}

	@Column(name = "VESS_NAME_CN")
	public String getVessNameCn() {
		return this.vessNameCn;
	}

	public void setVessNameCn(String vessNameCn) {
		this.vessNameCn = vessNameCn;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "VOYA_BERTHING_DATE")
	public Date getVoyaBerthingDate() {
		return this.voyaBerthingDate;
	}

	public void setVoyaBerthingDate(Date voyaBerthingDate) {
		this.voyaBerthingDate = voyaBerthingDate;
	}

	@Column(name = "VOYA_BERTHING_DATE_T")
	public String getVoyaBerthingDateT() {
		return this.voyaBerthingDateT;
	}

	public void setVoyaBerthingDateT(String voyaBerthingDateT) {
		this.voyaBerthingDateT = voyaBerthingDateT;
	}

	@Column(name = "VOYA_CARRIER")
	public Integer getVoyaCarrier() {
		return this.voyaCarrier;
	}

	public void setVoyaCarrier(Integer voyaCarrier) {
		this.voyaCarrier = voyaCarrier;
	}

	@Column(name = "VOYA_CARRIER_LINE")
	public String getVoyaCarrierLine() {
		return this.voyaCarrierLine;
	}

	public void setVoyaCarrierLine(String voyaCarrierLine) {
		this.voyaCarrierLine = voyaCarrierLine;
	}

	@Column(name = "VOYA_CARRIER_NAME")
	public String getVoyaCarrierName() {
		return this.voyaCarrierName;
	}

	public void setVoyaCarrierName(String voyaCarrierName) {
		this.voyaCarrierName = voyaCarrierName;
	}
	
	@Column(name = "VOYA_DISPATCHER_ID")
	public Integer getVoyaDispatcherId() {
		return this.voyaDispatcherId;
	}

	public void setVoyaDispatcherId(Integer voyaDispatcherId) {
		this.voyaDispatcherId = voyaDispatcherId;
	}

	@Column(name = "VOYA_DISPATCHER_NAME")
	public String getVoyaDispatcherName() {
		return this.voyaDispatcherName;
	}

	public void setVoyaDispatcherName(String voyaDispatcherName) {
		this.voyaDispatcherName = voyaDispatcherName;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "VOYA_ETA")
	public Date getVoyaEta() {
		return this.voyaEta;
	}

	public void setVoyaEta(Date voyaEta) {
		this.voyaEta = voyaEta;
	}

	@Column(name = "VOYA_ETA_T")
	public String getVoyaEtaT() {
		return this.voyaEtaT;
	}

	public void setVoyaEtaT(String voyaEtaT) {
		this.voyaEtaT = voyaEtaT;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "VOYA_ETD")
	public Date getVoyaEtd() {
		return this.voyaEtd;
	}

	public void setVoyaEtd(Date voyaEtd) {
		this.voyaEtd = voyaEtd;
	}

	@Column(name = "VOYA_ETD_T")
	public String getVoyaEtdT() {
		return this.voyaEtdT;
	}

	public void setVoyaEtdT(String voyaEtdT) {
		this.voyaEtdT = voyaEtdT;
	}	

	@Column(name = "VOYA_HARBOUR_NAME")
	public String getVoyaHarbourName() {
		return this.voyaHarbourName;
	}

	public void setVoyaHarbourName(String voyaHarbourName) {
		this.voyaHarbourName = voyaHarbourName;
	}

	
	@Column(name = "VOYA_NAME")
	public String getVoyaName() {
		return this.voyaName;
	}

	public void setVoyaName(String voyaName) {
		this.voyaName = voyaName;
	}

	@Column(name = "VOYA_OPERATOR_ID")
	public Integer getVoyaOperatorId() {
		return this.voyaOperatorId;
	}

	public void setVoyaOperatorId(Integer voyaOperatorId) {
		this.voyaOperatorId = voyaOperatorId;
	}

	@Column(name = "VOYA_OPERATOR_NAME")
	public String getVoyaOperatorName() {
		return this.voyaOperatorName;
	}

	public void setVoyaOperatorName(String voyaOperatorName) {
		this.voyaOperatorName = voyaOperatorName;
	}

	@Column(name = "VOYA_PORTS")
	public String getVoyaPorts() {
		return this.voyaPorts;
	}

	public void setVoyaPorts(String voyaPorts) {
		this.voyaPorts = voyaPorts;
	}

	
	@Temporal(TemporalType.DATE)
	@Column(name = "VOYA_SAIL_DATE")
	public Date getVoyaSailDate() {
		return this.voyaSailDate;
	}

	public void setVoyaSailDate(Date voyaSailDate) {
		this.voyaSailDate = voyaSailDate;
	}

	@Column(name = "VOYA_SAIL_DATE_T")
	public String getVoyaSailDateT() {
		return this.voyaSailDateT;
	}

	public void setVoyaSailDateT(String voyaSailDateT) {
		this.voyaSailDateT = voyaSailDateT;
	}

	@Column(name = "VOYA_SAILED_FLAG")
	public Byte getVoyaSailedFlag() {
		return this.voyaSailedFlag;
	}

	public void setVoyaSailedFlag(Byte voyaSailedFlag) {
		this.voyaSailedFlag = voyaSailedFlag;
	}	

	@Column(name = "VOYA_SHIP_MAP_FLAG")
	public Byte getVoyaShipMapFlag() {
		return this.voyaShipMapFlag;
	}

	public void setVoyaShipMapFlag(Byte voyaShipMapFlag) {
		this.voyaShipMapFlag = voyaShipMapFlag;
	}
}