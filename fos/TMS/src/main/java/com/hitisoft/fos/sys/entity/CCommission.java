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
@Table(name = "C_COMMISSION")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CCommission extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -1116475288607097136L;
	private String commName;

	public CCommission() {
	}

	@Column(name = "COMM_NAME")
	public String getCommName() {
		return this.commName;
	}

	public void setCommName(String commName) {
		this.commName = commName;
	}

}
