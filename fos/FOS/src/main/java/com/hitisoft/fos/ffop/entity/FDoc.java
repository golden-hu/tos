package com.hitisoft.fos.ffop.entity;

import java.io.Serializable;
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
@Table(name = "F_DOC")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FDoc extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 865305590767294228L;
	private Byte alertFlag;
	private String consBizClass;
	private Integer consId;
	private String consNo;
	private String exprNo;
	private String consShipType;
	private String dotyClass;
	private Integer dotyId;
	private String dotyName;
	private Date fdocBackDate;
	private Byte fdocBackFlag;
	private String fdocBackSigner;
	private Integer fdocBackType;
	private Integer fdocCopyNum;
	private String fdocNo;
	private String fdocTitle;
	private Integer fdocOriginalNum;
	private Date fdocRecvDate;
	private Byte fdocReleasableFlag;
	private Date fdocReturnDate;
	private Byte fdocReturnFlag;
	private Date fdocSendDate;
	private String fdocSendSigner;
	private Integer fdocSendTo;
	private Integer fdocSendType;
	private Byte fdocStatus;

	private String vessName;
	private String voyaName;
	private String consMblNo;
	private String custName;
	private Date consSailDate;
	private String consCargoOwnerName;

	public FDoc() {
	}

	@Column(name = "ALERT_FLAG")
	public Byte getAlertFlag() {
		return this.alertFlag;
	}

	public void setAlertFlag(Byte alertFlag) {
		this.alertFlag = alertFlag;
	}

	@Column(name = "CONS_BIZ_CLASS")
	public String getConsBizClass() {
		return this.consBizClass;
	}

	public void setConsBizClass(String consBizClass) {
		this.consBizClass = consBizClass;
	}

	@Column(name = "CONS_ID")
	public Integer getConsId() {
		return this.consId;
	}

	public void setConsId(Integer consId) {
		this.consId = consId;
	}

	@Column(name = "CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Column(name = "EXPR_NO")
	public String getExprNo() {
		return exprNo;
	}
	public void setExprNo(String exprNo) {
		this.exprNo = exprNo;
	}

	@Column(name = "CONS_SHIP_TYPE")
	public String getConsShipType() {
		return this.consShipType;
	}

	public void setConsShipType(String consShipType) {
		this.consShipType = consShipType;
	}

	@Column(name = "DOTY_CLASS")
	public String getDotyClass() {
		return this.dotyClass;
	}

	public void setDotyClass(String dotyClass) {
		this.dotyClass = dotyClass;
	}

	@Column(name = "DOTY_ID")
	public Integer getDotyId() {
		return this.dotyId;
	}

	public void setDotyId(Integer dotyId) {
		this.dotyId = dotyId;
	}

	@Column(name = "DOTY_NAME")
	public String getDotyName() {
		return this.dotyName;
	}

	public void setDotyName(String dotyName) {
		this.dotyName = dotyName;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "FDOC_BACK_DATE")
	public Date getFdocBackDate() {
		return this.fdocBackDate;
	}

	public void setFdocBackDate(Date fdocBackDate) {
		this.fdocBackDate = fdocBackDate;
	}

	@Column(name = "FDOC_BACK_FLAG")
	public Byte getFdocBackFlag() {
		return this.fdocBackFlag;
	}

	public void setFdocBackFlag(Byte fdocBackFlag) {
		this.fdocBackFlag = fdocBackFlag;
	}

	@Column(name = "FDOC_BACK_SIGNER")
	public String getFdocBackSigner() {
		return this.fdocBackSigner;
	}

	public void setFdocBackSigner(String fdocBackSigner) {
		this.fdocBackSigner = fdocBackSigner;
	}

	@Column(name = "FDOC_BACK_TYPE")
	public Integer getFdocBackType() {
		return this.fdocBackType;
	}

	public void setFdocBackType(Integer fdocBackType) {
		this.fdocBackType = fdocBackType;
	}

	@Column(name = "FDOC_COPY_NUM")
	public Integer getFdocCopyNum() {
		return this.fdocCopyNum;
	}

	public void setFdocCopyNum(Integer fdocCopyNum) {
		this.fdocCopyNum = fdocCopyNum;
	}

	@Column(name = "FDOC_NO")
	public String getFdocNo() {
		return this.fdocNo;
	}

	public void setFdocNo(String fdocNo) {
		this.fdocNo = fdocNo;
	}
	
	@Column(name = "FDOC_TITLE")
	public String getFdocTitle() {
		return fdocTitle;
	}

	public void setFdocTitle(String fdocTitle) {
		this.fdocTitle = fdocTitle;
	}


	@Column(name = "FDOC_ORIGINAL_NUM")
	public Integer getFdocOriginalNum() {
		return this.fdocOriginalNum;
	}

	public void setFdocOriginalNum(Integer fdocOriginalNum) {
		this.fdocOriginalNum = fdocOriginalNum;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "FDOC_RECV_DATE")
	public Date getFdocRecvDate() {
		return this.fdocRecvDate;
	}

	public void setFdocRecvDate(Date fdocRecvDate) {
		this.fdocRecvDate = fdocRecvDate;
	}

	@Column(name = "FDOC_RELEASABLE_FLAG")
	public Byte getFdocReleasableFlag() {
		return this.fdocReleasableFlag;
	}

	public void setFdocReleasableFlag(Byte fdocReleasableFlag) {
		this.fdocReleasableFlag = fdocReleasableFlag;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "FDOC_RETURN_DATE")
	public Date getFdocReturnDate() {
		return this.fdocReturnDate;
	}

	public void setFdocReturnDate(Date fdocReturnDate) {
		this.fdocReturnDate = fdocReturnDate;
	}

	@Column(name = "FDOC_RETURN_FLAG")
	public Byte getFdocReturnFlag() {
		return this.fdocReturnFlag;
	}

	public void setFdocReturnFlag(Byte fdocReturnFlag) {
		this.fdocReturnFlag = fdocReturnFlag;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "FDOC_SEND_DATE")
	public Date getFdocSendDate() {
		return this.fdocSendDate;
	}

	public void setFdocSendDate(Date fdocSendDate) {
		this.fdocSendDate = fdocSendDate;
	}

	@Column(name = "FDOC_SEND_SIGNER")
	public String getFdocSendSigner() {
		return this.fdocSendSigner;
	}

	public void setFdocSendSigner(String fdocSendSigner) {
		this.fdocSendSigner = fdocSendSigner;
	}

	@Column(name = "FDOC_SEND_TO")
	public Integer getFdocSendTo() {
		return this.fdocSendTo;
	}

	public void setFdocSendTo(Integer fdocSendTo) {
		this.fdocSendTo = fdocSendTo;
	}

	@Column(name = "FDOC_SEND_TYPE")
	public Integer getFdocSendType() {
		return this.fdocSendType;
	}

	public void setFdocSendType(Integer fdocSendType) {
		this.fdocSendType = fdocSendType;
	}

	@Column(name = "FDOC_STATUS")
	public Byte getFdocStatus() {
		return this.fdocStatus;
	}

	public void setFdocStatus(Byte fdocStatus) {
		this.fdocStatus = fdocStatus;
	}

	@Transient
	public String getVessName() {
		return vessName;
	}

	public void setVessName(String vessName) {
		this.vessName = vessName;
	}

	@Transient
	public String getVoyaName() {
		return voyaName;
	}

	public void setVoyaName(String voyaName) {
		this.voyaName = voyaName;
	}

	@Transient
	public String getConsMblNo() {
		return consMblNo;
	}

	public void setConsMblNo(String consMblNo) {
		this.consMblNo = consMblNo;
	}

	@Transient
	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	@Transient
	public Date getConsSailDate() {
		return consSailDate;
	}

	public void setConsSailDate(Date consSailDate) {
		this.consSailDate = consSailDate;
	}

	@Transient
	public String getConsCargoOwnerName() {
		return consCargoOwnerName;
	}

	public void setConsCargoOwnerName(String consCargoOwnerName) {
		this.consCargoOwnerName = consCargoOwnerName;
	}

}
