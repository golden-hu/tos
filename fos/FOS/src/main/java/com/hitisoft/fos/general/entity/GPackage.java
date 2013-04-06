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
@Table(name = "G_PACKAGE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GPackage extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -3885949986133156988L;
	private Byte active;
	private String packCode;
	private String packName;

	public GPackage() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "PACK_CODE")
	public String getPackCode() {
		return this.packCode;
	}

	public void setPackCode(String packCode) {
		this.packCode = packCode;
	}

	@Column(name = "PACK_NAME")
	public String getPackName() {
		return this.packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}

}
