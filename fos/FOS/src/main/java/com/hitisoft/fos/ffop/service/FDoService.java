package com.hitisoft.fos.ffop.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.dao.FDoDao;
import com.hitisoft.fos.ffop.entity.FDo;
import com.hitisoft.fw.session.RequestContext;

@Service
public class FDoService {
	@Autowired
	private FDoDao dao;
	@Autowired
	private RequestContext requestContext;

	@Transactional
	public List<FDo> save(List<FDo> consignList) {
		return dao.saveByRowAction(consignList);
	}

	@Transactional(readOnly = true)
	public List<FDo> query() {
		return dao.findByProperties();
	}

	@Transactional
	public void updateStatus(Map<String, Object> queryMap) {
		Long id = Long.valueOf(requestContext.get("doId"));
		Byte status = Byte.valueOf(requestContext.get("doStatus"));
		FDo entity = dao.findById(id);
		entity.setDoStatus(status);
		dao.update(entity);
	}
}
