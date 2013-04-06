/**
 * 
 */
package com.hitisoft.fos.ffop.dao;

import java.util.List;

import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fos.ffop.entity.FBlExpense;
import com.hitisoft.fw.orm.util.HtQuery;
/**
 * @author Gordon
 *
 */
public interface FBlExpenseDao extends BaseDao<FBlExpense, Long> {
	
	List<FBlExpense> complexQuery(List<HtQuery> conditions);
	
}
