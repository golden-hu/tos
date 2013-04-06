package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.CPriceRecordDao;
import com.hitisoft.fos.sys.entity.CPriceRecord;

@Service
public class CPriceRecordService {
	@Autowired
	private CPriceRecordDao dao;

	@Transactional
	public List<CPriceRecord> save(List<CPriceRecord> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<CPriceRecord> query() {
		return dao.findByProperties();
	}
}
