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
@Table(name = "C_CONTRACT")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CContract extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 4792346404728344710L;
	
	private String contractNo;
	private String contractName;
	private Date fromDate;
	private Date endDate;
	private String checkBy;
	private Date checkTime;
	private String checkStatus;
	private String enableFlag;
		

	public CContract() {
	}

	@Column(name = "CONTRACT_NO")
	public String getContractNo() {
		return contractNo;
	}


	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}

	@Column(name = "CONTRACT_NAME")
	public String getContractName() {
		return contractName;
	}


	public void setContractName(String contractName) {
		this.contractName = contractName;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "FROM_DATE")
	public Date getFromDate() {
		return fromDate;
	}


	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	@Column(name = "END_DATE")
	public Date getEndDate() {
		return endDate;
	}


	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	@Column(name = "CHECK_BY")
	public String getCheckBy() {
		return checkBy;
	}


	public void setCheckBy(String checkBy) {
		this.checkBy = checkBy;
	}

	@Column(name = "CHECK_TIME")
	public Date getCheckTime() {
		return checkTime;
	}


	public void setCheckTime(Date checkTime) {
		this.checkTime = checkTime;
	}

	@Column(name = "CHECK_STATUS")
	public String getCheckStatus() {
		return checkStatus;
	}


	public void setCheckStatus(String checkStatus) {
		this.checkStatus = checkStatus;
	}

	@Column(name = "ENABLE_FLAG")
	public String getEnableFlag() {
		return enableFlag;
	}


	public void setEnableFlag(String enableFlag) {
		this.enableFlag = enableFlag;
	}

	
	
}
