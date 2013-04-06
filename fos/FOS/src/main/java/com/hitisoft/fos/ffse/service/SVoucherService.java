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

import com.hitisoft.fos.ffop.dao.FConsignDao;
import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.ffse.dao.SBalanceDao;
import com.hitisoft.fos.ffse.dao.SExpenseDao;
import com.hitisoft.fos.ffse.dao.SInvoiceDao;
import com.hitisoft.fos.ffse.dao.SInvoiceItemDao;
import com.hitisoft.fos.ffse.dao.SVoucherDao;
import com.hitisoft.fos.ffse.dao.SVoucherItemDao;
import com.hitisoft.fos.ffse.entity.SBalance;
import com.hitisoft.fos.ffse.entity.SExpense;
import com.hitisoft.fos.ffse.entity.SInvoice;
import com.hitisoft.fos.ffse.entity.SInvoiceItem;
import com.hitisoft.fos.ffse.entity.SVoucher;
import com.hitisoft.fos.ffse.entity.SVoucherItem;
import com.hitisoft.fos.util.Constants;
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
import com.hitisoft.fw.util.TimeUtil;

@Service
public class SVoucherService {
	@Autowired
	private SVoucherDao dao;
	@Autowired
	private SVoucherItemDao itemDao;
	@Autowired
	private SInvoiceDao invoiceDao;
	@Autowired
	private SInvoiceItemDao invoiceItemDao;
	@Autowired
	private SExpenseDao expenseDao;
	@Autowired
	private FConsignDao consignDao;
	@Autowired
	private SBalanceDao balanceDao;
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
		String voucNo = null;
		Set<Long> invoiceSet = new HashSet<Long>();
		Set<Long> invoiceItemSet = new HashSet<Long>();
		Set<Long> expenseSet = new HashSet<Long>();
		Set<Long> consignSet = new HashSet<Long>();
		// handle parent first
		for (Object obj : entityList) {
			if (obj instanceof SVoucher) {
				SVoucher entity = (SVoucher) obj;
				switch (entity.getRowAction()) {
				case N:
					entity.setId(null);
					Map<String, String> paramMap = new HashMap<String, String>();
					paramMap.put(SerialFactory.RULE_RP, entity.getVoucType());
					String no = serialFactory.getSerial("voucher_no", paramMap);
					entity.setVoucNo(no);
					dao.add(entity);
					retList.add(entity);
					break;
				case M:
					retList.add(dao.update(entity));
					break;
				case R:
					SVoucher delEntity = dao.findById(entity.getId());
					delEntity.setRowAction(RowAction.R);
					dao.update(delEntity);
					List<SVoucherItem> list = itemDao.findByProperty("voucId", "" + entity.getId());
					for (SVoucherItem voucherItem : list) {
						voucherItem.setRowAction(RowAction.R);
						itemDao.update(voucherItem);
						invoiceItemSet.add(voucherItem.getInitId().longValue());
						invoiceSet.add(voucherItem.getInvoId().longValue());
						expenseSet.add(voucherItem.getExpeId().longValue());
						consignSet.add(voucherItem.getConsId().longValue());
					}
					// //删除核销单, 要恢复发票和费用的状态
					// cancelVoucher(entity.getVoucId());
					break;
				default:
					throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
				}
				parentId = entity.getId();
				voucNo = entity.getVoucNo();
				break;
			}
		}

		// handle child
		for (Object obj : entityList) {
			if (obj instanceof SVoucherItem) {
				SVoucherItem entity = (SVoucherItem) obj;
				switch (entity.getRowAction()) {
				case N:
					entity.setId(null);
					entity.setVoucId(parentId.intValue());
					entity.setVoucNo(voucNo);
					itemDao.add(entity);
					retList.add(entity);
					break;
				case M:
					retList.add(itemDao.update(entity));
					break;
				case R:
					SVoucherItem delEntity = itemDao.findById(entity.getId());
					delEntity.setRowAction(RowAction.R);
					itemDao.update(delEntity);
					break;
				default:
					throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
				}
				// 需要更新的发票明细
				invoiceItemSet.add(entity.getInitId().longValue());
				// 需要更新的发票和费用行
				invoiceSet.add(entity.getInvoId().longValue());
				expenseSet.add(entity.getExpeId().longValue());
				// 需要更新的委托
				consignSet.add(entity.getConsId().longValue());
			}
		}
		for (Long id : invoiceItemSet) {
			SInvoiceItem invoiceItem = invoiceItemDao.findById(id);
			syncInvoiceItem(invoiceItem);
			invoiceItemDao.update(invoiceItem);
		}
		for (Long id : invoiceSet) {
			SInvoice invoice = invoiceDao.findById(id);
			syncInvoice(invoice);
			invoiceDao.update(invoice);
		}
		for (Long id : expenseSet) {
			SExpense expense = expenseDao.findById(id);
			syncExpense(expense);
			expenseDao.update(expense);
		}
		/*for (Long id : consignSet) {
			FConsign consign = consignDao.findById(id);
			syncConsign(consign);
			consignDao.update(consign);
		}*/
		if (parentId != null) {
			SVoucher voucher = dao.findById(parentId);
			sumBalance(voucher);
		}
		return retList;
	}

	private void sumBalance(SVoucher voucher) {
		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put("custId", "" + voucher.getCustId());
		queryMap.put("currCode", voucher.getCurrCode());
		List<SBalance> list = balanceDao.findByProperties(queryMap);
		List<HtQuery> conditions = new ArrayList<HtQuery>();
		conditions.add(new HtQuery("voucStatus", SqlOp.notEqual, String.valueOf(Constants.INVOICE_STATUS_CANCELLED)));
		Double fixAmount = dao.getBalance(conditions, queryMap);
		if (list.size() == 1) {
			SBalance balance = list.get(0);
			balance.setBalaAmount(new BigDecimal(fixAmount));
			balanceDao.update(balance);
		} else if (fixAmount != null && !new Double(0).equals(fixAmount)) {
			SBalance balance = new SBalance();
			balance.setCustId(voucher.getCustId());
			balance.setCustName(voucher.getCustName());
			balance.setCustSname(voucher.getCustSname());
			balance.setCurrCode(voucher.getCurrCode());
			balance.setBalaAmount(new BigDecimal(fixAmount));
			balanceDao.add(balance);
		}
	}

	/**
	 * 计算核销状态
	 * 
	 * @param amount
	 * @param amountWriteOff
	 * @return
	 */
	private Byte caclWriteOffStatus(Double amount, Double amountWriteOff) {
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

	/**
	 * 核销, 需要更新费用的核销金额, 核销状态
	 * 
	 * @param expense
	 */
	@Transactional
	private void syncExpense(SExpense expense) {
		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put("expeId", "" + expense.getId());
		queryMap.put("voitCancelFlag", ConstUtil.FalseStr);
		List<SVoucherItem> list = itemDao.findByProperties(queryMap);
		BigDecimal writeOffAmount = new BigDecimal(0);
		BigDecimal writeOffRcAmount = new BigDecimal(0);
		for (SVoucherItem item : list) {
			if (item.getVoitAmountOriW() != null) {
				writeOffAmount = writeOffAmount.add(item.getVoitAmountOriW());
			}
			if (item.getVoitAmountW() != null && item.getInitExRate() != null) {
				writeOffRcAmount = writeOffAmount.add(item.getVoitAmountW().multiply(item.getInitExRate()));
			}
		}
		expense.setExpeWriteOffAmount(writeOffAmount);
		Byte status = caclWriteOffStatus(expense.getExpeTotalAmount().doubleValue(), writeOffAmount.doubleValue());
		expense.setExpeWriteoffStatus(status);
		expense.setExpeWriteOffRcAmount(writeOffRcAmount);
		expense.setExpeWriteOffDate(TimeUtil.getNow());
		expense.setExpeWriteOffBy(sessionContext.getUsername());
	}

	/**
	 * 核销, 需要更新发票的核销金额, 核销状态, 核销单号等字段
	 * 
	 * @param invoice
	 */
	@Transactional
	private void syncInvoice(SInvoice invoice) {
		// 更新发票的核销单号, 核销金额
		invoice.setInvoWriteOffBy(sessionContext.getUserid().intValue());
		invoice.setInvoWriteOffDate(TimeUtil.getNow());

		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put("invoId", "" + invoice.getId());
		queryMap.put("initCancelFlag", ConstUtil.FalseStr);
		List<SInvoiceItem> list = invoiceItemDao.findByProperties(queryMap);
		String vouc = "";
		String writeOffNo = "";
		Double writeOffAmount = new Double(0);
		Set<String> voucNoSet = new HashSet<String>();
		Set<String> writeOffNoSet = new HashSet<String>();
		for (SInvoiceItem invoiceItem : list) {
			if (invoiceItem.getVoucNo() != null && !voucNoSet.contains(invoiceItem.getVoucNo())) {
				vouc += invoiceItem.getVoucNo() + ConstUtil.COMMA;
				voucNoSet.add(invoiceItem.getVoucNo());
			}
			if (invoiceItem.getInitWriteOffNo() != null && !writeOffNoSet.contains(invoiceItem.getInitWriteOffNo())) {
				writeOffNo += invoiceItem.getInitWriteOffNo() + ConstUtil.COMMA;
				writeOffNoSet.add(invoiceItem.getInitWriteOffNo());
			}
			if (invoiceItem.getInitInvoiceAmountW() != null) {
				writeOffAmount += invoiceItem.getInitInvoiceAmountW().doubleValue();
			}
		}
		if (vouc.endsWith(ConstUtil.COMMA)) {
			vouc = vouc.substring(0, vouc.length() - 1);
		}
		if (writeOffNo.endsWith(ConstUtil.COMMA)) {
			writeOffNo = writeOffNo.substring(0, writeOffNo.length() - 1);
		}
		invoice.setVoucNo(vouc);
		invoice.setInvoWriteOffNo(writeOffNo);
		invoice.setInvoAmountWriteOff(new BigDecimal(writeOffAmount));
		// 核销状态
		Byte status = caclWriteOffStatus(invoice.getInvoAmountWriteOff().doubleValue(), writeOffAmount);
		invoice.setInvoWriteOffStatus(status.intValue());
	}

	/**
	 * 核销, 需要更新发票明细的核销号, 核销单号, 核销金额等字段
	 * 
	 * @param entity
	 */
	@Transactional
	private void syncInvoiceItem(SInvoiceItem invoiceItem) {
		invoiceItem.setInitWriteOffBy(sessionContext.getUserid().intValue());
		invoiceItem.setInitWriteOffDate(TimeUtil.getNow());

		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put("initId", "" + invoiceItem.getId());
		queryMap.put("voitCancelFlag", ConstUtil.FalseStr);
		List<SVoucherItem> list = itemDao.findByProperties(queryMap);
		String writeOffNo = "";
		String voucNo = "";
		Double amountOriW = new Double(0);
		Double amountW = new Double(0);
		Set<String> voucNoSet = new HashSet<String>();
		Set<String> writeOffNoSet = new HashSet<String>();
		for (SVoucherItem voucherItem : list) {
			// 拼多个核销号和核销单号
			if (voucherItem.getVoitWriteOffNo() != null && !writeOffNoSet.contains(voucherItem.getVoitWriteOffNo())) {
				writeOffNo += voucherItem.getVoitWriteOffNo() + ConstUtil.COMMA;
				writeOffNoSet.add(voucherItem.getVoitWriteOffNo());
			}
			if (voucherItem.getVoucNo() != null && !voucNoSet.contains(voucherItem.getVoucNo())) {
				voucNo += voucherItem.getVoucNo() + ConstUtil.COMMA;
				voucNoSet.add(voucherItem.getVoucNo());
			}
			// 累加核销金额
			if (voucherItem.getVoitAmountOriW() != null) {
				amountOriW += voucherItem.getVoitAmountOriW().doubleValue();
			}
			if (voucherItem.getVoitAmountW() != null) {
				amountW += voucherItem.getVoitAmountW().doubleValue();
			}
		}
		if (voucNo.endsWith(ConstUtil.COMMA)) {
			voucNo = voucNo.substring(0, voucNo.length() - 1);
		}
		if (writeOffNo.endsWith(ConstUtil.COMMA)) {
			writeOffNo = writeOffNo.substring(0, writeOffNo.length() - 1);
		}
		invoiceItem.setVoucNo(voucNo);
		invoiceItem.setInitWriteOffNo(writeOffNo);
		invoiceItem.setInitInvoiceAmountOriW(new BigDecimal(amountOriW));
		invoiceItem.setInitInvoiceAmountW(new BigDecimal(amountW));
		// 核销状态
		Byte status = caclWriteOffStatus(invoiceItem.getInitInvoiceAmount().doubleValue(), amountW);
		invoiceItem.setInitWriteOffStatus(status);
	}

	/**
	 * 核销, 需要更新委托的核销状态和核销时间
	 * 
	 * @param consign
	 */
	@Transactional
	private void syncConsign(FConsign consign) {
		List<SExpense> expenseList = expenseDao.findByProperty("consId", "" + consign.getId());
		Byte statusAr = Constants.EXPENSE_INVOICE_STATUS_NONE;
		Byte statusAp = Constants.EXPENSE_INVOICE_STATUS_NONE;

		boolean hasCheckedAr = false;
		boolean hasNotCheckedAr = false;
		boolean hasCheckedAp = false;
		boolean hasNotCheckedAp = false;
		for (SExpense expense : expenseList) {
			if (Constants.PR_TYPE_RECEIVE.equals(expense.getExpeType())) {
				if (Constants.EXPENSE_INVOICE_STATUS_FULL.equals(expense.getExpeWriteoffStatus())) {
					hasCheckedAr = true;
				} else if (Constants.EXPENSE_INVOICE_STATUS_PART.equals(expense.getExpeWriteoffStatus())) {
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
				if (Constants.EXPENSE_INVOICE_STATUS_FULL.equals(expense.getExpeWriteoffStatus())) {
					hasCheckedAp = true;
				} else if (Constants.EXPENSE_INVOICE_STATUS_PART.equals(expense.getExpeWriteoffStatus())) {
					hasCheckedAp = true;
					hasNotCheckedAp = true;
					break;
				} else {
					hasNotCheckedAp = true;
				}
			}
		}
		// 有核销 + 有未核销 = 部分核销
		// 有核销 + 无未核销 = 全部核销
		// 其他 = 未核销
		if (hasCheckedAr && hasNotCheckedAr) {
			statusAr = Constants.EXPENSE_INVOICE_STATUS_PART;
		} else if (hasCheckedAr && !hasNotCheckedAr) {
			statusAr = Constants.EXPENSE_INVOICE_STATUS_FULL;
		}
		consign.setConsStatusAr(statusAr);

		if (hasCheckedAp && hasNotCheckedAp) {
			statusAp = Constants.EXPENSE_INVOICE_STATUS_PART;
		} else if (hasCheckedAp && !hasNotCheckedAp) {
			statusAp = Constants.EXPENSE_INVOICE_STATUS_FULL;
		}
		consign.setConsStatusAp(statusAp);
	}

	@Transactional
	public void updateStatus() {
		Long id = Long.valueOf(requestContext.get("id"));
		Byte status = Byte.valueOf(requestContext.get("voucStatus"));
		SVoucher entity = dao.findById(id);
		if (entity != null) {
			entity.setVoucStatus(status);
			if (Constants.INVOICE_STATUS_CHECKED.equals(status)) {
				entity.setVoucChecker(sessionContext.getUserid().intValue());
				entity.setVoucCheckDate(TimeUtil.getNow());
			}
			dao.update(entity);
		}
	}

	@Transactional(readOnly = true)
	public List<SVoucher> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional(readOnly = true)
	public List query() {
		List retList = new ArrayList();
		retList.addAll(dao.findByProperties());
		if (requestContext.containsKey(Constants.PARAM_EAGER)) {
			retList.addAll(itemDao.findByProperties());
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<SVoucherItem> queryItem() {
		return itemDao.findByProperties();
	}

	@Transactional
	public void cancelVoucher() {
		Long voucId = Long.valueOf(requestContext.get("voucId"));
		cancelVoucher(voucId);
	}

	private void cancelVoucher(Long voucId) {
		SVoucher voucher = dao.findById(voucId);
		voucher.setVoucStatus(Constants.INVOICE_STATUS_CANCELLED);
		dao.update(voucher);
		// 更新voucherItem的作废状态
		List<SVoucherItem> list = itemDao.findByProperty("voucId", "" + voucId);
		Set<Long> invoiceSet = new HashSet<Long>();
		Set<Long> invoiceItemSet = new HashSet<Long>();
		Set<Long> expenseSet = new HashSet<Long>();
		for (SVoucherItem voucherItem : list) {
			voucherItem.setVoitCancelFlag(ConstUtil.TrueByte);
			itemDao.update(voucherItem);
			// 需要更新的发票明细,发票和费用行
			invoiceItemSet.add(voucherItem.getInitId().longValue());
			invoiceSet.add(voucherItem.getInvoId().longValue());
			expenseSet.add(voucherItem.getExpeId().longValue());
		}
		for (Long id : invoiceItemSet) {
			SInvoiceItem invoiceItem = invoiceItemDao.findById(id);
			syncInvoiceItem(invoiceItem);
			invoiceItemDao.update(invoiceItem);
		}
		for (Long id : invoiceSet) {
			SInvoice invoice = invoiceDao.findById(id);
			syncInvoice(invoice);
			invoiceDao.update(invoice);
		}
		for (Long id : expenseSet) {
			SExpense expense = expenseDao.findById(id);
			syncExpense(expense);
			expenseDao.update(expense);
		}
	}

}
