package com.hitisoft.fos.sys.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PEventDao;
import com.hitisoft.fos.sys.entity.PEvent;
import com.hitisoft.fos.tran.dao.TCargoDao;
import com.hitisoft.fos.tran.entity.TCargo;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;

@Service
public class PEventService {

	@Autowired
	private TCargoDao cargoDao;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private PEventDao dao;

	@Transactional
	public List<PEvent> save(List<PEvent> entityList) {
		List<PEvent> resList = new ArrayList<PEvent>();

		for (PEvent peItem : entityList) {
			RowAction ra=peItem.getRowAction();
			peItem=dao.saveByRowActionSolo(peItem);
			resList.add(peItem);
			
			if(ra==RowAction.N){
				List<TCargo> tcList=cargoDao.findByProperty("transTaskId", ""+peItem.getTransId());
				for (TCargo tc : tcList) {
					PEvent pe = new PEvent();
					pe.setUuid(ConstUtil.getUUID());
					pe.setRowAction(RowAction.N);
					pe.setVersion(0);
					pe.setCompCode(peItem.getCompCode());
					pe.setCreateBy(peItem.getModifyBy());
					pe.setCreateTime(peItem.getModifyTime());
					pe.setPeId(peItem.getId());
					pe.setTypeName(peItem.getTypeName());
					pe.setTypeNameId(peItem.getTypeNameId());
					pe.setBizType("T");
					pe.setStatus(0);
					pe.setTrackDate(new Date());
					pe.setTrackTime(peItem.getTrackTime());
					pe.setOperatorName(sessionContext.getUsername());
					pe.setConsignId(tc.getConsId().longValue());
					pe.setTransId(tc.getTransTaskId().longValue());
					dao.saveByRowActionSolo(pe);
				}
			}
			else if(ra==RowAction.M||ra==RowAction.R){
				List<PEvent> peList=dao.findByProperty("peId", ""+peItem.getId());
				for(PEvent pe:peList){
					pe.setRowAction(ra);
					pe.setOperatorName(peItem.getOperatorName());
					pe.setTypeName(peItem.getTypeName());
					pe.setTypeNameId(peItem.getTypeNameId());
					pe.setTrackDate(peItem.getTrackDate());
					pe.setTrackTime(peItem.getTrackTime());
					pe.setModifyBy(peItem.getModifyBy());
					pe.setModifyTime(peItem.getModifyTime());
					pe=dao.saveByRowActionSolo(pe);
					
				}
			}
		}
		return resList;
	}

	@Transactional
	public List<PEvent> tconsSave(List<PEvent> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<PEvent> query() {
		return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<PEvent> transQuery() {
		return dao.query(null);
	}
}
