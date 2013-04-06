package com.hitisoft.fos.tran.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TCargoDao;
import com.hitisoft.fos.tran.entity.TCargo;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fw.orm.util.RowAction;

@Service
public class TCargoService {
	@Autowired
	private TCargoDao dao;

	@Transactional
	public List<TCargo> save(List<TCargo> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<TCargo> query() {
		return dao.findByProperties();
	}

}
