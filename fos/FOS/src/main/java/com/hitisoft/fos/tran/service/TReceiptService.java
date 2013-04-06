package com.hitisoft.fos.tran.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TConsignCargoDao;
import com.hitisoft.fos.tran.dao.TConsignDao;
import com.hitisoft.fos.tran.dao.TReceiptDao;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.tran.entity.TConsignCargo;
import com.hitisoft.fos.tran.entity.TReceipt;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;

@Service
public class TReceiptService {
	@Autowired
	private TReceiptDao dao;
	@Autowired
	private TConsignCargoDao consCargoDao;
	@Autowired
	private TConsignDao consDao;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;

	@Transactional
	public List<TReceipt> save(List<TReceipt> entityList) {
		//List<TReceipt>：TReceipt对象类型的（List）表
		return dao.saveByRowAction(entityList);
	}

	@Transactional
	@SuppressWarnings({ "rawtypes" })
	public List general() {
		List<TReceipt> retList = new ArrayList<TReceipt>();
		String id = (String) requestContext.get("ttid");
		if(id.isEmpty()){
			return null;
		}
		TConsign tt = consDao.findById(Long.valueOf(id));
		if (tt != null) {
			tt.setReceiptStatus(1);
			tt.setRowAction(RowAction.M);
			consDao.saveByRowActionSolo(tt);
			
			List<TConsignCargo> tcList = consCargoDao.findByProperty("consId", id);
			Map<Integer, Integer> idMap = new HashMap<Integer, Integer>();
			for (TConsignCargo tc : tcList) {
					idMap.put(tc.getTconsId(),tc.getTconsId());
			}
			
			for (Map.Entry<Integer, Integer> entry : idMap.entrySet()) {
				TConsign tcon = consDao.findById(entry.getValue().longValue());

				TReceipt tr = new TReceipt();
				tr.setVersion(0);
				tr.setRemoved((byte) 0);
				tr.setRowAction(RowAction.N);
				tr.setUuid(ConstUtil.getUUID());
				tr.setCompCode(sessionContext.getCompCode());
				tr.setConsId(tcon.getId());
				tr.setConsNo(tcon.getConsNo());
				tr.setTransTaskId(Long.valueOf(id));
				tr = dao.saveByRowActionSolo(tr);
				retList.add(tr);
			}
		}
		return retList;
	}

	@Transactional
	public List<TReceipt> query(List<HtQuery> conditions) {
		List<TReceipt> list=new ArrayList<TReceipt>();
		List<Object> retList = dao.queryReceipts(conditions);
		for (Object ob : retList) {
			Object[] obj = (Object[]) ob;
			TReceipt tr = (TReceipt) obj[0];
			String custName = (String) obj[1];
			Date consDate = (Date) obj[2];
			String transTaskNo=(String)obj[3];
			if (custName != null)
				tr.setCustName(custName);
			if (consDate != null)
				tr.setConsDate(consDate);
			if(transTaskNo!=null)
				tr.setTransTaskNo(transTaskNo);
			list.add(tr);
		}
		return list;
	}
	
}