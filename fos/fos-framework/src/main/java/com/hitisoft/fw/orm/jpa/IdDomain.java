package com.hitisoft.fw.orm.jpa;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import com.hitisoft.fw.orm.util.RowAction;

@MappedSuperclass
public abstract class IdDomain implements java.io.Serializable {
	private static final long serialVersionUID = -4695194062552942944L;
	protected RowAction rowAction;
	protected Long id;

	@Transient
	public RowAction getRowAction() {
		return rowAction;
	}

	public void setRowAction(RowAction rowAction) {
		this.rowAction = rowAction;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(insertable = false, updatable = false)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
