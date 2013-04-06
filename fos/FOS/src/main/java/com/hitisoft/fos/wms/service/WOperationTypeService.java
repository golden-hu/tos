package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.wms.dao.WOperationTypeDao;
import com.hitisoft.fos.wms.entity.WOperationType;

@Service
public class WOperationTypeService {
	@Autowired
	private WOperationTypeDao dao;
	/**
	 * 作业类型保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WOperationType> save(List<WOperationType> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**
	 * 作业类型查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WOperationType> query() {
		return dao.findByProperties();
	}
	
}
