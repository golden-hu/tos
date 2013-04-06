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
@Table(name = "P_MESSAGE_SUBSCRIBE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PMessageSubscribe extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -2287784109124800302L;
	private Byte mesuCustomerType;
	private Byte mesuImFlag;
	private Byte mesuMailFlag;
	private Byte mesuSmFlag;
	private String mesuSubscriberEmail;
	private Integer mesuSubscriberId;
	private String mesuSubscriberMobile;
	private String mesuSubscriberName;
	private Byte mesuSubscriberType;
	private Integer metoId;

	public PMessageSubscribe() {
	}

	@Column(name = "MESU_CUSTOMER_TYPE")
	public Byte getMesuCustomerType() {
		return this.mesuCustomerType;
	}

	public void setMesuCustomerType(Byte mesuCustomerType) {
		this.mesuCustomerType = mesuCustomerType;
	}

	@Column(name = "MESU_IM_FLAG")
	public Byte getMesuImFlag() {
		return this.mesuImFlag;
	}

	public void setMesuImFlag(Byte mesuImFlag) {
		this.mesuImFlag = mesuImFlag;
	}

	@Column(name = "MESU_MAIL_FLAG")
	public Byte getMesuMailFlag() {
		return this.mesuMailFlag;
	}

	public void setMesuMailFlag(Byte mesuMailFlag) {
		this.mesuMailFlag = mesuMailFlag;
	}

	@Column(name = "MESU_SM_FLAG")
	public Byte getMesuSmFlag() {
		return this.mesuSmFlag;
	}

	public void setMesuSmFlag(Byte mesuSmFlag) {
		this.mesuSmFlag = mesuSmFlag;
	}

	@Column(name = "MESU_SUBSCRIBER_EMAIL")
	public String getMesuSubscriberEmail() {
		return this.mesuSubscriberEmail;
	}

	public void setMesuSubscriberEmail(String mesuSubscriberEmail) {
		this.mesuSubscriberEmail = mesuSubscriberEmail;
	}

	@Column(name = "MESU_SUBSCRIBER_ID")
	public Integer getMesuSubscriberId() {
		return this.mesuSubscriberId;
	}

	public void setMesuSubscriberId(Integer mesuSubscriberId) {
		this.mesuSubscriberId = mesuSubscriberId;
	}

	@Column(name = "MESU_SUBSCRIBER_MOBILE")
	public String getMesuSubscriberMobile() {
		return this.mesuSubscriberMobile;
	}

	public void setMesuSubscriberMobile(String mesuSubscriberMobile) {
		this.mesuSubscriberMobile = mesuSubscriberMobile;
	}

	@Column(name = "MESU_SUBSCRIBER_NAME")
	public String getMesuSubscriberName() {
		return this.mesuSubscriberName;
	}

	public void setMesuSubscriberName(String mesuSubscriberName) {
		this.mesuSubscriberName = mesuSubscriberName;
	}

	@Column(name = "MESU_SUBSCRIBER_TYPE")
	public Byte getMesuSubscriberType() {
		return this.mesuSubscriberType;
	}

	public void setMesuSubscriberType(Byte mesuSubscriberType) {
		this.mesuSubscriberType = mesuSubscriberType;
	}

	@Column(name = "METO_ID")
	public Integer getMetoId() {
		return this.metoId;
	}

	public void setMetoId(Integer metoId) {
		this.metoId = metoId;
	}

}
