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
@Table(name="G_UNIT")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GUnit extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -6849717107649079092L;
	private Byte active;
	private String unitCode;
	private String unitName;
	private Integer unitClassId;
	private String unitClassName;

    public GUnit() {
    }


	@Column(name="ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name="UNIT_CODE")
	public String getUnitCode() {
		return this.unitCode;
	}

	public void setUnitCode(String unitCode) {
		this.unitCode = unitCode;
	}


	@Column(name="UNIT_NAME")
	public String getUnitName() {
		return this.unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	@Column(name="UNIT_CLASS_ID")
	public Integer getUnitClassId() {
		return unitClassId;
	}


	public void setUnitClassId(Integer unitClassId) {
		this.unitClassId = unitClassId;
	}

	@Column(name="UNIT_CLASS_NAME")
	public String getUnitClassName() {
		return unitClassName;
	}


	public void setUnitClassName(String unitClassName) {
		this.unitClassName = unitClassName;
	}
	
	

}
