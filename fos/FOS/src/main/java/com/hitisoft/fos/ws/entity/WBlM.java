package com.hitisoft.fos.ws.entity;

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
@Table(name = "W_BL_M")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WBlM extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 8619314413907118769L;
	private Integer blId;
	private String blNo;
	private Integer consId;
	private String consNo;
	private Integer custId;
	private String custName;
	private Date replyTime;
	private String wblmField;
	private String wblmReason;
	private String wblmRejectReason;
	private String wblmReplyBy;
	private Byte wblmStatus;
	private String wblmValueNew;
	private String wblmValueO;
	private Integer wusrId;

	public WBlM() {
	}

	@Column(name = "BL_ID")
	public Integer getBlId() {
		return this.blId;
	}

	public void setBlId(Integer blId) {
		this.blId = blId;
	}

	@Column(name = "BL_NO")
	public String getBlNo() {
		return this.blNo;
	}

	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}

	@Column(name = "CONS_ID")
	public Integer getConsId() {
		return this.consId;
	}

	public void setConsId(Integer consId) {
		this.consId = consId;
	}

	@Column(name = "CONS_NO")
	public String getConsNo() {
		return this.consNo;
	}

	public void setConsNo(String consNo) {
		this.consNo = consNo;
	}

	@Column(name = "CUST_ID")
	public Integer getCustId() {
		return this.custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}

	@Column(name = "CUST_NAME")
	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "REPLY_TIME")
	public Date getReplyTime() {
		return this.replyTime;
	}

	public void setReplyTime(Date replyTime) {
		this.replyTime = replyTime;
	}

	@Column(name = "WBLM_FIELD")
	public String getWblmField() {
		return this.wblmField;
	}

	public void setWblmField(String wblmField) {
		this.wblmField = wblmField;
	}

	@Column(name = "WBLM_REASON")
	public String getWblmReason() {
		return this.wblmReason;
	}

	public void setWblmReason(String wblmReason) {
		this.wblmReason = wblmReason;
	}

	@Column(name = "WBLM_REJECT_REASON")
	public String getWblmRejectReason() {
		return this.wblmRejectReason;
	}

	public void setWblmRejectReason(String wblmRejectReason) {
		this.wblmRejectReason = wblmRejectReason;
	}

	@Column(name = "WBLM_REPLY_BY")
	public String getWblmReplyBy() {
		return this.wblmReplyBy;
	}

	public void setWblmReplyBy(String wblmReplyBy) {
		this.wblmReplyBy = wblmReplyBy;
	}

	@Column(name = "WBLM_STATUS")
	public Byte getWblmStatus() {
		return this.wblmStatus;
	}

	public void setWblmStatus(Byte wblmStatus) {
		this.wblmStatus = wblmStatus;
	}

	@Column(name = "WBLM_VALUE_NEW")
	public String getWblmValueNew() {
		return this.wblmValueNew;
	}

	public void setWblmValueNew(String wblmValueNew) {
		this.wblmValueNew = wblmValueNew;
	}

	@Column(name = "WBLM_VALUE_O")
	public String getWblmValueO() {
		return this.wblmValueO;
	}

	public void setWblmValueO(String wblmValueO) {
		this.wblmValueO = wblmValueO;
	}

	@Column(name = "WUSR_ID")
	public Integer getWusrId() {
		return this.wusrId;
	}

	public void setWusrId(Integer wusrId) {
		this.wusrId = wusrId;
	}

}
