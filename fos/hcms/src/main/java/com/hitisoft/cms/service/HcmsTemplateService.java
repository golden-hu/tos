package com.hitisoft.cms.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.cms.dao.HcmsTemplateDao;
import com.hitisoft.cms.entity.HcmsTemplate;
import com.hitisoft.cms.util.ConfigUtil;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.FileUtil;
import com.hitisoft.fw.util.StringUtil;

@Service
public class HcmsTemplateService {
	@Autowired
	private HcmsTemplateDao dao;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private ConfigUtil configUtil;

	@Transactional
	public List<HcmsTemplate> save(List<HcmsTemplate> consignList) {
		List<HcmsTemplate> retList = dao.saveByRowAction(consignList);
		for (HcmsTemplate entity : consignList) {
			if (entity.getRowAction() != RowAction.R) {
				saveJsp(entity);
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<HcmsTemplate> query() {
		return dao.findByProperties();
	}

	public void saveJsp(Map<String, Object> queryMap) {
		Long tempId = Long.valueOf(requestContext.get("tempId"));
		HcmsTemplate template = dao.findById(tempId);
		saveJsp(template);
	}

	public void saveJsp(HcmsTemplate template) {
		String dir = configUtil.getRealTemplateDir();
		FileUtil.createDirs(dir);
		String fileName = dir + ConstUtil.DIR_SEP + template.getId() + ConstUtil.STRING_DOT + "jsp";
		OutputStream bos = null;
		try {
			bos = new FileOutputStream(fileName);
			String include = "<%@ page contentType=\"text/html;encoding=utf-8\" ";
			include += "pageEncoding=\"utf-8\" isELIgnored=\"false\" %>\n";
			include += "<%@ taglib uri=\"/WEB-INF/cms.tld\" prefix=\"cms\"%>\n";
			byte[] b = include.getBytes();
			bos.write(b);

			String content = template.getTempContent();
			content = StringUtil.unescape(content);
			b = content.getBytes();
			bos.write(b);
			bos.close();
		} catch (Exception e) {
			throw new BusinessException(ExceptionEnum.FW_UNKNOWN_ERROR, e);
		} finally {
			if (bos != null) {
				try {
					bos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

}
