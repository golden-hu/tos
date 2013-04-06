package com.hitisoft.fos.tran.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffse.dao.SExpenseDao;
import com.hitisoft.fos.ffse.entity.SExpense;
import com.hitisoft.fos.sys.dao.CCustomerContactDao;
import com.hitisoft.fos.sys.dao.PEventDao;
import com.hitisoft.fos.sys.dao.PUserDao;
import com.hitisoft.fos.sys.entity.PEvent;
import com.hitisoft.fos.sys.entity.PUser;
import com.hitisoft.fos.tran.dao.TConsignCargoDao;
import com.hitisoft.fos.tran.dao.TConsignDao;
import com.hitisoft.fos.tran.dao.TTransTaskDao;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.tran.entity.TConsignCargo;
import com.hitisoft.fos.tran.entity.TTransTask;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fos.util.SerialFactory;

import com.hitisoft.fw.orm.jpa.BaseDomain;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.StringUtil;

@Service
public class TConsignService {
	@Autowired
	private TConsignDao dao;
	@Autowired
	private TTransTaskDao taskDao;
	@Autowired
	private SerialFactory serialFactory;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private TConsignCargoDao consignCargoDao;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private SExpenseDao expenseDao;
	@Autowired
	private PUserDao userDao;
	@Autowired
	private SExpenseDao expDao;
	@Autowired
	private CCustomerContactDao contactDao;
	@Autowired
	private PEventDao eventDao;

	@Transactional
	public List<BaseDomain> save(List<?> entityList) {
		List<BaseDomain> retList = new ArrayList<BaseDomain>();
		Long parentId = 0L;
		String no = "";
		TConsign cons = null;
		List<TConsignCargo> items = new ArrayList<TConsignCargo>();
		for (Object obj : entityList) {
			if (obj instanceof TConsign) {
				cons = (TConsign) obj;
				RowAction ra = cons.getRowAction();
				if (ra == RowAction.N) {
					cons.setConsStatusExp(0); // 费用确认状态 0:未 1:已
					no = serialFactory.getSerial("tran_no");
					cons.setConsNo(no);
					cons = dao.saveByRowActionSolo(cons);
					parentId = cons.getId();
				} else if (ra == RowAction.M) {
					syncExpense(cons);
					syncTCargo(cons);
					cons = dao.saveByRowActionSolo(cons);
					parentId = cons.getId();
				} else {
					dao.saveByRowActionSolo(cons);
				}
				retList.add(cons);
			} else if (obj instanceof TConsignCargo) {
				TConsignCargo item = (TConsignCargo) obj;
				items.add(item);
			}
		}
		for (TConsignCargo entity : items) {
			RowAction ra = entity.getRowAction();
			if (ra == RowAction.N) {
				entity.setConsBizClass(cons.getConsBizClass());
				entity.setConsId(parentId);
				entity.setConsNo(no);
				entity.setConsigneeId(cons.getConsigneeId());
				entity.setConsigneeName(cons.getConsigneeName());
				entity.setConsigneeContact(cons.getConsigneeContact());
				entity.setConsigneeTel(cons.getConsigneeTel());
				entity.setDeliveryAddress(cons.getConsigneeAddress());
			}
			entity = consignCargoDao.saveByRowActionSolo(entity);
			if (ra != RowAction.R) {
				entity.setConsBizClass(cons.getConsBizClass());
				entity.setConsId(parentId);
				entity.setConsNo(cons.getConsNo());
				entity.setConsigneeId(cons.getConsigneeId());
				entity.setConsigneeName(cons.getConsigneeName());
				entity.setConsigneeContact(cons.getConsigneeContact());
				entity.setConsigneeTel(cons.getConsigneeTel());
				entity.setDeliveryAddress(cons.getConsigneeAddress());

				retList.add(entity);
			}
		}
		return retList;
	}

	@Transactional
	public List<BaseDomain> saveTT(List<?> entityList) {
		List<BaseDomain> retList = new ArrayList<BaseDomain>();
		Long parentId = 0L;
		TConsign task = null;
		List<TConsignCargo> items = new ArrayList<TConsignCargo>();
		for (Object obj : entityList) {
			if (obj instanceof TConsign) {
				task = (TConsign) obj;
				RowAction ra = task.getRowAction();
				if (ra == RowAction.N) {
					String no = serialFactory.getSerial("tran_no");
					task.setConsNo(no);
					task.setStatus(0);
				}
				if (ra == RowAction.R) {
					List<TConsignCargo> tco = consignCargoDao.findByProperty(
							"consId", task.getId() + "");
					for (TConsignCargo tcoT : tco) {
						tcoT.setRowAction(RowAction.R);
						items.add(tcoT);
					}
				}
				
				task = dao.saveByRowActionSolo(task);
				retList.add(task);
				parentId = task.getId();
			} else if (obj instanceof TConsignCargo) {
				TConsignCargo item = (TConsignCargo) obj;
				items.add(item);
			}
		}

		Map<Long, Long> consCargoIdMap = new HashMap<Long, Long>();
		Map<Long, Long> delMap = new HashMap<Long, Long>();
		for (TConsignCargo entity : items) {
			RowAction ra = entity.getRowAction();
			if (ra == RowAction.N) {
				entity.setConsId(parentId);
			}
			if (ra == RowAction.R) {
				delMap.put(entity.getConsCargoId(), entity.getConsCargoId());
			}
			consCargoIdMap
					.put(entity.getConsCargoId(), entity.getConsCargoId());
			entity = consignCargoDao.saveByRowActionSolo(entity);
			retList.add(entity);
		}

		Map<Long, Long> consIdMap = new HashMap<Long, Long>();
		for (Map.Entry<Long, Long> entry : delMap.entrySet()) {
			Integer consId = (Integer) entry.getValue().intValue();
			TConsignCargo conCargo = consignCargoDao.findById(consId
					.longValue());
			if (conCargo != null) {
				conCargo.setCargoStatus(1);
				conCargo.setRowAction(RowAction.M);
				conCargo = consignCargoDao.saveByRowActionSolo(conCargo);
				consIdMap.put(conCargo.getConsId().longValue(), conCargo
						.getConsId().longValue());
			}
		}

		for (Map.Entry<Long, Long> entry : consCargoIdMap.entrySet()) {
			Integer consCargoId = (Integer) entry.getValue().intValue();
			TConsignCargo conCargo = consignCargoDao.findById(consCargoId
					.longValue());
			if (conCargo != null) {
				List<TConsignCargo> tcargo = consignCargoDao.findByProperty(
						"consCargoId", conCargo.getId() + "");
				
				Integer sumDispatchPackages = 0;
				Double sumDispatchGrossWeight = 0.00;
				Double sumDispatchVolume = 0.00;
				for (TConsignCargo tgo : tcargo) {
					sumDispatchPackages += tgo.getPackages();
					sumDispatchGrossWeight += tgo.getGrossWeight()
							.doubleValue();
					sumDispatchVolume += tgo.getVolume().doubleValue();
				}
				
				conCargo.setDispatchPackages(sumDispatchPackages);
				conCargo.setDispatchGrossWeight(BigDecimal
						.valueOf(sumDispatchGrossWeight));
				conCargo.setDispatchVolume(BigDecimal
						.valueOf(sumDispatchVolume));
				if (conCargo.getDispatchPackages() == 0) {
					conCargo.setCargoStatus(1);
				}
				if (conCargo.getDispatchPackages() < conCargo.getPackages()
						&& conCargo.getDispatchPackages() > 0) {
					conCargo.setCargoStatus(2);
				}
				if (conCargo.getDispatchPackages() == conCargo.getPackages()) {
					conCargo.setCargoStatus(3);
				}
				conCargo.setRowAction(RowAction.M);
				conCargo = consignCargoDao.saveByRowActionSolo(conCargo);
				consIdMap.put(conCargo.getConsId(), conCargo.getConsId());
			}
		}

		for (Map.Entry<Long, Long> entry : consIdMap.entrySet()) {
			Long consId = (Long) entry.getValue();
			TConsign tc = dao.findById(consId);

			List<TConsignCargo> tccList = consignCargoDao.findByProperty(
					"consId", consId + "");
			// 合计陆运货物派车数量
			Integer sumDispatchPackages = 0;
			for (TConsignCargo tconCargo : tccList) {
				sumDispatchPackages += tconCargo.getDispatchPackages() == null ? 0
						: tconCargo.getDispatchPackages();
			}
			tc.setDispatchPackages(sumDispatchPackages);
			if (tc.getDispatchPackages() == 0) {
				tc.setStatus(1);
			}
			if (tc.getPackages() > tc.getDispatchPackages()
					&& tc.getDispatchPackages() > 0) {
				tc.setStatus(2);
			}
			if (tc.getPackages() == tc.getDispatchPackages()) {
				tc.setStatus(3);
			}
			if (tc.getLoadDate() == null) {
				tc.setLoadDate(new Date());
			}
			tc.setRowAction(RowAction.M);
			tc = dao.saveByRowActionSolo(tc);
			retList.add(tc);
		}
		return retList;
	}

	
	
	@Transactional
	public List<TConsign> changeOfState(List<TConsign> entityList) {
		List<TConsign> resList = new ArrayList<TConsign>();
		Integer status = Integer.valueOf(requestContext.get("status"));

		if (status == 1) {
			for (TConsign entity : entityList) {
				List<TConsignCargo> tccList = consignCargoDao.findByProperty(
						"consId", "" + entity.getId());
				for (TConsignCargo tcc : tccList) {
					tcc.setCargoStatus(status);// 更改从表状态
					tcc.setRowAction(RowAction.M);
					consignCargoDao.saveByRowActionSolo(tcc);
				}
				entity.setLoadDate(new Date());
				entity.setStatus(status);
				entity = dao.update(entity);
				resList.add(entity);
			}
		}
		if (status == 7) {
			for (TConsign entity : entityList) {
				List<TConsignCargo> tccList = consignCargoDao.findByProperty(
						"consId", "" + entity.getId());
				for (TConsignCargo tcc : tccList) {
					tcc.setCargoStatus(status);
					tcc.setRowAction(RowAction.M);
					consignCargoDao.saveByRowActionSolo(tcc);
				}
				entity.setStatus(status);
				entity = dao.update(entity);
				resList.add(entity);
			}
		}
		if (status == 9) {
			for (TConsign entity : entityList) {
				List<TConsignCargo> tccList = consignCargoDao.findByProperty(
						"consId", "" + entity.getId());
				for (TConsignCargo tcc : tccList) {
					tcc.setCargoStatus(status);
					tcc.setRowAction(RowAction.M);
					consignCargoDao.saveByRowActionSolo(tcc);
				}
				entity.setSignInDate(new Date());
				entity.setSignInStatus(1);
				entity.setSignInContact(sessionContext.getUsername());
				entity.setStatus(status);
				entity = dao.update(entity);
				resList.add(entity);
			}
		}
		return resList;
	}

	@Transactional
	@SuppressWarnings({ "rawtypes" })
	public List transTaskUpdateStatus() {
		List resList = new ArrayList();
		Long id = Long.valueOf(requestContext.get("id"));
		Integer status = Integer.valueOf(requestContext.get("status"));
		resList = ttUpdateStatus(id, status);
		return resList;
	}

	@Transactional
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List ttUpdateStatus(Long id, Integer status) {
		List resList = new ArrayList();

		Map<Integer, Integer> consCargoIdMap = new HashMap<Integer, Integer>();
		Map<Long, Long> consIdMap = new HashMap<Long, Long>();
		Long peId = null;
		String typeName = "";
		if (status == 5) {
			typeName = "全部发车";
		} else if (status == 7) {
			typeName = "全部到站";
		} else if (status == 9) {
			typeName = "全部签收";
		}

		TConsign entity = dao.findById(id);
		if (entity != null) {
			List<TConsignCargo> tcList = consignCargoDao.findByProperty(
					"consId", "" + entity.getId());
			for (TConsignCargo tc : tcList) {
				RowAction ra = tc.getRowAction();
				if (ra != RowAction.R) {
					tc.setCargoStatus(status);
					consCargoIdMap.put(tc.getConsCargoId().intValue(), tc
							.getConsCargoId().intValue());
					tc.setRowAction(RowAction.M);
					tc = consignCargoDao.saveByRowActionSolo(tc);
					resList.add(tc);
				}
			}

			// 在派车单上增加一条车辆跟踪信息
			PEvent pe = createPEvent(id, null, null, status, typeName);
			pe = eventDao.saveByRowActionSolo(pe);
			resList.add(pe);
			peId = pe.getId();
		}

		Map<Long, String> typeNameMap = new HashMap<Long, String>();
		for (Map.Entry<Integer, Integer> entry : consCargoIdMap.entrySet()) {
			Integer consCargoId = (Integer) entry.getValue();
			TConsignCargo conCargo = consignCargoDao.findById(consCargoId
					.longValue());
			if (conCargo != null) {

				Map<String, String> propertyMap = new HashMap<String, String>();
				propertyMap.put("consCargoId", "" + consCargoId);
				propertyMap.put("cargoStatus", "" + status);
				List<TConsignCargo> tcargo = consignCargoDao
						.findByProperties(propertyMap);
				Integer sumPackages = 0;
				Double sumGrossWeight = 0.00;
				Double sumVolume = 0.00;
				for (TConsignCargo tgo : tcargo) {
					if (tgo.getCargoStatus() != null) {
						if (status == 5) {
							sumPackages += tgo.getPackages();
							sumGrossWeight += tgo.getGrossWeight()
									.doubleValue();
							sumVolume += tgo.getVolume().doubleValue();

							conCargo.setDeparturePackages(sumPackages);
							conCargo.setDepartureGrossWeight(BigDecimal
									.valueOf(sumGrossWeight));
							conCargo.setDepartureVolume(BigDecimal
									.valueOf(sumVolume));
							if (conCargo.getDeparturePackages() < conCargo
									.getPackages()
									&& conCargo.getDeparturePackages() > 0) {
								conCargo.setCargoStatus(4);
							}
							if (conCargo.getDeparturePackages() == conCargo
									.getPackages()) {
								conCargo.setCargoStatus(5);
							}
						}
						if (status == 7) {
							sumPackages += tgo.getPackages();
							sumGrossWeight += tgo.getGrossWeight()
									.doubleValue();
							sumVolume += tgo.getVolume().doubleValue();

							conCargo.setStationPackages(sumPackages);
							conCargo.setStationGrossWeight(BigDecimal
									.valueOf(sumGrossWeight));
							conCargo.setStationVolume(BigDecimal
									.valueOf(sumVolume));
							if (conCargo.getPackages() > conCargo
									.getStationPackages()
									&& conCargo.getStationPackages() > 0) {
								conCargo.setCargoStatus(6);
							}
							if (conCargo.getStationPackages() == conCargo
									.getPackages()) {
								conCargo.setCargoStatus(7);
							}
						}
						if (status == 9) {
							sumPackages += tgo.getPackages();
							sumGrossWeight += tgo.getGrossWeight()
									.doubleValue();
							sumVolume += tgo.getVolume().doubleValue();
							conCargo.setSignPackages(sumPackages);
							conCargo.setSignGrossWeight(BigDecimal
									.valueOf(sumGrossWeight));
							conCargo.setSignVolume(BigDecimal
									.valueOf(sumVolume));
							if (conCargo.getPackages() > conCargo
									.getSignPackages()
									&& conCargo.getSignPackages() > 0) {
								conCargo.setCargoStatus(8);
							}
							if (conCargo.getSignPackages() == conCargo
									.getPackages()) {
								conCargo.setCargoStatus(9);
							}
						}
					}
				}
				conCargo.setRowAction(RowAction.M);
				conCargo = consignCargoDao.update(conCargo);
				resList.add(conCargo);
				consIdMap.put(conCargo.getConsId(), conCargo.getConsId());

				String peRemarks = "[" + conCargo.getCargoName() + ":"
						+ sumPackages + "]";
				if (typeNameMap.containsKey(conCargo.getConsId())) {
					String stepTypeName = typeNameMap.get(conCargo.getConsId());
					stepTypeName += peRemarks;
					typeNameMap.put(conCargo.getConsId(), stepTypeName);
				} else {
					typeNameMap.put(conCargo.getConsId(), peRemarks);
				}
			}
		}

		for (Map.Entry<Long, Long> entry : consIdMap.entrySet()) {
			Long consId = (Long) entry.getValue();
			TConsign tc = dao.findById(consId);

			List<TConsignCargo> tccList = consignCargoDao.findByProperty(
					"consId", "" + consId);

			Integer sumPackages = 0;
			if (status == 5) {
				for (TConsignCargo tconCargo : tccList) {
					sumPackages += tconCargo.getDeparturePackages() == null ? 0
							: tconCargo.getDeparturePackages();
				}
				if (tc.getPackages() > sumPackages && sumPackages > 0) {
					tc.setStatus(4);
				}
				if (sumPackages >= tc.getPackages()) {
					tc.setStatus(5);
				}
				if (sumPackages == 0) {
					tc.setStatus(3);
				}
				tc.setDeparturePackages(sumPackages);
				entity.setStartDate(new Date());
			} else if (status == 7) {
				for (TConsignCargo tconCargo : tccList) {
					sumPackages = tconCargo.getStationPackages() == null ? 0
							: tconCargo.getStationPackages();
				}
				if (tc.getPackages() > sumPackages && sumPackages > 0) {
					tc.setStatus(6);
				}
				if (sumPackages >= tc.getPackages()) {
					tc.setStatus(7);
				}
				if (sumPackages == 0) {
					tc.setStatus(5);
				}
				tc.setStationPackages(sumPackages);
				entity.setEndDate(new Date());
			} else if (status == 9) {
				for (TConsignCargo tconCargo : tccList) {
					sumPackages += tconCargo.getSignPackages() == null ? 0
							: tconCargo.getSignPackages();
				}
				if (tc.getPackages() > sumPackages && sumPackages > 0) {
					tc.setStatus(8);
				}
				if (sumPackages >= tc.getPackages()) {
					tc.setStatus(9);
				}
				if (sumPackages == 0) {
					tc.setStatus(7);
				}
				tc.setSignPackages(sumPackages);
				tc.setSignInDate(new Date());
				tc.setSignInStatus(1);
				tc.setSignInContact(sessionContext.getUsername());
			}
			tc.setRowAction(RowAction.M);
			tc = dao.update(tc);
			resList.add(tc);

			String stepTypeName = typeNameMap.get(tc.getId());
			typeName += stepTypeName;
			PEvent pen = createPEvent(id, tc.getId(), peId, status, typeName);
			pen = eventDao.saveByRowActionSolo(pen);
		}
		entity.setStatus(status);
		entity.setRowAction(RowAction.M);
		entity = dao.saveByRowActionSolo(entity);
		resList.add(entity);

		return resList;
	};

	// 跟踪事件
	public PEvent createPEvent(Long ttId, Long consId, Long peId,
			Integer status, String typeName) {
		PEvent pen = new PEvent();
		pen.setBizType("T");
		pen.setRowAction(RowAction.N);
		pen.setStatus(status);
		pen.setTypeName(typeName);
		pen.setUuid(ConstUtil.getUUID());
		pen.setPeId(peId);
		pen.setTrackDate(new Date());
		pen.setOperatorName(sessionContext.getUsername());
		pen.setConsignId(consId);
		pen.setTransId(ttId);
		return pen;
	};

	@Transactional(readOnly = true)
	public List<TConsign> query() {
		List<TConsign> retList = dao.queryListTC();
		return retList;
	}

	@Transactional(readOnly = true)
	public List<TConsign> queryListTT() {
		List<TConsign> retList = dao.queryListTT();
		return retList;
	}

	@Transactional(readOnly = true)
	public List<TConsign> complexQuery(List<HtQuery> conditions) {
		List<TConsign> retList = new ArrayList<TConsign>();
		List<TConsign> objList = dao.complexQuery(conditions);
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				TConsign consign = new TConsign();
				Object[] objArray = (Object[]) obj;
				String m = (String) objArray[0];
				if (m == null)
					m = "";
				consign.setSumMonth(m);
				Long n = (Long) objArray[1];
				if (n == null)
					n = new Long(0);
				consign.setSumConsNo(n);
				Long p = (Long) objArray[2];
				if (p == null)
					p = new Long(0);
				consign.setSumPackages(p);
				BigDecimal w = (BigDecimal) objArray[3];
				if (w == null)
					w = new BigDecimal(0);
				consign.setSumGrossWeight(w);
				retList.add(consign);
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<TTransTask> queryTask() {
		return taskDao.findByProperties();
	}

	@Transactional
	public List<TConsign> updateStatus() {
		List<TConsign> resList = new ArrayList<TConsign>();
		Long id = Long.valueOf(requestContext.get("id"));
		Integer status = Integer.valueOf(requestContext.get("status"));
		TConsign entity = dao.findById(id);
		if (entity != null) {
			entity.setStatus(status);
			List<TConsignCargo> tccList = consignCargoDao.findByProperty(
					"consId", "" + entity.getId());
			for (TConsignCargo tcc : tccList) {
				tcc.setCargoStatus(status);
				tcc.setRowAction(RowAction.M);
				tcc = consignCargoDao.saveByRowActionSolo(tcc);
			}
			entity = dao.update(entity);
			resList.add(entity);
		}
		return resList;
	}

	/**
	 * 设置费用
	 * 
	 * @param cons
	 *            托运单对象
	 * @param chclId
	 *            费用类型ID
	 * @param chclCode费用类型CODE
	 * @param charName
	 *            费用名称
	 * @param custId
	 *            结算对象ID
	 * @param custName
	 *            结算对象
	 * @param custNameFlag
	 *            结算对象
	 * @param expeTyep
	 *            费用方式
	 * @param expe
	 *            金额
	 */
	public void setExpense(TConsign cons, long chclId, String chclCode,
			String charName, int custId, String custName, String expeTyep,
			float expe) {
		SExpense ex = new SExpense();
		ex.setConsId(cons.getId().longValue());// 委托ID
		ex.setConsNo(cons.getConsNo());// 委托号
		ex.setConsDate(cons.getConsDate());// 委托日期
		ex.setConsCustId(cons.getCustId().longValue());// 委托单位ID
		ex.setConsCustName(cons.getCustName()); // 委托单位
		ex.setConsBizType("T");// 业务类型‘T’陆运
		ex.setConsBizClass("O");
		ex.setChclId(chclId);// 费用类型ID
		ex.setChclCode(chclCode);// 费用CODE
		ex.setCharId(chclId);// 费用ID
		ex.setCharName(charName);// 费用名称
		ex.setCharNameEn(chclCode);// 费用简称
		ex.setUnitName("EACH");// 单票
		ex.setCurrCode("CNY");// 币别代码
		ex.setCustId(custId);// 结算单位ID
		ex.setCustName(custName);// 结算单位
		ex.setExpeType(expeTyep);// 收、付
		ex.setPateCode("P");// 预付/到付
		ex.setExpeDate(new Date());// 费用产生日期
		ex.setExpeUnitPrice(new BigDecimal(expe));// 计算单价
		ex.setExpeNum(BigDecimal.valueOf(1));// 计量数量
		ex.setExpeTotalAmount(new BigDecimal(expe));// 总金额
		ex.setExpeExRate(BigDecimal.valueOf(1));
		ex.setExpeRcAmount(ex.getExpeTotalAmount());
		ex.setExpeUpdateBy(sessionContext.getUsername());// 当前登录号
		ex.setExpeUpdateTime(new Date());// 费用更新时间
		ex.setCreateBy(sessionContext.getUsername());// 创建人
		ex.setCreateTime(new Date());
		ex.setModifyBy(sessionContext.getUsername());// 修改人
		ex.setModifyTime(new Date());
		ex.setCompCode(sessionContext.getCompCode());// 公司代码
		ex.setVersion(0);
		ex.setRemoved((byte) 0);
		expDao.add(ex);
	}

	// 费用提交（应收提交）——>费用
	@Transactional
	public List<BaseDomain> expenseSubmitRe(List<?> entityList) {
		List<BaseDomain> retList = new ArrayList<BaseDomain>();
		TConsign cons = null;
		for (Object obj : entityList) {
			if (obj instanceof TConsign) {
				cons = (TConsign) obj;
				float xff = 0, dff = 0, hdf = 0, yjf = 0, zzhk = 0;
				if (cons.getExpenseSpot() != null) {
					xff = cons.getExpenseSpot().floatValue();
				}
				if (cons.getExpenseFreight() != null) {
					dff = cons.getExpenseFreight().floatValue();
				}
				if (cons.getExpenseReceipt() != null) {
					hdf = cons.getExpenseReceipt().floatValue();
				}
				if (cons.getExpenseMonth() != null) {
					yjf = cons.getExpenseMonth().floatValue();
				}
				if (cons.getExpenseDiscount() != null) {
					zzhk = cons.getExpenseDiscount().floatValue();
				}
				// 现付
				if (xff > 0)
					this.setExpense(cons, 1, "XF", "现付", cons.getCustId(),
							cons.getCustName(), "R", xff);
				// 到付
				if (dff > 0)
					this.setExpense(cons, 2, "DF", "到付", cons.getCustId(),
							cons.getCustName(), "R", dff);
				// 回单付
				if (hdf > 0)
					this.setExpense(cons, 3, "HDF", "回单付", cons.getCustId(),
							cons.getCustName(), "R", hdf);
				// 月结
				if (yjf > 0)
					this.setExpense(cons, 4, "YJ", "月付", cons.getCustId(),
							cons.getCustName(), "R", yjf);
				// 中转回扣
				if (zzhk > 0)
					this.setExpense(cons, 5, "ZZHK", "中转回扣", cons.getCustId(),
							cons.getCustName(), "P", zzhk);
				cons.setExpeSubmitStatus(1);
				cons = dao.update(cons);
			}
			retList.add(cons);
		}
		return retList;
	}

	// 费用-业务确认
	@Transactional
	public void updateExpStatus() {
		Long id = Long.valueOf(requestContext.get("id"));
		Integer status = Integer.valueOf(requestContext.get("consStatusExp"));
		TConsign entity = dao.findById(id);
		if (entity != null) {
			entity.setConsStatusExp(status);
			dao.update(entity);
		}
	}

	// 复杂查询
	@Transactional(readOnly = true)
	public List<TConsign> complexSearch(List<HtQuery> conditions) {
		String key = requestContext.get("typeKey");
		if (key.equals("1")) {
			List<TConsign> consignList = dao.complexSearch(conditions);
			Long uid = sessionContext.getUserid();
			PUser myself = userDao.findById(uid);
			List<TConsign> oList = new ArrayList<TConsign>();
			for (TConsign cons : consignList) {
				Short editable = ConstUtil.FalseShort;
				if (ConstUtil.TrueByte.equals(myself.getUserAllEditFlag())
						|| uid.equals(cons.getConsOperatorId().longValue())
						|| myself.getUserName().equals(cons.getCreateBy())) {
					editable = ConstUtil.TrueShort;
				}
				cons.setEditable(editable);
				oList.add(cons);
			}
			if (consignList.size() > 0)
				consignList.clear();
			consignList = oList;
			return consignList;
		}
		// 订单查询<从次表查询数据>
		else {
			return this.orderNoSearch(conditions);
		}
	}

	// 根据订单编号查询
	@Transactional(readOnly = true)
	public List<TConsign> orderNoSearch(List<HtQuery> conditions) {
		List<TConsign> consignList = dao.orderNoSearch(conditions);
		Long uid = sessionContext.getUserid();
		PUser myself = userDao.findById(uid);
		List<TConsign> oList = new ArrayList<TConsign>();
		for (TConsign cons : consignList) {
			Short editable = ConstUtil.FalseShort;
			if (ConstUtil.TrueByte.equals(myself.getUserAllEditFlag())
					|| uid.equals(cons.getConsOperatorId().longValue())
					|| myself.getUserName().equals(cons.getCreateBy())) {
				editable = ConstUtil.TrueShort;
			}
			cons.setEditable(editable);
			oList.add(cons);
		}
		if (consignList.size() > 0)
			consignList.clear();
		consignList = oList;
		return consignList;
	}

	@Transactional(readOnly = true)
	public List<TConsign> trankComplexSearch(List<HtQuery> conditions) {
		List<TConsign> consignList = dao.complexSearch(conditions);
		Long uid = sessionContext.getUserid();
		PUser myself = userDao.findById(uid);
		List<TConsign> oList = new ArrayList<TConsign>();
		for (TConsign cons : consignList) {
			Short editable = ConstUtil.FalseShort;
			if (ConstUtil.TrueByte.equals(myself.getUserAllEditFlag())
					|| uid.equals(cons.getConsOperatorId().longValue())
					|| myself.getUserName().equals(cons.getCreateBy())) {
				editable = ConstUtil.TrueShort;
			}
			cons.setEditable(editable);
			oList.add(cons);
		}
		if (consignList.size() > 0)
			consignList.clear();
		consignList = oList;
		return consignList;
	}

	@Transactional(readOnly = true)
	public List<TConsign> complexTransSearch(List<HtQuery> conditions) {
		List<TConsign> tttList = dao.complexTransSearch(conditions);
		Long uid = sessionContext.getUserid();
		PUser myself = userDao.findById(uid);
		List<TConsign> oList = new ArrayList<TConsign>();
		for (TConsign tt : tttList) {
			Short editable = ConstUtil.FalseShort;
			if (ConstUtil.TrueByte.equals(myself.getUserAllEditFlag())
					|| myself.getUserName().equals(tt.getCreateBy())) {
				editable = ConstUtil.TrueShort;
			}
			tt.setEditable(editable);
			oList.add(tt);
		}
		if (tttList.size() > 0)
			tttList.clear();
		tttList = oList;
		return tttList;
	}

	// 陆运回单跟踪报表
	@Transactional(readOnly = true)
	public List<TConsign> receiptReport(List<HtQuery> conditions) {
		List<TConsign> consignList = dao.complexSearch(conditions);
		Long uid = sessionContext.getUserid();
		PUser myself = userDao.findById(uid);
		for (TConsign consign : consignList) {
			Short editable = ConstUtil.FalseShort;
			if (ConstUtil.TrueByte.equals(myself.getUserAllEditFlag())
					|| uid.equals(consign.getConsOperatorId().longValue())
					|| myself.getUserName().equals(consign.getCreateBy())) {
				editable = ConstUtil.TrueShort;
			}
			consign.setEditable(editable);
		}
		return consignList;
	}

	// 从费用表获取单价（收）
	public BigDecimal expeUnitPriceR(Map<String, String> propertyMap) {
		propertyMap.put("expeType", "R");
		propertyMap.put("chclCode", "YF");
		List<SExpense> expeList = (List<SExpense>) expDao
				.findByProperties(propertyMap);
		BigDecimal ep = null;
		if (expeList != null && expeList.size() > 0) {
			ep = expeList.get(0).getExpeUnitPrice();
		}
		return ep;
	}

	// 从费用表获取单价（收）
	public BigDecimal expeUnitPriceP(Map<String, String> propertyMap) {
		propertyMap.put("expeType", "P");
		propertyMap.put("chclCode", "YF");
		List<SExpense> expeList = (List<SExpense>) expDao
				.findByProperties(propertyMap);
		BigDecimal ep = null;
		if (expeList != null && expeList.size() > 0) {
			ep = expeList.get(0).getExpeUnitPrice();
		}
		return ep;
	}

	private TConsign getInfor(String str) {
		String name = "";
		int idx = str.indexOf("\n");
		if (idx == -1) {
			name = str;
		} else {
			name = str.substring(0, idx);
		}
		if (StringUtil.isNotBlank(name)) {
			TConsign tc = new TConsign();
			tc.setStartStation(name);
			tc.setEndStation(name);
			return tc;
		}
		return null;
	}

	@Transactional(readOnly = true)
	public List<TConsign> queryStartStation() {
		List<TConsign> retList = new ArrayList<TConsign>();
		List<TConsign> objList = dao.queryStartStation();
		if (objList.size() > 0) {
			for (Object obj : objList) {
				if (obj instanceof Object) {
					String tc = (String) obj;
					TConsign t = getInfor(tc);
					if (t != null) {
						retList.add(t);
					}
				}
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<TConsign> queryEndStation() {
		List<TConsign> retList = new ArrayList<TConsign>();
		List<TConsign> objList = dao.queryEndStation();
		if (objList.size() > 0) {
			for (Object obj : objList) {
				if (obj instanceof Object) {
					String tc = (String) obj;
					TConsign t = getInfor(tc);
					if (t != null) {
						retList.add(t);
					}
				}
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<TConsign> queryConsignee() {
		List<TConsign> retList = new ArrayList<TConsign>();
		List<Object> objList = dao.queryConsignee();
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				String name = "";
				Object[] objArray = (Object[]) obj;
				name = (String) objArray[0];
				if (StringUtil.isNotBlank(name)) {
					TConsign tc = new TConsign();
					tc.setConsigneeName(name);
					tc.setConsigneeAddress((String) objArray[1]);
					tc.setConsigneeContact((String) objArray[2]);
					tc.setConsigneeMobile((String) objArray[3]);
					retList.add(tc);
				}
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<TConsign> queryDriverName() {
		List<TConsign> retList = new ArrayList<TConsign>();
		List<TConsign> objList = dao.queryDriverName();
		if (objList.size() > 0) {
			for (Object obj : objList) {
				if (obj instanceof Object) {
					String name = "";
					Object[] objArray = (Object[]) obj;
					name = (String) objArray[0];
					if (StringUtil.isNotBlank(name)) {
						TConsign tt = new TConsign();
						tt.setDriverName(name);
						tt.setVehicleNo((String) objArray[1]);
						tt.setDriverTel((String) objArray[2]);
						retList.add(tt);
					}
				}
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<TConsign> queryVehicleNo() {
		List<TConsign> retList = new ArrayList<TConsign>();
		List<TConsign> objList = dao.queryVehicleNo();
		if (objList.size() > 0) {
			for (Object obj : objList) {
				if (obj instanceof Object) {
					String name = "";
					name = (String) obj;
					if (StringUtil.isNotBlank(name)) {
						TConsign tt = new TConsign();
						tt.setVehicleNo(name);
						retList.add(tt);
					}
				}
			}
		}
		return retList;
	}

	@SuppressWarnings({ "rawtypes" })
	private void checkMergeStatistics(List<TConsign> retList, List objList) {
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;
				TConsign consign = (TConsign) objArray[0];

				BigDecimal r = (BigDecimal) objArray[1];
				BigDecimal p = (BigDecimal) objArray[2];
				if (r == null)
					r = new BigDecimal(0);
				if (p == null)
					p = new BigDecimal(0);
				consign.setSumR(r.doubleValue());
				consign.setSumP(p.doubleValue());
				BigDecimal grossProfit = r.subtract(p);
				consign.setGrossProfit(grossProfit.doubleValue());

				BigDecimal sumRUsd = (BigDecimal) objArray[3];
				if (sumRUsd == null)
					sumRUsd = new BigDecimal(0);
				consign.setSumRUsd(sumRUsd.doubleValue());

				BigDecimal sumRCny = (BigDecimal) objArray[4];
				if (sumRCny == null)
					sumRCny = new BigDecimal(0);
				consign.setSumRCny(sumRCny.doubleValue());

				BigDecimal sumPUsd = (BigDecimal) objArray[5];
				if (sumPUsd == null)
					sumPUsd = new BigDecimal(0);
				consign.setSumPUsd(sumPUsd.doubleValue());

				BigDecimal sumPCny = (BigDecimal) objArray[6];
				if (sumPCny == null)
					sumPCny = new BigDecimal(0);
				consign.setSumPCny(sumPCny.doubleValue());

				BigDecimal sumRUsdInvoice = (BigDecimal) objArray[7];
				if (sumRUsdInvoice == null)
					sumRUsdInvoice = new BigDecimal(0);
				consign.setSumRUsdInvoice(sumRUsdInvoice.doubleValue());

				BigDecimal sumRCnyInvoice = (BigDecimal) objArray[8];
				if (sumRCnyInvoice == null)
					sumRCnyInvoice = new BigDecimal(0);
				consign.setSumRCnyInvoice(sumRCnyInvoice.doubleValue());

				BigDecimal sumPUsdInvoice = (BigDecimal) objArray[9];
				if (sumPUsdInvoice == null)
					sumPUsdInvoice = new BigDecimal(0);
				consign.setSumPUsdInvoice(sumPUsdInvoice.doubleValue());

				BigDecimal sumPCnyInvoice = (BigDecimal) objArray[10];
				if (sumPCnyInvoice == null)
					sumPCnyInvoice = new BigDecimal(0);
				consign.setSumPCnyInvoice(sumPCnyInvoice.doubleValue());

				BigDecimal sumRUsdWriteOff = (BigDecimal) objArray[11];
				if (sumRUsdWriteOff == null)
					sumRUsdWriteOff = new BigDecimal(0);
				consign.setSumRUsdWriteOff(sumRUsdWriteOff.doubleValue());

				BigDecimal sumRCnyWriteOff = (BigDecimal) objArray[12];
				if (sumRCnyWriteOff == null)
					sumRCnyWriteOff = new BigDecimal(0);
				consign.setSumRCnyWriteOff(sumRCnyWriteOff.doubleValue());

				BigDecimal sumPUsdWriteOff = (BigDecimal) objArray[13];
				if (sumPUsdWriteOff == null)
					sumPUsdWriteOff = new BigDecimal(0);
				consign.setSumPUsdWriteOff(sumPUsdWriteOff.doubleValue());

				BigDecimal sumPCnyWriteOff = (BigDecimal) objArray[14];
				if (sumPCnyWriteOff == null)
					sumPCnyWriteOff = new BigDecimal(0);
				consign.setSumPCnyWriteOff(sumPCnyWriteOff.doubleValue());

				BigDecimal sumPOther = (BigDecimal) objArray[15];
				if (sumPOther == null)
					sumPOther = new BigDecimal(0);
				consign.setSumPOther(sumPOther.doubleValue());

				BigDecimal sumROther = (BigDecimal) objArray[15];
				if (sumROther == null)
					sumROther = new BigDecimal(0);
				consign.setSumROther(sumROther.doubleValue());

				if (!r.equals(new BigDecimal(0))) {
					Double grossProfitRate = grossProfit.doubleValue() * 100
							/ r.doubleValue();
					consign.setGrossProfitRate(String.valueOf(grossProfitRate));
				} else {
					consign.setGrossProfitRate("0");
				}
				retList.add(consign);
			}
		}
	}

	// 单票审核
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional(readOnly = true)
	public List complexQueryCheck(List<HtQuery> conditions) {
		List retList = new ArrayList();
		List objList = dao.complexQueryCheck(conditions);
		checkMergeStatistics(retList, objList);
		if (requestContext.containsKey(Constants.PARAM_EAGER)) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("consId", requestContext.get("id"));
			retList.addAll(expenseDao.findByProperties(map));
		}
		return retList;
	}

	// 审核-财务-经理
	@Transactional
	public void updateStatusAud() {
		Long id = Long.valueOf(requestContext.get("id"));
		Byte status = Byte.valueOf(requestContext.get("consStatusAud"));
		TConsign entity = dao.findById(id);
		if (entity != null) {
			entity.setConsStatusAud(status);
			if (status == 1 || status == 2) {
				entity.setConsStatusExp(1);
			} else
				entity.setConsStatusExp(0);
			dao.update(entity);
		}
	}

	/**
	 * 委托上的consDate, consSailDate, consMblNo,
	 * consHblNo,shliId,vessName,voyaName,consPolEn,consPodEn修改的时候,
	 * 要同步S_EXPENSE上的相关字段
	 * 
	 * @param entity
	 */
	private void syncExpense(TConsign entity) {
		TConsign dbEntity = dao.findById(entity.getId());
		boolean bChanged = false;
		if ((entity.getConsDate() == null && dbEntity.getConsDate() != null)
				|| (entity.getConsDate() != null && dbEntity.getConsDate() == null))
			bChanged = true;
		else if ((entity.getStartDate() == null && dbEntity.getStartDate() != null)
				|| (entity.getStartDate() != null && dbEntity.getStartDate() == null))
			bChanged = true;
		else if ((StringUtil.isBlank(entity.getVehicleNo()) && StringUtil
				.isNotBlank(dbEntity.getVehicleNo()))
				|| (StringUtil.isNotBlank(entity.getVehicleNo()) && StringUtil
						.isBlank(dbEntity.getVehicleNo())))
			bChanged = true;
		else if (entity.getConsDate() != null && dbEntity.getConsDate() != null
				&& !entity.getConsDate().equals(dbEntity.getConsDate()))
			bChanged = true;
		else if (entity.getStartDate() != null
				&& dbEntity.getStartDate() != null
				&& !entity.getStartDate().equals(dbEntity.getStartDate()))
			bChanged = true;
		else if (StringUtil.isNotBlank(entity.getVehicleNo())
				&& StringUtil.isNotBlank(dbEntity.getVehicleNo())
				&& !entity.getVehicleNo().equals(dbEntity.getVehicleNo()))
			bChanged = true;
		else if (entity.getSalesRepId() != dbEntity.getSalesRepId())
			bChanged = true;
		else if (!entity.getSalesRepName().equals(dbEntity.getSalesRepName()))
			bChanged = true;
		else if (entity.getConsOperatorId() != dbEntity.getConsOperatorId())
			bChanged = true;
		else if (entity.getConsOperatorName() != null
				&& dbEntity.getConsOperatorName() != null
				&& !entity.getConsOperatorName().equals(
						dbEntity.getConsOperatorName()))
			bChanged = true;
		else if (entity.getGrouId() != dbEntity.getGrouId())
			bChanged = true;
		else if (!entity.getGrouName().equals(dbEntity.getGrouName()))
			bChanged = true;

		if (bChanged) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("consId", "" + entity.getId());
			List<SExpense> list = expenseDao.findByProperties(map);

			for (SExpense e : list) {
				e.setConsDate(entity.getConsDate());
				e.setConsSailDate(entity.getStartDate());
				e.setVoyaName(entity.getVehicleNo());
				e.setConsSalesRepId(entity.getSalesRepId());
				e.setConsSalesRepName(entity.getSalesRepName());
				e.setConsOperatorId(entity.getConsOperatorId());
				e.setConsOperatorName(entity.getConsOperatorName());
				e.setGrouId(entity.getGrouId());
				e.setGrouName(entity.getGrouName());
				e.setRowAction(RowAction.M);
				expenseDao.saveByRowActionSolo(e);
			}
		}
	}

	/**
	 * 委托上的consigneeName, consigneeContact, consigneeTel, deliveryAddress,修改的时候,
	 * 要同步T_CONSIGN_CARGO上的相关字段
	 * 
	 * @param entity
	 */
	private void syncTCargo(TConsign entity) {
		TConsign dbEntity = dao.findById(entity.getId());
		boolean consignChanged = false;
		if (!entity.getConsigneeName().equals(dbEntity.getConsigneeName()))
			consignChanged = true;
		else if (StringUtil.isNotBlank(entity.getConsigneeContact())
				&& StringUtil.isNotBlank(dbEntity.getConsigneeContact())
				&& !entity.getConsigneeContact().equals(
						dbEntity.getConsigneeContact()))
			consignChanged = true;
		else if (StringUtil.isNotBlank(entity.getConsigneeMobile())
				&& StringUtil.isNotBlank(dbEntity.getConsigneeMobile())
				&& !entity.getConsigneeMobile().equals(
						dbEntity.getConsigneeMobile()))
			consignChanged = true;
		else if (StringUtil.isNotBlank(entity.getDeliveryAddress())
				&& StringUtil.isNotBlank(dbEntity.getDeliveryAddress())
				&& !entity.getDeliveryAddress().equals(
						dbEntity.getDeliveryAddress()))
			consignChanged = true;
		if (consignChanged) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("consId", "" + entity.getId());
			List<TConsignCargo> list = consignCargoDao.findByProperties(map);

			for (TConsignCargo e : list) {
				e.setConsigneeId(entity.getConsigneeId());
				e.setConsigneeName(entity.getConsigneeName());
				e.setConsigneeContact(entity.getConsigneeContact());
				e.setConsigneeTel(entity.getConsigneeMobile());
				e.setDeliveryAddress(entity.getDeliveryAddress());
				e.setRowAction(RowAction.M);
				consignCargoDao.saveByRowActionSolo(e);
			}
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional(readOnly = true)
	public List transPortTask() {
		List contractInfor = new ArrayList();
		Long id = Long.valueOf(requestContext.get("id"));
		TConsign enty = dao.findById(id);
		contractInfor.add(enty);
		Map<String, String> map = new HashMap<String, String>();
		map.put("consId", requestContext.get("id"));
		contractInfor.addAll(consignCargoDao.findByProperties(map));
		return contractInfor;
	}
	
	@Transactional
	public List<TConsign> distrQ() {
		List<TConsign> retList = dao.queryDistr();
		return retList;
	}

	@Transactional
	public List<TConsign> queryS(List<HtQuery> conditions) {
		List<TConsign> retList = dao.queryTcons(conditions);
		return retList;
	}

	@Transactional
	public List<TConsign> queryT(List<HtQuery> conditions) {
		List<TConsign> retList = dao.queryTrans(conditions);
		return retList;
	}

	@Transactional(readOnly = true)
	public List<TConsign> tconsSearch(List<HtQuery> conditions) {
		List<TConsign> objList = dao.tconsSearch(conditions);
		return objList;
	}
	
	public CCustomerContactDao getContactDao() {
		return contactDao;
	}

	public void setContactDao(CCustomerContactDao contactDao) {
		this.contactDao = contactDao;
	}

}