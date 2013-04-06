package com.hitisoft.fos.tran.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TRepairItemDao;
import com.hitisoft.fos.tran.entity.TRepairItem;

@Service
public class TRepairItemService {
	@Autowired
	private TRepairItemDao dao;

	@Transactional
	public List<TRepairItem> save(List<TRepairItem> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<TRepairItem> query() {
		return dao.findByProperties();
	}
}
