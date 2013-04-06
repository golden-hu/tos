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
@Table(name = "P_USER_EXPE_PERMISSION")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PUserExpePermission extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 5101779457023989477L;
	private Integer chclId;
	private String chclName;
	private String expeType;
	private Byte usepEditable;
	private Byte usepEditAll;
	private Byte usepViewAll;
	private Integer userId;

	public PUserExpePermission() {
	}

	@Column(name = "CHCL_ID")
	public Integer getChclId() {
		return this.chclId;
	}

	public void setChclId(Integer chclId) {
		this.chclId = chclId;
	}

	@Column(name = "CHCL_NAME")
	public String getChclName() {
		return this.chclName;
	}

	public void setChclName(String chclName) {
		this.chclName = chclName;
	}

	@Column(name = "EXPE_TYPE")
	public String getExpeType() {
		return this.expeType;
	}

	public void setExpeType(String expeType) {
		this.expeType = expeType;
	}

	@Column(name = "USEP_EDITABLE")
	public Byte getUsepEditable() {
		return this.usepEditable;
	}

	public void setUsepEditable(Byte usepEditable) {
		this.usepEditable = usepEditable;
	}

	@Column(name = "USEP_EDIT_ALL")
	public Byte getUsepEditAll() {
		return this.usepEditAll;
	}

	public void setUsepEditAll(Byte usepEditAll) {
		this.usepEditAll = usepEditAll;
	}

	@Column(name = "USEP_VIEW_ALL")
	public Byte getUsepViewAll() {
		return this.usepViewAll;
	}

	public void setUsepViewAll(Byte usepViewAll) {
		this.usepViewAll = usepViewAll;
	}

	@Column(name = "USER_ID")
	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

}
