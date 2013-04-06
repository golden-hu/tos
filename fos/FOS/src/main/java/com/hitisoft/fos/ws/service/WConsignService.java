package com.hitisoft.fos.ws.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.ffop.service.FConsignService;
import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fos.ws.dao.WConsignDao;
import com.hitisoft.fos.ws.entity.WConsign;
import com.hitisoft.fos.ws.entity.WUser;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.util.ConstUtil;

@Service
public class WConsignService {
	@Autowired
	private WConsignDao dao = null;
	@Autowired
	private FConsignService consignService;
	@Autowired
	private SerialFactory serialFactory;
	
	@Transactional
	public List<WConsign> save(List<WConsign> entityList) {
		for (WConsign wConsign : entityList) {
			if(wConsign.getRowAction() == RowAction.N){
				wConsign.setWconNo(getConsignNo());
			}
		}
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<WConsign> query() {
		return dao.findByProperties();
	}

	@SuppressWarnings("unchecked")
	@Transactional
	public List<FConsign> saveRealConsign(List<FConsign> entityList) {
		Long wconId = null;
		List<FConsign> retList = null;
		if (entityList != null && entityList.size() > 0){
			wconId = entityList.get(0).getId();
			retList = consignService.save(entityList);			
		}
		if (wconId != null) {
			WConsign wconsign = dao.findById(wconId);
			FConsign consign = retList.get(0);
			wconsign.setConsId(consign.getId().intValue());
			wconsign.setConsNo(consign.getConsNo());
			wconsign.setConsStatus(ConstUtil.TrueByte);
			dao.update(wconsign);
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<WConsign> complexQuery(List<HtQuery> conditions) {
		List<WConsign> retList = new ArrayList<WConsign>();
		List<?> objList = dao.complexQuery(conditions);
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;
				WConsign consign = (WConsign) objArray[0];
				WUser user = (WUser) objArray[1];
				BeanUtils.copyProperties(user, consign);
				retList.add(consign);
			}
		}
		return retList;
	}
	private String getConsignNo() {
		Map<String, String> map = new HashMap<String, String>();
		String no = serialFactory.getSerial("ws_consign_no", map);
		return no;
	}
}
