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
import com.hitisoft.fos.sys.dao.PEventDao;
import com.hitisoft.fos.sys.entity.PEvent;
import com.hitisoft.fos.tran.dao.TCargoDao;
import com.hitisoft.fos.tran.dao.TConsignCargoDao;
import com.hitisoft.fos.tran.dao.TConsignDao;
import com.hitisoft.fos.tran.dao.TTransTaskDao;
import com.hitisoft.fos.tran.entity.TCargo;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.tran.entity.TConsignCargo;
import com.hitisoft.fos.tran.entity.TTransTask;
import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fw.orm.jpa.BaseDomain;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.orm.util.SqlOp;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;

@Service
public class TTransTaskService {
	@Autowired
	private TTransTaskDao dao;
	@Autowired
	private TCargoDao cargoDao;
	@Autowired
	private TConsignCargoDao consCargoDao;
	@Autowired
	private TConsignDao consDao;
	@Autowired
	private SerialFactory serialFactory;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private SExpenseDao expDao;
	@Autowired
	private PEventDao eventDao;

	@Transactional
	public List<BaseDomain> save(List<?> entityList) {
		// entityList:前台将TTransTask和TCargo两种类型以xml形式传到后台
		// ？号：不确定是哪种类型
		List<BaseDomain> retList = new ArrayList<BaseDomain>();
		Long parentId = 0L;
		TTransTask task = null;
		List<TCargo> items = new ArrayList<TCargo>();
		// Object（万能类）：接受，再判断接受到的是哪种类型
		for (Object obj : entityList) {
			if (obj instanceof TTransTask) {
				task = (TTransTask) obj;
				RowAction ra = task.getRowAction();
				if (ra == RowAction.N) {
					String no = serialFactory.getSerial("tran_task_no");
					task.setTransTaskNo(no);
					task.setStatus(0);
				}
				if (ra == RowAction.R) {
					List<TCargo> tco = cargoDao.findByProperty("transTaskId",
							task.getId() + "");
					for (TCargo tcoT : tco) {
						tcoT.setRowAction(RowAction.R);
						items.add(tcoT);
					}
				}
				task = dao.saveByRowActionSolo(task);// 根据操作状态（RowAction.R等）进行操作
				retList.add(task);
				parentId = task.getId();// 得到派车单id
			} else if (obj instanceof TCargo) {
				TCargo item = (TCargo) obj;
				items.add(item);// 将TCargo数据放到数组，为以下改变从表状态
			}
		}

		Map<Integer, Integer> consCargoIdMap = new HashMap<Integer, Integer>();
		Map<Integer, Integer> delMap = new HashMap<Integer, Integer>();
		for (TCargo entity : items) {
			RowAction ra = entity.getRowAction();
			if (ra == RowAction.N) {
				// 如果是新增，根据consCargoId查询数据放到consCargoIdMap里
				entity.setTransTaskId(parentId.intValue());
			}
			if (ra == RowAction.R) {
				// 如果是删除，根据consCargoId查询数据放到delMap里
				delMap.put(entity.getConsCargoId(), entity.getConsCargoId());
			}
			consCargoIdMap
					.put(entity.getConsCargoId(), entity.getConsCargoId());
			entity = cargoDao.saveByRowActionSolo(entity);// 保存到数据库
			retList.add(entity);
		}

		Map<Long, Long> consIdMap = new HashMap<Long, Long>();
		for (Map.Entry<Integer, Integer> entry : consCargoIdMap.entrySet()) {
			Integer consCargoId = (Integer) entry.getValue();
			TConsignCargo conCargo = consCargoDao.findById(consCargoId
					.longValue());
			if (conCargo != null) {
				// 计算陆运单货物的派车数量
				List<TCargo> tcargo = cargoDao.findByProperty("consCargoId", ""
						+ conCargo.getId());
				Integer sumDispatchPackages = 0;
				Double sumDispatchGrossWeight = 0.00;
				Double sumDispatchVolume = 0.00;
				for (TCargo tgo : tcargo) {
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
				conCargo.setCargoStatus(2);
				conCargo.setRowAction(RowAction.M);
				conCargo = consCargoDao.saveByRowActionSolo(conCargo);
				consIdMap.put(conCargo.getConsId(), conCargo.getConsId());
			}
		}

		for (Map.Entry<Integer, Integer> entry : delMap.entrySet()) {
			Integer consId = (Integer) entry.getValue();
			TConsignCargo conCargo = consCargoDao.findById(consId.longValue());
			if (conCargo != null) {
				conCargo.setCargoStatus(1);
				conCargo.setRowAction(RowAction.M);
				conCargo = consCargoDao.saveByRowActionSolo(conCargo);
				consIdMap.put(conCargo.getConsId().longValue(), conCargo
						.getConsId().longValue());
			}
		}

		for (Map.Entry<Long, Long> entry : consIdMap.entrySet()) {
			Long consId = (Long) entry.getValue();
			TConsign tc = consDao.findById(consId);

			List<TConsignCargo> tccList = consCargoDao.findByProperty("consId",
					"" + consId);
			// 合计陆运货物派车数量
			Integer sumDispatchPackages = 0;
			for (TConsignCargo tconCargo : tccList) {
				sumDispatchPackages += tconCargo.getDispatchPackages() == null ? 0
						: tconCargo.getDispatchPackages();
			}
			tc.setDispatchPackages(sumDispatchPackages);
			tc.setRowAction(RowAction.M);
			tc = consDao.saveByRowActionSolo(tc);
			retList.add(tc);

			boolean isSame = true;
			Integer _status = 0;
			if (tccList.size() > 0) {
				TConsignCargo tcc = (TConsignCargo) tccList.get(0);
				_status = tcc.getCargoStatus();
				for (TConsignCargo entity : tccList) {
					if (entity.getCargoStatus() != _status) {
						isSame = false;
					}
				}
				if (isSame) {
					tc.setStatus(_status);
					tc.setRowAction(RowAction.M);
					tc = consDao.update(tc);
				}
			}
		}
		return retList;
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
		if (status == 3) {
			typeName = "发车";
		} else if (status == 4) {
			typeName = "到站";
		} else if (status == 5) {
			typeName = "签收";
		}

		TTransTask entity = dao.findById(id);
		if (entity != null) {
			List<TCargo> tcList = cargoDao.findByProperty("transTaskId", ""
					+ entity.getId());
			for (TCargo tc : tcList) {
				RowAction ra = tc.getRowAction();
				if (ra != RowAction.R) {
					tc.setCargoStatus(status);
					//记录与派车货物相关联的所有T_Consign_Cargo的id
					consCargoIdMap
							.put(tc.getConsCargoId(), tc.getConsCargoId());
					tc.setRowAction(RowAction.M);
					tc = cargoDao.saveByRowActionSolo(tc);
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
			//查询相关联的陆运货物
			TConsignCargo conCargo = consCargoDao.findById(consCargoId
					.longValue());
			if (conCargo != null) {

				// 记录与陆运货物相关联的所有派车货物，计算派车情况
				Map<String, String> propertyMap = new HashMap<String, String>();
				propertyMap.put("consCargoId", "" + consCargoId);
				propertyMap.put("cargoStatus", "" + status);
				List<TCargo> tcargo = cargoDao.findByProperties(propertyMap);
				Integer sumPackages = 0;
				Double sumGrossWeight = 0.00;
				Double sumVolume = 0.00;
				for (TCargo tgo : tcargo) {
					if (tgo.getCargoStatus() != null) {
						if (tgo.getCargoStatus() == status && status == 3) {
							sumPackages += tgo.getPackages();
							sumGrossWeight += tgo.getGrossWeight()
									.doubleValue();
							sumVolume += tgo.getVolume().doubleValue();
						}
						if (tgo.getCargoStatus() == status && status == 4) {
							sumPackages += tgo.getPackages();
							sumGrossWeight += tgo.getGrossWeight()
									.doubleValue();
							sumVolume += tgo.getVolume().doubleValue();
						}
						if (tgo.getCargoStatus() == status && status == 5) {
							sumPackages += tgo.getPackages();
							sumGrossWeight += tgo.getGrossWeight()
									.doubleValue();
							sumVolume += tgo.getVolume().doubleValue();
						}
					}
				}
				if (status == 3) {
					conCargo.setDeparturePackages(sumPackages);
					conCargo.setDepartureGrossWeight(BigDecimal
							.valueOf(sumGrossWeight));
					conCargo.setDepartureVolume(BigDecimal.valueOf(sumVolume));
				} else if (status == 4) {
					conCargo.setStationPackages(sumPackages);
					conCargo.setStationGrossWeight(BigDecimal
							.valueOf(sumGrossWeight));
					conCargo.setStationVolume(BigDecimal.valueOf(sumVolume));
				} else if (status == 5) {
					conCargo.setSignPackages(sumPackages);
					conCargo.setSignGrossWeight(BigDecimal
							.valueOf(sumGrossWeight));
					conCargo.setSignVolume(BigDecimal.valueOf(sumVolume));
				}

				conCargo.setCargoStatus(status);
				conCargo.setRowAction(RowAction.M);
				conCargo = consCargoDao.update(conCargo);
				resList.add(conCargo);
				//记录与陆运货物相关联的所有陆运id
				consIdMap.put(conCargo.getConsId(), conCargo.getConsId());

				String peRemarks = "【" + conCargo.getCargoName() + ":"
						+ sumPackages + "】";
				if (typeNameMap.containsKey(conCargo.getConsId())) {
					String stepTypeName = typeNameMap.get(conCargo.getConsId());
					stepTypeName += peRemarks;
					typeNameMap.put(conCargo.getConsId(), stepTypeName);
				} else {
					typeNameMap.put(conCargo.getConsId(), peRemarks);
				}
			}
		}

		// 判断状态是否更改(一个陆运单下有多条货物信息)
		for (Map.Entry<Long, Long> entry : consIdMap.entrySet()) {
			Long consId = (Long) entry.getValue();
			TConsign tc = consDao.findById(consId);
			
			//得到陆运下相关的货物信息，合计件毛体
			List<TConsignCargo> tccList = consCargoDao.findByProperty("consId",
					"" + consId);

			Integer sumPackages = 0;
			if (status == 3) {
				for (TConsignCargo tconCargo : tccList) {
					sumPackages += tconCargo.getDeparturePackages() == null ? 0
							: tconCargo.getDeparturePackages();
				}
				if (tc.getPackages() > sumPackages && sumPackages > 0) {
				}
				if (sumPackages >= tc.getPackages()) {
				}
				if (sumPackages == 0) {
				}
				tc.setDeparturePackages(sumPackages);
				entity.setStartDate(new Date());
			} else if (status == 4) {
				for (TConsignCargo tconCargo : tccList) {
					sumPackages = tconCargo.getStationPackages() == null ? 0
							: tconCargo.getStationPackages();
				}
				if (tc.getPackages() > sumPackages && sumPackages > 0) {
				}
				if (sumPackages >= tc.getPackages()) {
				}
				if (sumPackages == 0) {
				}
				tc.setStationPackages(sumPackages);
				entity.setEndDate(new Date());
			} else if (status == 5) {
				for (TConsignCargo tconCargo : tccList) {
					sumPackages += tconCargo.getSignPackages() == null ? 0
							: tconCargo.getSignPackages();
				}
				if (tc.getPackages() > sumPackages && sumPackages > 0) {
				}
				if (sumPackages >= tc.getPackages()) {
				}
				if (sumPackages == 0) {
				}
				tc.setSignPackages(sumPackages);
				tc.setSignInDate(new Date());
				tc.setSignInStatus(1);
				tc.setSignInContact(sessionContext.getUsername());
			}
			tc.setStatus(status);
			tc.setRowAction(RowAction.M);
			tc = consDao.update(tc);
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

	@Transactional
	public void deleteById(TTransTask task) {
		Long id = task.getId();
		dao.delete(id);
		Map<String, String> delMap = new HashMap<String, String>();
		delMap.put("transTaskId", "" + id);

		List<TCargo> items = cargoDao.findByProperties(delMap);
		for (TCargo c : items) {
			c.setRowAction(RowAction.R);
		}
		cargoDao.saveByRowAction(items);
	}


	@Transactional(readOnly = true)
	public List<TTransTask> query() {
		List<TTransTask> retList = dao.query();
		return retList;
		// return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List<TTransTask> complexQuery(List<HtQuery> conditions) {
		List retList = new ArrayList();
		List objList = dao.complexQuery(conditions);
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				TTransTask task = new TTransTask();
				Object[] objArray = (Object[]) obj;
				String t = (String) objArray[0];
				if (t == null)
					t = "";
				task.setSumT(t);
				Long s = (Long) objArray[1];
				if (s == null)
					s = new Long(0);
				task.setSumStartDate(s);
				BigDecimal w = (BigDecimal) objArray[2];
				if (w == null)
					w = new BigDecimal(0);
				task.setSumGrossWeight(w);
				BigDecimal d = (BigDecimal) objArray[3];
				if (w == null)
					d = new BigDecimal(0);
				task.setSumDistance(d);
				retList.add(task);
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<TTransTask> queryTask() {
		return dao.findByProperties();
	}

	@Transactional(readOnly = true)
	public List<TCargo> queryCargo() {
		return cargoDao.findByProperties();
	}

	@Transactional
	public void updateStatus() {
		Long id = Long.valueOf(requestContext.get("id"));
		Integer status = Integer.valueOf(requestContext.get("status"));
		TTransTask entity = dao.findById(id);
		if (entity != null) {
			String vNo = entity.getVehicleNo();
			final Map<String, String> propertyMap = new HashMap<String, String>();
			propertyMap.put(SqlOp.equal.toString(), vNo);
			propertyMap.put(SqlOp.equal.toString(), 1 + "");
			TTransTask t = dao.findByProperties(propertyMap).get(0);
			if (t != null) {
				t.setStatus(2);
				dao.update(t);
			}
			entity.setStatus(status);
			dao.update(entity);
		}
	}

	/**
	 * 设置费用
	 * 
	 * @param ttst
	 *            派车单对象
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
	public void setExpense(TTransTask ttst, long chclId, String chclCode,
			String charName, int custId, String custName, String expeTyep,
			float expe) {
		SExpense ex = new SExpense();
		ex.setConsId(ttst.getId().longValue());// 派车ID
		ex.setConsNo(ttst.getTransTaskNo());// 派车号
		ex.setConsDate(ttst.getStartDate());// 发车日期
		ex.setConsCustId(ttst.getMotorcadeId().longValue());// 车队ID
		ex.setConsCustName(ttst.getMotorcadeName());// 车队
		ex.setConsBizType("T");// 业务类型‘T’
		ex.setConsBizClass("S");
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

	// 费用提交（应付提交）——>费用
	@Transactional
	public List<BaseDomain> expenseSubmitPa(List<?> entityList) {
		List<BaseDomain> retList = new ArrayList<BaseDomain>();
		TTransTask ttst = null;
		for (Object obj : entityList) {
			if (obj instanceof TTransTask) {
				ttst = (TTransTask) obj;
				float xff = 0, dff = 0, hdf = 0, yjf = 0, zzhk = 0, bf = 0;
				if (ttst.getExpenseXff() != null) {
					xff = ttst.getExpenseXff().floatValue();
				}
				if (ttst.getExpenseDff() != null) {
					dff = ttst.getExpenseDff().floatValue();
				}
				if (ttst.getExpenseHdf() != null) {
					hdf = ttst.getExpenseHdf().floatValue();
				}
				if (ttst.getExpenseYjf() != null) {
					yjf = ttst.getExpenseYjf().floatValue();
				}
				if (ttst.getExpenseHkf() != null) {
					zzhk = ttst.getExpenseHkf().floatValue();
				}
				if (ttst.getPremiumExpense() != null) {
					bf = ttst.getPremiumExpense().floatValue();
				}
				// 现付
				if (xff > 0)
					this.setExpense(ttst, 1, "XF", "现付", ttst.getMotorcadeId(),
							ttst.getMotorcadeName(), "P", xff);
				// 到付
				if (dff > 0)
					this.setExpense(ttst, 2, "DF", "到付", ttst.getMotorcadeId(),
							ttst.getMotorcadeName(), "P", dff);
				// 回单付
				if (hdf > 0)
					this.setExpense(ttst, 3, "HDF", "回单付",
							ttst.getMotorcadeId(), ttst.getMotorcadeName(),
							"P", hdf);
				// 月结
				if (yjf > 0)
					this.setExpense(ttst, 4, "YJ", "月付", ttst.getMotorcadeId(),
							ttst.getMotorcadeName(), "P", yjf);
				// 中转回扣
				if (zzhk > 0)
					this.setExpense(ttst, 5, "ZZHK", "中转回扣",
							ttst.getMotorcadeId(), ttst.getMotorcadeName(),
							"R", zzhk);
				// 保费
				if (bf > 0)
					this.setExpense(ttst, 6, "BF", "保费", ttst.getMotorcadeId(),
							ttst.getMotorcadeName(), "P", bf);
				ttst.setExpeSubmitStatus(1);// 设置已经费用提交
				ttst = dao.update(ttst);
			}
			retList.add(ttst);
		}
		return retList;
	}

	// 费用-业务确认
	@Transactional
	public void updateExpStatus() {
		Long id = Long.valueOf(requestContext.get("id"));
		Integer status = Integer.valueOf(requestContext.get("consStatusExp"));
		TTransTask entity = dao.findById(id);
		if (entity != null) {
			entity.setConsStatusExp(status);
			dao.update(entity);
		}
	}

	/*	@Transactional
	public List<BaseDomain> distrS(List<?> entityList) {
		List<BaseDomain> retList = new ArrayList<BaseDomain>();
		Long parentId = 0L;
		TTransTask task = null;
		List<TCargo> items = new ArrayList<TCargo>();

		for (Object obj : entityList) {
			if (obj instanceof TTransTask) {
				task = (TTransTask) obj;
				RowAction ra = task.getRowAction();
				if (ra == RowAction.N) {
					String no = serialFactory.getSerial("tran_task_no");
					task.setTransTaskNo(no);
					task.setStatus(0);
				}
				task = dao.saveByRowActionSolo(task);
				retList.add(task);
				parentId = task.getId();
			} else if (obj instanceof TCargo) {
				TCargo item = (TCargo) obj;
				items.add(item);
			}
		}
		for (TCargo entity : items) {
			RowAction ra = entity.getRowAction();
			if (ra == RowAction.N) {
				entity.setTransTaskId(parentId.intValue());
				Long id = entity.getConsCargoId().longValue();
				TConsignCargo consCargo = consCargoDao.findById(id);
				
				consCargo.setStatus(2);
				consCargoDao.update(consCargo);
			}
			entity = cargoDao.saveByRowActionSolo(entity);
			if (ra != RowAction.R) {
				retList.add(entity);
			}
		}
		return retList;
	}*/

}