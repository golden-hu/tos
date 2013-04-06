package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PMessageTopicDao;
import com.hitisoft.fos.sys.entity.PMessageTopic;

@Service
public class PMessageTopicService {

	@Autowired
	private PMessageTopicDao dao;
	@Autowired
	private PMessageService messageService;

	@Transactional
	public List<PMessageTopic> save(List<PMessageTopic> entityList) {
		List<PMessageTopic>  retList = dao.saveByRowAction(entityList);		
		messageService.clearSubscribeMap();
		return retList;
	}

	@Transactional(readOnly = true)
	public List<PMessageTopic> query() {
		return dao.findByProperties();
	}
}
