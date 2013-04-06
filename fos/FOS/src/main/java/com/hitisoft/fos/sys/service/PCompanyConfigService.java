package com.hitisoft.fos.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PCompanyConfigDao;
import com.hitisoft.fos.sys.entity.PCompanyConfig;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fw.session.RequestContext;

@Service
public class PCompanyConfigService {
	@Autowired
	private PCompanyConfigDao dao;
	@Autowired
	private RequestContext requestContext;

	@Transactional
	public List<PCompanyConfig> save(List<PCompanyConfig> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<PCompanyConfig> query() {
		return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	public String queryByCode(String code) {
		requestContext.put(Constants.COMCF_KEY, code);
		List<PCompanyConfig> list = query();
		if (list.size() == 1) {
			return list.get(0).getCocoValue();
		}
		return null;
	}

}
