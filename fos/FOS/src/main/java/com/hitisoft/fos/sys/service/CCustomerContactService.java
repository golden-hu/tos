package com.hitisoft.fos.sys.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.CCustomerContactDao;
import com.hitisoft.fos.sys.entity.CCustomerContact;
import com.hitisoft.fw.session.RequestContext;

@Service
public class CCustomerContactService {
	@Autowired
	private CCustomerContactDao dao;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private EntityManagerFactory entityManagerFactory;

	@Transactional
	public List<CCustomerContact> save(List<CCustomerContact> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**
	 * 按输入条件查询业务担当，当输入条件中包含 custId & parentId 
	 * 并且值不为空查询当前委托单位业务担当及上级公司业务担当
	 */
	@Transactional(readOnly = true)
	public List<CCustomerContact> query() {
		Set<String> keys=requestContext.keySet();
		String custId="";
		String parentId="";
		String hql="from CCustomerContact cct ";
		if(keys.contains("parentId")){
			 custId=requestContext.get("custId");
			 parentId=requestContext.get("parentId");
			 hql+=(!parentId.isEmpty()&&!custId.isEmpty())?"where cct.custId in ('"+custId+"','"+parentId+"') order by cct.custId asc":"";
		}
		EntityManager em=entityManagerFactory.createEntityManager();
		List<CCustomerContact> list=new ArrayList<CCustomerContact>();
		if(parentId.isEmpty()){
			requestContext.remove("parentId");
			list=dao.findByProperties();
		}		
		else{
			list=(List<CCustomerContact>)em.createQuery(hql).getResultList();
		}
		return list;
	}
}
