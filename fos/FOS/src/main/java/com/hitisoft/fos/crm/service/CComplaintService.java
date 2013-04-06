package com.hitisoft.fos.crm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.crm.dao.CComplaintDao;
import com.hitisoft.fos.crm.entity.CComplaint;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.RequestContext;

@Service
public class CComplaintService {
	@Autowired
	private CComplaintDao dao;

	@Autowired
	private RequestContext requestContext;
	@Transactional
	
	public List<CComplaint> save(List<CComplaint> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<CComplaint> query() {
		return dao.findByProperties();
	}
	
	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	public List<CComplaint> complexQuery(List<HtQuery> conditions) {
		return dao.complexQuery(conditions);
	}
	
	@Transactional
	public void updateStatus() {
		Long id = Long.valueOf(requestContext.get("id"));
		Integer status = Integer.valueOf(requestContext.get("status"));
		CComplaint entity = dao.findById(id);
		if (entity != null) {
			entity.setStatus(status);
			dao.update(entity);
		}
	}
}
