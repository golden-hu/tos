package com.hitisoft.fos.tran.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TTaskConsignDao;
import com.hitisoft.fos.tran.entity.TTaskConsign;


@Service
public class TTaskConsignService {
	@Autowired
	private TTaskConsignDao dao;

	@Transactional
	public List<TTaskConsign> save(List<TTaskConsign> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<TTaskConsign> query() {
		return dao.findByProperties();
	}
}
