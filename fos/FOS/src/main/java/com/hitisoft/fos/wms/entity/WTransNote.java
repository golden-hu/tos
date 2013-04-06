package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.util.Date;


/**
 * The persistent class for the w_trans_note database table.
 * 
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_TRANS_NOTE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WTransNote extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private String checkComments;
	private Date checkTime;
	private Integer checkerId;
	private String checkerName;
	private Integer status;
	private Date transDate;
	
	private String transNoteNo;
	private Integer transType;
	private String transBy;

    public WTransNote() {
    }


	@Column(name="CHECK_COMMENTS")
	public String getCheckComments() {
		return this.checkComments;
	}

	public void setCheckComments(String checkComments) {
		this.checkComments = checkComments;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="CHECK_TIME")
	public Date getCheckTime() {
		return this.checkTime;
	}

	public void setCheckTime(Date checkTime) {
		this.checkTime = checkTime;
	}


	@Column(name="CHECKER_ID")
	public Integer getCheckerId() {
		return this.checkerId;
	}

	public void setCheckerId(Integer checkerId) {
		this.checkerId = checkerId;
	}


	@Column(name="CHECKER_NAME")
	public String getCheckerName() {
		return this.checkerName;
	}

	public void setCheckerName(String checkerName) {
		this.checkerName = checkerName;
	}
	
	@Column(name="STATUS")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="TRANS_DATE")
	public Date getTransDate() {
		return this.transDate;
	}

	public void setTransDate(Date transDate) {
		this.transDate = transDate;
	}


	@Column(name="TRANS_NOTE_NO")
	public String getTransNoteNo() {
		return this.transNoteNo;
	}

	public void setTransNoteNo(String transNoteNo) {
		this.transNoteNo = transNoteNo;
	}


	@Column(name="TRANS_TYPE")
	public Integer getTransType() {
		return this.transType;
	}

	public void setTransType(Integer transType) {
		this.transType = transType;
	}
	
	@Column(name="TRANS_BY")
	public String getTransBy(){
		return this.transBy;
	}

	public void setTransBy(String transBy) {
		this.transBy = transBy;
	}

}