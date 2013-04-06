package com.hitisoft.fos.ffop.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.dao.FBlDao;
import com.hitisoft.fos.ffop.dao.FBlExpenseDao;
import com.hitisoft.fos.ffop.dao.FConsignDao;
import com.hitisoft.fos.ffop.entity.FBl;
import com.hitisoft.fos.ffop.entity.FBlExpense;
import com.hitisoft.fos.ffop.entity.FCargo;
import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.sys.entity.CShipper;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fos.util.FosExceptionEnum;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.NumberUtil;
import com.hitisoft.fw.util.ObjectUtil;
import com.hitisoft.fw.util.StringUtil;

@Service
public class FBlService {
	@Autowired
	private FBlDao dao;
	@Autowired
	private FConsignDao consignDao;
	@Autowired
	private FBlExpenseDao fbeDao;
	@Autowired
	private RequestContext requestContext;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public List save(List entityList) {
		List retList = new ArrayList();
		FBl fbl = null;
		Set<Long> blIdSet = new HashSet<Long>();
		Set<Long> consIdSet = new HashSet<Long>();
		Set<Long> masterIdSet = new HashSet<Long>();
		for (Object obj  : entityList) {
		if(obj instanceof FBl){
			FBl entity = (FBl) obj;
			switch (entity.getRowAction()) {
			case N:
				entity.setId(null);
				checkBlNoDuplicated(entity);
				dao.add(entity);
				retList.add(entity);
				break;
			case M:
				checkBlNoDuplicated(entity);
				retList.add(dao.update(entity));
				break;
			case R:
				FBl delEntity = dao.findById(entity.getId());
				delEntity.setRowAction(RowAction.R);
				dao.update(delEntity);
				entity = delEntity;
				break;
			default:
				throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
			}
			
			if (entity.getBlMBlId() != null) {
				blIdSet.add(entity.getBlMBlId().longValue());
			}
			consIdSet.add(entity.getConsId().longValue());
			if (entity.getConsMasterId() != null) {
				masterIdSet.add(entity.getConsMasterId().longValue());
			}
			fbl = entity;
		}}
		for (Object obj : entityList) {
			if (obj instanceof FBlExpense) {
				FBlExpense c = (FBlExpense) obj;
				c.setConsId(fbl.getConsId());
				c.setConsMblNo(fbl.getBlMBlNo());
				retList.add(fbeDao.saveByRowActionSolo(c));
			}
		}
		syncMasterBl(blIdSet);
		syncConsign(consIdSet);
		syncMasterConsign(masterIdSet);
		return retList;
	}

	@Transactional(readOnly = true)
	public List<FBl> query() {
		return dao.findByProperties();
	}

	/**
	 * 撤销拆单
	 * 
	 * @param queryMap
	 */
	@Transactional
	public void cancelSplit() {
		String id = requestContext.get("blId");
		// 把分单删除
		Map<String, String> map = new HashMap<String, String>();
		map.put("blMBlId", "" + id);
		map.put("blMasterFlag", ConstUtil.FalseStr);
		map.put("blSplitFlag", ConstUtil.TrueStr);
		List<FBl> blList = dao.findByProperties(map);
		for (FBl bl : blList) {
			bl.setRowAction(RowAction.R);
			dao.update(bl);
		}
		// 把主单状态恢复
		FBl master = dao.findById(Long.valueOf(id));
		master.setBlMBlId(null);
		master.setBlMBlNo(null);
		master.setBlMasterFlag(ConstUtil.TrueByte);
		master.setBlMergeFlag(ConstUtil.FalseByte);
		master.setBlSplitFlag(ConstUtil.FalseByte);
		master.setRowAction(RowAction.M);
		dao.update(master);
	}

	/**
	 * 撤销并单
	 * 
	 * @param queryMap
	 */
	@Transactional
	public void cancelMerge() {
		String id = requestContext.get("blId");
		// 把主单删除
		FBl master = dao.findById(Long.valueOf(id));
		master.setRowAction(RowAction.R);
		dao.update(master);
		// 把分单状态恢复
		Map<String, String> map = new HashMap<String, String>();
		map.put("blMBlId", "" + id);
		map.put("blMasterFlag", ConstUtil.FalseStr);
		List<FBl> blList = dao.findByProperties(map);
		for (FBl bl : blList) {
			bl.setBlMBlId(null);
			bl.setBlMBlNo(null);
			bl.setBlMergeFlag(ConstUtil.FalseByte);
			bl.setBlMasterFlag(ConstUtil.TrueByte);
			bl.setRowAction(RowAction.M);
			dao.update(bl);
		}
	}

	/**
	 * 并单
	 * 
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<FBl> merge(List<FBl> entityList) {
		List<FBl> retList = new ArrayList<FBl>();
		FBl master = new FBl();
		String blNo = null;
		Integer packages = new Integer(0);
		Double grossWeight = new Double(0);
		Double netWeight = new Double(0);
		Double measurement = new Double(0);
		for (FBl bl : entityList) {
			if (StringUtil.isBlank(blNo) || bl.getBlNo().compareTo(master.getBlNo()) < 0) {
				blNo = bl.getBlNo();
				BeanUtils.copyProperties(bl, master);
				master.setBlMBlNo(master.getBlNo());
			}
			if (bl.getBlCargoPackages() != null) {
				packages += bl.getBlCargoPackages();
			}
			if (bl.getBlCargoGrossWeight() != null) {
				grossWeight += bl.getBlCargoGrossWeight().doubleValue();
			}
			if (bl.getBlCargoNetWeight() != null) {
				netWeight += bl.getBlCargoNetWeight().doubleValue();
			}
			if (bl.getBlCargoMeasurement() != null) {
				measurement += bl.getBlCargoMeasurement().doubleValue();
			}
		}
		master.setId(null);
		master.setRowAction(RowAction.N);
		master.setBlMergeFlag(ConstUtil.TrueByte);
		master.setBlCargoPackages(packages);
		master.setBlCargoGrossWeight(grossWeight);
		master.setBlCargoNetWeight(netWeight);
		master.setBlCargoMeasurement(measurement);
		master.setBlMasterFlag(ConstUtil.TrueByte);		
		master.setBlTotalSay("SAY TOTAL " + NumberUtil.num2EnWords(packages)
				+ ObjectUtil.null2EmptyString(master.getPackName()) + " ONLY");
		dao.add(master);
		master.setBlMBlId(master.getId().intValue());
		master.setBlMBlNo(master.getBlNo());
		master = dao.update(master);
		retList.add(master);
		for (FBl bl : entityList) {
			bl.setBlMBlId(master.getId().intValue());
			bl.setBlMBlNo(master.getBlNo());
			bl.setBlMergeFlag(ConstUtil.TrueByte);
			bl.setBlMasterFlag(ConstUtil.FalseByte);
			retList.add(dao.update(bl));
		}
		return retList;
	}

	/**
	 * 把分委托上的主提单的统计信息, 累加到主委托上
	 * 
	 * @param consIdSet
	 */
	private void syncMasterConsign(Set<Long> consIdSet) {
		for (Long consId : consIdSet) {
			FConsign master = consignDao.findById(consId);
			Map<String, String> queryMap = new HashMap<String, String>();
			queryMap.put("consMasterId", "" + consId);
			queryMap.put("blMasterFlag", ConstUtil.TrueStr);
			List<FBl> blList = dao.findByProperties(queryMap);
			Integer packages = new Integer(0);
			Double grossWeight = new Double(0);
			Double netWeight = new Double(0);
			Double measurement = new Double(0);
			for (FBl bl : blList) {
				if (bl.getBlCargoPackages() != null) {
					packages += bl.getBlCargoPackages();
				}
				if (bl.getBlCargoGrossWeight() != null) {
					grossWeight += bl.getBlCargoGrossWeight();
				}
				if (bl.getBlCargoNetWeight() != null) {
					netWeight += bl.getBlCargoNetWeight();
				}
				if (bl.getBlCargoMeasurement() != null) {
					measurement += bl.getBlCargoMeasurement();
				}
			}
			master.setBlCargoPackages(packages);
			master.setBlCargoGrossWeight(grossWeight);
			master.setBlCargoNetWeight(netWeight);
			master.setBlCargoMeasurement(measurement);
			consignDao.update(master);
		}
	}

	/**
	 * 把主提单上的统计信息累加到委托上
	 * 
	 * @param consIdSet
	 */
	private void syncConsign(Set<Long> consIdSet) {
		for (Long consId : consIdSet) {
			FConsign consign = consignDao.findById(consId);
			Map<String, String> queryMap = new HashMap<String, String>();
			queryMap.put("consId", "" + consId);
			queryMap.put("blMasterFlag", ConstUtil.TrueStr);
			List<FBl> blList = dao.findByProperties(queryMap);
			Integer packages = new Integer(0);
			Double grossWeight = new Double(0);
			Double netWeight = new Double(0);
			Double measurement = new Double(0);
			for (FBl bl : blList) {
				if (bl.getBlCargoPackages() != null) {
					packages += bl.getBlCargoPackages();
				}
				if (bl.getBlCargoGrossWeight() != null) {
					grossWeight += bl.getBlCargoGrossWeight();
				}
				if (bl.getBlCargoNetWeight() != null) {
					netWeight += bl.getBlCargoNetWeight();
				}
				if (bl.getBlCargoMeasurement() != null) {
					measurement += bl.getBlCargoMeasurement();
				}
			}
			consign.setBlCargoPackages(packages);
			consign.setBlCargoGrossWeight(grossWeight);
			consign.setBlCargoNetWeight(netWeight);
			consign.setBlCargoMeasurement(measurement);
			consignDao.update(consign);
		}
	}

	/**
	 * 把分提单上的统计信息累加到主提单上
	 * 
	 * @param blIdSet
	 */
	private void syncMasterBl(Set<Long> blIdSet) {
		for (Long blId : blIdSet) {
			FBl master = dao.findById(blId);
			// 已经删除的主单,跳过统计
			if (ConstUtil.TrueByte.equals(master.getRemoved()))
				continue;
			Map<String, String> queryMap = new HashMap<String, String>();
			queryMap.put("blMBlId", "" + blId);
			queryMap.put("blMasterFlag", ConstUtil.TrueStr);
			List<FBl> blList = dao.findByProperties(queryMap);
			Integer packages = new Integer(0);
			Double grossWeight = new Double(0);
			Double netWeight = new Double(0);
			Double measurement = new Double(0);
			for (FBl bl : blList) {
				if (bl.getBlCargoPackages() != null) {
					packages += bl.getBlCargoPackages();
				}
				if (bl.getBlCargoGrossWeight() != null) {
					grossWeight += bl.getBlCargoGrossWeight();
				}
				if (bl.getBlCargoNetWeight() != null) {
					netWeight += bl.getBlCargoNetWeight();
				}
				if (bl.getBlCargoMeasurement() != null) {
					measurement += bl.getBlCargoMeasurement();
				}
			}
			master.setBlCargoPackages(packages);
			master.setBlCargoGrossWeight(grossWeight);
			master.setBlCargoNetWeight(netWeight);
			master.setBlCargoMeasurement(measurement);
			dao.update(master);
		}
	}

	@Transactional
	public void updateStatusById() {
		String ids = requestContext.get("blId");
		String[] idArray = ids.split(",");
		Byte blStatus = Byte.valueOf(requestContext.get("blStatus"));
		for (String id : idArray) {
			if (StringUtil.isNotBlank(id)) {
				dao.updateStatusById(Long.valueOf(id), blStatus);
			}
		}
	}

	private void checkBlNoDuplicated(FBl entity) {
		// 散货不检查提单号的唯一性
		if (Constants.CONS_BIZ_TYPE_MARINE.equals(entity.getConsBizType()) && 
				Constants.CONS_SHIP_TYPE_BULK.equals(entity.getConsBizType())) {
			return;
		}
		if (StringUtil.isBlank(entity.getBlNo())) {
			return;
		}
		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put("blNo", entity.getBlNo());
		List<FBl> list = dao.findByProperties(queryMap);
		// 如果>1, 说明肯定重复了
		// 如果=1, 而且主键不等, 说明有另外一个对象有同样的号
		if (list.size() > 1 || (list.size() == 1 && !list.get(0).getId().equals(entity.getId()))) {
			throw new BusinessException(FosExceptionEnum.FFSE_BL_NO_DUPLICATED);
		}
	}

	@Transactional(readOnly = true)
	public List<FBl> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}

	public List<CShipper> queryShipper() {
		String shipperName = requestContext.get("shipperName");
		if(StringUtil.isBlank(shipperName)){
			return null;
		}
		
		List<CShipper> retList = new ArrayList<CShipper>();
		
		List<Object> objList = dao.queryShipper();
		if(objList.size()>0){
			for (Object obj : objList) {
				if (obj instanceof String) {				
					String name = "";
					String str = (String)obj;
					int idx = str.indexOf("\n");				
					if(idx==-1){
						name = str;
					}
					else{
						name = str.substring(0,idx);
					}
					if(StringUtil.isNotBlank(name)){
						CShipper s = new CShipper();
						s.setShipperName(name);
						s.setShipperAddress(str);
						retList.add(s);
					}
				}
			}
		}		
		return retList;
	}
}
