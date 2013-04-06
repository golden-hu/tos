package com.hitisoft.fos.sys.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.IdDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "P_SERIAL_RULE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PSerialRule extends IdDomain implements Serializable {
	private static final long serialVersionUID = 6275470964335796126L;
	private String seruCode;
	private Byte seruLoopPeriod;
	private String seruName;
	private String seruRule;
	private Integer seruSnLength;
	private String seruUniqSuffix;
	private String compCode;

	public PSerialRule() {
	}

	@Column(name = "SERU_CODE")
	public String getSeruCode() {
		return this.seruCode;
	}

	public void setSeruCode(String seruCode) {
		this.seruCode = seruCode;
	}

	@Column(name = "SERU_LOOP_PERIOD")
	public Byte getSeruLoopPeriod() {
		return this.seruLoopPeriod;
	}

	public void setSeruLoopPeriod(Byte seruLoopPeriod) {
		this.seruLoopPeriod = seruLoopPeriod;
	}

	@Column(name = "SERU_NAME")
	public String getSeruName() {
		return this.seruName;
	}

	public void setSeruName(String seruName) {
		this.seruName = seruName;
	}

	@Column(name = "SERU_RULE")
	public String getSeruRule() {
		return this.seruRule;
	}

	public void setSeruRule(String seruRule) {
		this.seruRule = seruRule;
	}

	@Column(name = "SERU_SN_LENGTH")
	public Integer getSeruSnLength() {
		return this.seruSnLength;
	}

	public void setSeruSnLength(Integer seruSnLength) {
		this.seruSnLength = seruSnLength;
	}

	@Column(name = "SERU_UNIQ_SUFFIX")
	public String getSeruUniqSuffix() {
		return this.seruUniqSuffix;
	}

	public void setSeruUniqSuffix(String seruUniqSuffix) {
		this.seruUniqSuffix = seruUniqSuffix;
	}

	@Column(name = "COMP_CODE")
	public String getCompCode() {
		return compCode;
	}

	public void setCompCode(String compCode) {
		this.compCode = compCode;
	}
}
