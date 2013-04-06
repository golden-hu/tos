package com.hitisoft.fos.sys.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "P_USER")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PUser extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 8095555244794233589L;
	//激活
	private Byte active;
	//可编辑所有单票
	private Byte userAllEditFlag;
	//可查看所以单票
	private Byte userAllViewFlag;
	//部门
	private Integer grouId;
	private String grouName;
	//缺省角色
	private Integer roleId;
	private String roleName;
	private String userEmail;
	//系统登录名
	private String userLoginName;
	private String userMobile;
	private String userMsn;
	//用户名
	private String userName;
	//操作员
	private Byte userOperatorFlag;
	private String userPassword;
	//密码编辑日期
	private Date userPasswordModifyDate;
	private String userQq;
	//业务员
	private Byte userSalesFlag;
	private String userTel;
	//部门
	private Integer siteId;
	private String siteName;
	//用户标记（0：内部帐号，1:外包帐号）
	private Integer userTypeFlag;
	//客户ID
	private Integer custId;
	//客户名称
	private String custNameCn;
	
	//临时字段
	private String funcCode;
	private String ip;

	public PUser() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "USER_ALL_EDIT_FLAG")
	public Byte getUserAllEditFlag() {
		return this.userAllEditFlag;
	}

	public void setUserAllEditFlag(Byte userAllEditFlag) {
		this.userAllEditFlag = userAllEditFlag;
	}

	@Column(name = "USER_ALL_VIEW_FLAG")
	public Byte getUserAllViewFlag() {
		return this.userAllViewFlag;
	}

	public void setUserAllViewFlag(Byte userAllViewFlag) {
		this.userAllViewFlag = userAllViewFlag;
	}

	@Column(name = "GROU_ID")
	public Integer getGrouId() {
		return this.grouId;
	}

	public void setGrouId(Integer grouId) {
		this.grouId = grouId;
	}

	@Column(name = "GROU_NAME")
	public String getGrouName() {
		return this.grouName;
	}

	public void setGrouName(String grouName) {
		this.grouName = grouName;
	}
	
	@Column(name = "ROLE_ID")
	public Integer getRoleId() {
		return this.roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	
	@Column(name = "ROLE_NAME")
	public String getRoleName() {
		return this.roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	@Column(name = "USER_EMAIL")
	public String getUserEmail() {
		return this.userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	@Column(name = "USER_LOGIN_NAME")
	public String getUserLoginName() {
		return this.userLoginName;
	}

	public void setUserLoginName(String userLoginName) {
		this.userLoginName = userLoginName;
	}

	@Column(name = "USER_MOBILE")
	public String getUserMobile() {
		return this.userMobile;
	}

	public void setUserMobile(String userMobile) {
		this.userMobile = userMobile;
	}

	@Column(name = "USER_MSN")
	public String getUserMsn() {
		return this.userMsn;
	}

	public void setUserMsn(String userMsn) {
		this.userMsn = userMsn;
	}

	@Column(name = "USER_NAME")
	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Column(name = "USER_OPERATOR_FLAG")
	public Byte getUserOperatorFlag() {
		return this.userOperatorFlag;
	}

	public void setUserOperatorFlag(Byte userOperatorFlag) {
		this.userOperatorFlag = userOperatorFlag;
	}

	@Column(name = "USER_PASSWORD")
	public String getUserPassword() {
		return this.userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "USER_PASSWORD_MODIFY_DATE")
	public Date getUserPasswordModifyDate() {
		return this.userPasswordModifyDate;
	}

	public void setUserPasswordModifyDate(Date userPasswordModifyDate) {
		this.userPasswordModifyDate = userPasswordModifyDate;
	}

	@Column(name = "USER_QQ")
	public String getUserQq() {
		return this.userQq;
	}

	public void setUserQq(String userQq) {
		this.userQq = userQq;
	}

	@Column(name = "USER_SALES_FLAG")
	public Byte getUserSalesFlag() {
		return this.userSalesFlag;
	}

	public void setUserSalesFlag(Byte userSalesFlag) {
		this.userSalesFlag = userSalesFlag;
	}

	@Column(name = "USER_TEL")
	public String getUserTel() {
		return this.userTel;
	}

	public void setUserTel(String userTel) {
		this.userTel = userTel;
	}

	@Transient
	public String getFuncCode() {
		return funcCode;
	}

	public void setFuncCode(String funcCode) {
		this.funcCode = funcCode;
	}

	@Transient
	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	@Column(name = "SITE_ID")
	public Integer getSiteId() {
		return siteId;
	}

	public void setSiteId(Integer siteId) {
		this.siteId = siteId;
	}

	@Column(name = "SITE_NAME")
	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	@Column(name = "USER_TYPE_FLAG")
	public Integer getUserTypeFlag() {
    	return userTypeFlag;
    }

	public void setUserTypeFlag(Integer userTypeFlag) {
    	this.userTypeFlag = userTypeFlag;
    }

	@Column(name = "CUST_ID")
	public Integer getCustId() {
    	return custId;
    }

	public void setCustId(Integer custId) {
    	this.custId = custId;
    }

	@Column(name = "CUST_NAME_CN")
	public String getCustNameCn() {
    	return custNameCn;
    }

	public void setCustNameCn(String custNameCn) {
    	this.custNameCn = custNameCn;
    }

	
}
