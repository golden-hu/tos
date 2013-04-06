package com.hitisoft.fos.flight.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "F_FLIGHT")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FFlight extends BaseDomain implements Serializable{
	private static final long serialVersionUID = 1L;
	public String flightNo;
	public String deScheduleTime;
	public String deNewTime;
	public String dePort;
	public String arScheduleTime;
	public String arNewTime;
	public String arPort;
	public String flightLine;
	public String flightCode;
	public Integer status;
	public Date fightDate;
	
	public FFlight(){}
	
	@Column(name = "FLIGHT_NO")
	public String getFlightNo() {
		return this.flightNo;
	}
	public void setFlightNo(String flightNo) {
		this.flightNo = flightNo;
	}

	@Column(name = "DE_SCHEDULE_TIME")
	public String getDeScheduleTime() {
		return this.deScheduleTime;
	}
	public void setDeScheduleTime(String deScheduleTime) {
		this.deScheduleTime = deScheduleTime;
	}

	@Column(name = "DE_NEW_TIME")
	public String getDeNewTime() {
		return this.deNewTime;
	}
	public void setDeNewTime(String deNewTime) {
		this.deNewTime = deNewTime;
	}

	@Column(name = "AR_SCHEDULE_TIME")
	public String getArScheduleTime() {
		return this.arScheduleTime;
	}
	public void setArScheduleTime(String arScheduleTime) {
		this.arScheduleTime = arScheduleTime;
	}

	@Column(name = "AR_NEW_TIME")
	public String getArNewTime() {
		return this.arNewTime;
	}
	public void setArNewTime(String arNewTime) {
		this.arNewTime = arNewTime;
	}

	@Column(name = "STATUS")
	public Integer getStatus() {
		return this.status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}

	@Column(name = "FIGHT_DATE")
	public Date getFightDate() {
		return this.fightDate;
	}
	public void setFightDate(Date fightDate) {
		this.fightDate = fightDate;
	}
	
	@Column(name = "DE_PORT")
	public String getDePort() {
		return this.dePort;
	}
	public void setDePort(String dePort) {
		this.dePort = dePort;
	}

	@Column(name = "AR_PORT")
	public String getArPort() {
		return this.arPort;
	}
	public void setArPort(String arPort) {
		this.arPort = arPort;
	}

	@Column(name = "FLIGHT_LINE")
	public String getFlightLine() {
		return this.flightLine;
	}
	public void setFlightLine(String flightLine) {
		this.flightLine = flightLine;
	}

	@Column(name = "FLIGHT_CODE")
	public String getFlightCode() {
		return flightCode;
	}

	public void setFlightCode(String flightCode) {
		this.flightCode = flightCode;
	}
}
