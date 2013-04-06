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
@Table(name = "G_TRANS_TYPE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GTransType extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 9077055164169657393L;
	private Byte active;
	private String tratCode;
	private String tratName;

	public GTransType() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "TRAT_CODE")
	public String getTratCode() {
		return this.tratCode;
	}

	public void setTratCode(String tratCode) {
		this.tratCode = tratCode;
	}

	@Column(name = "TRAT_NAME")
	public String getTratName() {
		return this.tratName;
	}

	public void setTratName(String tratName) {
		this.tratName = tratName;
	}

}
