package com.hitisoft.fos.ffop.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.dao.FDocDao;
import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.ffop.entity.FDoc;
import com.hitisoft.fos.ffse.dao.SExpenseDao;
import com.hitisoft.fos.ffse.dao.SVoucherItemDao;
import com.hitisoft.fos.ffse.entity.SExpense;
import com.hitisoft.fos.sys.dao.PCompanyConfigDao;
import com.hitisoft.fos.sys.entity.PCompanyConfig;
import com.hitisoft.fos.sys.entity.PMessageSubscribe;
import com.hitisoft.fos.sys.entity.PMessageTopic;
import com.hitisoft.fos.sys.service.PMessageService;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.SqlOp;
import com.hitisoft.fw.service.DaemonService;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.StringUtil;

@Service
public class FDocService extends DaemonService {
	@Autowired
	private FDocDao dao;
	@Autowired
	private SExpenseDao expenseDao;
	@Autowired
	private SVoucherItemDao voucherItemDao;
	@Autowired
	private PCompanyConfigDao companyConfigDao;
	@Autowired
	private PMessageService messageService;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;

	@Transactional
	public List<FDoc> save(List<FDoc> consignList) {
		return dao.saveByRowAction(consignList);
	}

	@Transactional(readOnly = true)
	public List<FDoc> query() {
		return dao.findByProperties();
	}

	@Transactional
	public void updateStatus() {
		Byte status = Byte.valueOf(requestContext.get("fdocStatus"));
		String ids = requestContext.get("fdocId");
		String[] idArray = ids.split(",");
		for (String strId : idArray) {
			if (StringUtil.isNotBlank(strId)) {
				Long id = Long.valueOf(strId);
				FDoc entity = dao.findById(id);
				entity.setFdocStatus(status);
				dao.update(entity);
			}
		}
	}

	@SuppressWarnings("unchecked")
	@Transactional
	public void updateReleasableFlag() {
		setup();
		// 这个公司是否需要自动放单
		List<HtQuery> conditionList = new ArrayList<HtQuery>();
		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put(Constants.COMCF_KEY, Constants.COMCF_CONS_LOCK_DAYS);
		List<PCompanyConfig> list = companyConfigDao.findByProperties(queryMap);
		for (PCompanyConfig companyConfig : list) {
			if ("N".equalsIgnoreCase(companyConfig.getCocoValue())) {
				return;
			}
			sessionContext.setCompCode(companyConfig.getCompCode());
			// 根据当天的核销明细VoucherItem, 查到客户ID和此客户今天核销的委托最晚开航时间
			conditionList.clear();
			queryMap.clear();
			List<Object> objList = (List<Object>) voucherItemDao.complexQueryCust(conditionList);
			for (Object obj : objList) {
				if (obj instanceof Object[]) {
					Object[] objArray = (Object[]) obj;
					Integer custId = (Integer) objArray[0];
					Date consSailDate = (Date) objArray[1];
					conditionList.clear();
					conditionList.add(new HtQuery("custId", SqlOp.equal, "" + custId));
					conditionList.add(new HtQuery("expeType", SqlOp.equal, "R"));
					conditionList.add(new HtQuery("t2.consSailDate", SqlOp.lessEqual, StringUtil
							.date2String(consSailDate)));
					queryMap.clear();
					// 然后查此客户, 这个开航时间之前的所有委托的费用是否已经核销
					List<SExpense> expenseList = expenseDao.complexQueryRelease(conditionList, queryMap);
					boolean isPayed = false;
					for (SExpense expense : expenseList) {
						// 如果有一个没有核销, 直接跳过
						if (!Constants.EXPENSE_INVOICE_STATUS_FULL.equals(expense.getExpeWriteoffStatus())) {
							isPayed = false;
							break;
						}
						isPayed = true;
					}
					// 如果全部核销, 这个客户的所有委托的所有需要放单的单证, 把放单状态更新一下
					if (isPayed) {
						queryMap.clear();
						conditionList.clear();
						queryMap.put("custId", "" + custId);
						List<FDoc> docList = dao.complexQueryNeedRelease(conditionList, queryMap);
						for (FDoc doc : docList) {
							doc.setFdocReleasableFlag(ConstUtil.TrueByte);
							dao.update(doc);
						}
					}
				}
			}
		}
	}

	@SuppressWarnings({ "rawtypes" })
	@Transactional(readOnly = true)
	public List<FDoc> complexQuery(List<HtQuery> conditions) {
		List<FDoc> retList = new ArrayList<FDoc>();
		List objList = dao.complexQuery(conditions);
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;
				FDoc doc = (FDoc) objArray[0];
				FConsign consign = (FConsign) objArray[1];
				doc.setVessName(consign.getVessName());
				doc.setVoyaName(consign.getVoyaName());
				doc.setConsMblNo(consign.getConsMblNo());
				doc.setCustName(consign.getCustName());
				doc.setConsSailDate(consign.getConsSailDate());
				doc.setConsCargoOwnerName(consign.getConsCargoOwnerName());
				retList.add(doc);
			}
		}
		return retList;
	}

	@Transactional
	public void alertWriteOffDoc(PMessageTopic topic, PMessageSubscribe subscribe, FDoc doc) {
		messageService.buildMsg(topic, subscribe, doc);
		doc.setAlertFlag(ConstUtil.TrueByte);
		dao.update(doc);
	}
}
