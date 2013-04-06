package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "W_PROCESS")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WProcess extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String homeworkNo;//杂作业编号
	private String singleNo;//出入库单号
	private String storageName;//仓库名称
	private String shipper;//货主
	private String homeworkType;//作业类型
	private String approver;//审批人
	private String wprocessClassId;//id
	private String approverType;//审批状态
	private String approverIdea;//审批人意见
	private Date approverTime;//审批时间
	private String remarks;//备注
	
	public WProcess() {
		super();
	}
	@Column(name="HOMEWORK_NO")
	public String getHomeworkNo() {
		return homeworkNo;
	}
	
	@Column(name="WPROCESS_CLASS_ID")
	public String getWprocessClassId() {
		return wprocessClassId;
	}
	
	public void setWprocessClassId(String wprocessClassId) {
		this.wprocessClassId = wprocessClassId;
	}
	public void setHomeworkNo(String homeworkNo) {
		this.homeworkNo = homeworkNo;
	}
	
	@Column(name="SINGLE_NO")
	public String getSingleNo() {
		return singleNo;
	}
	
	public void setSingleNo(String singleNo) {
		this.singleNo = singleNo;
	}
	@Column(name="STORAGE_NAME")
	public String getStorageName() {
		return storageName;
	}
	
	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}
	@Column(name="SHIPPER")
	public String getShipper() {
		return shipper;
	}
	
	public void setShipper(String shipper) {
		this.shipper = shipper;
	}
	@Column(name="HOMEWORK_TYPE")
	public String getHomeworkType() {
		return homeworkType;
	}
	
	public void setHomeworkType(String homeworkType) {
		this.homeworkType = homeworkType;
	}
	@Column(name="APPROVER")
	public String getApprover() {
		return approver;
	}
	
	public void setApprover(String approver) {
		this.approver = approver;
	}
	@Column(name="APPROVER_TYPE")
	public String getApproverType() {
		return approverType;
	}
	
	public void setApproverType(String approverType) {
		this.approverType = approverType;
	}
	
	@Column(name="APPROVER_IDEA")
	public String getApproverIdea() {
		return approverIdea;
	}
	
	public void setApproverIdea(String approverIdea) {
		this.approverIdea = approverIdea;
	}
	
	@Temporal( TemporalType.DATE)
	@Column(name="APPROVER_TIME")
	public Date getApproverTime() {
		return approverTime;
	}

	public void setApproverTime(Date approverTime) {
		this.approverTime = approverTime;
	}
	@Column(name="REMARKS")
	public String getRemarks() {
		return remarks;
	}
	
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
}
