package com.hitisoft.fos.ffse.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffse.dao.SExRateDao;
import com.hitisoft.fos.ffse.entity.SExRate;
import com.hitisoft.fos.general.dao.GCurrencyDao;
import com.hitisoft.fos.general.entity.GCurrency;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.StringUtil;
import com.hitisoft.fw.util.TimeUtil;

@Service
public class SExRateService {
	@Autowired
	private SExRateDao dao;
	@Autowired
	private GCurrencyDao currencyDao;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;

	@Transactional
	public List<SExRate> save(List<SExRate> entityList) {
		List<SExRate> retList = new ArrayList<SExRate>();
		for (SExRate entity : entityList) {
			switch (entity.getRowAction()) {
			case N:
				// 查一下是否该汇率已经存在, 存在就update, 否则insert
				Map<String, String> queryMap = new HashMap<String, String>();
				queryMap.put("exraBaseCurrency", entity.getExraBaseCurrency());
				queryMap.put("exraExCurrency", entity.getExraExCurrency());
				queryMap.put(ConstUtil.Removed, "" + entity.getRemoved());
				queryMap.put(Constants.COMP_CODE, entity.getCompCode());
				queryMap.put(Constants.ACTIVE, ConstUtil.TrueStr);
				List<SExRate> hasList = dao.findByProperties(queryMap);
				if (hasList.size() == 0) {
					entity.setId(null);
					entity.setActive(ConstUtil.TrueByte);
					dao.add(entity);
					retList.add(entity);
				} else {
					SExRate updateEntity = dao.findById(entity.getId());
					updateEntity.setExraRate(entity.getExraRate());
					dao.update(updateEntity);
					retList.add(updateEntity);
				}
				break;
			case M:
				// 备份老记录
				SExRate delEntity = dao.findById(entity.getId());
				delEntity.setExraEndDate(TimeUtil.getNow());
				delEntity.setActive(ConstUtil.FalseByte);
				dao.update(delEntity);
				// 增加新纪录
				entity.setId(null);
				entity.setExraStartDate(TimeUtil.getNow());
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
	public List<SExRate> query() {
		Map<String, SExRate> rateMap = new HashMap<String, SExRate>();

		// 获取已有汇率
		List<SExRate> hasList = dao.findByProperties();
		for (SExRate exRate : hasList) {
			rateMap.put(exRate.getExraBaseCurrency() + ConstUtil.STRING_SHARP + exRate.getExraExCurrency(), exRate);
		}

		if (ConstUtil.FalseShort.equals(requestContext.get(Constants.ACTIVE))) {
			return hasList;
		}

		// 获取币种
		List<GCurrency> currList = currencyDao.findAll();

		// 其他币种和本位币排列组合, -1是因为要去掉本位币(人民币)
		String[][] currArray = new String[(currList.size() - 1) * 2][3];
		int i = 0;
		for (GCurrency currency : currList) {
			if (!Constants.CURRENCY_BASE_DEFAULT.equals(currency.getCurrCode())) {
				currArray[i][0] = currency.getCurrCode() + ConstUtil.STRING_SHARP + Constants.CURRENCY_BASE_DEFAULT;
				currArray[i][1] = currency.getCurrCode();
				currArray[i][2] = Constants.CURRENCY_BASE_DEFAULT;
				currArray[i + 1][0] = Constants.CURRENCY_BASE_DEFAULT + ConstUtil.STRING_SHARP + currency.getCurrCode();
				currArray[i + 1][1] = Constants.CURRENCY_BASE_DEFAULT;
				currArray[i + 1][2] = currency.getCurrCode();
				i += 2;
			}
		}

		// 如果已有汇率表中没有, 新增一个汇率对象
		for (int j = 0; j < currArray.length; j++) {
			String key = currArray[j][0];
			if (StringUtil.isNotBlank(key) && !rateMap.containsKey(key)) {
				SExRate rate = new SExRate();
				rate.setCompCode(sessionContext.getCompCode());
				rate.setExraBaseCurrency(currArray[j][1]);
				rate.setExraExCurrency(currArray[j][2]);
				rate.setExraStartDate(new Date());
				rate.setRemoved(ConstUtil.FalseByte);
				rate.setRowAction(RowAction.N);
				rate.setVersion(0);
				rateMap.put(key, rate);
			}
		}

		// 返回所有
		List<SExRate> retList = new ArrayList<SExRate>();
		retList.addAll(rateMap.values());
		return retList;
	}
}
