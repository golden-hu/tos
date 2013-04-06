package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.wms.dao.WOperationFormDao;
import com.hitisoft.fos.wms.entity.WOperationForm;

@Service
public class WOperationFormService {
	@Autowired
	private WOperationFormDao dao;
	
	/**
	 * 作业单保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WOperationForm> save(List<WOperationForm> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**
	 * 作业单查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WOperationForm> query() {
		return dao.findByProperties();
	}
	
}
