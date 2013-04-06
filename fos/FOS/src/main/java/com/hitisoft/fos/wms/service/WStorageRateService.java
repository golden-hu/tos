package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.wms.dao.WStorageRateDao;
import com.hitisoft.fos.wms.entity.WStorageRate;

@Service
public class WStorageRateService {
	@Autowired
	private WStorageRateDao dao;
	
	/**Action : WSTORAGE_RATE_S<p>
	 * 计费条目保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WStorageRate> save(List<WStorageRate> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**Action : WSTORAGE_RATE_Q<p>
	 * 计费条目查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WStorageRate> query() {
		return dao.findByProperties();
	}
	
}
