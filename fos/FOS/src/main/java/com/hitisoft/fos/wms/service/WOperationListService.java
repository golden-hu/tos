package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.wms.dao.WOperationListDao;
import com.hitisoft.fos.wms.entity.WOperationList;

@Service
public class WOperationListService {
	@Autowired
	private WOperationListDao dao;
	/**
	 * 作业明细保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WOperationList> save(List<WOperationList> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**
	 * 作业明细查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WOperationList> query() {
		return dao.findByProperties();
	}
	
}
