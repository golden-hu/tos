package com.hitisoft.fos.ffop.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.dao.FBlDao;
import com.hitisoft.fos.ffop.dao.FCargoDao;
import com.hitisoft.fos.ffop.dao.FConsignDao;
import com.hitisoft.fos.ffop.dao.FContainerCargoDao;
import com.hitisoft.fos.ffop.dao.FContainerDao;
import com.hitisoft.fos.ffop.dao.FDoDao;
import com.hitisoft.fos.ffop.dao.FTaskDao;
import com.hitisoft.fos.ffop.entity.FBl;
import com.hitisoft.fos.ffop.entity.FCargo;
import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.ffop.entity.FContainer;
import com.hitisoft.fos.ffop.entity.FContainerCargo;
import com.hitisoft.fos.ffop.entity.FTask;
import com.hitisoft.fos.ffse.dao.SExpenseDao;
import com.hitisoft.fos.ffse.dao.SExpenseTemplateDao;
import com.hitisoft.fos.ffse.dao.SExpenseTemplateItemDao;
import com.hitisoft.fos.ffse.entity.SExpense;
import com.hitisoft.fos.ffse.entity.SExpenseTemplateItem;
import com.hitisoft.fos.general.dao.GVoyageDao;
import com.hitisoft.fos.general.entity.GVoyage;
import com.hitisoft.fos.sys.dao.PCompanyConfigDao;
import com.hitisoft.fos.sys.dao.PTaskTypeDao;
import com.hitisoft.fos.sys.dao.PUserDao;
import com.hitisoft.fos.sys.entity.CShipper;
import com.hitisoft.fos.sys.entity.PCompanyConfig;
import com.hitisoft.fos.sys.entity.PTaskType;
import com.hitisoft.fos.sys.entity.PUser;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fos.util.FosExceptionEnum;
import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.orm.util.SqlOp;
import com.hitisoft.fw.service.DaemonService;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.ObjectUtil;
import com.hitisoft.fw.util.StringUtil;
import com.hitisoft.fw.util.TimeUtil;
import com.sun.xml.internal.stream.Entity;

@Service
public class FConsignService extends DaemonService {
	@Autowired
	private FConsignDao dao;
	@Autowired
	private FContainerDao containerDao;
	@Autowired
	private FContainerCargoDao contCargoDao;
	@Autowired
	private FCargoDao cargoDao;
	@Autowired
	private FBlDao blDao;
	@Autowired
	private FDoDao doDao;	
	@Autowired
	private SExpenseDao expenseDao;
	
	@Autowired
	private SExpenseTemplateItemDao expenseTempItemDao;
	
	@Autowired
	private PCompanyConfigDao confDao;
	
	@Autowired
	private GVoyageDao voyageDao;
	@Autowired
	private PCompanyConfigDao companyConfigDao;
	@Autowired
	private PTaskTypeDao taskTypeDao;
	@Autowired
	private FTaskDao taskDao;
	@Autowired
	private PUserDao userDao;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SerialFactory serialFactory;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public List save(List entityList) {
		List retList = new ArrayList();
		FConsign pc = null;
		
		// handle consign first
		for (Object obj : entityList) {
			if (obj instanceof FConsign) {
				FConsign entity = (FConsign) obj;
				if (entity.getRowAction() == RowAction.N) {
					entity.setId(null);
					checkBlNoDuplicated(entity);			
					//entity = saveNormalConsign(entity);
					
					String no = getConsignNo(entity);
					entity.setConsNo(no);
					// 如果consMasterNo为空，系统将它设置成跟consNo一样
					if (StringUtil.isBlank(entity.getConsMasterNo())) {
						entity.setConsMasterNo(no);
					}					
					dao.add(entity);
					// 如果consMasterId为空，系统将它设置成跟consId一样
					if (entity.getConsMasterId() == null) {
						entity.setConsMasterId(entity.getId().longValue());
						entity = dao.update(entity);
					}				
					generateTask(entity);
					retList.add(entity);
					entity.setEditable(ConstUtil.TrueShort);
				} else if (entity.getRowAction() == RowAction.M) {
					checkBlNoDuplicated(entity);
					syncTask(entity);
					syncExpense(entity);
					FConsign retEntity = dao.update(entity);
					retEntity.setEditable(ConstUtil.TrueShort);
					retList.add(retEntity);
				} else if (entity.getRowAction() == RowAction.R) {
					FConsign delEntity = dao.findById(entity.getId());
					delEntity.setRowAction(RowAction.R);
					dao.update(delEntity);
				} else {
					throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
				}
				pc = entity;
				break;
			}
		}
		
		// handle consign first
		for (Object obj : entityList) {
			if (obj instanceof FCargo) {
				FCargo c = (FCargo) obj;
				c.setConsId(pc.getId());
				c.setConsNo(pc.getConsNo());
				c.setConsMasterId(pc.getConsMasterId());
				c.setConsMasterNo(pc.getConsMasterNo());
				retList.add(cargoDao.saveByRowActionSolo(c));
			}
		}
		// handle consign first
		for (Object obj : entityList) {
			if (obj instanceof FContainer) {
				FContainer c = (FContainer) obj;
				c.setConsId(pc.getId().intValue());
				c.setConsNo(pc.getConsNo());
				c.setConsMblNo(pc.getConsMblNo());
				c.setConsMasterId(pc.getConsMasterId().intValue());
				c.setConsMasterNo(pc.getConsMasterNo());
				if(c.getRowAction()!=RowAction.R){
					retList.add(containerDao.saveByRowActionSolo(c));
				}else{
					// remove FContainer
					FContainer delEntity = containerDao.findById(c.getId());
					delEntity.setRowAction(RowAction.R);
					// query FContainerCargo by contId and consId
					HashMap<String, String> map = new HashMap<String, String>();
					map.put("contId", c.getId().toString());
					map.put("consId", c.getConsId().toString());
					List<FContainerCargo> contCargos = contCargoDao.findByProperties(map);
					// query FCargo by cargId and restore carg_cont_status of FCargo 0
					for(FContainerCargo a : contCargos){
						Long cargId =a.getCargId().longValue();
						FCargo cargos = cargoDao.findById(cargId);
						cargos.setCargContStatus(0);
						retList.add(cargos);
						//remove FContainerCargo
						a.setRowAction(RowAction.R);
						contCargoDao.update(a);
					}
					containerDao.update(delEntity);
				}
				retList.add(c);
			}
		}
		return retList;
	}

	/**
	 * 委托上的eta, sail_date, cons_date修改的时候, 要同步任务上的预计发生时间
	 * 
	 * @param entity
	 */
	private void syncTask(FConsign entity) {
		FConsign dbEntity = dao.findById(entity.getId());
		if (isDateChanged(entity, dbEntity)) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("consId", "" + entity.getId());
			map.put(ContextKey.orderby.get(), "tatyOrder");
			List<FTask> taskList = taskDao.findByProperties(map);
			map.clear();
			List<PTaskType> taskTypeList = taskTypeDao.findByProperties(map);
			Map<Long, PTaskType> tatyMap = new HashMap<Long, PTaskType>();
			Map<Integer, Date> dateMap = new HashMap<Integer, Date>();
			for (PTaskType taskType : taskTypeList) {
				tatyMap.put(taskType.getId(), taskType);
			}
			for (FTask task : taskList) {
				PTaskType taskType = tatyMap.get(task.getTatyId().longValue());
				Date ed = getEstimatedDate(entity, task, taskType, dateMap);
				dateMap.put(task.getTatyId(), ed);
				taskDao.add(task);
			}
		}
	}

	private Date getEstimatedDate(FConsign entity, FTask task, PTaskType taskType, Map<Integer, Date> dateMap) {
		String type = taskType.getTatyDateType();
		Date d = null;
		if (Constants.TASK_DATE_TYPE_CONS_DATE.equals(type)) {
			d = entity.getConsDate();
		} else if (Constants.TASK_DATE_TYPE_CONS_ETA.equals(type)) {
			d = entity.getConsEta();
		} else if (Constants.TASK_DATE_TYPE_CONS_SAIL_DATE.equals(type)) {
			d = entity.getConsSailDate();
		} else if (Constants.TASK_DATE_TYPE_BASE_TASK_D.equals(type)) {
			d = dateMap.get(task.getTatyDId());
		}
		Date ed = (d == null ? null : TimeUtil.addDate(d, taskType.getTatyDateEstimated()));
		task.setTaskEstimatedDate(ed);
		return ed;
	}

	private boolean isDateChanged(FConsign entity, FConsign dbEntity) {
		return ObjectUtil.isNotEqual(entity.getConsDate(), dbEntity.getConsDate())
				|| ObjectUtil.isNotEqual(entity.getConsEta(), dbEntity.getConsEta())
				|| ObjectUtil.isNotEqual(entity.getConsSailDate(), dbEntity.getConsSailDate());
	}
	
	private void generateTask(FConsign entity) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("consBizClass", entity.getConsBizClass());
		map.put("consBizType", entity.getConsBizType());
		if(StringUtil.isNotBlank(entity.getConsShipType())){
			map.put("consShipType", entity.getConsShipType());
		}
		//map.put("tatyAction", "CONS_S");
		map.put(ContextKey.orderby.get(), "tatyOrder");
		List<PTaskType> typeList = taskTypeDao.findByProperties(map);
		Map<Integer, Date> dateMap = new HashMap<Integer, Date>();
		for (PTaskType taskType : typeList) {
			FTask task = new FTask();
			task.setId(null);
			task.setTatyId(taskType.getId().intValue());
			task.setTatyName(taskType.getTatyName());
			task.setTatyDId(taskType.getTatyDId());
			task.setTatyDName(taskType.getTatyDName());
			task.setTatyOrder(taskType.getTatyOrder());
			task.setConsId(entity.getId().intValue());
			task.setConsNo(entity.getConsNo());			
			task.setTaskFinishedDate(null);
			task.setTaskFinishedFlag(ConstUtil.FalseByte);			
			task.setConsBizType(taskType.getConsBizType());
			task.setActive(ConstUtil.TrueByte);

			Date ed = getEstimatedDate(entity, task, taskType, dateMap);
			dateMap.put(task.getTatyId(), ed);
			taskDao.add(task);
		}
	}

	/**
	 * 委托上的consDate, consSailDate, consMblNo, consHblNo,shliId,vessName,voyaName,consPolEn,consPodEn修改的时候, 要同步S_EXPENSE上的相关字段
	 * 
	 * @param entity
	 */
	private void syncExpense(FConsign entity) {
		FConsign dbEntity = dao.findById(entity.getId());
		boolean bChanged = false;
		if((entity.getConsDate()==null && dbEntity.getConsDate()!=null)
				|| (entity.getConsDate()!=null && dbEntity.getConsDate()==null ))
			bChanged=true;		
		else if((entity.getConsSailDate()==null && dbEntity.getConsSailDate()!=null)
				|| (entity.getConsSailDate()!=null && dbEntity.getConsSailDate()==null))
			bChanged=true;		
		else if((StringUtil.isBlank(entity.getConsMblNo()) && StringUtil.isNotBlank(dbEntity.getConsMblNo()))
				|| (StringUtil.isNotBlank(entity.getConsMblNo()) && StringUtil.isBlank(dbEntity.getConsMblNo()))
		)
			bChanged=true;		
		else if((StringUtil.isBlank(entity.getConsHblNo()) && StringUtil.isNotBlank(dbEntity.getConsHblNo()))
				|| (StringUtil.isNotBlank(entity.getConsHblNo()) && StringUtil.isBlank(dbEntity.getConsHblNo()))
		)				
			bChanged=true;		
		else if((StringUtil.isBlank(entity.getVessName()) && StringUtil.isNotBlank(dbEntity.getVessName()))
				|| (StringUtil.isNotBlank(entity.getVessName()) && StringUtil.isBlank(dbEntity.getVessName()))
		)				
			bChanged=true;		
		else if((StringUtil.isBlank(entity.getVoyaName()) && StringUtil.isNotBlank(dbEntity.getVoyaName()))
				|| (StringUtil.isNotBlank(entity.getVoyaName()) && StringUtil.isBlank(dbEntity.getVoyaName()))
		)				
			bChanged=true;		
		else if((StringUtil.isBlank(entity.getShliCode()) && StringUtil.isNotBlank(dbEntity.getShliCode()))
				|| (StringUtil.isNotBlank(entity.getShliCode()) && StringUtil.isBlank(dbEntity.getShliCode()))
		)				
			bChanged=true;
		else if((StringUtil.isBlank(entity.getConsPolEn()) && StringUtil.isNotBlank(dbEntity.getConsPolEn()))
				|| (StringUtil.isNotBlank(entity.getConsPolEn()) && StringUtil.isBlank(dbEntity.getConsPolEn()))
		)				
			bChanged=true;
		else if((StringUtil.isBlank(entity.getConsPodEn()) && StringUtil.isNotBlank(dbEntity.getConsPodEn()))
				|| (StringUtil.isNotBlank(entity.getConsPodEn()) && StringUtil.isBlank(dbEntity.getConsPodEn()))
		)				
			bChanged=true;
		else if(entity.getConsDate()!=null  && dbEntity.getConsDate()!=null
				&& !entity.getConsDate().equals(dbEntity.getConsDate())
		)
			bChanged=true;
		else if(entity.getConsSailDate()!=null  && dbEntity.getConsSailDate()!=null
				&& !entity.getConsSailDate().equals(dbEntity.getConsSailDate()))
			bChanged=true;
		else if(StringUtil.isNotBlank(entity.getShliCode()) 
				&& StringUtil.isNotBlank(dbEntity.getShliCode()) 
				&& !entity.getShliCode().equals(dbEntity.getShliCode()))
			bChanged=true;
		else if(StringUtil.isNotBlank(entity.getVoyaName()) 
				&& StringUtil.isNotBlank(dbEntity.getVoyaName()) 
				&& !entity.getVoyaName().equals(dbEntity.getVoyaName()))
			bChanged=true;
		else if(StringUtil.isNotBlank(entity.getConsHblNo()) 
				&& StringUtil.isNotBlank(dbEntity.getConsHblNo()) 
				&& !entity.getConsHblNo().equals(dbEntity.getConsHblNo()))
			bChanged=true;
		else if(StringUtil.isNotBlank(entity.getConsMblNo()) 
				&& StringUtil.isNotBlank(dbEntity.getConsMblNo()) 
				&& !entity.getConsMblNo().equals(dbEntity.getConsMblNo()))
			bChanged=true;
		else if(StringUtil.isNotBlank(entity.getVessName()) 
				&& StringUtil.isNotBlank(dbEntity.getVessName()) 
				&& !entity.getVessName().equals(dbEntity.getVessName()))
			bChanged=true;
		else if(StringUtil.isNotBlank(entity.getConsPolEn()) 
				&& StringUtil.isNotBlank(dbEntity.getConsPolEn()) 
				&& !entity.getConsPolEn().equals(dbEntity.getConsPolEn()))
			bChanged=true;
		else if(StringUtil.isNotBlank(entity.getConsPodEn()) 
				&& StringUtil.isNotBlank(dbEntity.getConsPodEn()) 
				&& !entity.getConsPodEn().equals(dbEntity.getConsPodEn()))
			bChanged=true;
		else if(entity.getConsSalesRepId()!=dbEntity.getConsSalesRepId())
			bChanged=true;
		else if(!entity.getConsSalesRepName().equals(dbEntity.getConsSalesRepName()))
			bChanged=true;
		else if(entity.getConsOperatorId()!=dbEntity.getConsOperatorId())
			bChanged=true;
		else if(!entity.getConsOperatorName().equals(dbEntity.getConsOperatorName()))
			bChanged=true;
		else if(entity.getGrouId()!=dbEntity.getGrouId())
			bChanged=true;
		else if(!entity.getGrouName().equals(dbEntity.getGrouName()))
			bChanged=true;
		
		if (bChanged) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("consId", "" + entity.getId());
			List<SExpense> list = expenseDao.findByProperties(map);			
			
			for (SExpense e : list) {
				e.setConsDate(entity.getConsDate());
				e.setConsSailDate(entity.getConsSailDate());
				e.setConsMblNo(entity.getConsMblNo());
				e.setConsHblNo(entity.getConsHblNo());
				e.setVessName(entity.getVessName());
				e.setVoyaName(entity.getVoyaName());
				e.setConsPolEn(entity.getConsPolEn());
				e.setConsPodEn(entity.getConsPodEn());
				e.setShliCode(entity.getShliCode());
				e.setConsSalesRepId(entity.getConsSalesRepId());
				e.setConsSalesRepName(entity.getConsSalesRepName());
				e.setConsOperatorId(entity.getConsOperatorId());
				e.setConsOperatorName(entity.getConsOperatorName());
				e.setGrouId(entity.getGrouId());
				e.setGrouName(entity.getGrouName());
				e.setShliCode(entity.getShliCode());
				
				e.setRowAction(RowAction.M);
				expenseDao.saveByRowActionSolo(e);
			}
		}
	}


	/**
	 * @param entity
	 * @return
	 */
	private String getConsignNo(FConsign entity) {		
		String dateType = ""; 		
		
		//通过公司配置表读取流水号生产类型
		List<PCompanyConfig> confList = confDao.findByProperties();
		for(PCompanyConfig c : confList){
			if(c.getCocoCode().equals("CONS_NO_SERIAL_DATE_TYPE")){
				dateType = c.getCocoValue();
				break;
			}
		}		
		
		Map<String, String> map = new HashMap<String, String>();
		map.put(SerialFactory.RULE_CONS_TYPE, entity.getClassType() + entity.getConsBizClass());
		
		//默认流水号生产日期是系统日期
		Date consDate = TimeUtil.getNow();
		if(dateType.equals("2"))
			consDate = entity.getConsSailDate();
		else if(dateType.equals("3"))
			consDate = entity.getConsDate();		
		boolean bExist = true;
		String consNo = serialFactory.getConsignSerial("consign_no", map, consDate);
		//String consNo = serialFactory.getSerial("consign_no", map);
		while(bExist)
		{
			Map<String,String> qmap = new HashMap<String,String>();
			qmap.put("consNo", consNo);
			List<FConsign> consList = dao.findByProperties(qmap);
			if(consList.size()==0)
				bExist = false;
			else
				consNo = serialFactory.getConsignSerial("consign_no", map, consDate);
				//consNo = serialFactory.getSerial("consign_no", map);
		}
		return consNo;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional(readOnly = true)
	public List query() {
		List retList = new ArrayList();
		retList.addAll(dao.findByProperties());
		if (requestContext.containsKey(Constants.PARAM_EAGER)) {
			retList.addAll(containerDao.findByProperties());
			retList.addAll(cargoDao.findByProperties());
			retList.addAll(blDao.findByProperties());
			retList.addAll(doDao.findByProperties());
			retList.addAll(expenseDao.findByProperties());
		}
		return retList;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional(readOnly = true)
	public List queryWithExpense() {
		String expeIds = requestContext.get("expeIds");
		List<SExpense> expeList = new ArrayList();
		String id = requestContext.get("consignId");
		FConsign consign = dao.findById(Long.parseLong(id));
		
		Map<String,String> queryMap = new HashMap<String, String>();
		queryMap.put("consId", id);
		queryMap.put("consBizType", requestContext.get("consBizType"));
		queryMap.put("expeType", requestContext.get("expeType"));
		if(StringUtil.isNotBlank(expeIds)){
			List<HtQuery> conditions = new ArrayList<HtQuery>();
			conditions.add(new HtQuery("id",  SqlOp.in, expeIds));
			expeList = expenseDao.complexQuery(conditions);
		}
		else{
			expeList = expenseDao.findByProperties(queryMap);
		}
		
		Double sumCny = 0.0;
		Double sumUsd = 0.0;
		Double sumOther = 0.0;
		Double weight = 0.0;
		Double measurement = 0.0;
		String custName = "";
		for(SExpense e : expeList){
			if(e.getExpeType().equals("R")){
				weight = consign.getConsTotalGrossWeightCustomer();
				measurement = consign.getConsTotalMeasurementCustomer();
				custName = e.getCustName();
				if(e.getCurrCode().equals("CNY"))
					sumCny = sumCny + e.getExpeTotalAmount().doubleValue();
				else if(e.getCurrCode().equals("USD"))
					sumUsd = sumUsd + e.getExpeTotalAmount().doubleValue();
				else {
					sumOther = sumOther + e.getExpeTotalAmount().doubleValue();
				}
			}else{
				weight = consign.getConsTotalGrossWeight();
				measurement = consign.getConsTotalMeasurement();
				custName = e.getCustName();
			}
		}
		consign.setSumRCny(sumCny);
		consign.setSumRUsd(sumUsd);
		consign.setSumROther(sumOther);
		consign.setVWeight(weight);
		consign.setVMeasurement(measurement);
		consign.setVCustName(custName);
		List retList = new ArrayList();
		retList.add(consign);
		retList.addAll(expeList);
		return retList;
	}
	
	@Transactional
	public FConsign updateStatusById() {
		String strId = requestContext.get("id");
		String consStatus = requestContext.get("consStatus");
		String consStatusExp = requestContext.get("consStatusExp");
		String consStatusAud = requestContext.get("consStatusAud");
		
		Long id = Long.valueOf(strId);
		FConsign c = dao.findById(id);
		c.setRowAction(RowAction.M);
		if(StringUtil.isNotBlank(consStatus))
			c.setConsStatus(Byte.valueOf(consStatus));
		if(StringUtil.isNotBlank(consStatusExp))
			c.setConsStatusExp(Byte.valueOf(consStatusExp));
		if(StringUtil.isNotBlank(consStatusAud))
			c.setConsStatusAud(Byte.valueOf(consStatusAud));
		
		return dao.saveByRowActionSolo(c);
	}
	
	@Transactional
	public void updateStatusAud() {
		Long id = Long.valueOf(requestContext.get("consId"));
		Byte status = Byte.valueOf(requestContext.get("consStatusAud"));
		FConsign entity = dao.findById(id);
		if (entity != null) {
			entity.setConsStatusAud(status);
			dao.update(entity);
		}
	}
	
	@Transactional
	public FConsign unLock() {
		String strId = requestContext.get("id");
		Long id = Long.valueOf(strId);
		FConsign c = dao.findById(id);
		c.setRowAction(RowAction.M);
		c.setConsStatusLock(new Byte("0"));
		return dao.saveByRowActionSolo(c);
	}
	
	@Transactional
	public void updateStatusBookById(Map<String, Object> queryMap) {
		Long id = Long.valueOf(requestContext.get("consId"));
		Byte status = Byte.valueOf(requestContext.get("consStatusBook"));
		dao.updateStatusBookById(id, status);
	}

	@Transactional
	public void updateConsMasterNo(Map<String, Object> queryMap) {
		Long consMasterId = Long.valueOf(requestContext.get("consMasterId"));
		Byte consMasterFlag = Byte.valueOf(requestContext.get("consMasterFlag"));
		String consMasterNo = requestContext.get("consMasterNo");
		String ids = requestContext.get("consId");
		String[] idArray = ids.split(",");
		for (String id : idArray) {
			if (StringUtil.isNotBlank(id)) {
				FConsign entity = dao.findById(Long.valueOf(id));
				entity.setConsMasterNo(consMasterNo);
				entity.setConsMasterId(consMasterId);
				entity.setConsMasterFlag(consMasterFlag);
				dao.update(entity);
			}
		}
	}

	@Transactional
	public void updateMblStatusById(Map<String, Object> queryMap) {
		Long id = Long.valueOf(requestContext.get("consId"));
		Byte status = Byte.valueOf(requestContext.get("blStatus"));
		dao.updateMblStatusById(id, status);
	}

	@Transactional
	public void updateFblStatusById() {
		Long id = Long.valueOf(requestContext.get("consId"));
		Byte status = Byte.valueOf(requestContext.get("blStatus"));
		dao.updateFblStatusById(id, status);
	}

	@Transactional(readOnly = true)
	public List<FConsign> complexQuery(List<HtQuery> conditions) {
		List<FConsign> consignList = dao.complexQuery(conditions);
		Long uid = sessionContext.getUserid();
		PUser myself = userDao.findById(uid);
		for (FConsign consign : consignList) {
			Short editable = ConstUtil.FalseShort;
			// 1.有编辑所有委托权限; 2.是此票的操作员; 3.是此票的创建者, 有编辑权限
			if (ConstUtil.TrueByte.equals(myself.getUserAllEditFlag())
					|| uid.equals(consign.getConsOperatorId().longValue()) 
					|| myself.getUserName().equals(consign.getCreateBy())) {
				editable = ConstUtil.TrueShort;
			}
			consign.setEditable(editable);
		}
		return consignList;
	}

	@Transactional(readOnly = true)
	public List<FConsign> complexQueryByContNo(List<HtQuery> conditions) {
		return dao.query(conditions);
	}

	
	//单票审核的复杂查询
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional(readOnly = true)
	public List complexQueryCheck(List<HtQuery> conditions) {
		List retList = new ArrayList();
		
		List objList = dao.complexQueryCheck(conditions);
		checkMergeStatistics(retList, objList);
		if (requestContext.containsKey(Constants.PARAM_EAGER)) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("consId", requestContext.get("id"));
			map.put("consBizType", requestContext.get("consBizType"));
			
			String expeType = requestContext.get("expeType");
			if(StringUtil.isNotBlank(expeType)){
				map.put("expeType", requestContext.get("expeType"));
			}
			
			String sort = requestContext.get("sort");
			if(StringUtil.isNotBlank(sort)){
				map.put("sort", sort);
			}
			
			retList.addAll(expenseDao.findByProperties(map));
		}
		return retList;
	}


	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional(readOnly = true)
	public List complexQueryTask(List<HtQuery> conditions) {
		List retList = new ArrayList();
		List<FConsign> objList = dao.complexQueryTask(conditions);
		String consIds = "";
		for (FConsign consign : objList) {
			consIds += consign.getId() + ConstUtil.COMMA;
		}
		List<HtQuery> taskConditions = new ArrayList<HtQuery>();
		taskConditions.add(new HtQuery("consId", SqlOp.in, consIds));
		List<FTask> taskList = taskDao.query(taskConditions);
		retList.addAll(objList);
		retList.addAll(taskList);
		return retList;
	}

	public void updateSailDate() {
		Long voyaId = Long.valueOf(requestContext.get("voyaId"));
		String strVoyaSailDate = requestContext.get("voyaSailDate");
		// 更新航次的开船日期和开船标志
		GVoyage voyage = voyageDao.findById(voyaId);
		Date voyaSailDate = null;
		if (strVoyaSailDate != null) {
			try {
				voyaSailDate = new SimpleDateFormat("yyyy-MM-dd").parse(strVoyaSailDate);
			} catch (ParseException e) {
				throw new BusinessException(ExceptionEnum.FW_UNKNOWN_ERROR, e);
			}
		} else {
			voyaSailDate = TimeUtil.getNow();
		}
		voyage.setVoyaSailDate(voyaSailDate);
		voyage.setVoyaSailedFlag(ConstUtil.TrueByte);
		voyageDao.update(voyage);
		// 更新委托的开船日期和开船状态
		List<FConsign> consList = dao.findByProperties();
		for (FConsign entity : consList) {
			entity.setConsEtd(voyaSailDate);
			entity.setConsSailDate(voyaSailDate);
			dao.update(entity);
		}
	}

	/**
	 * @param retList
	 * @param objList
	 */
	//将取到的数据转换成FConsign对象的集合，同时算出毛利和毛利率
	@SuppressWarnings({ "rawtypes" })
	private void checkMergeStatistics(List<FConsign> retList, List objList) {
		
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;
				FConsign consign = (FConsign) objArray[0];
				
				BigDecimal r = (BigDecimal)objArray[1];  //收	
				BigDecimal p = (BigDecimal)objArray[2];  //付
				
				if(r==null) {
					r=new BigDecimal(0);
				}
				
				if(p==null) {
					p=new BigDecimal(0);
				}
				
				consign.setSumR(r.doubleValue());
				consign.setSumP(p.doubleValue());
				BigDecimal grossProfit = r.subtract(p);				//毛利为r减p, BigDecimal的subtract方法
				consign.setGrossProfit(grossProfit.doubleValue());    //毛利赋值
				
				//应收美元合计
				BigDecimal sumRUsd = (BigDecimal)objArray[3];
				if(sumRUsd==null) {
					sumRUsd=new BigDecimal(0);				
				}
				consign.setSumRUsd(sumRUsd.doubleValue());		//应收美元合计赋值
				
				//应收人民币合计
				BigDecimal sumRCny = (BigDecimal)objArray[4];
				if(sumRCny==null) {
					sumRCny=new BigDecimal(0);
				}
				consign.setSumRCny(sumRCny.doubleValue());		//应收人民币合计赋值
				
				//应付美元合计
				BigDecimal sumPUsd = (BigDecimal)objArray[5];
				if(sumPUsd==null) sumPUsd=new BigDecimal(0);				
				consign.setSumPUsd(sumPUsd.doubleValue());
				
				//应付人民币合计
				BigDecimal sumPCny = (BigDecimal)objArray[6];
				if(sumPCny==null) sumPCny=new BigDecimal(0);
				consign.setSumPCny(sumPCny.doubleValue());
				
				//应收美元已开帐单合计
				BigDecimal sumRUsdInvoice = (BigDecimal)objArray[7];
				if(sumRUsdInvoice==null) sumRUsdInvoice=new BigDecimal(0);				
				consign.setSumRUsdInvoice(sumRUsdInvoice.doubleValue());
				
				//应收人民币已开帐单合计
				BigDecimal sumRCnyInvoice = (BigDecimal)objArray[8];
				if(sumRCnyInvoice==null) sumRCnyInvoice=new BigDecimal(0);				
				consign.setSumRCnyInvoice(sumRCnyInvoice.doubleValue());
				
				//应付美元已开帐单合计
				BigDecimal sumPUsdInvoice = (BigDecimal)objArray[9];
				if(sumPUsdInvoice==null) sumPUsdInvoice=new BigDecimal(0);				
				consign.setSumPUsdInvoice(sumPUsdInvoice.doubleValue());

				//应付人民币已开帐单合计
				BigDecimal sumPCnyInvoice = (BigDecimal)objArray[10];
				if(sumPCnyInvoice==null) sumPCnyInvoice=new BigDecimal(0);				
				consign.setSumPCnyInvoice(sumPCnyInvoice.doubleValue());
				
				//应收美元已核销合计
				BigDecimal sumRUsdWriteOff = (BigDecimal)objArray[11];
				if(sumRUsdWriteOff==null) sumRUsdWriteOff=new BigDecimal(0);				
				consign.setSumRUsdWriteOff(sumRUsdWriteOff.doubleValue());
				
				//应收人民币已核销合计
				BigDecimal sumRCnyWriteOff = (BigDecimal)objArray[12];
				if(sumRCnyWriteOff==null) sumRCnyWriteOff=new BigDecimal(0);				
				consign.setSumRCnyWriteOff(sumRCnyWriteOff.doubleValue());
				
				//应付美元已核销合计
				BigDecimal sumPUsdWriteOff = (BigDecimal)objArray[13];
				if(sumPUsdWriteOff==null) sumPUsdWriteOff=new BigDecimal(0);				
				consign.setSumPUsdWriteOff(sumPUsdWriteOff.doubleValue());
				
				//应付人民币已核销合计
				BigDecimal sumPCnyWriteOff = (BigDecimal)objArray[14];
				if(sumPCnyWriteOff==null) sumPCnyWriteOff=new BigDecimal(0);				
				consign.setSumPCnyWriteOff(sumPCnyWriteOff.doubleValue());

				//应收其他币种合计(非美元,人民币)
				BigDecimal sumPOther = (BigDecimal)objArray[15];
				if(sumPOther==null) sumPOther=new BigDecimal(0);
				consign.setSumPOther(sumPOther.doubleValue());
				
				//应付其他币种合计(非美元,人民币)
				BigDecimal sumROther = (BigDecimal)objArray[16];
				if(sumROther==null) sumROther=new BigDecimal(0);
				consign.setSumROther(sumROther.doubleValue());
				
				//如果应收不为0，计算毛利率,毛利率为毛利*100/应收
				if (!r.equals(new BigDecimal(0))) {
					Double grossProfitRate = grossProfit.doubleValue() * 100 / r.doubleValue();
					consign.setGrossProfitRate(String.valueOf(grossProfitRate));
				} else {
					consign.setGrossProfitRate("0");   //否则毛利率就为0
				}
				retList.add(consign);
			}
		}
	}

	private void checkBlNoDuplicated(FConsign entity) {
		// 散货不检查提单号的唯一性
		if (Constants.CONS_BIZ_TYPE_MARINE.equals(entity.getConsBizType()) && 
				Constants.CONS_SHIP_TYPE_BULK.equals(entity.getConsBizType())) {
			return;
		}
		if (StringUtil.isBlank(entity.getConsMblNo())) {
			return;
		}
		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put("consMblNo", entity.getConsMblNo());
		List<FConsign> list = dao.findByProperties(queryMap);
		// 如果>1, 说明肯定重复了
		// 如果=1, 而且主键不等, 说明有另外一个对象有同样的号
		if (list.size() > 1 || (list.size() == 1 && !list.get(0).getId().equals(entity.getId()))) {
			throw new BusinessException(FosExceptionEnum.FFSE_BL_NO_DUPLICATED);
		}
	}

	@Transactional
	public void autoUpdateStatusLock() {
		setup();
		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put(Constants.COMCF_KEY, Constants.COMCF_CONS_LOCK_DAYS);
		List<PCompanyConfig> list = companyConfigDao.findByProperties(queryMap);
		for (PCompanyConfig companyConfig : list) {
			String strDays = companyConfig.getCocoValue();
			if (StringUtil.isBlank(strDays) || "0".equals(strDays)) {
				continue;
			}
			int days = Integer.parseInt(strDays);
			sessionContext.setCompCode(companyConfig.getCompCode());
			List<HtQuery> conditions = new ArrayList<HtQuery>();
			conditions.add(new HtQuery("consStatusLock", SqlOp.equal, ConstUtil.FalseStr));
			conditions.add(new HtQuery("consSailDate", SqlOp.lessEqual, TimeUtil.addDate(-1 * days)));
			List<FConsign> list2 = dao.query(conditions);
			for (FConsign consign : list2) {
				consign.setConsStatusLock(ConstUtil.TrueByte);
				dao.update(consign);
			}
		}
	}

	public List<FConsign> queryByCargoId() {
		String cargId = requestContext.get("cargId");
		FCargo cargo = cargoDao.findById(Long.valueOf(cargId));
		FConsign consign = dao.findById(cargo.getConsId().longValue());

		consign.setPackName(cargo.getPackName());
		consign.setUnitCode(cargo.getUnitName());
		consign.setConsCargoMarks(cargo.getCargMarks());
		consign.setConsTotalPackages(cargo.getCargPackageNum());		
		consign.setConsTotalNetWeight(cargo.getCargNetWeight());
		consign.setConsTotalGrossWeight(cargo.getCargGrossWeight());
		consign.setConsTotalMeasurement(cargo.getCargMeasurement());
		List<FConsign> retList = new ArrayList<FConsign>();
		retList.add(consign);
		return retList;
	}

	private CShipper getShipper(String str){
		String name = "";		
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
			return s;
		}
		return null;
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
					
					String str = (String)obj;
					CShipper s = getShipper(str);
					if(s!=null)					
						retList.add(s);
				}				
			}
		}		
		
		List<Object> objList2 = dao.queryFShipper();
		if(objList2.size()>0){
			for (Object obj : objList2) {
				if (obj instanceof String) {
					String str = (String)obj;
					CShipper s = getShipper(str);
					if(s!=null)					
						retList.add(s);
				}				
			}
		}		
		
		Map<String,CShipper> map = new HashMap<String,CShipper>();
		for(CShipper shipper : retList){
			map.put(shipper.getShipperName(),shipper);
		}
		
		retList.clear();
		Set<Entry<String, CShipper>> set =  map.entrySet();		
		
        for(Entry<String,CShipper> entry :set){
        	retList.add(entry.getValue());
        }
		return retList;
	}
	
	@Transactional(readOnly = true)
	public List<FConsign> queryByBlId() {
		String blId = requestContext.get("blId");
		FBl bl = blDao.findById(Long.valueOf(blId));
		FConsign consign = dao.findById(bl.getConsId().longValue());

		consign.setConsShipper(bl.getBlShipper());
		consign.setConsConsignee(bl.getBlConsignee());
		consign.setConsNotifyParty(bl.getBlNotifyParty());
		consign.setConsNotifyParty2(bl.getBlNotifyParty2());
		consign.setVessName(bl.getBlVessel());
		consign.setVoyaName(bl.getBlVoyage());
		consign.setConsPolEn(bl.getBlPol());
		consign.setConsPodEn(bl.getBlPod());
		consign.setConsReceiptPlace(bl.getBlReceiptPlace());
		consign.setConsDeliveryPlace(bl.getBlDeliveryPlace());
		consign.setConsCargoDesc(bl.getBlCargoDesc());
		consign.setConsTotalPackagesInWord(bl.getBlTotalSay());
		consign.setConsCargoMarks(bl.getBlCargoMarks());
		consign.setPackName(bl.getPackName());
		consign.setUnitCode(bl.getUnitName());
		consign.setConsTotalGrossWeight(bl.getBlCargoGrossWeight());
		consign.setConsTotalNetWeight(bl.getBlCargoNetWeight());
		consign.setConsTotalMeasurement(bl.getBlCargoMeasurement());
		consign.setConsTotalPackages(bl.getBlCargoPackages());
		consign.setPateCode(bl.getBlPaymentTerm());
		consign.setTranCode(bl.getBlTransTerm());
		consign.setConsOriginalBlNum(bl.getBlOriginalNum());

		List<FConsign> retList = new ArrayList<FConsign>();
		retList.add(consign);
		return retList;
	}
	
	@Transactional(readOnly = true)
	public List<SExpense> getExpenseByTemplate() {
		String consId = requestContext.get("consId");		
		FConsign c = dao.findById(Long.parseLong(consId));
		List<SExpenseTemplateItem> items = expenseTempItemDao.findByProperties();
		
		List<SExpense> retList = new ArrayList<SExpense>();
		
		for(SExpenseTemplateItem t : items){
			SExpense e = new SExpense();
			e.setCharId(t.getCharId());
			e.setCharName(t.getCharName());
			e.setCharNameEn(t.getCharNameEn());
			e.setChclId(t.getChclId());
			e.setChclCode(t.getChclCode());
			e.setCurrCode(t.getCurrCode());
			e.setExpeType(t.getExpeType());
			e.setExpeUnitPrice(t.getExpeUnitPrice());
			
			e.setConsBizClass(c.getConsBizClass());
			e.setConsBizType(c.getConsBizType());
			e.setConsCustId(c.getCustId());
			e.setConsCustName(c.getCustName());
			e.setConsDate(c.getConsDate());
			e.setConsHblNo(c.getConsHblNo());
			e.setConsMblNo(c.getConsMblNo());
			e.setConsNo(c.getConsNo());
			e.setConsOperatorId(c.getConsOperatorId());
			e.setConsOperatorName(c.getConsOperatorName());
			e.setConsSalesRepName(c.getConsSalesRepName());
			e.setConsSalesRepId(c.getConsSalesRepId());
			e.setConsPodEn(c.getConsPodEn());
			e.setConsPolEn(c.getConsPolEn());
			e.setConsSailDate(c.getConsSailDate());
			e.setConsShipType(c.getConsShipType());
			e.setGrouId(c.getGrouId());
			e.setGrouName(c.getGrouName());
			e.setShliCode(c.getShliCode());
			
			Byte chargeType = t.getChargeType();
			if(chargeType.equals("0")){
				e.setExpeNum(new BigDecimal(1));
			}
			else if(chargeType.equals("1") && c.getConsTotalPackages()!=null){
				e.setExpeNum(new BigDecimal(c.getConsTotalPackages()));
			}
			else if(chargeType.equals("2") && c.getConsTotalGrossWeightCustomer()!=null){
				e.setExpeNum(new BigDecimal(c.getConsTotalGrossWeightCustomer()));
			}
			else if(chargeType.equals("3") && c.getConsTotalMeasurement()!=null){
				e.setExpeNum(new BigDecimal(c.getConsTotalMeasurement()));
			}
			else if(chargeType.equals("4") && c.getConsTotalChargeWeight()!=null){
				e.setExpeNum(new BigDecimal(c.getConsTotalChargeWeight()));
			}
			else if(chargeType.equals("5") && c.getConsTotalNetWeight()!=null){
				e.setExpeNum(new BigDecimal(c.getConsTotalNetWeight()));
			}
			else if(chargeType.equals("6") && c.getConsTotalContainers()!=null){
				e.setExpeNum(new BigDecimal(c.getConsTotalContainers()));
			}
			else 
				e.setExpeNum(new BigDecimal(1));
			if(e.getExpeUnitPrice()!=null){
				Double total = e.getExpeNum().doubleValue()*e.getExpeUnitPrice().doubleValue();
				e.setExpeTotalAmount(new BigDecimal(total));
			}
			
			retList.add(e);
		}

		return retList;
	}
	
	//进仓通知书模板输出
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional(readOnly = true)
	public List warehousingNotice() {
		ArrayList retList = new ArrayList();
		String consId = requestContext.get("id");
		Map< String, String> map = new HashMap<String,String>();
		map.put("consId",consId);
		FConsign entityConsign = dao.findById(Long.parseLong(consId));
		retList.add(entityConsign);
		List<FCargo> entityCargo= cargoDao.findByProperties(map);
		retList.addAll(entityCargo);
		return retList;
	}
	
	//Marine or Air on the bill
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional(readOnly = true)
	public List complexQueryBill(List<HtQuery> conditions) {
		List retList = new ArrayList();
		List<FConsign> objList = dao.query(conditions);
		String custIds = "";
		String consBizType = requestContext.get("consBizType");
		for (FConsign consign : objList) {
			custIds += consign.getCustId() + ConstUtil.COMMA;
		}
		if(custIds.length()>0){
			List<HtQuery> expenseConditions = new ArrayList<HtQuery>();
			expenseConditions.add(new HtQuery("custId", SqlOp.in, custIds));
			expenseConditions.add(new HtQuery("consBizType", SqlOp.equal, consBizType));
			List<SExpense> expenseList = expenseDao.query(expenseConditions);
			retList.addAll(expenseList);
		}else{
			throw new BusinessException(FosExceptionEnum.SYS_NO_ENTRY_EXPENSE);
		}
		
		return retList;
	}
	}
