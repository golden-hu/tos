package com.hitisoft.fos.ffse.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "S_EXPENSE_TEMPLATE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SExpenseTemplate extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 3963354582704087863L;
	
	
	private String exteName;
	private String consBizType;
	
	public SExpenseTemplate() {
	}

	
	@Column(name = "EXTE_NAME")
	public String getExteName() {
		return this.exteName;
	}

	public void setExteName(String exteName) {
		this.exteName = exteName;
	}

	@Column(name = "CONS_BIZ_TYPE")
	public String getConsBizType() {
		return this.consBizType;
	}

	public void setConsBizType(String consBizType) {
		this.consBizType = consBizType;
	}
}
