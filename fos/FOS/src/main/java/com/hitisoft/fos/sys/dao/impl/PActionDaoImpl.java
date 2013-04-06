package com.hitisoft.fos.sys.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.entity.PAction;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.service.Action;
import com.hitisoft.fw.service.ActionLoader;

@Repository
public class PActionDaoImpl extends JpaDao<PAction, Long> implements ActionLoader {
	public PActionDaoImpl() {
		super(PAction.class);
	}

	@Override
	public List<Action> getAll() {
		List<Action> list = new ArrayList<Action>();
		for (PAction fosAct : findAll()) {
			Action action = new Action();
			action.setId(fosAct.getId());
			action.setCode(fosAct.getActCode());
			action.setServiceName(fosAct.getActService());
			action.setMethod(fosAct.getActMethod());
			action.setRemark(fosAct.getActRemark());
			action.setDaemonFlag(fosAct.getActDaemonFlag());
			action.setLoginFlag(fosAct.getActLoginFlag());
			action.setSingletonFlag(fosAct.getActSingletonFlag());
			list.add(action);
		}
		return list;
	}
}
