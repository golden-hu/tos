package com.hitisoft.fos.ffop.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.dao.FCargoDao;
import com.hitisoft.fos.ffop.entity.FCargo;
import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fw.orm.util.HtQuery;

@Service
public class FCargoService {
	@Autowired
	private FCargoDao dao;
	@Transactional
	public List<FCargo> save(List<FCargo> consignList) {
		return dao.saveByRowAction(consignList);
	}

	@Transactional(readOnly = true)
	public List<FCargo> query() {
		return dao.findByProperties();
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional(readOnly = true)
	public List queryCargoByConsMasterId() {
		List retList = new ArrayList();
		List<HtQuery> conditions = new ArrayList<HtQuery>();
		List objList = dao.query(conditions);
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;
				FConsign consign = (FConsign) objArray[0];
				FCargo cargo = (FCargo) objArray[1];
				cargo.setConsMblNo(consign.getConsMblNo());
				cargo.setConsHblNo(consign.getConsHblNo());
				cargo.setCustName(consign.getCustName());
				retList.add(cargo);
			}
		}
		return retList;
	}
}
