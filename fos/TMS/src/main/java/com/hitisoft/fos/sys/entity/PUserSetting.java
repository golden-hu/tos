package com.hitisoft.fos.sys.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "P_USER_SETTING")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PUserSetting extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 3846121023896396552L;
	private Integer userId;
	private String usseName;
	private String usseValue;

	public PUserSetting() {
	}

	@Column(name = "USER_ID")
	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	@Column(name = "USSE_NAME")
	public String getUsseName() {
		return this.usseName;
	}

	public void setUsseName(String usseName) {
		this.usseName = usseName;
	}

	@Lob()
	@Column(name = "USSE_VALUE")
	public String getUsseValue() {
		return this.usseValue;
	}

	public void setUsseValue(String usseValue) {
		this.usseValue = usseValue;
	}

}
