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
@Table(name = "G_CONTAINER_CLASS")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GContainerClass extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 4892172683967717088L;
	private Byte active;
	private String coclCode;
	private String coclName;

	public GContainerClass() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "COCL_CODE")
	public String getCoclCode() {
		return this.coclCode;
	}

	public void setCoclCode(String coclCode) {
		this.coclCode = coclCode;
	}

	@Column(name = "COCL_NAME")
	public String getCoclName() {
		return this.coclName;
	}

	public void setCoclName(String coclName) {
		this.coclName = coclName;
	}

}
