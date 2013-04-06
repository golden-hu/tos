package com.hitisoft.fos.tran.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.util.Date;

/**
 * The persistent class for the T_RECEIPT database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="T_RECEIPT")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TReceipt extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	//派车单ID
	private Integer transTaskId;
	//派车单号
	private String transTaskNo;
	//陆运ID
	private Integer consId;
	//陆运单号
	private String consNo;
	//手工单号
	private String consNoHandler;
	//货物名称
	private String cargoName;
	//件数
	private Integer packages;
	//派车后到货件数
	private Integer packagesArrival;
	//派车后到货件数
	private Integer packagesLack;
	//签收人
	private String signInContact;
	//签收日期
	private Date signInDate;
	//返回签收人
	private String returnSignInContact;
	//返回签收日期
	private Date returnSignInDate;
	//返单类型
	private String receiptType;
	//返单数量
	private String receiptNum;
	//备注
	private String remarks;
	
    public TReceipt() { }

	@Column(name="CARGO_NAME")
	public String getCargoName() {
		return this.cargoName;
	}

	public void setCargoName(String cargoName) {
		this.cargoName = cargoName;
	}


	@Column(name="CONS_ID")
	public Integer getConsId() {
		return this.consId;
	}

	public void setConsId(Integer consId) {
		this.consId = consId;
	}

	@Column(name="CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}


	@Column(name="PACKAGES")
	public Integer getPackages() {
		return this.packages;
	}

	public void setPackages(Integer packages) {
		this.packages = packages;
	}

	@Column(name="REMARKS")
	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}


	@Column(name="TRANS_TASK_ID")
	public Integer getTransTaskId() {
		return this.transTaskId;
	}

	public void setTransTaskId(Integer transTaskId) {
		this.transTaskId = transTaskId;
	}

	@Column(name="CONS_NO_HANDLER")
	public String getConsNoHandler() {
    	return consNoHandler;
    }

	public void setConsNoHandler(String consNoHandler) {
    	this.consNoHandler = consNoHandler;
    }

	@Column(name="PACKAGES_ARRIVAL")
	public Integer getPackagesArrival() {
    	return packagesArrival;
    }


	public void setPackagesArrival(Integer packagesArrival) {
    	this.packagesArrival = packagesArrival;
    }
	@Column(name="PACKAGES_LACK")
	public Integer getPackagesLack() {
    	return packagesLack;
    }

	public void setPackagesLack(Integer packagesLack) {
    	this.packagesLack = packagesLack;
    }

	@Column(name="TRANS_TASK_NO")
	public String getTransTaskNo() {
    	return transTaskNo;
    }

	public void setTransTaskNo(String taskNo) {
    	this.transTaskNo = taskNo;
    }

	@Column(name="SIGN_IN_CONTACT")
	public String getSignInContact() {
    	return signInContact;
    }

	public void setSignInContact(String signInContact) {
    	this.signInContact = signInContact;
    }

	@Temporal( TemporalType.DATE)
	@Column(name="SIGN_IN_DATE")
	public Date getSignInDate() {
    	return signInDate;
    }

	public void setSignInDate(Date signInDate) {
    	this.signInDate = signInDate;
    }

	@Column(name="RETURN_SIGN_IN_CONTACT")
	public String getReturnSignInContact() {
    	return returnSignInContact;
    }

	public void setReturnSignInContact(String returnSignInContact) {
    	this.returnSignInContact = returnSignInContact;
    }

	@Temporal( TemporalType.DATE)
	@Column(name="RETURN_SIGN_IN_DATE")
	public Date getReturnSignInDate() {
    	return returnSignInDate;
    }

	public void setReturnSignInDate(Date returnSignInDate) {
    	this.returnSignInDate = returnSignInDate;
    }

	@Column(name="RECEIPT_TYPE")
	public String getReceiptType() {
    	return receiptType;
    }

	public void setReceiptType(String receiptType) {
    	this.receiptType = receiptType;
    }

	@Column(name="RECEIPT_NUM")
	public String getReceiptNum() {
    	return receiptNum;
    }

	public void setReceiptNum(String receiptNum) {
    	this.receiptNum = receiptNum;
    }
	
	
}