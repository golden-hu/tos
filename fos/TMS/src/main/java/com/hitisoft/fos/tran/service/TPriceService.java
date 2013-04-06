package com.hitisoft.fos.tran.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TPriceDao;
import com.hitisoft.fos.tran.entity.TPrice;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.TimeUtil;

@Service
public class TPriceService {
	@Autowired
	private TPriceDao dao;
	
	@Transactional
	public List<TPrice> save(List<TPrice> entityList) {		
		List<TPrice> retList = new ArrayList<TPrice>();
		for (TPrice entity : entityList) {
			switch (entity.getRowAction()) {
			case N:
				entity.setId(null);
				entity.setActive(ConstUtil.TrueByte);
				entity.setStartDate(TimeUtil.getNow());
				dao.add(entity);
				retList.add(entity);
				
				// 查一下是否该运价已经存在, 存在就备份老记录
				Map<String, String> queryMap = new HashMap<String, String>();
				queryMap.put("loadProvinceId", ""+entity.getLoadProvinceId());
				queryMap.put("loadCityId", ""+entity.getLoadCityId());
				queryMap.put("dischargeProvinceId", ""+entity.getLoadProvinceId());
				queryMap.put("dischargeCityId", ""+entity.getLoadCityId());
				queryMap.put(ConstUtil.Removed, "0");
				queryMap.put(Constants.COMP_CODE, entity.getCompCode());
				queryMap.put(Constants.ACTIVE, ConstUtil.TrueStr);
				List<TPrice> hasList = dao.findByProperties(queryMap);
				if (hasList.size() > 0) {
					for (TPrice oldPrice : entityList) {
						oldPrice.setEndDate(TimeUtil.getNow());
						oldPrice.setActive(ConstUtil.FalseByte);
						dao.update(oldPrice);
					}
				}
				break;
			case M:
				// 备份老记录
				TPrice delEntity = dao.findById(entity.getId());
				delEntity.setEndDate(TimeUtil.getNow());
				delEntity.setActive(ConstUtil.FalseByte);
				dao.update(delEntity);
				// 增加新纪录
				entity.setId(null);
				entity.setStartDate(TimeUtil.getNow());
				entity.setActive(ConstUtil.TrueByte);
				dao.add(entity);
				retList.add(entity);
				break;
			case R:
				delEntity = dao.findById(entity.getId());
				delEntity.setRowAction(RowAction.R);
				dao.update(delEntity);
				break;
			default:
				throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
			}
		}
		return retList;
		
	}

	@Transactional(readOnly = true)
	public List<TPrice> query() {
		return dao.findByProperties();
	}
	
	@Transactional(readOnly = true)
	public List<TPrice> complexQuery(List<HtQuery> conditions) {
		return dao.complexQuery(conditions);
	}
}
