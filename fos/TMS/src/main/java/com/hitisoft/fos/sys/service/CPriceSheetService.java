package com.hitisoft.fos.sys.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.CPriceLineDao;
import com.hitisoft.fos.sys.dao.CPriceRecordDao;
import com.hitisoft.fos.sys.dao.CPriceSheetDao;
import com.hitisoft.fos.sys.entity.CPriceLine;
import com.hitisoft.fos.sys.entity.CPriceRecord;
import com.hitisoft.fos.sys.entity.CPriceSheet;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.util.NumberUtil;
import com.hitisoft.fw.util.StringUtil;

@Service
public class CPriceSheetService {
	@Autowired
	private CPriceSheetDao dao;
	@Autowired
	private CPriceLineDao lineDao;
	@Autowired
	private CPriceRecordDao recordDao;
	@Autowired
	private RequestContext requestContext;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public List save(List entityList) {
		List retList = new ArrayList();
		Map<Long, Long> idMap = new HashMap<Long, Long>();
		Map<Long, Long> idMap2 = new HashMap<Long, Long>();
		// handle parent first
		for (Object obj : entityList) {
			if (obj instanceof CPriceSheet) {
				CPriceSheet entity = (CPriceSheet) obj;
				Long oldId = entity.getId();
				RowAction ra = entity.getRowAction();
				entity = dao.saveByRowActionSolo(entity);
				if (ra != RowAction.R) {
					retList.add(entity);
				}
				idMap.put(oldId, entity.getId());
			}
		}

		// handle child
		for (Object obj : entityList) {
			if (obj instanceof CPriceLine) {
				CPriceLine entity = (CPriceLine) obj;
				Long oldId = entity.getId();
				RowAction ra = entity.getRowAction();
				if (ra == RowAction.N) {
					entity.setPrshId(NumberUtil.frontId2DbId(idMap, entity.getPrshId().longValue()).intValue());
				}
				entity = lineDao.saveByRowActionSolo(entity);
				if (ra != RowAction.R) {
					retList.add(entity);
				}
				idMap2.put(oldId, entity.getId());
			}
		}

		// handle child's child
		for (Object obj : entityList) {
			if (obj instanceof CPriceRecord) {
				CPriceRecord entity = (CPriceRecord) obj;
				RowAction ra = entity.getRowAction();
				if (ra == RowAction.N) {
					entity.setPrshId(NumberUtil.frontId2DbId(idMap, entity.getPrshId().longValue()).intValue());
					entity.setPrliId(NumberUtil.frontId2DbId(idMap2, entity.getPrliId().longValue()).intValue());
				}
				entity = recordDao.saveByRowActionSolo(entity);
				if (ra != RowAction.R) {
					retList.add(entity);
				}
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<CPriceSheet> query() {
		return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<CPriceRecord> complexQuery(List<HtQuery> conditions) {
		List<CPriceRecord> retList = new ArrayList<CPriceRecord>();
		List<?> objList = dao.query(conditions);
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;
				CPriceSheet sheet = (CPriceSheet) objArray[0];
				CPriceLine line = (CPriceLine) objArray[1];
				CPriceRecord record = (CPriceRecord) objArray[2];
				// 需要把两个主表的字段, 复制到子表record上
				// sheet -> record
				record.setPrshVendorName(sheet.getPrshVendorName());
				record.setPrshCarrierName(sheet.getPrshCarrierName());
				record.setPrshBizType(sheet.getPrshBizType());
				record.setPrshContractNo(sheet.getPrshContractNo());
				record.setPrshPolEn(sheet.getPrshPolEn());
				record.setShliName(sheet.getShliName());
				record.setVessName(sheet.getVessName());
				record.setVoyaName(sheet.getVoyaName());
				if (sheet.getPrshStartDate() != null) {
					record.setPrshStartDate((Date) sheet.getPrshStartDate().clone());
				}
				if (sheet.getPrshEndDate() != null) {
					record.setPrshEndDate((Date) sheet.getPrshEndDate().clone());
				}
				record.setPrshRemarks(sheet.getPrshRemarks());
				record.setPrshStatus(sheet.getPrshStatus());
				// line -> record
				record.setPrliCountryDName(line.getPrliCountryDName());
				record.setPrliPodEn(line.getPrliPodEn());
				record.setPrliCountryTName(line.getPrliCountryTName());
				record.setPrliPotEn(line.getPrliPotEn());
				record.setCaclName(line.getCaclName());
				record.setPateName(line.getPateName());
				record.setTranName(line.getTranName());
				record.setPrliShipDate(line.getPrliShipDate());
				// record.setPrliCompositeFlag(line.getPrliCompositeFlag());
				record.setPrliDuration(line.getPrliDuration());
				record.setPrliRemarks(line.getPrliRemarks());

				retList.add(record);
			}
		}
		return retList;
	}

	@Transactional
	public void updateStatus() {
		String ids = requestContext.get("prshId");
		String[] idArray = ids.split(",");
		Byte status = Byte.valueOf(requestContext.get("prshStatus"));
		for (String id : idArray) {
			if (StringUtil.isNotBlank(id)) {
				CPriceSheet sheet = dao.findById(Long.valueOf(id));
				sheet.setPrshStatus(status);
				dao.update(sheet);
			}
		}
	}

}
