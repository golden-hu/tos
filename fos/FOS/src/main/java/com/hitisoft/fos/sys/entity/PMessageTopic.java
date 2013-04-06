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
@Table(name = "P_MESSAGE_TOPIC")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PMessageTopic extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 6321905584504500011L;
	private String actName;
	private Byte active;
	private String metoDesc;
	private String metoName;
	private String metoRule;
	private String metoTemplate;
	private Integer tetyId;

	public PMessageTopic() {
	}

	@Column(name = "ACT_NAME")
	public String getActName() {
		return this.actName;
	}

	public void setActName(String actName) {
		this.actName = actName;
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "METO_DESC")
	public String getMetoDesc() {
		return this.metoDesc;
	}

	public void setMetoDesc(String metoDesc) {
		this.metoDesc = metoDesc;
	}

	@Column(name = "METO_NAME")
	public String getMetoName() {
		return this.metoName;
	}

	public void setMetoName(String metoName) {
		this.metoName = metoName;
	}

	@Column(name = "METO_RULE")
	public String getMetoRule() {
		return this.metoRule;
	}

	public void setMetoRule(String metoRule) {
		this.metoRule = metoRule;
	}

	@Lob()
	@Column(name = "METO_TEMPLATE")
	public String getMetoTemplate() {
		return this.metoTemplate;
	}

	public void setMetoTemplate(String metoTemplate) {
		this.metoTemplate = metoTemplate;
	}

	@Column(name = "TETY_ID")
	public Integer getTetyId() {
		return this.tetyId;
	}

	public void setTetyId(Integer tetyId) {
		this.tetyId = tetyId;
	}

}
