package com.hitisoft.fos.general.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "G_TRADE_TYPE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GTradeType extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -5268694920955693619L;
	private Byte active;
	private String trtyCode;
	private String trtyName;

	public GTradeType() {
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Column(name = "TRTY_CODE")
	public String getTrtyCode() {
		return this.trtyCode;
	}

	public void setTrtyCode(String trtyCode) {
		this.trtyCode = trtyCode;
	}

	@Column(name = "TRTY_NAME")
	public String getTrtyName() {
		return this.trtyName;
	}

	public void setTrtyName(String trtyName) {
		this.trtyName = trtyName;
	}

}
