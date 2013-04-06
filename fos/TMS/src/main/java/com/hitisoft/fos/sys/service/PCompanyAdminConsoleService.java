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
import com.hitisoft.fos.util.ConfigUtil;
import com.hitisoft.fos.util.InitData;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.TimeUtil;

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
	
	/**
	 * 控制台登录
	 * @return
	 * @author liuyong
	 */
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
	
	/**
	 * 注册用户试用版激活
	 * @param entityList
	 * @return
	 * @author liuyong
	 */
	@Transactional
	public List<PCompany> active(List<PCompany> entityList) {
		List <PCompany>retList=new ArrayList<PCompany>();
		PCompany com = null;
		for(Object obj : entityList){
			if (obj instanceof PCompany){
				com=(PCompany)obj;
				if(com.getCompActive()==0){//未激活
					com.setCompActive((byte) 1);
					com.setCompStartDate(new Date());
					com.setCompEndDate(new Date(com.getCompStartDate().getTime() + (86400000 * 3)));
					com=dao.update(com);
					retList.add(com);
				}
			}
		}
		return retList;
	}
	/**
	 * 注册用户正式版激活
	 * @param entityList
	 * @return
	 * @author liuyong
	 */
	@Transactional
	public List<PCompany> active2(List<PCompany> entityList) {
		List <PCompany>retList=new ArrayList<PCompany>();
		PCompany com = null;
		for(Object obj : entityList){
			if (obj instanceof PCompany){
				com=(PCompany)obj;
				if(com.getCompActive()==0){//未激活
					com.setCompActive((byte) 1);
					com.setCompStartDate(new Date());
					com.setCompEndDate(new Date(com.getCompStartDate().getTime() + (86400000 * 5)));
					com=dao.update(com);
					
					PRole role=new PRole();
					role.setRoleName("admin");
					role.setActive((byte)1);
					role.setCompCode(com.getCompMyCode());
					//系统自动取session的compCode值set到compCode中
					sessionContext.setCompCode(com.getCompMyCode());
					roleDao.add(role);
					
					List<PFunction> list=functionDao.findByProperties();
					for(PFunction function:list){
						PRoleFunction rf=new PRoleFunction();
						rf.setRoleId(role.getId().intValue());
						rf.setFuncCode(function.getFuncCode());
						rf.setCompCode(com.getCompMyCode());
						roleFunctionDao.add(rf);
					}
					
					PUser user = new PUser();
					user.setUserName(com.getCompContact());
					user.setUserLoginName(com.getCompLoginUser());
					user.setUserPassword(com.getCompLoginPsw());
					user.setUserTel(com.getCompTel());
					user.setUserEmail(com.getCompEmail());
					user.setUserMsn(com.getCompContMsn());
					user.setUserQq(com.getCompContQq());
					user.setUserOperatorFlag((byte)1);
					user.setUserSalesFlag((byte)1);
					user.setUserAllEditFlag((byte)1);
					user.setUserAllViewFlag((byte)1);
					//帐号创建时间（此日期判断此帐号是否过期）
					user.setUserPasswordModifyDate(TimeUtil.getNow());
					user.setCreateBy(sessionContext.getUsername());
					user.setCreateTime(new Date());
					user.setActive((byte)1);
					user.setCompCode(com.getCompMyCode());
					user.setUuid(com.getUuid());
					user.setVersion(0);
					user.setRemoved((byte)0);
					usrDao.add(user);
					
					PUserRole userRole=new PUserRole();
					userRole.setUserId(user.getId().intValue());
					userRole.setRoleId(role.getId().intValue());
					userRoleDao.add(userRole);
					sessionContext.setCompCode(null);
					/*initialization data*/
					String sqlPath=configUtil.getRealInitDataDir();
					String mysqlDriver=configUtil.getMysqlDriver();
					String mysqlUrl=configUtil.getMysqlUrl();
					String mysqlUserName=configUtil.getMysqlUserName();
					String mysqlPassword=configUtil.getMysqlPassword();
			    	new InitData().intoDate(com.getCompMyCode(),sqlPath,
			    			mysqlDriver,mysqlUrl,mysqlUserName,mysqlPassword);
			    	retList.add(com);
				}
			}
		}
		return retList;
	}
	
	/**
	 * 付费
	 * @param entityList
	 * @return
	 * @author liuyong
	 */
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
	
	/**
	 * 控制台退出
	 * @author liuyong
	 * 防止session串用
	 */
	public void logout(){
		sessionContext.setCompCode(null);
		sessionContext.setUserid(null);
		sessionContext.setUsername(null);
		sessionContext.setUserid(null);
	}
}
