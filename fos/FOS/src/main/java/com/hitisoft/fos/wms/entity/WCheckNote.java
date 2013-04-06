package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.util.Date;


/**
 * The persistent class for the w_check_note database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_CHECK_NOTE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WCheckNote extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private String areaCode;
	private Long areaId;
	private String areaName;
	private String batchNo;
	private String blockCode;
	private Long blockId;
	private String blockName;
	private String checkNoteNo;
	private Long checkType;
	private Long checkerId;
	private String checkerName;
	private Long custId;
	private String custName;
	private Long doubleCheckerId;
	private String doubleCheckerName;
	private Date endTime;
	private String orderNo;
	private Date productDate;
	private Date startTime;
	private Integer status;
	private String warehouseCode;
	private Long warehouseId;
	private String warehouseName;
	
	private String blockLayer;
	private String blockRow;
	private String blockCol;
	
	private String productNo;//生产编号
	private String cargoName;//商品名称

    public WCheckNote() {
    }


	@Column(name="AREA_CODE")
	public String getAreaCode() {
		return this.areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}


	@Column(name="AREA_ID")
	public Long getAreaId() {
		return this.areaId;
	}

	public void setAreaId(Long areaId) {
		this.areaId = areaId;
	}


	@Column(name="AREA_NAME")
	public String getAreaName() {
		return this.areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}


	@Column(name="BATCH_NO")
	public String getBatchNo() {
		return this.batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}


	@Column(name="BLOCK_CODE")
	public String getBlockCode() {
		return this.blockCode;
	}

	public void setBlockCode(String blockCode) {
		this.blockCode = blockCode;
	}


	@Column(name="BLOCK_ID")
	public Long getBlockId() {
		return this.blockId;
	}

	public void setBlockId(Long blockId) {
		this.blockId = blockId;
	}


	@Column(name="BLOCK_NAME")
	public String getBlockName() {
		return this.blockName;
	}

	public void setBlockName(String blockName) {
		this.blockName = blockName;
	}


	@Column(name="CHECK_NOTE_NO")
	public String getCheckNoteNo() {
		return this.checkNoteNo;
	}

	public void setCheckNoteNo(String checkNoteNo) {
		this.checkNoteNo = checkNoteNo;
	}


	@Column(name="CHECK_TYPE")
	public Long getCheckType() {
		return this.checkType;
	}

	public void setCheckType(Long checkType) {
		this.checkType = checkType;
	}


	@Column(name="CHECKER_ID")
	public Long getCheckerId() {
		return this.checkerId;
	}

	public void setCheckerId(Long checkerId) {
		this.checkerId = checkerId;
	}


	@Column(name="CHECKER_NAME")
	public String getCheckerName() {
		return this.checkerName;
	}

	public void setCheckerName(String checkerName) {
		this.checkerName = checkerName;
	}


	@Column(name="CUST_ID")
	public Long getCustId() {
		return this.custId;
	}

	public void setCustId(Long custId) {
		this.custId = custId;
	}


	@Column(name="CUST_NAME")
	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}


	@Column(name="DOUBLE_CHECKER_ID")
	public Long getDoubleCheckerId() {
		return this.doubleCheckerId;
	}

	public void setDoubleCheckerId(Long doubleCheckerId) {
		this.doubleCheckerId = doubleCheckerId;
	}


	@Column(name="DOUBLE_CHECKER_NAME")
	public String getDoubleCheckerName() {
		return this.doubleCheckerName;
	}

	public void setDoubleCheckerName(String doubleCheckerName) {
		this.doubleCheckerName = doubleCheckerName;
	}


    @Temporal( TemporalType.TIMESTAMP)
	@Column(name="END_TIME")
	public Date getEndTime() {
		return this.endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}


	@Column(name="ORDER_NO")
	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="PRODUCT_DATE")
	public Date getProductDate() {
		return this.productDate;
	}

	public void setProductDate(Date productDate) {
		this.productDate = productDate;
	}


    @Temporal( TemporalType.TIMESTAMP)
	@Column(name="START_TIME")
	public Date getStartTime() {
		return this.startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}


	@Column(name="STATUS")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}


	@Column(name="WAREHOUSE_CODE")
	public String getWarehouseCode() {
		return this.warehouseCode;
	}

	public void setWarehouseCode(String warehouseCode) {
		this.warehouseCode = warehouseCode;
	}


	@Column(name="WAREHOUSE_ID")
	public Long getWarehouseId() {
		return this.warehouseId;
	}

	public void setWarehouseId(Long warehouseId) {
		this.warehouseId = warehouseId;
	}


	@Column(name="WAREHOUSE_NAME")
	public String getWarehouseName() {
		return this.warehouseName;
	}

	public void setWarehouseName(String warehouseName) {
		this.warehouseName = warehouseName;
	}

	@Column(name="BLOCK_LAYER")
	public String getBlockLayer() {
		return blockLayer;
	}


	public void setBlockLayer(String blockLayer) {
		this.blockLayer = blockLayer;
	}

	@Column(name="BLOCK_ROW")
	public String getBlockRow() {
		return blockRow;
	}


	public void setBlockRow(String blockRow) {
		this.blockRow = blockRow;
	}

	@Column(name="BLOCK_COL")
	public String getBlockCol() {
		return blockCol;
	}


	public void setBlockCol(String blockCol) {
		this.blockCol = blockCol;
	}
	
	@Column(name="PRODUCT_NO")
	public String getProductNo() {
		return productNo;
	}
	
	public void setProductNo(String productNo) {
		this.productNo = productNo;
	}
	
	@Column(name="CARGO_NAME")
	public String getCargoName() {
		return cargoName;
	}
	
	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}

}