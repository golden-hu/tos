package com.hitisoft.fos.ffop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.dao.FTaskDao;
import com.hitisoft.fos.ffop.entity.FTask;

@Service
public class FTaskService {
	@Autowired
	private FTaskDao dao;

	@Transactional
	public List<FTask> save(List<FTask> consignList) {
		return dao.saveByRowAction(consignList);
	}

	@Transactional(readOnly = true)
	public List<FTask> query() {
		return dao.findByProperties();
	}
}
