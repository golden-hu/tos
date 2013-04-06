package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.wms.dao.WStockTakingDao;
import com.hitisoft.fos.wms.entity.WStockTaking;

@Service
public class WStockTakingService {
	
	@Autowired
	private WStockTakingDao dao;
	
	/**Action : WSTOCK_TAKING_S<p>
	 * 盘点计划保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WStockTaking> save(List<WStockTaking> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**Action : WSTOCK_TAKING_S<p>
	 * 盘点计划查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WStockTaking> query() {
		return dao.findByProperties();
	}
}
