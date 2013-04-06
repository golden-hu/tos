package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hitisoft.fos.wms.dao.WSmartExpenseDao;
import com.hitisoft.fos.wms.entity.WSmartExpense;

@Service
public class WSmartExpenseService {
	@Autowired
	private WSmartExpenseDao dao;
	
	/**Action : 
	 * 智能计费保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WSmartExpense> save(List<WSmartExpense> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**Action : 
	 * 智能查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WSmartExpense> query() {
		return dao.findByProperties();
	}
	
}
