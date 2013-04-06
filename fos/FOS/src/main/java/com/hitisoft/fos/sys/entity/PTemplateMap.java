package com.hitisoft.fos.sys.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;
import com.hitisoft.fw.orm.jpa.IdDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "P_TEMPLATE_MAP")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PTemplateMap extends IdDomain implements Serializable {
	
	private static final long serialVersionUID = 863728956293219684L;
	
	//用于转换字段值的函数
	private String temaConverter;
	
	//表的字段
	private String temaField;
	
	//报表中大括号内的中文字
	private String temaName;
	
	//要输出字段的表名
	private String temaTable;
	
	//p_templete_type表的id
	private Integer tetyId;

	public PTemplateMap() {
	}

	@Column(name = "TEMA_CONVERTER")
	public String getTemaConverter() {
		return this.temaConverter;
	}

	public void setTemaConverter(String temaConverter) {
		this.temaConverter = temaConverter;
	}

	@Column(name = "TEMA_FIELD")
	public String getTemaField() {
		return this.temaField;
	}

	public void setTemaField(String temaField) {
		this.temaField = temaField;
	}

	@Column(name = "TEMA_NAME")
	public String getTemaName() {
		return this.temaName;
	}

	public void setTemaName(String temaName) {
		this.temaName = temaName;
	}

	@Column(name = "TEMA_TABLE")
	public String getTemaTable() {
		return this.temaTable;
	}

	public void setTemaTable(String temaTable) {
		this.temaTable = temaTable;
	}

	@Column(name = "TETY_ID")
	public Integer getTetyId() {
		return this.tetyId;
	}

	public void setTetyId(Integer tetyId) {
		this.tetyId = tetyId;
	}

}
