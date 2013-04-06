package com.hitisoft.fos.tran.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TContainerCargoDao;
import com.hitisoft.fos.tran.dao.TContainerDao;
import com.hitisoft.fos.tran.entity.TContainer;
import com.hitisoft.fos.tran.entity.TContainerCargo;
import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fw.orm.jpa.BaseDomain;
import com.hitisoft.fw.orm.util.RowAction;

@Service
public class TContainerService {
	@Autowired
	private TContainerDao dao;
	@Autowired
	private SerialFactory serialFactory;
	@Autowired
	private TContainerCargoDao containerCargoDao;
	
	@Transactional
	public List<BaseDomain> save(List<?> entityList){
		List<BaseDomain> retList = new ArrayList<BaseDomain>();
		Long parentId=0L;
		String no="";
		TContainer tcon=null;
		List<TContainerCargo> items = new ArrayList<TContainerCargo>();
		for(Object obj:entityList){
			if(obj instanceof TContainer){
				tcon=(TContainer)obj;
				RowAction ra=tcon.getRowAction();
				if(ra==RowAction.N){
					no=serialFactory.getSerial("tran_no");
					tcon.setConsNo(no);
					tcon=dao.saveByRowActionSolo(tcon);
					parentId=tcon.getId();
				}
				else if(ra==RowAction.M){
					Map<String, String> map = new HashMap<String, String>();
					map.put("consId", "" + tcon.getId());
					List<TContainerCargo> cclist = containerCargoDao.findByProperties(map);
					for (TContainerCargo tc : cclist) {
						tc.setRowAction(RowAction.M);
						containerCargoDao.saveByRowActionSolo(tc);
					}
					tcon=dao.saveByRowActionSolo(tcon);
				  	parentId = tcon.getId();
				}
				else{
					dao.saveByRowActionSolo(tcon);
				}
				retList.add(tcon);
			}
			else if(obj instanceof TContainerCargo){
				TContainerCargo item = (TContainerCargo) obj;
				items.add(item);
			}
		}
		for(TContainerCargo entity:items){
			RowAction ra =entity.getRowAction();
			if (ra == RowAction.N) {
				entity.setConsId(parentId);
				entity.setConsNo(no);
			}
			entity = containerCargoDao.saveByRowActionSolo(entity);
			if (ra != RowAction.R) {
				entity.setConsId(parentId);
				entity.setConsNo(tcon.getConsNo());
				retList.add(entity);
			}
		}
		return retList;
	}
	
	@Transactional(readOnly = true)
	public List<TContainer> query() {
		
		 return dao.findByProperties();
	}
	
}