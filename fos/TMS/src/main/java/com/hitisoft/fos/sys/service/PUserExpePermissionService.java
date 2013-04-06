package com.hitisoft.fos.sys.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GChargeClassDao;
import com.hitisoft.fos.general.entity.GChargeClass;
import com.hitisoft.fos.sys.dao.PUserExpePermissionDao;
import com.hitisoft.fos.sys.entity.PUserExpePermission;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;

@Service
public class PUserExpePermissionService {

	@Autowired
	private PUserExpePermissionDao dao;
	@Autowired
	private GChargeClassDao chargeClassDao;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;

	@Transactional
	public List<PUserExpePermission> save(List<PUserExpePermission> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<PUserExpePermission> query() {
		return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<PUserExpePermission> queryIncludeNotExist() {
		String userId = requestContext.get("userId");
		Map<String, String> map = new HashMap<String, String>();
		List<GChargeClass> chclList = chargeClassDao.findByProperties(map);
		List<PUserExpePermission> existList = dao.findByProperties(requestContext);

		// 先加入已经存在的记录
		List<PUserExpePermission> retList = new ArrayList<PUserExpePermission>();
		retList.addAll(existList);

		// 现在已经存在的记录id+收付标志
		Set<String> chclSet = new HashSet<String>();
		for (PUserExpePermission item : existList) {
			chclSet.add(item.getExpeType() + item.getChclId());
		}
		// 现在不存在的记录，加虚拟记录
		for (GChargeClass chargeClass : chclList) {
			// 应收
			if (!chclSet.contains(Constants.PR_TYPE_RECEIVE + chargeClass.getId())) {
				PUserExpePermission entity = newPermission(chargeClass);
				entity.setUserId(Integer.parseInt(userId));
				entity.setExpeType(Constants.PR_TYPE_RECEIVE);
				retList.add(entity);
			}
			// 应付
			if (!chclSet.contains(Constants.PR_TYPE_PAY + chargeClass.getId())) {
				PUserExpePermission entity = newPermission(chargeClass);
				entity.setUserId(Integer.parseInt(userId));
				entity.setExpeType(Constants.PR_TYPE_PAY);
				retList.add(entity);
			}
		}
		// ID=0的单条记录，表示所有费用，要同样判断
		// 应收
		if (!chclSet.contains(Constants.PR_TYPE_RECEIVE + "0")) {
			PUserExpePermission entity = newPermission(0L, Constants.SYS_USEP_FEE_ALL);
			entity.setUserId(Integer.parseInt(userId));
			entity.setExpeType(Constants.PR_TYPE_RECEIVE);
			retList.add(entity);
		}
		// 应付
		if (!chclSet.contains(Constants.PR_TYPE_PAY + "0")) {
			PUserExpePermission entity = newPermission(0L, Constants.SYS_USEP_FEE_ALL);
			entity.setUserId(Integer.parseInt(userId));
			entity.setExpeType(Constants.PR_TYPE_PAY);
			retList.add(entity);
		}
		return retList;
	}

	private PUserExpePermission newPermission(GChargeClass chargeClass) {
		return newPermission(chargeClass.getId(), chargeClass.getChclName());
	}

	private PUserExpePermission newPermission(Long chclId, String chclName) {
		PUserExpePermission entity = new PUserExpePermission();
		entity.setId(null);
		entity.setChclId(chclId.intValue());
		entity.setChclName(chclName);
		entity.setUsepEditable(ConstUtil.FalseByte);
		entity.setUsepViewAll(ConstUtil.FalseByte);
		entity.setUsepEditAll(ConstUtil.FalseByte);
		entity.setCompCode(sessionContext.getCompCode());
		entity.setVersion(ConstUtil.FalseInt);
		entity.setRemoved(ConstUtil.FalseByte);
		entity.setRowAction(RowAction.N);
		return entity;
	}
}
