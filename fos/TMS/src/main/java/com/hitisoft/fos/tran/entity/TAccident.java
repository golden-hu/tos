package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the t_accident database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="T_ACCIDENT")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TAccident extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private Date accidentDate;
	private String accidentDescription;
	private String accidentReason;
	private Integer accidentTypeId;
	private String accidentTypeName;
	private String auditComments;
	private Date auditDate;
	private String auditor;
	private BigDecimal compensateAmount;
	private Integer deathNum;
	private Integer driverId;
	private String driverName;
	private Integer injuryNum;
	private BigDecimal lossAmount;
	private BigDecimal personAmount;
	private String place;
	private String policeOffice;
	private String policeTel;
	private String remark;
	private Date reportTime;
	private String reportor;
	private String responsible;
	private String result;
	private Integer vehicleId;
	private String vehicleNo;

    public TAccident() {
    }


    @Temporal( TemporalType.DATE)
	@Column(name="ACCIDENT_DATE")
	public Date getAccidentDate() {
		return this.accidentDate;
	}

	public void setAccidentDate(Date accidentDate) {
		this.accidentDate = accidentDate;
	}


	@Column(name="ACCIDENT_DESCRIPTION")
	public String getAccidentDescription() {
		return this.accidentDescription;
	}

	public void setAccidentDescription(String accidentDescription) {
		this.accidentDescription = accidentDescription;
	}


	@Column(name="ACCIDENT_REASON")
	public String getAccidentReason() {
		return this.accidentReason;
	}

	public void setAccidentReason(String accidentReason) {
		this.accidentReason = accidentReason;
	}


	@Column(name="ACCIDENT_TYPE_ID")
	public Integer getAccidentTypeId() {
		return this.accidentTypeId;
	}

	public void setAccidentTypeId(Integer accidentTypeId) {
		this.accidentTypeId = accidentTypeId;
	}

	@Column(name="ACCIDENT_TYPE_NAME")
	public String getAccidentTypeName() {
		return this.accidentTypeName;
	}

	public void setAccidentTypeName(String accidentTypeName) {
		this.accidentTypeName = accidentTypeName;
	}

	@Column(name="AUDIT_COMMENTS")
	public String getAuditComments() {
		return this.auditComments;
	}

	public void setAuditComments(String auditComments) {
		this.auditComments = auditComments;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="AUDIT_DATE")
	public Date getAuditDate() {
		return this.auditDate;
	}

	public void setAuditDate(Date auditDate) {
		this.auditDate = auditDate;
	}


	@Column(name="AUDITOR")
	public String getAuditor() {
		return this.auditor;
	}

	public void setAuditor(String auditor) {
		this.auditor = auditor;
	}


	@Column(name="COMPENSATE_AMOUNT")
	public BigDecimal getCompensateAmount() {
		return this.compensateAmount;
	}

	public void setCompensateAmount(BigDecimal compensateAmount) {
		this.compensateAmount = compensateAmount;
	}


	@Column(name="DEATH_NUM")
	public Integer getDeathNum() {
		return this.deathNum;
	}

	public void setDeathNum(Integer deathNum) {
		this.deathNum = deathNum;
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


	@Column(name="INJURY_NUM")
	public Integer getInjuryNum() {
		return this.injuryNum;
	}

	public void setInjuryNum(Integer injuryNum) {
		this.injuryNum = injuryNum;
	}


	@Column(name="LOSS_AMOUNT")
	public BigDecimal getLossAmount() {
		return this.lossAmount;
	}

	public void setLossAmount(BigDecimal lossAmount) {
		this.lossAmount = lossAmount;
	}


	@Column(name="PERSON_AMOUNT")
	public BigDecimal getPersonAmount() {
		return this.personAmount;
	}

	public void setPersonAmount(BigDecimal personAmount) {
		this.personAmount = personAmount;
	}


	@Column(name="PLACE")
	public String getPlace() {
		return this.place;
	}

	public void setPlace(String place) {
		this.place = place;
	}


	@Column(name="POLICE_OFFICE")
	public String getPoliceOffice() {
		return this.policeOffice;
	}

	public void setPoliceOffice(String policeOffice) {
		this.policeOffice = policeOffice;
	}


	@Column(name="POLICE_TEL")
	public String getPoliceTel() {
		return this.policeTel;
	}

	public void setPoliceTel(String policeTel) {
		this.policeTel = policeTel;
	}


	@Column(name="REMARK")
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

    @Temporal( TemporalType.TIMESTAMP)
	@Column(name="REPORT_TIME")
	public Date getReportTime() {
		return this.reportTime;
	}

	public void setReportTime(Date reportTime) {
		this.reportTime = reportTime;
	}


	@Column(name="REPORTOR")
	public String getReportor() {
		return this.reportor;
	}

	public void setReportor(String reportor) {
		this.reportor = reportor;
	}


	@Column(name="RESPONSIBLE")
	public String getResponsible() {
		return this.responsible;
	}

	public void setResponsible(String responsible) {
		this.responsible = responsible;
	}


	@Column(name="RESULT")
	public String getResult() {
		return this.result;
	}

	public void setResult(String result) {
		this.result = result;
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

}