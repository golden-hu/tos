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
@Table(name = "G_DOCUMENT_TYPE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GDocumentType extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 5446867021961718617L;
	private Byte active;	
	private String dotyCode;
	private String dotyName;

	public GDocumentType() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	
	@Column(name = "DOTY_CODE")
	public String getDotyCode() {
		return this.dotyCode;
	}

	public void setDotyCode(String dotyCode) {
		this.dotyCode = dotyCode;
	}

	@Column(name = "DOTY_NAME")
	public String getDotyName() {
		return this.dotyName;
	}

	public void setDotyName(String dotyName) {
		this.dotyName = dotyName;
	}

}
