package com.hitisoft.fos.general.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GPaymentTermDao;
import com.hitisoft.fos.general.entity.GPaymentTerm;

@Service
public class GPaymentTermService {
	@Autowired
	private GPaymentTermDao dao;

	@Transactional
	public List<GPaymentTerm> save(List<GPaymentTerm> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GPaymentTerm> query() {
		return dao.findByProperties();
	}

}
