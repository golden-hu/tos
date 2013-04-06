/**
 * 
 */
package com.hitisoft.fos.ffop.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name = "F_BL_EXPENSE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
/**
 * @author Gordon
 *
 */
public class FBlExpense extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -1116475288607097136L;
	
	private Integer consId;
	private String consMblNo;
	private String consExpenseName;
	private String consExpenseNum;
	private String consExpensePrice;
	private String consExpenseTotal;
	
	public FBlExpense() {
	}

	@Column(name ="CONS_ID")
	public Integer getConsId() {
		return consId;
	}
	public void setConsId(Integer consId) {
		this.consId = consId;
	}

	@Column(name ="CONS_MBL_NO")
	public String getConsMblNo() {
		return consMblNo;
	}
	public void setConsMblNo(String consMblNo) {
		this.consMblNo = consMblNo;
	}

	@Column(name ="CONS_EXPENSE_NAME")
	public String getConsExpenseName() {
		return consExpenseName;
	}
	public void setConsExpenseName(String consExpenseName) {
		this.consExpenseName = consExpenseName;
	}

	@Column(name ="CONS_EXPENSE_NUM")
	public String getConsExpenseNum() {
		return consExpenseNum;
	}
	public void setConsExpenseNum(String consExpenseNum) {
		this.consExpenseNum = consExpenseNum;
	}

	@Column(name ="CONS_EXPENSE_PRICE")
	public String getConsExpensePrice() {
		return consExpensePrice;
	}
	public void setConsExpensePrice(String consExpensePrice) {
		this.consExpensePrice = consExpensePrice;
	}

	@Column(name ="CONS_EXPENSE_TOTAL")
	public String getConsExpenseTotal() {
		return consExpenseTotal;
	}
	public void setConsExpenseTotal(String consExpenseTotal) {
		this.consExpenseTotal = consExpenseTotal;
	}
}
