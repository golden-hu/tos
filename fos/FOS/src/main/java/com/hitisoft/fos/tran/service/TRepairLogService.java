package com.hitisoft.fos.tran.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TRepairLogDao;
import com.hitisoft.fos.tran.dao.TRepairItemDao;
import com.hitisoft.fos.tran.entity.TCargo;
import com.hitisoft.fos.tran.entity.TRepairItem;
import com.hitisoft.fos.tran.entity.TRepairLog;
import com.hitisoft.fos.tran.entity.TTransTask;
import com.hitisoft.fw.orm.util.RowAction;

@Service
public class TRepairLogService {
	@Autowired
	private TRepairLogDao dao;
	@Autowired
	private TRepairItemDao itemDao;
	
	
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public void deleteById(TRepairLog repair) {
		Long id = repair.getId();
		dao.delete(id);
		
		Map<String,String> map = new HashMap();
		map.put("repairLogId", ""+id);
		
		List<TRepairItem> items = itemDao.findByProperties(map);
		
		for(TRepairItem c : items){
			c.setRowAction(RowAction.R);
		}
		itemDao.saveByRowAction(items);
		
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public List save(List entityList) {
		List retList = new ArrayList();
		Long parentId = null;
		TRepairLog repairLog = null;
		List<TRepairItem> items = new ArrayList<TRepairItem>();
		
		for (Object obj : entityList) {
			if (obj instanceof TRepairLog) {
				repairLog = (TRepairLog) obj;
				repairLog = dao.saveByRowActionSolo(repairLog);	
				retList.add(repairLog);
				parentId = repairLog.getId();
			}
			else if(obj instanceof TRepairItem){
				TRepairItem item = (TRepairItem) obj;
				items.add(item);
			}
		}
		
		for (TRepairItem entity : items) {			
				RowAction ra = entity.getRowAction();
				if (ra == RowAction.N) {
					entity.setRepairLogId(parentId.intValue());
				}
				entity = itemDao.saveByRowActionSolo(entity);
				if (ra != RowAction.R) {
					retList.add(entity);
				}
		}		
		return retList;
	}

	@Transactional(readOnly = true)
	public List<TRepairLog> query() {
		return dao.findByProperties();
	}
}
