package com.hitisoft.fw.service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.util.StringUtil;

@Component
public class ActionManager implements InitializingBean {
	private Map<String, Action> actionMap = new ConcurrentHashMap<String, Action>();
	@Autowired
	private ActionLoader loader;

	@Transactional(readOnly = true)
	private void load() {
		List<Action> actionList = loader.getAll();
		for (Action action : actionList) {
			actionMap.put(action.getCode().toLowerCase(), action);
		}
	}

	public Action getAction(String actionName) {
		if (StringUtil.isNotBlank(actionName))
			actionName = actionName.toLowerCase();
		if (actionMap.isEmpty()) {
			load();
		}
		Action action = actionMap.get(actionName);
		if (action == null) {
			load();
			action = actionMap.get(actionName);
		}
		if (action == null) {
			throw new BusinessException(ExceptionEnum.FW_SERVICE_NOT_FOUND, actionName);
		}
		return action;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		load();
	}
}
