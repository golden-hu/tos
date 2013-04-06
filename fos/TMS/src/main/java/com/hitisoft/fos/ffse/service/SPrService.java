package com.hitisoft.fos.ffse.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffse.dao.SInvoiceDao;
import com.hitisoft.fos.ffse.dao.SPrDao;
import com.hitisoft.fos.ffse.dao.SPrItemDao;
import com.hitisoft.fos.ffse.entity.SInvoice;
import com.hitisoft.fos.ffse.entity.SPr;
import com.hitisoft.fos.ffse.entity.SPrItem;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;

@Service
public class SPrService {
	@Autowired
	private SPrDao dao;
	@Autowired
	private SPrItemDao itemDao;
	@Autowired
	private SInvoiceDao invoiceDao;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private SerialFactory serialFactory;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public List save(List entityList) {
		List retList = new ArrayList();
		Long parentId = null;
		String prNo = null;

		// handle parent first
		for (Object obj : entityList) {
			if (obj instanceof SPr) {
				SPr entity = (SPr) obj;
				switch (entity.getRowAction()) {
				case N:
					entity.setId(null);
					Map<String, String> paramMap = new HashMap<String, String>();
					paramMap.put(SerialFactory.RULE_RP, entity.getPrType());
					paramMap.put(SerialFactory.RULE_CURRENCY, entity.getCurrCode().substring(0, 1));
					String no = serialFactory.getSerial("pr_no", paramMap);
					entity.setPrNo(no);
					dao.add(entity);
					retList.add(entity);
					break;
				case M:
					retList.add(dao.update(entity));
					break;
				case R:
					SPr delEntity = dao.findById(entity.getId());
					delEntity.setRowAction(RowAction.R);
					dao.update(delEntity);

					// 级联删除, 更新为removed, 清除子表关联字段
					Map<String, String> queryMap = new HashMap<String, String>();
					queryMap.put(Constants.COMP_CODE, sessionContext.getCompCode());
					queryMap.put("prId", "" + entity.getId());
					List<SPrItem> itemList = itemDao.findByProperties(queryMap);
					for (SPrItem prItem : itemList) {
						resetInvoiceStatus(prItem);
						prItem.setRowAction(RowAction.R);
						itemDao.update(prItem);
					}
					break;
				default:
					throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
				}
				parentId = entity.getId();
				prNo = entity.getPrNo();
				break;
			}
		}

		// handle child
		for (Object obj : entityList) {
			if (obj instanceof SPrItem) {
				SPrItem entity = (SPrItem) obj;
				switch (entity.getRowAction()) {
				case N:
					entity.setId(null);
					entity.setPrId(parentId.intValue());
					itemDao.add(entity);
					retList.add(entity);
					// 更新对应的发票状态为已生成托收单
					SInvoice invoice = invoiceDao.findById(entity.getInvoId().longValue());
					invoice.setInvoPrFlag(ConstUtil.TrueByte);
					invoice.setInvoEntrustNo(prNo);
					invoiceDao.update(invoice);
					break;
				case M:
					retList.add(itemDao.update(entity));
					break;
				case R:
					SPrItem delEntity = itemDao.findById(entity.getId());
					delEntity.setRowAction(RowAction.R);
					itemDao.update(delEntity);
					// 更新对应的发票状态为已审核
					resetInvoiceStatus(entity);
					break;
				default:
					throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
				}
			}
		}
		return retList;
	}

	@Transactional
	private void resetInvoiceStatus(SPrItem entity) {
		SInvoice invoice = invoiceDao.findById(entity.getInvoId().longValue());
		invoice.setInvoStatus(Constants.INVOICE_STATUS_CHECKED);
		invoice.setInvoEntrustNo(null);
		invoice.setInvoPrFlag(ConstUtil.FalseByte);
		invoiceDao.update(invoice);
	}

	@Transactional(readOnly = true)
	public List<SPr> query() {
		return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<SPrItem> queryItem() {
		return itemDao.findByProperties();
	}

	@Transactional
	public void updateStatus() {
		Long id = Long.valueOf(requestContext.get("prId"));
		Byte prStatus = Byte.valueOf(requestContext.get("prStatus"));
		SPr entity = dao.findById(id);
		entity.setPrStatus(prStatus);
		dao.update(entity);
		if (Constants.PR_STATUS_CANCELLED == prStatus) {
			// 找到prItem
			List<SPrItem> itemList = itemDao.findByProperty("prId", "" + id);
			for (SPrItem item : itemList) {
				// 恢复发票状态
				SInvoice invoice = invoiceDao.findById(item.getInvoId().longValue());
				invoice.setInvoStatus(Constants.INVOICE_STATUS_CHECKED);
				invoice.setInvoEntrustNo(null);
				invoiceDao.update(invoice);
			}
		}
	}

	@Transactional(readOnly = true)
	public List<SPr> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}

}
