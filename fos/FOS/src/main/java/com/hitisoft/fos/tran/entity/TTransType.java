package com.hitisoft.fos.tran.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "T_TRANS_TYPE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TTransType extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -8133703062971286217L;
	private String transTypeName;

	public TTransType() {
	}
	
	@Column(name = "TRANS_TYPE_NAME")
	public String getTransTypeName() {
		return this.transTypeName;
	}

	public void setTransTypeName(String transTypeName) {
		this.transTypeName = transTypeName;
	}

}
