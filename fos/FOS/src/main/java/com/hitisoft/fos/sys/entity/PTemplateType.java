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
@Table(name = "P_TEMPLATE_TYPE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PTemplateType extends IdDomain implements Serializable {
	
	private static final long serialVersionUID = 4258145645379340343L;
	
	private String tetyClass;
	
	//点击输出报表发出的请求
	private String tetyAction;
	
	//子表的表名
	private String tetyChild;
	
	private String tetyCode;
	
	private String tetyDesc;
	
	private Byte tetyFormFlag;
	
	private String tetyName;
	
	//主表的表名
	private String tetyParent;
	
	private String tetyType;

	public PTemplateType() {
	}
	
	@Column(name = "TETY_CLASS")
	public String getTetyClass() {
		return this.tetyClass;
	}

	public void setTetyClass(String tetyClass) {
		this.tetyClass = tetyClass;
	}

	@Column(name = "TETY_ACTION")
	public String getTetyAction() {
		return this.tetyAction;
	}

	public void setTetyAction(String tetyAction) {
		this.tetyAction = tetyAction;
	}

	@Column(name = "TETY_CHILD")
	public String getTetyChild() {
		return this.tetyChild;
	}

	public void setTetyChild(String tetyChild) {
		this.tetyChild = tetyChild;
	}

	@Column(name = "TETY_CODE")
	public String getTetyCode() {
		return this.tetyCode;
	}

	public void setTetyCode(String tetyCode) {
		this.tetyCode = tetyCode;
	}

	@Column(name = "TETY_DESC")
	public String getTetyDesc() {
		return this.tetyDesc;
	}

	public void setTetyDesc(String tetyDesc) {
		this.tetyDesc = tetyDesc;
	}

	@Column(name = "TETY_FORM_FLAG")
	public Byte getTetyFormFlag() {
		return this.tetyFormFlag;
	}

	public void setTetyFormFlag(Byte tetyFormFlag) {
		this.tetyFormFlag = tetyFormFlag;
	}

	@Column(name = "TETY_NAME")
	public String getTetyName() {
		return this.tetyName;
	}

	public void setTetyName(String tetyName) {
		this.tetyName = tetyName;
	}

	@Column(name = "TETY_PARENT")
	public String getTetyParent() {
		return this.tetyParent;
	}

	public void setTetyParent(String tetyParent) {
		this.tetyParent = tetyParent;
	}

	@Column(name = "TETY_TYPE")
	public String getTetyType() {
		return this.tetyType;
	}

	public void setTetyType(String tetyType) {
		this.tetyType = tetyType;
	}

}
