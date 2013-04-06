package com.hitisoft.fos.ffop.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.dao.FCargoDao;
import com.hitisoft.fos.ffop.dao.FConsignDao;
import com.hitisoft.fos.ffop.dao.FContainerCargoDao;
import com.hitisoft.fos.ffop.dao.FContainerDao;
import com.hitisoft.fos.ffop.entity.FCargo;
import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.ffop.entity.FContainer;
import com.hitisoft.fos.ffop.entity.FContainerCargo;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.util.NumberUtil;

@Service
public class FContainerService {
	@Autowired
	private FContainerDao dao;
	@Autowired
	private FContainerCargoDao contCargoDao;
	@Autowired
	private FConsignDao consignDao;
	@Autowired
	private FCargoDao cargoDao;
	@Autowired
	private RequestContext requestContext;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public List save(List entityList) {
		List retList = new ArrayList();
		Map<Long, Long> idMap = new HashMap<Long, Long>();
		Long consId = null;
		for (Object obj : entityList) {
			if (obj instanceof FContainer) {
				FContainer entity = (FContainer) obj;
				Long oldId = entity.getId();
				RowAction ra = entity.getRowAction();
				entity = dao.saveByRowActionSolo(entity);
				if (ra != RowAction.R) {
					retList.add(entity);
				}
				idMap.put(oldId, entity.getId());
				consId = entity.getConsId().longValue();
			}
		}

		// 再load对应的委托号的所有箱子，其中CONT_PRE_FLAG=N,
		// 箱号拼起来保存到CONS_CONTAINERS_NO字段
		if (consId != null) {
			Map<String, String> queryMap = new HashMap<String, String>();
			queryMap.put("consId", "" + consId);
			queryMap.put("contPreFlag", "N");
			List<FContainer> listCont = dao.findByProperties(queryMap);
			StringBuffer sb = new StringBuffer();
			for (FContainer cont : listCont) {
				sb.append(cont.getContNo()).append("/");
			}
			if (sb.length() > 0) {
				sb.deleteCharAt(sb.length() - 1);
			}
			FConsign consign = consignDao.findById(consId);
			consign.setConsContainersNo(sb.toString());
			consignDao.update(consign);
		}
		return retList;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional(readOnly = true)
	public List<FContainer> query() {
		List retList = new ArrayList();
		retList.addAll(dao.findByProperties());
		if (requestContext.containsKey(Constants.PARAM_EAGER)) {
			retList.addAll(contCargoDao.findByProperties());
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<Object> complexQueryByVoyaId() {
		return dao.complexQueryByVoyaId();
	}
}
