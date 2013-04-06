package com.hitisoft.fos.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PActionLogDao;
import com.hitisoft.fos.sys.entity.PActionLog;
import com.hitisoft.fos.sys.service.PTableInfoService;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.reflect.MethodUtil;
import com.hitisoft.fw.service.ActionManager;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.spring.SpringContextHolder;
import com.hitisoft.fw.util.StringUtil;
import com.hitisoft.fw.util.TimeUtil;

@Component
public class ActionLogUtil {
	Logger logger = LoggerFactory.getLogger(getClass());
	@Autowired
	private PActionLogDao logDao;
	@Autowired
	private PTableInfoService tableInfoService;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private ActionManager actionManager;

	public static void log() {
		ActionLogUtil actLogUtil = SpringContextHolder.getBean(ActionLogUtil.class);
		actLogUtil.saveActLog();
	}

	@Transactional
	public void saveActLog(PActionLog... actLogs) {
		PActionLog actLog = null;
		if (actLogs.length > 0) {
			actLog = actLogs[0];
		} else {
			actLog = new PActionLog();
		}
		actLog.setId(null);
		String actName = requestContext.get(ContextKey.actionName.get());
		actLog.setAcloActName(actName);
		actLog.setAcloActRemark(actionManager.getAction(actName).getRemark());
		actLog.setAcloIp(sessionContext.getHostname());
		actLog.setAcloUserId(sessionContext.getUserid().intValue());
		actLog.setAcloUserName(sessionContext.getUsername());
		actLog.setCompCode(sessionContext.getCompCode());
		actLog.setCreateTime(TimeUtil.getNow());
		actLog.setRowAction(RowAction.N);
		logDao.add(actLog);
	}

	@Transactional
	public void saveActionLog(Object entity) {
		PActionLog actLog = new PActionLog();
		String clazzName = entity.getClass().getSimpleName();
		actLog.setAcloTable(clazzName);
		try {
			actLog.setAcloTid((Integer) MethodUtil.doGetMethod(entity, tableInfoService.getId(clazzName)));
			if (StringUtil.isNotBlank(tableInfoService.getNo(clazzName))) {
				Object no = MethodUtil.doGetMethod(entity, tableInfoService.getNo(clazzName));
				String strNo = null;
				if (no instanceof String) {
					strNo = (String) no;
				} else if (no instanceof Integer) {
					strNo = String.valueOf((Integer) no);
				}
				actLog.setAcloTno(strNo);
			}
		} catch (Exception e) {
			logger.info("Action Log, can't get object primary key or business No!");
		}
		saveActLog(actLog);
	}
}
