package com.hitisoft.fos.sys.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "P_TABLE_INFO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PTableInfo extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 4304706143436306114L;
	private String tainId;
	private String tainFieldName;
	private String tainFieldType;
	private String tainTableName;

	public PTableInfo() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TAIN_ID")
	public String getTainId() {
		return this.tainId;
	}

	public void setTainId(String tainId) {
		this.tainId = tainId;
	}

	@Column(name = "TAIN_FIELD_NAME")
	public String getTainFieldName() {
		return this.tainFieldName;
	}

	public void setTainFieldName(String tainFieldName) {
		this.tainFieldName = tainFieldName;
	}

	@Column(name = "TAIN_FIELD_TYPE")
	public String getTainFieldType() {
		return this.tainFieldType;
	}

	public void setTainFieldType(String tainFieldType) {
		this.tainFieldType = tainFieldType;
	}

	@Column(name = "TAIN_TABLE_NAME")
	public String getTainTableName() {
		return this.tainTableName;
	}

	public void setTainTableName(String tainTableName) {
		this.tainTableName = tainTableName;
	}

}
