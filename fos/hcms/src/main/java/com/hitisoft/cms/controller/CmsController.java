package com.hitisoft.cms.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.cms.entity.HcmsResource;
import com.hitisoft.cms.entity.HcmsTemplate;
import com.hitisoft.cms.service.HcmsResourceService;
import com.hitisoft.cms.service.HcmsTemplateService;

@Service("CmsController")
public class CmsController {
	private HcmsResourceService resourceService;
	private HcmsTemplateService templateService;
	
	@Transactional
	public List<HcmsResource> cutImage(){
		return resourceService.cutImage();
	}
	
	@Transactional
	public List<HcmsResource> uploadFile(){
		return resourceService.upload();
	}
	
	@Transactional
	public HcmsResource publish(){
		return resourceService.publish();
	}
	
	@Transactional
	public List<HcmsResource> saveResource(List<HcmsResource> entityList){
		return resourceService.save(entityList);
	}
	
	@Transactional(readOnly=true)
	public List<HcmsResource> queryResource(){
		return resourceService.query();
	}
	
	@Transactional
	public List<HcmsTemplate> saveTemplate(List<HcmsTemplate> entityList){
		return templateService.save(entityList);
	}
	
	@Transactional(readOnly=true)
	public List<HcmsTemplate> queryTemplate(){
		return templateService.query();
	}

	public HcmsResourceService getResourceService() {
		return resourceService;
	}

	@Autowired
	public void setResourceService(HcmsResourceService resourceService) {
		this.resourceService = resourceService;
	}

	public HcmsTemplateService getTemplateService() {
		return templateService;
	}

	@Autowired
	public void setTemplateService(HcmsTemplateService templateService) {
		this.templateService = templateService;
	}
	
}
