package com.hitisoft.fos.ffse.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffse.dao.SExpenseDao;
import com.hitisoft.fos.ffse.dao.SInvoiceDao;
import com.hitisoft.fos.ffse.dao.SInvoiceEntryDao;
import com.hitisoft.fos.ffse.dao.SInvoiceItemDao;
import com.hitisoft.fos.ffse.dao.SInvoiceNoDao;
import com.hitisoft.fos.ffse.entity.SExpense;
import com.hitisoft.fos.ffse.entity.SInvoice;
import com.hitisoft.fos.ffse.entity.SInvoiceEntry;
import com.hitisoft.fos.ffse.entity.SInvoiceItem;
import com.hitisoft.fos.ffse.entity.SInvoiceNo;
import com.hitisoft.fos.tran.dao.TConsignDao;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fos.util.FosExceptionEnum;
import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.orm.util.SqlOp;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.NumberUtil;
import com.hitisoft.fw.util.StringUtil;
import com.hitisoft.fw.util.TimeUtil;

@Service
public class SInvoiceService {
	@Autowired
	private SInvoiceDao dao;
	@Autowired
	private SInvoiceEntryDao entryDao;
	@Autowired
	private SInvoiceItemDao itemDao;
	@Autowired
	private SExpenseDao expenseDao;
	@Autowired
	private SInvoiceNoDao noDao;
	@Autowired
	private TConsignDao tConsignDao;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SerialFactory serialFactory;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public List save(List entityList) {
		List retList = new ArrayList();
		Long parentId = null;
		String invoNo = null;
		String invoTaxNo = null;
		Set<Long> invoiceSet = new HashSet<Long>();
		boolean invoNoChangeFlag = false;
		boolean isInvoDelFlag = false;
		SInvoice retInvoice = null;
		// handle parent first
		for (Object obj : entityList) {
			if (obj instanceof SInvoice) {
				SInvoice entity = (SInvoice) obj;
				switch (entity.getRowAction()) {
				case N:
					entity.setId(null);
					Map<String, String> paramMap = new HashMap<String, String>();
					paramMap.put(SerialFactory.RULE_RP, entity.getInvoType());
					String no = serialFactory.getSerial("invoice_no", paramMap);
					entity.setInvoNo(no);
					// 应收,且不是debit notes的时候, 自动取税务发票号
					if (Constants.PR_TYPE_RECEIVE.equalsIgnoreCase(entity.getInvoType())
							&& ConstUtil.FalseByte.equals(entity.getInvoDebitnoteFlag())) {
						getTaxNoAuto(entity);
					}
					checkTaxNoDuplicated(entity);
					entity.setInvoIssuer(sessionContext.getUsername());
					entity.setInvoIssueDate(TimeUtil.getNow());
					dao.add(entity);
					retList.add(entity);
					break;
				case M:
					invoTaxNo = entity.getInvoTaxNo();
					checkTaxNoDuplicated(entity);
					SInvoice dbInvoice = dao.findById(entity.getId());
					if (!StringUtil.isEqual(invoTaxNo, dbInvoice.getInvoTaxNo())) {
						invoNoChangeFlag = true;
					}
					retInvoice = dao.update(entity);
					retList.add(retInvoice);
					break;
				case R:
					cancelInvoice(entity.getId());
					SInvoice delEntity = dao.findById(entity.getId());
					delEntity.setRowAction(RowAction.R);
					dao.update(delEntity);
					isInvoDelFlag = true;
					break;
				default:
					throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
				}
				parentId = entity.getId();
				invoNo = entity.getInvoNo();
				invoTaxNo = entity.getInvoTaxNo();
				invoiceSet.add(entity.getId());
				break;
			}
		}

		// handle child
		Set<Long> expenseSet = new HashSet<Long>();
		Set<String> keySet = new HashSet<String>();
		
		for (Object obj : entityList) {
			if (obj instanceof SInvoiceEntry) {
				SInvoiceEntry entity = (SInvoiceEntry) obj;
				RowAction ra = entity.getRowAction();
				if (ra == RowAction.N) {
					entity.setInvoId(parentId.intValue());
				}
				entryDao.saveByRowActionSolo(entity);
				if (ra != RowAction.R) {
					retList.add(entity);
				}
			} 
			else if (obj instanceof SInvoiceItem) {
				SInvoiceItem entity = (SInvoiceItem) obj;
				RowAction ra = entity.getRowAction();
				if (ra == RowAction.N) {
					entity.setInvoId(parentId.intValue());
					entity.setInvoNo(invoNo);
					entity.setInvoTaxNo(invoTaxNo);
				}else if(ra == RowAction.M){
					entity.setInvoNo(invoNo);
					entity.setInvoTaxNo(invoTaxNo);
				}
				
				expenseSet.add(entity.getExpeId().longValue());		
				String key = entity.getConsBizType()+","+entity.getConsId();
				keySet.add(key);
				
				if (ra != RowAction.R) {
					retList.add(itemDao.saveByRowActionSolo(entity));
				}
				else{
					itemDao.saveByRowActionSolo(entity);
				}
			}
		}
		// 修改发票头, 更新invoiceItem上的税务发票号
		if (invoNoChangeFlag) {
			List<SInvoiceItem> itemList = itemDao.findByProperty("invoId", "" + parentId);
			for (SInvoiceItem invoiceItem : itemList) {
				invoiceItem.setInvoTaxNo(invoTaxNo);
				itemDao.update(invoiceItem);
				expenseSet.add(invoiceItem.getExpeId().longValue());
				if (!retList.contains(invoiceItem)) {
					retList.add(invoiceItem);
				}
			}
		}
		for (Long id : expenseSet) {
			SExpense expense = expenseDao.findById(id);
			syncExpense(expense);
			expenseDao.update(expense);
		}
		
		for (String key : keySet) {
			String[] k = key.split(",");
			String bizType = k[0];
			String consId = k[1];
			if(bizType.equals(Constants.CONS_BIZ_TYPE_TMS)){
				TConsign fc = null;
				TConsign con = tConsignDao.findById(Long.parseLong(consId));
				syncConsignTMS(con);
				tConsignDao.update(con);
				if (fc == null || fc.getId() > con.getId()) {
					fc = con;
				}
				if (!isInvoDelFlag && fc != null) {
					if (retInvoice == null) {
						retInvoice = dao.findById(parentId);
					}
					dao.update(retInvoice);
				}
			}
		}
		return retList;
	}

	/**
	 * 检查税务发票号唯一
	 * 
	 * @param entity
	 */
	private void checkTaxNoDuplicated(SInvoice entity) {
		if (StringUtil.isBlank(entity.getInvoTaxNo())) {
			return;
		}
		List<HtQuery> condition = new ArrayList<HtQuery>();
		condition.add(new HtQuery("invoTaxNo", SqlOp.equal, entity.getInvoTaxNo()));
		condition.add(new HtQuery("invoStatus", SqlOp.notEqual, String.valueOf(Constants.INVOICE_STATUS_CANCELLED)));
		List<SInvoice> list = dao.query(condition);
		// 如果>1, 说明肯定重复了
		// 如果=1, 而且主键不等, 说明有另外一个对象有同样的号
		if (list.size() > 1 || (list.size() == 1 && !list.get(0).getId().equals(entity.getId()))) {
			throw new BusinessException(FosExceptionEnum.FFSE_INVOICE_TAX_NO_DUPLICATED);
		}
	}


	//获取被激活的税务发票号
	private void getTaxNoAuto(SInvoice entity) {
		List<SInvoiceNo> taxnoList = noDao.findByProperty("active", ConstUtil.TrueStr);
		if (taxnoList != null && taxnoList.size() >= 1) {
			SInvoiceNo taxno = taxnoList.get(0);
			Long nextNo = taxno.getInnoNextNo();
			Long endNo = taxno.getInnoEndNo();
			if (nextNo < endNo) {
				// 小于, 取号, 并+1
				setTaxNo(entity, taxno);
			} else if (nextNo.equals(endNo)) {
				setTaxNo(entity, taxno);
				taxno.setActive(ConstUtil.FalseByte);
			} else {
				// 如果大于, 说明早应该设置为禁用状态
				taxno.setActive(ConstUtil.FalseByte);
			}
			noDao.update(taxno);
		}
	}

	//税务发票号码用过一次后就加1
	private void setTaxNo(SInvoice entity, SInvoiceNo taxno) {
		Long nextNo = taxno.getInnoNextNo();
		String no = String.valueOf(nextNo);
		if (StringUtil.isNotBlank(taxno.getInnoPrefix())) {
			no = taxno.getInnoPrefix() + no;
		}
		entity.setInvoTaxNo(String.valueOf(no));
		taxno.setInnoNextNo(nextNo + 1);
	}

	/**
	 * @param entity
	 */
	@Transactional
	private void syncExpense(SExpense expense) {
		Map<String, String> propertyMap = new HashMap<String, String>();
		propertyMap.put("expeId", "" + expense.getId());
		propertyMap.put("initCancelFlag", ConstUtil.FalseStr);
		List<SInvoiceItem> list = itemDao.findByProperties(propertyMap);
		String invoiceNo = "";
		String invoTaxNo = "";
		Double amount = new Double(0);
		Set<String> invoiceNoSet = new HashSet<String>();
		Set<String> invoTaxNoSet = new HashSet<String>();
		for (SInvoiceItem invoiceItem : list) {
			if (invoiceItem.getInvoNo() != null && !invoiceNoSet.contains(invoiceItem.getInvoNo())) {
				invoiceNo += invoiceItem.getInvoNo() + ConstUtil.COMMA;
				invoiceNoSet.add(invoiceItem.getInvoNo());
			}
			if (invoiceItem.getInvoTaxNo() != null && !invoTaxNoSet.contains(invoiceItem.getInvoTaxNo())) {
				invoTaxNo += invoiceItem.getInvoTaxNo() + ConstUtil.COMMA;
				invoTaxNoSet.add(invoiceItem.getInvoTaxNo());
			}
			if (invoiceItem.getInitInvoiceAmountW() != null) {
				amount += invoiceItem.getInitInvoiceAmountOri().doubleValue();
			}
		}
		if (invoiceNo.endsWith(ConstUtil.COMMA)) {
			invoiceNo = invoiceNo.substring(0, invoiceNo.length() - 1);
		}
		if (invoTaxNo.endsWith(ConstUtil.COMMA)) {
			invoTaxNo = invoTaxNo.substring(0, invoTaxNo.length() - 1);
		}
		expense.setExpeInvoiceNo(invoiceNo);
		expense.setExpeTaxInvoiceNo(invoTaxNo);
		expense.setExpeInvoiceAmount(new BigDecimal(amount));
		// 核销状态
		Byte status = caclInvoiceStatus(expense.getExpeTotalAmount().doubleValue(), amount);
		expense.setExpeInvoiceStatus(status);
		expense.setExpeInvoiceDate(TimeUtil.getNow());
		expense.setExpeInvoiceBy(sessionContext.getUsername());
	}

	
	/**
	 * 开票, 需要更新委托的开票状态和开票时间‘TMS’
	 */
	@Transactional
	private void syncConsignTMS(TConsign consign) {
		List<SExpense> expenseList = expenseDao.findByProperty("consId", "" + consign.getId());
		Byte statusAr = Constants.EXPENSE_INVOICE_STATUS_NONE;
		Byte statusAp = Constants.EXPENSE_INVOICE_STATUS_NONE;
		
		boolean hasCheckedAr = false;
		boolean hasNotCheckedAr = false;
		boolean hasCheckedAp = false;
		boolean hasNotCheckedAp = false;
		for (SExpense expense : expenseList) {
			if (Constants.PR_TYPE_RECEIVE.equals(expense.getExpeType())) {
				if (Constants.EXPENSE_INVOICE_STATUS_FULL.equals(expense.getExpeInvoiceStatus())) {
					hasCheckedAr = true;
				} else if (Constants.EXPENSE_INVOICE_STATUS_PART.equals(expense.getExpeInvoiceStatus())) {
					hasCheckedAr = true;
					hasNotCheckedAr = true;
					break;
				} else {
					hasNotCheckedAr = true;
				}
			}
		}
		for (SExpense expense : expenseList) {
			if (Constants.PR_TYPE_PAY.equals(expense.getExpeType())) {
				if (Constants.EXPENSE_INVOICE_STATUS_FULL.equals(expense.getExpeInvoiceStatus())) {
					hasCheckedAp = true;
				} else if (Constants.EXPENSE_INVOICE_STATUS_PART.equals(expense.getExpeInvoiceStatus())) {
					hasCheckedAp = true;
					hasNotCheckedAp = true;
					break;
				} else {
					hasNotCheckedAp = true;
				}
			}
		}
		// 有全开票 + 有未开票 = 部分开票
		// 有全开票 + 无未开票 = 全部开票
		// 其他 = 未开票
		if (hasCheckedAr && hasNotCheckedAr) {
			statusAr = Constants.EXPENSE_INVOICE_STATUS_PART;
		} else if (hasCheckedAr && !hasNotCheckedAr) {
			statusAr = Constants.EXPENSE_INVOICE_STATUS_FULL;
		}
		consign.setConsStatusInvoR(statusAr);
		
		if (hasCheckedAp && hasNotCheckedAp) {
			statusAp = Constants.EXPENSE_INVOICE_STATUS_PART;
		} else if (hasCheckedAp && !hasNotCheckedAp) {
			statusAp = Constants.EXPENSE_INVOICE_STATUS_FULL;
		}
		consign.setConsStatusInvoP(statusAp);
	}
	
	/**
	 * 计算开票状态
	 * @param amount
	 * @param amountWriteOff
	 */
	private Byte caclInvoiceStatus(Double amount, Double amountWriteOff) {
		Byte status;
		if (amountWriteOff == null || amountWriteOff == 0) {
			status = Constants.EXPENSE_INVOICE_STATUS_NONE;
		} else if (NumberUtil.amountEqual(amountWriteOff, amount)) {
			status = Constants.EXPENSE_INVOICE_STATUS_FULL;
		} else {
			status = Constants.EXPENSE_INVOICE_STATUS_PART;
		}
		return status;
	}

	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	public List query() {
		List retList = new ArrayList();
		retList.addAll(dao.findByProperties());
		if (requestContext.containsKey(Constants.PARAM_EAGER)) {
			retList.addAll(entryDao.findByProperties());
			retList.addAll(itemDao.findByProperties());
		}
		return retList;
	}

	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	public List queryForExp() {
		List retList = new ArrayList();
		retList.add(dao.findById(Long.parseLong(requestContext.get("invoId"))));
		retList.addAll(entryDao.findByProperties());
		return retList;
	}
	
	@Transactional(readOnly = true)
	public List<SInvoiceEntry> queryEntry() {
		return entryDao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<SInvoiceItem> queryItem() {
		return itemDao.findByProperties();
	}

	@Transactional
	public void checkInvoice() {
		Long id = Long.valueOf(requestContext.get("invoId"));
		Byte status = Byte.valueOf(requestContext.get("invoStatus"));
		dao.checkStatusById(id, status);
	}

	@Transactional
	public void cancelInvoice() {
		Long id = Long.valueOf(requestContext.get("invoId"));
		cancelInvoice(id);
	}

	private void cancelInvoice(Long invoId) {
		SInvoice invoice = dao.findById(invoId);
		// 如果发票已经核销, 不能作废
		if (invoice.getInvoWriteOffStatus() != null && ConstUtil.TrueInt.equals(invoice.getInvoWriteOffStatus())) {
			throw new BusinessException(FosExceptionEnum.FFSE_INVOICE_IS_WRITEOFF);
		}
		// 更新发票的核销状态
		invoice.setInvoStatus(Constants.INVOICE_STATUS_CANCELLED);
		dao.update(invoice);

		// 更新费用的核销状态和核销金额
		List<SInvoiceItem> itemList = itemDao.findByProperty("invoId", "" + invoId);
		Set<Long> expenseSet = new HashSet<Long>();
		for (SInvoiceItem item : itemList) {
			item.setInitCancelFlag(ConstUtil.TrueByte);
			itemDao.update(item);
			expenseSet.add(item.getExpeId().longValue());
		}
		for (Long id : expenseSet) {
			SExpense expense = expenseDao.findById(id);
			syncExpense(expense);
			expenseDao.update(expense);
		}
	}

	@Transactional(readOnly = true)
	public List<SInvoice> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}

	@Transactional(readOnly = true)
	public List<SInvoiceItem> complexQueryInvoiceItem(List<HtQuery> conditions) {
		return itemDao.query(conditions);
	}

	public List<SInvoiceItem> complexQueryInvoiceItemByPrId(List<HtQuery> conditions) {
		return itemDao.complexQueryByPrId(conditions);
	}

}
