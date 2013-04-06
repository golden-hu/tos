package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * The persistent class for the w_trans_list database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_TRANS_LIST")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WTransList extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private String skuNo;
	private Integer cargoId;
	private String cargoName;
	private String comments;
	private String fromAreaCode;
	private Integer fromAreaId;
	private String fromAreaName;
	private String fromBlockCode;
	private Integer fromBlockId;
	private String fromBlockName;
	private String fromWarehouseCode;
	private Integer fromWarehouseId;
	private String fromWarehouseName;
	private Integer status;
	private String toAreaCode;
	private Integer toAreaId;
	private String toAreaName;
	private String toBlockCode;
	private Integer toBlockId;
	private String toBlockName;
	private String toWarehouseCode;
	private Integer toWarehouseId;
	private String toWarehouseName;
	private Integer transNoteId;
	private Integer placedCargoId;                   
	private Double transQuantity;
	private Double oldQuantity;

    public WTransList() {
    }


    @Column(name="SKU_NO")
	public String getSkuNo() {
		return this.skuNo;
	}

	public void setSkuNo(String skuNo) {
		this.skuNo = skuNo;
	}


	@Column(name="CARGO_ID")
	public Integer getCargoId() {
		return this.cargoId;
	}

	public void setCargoId(Integer cargoId) {
		this.cargoId = cargoId;
	}


	@Column(name="CARGO_NAME")
	public String getCargoName() {
		return this.cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}


	@Column(name="COMMENTS")
	public String getComments() {
		return this.comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}


	@Column(name="FROM_AREA_CODE")
	public String getFromAreaCode() {
		return this.fromAreaCode;
	}

	public void setFromAreaCode(String fromAreaCode) {
		this.fromAreaCode = fromAreaCode;
	}


	@Column(name="FROM_AREA_ID")
	public Integer getFromAreaId() {
		return this.fromAreaId;
	}

	public void setFromAreaId(Integer fromAreaId) {
		this.fromAreaId = fromAreaId;
	}


	@Column(name="FROM_AREA_NAME")
	public String getFromAreaName() {
		return this.fromAreaName;
	}

	public void setFromAreaName(String fromAreaName) {
		this.fromAreaName = fromAreaName;
	}


	@Column(name="FROM_BLOCK_CODE")
	public String getFromBlockCode() {
		return this.fromBlockCode;
	}

	public void setFromBlockCode(String fromBlockCode) {
		this.fromBlockCode = fromBlockCode;
	}


	@Column(name="FROM_BLOCK_ID")
	public Integer getFromBlockId() {
		return this.fromBlockId;
	}

	public void setFromBlockId(Integer fromBlockId) {
		this.fromBlockId = fromBlockId;
	}


	@Column(name="FROM_BLOCK_NAME")
	public String getFromBlockName() {
		return this.fromBlockName;
	}

	public void setFromBlockName(String fromBlockName) {
		this.fromBlockName = fromBlockName;
	}


	@Column(name="FROM_WAREHOUSE_CODE")
	public String getFromWarehouseCode() {
		return this.fromWarehouseCode;
	}

	public void setFromWarehouseCode(String fromWarehouseCode) {
		this.fromWarehouseCode = fromWarehouseCode;
	}


	@Column(name="FROM_WAREHOUSE_ID")
	public Integer getFromWarehouseId() {
		return this.fromWarehouseId;
	}

	public void setFromWarehouseId(Integer fromWarehouseId) {
		this.fromWarehouseId = fromWarehouseId;
	}


	@Column(name="FROM_WAREHOUSE_NAME")
	public String getFromWarehouseName() {
		return this.fromWarehouseName;
	}

	public void setFromWarehouseName(String fromWarehouseName) {
		this.fromWarehouseName = fromWarehouseName;
	}


	@Column(name="STATUS")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}


	@Column(name="TO_AREA_CODE")
	public String getToAreaCode() {
		return this.toAreaCode;
	}

	public void setToAreaCode(String toAreaCode) {
		this.toAreaCode = toAreaCode;
	}


	@Column(name="TO_AREA_ID")
	public Integer getToAreaId() {
		return this.toAreaId;
	}

	public void setToAreaId(Integer toAreaId) {
		this.toAreaId = toAreaId;
	}


	@Column(name="TO_AREA_NAME")
	public String getToAreaName() {
		return this.toAreaName;
	}

	public void setToAreaName(String toAreaName) {
		this.toAreaName = toAreaName;
	}


	@Column(name="TO_BLOCK_CODE")
	public String getToBlockCode() {
		return this.toBlockCode;
	}

	public void setToBlockCode(String toBlockCode) {
		this.toBlockCode = toBlockCode;
	}


	@Column(name="TO_BLOCK_ID")
	public Integer getToBlockId() {
		return this.toBlockId;
	}

	public void setToBlockId(Integer toBlockId) {
		this.toBlockId = toBlockId;
	}


	@Column(name="TO_BLOCK_NAME")
	public String getToBlockName() {
		return this.toBlockName;
	}

	public void setToBlockName(String toBlockName) {
		this.toBlockName = toBlockName;
	}


	@Column(name="TO_WAREHOUSE_CODE")
	public String getToWarehouseCode() {
		return this.toWarehouseCode;
	}

	public void setToWarehouseCode(String toWarehouseCode) {
		this.toWarehouseCode = toWarehouseCode;
	}


	@Column(name="TO_WAREHOUSE_ID")
	public Integer getToWarehouseId() {
		return this.toWarehouseId;
	}

	public void setToWarehouseId(Integer toWarehouseId) {
		this.toWarehouseId = toWarehouseId;
	}


	@Column(name="TO_WAREHOUSE_NAME")
	public String getToWarehouseName() {
		return this.toWarehouseName;
	}

	public void setToWarehouseName(String toWarehouseName) {
		this.toWarehouseName = toWarehouseName;
	}


	@Column(name="TRANS_NOTE_ID")
	public Integer getTransNoteId() {
		return this.transNoteId;
	}

	public void setTransNoteId(Integer transNoteId) {
		this.transNoteId = transNoteId;
	}
	
	@Column(name="PLACED_CARGO_ID")
	public Integer getPlacedCargoId() {
		return placedCargoId;
	}


	public void setPlacedCargoId(Integer placedCargoId) {
		this.placedCargoId = placedCargoId;
	}


	@Column(name="TRANS_QUANTITY")
	public Double getTransQuantity() {
		return this.transQuantity;
	}

	public void setTransQuantity(Double transQuantity) {
		this.transQuantity = transQuantity;
	}

	@Column(name="OLD_QUANTITY")
	public Double getOldQuantity() {
		return oldQuantity;
	}


	public void setOldQuantity(Double oldQuantity) {
		this.oldQuantity = oldQuantity;
	}
	
	
	
	

}