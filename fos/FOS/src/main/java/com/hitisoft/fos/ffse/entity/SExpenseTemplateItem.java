package com.hitisoft.fos.ffse.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "S_EXPENSE_TEMPLATE_ITEM")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SExpenseTemplateItem extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 3963354582704087863L;
	
	private Long charId;
	private String charName;
	private String charNameEn;	
	private Long chclId;
	private String chclCode;
	private Long exteId;	
	private String currCode;	
	private String expeType;	
	private BigDecimal expeUnitPrice;
	
	private Byte settlementObjectType;
	private Byte chargeType;
	
	public SExpenseTemplateItem() {
	}

	@Column(name = "CHAR_ID")
	public Long getCharId() {
		return this.charId;
	}

	public void setCharId(Long charId) {
		this.charId = charId;
	}

	@Column(name = "CHAR_NAME")
	public String getCharName() {
		return this.charName;
	}

	public void setCharName(String charName) {
		this.charName = charName;
	}

	@Column(name = "CHAR_NAME_EN")
	public String getCharNameEn() {
		return this.charNameEn;
	}

	public void setCharNameEn(String charNameEn) {
		this.charNameEn = charNameEn;
	}

	@Column(name = "CHCL_ID")
	public Long getChclId() {
		return this.chclId;
	}

	public void setChclId(Long chclId) {
		this.chclId = chclId;
	}

	@Column(name = "CHCL_CODE")
	public String getChclCode() {
		return this.chclCode;
	}

	public void setChclCode(String chclCode) {
		this.chclCode = chclCode;
	}
	
	
	@Column(name = "EXTE_ID")
	public Long getExteId() {
		return this.exteId;
	}

	public void setExteId(Long exteId) {
		this.exteId = exteId;
	}

	
	@Column(name = "CURR_CODE")
	public String getCurrCode() {
		return this.currCode;
	}

	public void setCurrCode(String currCode) {
		this.currCode = currCode;
	}

	@Column(name = "EXPE_TYPE")
	public String getExpeType() {
		return this.expeType;
	}

	public void setExpeType(String expeType) {
		this.expeType = expeType;
	}

	@Column(name = "EXPE_UNIT_PRICE")
	public BigDecimal getExpeUnitPrice() {
		return this.expeUnitPrice;
	}

	public void setExpeUnitPrice(BigDecimal expeUnitPrice) {
		this.expeUnitPrice = expeUnitPrice;
	}

	@Column(name = "SETTLEMENT_OBJECT_TYPE")
	public Byte getSettlementObjectType() {
		return this.settlementObjectType;
	}

	public void setSettlementObjectType(Byte settlementObjectType) {
		this.settlementObjectType = settlementObjectType;
	}
	
	@Column(name = "CHARGE_TYPE")
	public Byte getChargeType() {
		return this.chargeType;
	}

	public void setChargeType(Byte chargeType) {
		this.chargeType = chargeType;
	}
}
