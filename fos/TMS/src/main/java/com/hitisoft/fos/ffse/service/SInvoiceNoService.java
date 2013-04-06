package com.hitisoft.fos.ffse.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffse.dao.SInvoiceNoDao;
import com.hitisoft.fos.ffse.entity.SInvoiceNo;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.TimeUtil;

@Service
public class SInvoiceNoService {
	@Autowired
	private SInvoiceNoDao dao;
	@Autowired
	private RequestContext requestContext;

	@Transactional
	public List<SInvoiceNo> save(List<SInvoiceNo> entityList) {
		List<SInvoiceNo> retList = new ArrayList<SInvoiceNo>();
		for (SInvoiceNo entity : entityList) {
			switch (entity.getRowAction()) {
			case N:
				entity.setId(null);
				entity.setInnoNextNo(entity.getInnoStartNo());
				dao.add(entity);
				break;
			case M:
				retList.add(dao.update(entity));
				break;
			case R:
				SInvoiceNo delEntity = dao.findById(entity.getId());
				delEntity.setRowAction(RowAction.R);
				dao.update(delEntity);
				break;
			default:
				throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<SInvoiceNo> query() {
		return dao.findByProperties();
	}

	/**
	 * 更新记录的启用标志, 同时把其他记录从启用状态->未启用状态
	 * 
	 * @param queryMap
	 */
	@Transactional
	public void updateActiveFlag() {
		Long id = Long.valueOf(requestContext.get("id"));
		requestContext.put("active", ConstUtil.TrueStr);
		requestContext.remove("id");
		List<SInvoiceNo> list = dao.findByProperties(requestContext);
		if(list!=null&&list.size()>0){
			for (SInvoiceNo item : list) {
				item.setActive(ConstUtil.FalseByte);
				dao.update(item);
			}
		}
		if(id>0){
			SInvoiceNo entity = dao.findById(id);
			entity.setActive(ConstUtil.TrueByte);
			entity.setInnoStartDate(TimeUtil.getNow());
			dao.update(entity);
		}else{
			throw new BusinessException(ExceptionEnum.DB_ENTITY_EXIST);
		}
	}
}
