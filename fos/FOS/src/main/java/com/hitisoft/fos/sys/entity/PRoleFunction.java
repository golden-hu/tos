package com.hitisoft.fos.sys.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "P_ROLE_FUNCTION")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PRoleFunction extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -8287731472815585324L;
	private String funcCode;
	private Integer roleId;

	public PRoleFunction() {
	}

	@Column(name = "FUNC_CODE")
	public String getFuncCode() {
		return this.funcCode;
	}

	public void setFuncCode(String funcCode) {
		this.funcCode = funcCode;
	}

	@Column(name = "ROLE_ID")
	public Integer getRoleId() {
		return this.roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

}
