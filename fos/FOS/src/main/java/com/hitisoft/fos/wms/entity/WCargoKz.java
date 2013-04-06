package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;


/**
 * The persistent class for the w_area database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_CARGO_KZ")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WCargoKz extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
		
	private Integer custId;
	private Integer cargoId;
	private Integer unitId;
	private Integer pUnitId;
	private Integer wUnitId;
	private Integer vUnitId;
	private Integer mUnitId;
	private Double q;
	private Double p;
	private Double gw;
	private Double nw;
	private Double v;
	private Double m;
	

    public WCargoKz() {
    }

    @Column(name="CUST_ID")
	public Integer getCustId() {
		return custId;
	}


	public void setCustId(Integer custId) {
		this.custId = custId;
	}

	@Column(name="CARGO_ID")
	public Integer getCargoId() {
		return cargoId;
	}


	public void setCargoId(Integer cargoId) {
		this.cargoId = cargoId;
	}

	@Column(name="UNIT_ID")
	public Integer getUnitId() {
		return unitId;
	}


	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	@Column(name="P_UNIT_ID")
	public Integer getpUnitId() {
		return pUnitId;
	}


	public void setpUnitId(Integer pUnitId) {
		this.pUnitId = pUnitId;
	}

	@Column(name="W_UNIT_ID")
	public Integer getwUnitId() {
		return wUnitId;
	}


	public void setwUnitId(Integer wUnitId) {
		this.wUnitId = wUnitId;
	}

	@Column(name="V_UNIT_ID")
	public Integer getvUnitId() {
		return vUnitId;
	}


	public void setvUnitId(Integer vUnitId) {
		this.vUnitId = vUnitId;
	}

	@Column(name="M_UNIT_ID")
	public Integer getmUnitId() {
		return mUnitId;
	}


	public void setmUnitId(Integer mUnitId) {
		this.mUnitId = mUnitId;
	}

	@Column(name="Q")
	public Double getQ() {
		return q;
	}


	public void setQ(Double q) {
		this.q = q;
	}

	@Column(name="P")
	public Double getP() {
		return p;
	}


	public void setP(Double p) {
		this.p = p;
	}

	@Column(name="GW")
	public Double getGw() {
		return gw;
	}


	public void setGw(Double gw) {
		this.gw = gw;
	}

	@Column(name="NW")
	public Double getNw() {
		return nw;
	}


	public void setNw(Double nw) {
		this.nw = nw;
	}

	@Column(name="V")
	public Double getV() {
		return v;
	}


	public void setV(Double v) {
		this.v = v;
	}

	@Column(name="M")
	public Double getM() {
		return m;
	}


	public void setM(Double m) {
		this.m = m;
	}
	
    

}