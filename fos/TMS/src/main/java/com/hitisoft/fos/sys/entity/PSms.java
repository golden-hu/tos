package com.hitisoft.fos.sys.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="P_SMS")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
/**
 * 短信通知
 * @author 
 */
public class PSms extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable{

	private static final long serialVersionUID = 1L;
	//手机号码
	private String mobile;
	//短信内容
	private String content;
	//业务类型
	private String bizType;
	//委托ID
	private Integer consId;
	//系统委托号
	private String consNo;
	//发送日期
	private Date sendDate;
	//发送状态 1：成功
	private Integer status;
	//手工单号
	private String consNoHandler;
	
	public PSms(){}

	@Column(name="MOBILE")
	public String getMobile() {
		return this.mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	@Column(name="CONTENT")
	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Column(name="BIZ_TYPE")
	public String getBizType() {
		return this.bizType;
	}

	public void setBizType(String bizType) {
		this.bizType = bizType;
	}

	@Column(name="CONS_ID")
	public Integer getConsId() {
		return this.consId;
	}

	public void setConsId(Integer consId) {
		this.consId = consId;
	}

	@Column(name="CONS_NAME")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Temporal( TemporalType.DATE)
	@Column(name="SEND_DATE")
	public Date getSendDate() {
		return this.sendDate;
	}

	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
	}

	@Column(name="STATUS")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Column(name="CONS_NO_HANDLER")
	public String getConsNoHandler() {
    	return consNoHandler;
    }

	public void setConsNoHandler(String consNoHandler) {
    	this.consNoHandler = consNoHandler;
    }
	
	
}
