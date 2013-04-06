package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.CPriceLineDao;
import com.hitisoft.fos.sys.entity.CPriceLine;

@Service
public class CPriceLineService {
	@Autowired
	private CPriceLineDao dao;

	@Transactional
	public List<CPriceLine> save(List<CPriceLine> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<CPriceLine> query() {
		return dao.findByProperties();
	}
}
