package com.hitisoft.fos.sys.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PSmsDao;
import com.hitisoft.fos.sys.entity.PSms;
import com.hitisoft.fos.tran.dao.TConsignDao;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.util.SendPhoneCode;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.util.StringUtil;

@Service
public class PSmsService {
	@Autowired
	private PSmsDao dao;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private TConsignDao consDao;
	
	@Transactional
	public String save(List<PSms> entityList) {
			String phoneCode="";Integer status=0;
			String sendUrl=requestContext.get("smsUrl");
			String sendUsername=requestContext.get("smsUser");
			String sendPssword=requestContext.get("smsPassword");
			String sendKey=requestContext.get("smsKey");
			String sendMobile=requestContext.get("mobile");
			String sendContent=requestContext.get("content");
			String bizType=requestContext.get("bizType");
			Integer consId=Integer.parseInt(requestContext.get("consId"));
			String consNo=requestContext.get("consNo");
			String consNoHandler=requestContext.get("consNoHandler");
			try {
				phoneCode=new SendPhoneCode().sendCodePhone(sendUrl, sendUsername, 
						sendPssword, sendMobile, sendKey, sendContent);
			} catch (Exception e) {
				throw new BusinessException(null,"发送失败");
			}
			if(Integer.parseInt(phoneCode)==0){status=1;}
			PSms sms=new PSms();
			sms.setMobile(sendMobile);
			sms.setContent(sendContent);
			sms.setBizType(bizType);
			sms.setConsId(consId);
			sms.setConsNo(consNo);
			sms.setSendDate(new Date());
			sms.setStatus(status);
			sms.setConsNoHandler(consNoHandler);
			dao.add(sms);
			
			if(consId!=null&&consId>0){
				TConsign cons=consDao.findById(Long.valueOf(consId));
				if(cons!=null){
					int num=1;
					if(StringUtil.isNotBlank(num+"")){
						num=+cons.getSmsStatus();
					}
					cons.setSmsStatus(num);
					consDao.update(cons);
				}
			}
			return phoneCode;
	}

	@Transactional(readOnly = true)
	public List<PSms> query() {
		return dao.findByProperties();
	}
}
