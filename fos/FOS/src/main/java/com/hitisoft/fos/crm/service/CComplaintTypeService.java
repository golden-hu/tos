package com.hitisoft.fos.crm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.crm.dao.CComplaintTypeDao;
import com.hitisoft.fos.crm.entity.CComplaintType;

@Service
public class CComplaintTypeService {
	@Autowired
	private CComplaintTypeDao dao;
	
	@Transactional
	public List<CComplaintType> save(List<CComplaintType> entityList) {
		return dao.saveByRowAction(entityList);
	}
	
	@Transactional (readOnly = true)
	public List<CComplaintType> query(List<CComplaintType> entytiList) {
		return dao.findByProperties();
	}
}
