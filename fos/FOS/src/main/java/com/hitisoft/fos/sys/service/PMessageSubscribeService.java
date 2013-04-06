package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PMessageSubscribeDao;
import com.hitisoft.fos.sys.entity.PMessageSubscribe;

@Service
public class PMessageSubscribeService {
	@Autowired
	private PMessageSubscribeDao dao;
	@Autowired
	private PMessageService messageService;

	@Transactional
	public List<PMessageSubscribe> save(List<PMessageSubscribe> entityList) {
		messageService.clearSubscribeMap();
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<PMessageSubscribe> query() {
		return dao.findByProperties();
	}

}
