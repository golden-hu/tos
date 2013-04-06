/**
 * 
 */
package com.hitisoft.fos.ffop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.dao.FBlExpenseDao;
import com.hitisoft.fos.ffop.entity.FBlExpense;
import com.hitisoft.fw.orm.util.HtQuery;

/**
 * @author Gordon
 *
 */
@Service
public class FBlExpenseService {
	@Autowired
	private FBlExpenseDao dao;
	
	@Transactional(readOnly = true)
	public List<FBlExpense> query() {
		return dao.findByProperties();
	}
	
    @Transactional(readOnly = true)
	public List<FBlExpense> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}
}
