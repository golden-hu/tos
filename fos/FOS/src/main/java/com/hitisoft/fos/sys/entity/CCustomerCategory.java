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
@Table(name = "C_CUSTOMER_CATEGORY")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CCustomerCategory extends BaseDomain implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 6941628018277800644L;
	private String cucaName;

	public CCustomerCategory() {
	}

	@Column(name = "CUCA_NAME")
	public String getCucaName() {
		return this.cucaName;
	}

	public void setCucaName(String cucaName) {
		this.cucaName = cucaName;
	}

}
