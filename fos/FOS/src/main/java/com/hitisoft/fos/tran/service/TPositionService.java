package com.hitisoft.fos.tran.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TPositionDao;
import com.hitisoft.fos.tran.entity.TPosition;
@Service
public class TPositionService {
	@Autowired
	private TPositionDao dao; 
	@Transactional
	public List<TPosition> save(List<TPosition> itemList) {
		return dao.saveByRowAction(itemList);
	}

	@Transactional(readOnly = true)
	public List<TPosition> query() {
		return dao.findByProperties();
	}
}
