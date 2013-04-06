package com.hitisoft.fos.stat.entity;

import java.io.Serializable;

import javax.persistence.Entity;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
public class BusinessSummaryItem extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -1116475288607097136L;
	private String consBizType;
	private String consBizTypeName;
	private Integer consSalesRepId;
	private String consSalesRepName;
	private String expeType;
	private Integer mm;
	private Integer dd;
	private Long consNum;
	private Double totalAR; //应收合计
	private Double totalAP; //应付合计
	private Double grossProfitA; //预计利润
	private Double grossProfitRate; //预计利润率
	private Double totalR; //已收合计
	private Double totalP; //已付合计
	private Double grossProfit; //实现利润
	
	public BusinessSummaryItem() {
	}

	public String getConsBizType() {
		return consBizType;
	}

	public void setConsBizType(String consBizType) {
		this.consBizType = consBizType;
	}

	public String getConsBizTypeName() {
		return consBizTypeName;
	}

	public void setConsBizTypeName(String consBizTypeName) {
		this.consBizTypeName = consBizTypeName;
	}
	
	public Integer getConsSalesRepId() {
		return consSalesRepId;
	}

	public void setConsSalesRepId(Integer consSalesRepId) {
		this.consSalesRepId = consSalesRepId;
	}
	
	public String getConsSalesRepName() {
		return consSalesRepName;
	}

	public void setConsSalesRepName(String consSalesRepName) {
		this.consSalesRepName = consSalesRepName;
	}
	
	public String getExpeType() {
		return expeType;
	}

	public void setExpeType(String expeType) {
		this.expeType = expeType;
	}
	
	public Integer getMm() {
		return mm;
	}

	public void setMm(Integer mm) {
		this.mm = mm;
	}
	
	public Integer getDd() {
		return dd;
	}

	public void setDd(Integer dd) {
		this.dd = dd;
	}
	
	public Long getConsNum() {
		return consNum;
	}

	public void setConsNum(Long consNum) {
		this.consNum = consNum;
	}

	public Double getTotalAR() {
		return totalAR;
	}

	public void setTotalAR(Double totalAR) {
		this.totalAR = totalAR;
	}

	public Double getTotalAP() {
		return totalAP;
	}

	public void setTotalAP(Double totalAP) {
		this.totalAP = totalAP;
	}

	public Double getGrossProfitA() {
		return grossProfitA;
	}

	public void setGrossProfitA(Double grossProfitA) {
		this.grossProfitA = grossProfitA;
	}

	public Double getGrossProfitRate() {
		return grossProfitRate;
	}

	public void setGrossProfitRate(Double grossProfitRate) {
		this.grossProfitRate = grossProfitRate;
	}

	public Double getTotalR() {
		return totalR;
	}

	public void setTotalR(Double totalR) {
		this.totalR = totalR;
	}

	public Double getTotalP() {
		return totalP;
	}

	public void setTotalP(Double totalP) {
		this.totalP = totalP;
	}

	public Double getGrossProfit() {
		return grossProfit;
	}

	public void setGrossProfit(Double grossProfit) {
		this.grossProfit = grossProfit;
	}
	
	
	
}
