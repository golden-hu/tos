package com.hitisoft.fos.ffop.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "F_WAREHOUSE_CARGO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FWarehouseCargo extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -4698559151407200376L;
	private Integer consId;
	private String packName;
	private String wacaCargoMarks;
	private String wacaCargoName;
	private BigDecimal wacaGrossWeight;
	private BigDecimal wacaMeasurement;
	private BigDecimal wacaNetWeight;
	private Integer wacaPackagesNum;
	private Integer wareId;

	public FWarehouseCargo() {
	}

	@Column(name = "CONS_ID")
	public Integer getConsId() {
		return this.consId;
	}

	public void setConsId(Integer consId) {
		this.consId = consId;
	}

	@Column(name = "PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}

	@Column(name = "WACA_CARGO_MARKS")
	public String getWacaCargoMarks() {
		return this.wacaCargoMarks;
	}

	public void setWacaCargoMarks(String wacaCargoMarks) {
		this.wacaCargoMarks = wacaCargoMarks;
	}

	@Column(name = "WACA_CARGO_NAME")
	public String getWacaCargoName() {
		return this.wacaCargoName;
	}

	public void setWacaCargoName(String wacaCargoName) {
		this.wacaCargoName = wacaCargoName;
	}

	@Column(name = "WACA_GROSS_WEIGHT")
	public BigDecimal getWacaGrossWeight() {
		return this.wacaGrossWeight;
	}

	public void setWacaGrossWeight(BigDecimal wacaGrossWeight) {
		this.wacaGrossWeight = wacaGrossWeight;
	}

	@Column(name = "WACA_MEASUREMENT")
	public BigDecimal getWacaMeasurement() {
		return this.wacaMeasurement;
	}

	public void setWacaMeasurement(BigDecimal wacaMeasurement) {
		this.wacaMeasurement = wacaMeasurement;
	}

	@Column(name = "WACA_NET_WEIGHT")
	public BigDecimal getWacaNetWeight() {
		return this.wacaNetWeight;
	}

	public void setWacaNetWeight(BigDecimal wacaNetWeight) {
		this.wacaNetWeight = wacaNetWeight;
	}

	@Column(name = "WACA_PACKAGES_NUM")
	public Integer getWacaPackagesNum() {
		return this.wacaPackagesNum;
	}

	public void setWacaPackagesNum(Integer wacaPackagesNum) {
		this.wacaPackagesNum = wacaPackagesNum;
	}

	@Column(name = "WARE_ID")
	public Integer getWareId() {
		return this.wareId;
	}

	public void setWareId(Integer wareId) {
		this.wareId = wareId;
	}

}
