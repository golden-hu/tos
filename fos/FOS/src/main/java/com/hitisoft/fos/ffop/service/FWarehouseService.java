package com.hitisoft.fos.ffop.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.dao.FWarehouseCargoDao;
import com.hitisoft.fos.ffop.dao.FWarehouseDao;
import com.hitisoft.fos.ffop.entity.FWarehouse;
import com.hitisoft.fos.ffop.entity.FWarehouseCargo;
import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.util.NumberUtil;

@Service
public class FWarehouseService {
	@Autowired
	private FWarehouseDao dao;
	@Autowired
	private FWarehouseCargoDao cargoDao;
	@Autowired
	private SerialFactory serialFactory;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public List save(List entityList) {
		List retList = new ArrayList();
		Map<Long, Long> idMap = new HashMap<Long, Long>();
		for (Object obj : entityList) {
			if (obj instanceof FWarehouse) {
				FWarehouse entity = (FWarehouse) obj;
				Long oldId = entity.getId();
				RowAction ra = entity.getRowAction();
				if (ra == RowAction.N) {
					String no = serialFactory.getSerial("ware_no");
					entity.setWareNo(no);
				}
				entity = dao.saveByRowActionSolo(entity);
				if (ra != RowAction.R) {
					retList.add(entity);
				}
				idMap.put(oldId, entity.getId());
			}
		}

		// handle WarehouseCargo
		for (Object obj : entityList) {
			if (obj instanceof FWarehouseCargo) {
				FWarehouseCargo entity = (FWarehouseCargo) obj;
				RowAction ra = entity.getRowAction();
				if (ra == RowAction.N) {
					entity.setWareId(NumberUtil.frontId2DbId(idMap, entity.getWareId().longValue()).intValue());
				}
				entity = cargoDao.saveByRowActionSolo(entity);
				if (ra != RowAction.R) {
					retList.add(entity);
				}
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<FWarehouse> query() {
		return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<FWarehouseCargo> queryCargo() {
		return cargoDao.findByProperties();
	}
}
