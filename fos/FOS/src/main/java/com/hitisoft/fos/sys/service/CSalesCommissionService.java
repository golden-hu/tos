package com.hitisoft.fos.sys.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.sys.dao.CCommissionItemDao;
import com.hitisoft.fos.sys.dao.CSalesCommissionDao;
import com.hitisoft.fos.sys.entity.CCommissionItem;
import com.hitisoft.fos.sys.entity.CSalesCommission;

@Service
public class CSalesCommissionService {
	@Autowired
	private CSalesCommissionDao dao;
	@Autowired
	private CCommissionItemDao commissionItemDao;

	@Transactional
	public List<CSalesCommission> save(List<CSalesCommission> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<CSalesCommission> query() {
		return dao.findByProperties();
	}

	/**
	 * 业务员提成统计明细
	 * 
	 * @param queryMap
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<FConsign> querySalesCommissionDetail() {
		List<Object[]> objList = (List<Object[]>) dao.queryCommissionDetail();
		Map<Long, FConsign> consignMap = new HashMap<Long, FConsign>();
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;
				Long consId = (Long) objArray[0];
				FConsign consign = new FConsign();
				consign.setId(consId);
				consign.setConsNo((String) objArray[1]);
				consign.setCustSname((String) objArray[2]);
				consign.setConsSailDate((Date) objArray[3]);
				Double amount = ((BigDecimal) objArray[4]).doubleValue();
				consign.setGrossProfit(amount);
				consignMap.put(consId, consign);
			}
		}
		List<FConsign> retList = new ArrayList<FConsign>();
		retList.addAll(consignMap.values());
		return retList;
	}

	/**
	 * 业务员提成统计
	 * 
	 * @param queryMap
	 * @return
	 */
	public List<CSalesCommission> calculate() {
		// 方案明细
		Map<Integer, List<CCommissionItem>> itemMap = sortCommissionItem();
		// 把业务员业绩并入业务员方案配置
		List<CSalesCommission> salesList = getSalesCommission();
		// 对于每一个业务员方案配置, 根据方案明细计算
		for (CSalesCommission sales : salesList) {
			List<CCommissionItem> itemList = itemMap.get(sales.getCommId());
			Double commission = new Double(0);
			if (itemList != null && itemList.size() > 0) {
				Double baseAmount = sales.getBaseAmount();
				for (CCommissionItem item : itemList) {
					double frag = 0;
					if (baseAmount >= item.getCoitLimit()) {
						frag = item.getCoitLimit() - item.getCoitLower();
					} else if (baseAmount >= item.getCoitLower()) {
						frag = baseAmount - item.getCoitLower();
					}
					commission += frag * item.getCoitRate().doubleValue();
				}
			}
			sales.setCommission(commission);
		}
		return salesList;
	}

	/**
	 * 把业务员业绩并入业务员方案配置
	 * 
	 * @param amountList
	 * @return
	 */
	private List<CSalesCommission> getSalesCommission() {
		Map<Integer, Double> amountList = getTotalAmount();
		Map<String, String> map = new HashMap<String, String>();
		List<CSalesCommission> salesList = dao.findByProperties(map);
		for (CSalesCommission salesCommission : salesList) {
			Double amount = amountList.get(salesCommission.getSacoSalesId());
			if (amount == null)
				amount = new Double(0);
			salesCommission.setBaseAmount(amount);
		}
		return salesList;
	}

	/**
	 * 当月业务员业绩, 并预处理成userId -> amount
	 * 
	 * @param queryMap
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private Map<Integer, Double> getTotalAmount() {
		// 当月业务员业绩
		List<Object[]> objList = (List<Object[]>) dao.queryAllCommission();
		// 业务员业绩预处理
		Map<Integer, Double> amountList = new HashMap<Integer, Double>();
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;
				Integer salesId = (Integer) objArray[0];
				Double amount = ((BigDecimal) objArray[1]).doubleValue();
				amountList.put(salesId, amount);
			}
		}
		return amountList;
	}

	/**
	 * 业务员分成方案明细, 按照方案分组, 并排序
	 * 
	 * @return
	 */
	private Map<Integer, List<CCommissionItem>> sortCommissionItem() {
		Map<Integer, List<CCommissionItem>> itemMap = new HashMap<Integer, List<CCommissionItem>>();

		Map<String, String> queryMap = new HashMap<String, String>();
		List<CCommissionItem> itemList = commissionItemDao.findByProperties(queryMap);
		for (CCommissionItem item : itemList) {
			List<CCommissionItem> list = itemMap.get(item.getCommId());
			if (list == null) {
				list = new ArrayList<CCommissionItem>();
				itemMap.put(item.getCommId(), list);
			}
			list.add(item);
			Collections.sort(list);
		}
		return itemMap;
	}

}
