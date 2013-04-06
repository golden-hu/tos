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
@Table(name = "P_GROUP")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PGroup extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -1232060208837147966L;
	private Byte active;
	private String grouDesc;
	private String grouName;

	public PGroup() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "GROU_DESC")
	public String getGrouDesc() {
		return this.grouDesc;
	}

	public void setGrouDesc(String grouDesc) {
		this.grouDesc = grouDesc;
	}

	@Column(name = "GROU_NAME")
	public String getGrouName() {
		return this.grouName;
	}

	public void setGrouName(String grouName) {
		this.grouName = grouName;
	}

}
