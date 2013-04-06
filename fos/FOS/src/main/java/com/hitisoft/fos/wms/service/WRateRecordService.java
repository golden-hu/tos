package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.wms.dao.WRateRecordDao;
import com.hitisoft.fos.wms.entity.WRateRecord;

@Service
public class WRateRecordService {
	
	@Autowired
	private WRateRecordDao dao;
	
	/**Action ：WRATERECORD_S<p>
	 * 保存仓储费率区间维护
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WRateRecord> save(List<WRateRecord> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**Action ：WRATERECORD_Q<p>
	 * 查询仓储费率区间维护
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WRateRecord> query() {
		return dao.findByProperties();
	}
}
