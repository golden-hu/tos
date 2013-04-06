package com.hitisoft.fos.sys.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.CCommissionDao;
import com.hitisoft.fos.sys.dao.CCommissionItemDao;
import com.hitisoft.fos.sys.entity.CCommission;
import com.hitisoft.fos.sys.entity.CCommissionItem;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.util.NumberUtil;

@Service
public class CCommissionService {
	@Autowired
	private CCommissionDao dao;
	@Autowired
	private CCommissionItemDao itemDao;

	@Transactional(readOnly = true)
	public List<CCommission> query() {
		return dao.findByProperties();
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional
	public List save(List entityList) {
		List retList = new ArrayList();
		Map<Long, Long> idMap = new HashMap<Long, Long>();
		for (Object obj : entityList) {
			if (obj instanceof CCommission) {
				CCommission entity = (CCommission) obj;
				Long oldId = entity.getId();
				RowAction ra = entity.getRowAction();
				entity = dao.saveByRowActionSolo(entity);
				if (ra != RowAction.R) {
					retList.add(entity);
				}
				idMap.put(oldId, entity.getId());
			}
		}
		for (Object obj : entityList) {
			if (obj instanceof CCommissionItem) {
				CCommissionItem entity = (CCommissionItem) obj;
				RowAction ra = entity.getRowAction();
				if (ra == RowAction.N) {
					entity.setCommId(NumberUtil.frontId2DbId(idMap, entity.getCommId().longValue()).intValue());
				}
				entity = itemDao.saveByRowActionSolo(entity);
				if (ra != RowAction.R) {
					retList.add(entity);
				}
			}
		}
		return retList;
	}
}
