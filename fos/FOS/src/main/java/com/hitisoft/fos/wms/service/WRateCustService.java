package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.wms.dao.WRateCustDao;
import com.hitisoft.fos.wms.entity.WRateCust;

@Service
public class WRateCustService {
	
	@Autowired
	private WRateCustDao dao;
	
	/**Action : WRATECUST_S <p>
	 * 保存仓储费率关联客户
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WRateCust> save(List<WRateCust> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**Action : WRATECUST_Q<p>
	 * 查询仓储费率关取客户
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WRateCust> query() {
		return dao.findByProperties();
	}
}
