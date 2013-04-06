package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PUserRoleDao;
import com.hitisoft.fos.sys.entity.PUserRole;

@Service
public class PUserRoleService {
	@Autowired
	private PUserRoleDao dao;

	@Transactional
	public List<PUserRole> save(List<PUserRole> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<PUserRole> query() {
		return dao.findByProperties();
	}
}
