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
@Table(name = "G_SITE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GSite extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private String siteName;
	private String siteTel;
	private String siteFax;
	private String siteAddress;
	private String siteContact;
	private Byte siteType;
	private Long provinceId;
	private String provinceName;
	private Long cityId;
	private String cityName;
	
	public GSite(){}

	@Column(name = "SITE_NAME")
	public String getSiteName() {
		return this.siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}
	
	@Column(name = "SITE_TEL")
	public String getSiteTel() {
		return this.siteTel;
	}

	public void setSiteTel(String siteTel) {
		this.siteTel = siteTel;
	}
	
	@Column(name = "SITE_FAX")
	public String getSiteFax() {
		return this.siteFax;
	}

	public void setSiteFax(String siteFax) {
		this.siteFax = siteFax;
	}
	
	@Column(name = "SITE_ADDRESS")
	public String getSiteAddress() {
		return this.siteAddress;
	}

	public void setSiteAddress(String siteAddress) {
		this.siteAddress = siteAddress;
	}
	
	@Column(name = "SITE_CONTACT")
	public String getSiteContact() {
		return this.siteContact;
	}

	public void setSiteContact(String siteContact) {
		this.siteContact = siteContact;
	}
	
	@Column(name = "SITE_TYPE")
	public Byte getSiteType() {
		return this.siteType;
	}

	public void setSiteType(Byte siteType) {
		this.siteType = siteType;
	}
	
	@Column(name = "PROVINCE_ID")
	public Long getProvinceId() {
		return this.provinceId;
	}

	public void setProvinceId(Long provinceId) {
		this.provinceId = provinceId;
	}
	
	@Column(name = "PROVINCE_NAME")
	public String getProvinceName() {
		return this.provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}
	
	@Column(name = "CITY_ID")
	public Long getCityId() {
		return this.cityId;
	}

	public void setCityId(Long cityId) {
		this.cityId = cityId;
	}
	
	@Column(name = "CITY_NAME")
	public String getCityName() {
		return this.cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
}
