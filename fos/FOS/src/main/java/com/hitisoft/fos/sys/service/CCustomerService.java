package com.hitisoft.fos.sys.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.CCustomerContactDao;
import com.hitisoft.fos.sys.dao.CCustomerDao;
import com.hitisoft.fos.sys.entity.CCustomer;
import com.hitisoft.fos.sys.entity.CCustomerContact;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.StringUtil;

@Service
public class CCustomerService {
	@Autowired
	private CCustomerDao dao;
	@Autowired
	private CCustomerContactDao contactDao;
	@Autowired
	private RequestContext requestContext;

	@Transactional
	public void deleteById(CCustomer cust){
		Long id=cust.getId();
		dao.delete(id);
		
		Map<String,String> map = new HashMap<String, String>();
		map.put("custId", ""+id);
		
		List<CCustomerContact> items=contactDao.findByProperties(map);
		for(CCustomerContact cc:items){
			cc.setRowAction(RowAction.R);
		}
		contactDao.saveByRowAction(items);
		
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public List save(List entityList) {
		List retList = new ArrayList();
		Long custId = 0L;
		
		// handle parent first
		for (Object obj : entityList) {
			if (obj instanceof CCustomer) {
				CCustomer entity = (CCustomer) obj;				
				RowAction ra = entity.getRowAction();
				entity = dao.saveByRowActionSolo(entity);
				if (RowAction.R != ra) {
					retList.add(entity);
				}
				custId = entity.getId();
				break;
			}
		}

		// handle child
		for (Object obj : entityList) {
			if (obj instanceof CCustomerContact) {
				CCustomerContact entity = (CCustomerContact) obj;
				RowAction ra = entity.getRowAction();
				if (RowAction.N == ra) {
					entity.setCustId(custId);
				}
				entity = contactDao.saveByRowActionSolo(entity);
				if (RowAction.R != ra) {
					retList.add(entity);
				}
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<CCustomer> query() {
		return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<CCustomer> complexQuery(List<HtQuery> conditions) {
		List<CCustomer> retList = null;
		List<CCustomer> list = dao.query(conditions);
		// 简单查询, 只返回几个参数
		if (requestContext.containsKey("S")) {
			retList = new ArrayList<CCustomer>();
			for (CCustomer customer : list) {
				CCustomer entity = new CCustomer();
				entity.setId(customer.getId());
				entity.setCustCode(customer.getCustCode());
				entity.setCustSnameCn(customer.getCustSnameCn());
				entity.setCustNameCn(customer.getCustNameCn());
				entity.setCustContact(customer.getCustContact());
				entity.setCustTel(customer.getCustTel());
				entity.setCustFax(customer.getCustFax());
				entity.setCustEmail(customer.getCustEmail());
				entity.setCustShipper(customer.getCustShipper());
				retList.add(entity);
			}
		} else {
			retList = list;
		}
		return retList;
	}

	@Transactional
	public void mergeCust() {
		if (requestContext.containsKey("custId") && requestContext.containsKey("custIds")) {
			Long toId = Long.valueOf(requestContext.get("custId"));
			String ids = requestContext.get("custIds");
			if (StringUtil.contains(ids, ConstUtil.COMMA)) {
				String[] idArray = ids.split(ConstUtil.COMMA);
				for (String strId : idArray) {
					if (StringUtil.isNotBlank(strId)) {
						Long fromId = Long.valueOf(strId);
						if (!fromId.equals(toId)) {
							mergeCust(fromId, toId);
						}
					}
				}
			} else {
				Long fromId = Long.valueOf(ids);
				mergeCust(fromId, toId);
			}
		}
	}

	private void mergeCust(Long fromId, Long toId) {
		CCustomer delEntity = dao.findById(fromId);
		delEntity.setRowAction(RowAction.R);
		dao.update(delEntity);
		dao.mergeCust(fromId, toId);
	}
}
