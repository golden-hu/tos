package com.hitisoft.fos.tran.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "T_OIL_STATION")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TOilStation extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -8133703062971286217L;
	private String oilStationName;
	private Byte isPoint;
	
	public TOilStation() {
	}
	
	@Column(name = "OIL_STATION_NAME")
	public String getOilStationName() {
		return this.oilStationName;
	}

	public void setOilStationName(String oilStationName) {
		this.oilStationName = oilStationName;
	}

	@Column(name = "IS_POINT")
	public Byte getIsPoint() {
		return this.isPoint;
	}

	public void setIsPoint(Byte isPoint) {
		this.isPoint = isPoint;
	}
}
