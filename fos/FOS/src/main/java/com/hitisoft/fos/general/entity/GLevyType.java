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
@Table(name = "G_LEVY_TYPE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GLevyType extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -6351812789855547037L;
	private Byte active;
	private String letyCode;
	private String letyName;

	public GLevyType() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "LETY_CODE")
	public String getLetyCode() {
		return this.letyCode;
	}

	public void setLetyCode(String letyCode) {
		this.letyCode = letyCode;
	}

	@Column(name = "LETY_NAME")
	public String getLetyName() {
		return this.letyName;
	}

	public void setLetyName(String letyName) {
		this.letyName = letyName;
	}

}
