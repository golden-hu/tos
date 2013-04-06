package com.hitisoft.fos.tran.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TSimEquipmentDao;
import com.hitisoft.fos.tran.entity.TSimEquipment;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.SessionContext;
@Service
public class TSimEquipmentService {
	@Autowired
	private TSimEquipmentDao dao; 
	@Autowired
	private SessionContext sessionContext;
	
	@Transactional
	public List<TSimEquipment> save(List<TSimEquipment> itemList) {
		TSimEquipment equi=null;
		for(Object obj:itemList){
			if(obj instanceof TSimEquipment){
				equi=(TSimEquipment) obj;
				RowAction ra = equi.getRowAction();
				if (ra == RowAction.N){
					List<TSimEquipment> vlist=dao.findByProperty("vehicleNo",equi.getVehicleNo());
					if(vlist.size()>0){
						throw new BusinessException(ExceptionEnum.VEHICLE_NO_EXIST);
					}
					List<TSimEquipment> elist=dao.findByProperty("simEquiNo",equi.getSimEquiNo());
					if(elist.size()>0){
						throw new BusinessException(ExceptionEnum.EQUIPMENT_VEHICLENO_BOUND);
					}
					return dao.saveByRowAction(itemList);
				}else{
					if (ra == RowAction.M){
						List<TSimEquipment> vlist=dao.findByProperty("vehicleNo",equi.getVehicleNo());
						if(vlist.size()>1){//多条相同数据
							throw new BusinessException(ExceptionEnum.EQUIPMENT_VEHICLENO_BOUND);
						}else if(vlist.size()==1){
							if(equi.getId()!=vlist.get(0).getId()){//数据库存在的数据不是所编辑的数据
								throw new BusinessException(ExceptionEnum.EQUIPMENT_VEHICLENO_BOUND);
							}
						}
						
						List<TSimEquipment> elist=dao.findByProperty("simEquiNo",equi.getSimEquiNo());
						if(elist.size()>1){//多条相同数据
							throw new BusinessException(ExceptionEnum.EQUIPMENT_VEHICLENO_BOUND);
						}else if(elist.size()==1){
							if(equi.getId()!=elist.get(0).getId()){//数据库存在的数据不是所编辑的数据
								throw new BusinessException(ExceptionEnum.EQUIPMENT_VEHICLENO_BOUND);
							}
						}
						return dao.saveByRowAction(itemList);
						
					}else{
						return dao.saveByRowAction(itemList);
					}
				}
			}
		}
		return null;
	}

	@Transactional(readOnly = true)
	public List<TSimEquipment> query() {
		return dao.findByProperties();
	}
}
