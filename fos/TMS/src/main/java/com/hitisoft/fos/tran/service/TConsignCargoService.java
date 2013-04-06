package com.hitisoft.fos.tran.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TConsignCargoDao;
import com.hitisoft.fos.tran.entity.TConsignCargo;
import com.hitisoft.fw.orm.util.HtQuery;


@Service
public class TConsignCargoService {
	@Autowired
	private TConsignCargoDao dao;
	
	@Transactional
	public List<TConsignCargo> save(List<TConsignCargo> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<TConsignCargo> query(List<HtQuery> conditions) {
		//return dao.findByProperties();
		return dao.queryByConditions(conditions);
	}
	
	//陆运单客户日报表
		@SuppressWarnings({ "unchecked"})
		@Transactional(readOnly = true)
		public List excelQuery(final List<HtQuery> conditions) {
			List<TConsignCargo> objList=dao.excelQuery(conditions);
			List<TConsignCargo> retList = new ArrayList<TConsignCargo>();
			for (Object o : objList) {
				Object[] objs = (Object[]) o;
				TConsignCargo tc = (TConsignCargo) objs[0];
				String loadAddress = (String) objs[1];
				Date consDate = (Date) objs[2];
				Date loadDate = (Date) objs[3];
				Date arNewDate = (Date) objs[4];
				String transportWay = (String) objs[5];
				String consNo = (String) objs[6];
				String consigneeName = (String) objs[7];
				String transportPlace = (String) objs[8];
				String remark=(String)objs[9];
				
				tc.setLoadAddress(loadAddress);
				tc.setConsDate(consDate);
				tc.setLoadDate(loadDate);
				tc.setArNewDate(arNewDate);
				tc.setTransportWay(transportWay);
				tc.setNotPachagesOut(tc.getPackages()-tc.getPachagesOut());
				tc.setConsNo(consNo);
				tc.setConsigneeName(consigneeName);
				tc.setTransportPlace(transportPlace);
				tc.setRemarks(remark);
				
				retList.add(tc);
			}
			return retList;
		}
}