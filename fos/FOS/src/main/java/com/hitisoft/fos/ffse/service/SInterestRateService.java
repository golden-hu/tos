package com.hitisoft.fos.ffse.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffse.dao.SInterestRateDao;
import com.hitisoft.fos.ffse.entity.SInterestRate;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.util.ConstUtil;

@Service
public class SInterestRateService {
	@Autowired
	private SInterestRateDao dao;

	@Transactional
	public List<SInterestRate> save(List<SInterestRate> entityList) {
		List<SInterestRate> retList = new ArrayList<SInterestRate>();
		for (SInterestRate entity : entityList) {
			switch (entity.getRowAction()) {
			case N:
				// 查一下是否该汇率已经存在, 存在就update, 否则insert
				Map<String, String> queryMap = new HashMap<String, String>();
				queryMap.put("inraCurrency", entity.getInraCurrency());
				queryMap.put(ConstUtil.Removed, "" + entity.getRemoved());
				queryMap.put(Constants.COMP_CODE, entity.getCompCode());
				queryMap.put(Constants.ACTIVE, ConstUtil.TrueStr);
				List<SInterestRate> hasList = dao.findByProperties(queryMap);
				if (hasList.size() == 0) {
					entity.setId(null);
					entity.setActive(ConstUtil.TrueByte);
					dao.add(entity);
					retList.add(entity);
				} else {
					SInterestRate updateEntity = dao.findById(entity.getId());
					updateEntity.setInraRate(entity.getInraRate());
					dao.update(updateEntity);
					retList.add(updateEntity);
				}

				break;
			case M:
				// 备份老记录
				SInterestRate delEntity = dao.findById(entity.getId());
				delEntity.setInraEndDate(new Date());
				delEntity.setActive(ConstUtil.FalseByte);
				dao.update(delEntity);
				// 增加新纪录
				entity.setId(null);
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
	public List<SInterestRate> query() {
		return dao.findByProperties();
	}
}
