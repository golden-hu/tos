package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GMarineTypeDao;
import com.hitisoft.fos.general.entity.GMarineType;

@Service
public class GMarineTypeService {
	@Autowired
	GMarineTypeDao dao;
	
	@Transactional
	public List<GMarineType> save(List<GMarineType> entityList){
		return dao.saveByRowAction(entityList);
	}
	
	@Transactional(readOnly = true)
	public List<GMarineType> query(){
		return dao.findByProperties();
	}
}
