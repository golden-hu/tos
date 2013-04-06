package com.hitisoft.fos.ws.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.entity.CCustomer;
import com.hitisoft.fos.sys.service.CCustomerService;
import com.hitisoft.fos.util.ActionLogUtil;
import com.hitisoft.fos.ws.dao.WUserDao;
import com.hitisoft.fos.ws.entity.WUser;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.CryptoUtil;
import com.hitisoft.fw.util.StringUtil;

@Service
public class WUserService {
	@Autowired
	private WUserDao dao;
	@Autowired
	private CCustomerService customerService;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;

	@Transactional
	public List<WUser> save(List<WUser> entityList) {
		List<WUser> retList = new ArrayList<WUser>();
		for (WUser entity : entityList) {
			switch (entity.getRowAction()) {
			case N:
				entity.setId(null);
				entity.setWusrPassword(CryptoUtil.MD5Encode(entity.getWusrPassword()));
				sessionContext.setCompCode(entity.getCompCode());
				dao.add(entity);
				retList.add(entity);
				setLoginInfo(entity);
				break;
			case M:
				WUser retEntity = dao.findById(entity.getId());
				// 不修改密码, 有单独修改密码服务
				entity.setWusrPassword(retEntity.getWusrPassword());
				retList.add(dao.update(entity));
				break;
			case R:
				WUser delEntity = dao.findById(entity.getId());
				delEntity.setRowAction(RowAction.R);
				dao.update(delEntity);
				break;
			default:
				throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<WUser> query() {
		return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	public WUser login() {
		String wusrName = requestContext.get("wusrName");
		String wusrPassword = requestContext.get("wusrPassword");
		if (StringUtil.isBlank(wusrName) || StringUtil.isBlank(wusrPassword)) {
			throw new BusinessException(ExceptionEnum.FW_LOGIN_FAIL);
		}
		wusrPassword = CryptoUtil.MD5Encode(wusrPassword);
		requestContext.put("wusrPassword", wusrPassword);
		List<WUser> userList = dao.findByProperties();
		if (userList != null && userList.size() == 1) {
			WUser user = userList.get(0);
			setLoginInfo(user);
			return user;
		} else {
			throw new BusinessException(ExceptionEnum.FW_LOGIN_FAIL);
		}
	}

	private void setLoginInfo(WUser entity) {
		sessionContext.setUserid(entity.getId());
		sessionContext.setUsername(entity.getWusrName());
		sessionContext.setCompCode(entity.getCompCode());
		ActionLogUtil.log();
	}

	@Transactional
	public List<CCustomer> saveCustomer(List<CCustomer> entityList) {
		@SuppressWarnings("unchecked")
		List<CCustomer> retList = customerService.save(entityList);
		String wusrId = requestContext.get("wusrId");
		if (StringUtil.isNotBlank(wusrId)) {
			WUser user = dao.findById(Long.parseLong(wusrId));
			Long custId = retList.get(0).getId();
			user.setCustId(custId.intValue());
			user.setWusrStatus(ConstUtil.TrueByte);
			dao.update(user);
		}
		return retList;
	}
}
