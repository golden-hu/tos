package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.wms.dao.WRateSheetDao;
import com.hitisoft.fos.wms.entity.WRateSheet;

@Service
public class WRateSheetService {
	
	@Autowired
	private WRateSheetDao dao;
	
	/**Action : WRATESHEET_S<p>
	 * 保存仓储费率关联费用类别
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WRateSheet> save(List<WRateSheet> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**Action : WRATESHEET_Q<p>
	 * 查询仓储费率关联费用类别
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WRateSheet> query() {
		return dao.findByProperties();
	}
}
