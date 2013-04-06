package com.hitisoft.fos.sys.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.IdDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "P_SERIAL_NO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PSerialNo extends IdDomain implements Serializable {
	private static final long serialVersionUID = 3603749308663591961L;
	private Long senoCurrentNo;
	private Date senoExpire;
	private String senoSuffix;
	private String seruCode;
	private Integer seruId;
	private String compCode;

	public PSerialNo() {
	}

	@Column(name = "SENO_CURRENT_NO")
	public Long getSenoCurrentNo() {
		return this.senoCurrentNo;
	}

	public void setSenoCurrentNo(Long senoCurrentNo) {
		this.senoCurrentNo = senoCurrentNo;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "SENO_EXPIRE")
	public Date getSenoExpire() {
		return this.senoExpire;
	}

	public void setSenoExpire(Date senoExpire) {
		this.senoExpire = senoExpire;
	}

	@Column(name = "SENO_SUFFIX")
	public String getSenoSuffix() {
		return this.senoSuffix;
	}

	public void setSenoSuffix(String senoSuffix) {
		this.senoSuffix = senoSuffix;
	}

	@Column(name = "SERU_CODE")
	public String getSeruCode() {
		return this.seruCode;
	}

	public void setSeruCode(String seruCode) {
		this.seruCode = seruCode;
	}

	@Column(name = "SERU_ID")
	public Integer getSeruId() {
		return this.seruId;
	}

	public void setSeruId(Integer seruId) {
		this.seruId = seruId;
	}

	@Column(name = "COMP_CODE")
	public String getCompCode() {
		return compCode;
	}

	public void setCompCode(String compCode) {
		this.compCode = compCode;
	}

}
