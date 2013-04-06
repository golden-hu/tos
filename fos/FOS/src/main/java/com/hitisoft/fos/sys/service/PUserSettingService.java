package com.hitisoft.fos.sys.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PUserSettingDao;
import com.hitisoft.fos.sys.entity.PUserSetting;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;

@Service
public class PUserSettingService {
	@Autowired
	private PUserSettingDao dao;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;

	@Transactional
	public List<PUserSetting> save(List<PUserSetting> entityList) {
		List<PUserSetting> retList = new ArrayList<PUserSetting>();
		for (PUserSetting entity : entityList) {
			requestContext.put("userId", "" + sessionContext.getUserid());
			requestContext.put("usseName", entity.getUsseName());
			List<PUserSetting> list = dao.findByProperties();
			if (list.size() == 1) {
				PUserSetting dbItem = list.get(0);
				dbItem.setUsseValue(entity.getUsseValue());
				dbItem.setRowAction(RowAction.M);
				retList.add(dao.update(dbItem));
			} else {
				entity.setId(null);
				entity.setUserId(sessionContext.getUserid().intValue());
				entity.setRowAction(RowAction.N);
				dao.add(entity);
				retList.add(entity);
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<PUserSetting> query() {
		requestContext.put("userId", "" + sessionContext.getUserid());
		return dao.findByProperties();
	}
}
