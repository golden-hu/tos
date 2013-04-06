package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PFunctionDao;
import com.hitisoft.fos.sys.entity.PFunction;

@Service
public class PFunctionService {
	@Autowired
	private PFunctionDao dao;

	@Transactional
	public List<PFunction> save(List<PFunction> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<PFunction> query() {
		return dao.findByProperties();
	}
}
