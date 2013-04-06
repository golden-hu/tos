package com.hitisoft.fos.general.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "G_CARGO_TYPE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GCargoType extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 504142197286339624L;
	private Byte active;
	private Integer caclId;
	private String catyCode;
	private Byte catyDanagerFlag;
	private String catyDanagerNo;
	private String catyDanagerProperty;
	private String catyNameCn;
	private String catyNameEn;
	private String catyManuNo;
	private String catySpec;
	private String catyCargoType;
	private String catyRemarks;

	public GCargoType() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "CACL_ID")
	public Integer getCaclId() {
		return this.caclId;
	}

	public void setCaclId(Integer caclId) {
		this.caclId = caclId;
	}

	@Column(name = "CATY_CODE")
	public String getCatyCode() {
		return this.catyCode;
	}

	public void setCatyCode(String catyCode) {
		this.catyCode = catyCode;
	}

	@Column(name = "CATY_DANAGER_FLAG")
	public Byte getCatyDanagerFlag() {
		return this.catyDanagerFlag;
	}

	public void setCatyDanagerFlag(Byte catyDanagerFlag) {
		this.catyDanagerFlag = catyDanagerFlag;
	}

	@Column(name = "CATY_DANAGER_NO")
	public String getCatyDanagerNo() {
		return this.catyDanagerNo;
	}

	public void setCatyDanagerNo(String catyDanagerNo) {
		this.catyDanagerNo = catyDanagerNo;
	}

	@Column(name = "CATY_DANAGER_PROPERTY")
	public String getCatyDanagerProperty() {
		return this.catyDanagerProperty;
	}

	public void setCatyDanagerProperty(String catyDanagerProperty) {
		this.catyDanagerProperty = catyDanagerProperty;
	}

	@Column(name = "CATY_NAME_CN")
	public String getCatyNameCn() {
		return this.catyNameCn;
	}

	public void setCatyNameCn(String catyNameCn) {
		this.catyNameCn = catyNameCn;
	}

	@Column(name = "CATY_NAME_EN")
	public String getCatyNameEn() {
		return this.catyNameEn;
	}

	public void setCatyNameEn(String catyNameEn) {
		this.catyNameEn = catyNameEn;
	}
	
	@Column(name = "CATY_MANU_NO")
	public String getCatyManuNo() {
		return catyManuNo;
	}

	public void setCatyManuNo(String catyManuNo) {
		this.catyManuNo = catyManuNo;
	}

	@Column(name = "CATY_SPEC")
	public String getCatySpec() {
		return catySpec;
	}

	public void setCatySpec(String catySpec) {
		this.catySpec = catySpec;
	}

	@Column(name = "CATY_CARGO_TYPE")
	public String getCatyCargoType() {
		return catyCargoType;
	}

	public void setCatyCargoType(String catyCargoType) {
		this.catyCargoType = catyCargoType;
	}

	@Column(name = "CATY_REMARKS")
	public String getCatyRemarks() {
		return this.catyRemarks;
	}

	public void setCatyRemarks(String catyRemarks) {
		this.catyRemarks = catyRemarks;
	}

}
