package com.hitisoft.fos.ffse.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffse.dao.SBillDao;
import com.hitisoft.fos.ffse.dao.SBillItemDao;
import com.hitisoft.fos.ffse.dao.SExpenseDao;
import com.hitisoft.fos.ffse.entity.SBill;
import com.hitisoft.fos.ffse.entity.SBillItem;
import com.hitisoft.fos.ffse.entity.SExpense;
import com.hitisoft.fos.tran.dao.TConsignDao;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.TimeUtil;

@Service
public class SBillService {
	@Autowired
	private SBillDao dao;
	@Autowired
	private SBillItemDao itemDao;	
	@Autowired
	private TConsignDao consDao;	
	@Autowired
	private SExpenseDao expenseDao;
	
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private SerialFactory serialFactory;

	/**
	 * 对帐单保存
	 * @param entityList
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public List save(List entityList) {
		List retList = new ArrayList();
		Long parentId = null;
		String parentNo = null;

		// handle parent first
		for (Object obj : entityList) {
			if (obj instanceof SBill) {
				SBill entity = (SBill) obj;
				parentId = entity.getId();
				switch (entity.getRowAction()) {
					case N:
						entity.setId(null);
						Map<String, String> paramMap = new HashMap<String, String>();
						paramMap.put(SerialFactory.RULE_RP, entity.getBillType());
						String no = serialFactory.getSerial("bill_no", paramMap);
						entity.setBillNo(no);
						parentNo = no;
						entity.setBillIssuer(sessionContext.getUsername());
						entity.setBillDate(TimeUtil.getTodayEndTime());
						dao.add(entity);
						retList.add(entity);
						parentId = entity.getId();
						break;
					case M:
						/*if(entity.getBillIssuer()==null){
							entity.setBillIssuer(sessionContext.getUsername());
						}
						if(entity.getBillIssueDate()==null){
							entity.setBillDate(TimeUtil.getTodayEndTime());
						}*/
						retList.add(dao.update(entity));
						break;
					case R:
						SBill delEntity = dao.findById(entity.getId());
						delEntity.setRowAction(RowAction.R);
						dao.update(delEntity);
	
						Map queryMap = new HashMap<String, Object>();
						queryMap.put(ConstUtil.CompCode, sessionContext.getCompCode());
						queryMap.put("billId", ""+entity.getId());
	
						List<SBillItem> itemList = itemDao.findByProperties(queryMap);
						for (SBillItem billItem : itemList) {
							SExpense expense = expenseDao.findById(billItem.getExpeId());
							expense.setExpeBillNo(null);
							expense.setExpeBillStatus(Constants.BILL_STATUS_NONE);
							expenseDao.update(expense);
							billItem.setRowAction(RowAction.R);
							itemDao.update(billItem);
						}
						break;
					default:
						throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
				}
			}			
		}
		// handle child
		for (Object obj : entityList) {
			if (obj instanceof SBillItem) {
				SBillItem entity = (SBillItem) obj;	
				switch (entity.getRowAction()) {
				case N:
					entity.setId(null);
					entity.setBillId(parentId);
					itemDao.add(entity);
					retList.add(entity);

					//更新费用上的billNo和billStatus
					SExpense expense = expenseDao.findById(entity.getExpeId());
					expense.setExpeBillNo(parentNo);
					expense.setExpeBillStatus(Constants.BILL_STATUS_CHECKED);
					expense.setRowAction(RowAction.M);
					expenseDao.update(expense);
					break;
				case M:
					retList.add(itemDao.update(entity));
					break;
				case R:
					SExpense e = expenseDao.findById(entity.getExpeId());
					e.setExpeBillNo(null);
					e.setExpeBillStatus(Constants.BILL_STATUS_NONE);
					e.setRowAction(RowAction.M);
					expenseDao.update(e);
					SBillItem delEntity = itemDao.findById(entity.getId());
					delEntity.setRowAction(RowAction.R);
					itemDao.update(delEntity);
					break;
				default:
					throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
				}
			}
		}
		return retList;
	}

	/**
	 * 对帐单查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<SBill> query() {
		return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<SBillItem> queryItem() {
		return itemDao.findByProperties();
	}

	/**
	 * 对帐单状态更新
	 */
	@Transactional
	public void updateStatus() {
		Long id = Long.valueOf(requestContext.get("billId"));
		Byte status = Byte.valueOf(requestContext.get("billStatus"));
		SBill entity = dao.findById(id);
		entity.setBillStatus(status);
		dao.update(entity);
		
		//对帐单作废之后, 费用状态要改回来未用, 而不是改为作废
		if (Constants.BILL_STATUS_CANCELLED.equals(status)){
			status = Constants.BILL_STATUS_NONE;
			//更新对账单对应的费用行的状态
			Map<String,String> queryMap = new HashMap<String, String>();
			queryMap.put(ConstUtil.CompCode, sessionContext.getCompCode());
			queryMap.put("billId", ""+id);
			List<SBillItem> itemList = itemDao.findByProperties(queryMap);
			for (SBillItem billItem : itemList) {
				SExpense expense = expenseDao.findById(billItem.getExpeId());
				expense.setExpeBillNo(null);
				expense.setExpeBillStatus(status);
				expenseDao.update(expense);
			}
		}		
	}

	/**
	 * 对帐单复杂查询
	 * @param conditions
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<SBill> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}
	
	/**
	 * 对帐单导出查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<Object> queryForExport() {
		List<Object> retList = new ArrayList<Object>();		
		
		String billId = (String) requestContext.get("billId");
		SBill bill = dao.findById(Long.parseLong(billId));				
		retList.add(bill);
		
		Map<String,String> map = new HashMap<String,String>();
		map.put("billId", billId);
		List<SBillItem> items = itemDao.findByProperties(map);
		
		for(SBillItem item : items){
			String consNo = item.getConsNo();
			map.clear();
			map.put("consNo", consNo);
			List<TConsign> consList = consDao.findByProperties(map);
			if(consList.size()==1){
				TConsign c = consList.get(0);
				/*item.setConsCargoNameCn(c.getConsCargoNameCn());
				item.setConsPackName(c.getPackName());
				item.setConsContainersInfo(c.getConsContainersInfo());
				item.setConsPodEn(c.getConsPodEn());
				item.setConsPolEn(c.getConsPolEn());
				item.setConsSailDate(c.getConsSailDate());
				item.setConsTotalPackages(c.getConsTotalPackages());
				item.setConsTotalGrossWeight(c.getConsTotalGrossWeight());
				item.setConsTotalNetWeight(c.getConsTotalNetWeight());
				item.setConsTotalMeasurement(c.getConsTotalMeasurement());
				item.setConsMblNo(c.getConsMblNo());
				item.setConsHblNo(c.getConsHblNo());
				item.setConsVessel(c.getVessName());
				item.setConsVoyage(c.getVoyaName());*/
			}
		}
		retList.addAll(items);
		return retList;
	}

}
