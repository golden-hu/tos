package com.hitisoft.fos.ffop.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hitisoft.fos.ffop.dao.FConsignDao;
import com.hitisoft.fos.ffop.dao.FDocDao;
import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.ffop.entity.FDoc;
import com.hitisoft.fos.sys.dao.PMessageSubscribeDao;
import com.hitisoft.fos.sys.dao.PMessageTopicDao;
import com.hitisoft.fos.sys.entity.PMessageSubscribe;
import com.hitisoft.fos.sys.entity.PMessageTopic;
import com.hitisoft.fos.sys.service.PMessageService;
import com.hitisoft.fos.util.CompanyConfigUtil;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.SqlOp;
import com.hitisoft.fw.service.DaemonService;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.StringUtil;
import com.hitisoft.fw.util.TimeUtil;

@Service
public class FfopScheduleService extends DaemonService {
	@Autowired
	private FDocDao docDao;
	@Autowired
	private PMessageTopicDao topicDao;
	@Autowired
	private PMessageSubscribeDao subscribeDao;
	@Autowired
	private FDocService docService;
	@Autowired
	private PMessageService messageService;
	@Autowired
	private FConsignDao consignDao;
	@Autowired
	private SessionContext sessionContext;

	public void alertSalesOverdue() {
		setup();
		// 查询有客户超期严重的业务员
		// (委托从开船日期算,超过公司配置的最大应收账款天数,应收没有完全核销的)
		List<PMessageTopic> topicList = getTopics(Constants.QUARTZ_CONS_ALERT_SALES);
		for (PMessageTopic topic : topicList) {
			sessionContext.setCompCode(topic.getCompCode());
			List<PMessageSubscribe> subscribeList = getSubscribe(topic.getId());
			if (subscribeList.size() <= 0)
				continue;
			List<FConsign> consignList = getNeedAlertSales();
			for (PMessageSubscribe subscribe : subscribeList) {
				for (FConsign consign : consignList) {
					messageService.buildMsg(topic, subscribe, consign);
				}
			}
		}
	}

	private List<FConsign> getNeedAlertSales() {
		int dateDue = 30;
		String strDateDue = CompanyConfigUtil.getCompanyConfig(Constants.COMCF_CONS_AR_OVERDUE_DAYS);
		if (StringUtil.isNotBlank(strDateDue))
			dateDue = Integer.parseInt(strDateDue);
		List<Object> objList = consignDao.complexQueryOverDueSales(dateDue);
		Map<Long, String> blNoMap = new HashMap<Long, String>();
		Map<Long, String> salesMap = new HashMap<Long, String>();
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;
				Long salesId = (Long) objArray[0];
				String salesName = (String) objArray[1];
				String blNo = (String) objArray[2];
				String oldNo = blNoMap.get(salesId);
				if (oldNo != null)
					blNo = oldNo + ConstUtil.COMMA + blNo;
				blNoMap.put(salesId, blNo);
				if (StringUtil.isNotBlank(salesMap.get(salesId)))
					salesMap.put(salesId, salesName);
			}
		}
		// 该业务员的所有客户的提单
		List<FConsign> retList = new ArrayList<FConsign>();
		for (Long salesId : blNoMap.keySet()) {
			String blNo = blNoMap.get(salesId);
			String salesName = salesMap.get(salesId);
			FConsign consign = new FConsign();
			consign.setConsSalesRepId(salesId);
			consign.setConsSalesRepName(salesName);
			consign.setConsMblNo(blNo);
			retList.add(consign);
		}
		return retList;
	}

	public void alertWriteOffDoc() {
		setup();
		// 找到核销单提醒的消息主题
		List<PMessageTopic> topicList = getTopics(Constants.QUARTZ_FDOC_ALERT_WRITEOFF);
		for (PMessageTopic topic : topicList) {
			sessionContext.setCompCode(topic.getCompCode());
			// 找到该消息主题的订阅人列表
			List<PMessageSubscribe> subscribeList = getSubscribe(topic.getId());
			// 找到所有开航30天，未退的核销单
			List<FDoc> docList = getNeedAlertDocs();
			// 循环核销单列表，根据每个核销单&消息主题&订阅人，生成消息
			for (PMessageSubscribe subscribe : subscribeList) {
				for (FDoc doc : docList) {
					docService.alertWriteOffDoc(topic, subscribe, doc);
				}
			}
		}
	}

	private List<PMessageTopic> getTopics(String code) {
		Map<String, String> querymap = new HashMap<String, String>();
		querymap.put("actName", code);
		return topicDao.findByProperties(querymap);
	}

	private List<PMessageSubscribe> getSubscribe(Long topicId) {
		Map<String, String> querymap = new HashMap<String, String>();
		querymap.put("metoId", "" + topicId);
		return subscribeDao.findByProperties(querymap);
	}

	private List<FDoc> getNeedAlertDocs() {
		String ccId = CompanyConfigUtil.getCompanyConfig(Constants.COMCF_FDOC_CC);
		List<HtQuery> conditions = new ArrayList<HtQuery>();
		conditions.add(new HtQuery("dotyId", SqlOp.equal, ccId));
		conditions.add(new HtQuery("fdocBackFlag", SqlOp.equal, ConstUtil.FalseStr));
		conditions.add(new HtQuery("consSailDate", SqlOp.lessEqual, TimeUtil.addDate(-30)));
		List<FDoc> docList = docDao.complexQueryNeedAlert(conditions);
		return docList;
	}
}
