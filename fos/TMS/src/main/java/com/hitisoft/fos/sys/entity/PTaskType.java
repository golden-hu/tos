package com.hitisoft.fos.sys.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "P_TASK_TYPE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PTaskType extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -2871585375919356085L;
	private Byte active;
	private String tatyAction;
	private String consBizClass;
	private String consBizType;
	private String consShipType;
	private String tatyClass;
	private Integer tatyDId;
	private String tatyDName;
	private Integer tatyDateEstimated;
	private String tatyDateType;
	private Integer tatyDefaultOwner;
	private String tatyDesc;
	private String tatyName;
	private Integer tatyOrder;
	private String tatyProperty;

	public PTaskType() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "TATY_ACTION")
	public String getTatyAction() {
		return this.tatyAction;
	}

	public void setTatyAction(String tatyAction) {
		this.tatyAction = tatyAction;
	}

	@Column(name = "CONS_BIZ_CLASS")
	public String getConsBizClass() {
		return this.consBizClass;
	}

	public void setConsBizClass(String consBizClass) {
		this.consBizClass = consBizClass;
	}

	@Column(name = "CONS_BIZ_TYPE")
	public String getConsBizType() {
		return this.consBizType;
	}

	public void setConsBizType(String consBizType) {
		this.consBizType = consBizType;
	}

	@Column(name = "CONS_SHIP_TYPE")
	public String getConsShipType() {
		return this.consShipType;
	}

	public void setConsShipType(String consShipType) {
		this.consShipType = consShipType;
	}
	
	@Column(name = "TATY_CLASS")
	public String getTatyClass() {
		return this.tatyClass;
	}

	public void setTatyClass(String tatyClass) {
		this.tatyClass = tatyClass;
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

	@Column(name = "TATY_DATE_ESTIMATED")
	public Integer getTatyDateEstimated() {
		return this.tatyDateEstimated;
	}

	public void setTatyDateEstimated(Integer tatyDateEstimated) {
		this.tatyDateEstimated = tatyDateEstimated;
	}

	@Column(name = "TATY_DATE_TYPE")
	public String getTatyDateType() {
		return this.tatyDateType;
	}

	public void setTatyDateType(String tatyDateType) {
		this.tatyDateType = tatyDateType;
	}

	@Column(name = "TATY_DEFAULT_OWNER")
	public Integer getTatyDefaultOwner() {
		return this.tatyDefaultOwner;
	}

	public void setTatyDefaultOwner(Integer tatyDefaultOwner) {
		this.tatyDefaultOwner = tatyDefaultOwner;
	}

	@Column(name = "TATY_DESC")
	public String getTatyDesc() {
		return this.tatyDesc;
	}

	public void setTatyDesc(String tatyDesc) {
		this.tatyDesc = tatyDesc;
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

	@Column(name = "TATY_PROPERTY")
	public String getTatyProperty() {
		return this.tatyProperty;
	}

	public void setTatyProperty(String tatyProperty) {
		this.tatyProperty = tatyProperty;
	}

}
