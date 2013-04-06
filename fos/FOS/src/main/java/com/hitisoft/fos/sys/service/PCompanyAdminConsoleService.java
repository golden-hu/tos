package com.hitisoft.fos.sys.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PCompanyDao;
import com.hitisoft.fos.sys.dao.PFunctionDao;
import com.hitisoft.fos.sys.dao.PRoleDao;
import com.hitisoft.fos.sys.dao.PRoleFunctionDao;
import com.hitisoft.fos.sys.dao.PUserDao;
import com.hitisoft.fos.sys.dao.PUserRoleDao;
import com.hitisoft.fos.sys.entity.PCompany;
import com.hitisoft.fos.sys.entity.PFunction;
import com.hitisoft.fos.sys.entity.PRole;
import com.hitisoft.fos.sys.entity.PRoleFunction;
import com.hitisoft.fos.sys.entity.PUser;
import com.hitisoft.fos.sys.entity.PUserRole;
import com.hitisoft.fos.tran.entity.TTransTask;
import com.hitisoft.fos.util.ConfigUtil;
import com.hitisoft.fos.util.InitData;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;

@Service
public class PCompanyAdminConsoleService {
	@Autowired
	private PCompanyDao dao;
	@Autowired
	private PUserDao usrDao;
	@Autowired
	private PRoleDao roleDao;
	@Autowired
	private PUserRoleDao userRoleDao;
	@Autowired
	private PRoleFunctionDao roleFunctionDao;
	@Autowired
	private PFunctionDao functionDao;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private ConfigUtil configUtil;
	
	@Transactional(readOnly = true)
	public List<PCompany> query() {
		return dao.findByProperties();
	}
	
	@Transactional(readOnly = true)
	public List<PCompany> complexQuery(List<HtQuery> conditions) {
		List<PCompany> objList=dao.complexQuery(conditions);
		return objList;
	}
	
	@Transactional(readOnly = true)
	public PUser login() {
		String userLoginName = requestContext.get("userLoginName");
		String userPassword = requestContext.get("userPassword");
		if(userLoginName.equals(configUtil.getConsoleName())&&
		   userPassword.equals(configUtil.getConsolePassword()))
		{
			PUser user = new PUser();
			user.setId(1L);
			user.setUserName(userLoginName);
			user.setCompCode("HITI");
			sessionContext.setUserid(user.getId());
			sessionContext.setUsername(user.getUserName());
			sessionContext.setCompCode(user.getCompCode());
			return user;
		}
		else{
			throw new BusinessException(ExceptionEnum.FW_LOGIN_FAIL);
		}
	}
	
	@Transactional
	public List<PCompany> active(List<PCompany> entityList) {
		PCompany com = null;
		for(PCompany comp : entityList) {
			com=dao.findById(comp.getId());
		}
		if (com==null) {
			throw new BusinessException(ExceptionEnum.DB_ENTITY_NOT_FOUND);	
		}
		if (com.getCompActive()!=0){	//已激活	
			throw new BusinessException(ExceptionEnum.FW_INIT_FAIL);
		}else{
			/*--company active--*/
			com.setCompActive((byte) 1);
			com.setCompStartDate(new Date());
			com.setCompEndDate(new Date(com.getCompStartDate().getTime() + (86400000 * 5)));
			dao.update(com);
			/*--add new user--*/
			/*PUser usr = new PUser();
			usr.setUserName(com.getCompContact());
			usr.setUserLoginName(com.getCompLoginUser());
			usr.setUserPassword(com.getCompLoginPsw());
			usr.setUserTel(com.getCompTel());
			usr.setUserMobile("");
			usr.setUserEmail(com.getCompEmail());
			usr.setUserMsn(com.getCompContMsn());
			usr.setUserQq(com.getCompContQq());
			usr.setGrouId(0);
			usr.setGrouName("");
			usr.setRoleId(0);
			usr.setRoleName("");
			usr.setUserSalesFlag((byte)0);
			usr.setUserOperatorFlag((byte)0);
			usr.setUserAllEditFlag((byte)1);
			usr.setUserAllViewFlag((byte)1);
			usr.setUserPasswordModifyDate(new Date());
			usr.setCreateBy(com.getCompCode());
			usr.setCreateTime(new Date());
			usr.setActive((byte)1);
			sessionContext.setCompCode(com.getCompMyCode());
			usr.setCompCode(co.getCompMyCode());
			usr.setUuid(com.getUuid());
			usr.setVersion(0);
			usr.setRemoved((byte)0);
			usrDao.add(usr);
			--add role--
			PRole role=new PRole();
			role.setRoleName("admin");
			role.setActive((byte)1);
			role.setCompCode(usr.getCompCode());
			role.setVersion(0);
			role.setRemoved((byte)0);
			roleDao.add(role);
			--add userRole--
			PUserRole userRole=new PUserRole();
			userRole.setUserId(usr.getId().intValue());
			userRole.setRoleId(role.getId().intValue());
			userRoleDao.add(userRole);
			--add roleFunction--
			List<PFunction> list=functionDao.findByProperties();
			for(PFunction function:list){
				PRoleFunction roleFunction=new PRoleFunction();
				roleFunction.setRoleId(role.getId().intValue());
				roleFunction.setFuncCode(function.getFuncCode());
				roleFunction.setCompCode(usr.getCompCode());
				roleFunctionDao.add(roleFunction);
			}*/
			/*initialization data*/
			String sqlPath=configUtil.getRealInitDataDir();
			String mysqlDriver=configUtil.getMysqlDriver();
			String mysqlUrl=configUtil.getMysqlUrl();
			String mysqlUserName=configUtil.getMysqlUserName();
			String mysqlPassword=configUtil.getMysqlPassword();
	    	new InitData().intoDate(com.getCompMyCode(),sqlPath,
	    			mysqlDriver,mysqlUrl,mysqlUserName,mysqlPassword);
		}
		sessionContext.setCompCode("HITI");
		List<PCompany> comList = new ArrayList<PCompany>();
		comList.add(com);
		return comList;
	}
	
	@Transactional
	public List<PCompany> pay(List<PCompany> entityList) {
		PCompany inCo = null;
		PCompany co = null;
		for(PCompany comp : entityList) {
			inCo = comp;
			co = this.dao.findById(comp.getId());
		}
		
		if (co == null) {
			throw new BusinessException(ExceptionEnum.DB_ENTITY_NOT_FOUND);	
		}
		
		if (co.getCompActive() == 0) {	//尚未激活
			throw new BusinessException(ExceptionEnum.FW_INIT_FAIL);
		}
		
		co.setCompActive((byte) 1);
		co.setCompStartDate(new Date());
		co.setCompEndDate(inCo.getCompEndDate());
		this.dao.update(co);
		
		List<PCompany> entLstInDb = new ArrayList<PCompany>();
		entLstInDb.add(co);
		return entLstInDb;
	}
}
