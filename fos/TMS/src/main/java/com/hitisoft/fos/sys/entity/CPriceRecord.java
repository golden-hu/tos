package com.hitisoft.fos.sys.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "C_PRICE_RECORD")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CPriceRecord extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -7557378221324282433L;
	private Integer charId;
	private String charName;
	private String currCode;
	private Integer prliId;
	private BigDecimal prreCommissionRate;
	private BigDecimal prrePriceB20;
	private BigDecimal prrePriceB40;
	private BigDecimal prrePriceB40h;
	private BigDecimal prrePriceBB1;
	private BigDecimal prrePriceBB2;
	private BigDecimal prrePriceBB3;
	private BigDecimal prrePriceBB4;
	private BigDecimal prrePriceBB5;
	private BigDecimal prrePriceBCbm;
	private BigDecimal prrePriceBKgs;
	private BigDecimal prrePriceBTon;
	private BigDecimal prrePriceP20;
	private BigDecimal prrePriceP40;
	private BigDecimal prrePriceP40h;
	private BigDecimal prrePricePB1;
	private BigDecimal prrePricePB2;
	private BigDecimal prrePricePB3;
	private BigDecimal prrePricePB4;
	private BigDecimal prrePricePB5;
	private BigDecimal prrePricePCbm;
	private BigDecimal prrePricePKgs;
	private BigDecimal prrePricePTon;
	private BigDecimal prrePriceS20;
	private BigDecimal prrePriceS40;
	private BigDecimal prrePriceS40h;
	private BigDecimal prrePriceSB1;
	private BigDecimal prrePriceSB2;
	private BigDecimal prrePriceSB3;
	private BigDecimal prrePriceSB4;
	private BigDecimal prrePriceSB5;
	private BigDecimal prrePriceSCbm;
	private BigDecimal prrePriceSKgs;
	private BigDecimal prrePriceSTon;
	private Integer prshId;

	private String prshVendorName;
	private String prshCarrierName;
	private String prshBizType;
	private String prshContractNo;
	private String prshPolEn;
	private String shliName;
	private String vessName;
	private String voyaName;
	private Date prshStartDate;
	private Date prshEndDate;
	private String prshRemarks;
	private Byte prshStatus;

	private String prliCountryDName;
	private String prliPodEn;
	private String prliCountryTName;
	private String prliPotEn;
	private String caclName;
	private String pateName;
	private String tranName;
	private String prliShipDate;
	private Byte prliCompositeFlag;
	private Integer prliDuration;
	private String prliRemarks;

	public CPriceRecord() {
	}

	@Column(name = "CHAR_ID")
	public Integer getCharId() {
		return this.charId;
	}

	public void setCharId(Integer charId) {
		this.charId = charId;
	}

	@Column(name = "CHAR_NAME")
	public String getCharName() {
		return this.charName;
	}

	public void setCharName(String charName) {
		this.charName = charName;
	}

	@Column(name = "CURR_CODE")
	public String getCurrCode() {
		return this.currCode;
	}

	public void setCurrCode(String currCode) {
		this.currCode = currCode;
	}

	@Column(name = "PRLI_ID")
	public Integer getPrliId() {
		return this.prliId;
	}

	public void setPrliId(Integer prliId) {
		this.prliId = prliId;
	}

	@Column(name = "PRRE_COMMISSION_RATE")
	public BigDecimal getPrreCommissionRate() {
		return this.prreCommissionRate;
	}

	public void setPrreCommissionRate(BigDecimal prreCommissionRate) {
		this.prreCommissionRate = prreCommissionRate;
	}

	@Column(name = "PRRE_PRICE_B_20")
	public BigDecimal getPrrePriceB20() {
		return this.prrePriceB20;
	}

	public void setPrrePriceB20(BigDecimal prrePriceB20) {
		this.prrePriceB20 = prrePriceB20;
	}

	@Column(name = "PRRE_PRICE_B_40")
	public BigDecimal getPrrePriceB40() {
		return this.prrePriceB40;
	}

	public void setPrrePriceB40(BigDecimal prrePriceB40) {
		this.prrePriceB40 = prrePriceB40;
	}

	@Column(name = "PRRE_PRICE_B_40H")
	public BigDecimal getPrrePriceB40h() {
		return this.prrePriceB40h;
	}

	public void setPrrePriceB40h(BigDecimal prrePriceB40h) {
		this.prrePriceB40h = prrePriceB40h;
	}

	@Column(name = "PRRE_PRICE_B_B1")
	public BigDecimal getPrrePriceBB1() {
		return this.prrePriceBB1;
	}

	public void setPrrePriceBB1(BigDecimal prrePriceBB1) {
		this.prrePriceBB1 = prrePriceBB1;
	}

	@Column(name = "PRRE_PRICE_B_B2")
	public BigDecimal getPrrePriceBB2() {
		return this.prrePriceBB2;
	}

	public void setPrrePriceBB2(BigDecimal prrePriceBB2) {
		this.prrePriceBB2 = prrePriceBB2;
	}

	@Column(name = "PRRE_PRICE_B_B3")
	public BigDecimal getPrrePriceBB3() {
		return this.prrePriceBB3;
	}

	public void setPrrePriceBB3(BigDecimal prrePriceBB3) {
		this.prrePriceBB3 = prrePriceBB3;
	}

	@Column(name = "PRRE_PRICE_B_B4")
	public BigDecimal getPrrePriceBB4() {
		return this.prrePriceBB4;
	}

	public void setPrrePriceBB4(BigDecimal prrePriceBB4) {
		this.prrePriceBB4 = prrePriceBB4;
	}

	@Column(name = "PRRE_PRICE_B_B5")
	public BigDecimal getPrrePriceBB5() {
		return this.prrePriceBB5;
	}

	public void setPrrePriceBB5(BigDecimal prrePriceBB5) {
		this.prrePriceBB5 = prrePriceBB5;
	}

	@Column(name = "PRRE_PRICE_B_CBM")
	public BigDecimal getPrrePriceBCbm() {
		return this.prrePriceBCbm;
	}

	public void setPrrePriceBCbm(BigDecimal prrePriceBCbm) {
		this.prrePriceBCbm = prrePriceBCbm;
	}

	@Column(name = "PRRE_PRICE_B_KGS")
	public BigDecimal getPrrePriceBKgs() {
		return this.prrePriceBKgs;
	}

	public void setPrrePriceBKgs(BigDecimal prrePriceBKgs) {
		this.prrePriceBKgs = prrePriceBKgs;
	}

	@Column(name = "PRRE_PRICE_B_TON")
	public BigDecimal getPrrePriceBTon() {
		return this.prrePriceBTon;
	}

	public void setPrrePriceBTon(BigDecimal prrePriceBTon) {
		this.prrePriceBTon = prrePriceBTon;
	}

	@Column(name = "PRRE_PRICE_P_20")
	public BigDecimal getPrrePriceP20() {
		return this.prrePriceP20;
	}

	public void setPrrePriceP20(BigDecimal prrePriceP20) {
		this.prrePriceP20 = prrePriceP20;
	}

	@Column(name = "PRRE_PRICE_P_40")
	public BigDecimal getPrrePriceP40() {
		return this.prrePriceP40;
	}

	public void setPrrePriceP40(BigDecimal prrePriceP40) {
		this.prrePriceP40 = prrePriceP40;
	}

	@Column(name = "PRRE_PRICE_P_40H")
	public BigDecimal getPrrePriceP40h() {
		return this.prrePriceP40h;
	}

	public void setPrrePriceP40h(BigDecimal prrePriceP40h) {
		this.prrePriceP40h = prrePriceP40h;
	}

	@Column(name = "PRRE_PRICE_P_B1")
	public BigDecimal getPrrePricePB1() {
		return this.prrePricePB1;
	}

	public void setPrrePricePB1(BigDecimal prrePricePB1) {
		this.prrePricePB1 = prrePricePB1;
	}

	@Column(name = "PRRE_PRICE_P_B2")
	public BigDecimal getPrrePricePB2() {
		return this.prrePricePB2;
	}

	public void setPrrePricePB2(BigDecimal prrePricePB2) {
		this.prrePricePB2 = prrePricePB2;
	}

	@Column(name = "PRRE_PRICE_P_B3")
	public BigDecimal getPrrePricePB3() {
		return this.prrePricePB3;
	}

	public void setPrrePricePB3(BigDecimal prrePricePB3) {
		this.prrePricePB3 = prrePricePB3;
	}

	@Column(name = "PRRE_PRICE_P_B4")
	public BigDecimal getPrrePricePB4() {
		return this.prrePricePB4;
	}

	public void setPrrePricePB4(BigDecimal prrePricePB4) {
		this.prrePricePB4 = prrePricePB4;
	}

	@Column(name = "PRRE_PRICE_P_B5")
	public BigDecimal getPrrePricePB5() {
		return this.prrePricePB5;
	}

	public void setPrrePricePB5(BigDecimal prrePricePB5) {
		this.prrePricePB5 = prrePricePB5;
	}

	@Column(name = "PRRE_PRICE_P_CBM")
	public BigDecimal getPrrePricePCbm() {
		return this.prrePricePCbm;
	}

	public void setPrrePricePCbm(BigDecimal prrePricePCbm) {
		this.prrePricePCbm = prrePricePCbm;
	}

	@Column(name = "PRRE_PRICE_P_KGS")
	public BigDecimal getPrrePricePKgs() {
		return this.prrePricePKgs;
	}

	public void setPrrePricePKgs(BigDecimal prrePricePKgs) {
		this.prrePricePKgs = prrePricePKgs;
	}

	@Column(name = "PRRE_PRICE_P_TON")
	public BigDecimal getPrrePricePTon() {
		return this.prrePricePTon;
	}

	public void setPrrePricePTon(BigDecimal prrePricePTon) {
		this.prrePricePTon = prrePricePTon;
	}

	@Column(name = "PRRE_PRICE_S_20")
	public BigDecimal getPrrePriceS20() {
		return this.prrePriceS20;
	}

	public void setPrrePriceS20(BigDecimal prrePriceS20) {
		this.prrePriceS20 = prrePriceS20;
	}

	@Column(name = "PRRE_PRICE_S_40")
	public BigDecimal getPrrePriceS40() {
		return this.prrePriceS40;
	}

	public void setPrrePriceS40(BigDecimal prrePriceS40) {
		this.prrePriceS40 = prrePriceS40;
	}

	@Column(name = "PRRE_PRICE_S_40H")
	public BigDecimal getPrrePriceS40h() {
		return this.prrePriceS40h;
	}

	public void setPrrePriceS40h(BigDecimal prrePriceS40h) {
		this.prrePriceS40h = prrePriceS40h;
	}

	@Column(name = "PRRE_PRICE_S_B1")
	public BigDecimal getPrrePriceSB1() {
		return this.prrePriceSB1;
	}

	public void setPrrePriceSB1(BigDecimal prrePriceSB1) {
		this.prrePriceSB1 = prrePriceSB1;
	}

	@Column(name = "PRRE_PRICE_S_B2")
	public BigDecimal getPrrePriceSB2() {
		return this.prrePriceSB2;
	}

	public void setPrrePriceSB2(BigDecimal prrePriceSB2) {
		this.prrePriceSB2 = prrePriceSB2;
	}

	@Column(name = "PRRE_PRICE_S_B3")
	public BigDecimal getPrrePriceSB3() {
		return this.prrePriceSB3;
	}

	public void setPrrePriceSB3(BigDecimal prrePriceSB3) {
		this.prrePriceSB3 = prrePriceSB3;
	}

	@Column(name = "PRRE_PRICE_S_B4")
	public BigDecimal getPrrePriceSB4() {
		return this.prrePriceSB4;
	}

	public void setPrrePriceSB4(BigDecimal prrePriceSB4) {
		this.prrePriceSB4 = prrePriceSB4;
	}

	@Column(name = "PRRE_PRICE_S_B5")
	public BigDecimal getPrrePriceSB5() {
		return this.prrePriceSB5;
	}

	public void setPrrePriceSB5(BigDecimal prrePriceSB5) {
		this.prrePriceSB5 = prrePriceSB5;
	}

	@Column(name = "PRRE_PRICE_S_CBM")
	public BigDecimal getPrrePriceSCbm() {
		return this.prrePriceSCbm;
	}

	public void setPrrePriceSCbm(BigDecimal prrePriceSCbm) {
		this.prrePriceSCbm = prrePriceSCbm;
	}

	@Column(name = "PRRE_PRICE_S_KGS")
	public BigDecimal getPrrePriceSKgs() {
		return this.prrePriceSKgs;
	}

	public void setPrrePriceSKgs(BigDecimal prrePriceSKgs) {
		this.prrePriceSKgs = prrePriceSKgs;
	}

	@Column(name = "PRRE_PRICE_S_TON")
	public BigDecimal getPrrePriceSTon() {
		return this.prrePriceSTon;
	}

	public void setPrrePriceSTon(BigDecimal prrePriceSTon) {
		this.prrePriceSTon = prrePriceSTon;
	}

	@Column(name = "PRSH_ID")
	public Integer getPrshId() {
		return this.prshId;
	}

	public void setPrshId(Integer prshId) {
		this.prshId = prshId;
	}

	@Transient
	public String getPrshVendorName() {
		return prshVendorName;
	}

	public void setPrshVendorName(String prshVendorName) {
		this.prshVendorName = prshVendorName;
	}

	@Transient
	public String getPrshCarrierName() {
		return prshCarrierName;
	}

	public void setPrshCarrierName(String prshCarrierName) {
		this.prshCarrierName = prshCarrierName;
	}

	@Transient
	public String getPrshBizType() {
		return prshBizType;
	}

	public void setPrshBizType(String prshBizType) {
		this.prshBizType = prshBizType;
	}

	@Transient
	public String getPrshContractNo() {
		return prshContractNo;
	}

	public void setPrshContractNo(String prshContractNo) {
		this.prshContractNo = prshContractNo;
	}

	@Transient
	public String getPrshPolEn() {
		return prshPolEn;
	}

	public void setPrshPolEn(String prshPolEn) {
		this.prshPolEn = prshPolEn;
	}

	@Transient
	public String getShliName() {
		return shliName;
	}

	public void setShliName(String shliName) {
		this.shliName = shliName;
	}

	@Transient
	public String getVessName() {
		return vessName;
	}

	public void setVessName(String vessName) {
		this.vessName = vessName;
	}

	@Transient
	public String getVoyaName() {
		return voyaName;
	}

	public void setVoyaName(String voyaName) {
		this.voyaName = voyaName;
	}

	@Transient
	public Date getPrshStartDate() {
		return prshStartDate;
	}

	public void setPrshStartDate(Date prshStartDate) {
		this.prshStartDate = prshStartDate;
	}

	@Transient
	public Date getPrshEndDate() {
		return prshEndDate;
	}

	public void setPrshEndDate(Date prshEndDate) {
		this.prshEndDate = prshEndDate;
	}

	@Transient
	public String getPrshRemarks() {
		return prshRemarks;
	}

	public void setPrshRemarks(String prshRemarks) {
		this.prshRemarks = prshRemarks;
	}

	@Transient
	public Byte getPrshStatus() {
		return prshStatus;
	}

	public void setPrshStatus(Byte prshStatus) {
		this.prshStatus = prshStatus;
	}

	@Transient
	public String getPrliCountryDName() {
		return prliCountryDName;
	}

	public void setPrliCountryDName(String prliCountryDName) {
		this.prliCountryDName = prliCountryDName;
	}

	@Transient
	public String getPrliPodEn() {
		return prliPodEn;
	}

	public void setPrliPodEn(String prliPodEn) {
		this.prliPodEn = prliPodEn;
	}

	@Transient
	public String getPrliCountryTName() {
		return prliCountryTName;
	}

	public void setPrliCountryTName(String prliCountryTName) {
		this.prliCountryTName = prliCountryTName;
	}

	@Transient
	public String getPrliPotEn() {
		return prliPotEn;
	}

	public void setPrliPotEn(String prliPotEn) {
		this.prliPotEn = prliPotEn;
	}

	@Transient
	public String getCaclName() {
		return caclName;
	}

	public void setCaclName(String caclName) {
		this.caclName = caclName;
	}

	@Transient
	public String getPateName() {
		return pateName;
	}

	public void setPateName(String pateName) {
		this.pateName = pateName;
	}

	@Transient
	public String getTranName() {
		return tranName;
	}

	public void setTranName(String tranName) {
		this.tranName = tranName;
	}

	@Transient
	public String getPrliShipDate() {
		return prliShipDate;
	}

	public void setPrliShipDate(String prliShipDate) {
		this.prliShipDate = prliShipDate;
	}

	@Transient
	public Byte getPrliCompositeFlag() {
		return prliCompositeFlag;
	}

	public void setPrliCompositeFlag(Byte prliCompositeFlag) {
		this.prliCompositeFlag = prliCompositeFlag;
	}

	@Transient
	public Integer getPrliDuration() {
		return prliDuration;
	}

	public void setPrliDuration(Integer prliDuration) {
		this.prliDuration = prliDuration;
	}

	@Transient
	public String getPrliRemarks() {
		return prliRemarks;
	}

	public void setPrliRemarks(String prliRemarks) {
		this.prliRemarks = prliRemarks;
	}

}
