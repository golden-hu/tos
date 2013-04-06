package com.hitisoft.fos.crm.entity;

import java.io.Serializable;

import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;


/**
 * The persistent class for the c_complaint_type database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="C_COMPLAINT_TYPE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CComplaintType extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private String complaintName;
	
	@Column(name="COMPLAINT_NAME")
	public String getComplaintName() {
		return complaintName;
	}
	public void setComplaintName(String complaintName) {
		this.complaintName = complaintName;
	}
	
	
}