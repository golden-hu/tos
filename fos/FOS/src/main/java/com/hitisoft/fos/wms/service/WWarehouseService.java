package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.wms.dao.WWarehouseDao;
import com.hitisoft.fos.wms.entity.WWarehouse;

@Service
public class WWarehouseService {
	@Autowired
	private WWarehouseDao dao;
	
	/**Action : WAREHOUSE_S<p>
	 * 仓库保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WWarehouse> save(List<WWarehouse> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**Action : WAREHOUSE_Q<p>
	 * 仓库查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WWarehouse> query() {
		return dao.findByProperties();
	}
	
}
