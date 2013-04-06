package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.wms.dao.WCargoCategoryDao;
import com.hitisoft.fos.wms.entity.WCargoCategory;

@Service
public class WCargoCategoryService {
	@Autowired
	private WCargoCategoryDao dao;
	
	/**Action  : CATEGORY_S<p>
	 * 商品类别保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WCargoCategory> save(List<WCargoCategory> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**Action : CATEGORY_Q<p>
	 * 商品类别查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WCargoCategory> query() {
		return dao.findByProperties();
	}
	
}
