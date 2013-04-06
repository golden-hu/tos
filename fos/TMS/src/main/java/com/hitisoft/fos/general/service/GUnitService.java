package com.hitisoft.fos.general.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GContainerTypeDao;
import com.hitisoft.fos.general.dao.GUnitDao;
import com.hitisoft.fos.general.entity.GContainerType;
import com.hitisoft.fos.general.entity.GUnit;

@Service
public class GUnitService {
	@Autowired
	private GUnitDao dao;
	@Autowired
	private GContainerTypeDao containerTypeDao;

	@Transactional
	public List<GUnit> save(List<GUnit> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GUnit> query() {
		return dao.findByProperties();
	}

	/**
	 * 把ContainerType转换成Unit, 跟Unit拼起来返回
	 * 
	 * @param queryMap
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<GUnit> queryUnitPlusContType() {
		List<GUnit> retList = new ArrayList<GUnit>();
		retList.addAll(dao.findByProperties());
		List<GContainerType> contList = containerTypeDao.findByProperties();
		Long id = -1L;
		for (GContainerType item : contList) {
			GUnit unit = new GUnit();
			unit.setId(id);
			unit.setUnitCode(item.getCotyCode());
			unit.setUnitName(item.getCotyCode());
			id--;
			retList.add(unit);
		}
		return retList;
	}
}
