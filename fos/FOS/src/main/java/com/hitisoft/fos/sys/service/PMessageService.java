package com.hitisoft.fos.sys.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.sys.dao.PMessageDao;
import com.hitisoft.fos.sys.dao.PMessageSubscribeDao;
import com.hitisoft.fos.sys.dao.PMessageTopicDao;
import com.hitisoft.fos.sys.dao.PTemplateMapDao;
import com.hitisoft.fos.sys.dao.PUserDao;
import com.hitisoft.fos.sys.entity.PMessage;
import com.hitisoft.fos.sys.entity.PMessageSubscribe;
import com.hitisoft.fos.sys.entity.PMessageTopic;
import com.hitisoft.fos.sys.entity.PTemplateMap;
import com.hitisoft.fos.sys.entity.PUser;
import com.hitisoft.fos.util.ConfigUtil;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fos.util.MailManager;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.reflect.MethodUtil;
import com.hitisoft.fw.service.DaemonService;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.StringUtil;
import com.hitisoft.fw.util.TimeUtil;

@Service
public class PMessageService extends DaemonService {
	private Logger logger = LoggerFactory.getLogger(PMessageService.class);
	private Map<String, List<PMessageTopic>> topicMap = new ConcurrentHashMap<String, List<PMessageTopic>>();
	private Map<Long, List<PMessageSubscribe>> subscMap = new ConcurrentHashMap<Long, List<PMessageSubscribe>>();

	@Autowired
	private PMessageDao dao;
	@Autowired
	private PMessageTopicDao topicDao;
	@Autowired
	private PMessageSubscribeDao subscribeDao;
	@Autowired
	private PTemplateMapDao mapDao;
	@Autowired
	private PUserDao userDao;
	@Autowired
	private MailManager mailManager;
	@Autowired
	private PTableInfoService tableInfoService;
	@Autowired
	private PTemplateService templateService;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private ConfigUtil configUtil;

	@Transactional
	public List<PMessage> save(List<PMessage> entityList) {
		List<PMessage> retList = new ArrayList<PMessage>();
		for (PMessage entity : entityList) {
			switch (entity.getRowAction()) {
			case N:
				entity.setId(null);
				entity.setMessCreateTime(new Date());
				if (entity.getMessType() == Constants.MESS_TYPE_EMAIL
						|| entity.getMessType() == Constants.MESS_TYPE_FAX) {
					entity.setMessSendFlag(ConstUtil.FalseByte);
					PUser user = userDao.findById(sessionContext.getUserid());
					// 发件人
					if (StringUtil.isNotBlank(user.getUserEmail())) {
						entity.setMessFrom(user.getUserEmail());
					} else {
						String sender = configUtil.getMailSender();
						if (StringUtil.isBlank(sender)) {
							sender = "fos";
						}
						entity.setMessFrom(sender);
					}
					// 传真收件人=传真号码<传真邮件账号>
					if (entity.getMessType() == Constants.MESS_TYPE_FAX) {
						String sender = configUtil.getFaxSender();
						sender = entity.getMessTo() + "<" + sender + ">";
						entity.setMessTo(sender);
					}
					// 附件
					if (requestContext.containsKey(Constants.TEMP_PARAM_ID)) {
						String fileName = templateService.exportTemplate(null);
						if (StringUtil.isNotBlank(fileName)) {
							entity.setMessAttachment(StringUtil.ascii2utf8(fileName));
						}
					}
					entity.setMessFromUserId(user.getId().intValue());
					entity.setMessFromUserName(user.getUserName());
				}
				dao.add(entity);
				retList.add(entity);
				break;
			case M:
			case R:
				dao.saveByRowActionSolo(entity);
				break;
			default:
				throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<PMessage> query() {
		return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<PMessage> queryOwn() {
		return dao.queryOwn();
	}

	public void send() {
		Map<String, String> queryMap = new HashMap<String, String>();
		setup();
		requestContext.put(ContextKey.actionName.get(), Constants.ACT_DAEMON);
		queryMap.put("messSendFlag", ConstUtil.FalseStr);

		queryMap.put("messType", "" + Constants.MESS_TYPE_EMAIL);
		send(queryMap);

		queryMap.put("messType", "" + Constants.MESS_TYPE_FAX);
		send(queryMap);
	}

	private void send(Map<String, String> queryMap) {
		List<PMessage> messList = dao.findByProperties(queryMap);
		logger.info("get queue messages");
		for (PMessage message : messList) {
			try {
				mailManager.sendEmail(message);
			} catch (BusinessException e) {
				logger.error("mail send failed!");
			}
		}
	}

	public void clearSubscribeMap() {
		subscMap.clear();
	}

	@Transactional
	public void triggerMessage(Object entity) {
		String actName = requestContext.get(ContextKey.actionName.get());
		String compCode = sessionContext.getCompCode();
		if (topicMap.size() == 0)
			initTopicMap();
		if (subscMap.size() == 0)
			initSubscribeMap();

		if (topicMap.containsKey(actName)) {
			List<PMessageTopic> list = topicMap.get(actName);
			for (PMessageTopic topic : list) {
				List<PMessageSubscribe> mailList = new ArrayList<PMessageSubscribe>();
				if (compCode.equals(topic.getCompCode())) {
					List<PMessageSubscribe> list2 = subscMap.get(topic.getId());
					// 循环订阅列表
					if (list2 != null) {
						for (PMessageSubscribe subscribe : list2) {
							if (subscribe.getMesuSubscriberType() == Constants.MESU_TYPE_USER
									&& subscribe.getMesuMailFlag() == ConstUtil.TrueByte) {
								mailList.add(subscribe);
							} else {
								buildMsg(topic, subscribe, entity);
							}
						}
						// 如果是邮件, 要合并成一条邮件, 用户可以回复所有
						if (mailList.size() > 1) {
							buildMsg(topic, mailList, entity);
						} else if (mailList.size() == 1) {
							buildMsg(topic, mailList.get(0), entity);
						}
					}
				}
			}
		}
	}

	/**
	 * 配船通知
	 * 
	 * @param topic
	 * @param mailList
	 * @param entity
	 */
	@Transactional
	public void buildMsg(PMessageTopic topic, List<PMessageSubscribe> mailList, Object entity) {
		FConsign consign = (FConsign) entity;
		String template = getBody(topic, entity);
		String email = "";
		for (PMessageSubscribe subscribe : mailList) {
			email += subscribe.getMesuSubscriberEmail() + ",";
		}
		String subject = "配船信息 -- " + consign.getVessName() + " " + consign.getVoyaName() + " ("
				+ consign.getConsCarrierName() + ") -- " + consign.getConsDeliveryPlace();
		PUser user = userDao.findById(sessionContext.getUserid());
		String fromEmail = user.getUserEmail();
		PMessage msg = new PMessage();
		msg.setId(null);
		msg.setMessType(Constants.MESS_TYPE_EMAIL);
		msg.setMessTo(email);
		msg.setMessSubject(subject);
		msg.setMessBody(template);
		msg.setMessFrom(fromEmail);
		msg.setMessCreateTime(TimeUtil.getNow());
		msg.setMessSendFlag(ConstUtil.FalseByte);
		msg.setMessFromUserId(user.getId().intValue());
		msg.setMessFromUserName(user.getUserName());
		msg.setMessToUserId(mailList.get(0).getMesuSubscriberId());
		msg.setMessToUserName(mailList.get(0).getMesuSubscriberName());
		dao.add(msg);
	}

	@Transactional
	public void buildMsg(PMessageTopic topic, PMessageSubscribe subscribe, Object entity) {
		// 把模板中的变量替换
		String template = getBody(topic, entity);
		byte type = subscribe.getMesuSubscriberType();
		byte mail = subscribe.getMesuMailFlag();
		byte im = subscribe.getMesuImFlag();
		Integer id = subscribe.getMesuSubscriberId();
		String name = subscribe.getMesuSubscriberName();
		String email = subscribe.getMesuSubscriberEmail();
		String subject = topic.getMetoName();
		if (type == Constants.MESU_TYPE_USER) {
			if (mail == ConstUtil.TrueByte) {
				buildMsg(subject, template, email, id, name, Constants.MESS_TYPE_EMAIL);
			}
			if (im == ConstUtil.TrueByte) {
				buildMsg(subject, template, name, id, name, Constants.MESS_TYPE_IM);
			}
		} else if (type == Constants.MESU_TYPE_ROLE) {
			String clazz = entity.getClass().getSimpleName();
			String fieldName = getFieldName(clazz, id);
			// 有这个字段
			if (StringUtil.isNotBlank(fieldName)) {
				Integer userId = (Integer) MethodUtil.doGetMethod(entity, fieldName);
				PUser user = userDao.findById(userId.longValue());
				name = user.getUserName();
				email = user.getUserEmail();
				if (mail == ConstUtil.TrueByte) {
					buildMsg(subject, template, email, userId, name, Constants.MESS_TYPE_EMAIL);
				}
				if (im == ConstUtil.TrueByte) {
					buildMsg(subject, template, name, userId, name, Constants.MESS_TYPE_IM);
				}
			}
		} else {
			// 外部客户
		}
	}

	private String getFieldName(String clazz, Integer id) {
		String fieldType = null;
		if (id == Constants.ROLE_OP) {
			fieldType = Constants.TABLE_FIELD_TYPE_OP;
		} else if (id == Constants.ROLE_SALES) {
			fieldType = Constants.TABLE_FIELD_TYPE_SALES;
		} else if (id == Constants.ROLE_DISPATCHER) {
			fieldType = Constants.TABLE_FIELD_TYPE_DISPATCHER;
		}
		String fieldName = tableInfoService.getFieldName(clazz, fieldType);
		return fieldName;
	}

	private void buildMsg(String subject, String template, String messTo, Integer userId, String userName, Byte messType) {
		// 如果是邮件,必须有接收地址
		if (StringUtil.isNotBlank(messTo) || messType != Constants.MESS_TYPE_EMAIL) {
			PMessage msg = new PMessage();
			msg.setId(null);
			msg.setMessType(messType);
			msg.setMessTo(messTo);
			msg.setMessSubject(subject);
			msg.setMessBody(template);
			msg.setMessFrom("fos");
			msg.setMessCreateTime(TimeUtil.getNow());
			msg.setMessSendFlag(ConstUtil.FalseByte);
			msg.setMessFromUserId(ConstUtil.FalseInt);
			msg.setMessFromUserName("fos");
			msg.setMessToUserId(userId);
			msg.setMessToUserName(userName);
			dao.add(msg);
		}
	}

	private String getBody(PMessageTopic topic, Object entity) {
		String template = topic.getMetoTemplate();
		Integer tetyId = topic.getTetyId();
		if (tetyId == null)
			return template;
		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put("tetyId", "" + tetyId);
		List<PTemplateMap> temaList = mapDao.findByProperties(queryMap);
		Map<String, PTemplateMap> temaMap = new HashMap<String, PTemplateMap>();
		for (PTemplateMap templateMap : temaList) {
			temaMap.put(templateMap.getTemaName(), templateMap);
		}
		while (StringUtil.contains(template, ConstUtil.STRING_LEFT_BRACE)) {
			int prefix = template.indexOf(ConstUtil.STRING_LEFT_BRACE);
			int suffix = template.indexOf(ConstUtil.STRING_RIGHT_BRACE);
			String key = template.substring(prefix + 1, suffix);
			PTemplateMap tema = temaMap.get(key);
			if (tema != null) {
				String field = tema.getTemaField();
				template = template.replaceAll("\\{" + key + "\\}", toString(MethodUtil.doGetMethod(entity, field)));
			} else {
				template = template.substring(0, prefix) + template.substring(suffix + 1);
			}
		}
		return template;
	}

	private void initSubscribeMap() {
		Map<String, String> queryMap = new HashMap<String, String>();
		List<PMessageSubscribe> subscribeList = subscribeDao.findByProperties(queryMap);
		for (PMessageSubscribe messageSubscribe : subscribeList) {
			List<PMessageSubscribe> list = subscMap.get(messageSubscribe.getMetoId().longValue());
			if (list == null) {
				list = new ArrayList<PMessageSubscribe>();
				subscMap.put(messageSubscribe.getMetoId().longValue(), list);
			}
			list.add(messageSubscribe);
		}
	}

	private void initTopicMap() {
		Map<String, String> queryMap = new HashMap<String, String>();
		List<PMessageTopic> topics = topicDao.findByProperties(queryMap);
		for (PMessageTopic topic : topics) {
			List<PMessageTopic> list = topicMap.get(topic.getActName());
			if (list == null) {
				list = new ArrayList<PMessageTopic>();
				topicMap.put(topic.getActName(), list);
			}
			list.add(topic);
		}
	}

	@SuppressWarnings("unused")
	private boolean checkRules(Object entity, String strRules) {
		String[] rules = strRules.split(ConstUtil.COMMA);
		for (String rule : rules) {
			String key = rule.substring(0, rule.indexOf("="));
			String value = rule.substring(rule.indexOf("=") + 1);
			if ("className".equals(key)) {
				if (!entity.getClass().getSimpleName().equals(value))
					return false;
			} else {
				Object retObj = MethodUtil.doGetMethod(entity, key);
				String strObj = toString(retObj);
				if (!value.equals(strObj)) {
					return false;
				}
			}
		}
		return true;
	}

	private String toString(Object retObj) {
		String strObj;
		if (retObj == null) {
			strObj = "";
		} else if (retObj instanceof String) {
			strObj = (String) retObj;
		} else if (retObj instanceof Short) {
			strObj = "" + (Short) retObj;
		} else if (retObj instanceof Integer) {
			strObj = "" + (Integer) retObj;
		} else if (retObj instanceof Date) {
			strObj = StringUtil.date2String((Date) retObj);
		} else {
			strObj = retObj.toString();
		}
		return strObj;
	}

}
