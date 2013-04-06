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
@Table(name = "G_TRANS_TERM")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GTransTerm extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -9008178080756668753L;
	private Byte active;
	private Byte tranBulkFlag;
	private String tranCode;
	private Byte tranContFlag;
	private Byte tranAirFlag;
	private String tranName;

	public GTransTerm() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "TRAN_BULK_FLAG")
	public Byte getTranBulkFlag() {
		return this.tranBulkFlag;
	}

	public void setTranBulkFlag(Byte tranBulkFlag) {
		this.tranBulkFlag = tranBulkFlag;
	}

	@Column(name = "TRAN_CODE")
	public String getTranCode() {
		return this.tranCode;
	}

	public void setTranCode(String tranCode) {
		this.tranCode = tranCode;
	}

	@Column(name = "TRAN_CONT_FLAG")
	public Byte getTranContFlag() {
		return this.tranContFlag;
	}

	public void setTranContFlag(Byte tranContFlag) {
		this.tranContFlag = tranContFlag;
	}

	@Column(name = "TRAN_AIR_FLAG")
	public Byte getTranAirFlag() {
		return tranAirFlag;
	}
	public void setTranAirFlag(Byte tranAirFlag) {
		this.tranAirFlag = tranAirFlag;
	}
	
	@Column(name = "TRAN_NAME")
	public String getTranName() {
		return this.tranName;
	}

	public void setTranName(String tranName) {
		this.tranName = tranName;
	}

}
