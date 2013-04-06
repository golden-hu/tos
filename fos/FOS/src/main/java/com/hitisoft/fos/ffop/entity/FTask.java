package com.hitisoft.fos.ffop.entity;

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
@Table(name = "F_TASK")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FTask extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -6925958430376284156L;
	private Byte active;
	private Integer consId;
	private String consNo;
	private String consBizType;
	private Date taskEstimatedDate;
	private Date taskFinishedDate;
	private Byte taskFinishedFlag;
	private Integer taskOwner;
	private String taskOwnerName;
	private Integer tatyDId;
	private String tatyDName;
	private Integer tatyId;
	private String tatyName;
	private Integer tatyOrder;

	public FTask() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
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

	@Temporal(TemporalType.DATE)
	@Column(name = "TASK_ESTIMATED_DATE")
	public Date getTaskEstimatedDate() {
		return this.taskEstimatedDate;
	}

	public void setTaskEstimatedDate(Date taskEstimatedDate) {
		this.taskEstimatedDate = taskEstimatedDate;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "TASK_FINISHED_DATE")
	public Date getTaskFinishedDate() {
		return this.taskFinishedDate;
	}

	public void setTaskFinishedDate(Date taskFinishedDate) {
		this.taskFinishedDate = taskFinishedDate;
	}

	@Column(name = "TASK_FINISHED_FLAG")
	public Byte getTaskFinishedFlag() {
		return this.taskFinishedFlag;
	}

	public void setTaskFinishedFlag(Byte taskFinishedFlag) {
		this.taskFinishedFlag = taskFinishedFlag;
	}

	@Column(name = "TASK_OWNER")
	public Integer getTaskOwner() {
		return this.taskOwner;
	}

	public void setTaskOwner(Integer taskOwner) {
		this.taskOwner = taskOwner;
	}

	@Column(name = "TASK_OWNER_NAME")
	public String getTaskOwnerName() {
		return this.taskOwnerName;
	}

	public void setTaskOwnerName(String taskOwnerName) {
		this.taskOwnerName = taskOwnerName;
	}	

	@Column(name = "CONS_BIZ_TYPE")
	public String getConsBizType() {
		return this.consBizType;
	}

	public void setConsBizType(String consBizType) {
		this.consBizType = consBizType;
	}

	@Column(name = "TATY_D_ID")
	public Integer getTatyDId() {
		return this.tatyDId;
	}

	public void setTatyDId(Integer tatyDId) {
		this.tatyDId = tatyDId;
	}

	@Column(name = "TATY_D_NAME")
	public String getTatyDName() {
		return this.tatyDName;
	}

	public void setTatyDName(String tatyDName) {
		this.tatyDName = tatyDName;
	}

	@Column(name = "TATY_ID")
	public Integer getTatyId() {
		return this.tatyId;
	}

	public void setTatyId(Integer tatyId) {
		this.tatyId = tatyId;
	}

	@Column(name = "TATY_NAME")
	public String getTatyName() {
		return this.tatyName;
	}

	public void setTatyName(String tatyName) {
		this.tatyName = tatyName;
	}

	@Column(name = "TATY_ORDER")
	public Integer getTatyOrder() {
		return this.tatyOrder;
	}

	public void setTatyOrder(Integer tatyOrder) {
		this.tatyOrder = tatyOrder;
	}

}
