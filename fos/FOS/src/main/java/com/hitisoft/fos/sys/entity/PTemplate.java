package com.hitisoft.fos.sys.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "P_TEMPLATE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PTemplate extends BaseDomain implements Serializable {
	
	private static final long serialVersionUID = -7235046356628886281L;
	
	private Byte active;
	
	private String tempClass;
	
	private String tempDesc;
	
	private String tempFileName;
	
	//上传到服务器的模板文件名字
	private String tempName;
	
	private String tempType;
	
	//对应p_templete_type表中的tetyCode
	private String tetyCode;
	
	//对应p_templete_map表的tetyId
	private Integer tetyId;
	
	//模板类型名
	private String tetyName;

	public PTemplate() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "TEMP_CLASS")
	public String getTempClass() {
		return this.tempClass;
	}

	public void setTempClass(String tempClass) {
		this.tempClass = tempClass;
	}

	@Column(name = "TEMP_DESC")
	public String getTempDesc() {
		return this.tempDesc;
	}

	public void setTempDesc(String tempDesc) {
		this.tempDesc = tempDesc;
	}

	@Column(name = "TEMP_FILE_NAME")
	public String getTempFileName() {
		return this.tempFileName;
	}

	public void setTempFileName(String tempFileName) {
		this.tempFileName = tempFileName;
	}

	@Column(name = "TEMP_NAME")
	public String getTempName() {
		return this.tempName;
	}

	public void setTempName(String tempName) {
		this.tempName = tempName;
	}

	@Column(name = "TEMP_TYPE")
	public String getTempType() {
		return this.tempType;
	}

	public void setTempType(String tempType) {
		this.tempType = tempType;
	}

	@Column(name = "TETY_CODE")
	public String getTetyCode() {
		return this.tetyCode;
	}

	public void setTetyCode(String tetyCode) {
		this.tetyCode = tetyCode;
	}

	@Column(name = "TETY_ID")
	public Integer getTetyId() {
		return this.tetyId;
	}

	public void setTetyId(Integer tetyId) {
		this.tetyId = tetyId;
	}

	@Column(name = "TETY_NAME")
	public String getTetyName() {
		return this.tetyName;
	}

	public void setTetyName(String tetyName) {
		this.tetyName = tetyName;
	}

}
