package com.hitisoft.fos.sys.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

//文件上传
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "C_ATTACH")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CAttach extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -1116475288607097136L;
	private String attachName;
	private String attachFileName;
	private String attachExtName;
	private String attachDesc;
	
	private Integer consId;
	private String consNo;
	private String consBizType;
	
	public CAttach() {
	}

	@Column(name = "ATTACH_NAME")
	public String getAttachName() {
		return this.attachName;
	}

	public void setAttachName(String attachName) {
		this.attachName = attachName;
	}

	@Column(name = "ATTACH_FILE_NAME")
	public String getAttachFileName() {
		return this.attachFileName;
	}

	public void setAttachFileName(String attachFileName) {
		this.attachFileName = attachFileName;
	}
	
	@Column(name = "ATTACH_EXT_NAME")
	public String getAttachExtName() {
		return this.attachExtName;
	}

	public void setAttachExtName(String attachExtName) {
		this.attachExtName = attachExtName;
	}
	
	@Column(name = "ATTACH_DESC")
	public String getAttachDesc() {
		return this.attachDesc;
	}

	public void setAttachDesc(String attachDesc) {
		this.attachDesc = attachDesc;
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
	
	@Column(name = "CONS_BIZ_TYPE")
	public String getConsBizType() {
		return this.consBizType;
	}

	public void setConsBizType(String consBizType) {
		this.consNo = consBizType;
	}
}

