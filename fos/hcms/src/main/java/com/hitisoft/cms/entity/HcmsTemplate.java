package com.hitisoft.cms.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@Table(name = "HCMS_TEMPLATE")
public class HcmsTemplate extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 2954702838349937700L;
	private Long id;
	private String compCode;
	private Integer createBy;
	private String createByName;
	private Integer grouId;
	private String grouName;
	private Integer modifyBy;
	private String modifyByName;
	private String tempContent;
	private String tempName;
	private String tempType;
	private Integer userId;
	private String userName;

	public HcmsTemplate() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TEMP_ID")
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "COMP_CODE")
	public String getCompCode() {
		return this.compCode;
	}

	public void setCompCode(String compCode) {
		this.compCode = compCode;
	}

	@Column(name = "CREATE_BY")
	public String getCreateBy() {
		return "" + this.createBy;
	}

	public void setCreateBy(Integer createBy) {
		this.createBy = createBy;
	}

	@Column(name = "CREATE_BY_NAME")
	public String getCreateByName() {
		return this.createByName;
	}

	public void setCreateByName(String createByName) {
		this.createByName = createByName;
	}

	@Column(name = "GROU_ID")
	public int getGrouId() {
		return this.grouId;
	}

	public void setGrouId(int grouId) {
		this.grouId = grouId;
	}

	@Column(name = "GROU_NAME")
	public String getGrouName() {
		return this.grouName;
	}

	public void setGrouName(String grouName) {
		this.grouName = grouName;
	}

	@Column(name = "MODIFY_BY")
	public String getModifyBy() {
		return "" + this.modifyBy;
	}

	public void setModifyBy(Integer modifyBy) {
		this.modifyBy = modifyBy;
	}

	@Column(name = "MODIFY_BY_NAME")
	public String getModifyByName() {
		return this.modifyByName;
	}

	public void setModifyByName(String modifyByName) {
		this.modifyByName = modifyByName;
	}

	@Lob()
	@Column(name = "TEMP_CONTENT")
	public String getTempContent() {
		return this.tempContent;
	}

	public void setTempContent(String tempContent) {
		this.tempContent = tempContent;
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

	@Column(name = "USER_ID")
	public int getUserId() {
		return this.userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Column(name = "USER_NAME")
	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
}