package com.hitisoft.fos.ffop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.dao.FInspectionDao;
import com.hitisoft.fos.ffop.entity.FInspection;
import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;

@Service
public class FInspectionService {
	@Autowired
	private FInspectionDao dao;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SerialFactory serialFactory;
	
	@Transactional
	public List<FInspection> save(List<FInspection> entityList) {
		for (FInspection entity : entityList) {
				RowAction ra = entity.getRowAction();
				if (ra == RowAction.N) {
					String no = serialFactory.getSerial("insp_no");
					entity.setConsNo(no);
				}
		}
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<FInspection> query() {
		return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<FInspection> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}
	
	@Transactional
	public void updateStatus() {
		Long id = Long.valueOf(requestContext.get("id"));
		Byte status = Byte.valueOf(requestContext.get("inspStatus"));
		FInspection entity = dao.findById(id);
		if (entity != null) {
			entity.setInspStatus(status);
			dao.update(entity);
		}
	}
}
