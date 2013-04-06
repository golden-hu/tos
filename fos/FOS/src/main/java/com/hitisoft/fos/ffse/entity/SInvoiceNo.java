package com.hitisoft.fos.ffse.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "S_INVOICE_NO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SInvoiceNo extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 8000071596528222393L;
	//发票号激活
	private Byte active;
	//终止发票号
	private Long innoEndNo;
	//当前可用发票号
	private Long innoNextNo;
	
	private Integer innoNumLen;
	//发票号前缀
	private String innoPrefix;
	//激活日期
	private Date innoStartDate;
	//起始发票号
	private Long innoStartNo;

	public SInvoiceNo() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "INNO_END_NO")
	public Long getInnoEndNo() {
		return this.innoEndNo;
	}

	public void setInnoEndNo(Long innoEndNo) {
		this.innoEndNo = innoEndNo;
	}

	@Column(name = "INNO_NEXT_NO")
	public Long getInnoNextNo() {
		return this.innoNextNo;
	}

	public void setInnoNextNo(Long innoNextNo) {
		this.innoNextNo = innoNextNo;
	}

	@Column(name = "INNO_NUM_LEN")
	public Integer getInnoNumLen() {
		return this.innoNumLen;
	}

	public void setInnoNumLen(Integer innoNumLen) {
		this.innoNumLen = innoNumLen;
	}

	@Column(name = "INNO_PREFIX")
	public String getInnoPrefix() {
		return this.innoPrefix;
	}

	public void setInnoPrefix(String innoPrefix) {
		this.innoPrefix = innoPrefix;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "INNO_START_DATE")
	public Date getInnoStartDate() {
		return this.innoStartDate;
	}

	public void setInnoStartDate(Date innoStartDate) {
		this.innoStartDate = innoStartDate;
	}

	@Column(name = "INNO_START_NO")
	public Long getInnoStartNo() {
		return this.innoStartNo;
	}

	public void setInnoStartNo(Long innoStartNo) {
		this.innoStartNo = innoStartNo;
	}

}
