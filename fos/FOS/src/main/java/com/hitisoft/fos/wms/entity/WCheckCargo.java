package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.util.Date;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_CHECK_CARGO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WCheckCargo extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer checkId;//盘点ID
	private String skuNo;//货物编号
	private String cargoName;//货物名称
	private String cargoNameEn;//货物英文名称
	private String categoryName;//货物类别
	private String specification;//规格型号
	private String cargoType;//型号
	private String cargoColor;//颜色
	private String cargoBrand;//品牌

    public WCheckCargo() {
    }

    @Column(name="CHECK_ID")
	public Integer getCheckId() {
		return checkId;
	}

	public void setCheckId(Integer checkId) {
		this.checkId = checkId;
	}

	@Column(name="SKU_NO")
	public String getSkuNo() {
		return skuNo;
	}

	public void setSkuNo(String skuNo) {
		this.skuNo = skuNo;
	}

	@Column(name="CARGO_NAME")
	public String getCargoName() {
		return cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}

	@Column(name="CARGO_NAME_EN")
	public String getCargoNameEn() {
		return cargoNameEn;
	}

	public void setCargoNameEn(String cargoNameEn) {
		this.cargoNameEn = cargoNameEn;
	}

	@Column(name="CATEGORY_NAME")
	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	@Column(name="SPECIFICATION")
	public String getSpecification() {
		return specification;
	}

	public void setSpecification(String specification) {
		this.specification = specification;
	}

	@Column(name="CARGO_COLOR")
	public String getCargoColor() {
		return cargoColor;
	}

	public void setCargoColor(String cargoColor) {
		this.cargoColor = cargoColor;
	}

	@Column(name="CARGO_BRAND")
	public String getCargoBrand() {
		return cargoBrand;
	}

	public void setCargoBrand(String cargoBrand) {
		this.cargoBrand = cargoBrand;
	}

	@Column(name="CARGO_TYPE")
	public String getCargoType() {
		return cargoType;
	}

	public void setCargoType(String cargoType) {
		this.cargoType = cargoType;
	}

    

}