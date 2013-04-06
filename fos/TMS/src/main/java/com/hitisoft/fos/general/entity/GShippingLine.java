package com.hitisoft.fos.general.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "G_SHIPPING_LINE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GShippingLine extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -1777276390933279816L;
	private Byte active;
	private Byte shliBulkFlag;
	private String shliCode;
	private Byte shliContFlag;
	private String shliName;
	private String shliNameEn;

	public GShippingLine() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "SHLI_BULK_FLAG")
	public Byte getShliBulkFlag() {
		return this.shliBulkFlag;
	}

	public void setShliBulkFlag(Byte shliBulkFlag) {
		this.shliBulkFlag = shliBulkFlag;
	}

	@Column(name = "SHLI_CODE")
	public String getShliCode() {
		return this.shliCode;
	}

	public void setShliCode(String shliCode) {
		this.shliCode = shliCode;
	}

	@Column(name = "SHLI_CONT_FLAG")
	public Byte getShliContFlag() {
		return this.shliContFlag;
	}

	public void setShliContFlag(Byte shliContFlag) {
		this.shliContFlag = shliContFlag;
	}

	@Column(name = "SHLI_NAME")
	public String getShliName() {
		return this.shliName;
	}

	public void setShliName(String shliName) {
		this.shliName = shliName;
	}

	@Column(name = "SHLI_NAME_EN")
	public String getShliNameEn() {
		return this.shliNameEn;
	}

	public void setShliNameEn(String shliNameEn) {
		this.shliNameEn = shliNameEn;
	}

}
