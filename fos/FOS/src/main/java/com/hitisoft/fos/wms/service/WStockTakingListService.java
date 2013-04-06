package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.wms.dao.WStockTakingListDao;
import com.hitisoft.fos.wms.entity.WStockTakingList;

@Service
public class WStockTakingListService {
	
	@Autowired
	private WStockTakingListDao dao;
	/**Action : WSTOCK_TAKING_LIST_S<p>
	 * 盘点计划从表保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WStockTakingList> save(List<WStockTakingList> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**Action : WSTOCK_TAKING_LIST_Q<p>
	 * 盘点计划从表查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WStockTakingList> query() {
		return dao.findByProperties();
	}
}
