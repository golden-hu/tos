package com.hitisoft.fos.sys.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PRoleFunctionDao;
import com.hitisoft.fos.sys.entity.PRoleFunction;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.RowAction;

@Service
public class PRoleFunctionService {
	@Autowired
	private PRoleFunctionDao dao;

	@Transactional
	public List<PRoleFunction> save(List<PRoleFunction> entityList) {
		List<PRoleFunction> retList = new ArrayList<PRoleFunction>();
		for (PRoleFunction entity : entityList) {
			if (entity.getRowAction() == RowAction.N) {
				entity.setId(null);
				dao.add(entity);
				retList.add(entity);
			} else if (entity.getRowAction() == RowAction.M) {
				retList.add(dao.update(entity));
			} else if (entity.getRowAction() == RowAction.R) {
				dao.delete(entity.getId());
			} else {
				throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
			}
		}
		return retList;
	}
	
	/*@Transactional
	public List<PRoleFunction> save(List<PRoleFunction> entityList) {
		return dao.saveByRowAction(entityList);
	}*/

	@Transactional(readOnly = true)
	public List<PRoleFunction> query() {
		return dao.findByProperties();
	}

}
