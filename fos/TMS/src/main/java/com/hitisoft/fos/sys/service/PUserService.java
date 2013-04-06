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

import com.hitisoft.fos.sys.dao.PCompanyDao;
import com.hitisoft.fos.sys.dao.PGroupDao;
import com.hitisoft.fos.sys.dao.PGroupUserDao;
import com.hitisoft.fos.sys.dao.PRoleDao;
import com.hitisoft.fos.sys.dao.PUserDao;
import com.hitisoft.fos.sys.dao.PUserRoleDao;
import com.hitisoft.fos.sys.entity.PCompany;
import com.hitisoft.fos.sys.entity.PGroup;
import com.hitisoft.fos.sys.entity.PGroupUser;
import com.hitisoft.fos.sys.entity.PRole;
import com.hitisoft.fos.sys.entity.PUser;
import com.hitisoft.fos.sys.entity.PUserRole;
import com.hitisoft.fos.util.ActionLogUtil;
import com.hitisoft.fos.util.CompanyConfigUtil;
import com.hitisoft.fos.util.ConfigUtil;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.CryptoUtil;
import com.hitisoft.fw.util.StringUtil;
import com.hitisoft.fw.util.TimeUtil;

@Service
public class PUserService {
	private static Map<Long, Object[]> onlineMap = new ConcurrentHashMap<Long, Object[]>();
	private static Logger logger = LoggerFactory.getLogger(PUserService.class);
	@Autowired
	private PUserDao dao;
	@Autowired
	private PRoleDao roleDao;
	@Autowired
	private PGroupDao groupDao;
	@Autowired
	private PGroupUserDao groupUserDao;
	@Autowired
	private PUserRoleDao userRoleDao;
	
	@Autowired
	private PCompanyDao companyDao;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private ConfigUtil configUtil;
	
	@Transactional
	public List<PUser> save(List<PUser> entityList) {
		List<PUser> retList = new ArrayList<PUser>();
		for (PUser entity : entityList) {
			switch (entity.getRowAction()) {
			case N:
				checkLicenseNumber();
				List <PUser> userList=dao.findByProperty("userLoginName",entity.getUserLoginName());
				if(userList.size()>0) throw new BusinessException(ExceptionEnum.JOIN_USER_EXIST);
				entity.setUserPassword(CryptoUtil.MD5Encode(entity.getUserPassword()));
				entity.setUserPasswordModifyDate(TimeUtil.getNow());
				dao.add(entity);
				retList.add(entity);
				break;
			case M:
				PUser retEntity = dao.findById(entity.getId());
				// 不修改密码, 有单独修改密码服务
				entity.setUserPassword(retEntity.getUserPassword());
				retList.add(dao.update(entity));
				break;
			case R:
				PUser delEntity = dao.findById(entity.getId());
				delEntity.setRowAction(RowAction.R);
				dao.update(delEntity);
				break;
			default:
				throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
			}
		}
		return retList;
	}
	//检查用户数
	@Transactional
	private void checkLicenseNumber() {
		String compMyCode=sessionContext.getCompCode();
		/*sessionContext.setCompCode("HITI");
		HashMap<String,String> compMap=new HashMap<String,String>();
		compMap.put("compMyCode", compMyCode);
		compMap.put("compCode","HITI");
		List<PCompany> list = companyDao.findByProperties(compMap);
		int licenseNum = 5;
		if (list.size()>0) {
			licenseNum = list.get(0).getCompLicenseNumber();
		}
		sessionContext.setCompCode(compMyCode);*/
		HashMap<String,String> userMap=new HashMap<String,String>();
		userMap.put("compCode", compMyCode);
		List<PUser> userList = dao.findByProperties(userMap);
		if (userList.size()>=50)
			throw new BusinessException(ExceptionEnum.FW_LICENSE_USERS_EXCEED);
	}

	@Transactional
	public List<PGroup> saveGroup(List<PGroup> entityList) {
		return groupDao.saveByRowAction(entityList);
	}
	
	@Transactional
	public void updatePassword() {
		Long userId = sessionContext.getUserid();
		String oldPassword = requestContext.get("oldPassword");
		String newPassword = requestContext.get("newPassword");
		String newPassword2 = requestContext.get("newPassword2");

		if (newPassword != null && newPassword.equals(newPassword2)) {
			PUser user = dao.findById(userId);
			if (oldPassword != null && CryptoUtil.MD5Encode(oldPassword).equals(user.getUserPassword())) {
				user.setUserPassword(CryptoUtil.MD5Encode(newPassword));
				user.setUserPasswordModifyDate(TimeUtil.getNow());
				dao.update(user);
			} else {
				throw new BusinessException(ExceptionEnum.FW_PASSWORD_NOT_CORRECT);
			}
		} else {
			throw new BusinessException(ExceptionEnum.FW_PASSWORD_NEW_NOT_MATCH);
		}
	}

	@Transactional
	public void updatePasswordByAdmin() {
		Long userId = Long.valueOf(requestContext.get("id"));
		String newPassword = requestContext.get("newPassword");
		String newPassword2 = requestContext.get("newPassword2");

		if (newPassword != null && newPassword.equals(newPassword2)) {
			PUser user = dao.findById(userId);
			user.setUserPassword(CryptoUtil.MD5Encode(newPassword));
			user.setUserPasswordModifyDate(TimeUtil.getNow());
			dao.update(user);
		} else {
			throw new BusinessException(ExceptionEnum.FW_PASSWORD_NEW_NOT_MATCH);
		}
	}
	
/**
 * 系统登录
 * @return user
 */
	@Transactional(readOnly = true)
	public PUser login() {
		String userLoginName = requestContext.get("userLoginName");
		String userPassword = requestContext.get("userPassword");
		if (StringUtil.isBlank(userLoginName) || StringUtil.isBlank(userPassword)) {
			throw new BusinessException(ExceptionEnum.FW_LOGIN_FAIL);
		}
		userPassword = CryptoUtil.MD5Encode(userPassword);
		List<PUser> userList = dao.queryByNameOrEmail(userLoginName, userPassword);
		if (userList != null && userList.size()>0) {
			PUser user = userList.get(0);
			//是否激活
			if (ConstUtil.FalseByte.equals(user.getActive())){
				throw new BusinessException(ExceptionEnum.FW_LOGIN_USER_DEACTIVED);
			}
			//是否过期
			checkPasswordExpire(user);
			//是否在线
			if (configUtil.isLoginRepeatCheck()) {
				checkRepeatLogin(user);
			}
			sessionContext.setUserid(user.getId());
			sessionContext.setUsername(user.getUserName());
			sessionContext.setCompCode(user.getCompCode());

			List<?> objList = dao.queryFuncCode();
			StringBuffer sb = new StringBuffer();
			for (Object obj : objList) {
				if (obj instanceof String) {
					sb.append((String) obj + ConstUtil.COMMA);
				}
			}
			user.setFuncCode(sb.toString());
			ActionLogUtil.log();
			return user;
		}
		//新注册的帐号在Company表,帐号激活后，登录系统，从Company和user表判断是否存在
		else {
			HashMap<String,String> comMap=new HashMap<String,String>();
			comMap.put("compLoginUser",userLoginName);
			comMap.put("compLoginPsw",userPassword);
			comMap.put("compActive","1");
			List<PCompany> comList = new ArrayList<PCompany>();
			sessionContext.setCompCode("HITI");
			comList = companyDao.findByProperties(comMap);
			sessionContext.setCompCode(null);
			if(comList!=null&comList.size()>0){
				PCompany com=comList.get(0);
				if(com.getCompEndDate()!=null){
					if(TimeUtil.getMillis()>com.getCompEndDate().getTime()){
						throw new BusinessException(ExceptionEnum.FW_PASSWORD_EXPIRE);
					}
				}else{
					throw new BusinessException(ExceptionEnum.FW_PASSWORD_EXPIRE);
				}
				
				PUser usr = new PUser();
				usr.setId(com.getId());
				usr.setUserName(com.getCompContact());
				usr.setUserLoginName(com.getCompLoginUser());
				usr.setUserPassword(com.getCompLoginPsw());
				usr.setUserTel(com.getCompTel());
				usr.setUserEmail(com.getCompEmail());
				usr.setUserMsn(com.getCompContMsn());
				usr.setUserQq(com.getCompContQq());
				usr.setGrouId(0);
				usr.setRoleId(0);
				usr.setUserSalesFlag((byte)0);
				usr.setUserOperatorFlag((byte)0);
				usr.setUserAllEditFlag((byte)1);
				usr.setUserAllViewFlag((byte)1);
				usr.setUserPasswordModifyDate(new Date());
				usr.setCreateBy(com.getCompCode());
				usr.setCreateTime(new Date());
				usr.setActive((byte)1);
				//试用帐号统一code
				usr.setCompCode("HITI");
				usr.setUuid(com.getUuid());
				usr.setVersion(0);
				usr.setRemoved((byte)0);
				ActionLogUtil.log();
				
				sessionContext.setUserid(Long.valueOf(1));
				sessionContext.setUsername(usr.getUserName());
				sessionContext.setCompCode("HITI");
				
				List<?> objList = dao.queryFuncCode();
				StringBuffer sb = new StringBuffer();
				for (Object obj : objList) {
					if (obj instanceof String) {
						sb.append((String) obj + ConstUtil.COMMA);
					}
				}
				usr.setFuncCode(sb.toString());
				ActionLogUtil.log();
				return usr;
			}else{
				comMap.put("compLoginUser",userLoginName);
				comMap.put("compLoginPsw",userPassword);
				comMap.put("compActive", 0+"");
				comList = companyDao.findByProperties(comMap);
				if(comList!=null&comList.size()>0){
					throw new BusinessException(ExceptionEnum.USER_NO_ACTIVE);
				}else{
					throw new BusinessException(ExceptionEnum.FW_LOGIN_FAIL);
				}
			}
		}
	}
	
	/**
	 * 用户退出
	 */
	public void logout(){
		sessionContext.setCompCode(null);
		sessionContext.setUserid(null);
		sessionContext.setUsername(null);
		sessionContext.setUserid(null);
		for (Map.Entry<Long, Object[]> entry : onlineMap.entrySet()) {
			onlineMap.remove(entry.getKey());
		}
	}
	public void checkRepeatLogin() {
		PUser user = dao.findById(sessionContext.getUserid());
		checkRepeatLogin(user);
	}
	
	//帐号是否在线
	public void checkRepeatLogin(PUser user) {
		String ip = sessionContext.getHostname();
		Long id = user.getId();
		if (!onlineMap.containsKey(id)) {
			onlineMap.put(id, new Object[] { user.getUserName(), ip, TimeUtil.getMillis(), user.getCompCode() });
		} else if (!((String) onlineMap.get(id)[1]).equalsIgnoreCase(ip)) {
			throw new BusinessException(ExceptionEnum.FW_LOGIN_REPEAT);
		} else {
			onlineMap.get(id)[2] = TimeUtil.getMillis();
			logger.info("{}", onlineMap.get(id)[2]);
		}
	}

	public void clearTimeoutUsers() {
		for (Map.Entry<Long, Object[]> entry : onlineMap.entrySet()) {
			long lastTime = (Long) entry.getValue()[2];
			if (TimeUtil.getMillis() - lastTime >= 5 * 60 * 1000) {
				logger.info("clear online user: " + entry.getValue()[0]);
				onlineMap.remove(entry.getKey());
			}
		}
	}

	/**
	 * 帐号过期时间
	 * @param user
	 */
	private void checkPasswordExpire(PUser user) {
		Date pwDate = user.getUserPasswordModifyDate();
		String expireDays = CompanyConfigUtil.getCompanyConfig(Constants.COMCF_PASSWORD_EXPIRY_DAYS);
		int intExpireDays = 0;
		if (StringUtil.isNotBlank(expireDays)) {
			intExpireDays = Integer.parseInt(expireDays);
		}
		if (pwDate != null && intExpireDays > 0 && TimeUtil.getDiffDays(pwDate, TimeUtil.getNow()) >= intExpireDays) {
			throw new BusinessException(ExceptionEnum.FW_PASSWORD_EXPIRE);
		}
	}

	public PUser queryCurrentUser() {
		PUser user = dao.findById(sessionContext.getUserid());
		List<?> objList = dao.queryFuncCode();
		StringBuffer sb = new StringBuffer();
		for (Object obj : objList) {
			if (obj instanceof String) {
				sb.append((String) obj + ConstUtil.COMMA);
			}
		}
		user.setFuncCode(sb.toString());
		return user;
	}

	@Transactional(readOnly = true)
	public List<PUser> query() {
		return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<PGroup> queryGroup() {
		return groupDao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<PRole> queryRole() {
		return roleDao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<PGroupUser> queryGroupUser() {
		return groupUserDao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<PUserRole> queryUserRole() {
		return userRoleDao.findByProperties();
	}

	public void killOnlineUser(PUser user) {
		onlineMap.remove(user.getId());
	}

	public static void killOnlineUser(Long userId) {
		onlineMap.remove(userId);
	}

	public static void killMe(Long userId) {
		killOnlineUser(userId);
	}

	public void killAllOnlineUser() {
		onlineMap.clear();
	}

	public List<PUser> listOnlineUsers() {
		List<PUser> list = new ArrayList<PUser>();
		String compCode = sessionContext.getCompCode();
		for (Long id : onlineMap.keySet()) {
			// 在线用户
			if (compCode.equals(onlineMap.get(id)[3])) {
				PUser user = new PUser();
				user.setId(id);
				user.setUserName((String) onlineMap.get(id)[0]);
				user.setIp((String) onlineMap.get(id)[1]);
				list.add(user);
			}
		}
		return list;
	}
}
