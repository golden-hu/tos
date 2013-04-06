package com.hitisoft.fos.tran.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TVehicleDao;
import com.hitisoft.fos.tran.entity.TVehicle;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.SessionContext;

@Service
public class TVehicleService {
	@Autowired
	private TVehicleDao dao;
	@Autowired
	private SessionContext sessionContext;
	
	@Transactional
	public List<TVehicle> save(List<TVehicle> entityList) {
		for(Object obj:entityList){
			if(obj instanceof TVehicle){
				TVehicle vehicle=(TVehicle) obj;
				String vehicleNo=vehicle.getVehicleNo();
				RowAction ra = vehicle.getRowAction();
				if (ra == RowAction.N){
					Map <String,String>propertyMap=new HashMap<String,String>();
					propertyMap.put("vehicleNo",vehicleNo);
					propertyMap.put("remode",0+"");
					propertyMap.put("compCode", sessionContext.getCompCode());
					List<TVehicle> list = dao.findByProperties(propertyMap);
					if(list.size()>0){
						throw new BusinessException(ExceptionEnum.VEHICLE_NO_EXIST);
					}else{
						return dao.saveByRowAction(entityList);
					}
				}else{
					Long vehicleId=vehicle.getId();
					TVehicle vehicleOr=dao.findById(vehicleId);
					String vehicleNoOr=vehicleOr.getVehicleNo();
					if(!vehicleNo.equals(vehicleNoOr)){
						Map <String,String>propertyMap=new HashMap<String,String>();
						propertyMap.put("vehicleNo",vehicleNo);
						propertyMap.put("remode",0+"");
						propertyMap.put("compCode", sessionContext.getCompCode());
						List<TVehicle> list = dao.findByProperties(propertyMap);
						if(list.size()>0){
							throw new BusinessException(ExceptionEnum.VEHICLE_NO_EXIST);
						}
					}
					return dao.saveByRowAction(entityList);
				}
			}
		}
		return null;
	}

	@Transactional(readOnly = true)
	public List<TVehicle> query() {
		return dao.findByProperties();
	}
	@Transactional(readOnly = true)
	public List<TVehicle> complexQuery(List<HtQuery> conditions) {
		return dao.complexQuery(conditions);
	}
}
