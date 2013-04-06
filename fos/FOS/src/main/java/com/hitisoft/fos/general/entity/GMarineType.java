/**
 * 
 */
package com.hitisoft.fos.general.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

/**
 * @author Gordon
 *
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "G_MARINE_TYPE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GMarineType extends BaseDomain implements Serializable{
	private static final long serialVersionUID = 3307444814362996720L;
	private String marineTypeName;
	private String remarks;
	
	@Column(name="MARINE_TYPE_NAME")
	public String getMarineTypeName() {
		return marineTypeName;
	}
	public void setMarineTypeName(String marineTypeName) {
		this.marineTypeName = marineTypeName;
	}
	@Column(name="REMARKS")
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
}
