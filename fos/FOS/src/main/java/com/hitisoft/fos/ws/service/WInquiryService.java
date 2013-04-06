package com.hitisoft.fos.ws.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ws.dao.WInquiryDao;
import com.hitisoft.fos.ws.entity.WInquiry;
import com.hitisoft.fos.ws.entity.WUser;
import com.hitisoft.fw.orm.util.HtQuery;

@Service
public class WInquiryService {
	@Autowired
	private WInquiryDao dao;

	@Transactional(readOnly = true)
	public List<WInquiry> complexQuery(List<HtQuery> conditions) {
		List<WInquiry> retList = new ArrayList<WInquiry>();
		List<?> objList = dao.complexQuery(conditions);
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;
				WInquiry inquiry = (WInquiry) objArray[0];
				WUser user = (WUser) objArray[1];
				inquiry.setWusrName(user.getWusrName());
				inquiry.setWusrFirstName(user.getWusrFirstName());
				inquiry.setWusrMobile(user.getWusrMobile());
				inquiry.setWusrEmail(user.getWusrEmail());
				inquiry.setWusrCompanyName(user.getWusrCompanyName());
				inquiry.setWusrTel(user.getWusrTel());
				retList.add(inquiry);
			}
		}
		return retList;
	}
}
