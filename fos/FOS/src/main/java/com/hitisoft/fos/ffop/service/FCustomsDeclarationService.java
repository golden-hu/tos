package com.hitisoft.fos.ffop.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.dao.FCustomsDeclarationDao;
import com.hitisoft.fos.ffop.dao.FCustomsEntryDao;
import com.hitisoft.fos.ffop.entity.FCustomsDeclaration;
import com.hitisoft.fos.ffop.entity.FCustomsEntry;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.StringUtil;

@Service
public class FCustomsDeclarationService {
	@Autowired
	private FCustomsDeclarationDao dao;
	@Autowired
	private FCustomsEntryDao entDao;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SerialFactory serialFactory;
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public List save(List entityList) {
		List retList = new ArrayList();
		Long parentId = null;
		FCustomsDeclaration cd = null;
		List<FCustomsEntry> items = new ArrayList<FCustomsEntry>();
		
		for (Object obj : entityList) {
			if (obj instanceof FCustomsDeclaration) {
				cd = (FCustomsDeclaration) obj;
				RowAction ra = cd.getRowAction();
				if (ra == RowAction.N) {
					String no = serialFactory.getSerial("cude_no");
					cd.setConsNo(no);
				}
				
				cd = dao.saveByRowActionSolo(cd);	
				retList.add(cd);
				parentId = cd.getId();
			}
			else if(obj instanceof FCustomsEntry){
				FCustomsEntry item = (FCustomsEntry) obj;
				items.add(item);
			}
		}
		
		for (FCustomsEntry entity : items) {			
				RowAction ra = entity.getRowAction();
				if (ra == RowAction.N) {
					entity.setConsId(parentId.intValue());
				}
				entity = entDao.saveByRowActionSolo(entity);
				if (ra != RowAction.R) {
					retList.add(entity);
				}
		}		
		return retList;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional(readOnly = true)
	public List query() {
		List retList = new ArrayList();
		retList.addAll(dao.findByProperties());
		if (requestContext.containsKey(Constants.PARAM_EAGER)) {
			retList.addAll(queryEntry());
		}
		return retList;
	}

	@Transactional
	public void updateStatus() {
		String id = requestContext.get("id");
		if (StringUtil.isNotBlank(id)) {
			FCustomsDeclaration entity = dao.findById(Long.valueOf(id));
			if (!requestContext.containsKey("cudeStatus")) {
				Byte cudeDocStatus = Byte.valueOf(requestContext.get("cudeDocStatus"));
				String cudeDocReceiver = requestContext.get("cudeDocReceiver");
				entity.setCudeDocStatus(cudeDocStatus);
				entity.setCudeDocReceiver(cudeDocReceiver);
				entity.setCudeDocReleaseBy(sessionContext.getUserid().intValue());
				entity.setCudeReleaseDate(new Date());
			} else {
				Byte cudeStatus = Byte.valueOf(requestContext.get("cudeStatus"));
				entity.setCudeStatus(cudeStatus);
			}
			dao.update(entity);
		}
	}

	@Transactional(readOnly = true)
	public List<FCustomsEntry> queryEntry() {
		return entDao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<FCustomsDeclaration> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}
}
