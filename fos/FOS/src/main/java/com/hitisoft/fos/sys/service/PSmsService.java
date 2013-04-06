package com.hitisoft.fos.sys.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PSmsDao;
import com.hitisoft.fos.sys.entity.PSms;
import com.hitisoft.fos.util.SendPhoneCode;
import com.hitisoft.fw.session.RequestContext;

@Service
public class PSmsService {
	@Autowired
	private PSmsDao dao;
	@Autowired
	private RequestContext requestContext;
	
	@Transactional
	public String save(List<PSms> entityList) {
		String phoneCode="";Integer status=0;
		try {
			String sendUrl=requestContext.get("smsUrl");
			String sendUsername=requestContext.get("smsUser");
			String sendPssword=requestContext.get("smsPassword");
			String sendKey=requestContext.get("smsKey");
			String sendMobile=requestContext.get("mobile");
			String sendContent=requestContext.get("content");
			String bizType=requestContext.get("bizType");
			Integer consId=Integer.parseInt(requestContext.get("consId"));
			String consNo=requestContext.get("consNo");
			phoneCode=new SendPhoneCode().sendCodePhone(sendUrl, sendUsername, 
					sendPssword, sendMobile, sendKey, sendContent);
			if(Integer.parseInt(phoneCode)==0){status=1;}
			PSms sms=new PSms();
			sms.setMobile(sendMobile);
			sms.setContent(sendContent);
			sms.setBizType(bizType);
			sms.setConsId(consId);
			sms.setConsNo(consNo);
			sms.setSendDate(new Date());
			sms.setStatus(status);
			dao.add(sms);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return phoneCode;
	}

	@Transactional(readOnly = true)
	public List<PSms> query() {
		return dao.findByProperties();
	}
}
