package com.hitisoft.fos.ffop.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.dao.FCargoDao;
import com.hitisoft.fos.ffop.dao.FContainerCargoDao;
import com.hitisoft.fos.ffop.entity.FCargo;
import com.hitisoft.fos.ffop.entity.FContainerCargo;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;

@Service
public class FContainerCargoService {
	@Autowired
	private FContainerCargoDao dao;
	@Autowired
	private FCargoDao cargoDao;

	@Autowired
	private RequestContext requestContext;
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional
	public List  save(List entityList) {
		List retList =  new ArrayList();
		for (Object obj : entityList) {
			if (obj instanceof FContainerCargo) {
				FContainerCargo entity = (FContainerCargo) obj;
				if (entity.getRowAction() == RowAction.N) {
					Long cargId =entity.getCargId().longValue();
					FCargo cargos = cargoDao.findById(cargId);
					cargos.setCargContStatus(1);
					dao.add(entity);
					retList.add(cargos);
					retList.add(entity);        
				}else if (entity.getRowAction() == RowAction.M) {
					FContainerCargo retEntity = dao.update(entity);
					retList.add(retEntity);
				}else if (entity.getRowAction() == RowAction.R) {
					FContainerCargo delEntity = dao.findById(entity.getId());
					delEntity.setRowAction(RowAction.R);
					Long cargId =entity.getCargId().longValue();
					FCargo cargos = cargoDao.findById(cargId);
					cargos.setCargContStatus(0);
					retList.add(cargos);
					dao.update(delEntity);
				}
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<FContainerCargo> query() {
		return dao.findByProperties();
	}
	
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional(readOnly = true)
	public List<FContainerCargo> complexQuery(){
		 List retList = new ArrayList();
		 HashMap<String, String> map = new HashMap<String, String>();
		 String consId = requestContext.get("consId");
		 String contId = requestContext.get("contId");
		 map.put("consId", consId);
		 map.put("contId", contId);
		 List<FContainerCargo> cargosList = dao.findByProperties(map);
		 retList.addAll(cargosList);
		 return retList;
	}
}
