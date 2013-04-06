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
@Table(name = "F_CONTAINER_CARGO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FContainerCargo extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -2118086461984357223L;
	private String cocaCargoName;
	private BigDecimal cocaGrossWeight;
	private String cocaMarks;
	private BigDecimal cocaMeasurement;
	private Integer cocaPackageNum;
	private String consCustName;
	private String consHblNo;
	private Integer consId;
	private String consMblNo;
	private String consNo;
	private Integer contId;
	private String contNo;
	private String packName;
	
	private Integer cargId;
	
	public FContainerCargo() {
	}

	@Column(name = "COCA_CARGO_NAME")
	public String getCocaCargoName() {
		return this.cocaCargoName;
	}

	public void setCocaCargoName(String cocaCargoName) {
		this.cocaCargoName = cocaCargoName;
	}

	@Column(name = "COCA_GROSS_WEIGHT")
	public BigDecimal getCocaGrossWeight() {
		return this.cocaGrossWeight;
	}

	public void setCocaGrossWeight(BigDecimal cocaGrossWeight) {
		this.cocaGrossWeight = cocaGrossWeight;
	}

	@Column(name = "COCA_MARKS")
	public String getCocaMarks() {
		return this.cocaMarks;
	}

	public void setCocaMarks(String cocaMarks) {
		this.cocaMarks = cocaMarks;
	}

	@Column(name = "COCA_MEASUREMENT")
	public BigDecimal getCocaMeasurement() {
		return this.cocaMeasurement;
	}

	public void setCocaMeasurement(BigDecimal cocaMeasurement) {
		this.cocaMeasurement = cocaMeasurement;
	}

	@Column(name = "COCA_PACKAGE_NUM")
	public Integer getCocaPackageNum() {
		return this.cocaPackageNum;
	}

	public void setCocaPackageNum(Integer cocaPackageNum) {
		this.cocaPackageNum = cocaPackageNum;
	}

	@Column(name = "CONS_CUST_NAME")
	public String getConsCustName() {
		return this.consCustName;
	}

	public void setConsCustName(String consCustName) {
		this.consCustName = consCustName;
	}

	@Column(name = "CONS_HBL_NO")
	public String getConsHblNo() {
		return this.consHblNo;
	}

	public void setConsHblNo(String consHblNo) {
		this.consHblNo = consHblNo;
	}

	@Column(name = "CONS_ID")
	public Integer getConsId() {
		return this.consId;
	}

	public void setConsId(Integer consId) {
		this.consId = consId;
	}

	@Column(name = "CONS_MBL_NO")
	public String getConsMblNo() {
		return this.consMblNo;
	}

	public void setConsMblNo(String consMblNo) {
		this.consMblNo = consMblNo;
	}

	@Column(name = "CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Column(name = "CONT_ID")
	public Integer getContId() {
		return this.contId;
	}

	public void setContId(Integer contId) {
		this.contId = contId;
	}

	@Column(name = "CONT_NO")
	public String getContNo() {
		return this.contNo;
	}

	public void setContNo(String contNo) {
		this.contNo = contNo;
	}

	@Column(name = "PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}
	
	@Column(name = "CARG_ID")
	public Integer getCargId() {
		return cargId;
	}

	public void setCargId(Integer cargId) {
		this.cargId = cargId;
	}
}
