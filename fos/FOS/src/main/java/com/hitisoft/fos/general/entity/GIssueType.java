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
@Table(name = "G_ISSUE_TYPE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GIssueType extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -8725675416856075147L;
	private Byte active;
	private String istyCode;
	private String istyName;

	public GIssueType() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "ISTY_CODE")
	public String getIstyCode() {
		return this.istyCode;
	}

	public void setIstyCode(String istyCode) {
		this.istyCode = istyCode;
	}

	@Column(name = "ISTY_NAME")
	public String getIstyName() {
		return this.istyName;
	}

	public void setIstyName(String istyName) {
		this.istyName = istyName;
	}

}
