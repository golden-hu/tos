package com.hitisoft.fos.sys.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PCompanyDao;
import com.hitisoft.fos.sys.dao.PUserDao;
import com.hitisoft.fos.sys.entity.PCompany;
import com.hitisoft.fos.sys.entity.PUser;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.CryptoUtil;

@Service
public class PCompanyJoinService {
	@Autowired
	private PCompanyDao dao;
	
	@Autowired
	private PUserDao usrDao;
	
	@Autowired
	private SessionContext sessionContext;

	@Autowired
	private RequestContext requestContext;
	/**
	 * 用户注册
	 * @param entityList
	 * @return
	 * @author liuyong
	 */
	@Transactional
	public PCompany join(List<PCompany> entityList) {
		if (entityList!=null&&entityList.size()>0){
			PCompany com=entityList.get(0);
			com=this.checke(com);
			return com;
		}else{
			String submitType=requestContext.get("submitType");
			if(!submitType.equals("")||submitType.equals("web")){
				PCompany com=new PCompany();
				com.setCompNameCn(requestContext.get("compNameCn"));
				com.setCompMyCode(requestContext.get("compMyCode"));
				com.setCompContact(requestContext.get("compContact"));
				com.setCompTel(requestContext.get("compTel"));
				com.setCompEmail(requestContext.get("compEmail"));
				com.setCompLoginUser(requestContext.get("compLoginUser"));
				com.setCompLoginPsw(requestContext.get("compLoginPsw"));
				com.setCompContMsn(requestContext.get("compContMsn"));
				com.setCompContQq(requestContext.get("compContQq"));
				
				com=this.checke(com);
				return com;
			}
			throw new BusinessException(ExceptionEnum.FW_INIT_FAIL);
		}
	}
	
	//验证
	public PCompany checke(PCompany com){
		boolean bl=true;
		List<PCompany> comList = dao.findByProperty("compMyCode", com.getCompMyCode());
		if (comList!=null&&comList.size()>0){
			bl=false;
			throw new BusinessException(ExceptionEnum.JOIN_CODE_EXIST);
		}
		if(bl){
			comList = dao.findByProperty("compEmail", com.getCompEmail());
			if (comList!=null&&comList.size()>0){
				bl=false;
				throw new BusinessException(ExceptionEnum.REG_MAIL_ALREADY_EXISTS);
			}
		}
		if(bl){
			comList = dao.findByProperty("compLoginUser", com.getCompLoginUser());
			if (comList!=null&&comList.size()>0){
				bl=false;
				throw new BusinessException(ExceptionEnum.JOIN_USER_EXIST);
			}
		}
		if(bl){
			List<PUser> usrLst = usrDao.findByProperty("userLoginName", com.getCompLoginUser());
			if (usrLst!=null&&usrLst.size()>0){
				bl=false;
				throw new BusinessException(ExceptionEnum.JOIN_USER_EXIST);
			}
		}
		if(bl){
			com.setCompLoginPsw(CryptoUtil.MD5Encode(com.getCompLoginPsw()));
			com.setCompLicenseNumber(5);
			com.setCompServiceLeve((byte)0);
			com.setCreateTime(new Date());
			//此session的公司code必须添加
			sessionContext.setCompCode("HITI");
			dao.add(com);
			sessionContext.setCompCode(null);
		}
		return com;
	} 
}
