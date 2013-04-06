package com.hitisoft.fos.sys.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "P_MESSAGE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PMessage extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 6428057627316923158L;
	private String messAttachment;
	private String messBcc;
	private String messBody;
	private String messCc;
	private Date messCreateTime;
	private String messFrom;
	private Integer messFromUserId;
	private String messFromUserName;
	private Byte messSendFlag;
	private String messSubject;
	private String messTo;
	private Integer messToUserId;
	private String messToUserName;
	private Byte messType;

	public PMessage() {
	}

	@Column(name = "MESS_ATTACHMENT")
	public String getMessAttachment() {
		return this.messAttachment;
	}

	public void setMessAttachment(String messAttachment) {
		this.messAttachment = messAttachment;
	}

	@Column(name = "MESS_BCC")
	public String getMessBcc() {
		return this.messBcc;
	}

	public void setMessBcc(String messBcc) {
		this.messBcc = messBcc;
	}

	@Lob()
	@Column(name = "MESS_BODY")
	public String getMessBody() {
		return this.messBody;
	}

	public void setMessBody(String messBody) {
		this.messBody = messBody;
	}

	@Column(name = "MESS_CC")
	public String getMessCc() {
		return this.messCc;
	}

	public void setMessCc(String messCc) {
		this.messCc = messCc;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "MESS_CREATE_TIME")
	public Date getMessCreateTime() {
		return this.messCreateTime;
	}

	public void setMessCreateTime(Date messCreateTime) {
		this.messCreateTime = messCreateTime;
	}

	@Column(name = "MESS_FROM")
	public String getMessFrom() {
		return this.messFrom;
	}

	public void setMessFrom(String messFrom) {
		this.messFrom = messFrom;
	}

	@Column(name = "MESS_FROM_USER_ID")
	public Integer getMessFromUserId() {
		return this.messFromUserId;
	}

	public void setMessFromUserId(Integer messFromUserId) {
		this.messFromUserId = messFromUserId;
	}

	@Column(name = "MESS_FROM_USER_NAME")
	public String getMessFromUserName() {
		return this.messFromUserName;
	}

	public void setMessFromUserName(String messFromUserName) {
		this.messFromUserName = messFromUserName;
	}

	@Column(name = "MESS_SEND_FLAG")
	public Byte getMessSendFlag() {
		return this.messSendFlag;
	}

	public void setMessSendFlag(Byte messSendFlag) {
		this.messSendFlag = messSendFlag;
	}

	@Column(name = "MESS_SUBJECT")
	public String getMessSubject() {
		return this.messSubject;
	}

	public void setMessSubject(String messSubject) {
		this.messSubject = messSubject;
	}

	@Column(name = "MESS_TO")
	public String getMessTo() {
		return this.messTo;
	}

	public void setMessTo(String messTo) {
		this.messTo = messTo;
	}

	@Column(name = "MESS_TO_USER_ID")
	public Integer getMessToUserId() {
		return this.messToUserId;
	}

	public void setMessToUserId(Integer messToUserId) {
		this.messToUserId = messToUserId;
	}

	@Column(name = "MESS_TO_USER_NAME")
	public String getMessToUserName() {
		return this.messToUserName;
	}

	public void setMessToUserName(String messToUserName) {
		this.messToUserName = messToUserName;
	}

	@Column(name = "MESS_TYPE")
	public Byte getMessType() {
		return this.messType;
	}

	public void setMessType(Byte messType) {
		this.messType = messType;
	}

}
