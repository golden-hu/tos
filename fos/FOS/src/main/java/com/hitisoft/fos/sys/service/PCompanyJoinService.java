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
	
	@Transactional
	public PCompany join(List<PCompany> entityList) {
		if (entityList!=null&&entityList.size()>0){
			PCompany co=entityList.get(0);
			List<PCompany> comList = dao.findByProperty("compMyCode", co.getCompMyCode());
			if (comList!=null&&comList.size()>0){
				throw new BusinessException(ExceptionEnum.JOIN_CODE_EXIST);
			}
			comList = dao.findByProperty("compLoginUser", co.getCompLoginUser());
			if (comList!=null&&comList.size()>0){
				throw new BusinessException(ExceptionEnum.JOIN_USER_EXIST);
			}
			List<PUser> usrLst = usrDao.findByProperty("userLoginName", co.getCompLoginUser());
			if (usrLst.size()>0){
				throw new BusinessException(ExceptionEnum.JOIN_USER_EXIST);
			}
			co.setCompLoginPsw(CryptoUtil.MD5Encode(co.getCompLoginPsw()));
			co.setCompLicenseNumber(5);
			co.setCompStartDate(null);
			co.setCompEndDate(null);
			co.setCompServiceLeve((byte)0);
			co.setCreateTime(new Date());
			sessionContext.setCompCode("HITI");
			dao.add(co);
			sessionContext.setCompCode("");
			return co;
		}else{
			throw new BusinessException(ExceptionEnum.FW_INIT_FAIL);
		}
		
	}
}
