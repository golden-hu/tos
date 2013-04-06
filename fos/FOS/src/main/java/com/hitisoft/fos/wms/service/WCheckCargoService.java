package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hitisoft.fos.wms.dao.WCheckCargoDao;
import com.hitisoft.fos.wms.entity.WCheckCargo;

@Service
public class WCheckCargoService {
	@Autowired
	private WCheckCargoDao dao;
	/**Action : WCHECK_CARGO_S<p>
	 * 盘点商品保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WCheckCargo> save(List<WCheckCargo> entityList) {
		return dao.saveByRowAction(entityList);
	}
	/**Action : WCHECK_CARGO_Q<p>
	 * 盘点商品查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WCheckCargo> query() {
		return dao.findByProperties();
	}
}
