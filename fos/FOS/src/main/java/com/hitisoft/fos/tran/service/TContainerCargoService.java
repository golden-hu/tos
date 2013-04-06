package com.hitisoft.fos.tran.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TContainerCargoDao;
import com.hitisoft.fos.tran.entity.TContainerCargo;



@Service
public class TContainerCargoService {
	@Autowired
	private TContainerCargoDao dao;
	
	@Transactional
	public List<TContainerCargo> save(List<TContainerCargo> entityList){
		return dao.saveByRowAction(entityList);
	}
	
	@Transactional(readOnly=true)
	public List<TContainerCargo> query(){
		return dao.findByProperties();
	}
}