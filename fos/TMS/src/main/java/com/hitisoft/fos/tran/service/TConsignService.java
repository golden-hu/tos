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
import com.hitisoft.fos.sys.dao.PUserDao;
import com.hitisoft.fos.sys.entity.CShipper;
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
import com.hitisoft.fw.util.TimeUtil;

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
	
	/**
	 * 保存
	 * @param entityList
	 * @return
	 * @author liuyong
	 */
	@Transactional
	public List<BaseDomain> save(List<?> entityList) {
		List<BaseDomain> retList = new ArrayList<BaseDomain>();
		Long parentId = 0L;
		String consNo = "";
		TConsign cons = null;
		List<TConsignCargo> items = new ArrayList<TConsignCargo>();
		for (Object obj : entityList){
			if (obj instanceof TConsign){
				cons = (TConsign) obj;
				RowAction ra = cons.getRowAction();
				if (ra == RowAction.N){
					cons.setConsStatusExp(0);	//费用确认状态 0:未  1:已
					consNo = serialFactory.getSerial("tran_no");
					cons.setConsNo(consNo);
					
					Map <String,String>propertyMap=new HashMap<String,String>();
					propertyMap.put("active","1");
					propertyMap.put("compCode", sessionContext.getCompCode());
					cons=dao.saveByRowActionSolo(cons);
					parentId = cons.getId();
				}else  if(ra == RowAction.M){
					Map<String, String> map = new HashMap<String, String>();
					map.put("consId", "" + cons.getId());
					List<SExpense> selist = expenseDao.findByProperties(map);			
					for (SExpense e : selist) {
						e.setConsDate(cons.getConsDate());
						e.setConsSalesRepId(cons.getSalesRepId());
						e.setConsSalesRepName(cons.getSalesRepName());
						e.setConsOperatorId(cons.getConsOperatorId());
						e.setConsOperatorName(cons.getConsOperatorName());
						e.setGrouId(cons.getGrouId());
						e.setGrouName(cons.getGrouName());
						e.setRowAction(RowAction.M);
						expenseDao.saveByRowActionSolo(e);
					}
					List<TConsignCargo> cclist = consignCargoDao.findByProperties(map);
					for (TConsignCargo tc : cclist) {
						if(tc.getConsigneeId()==null){
							tc.setConsigneeId(cons.getConsigneeId());
							tc.setConsigneeName(cons.getConsigneeName());
							tc.setConsigneeContact(cons.getConsigneeContact());
							tc.setConsigneeTel(cons.getConsigneeMobile());
							tc.setDeliveryAddress(cons.getDeliveryAddress());
						}
						tc.setRowAction(RowAction.M);
						consignCargoDao.saveByRowActionSolo(tc);
					}
				  	cons=dao.saveByRowActionSolo(cons);
				  	parentId = cons.getId();
				}else{
					dao.saveByRowActionSolo(cons);
				}
				retList.add(cons);
			}else if(obj instanceof TConsignCargo){
				TConsignCargo item = (TConsignCargo) obj;
				items.add(item);
			}
		}
		for (TConsignCargo consCargo : items) {
				RowAction ra = consCargo.getRowAction();
				if(ra==RowAction.N){
					consCargo.setConsId(parentId.intValue());
					consCargo.setConsNo(consNo);
					consCargo.setConsNoHandler(cons.getConsNoHandler());
					if(consCargo.getConsigneeId()==null){
						consCargo.setConsigneeId(cons.getConsigneeId());
						consCargo.setConsigneeName(cons.getConsigneeName());
						consCargo.setConsigneeContact(cons.getConsigneeContact());
						consCargo.setConsigneeTel(cons.getConsigneeTel());
						consCargo.setDeliveryAddress(cons.getDeliveryAddress());
					}
					//派车剩余件数
					consCargo.setPackagesRemainder(consCargo.getPackages());
					//派车剩余毛重
					consCargo.setGrossWeightRemainder(consCargo.getGrossWeight());
					//派车剩余体积
					consCargo.setMeasurementRemainder(consCargo.getMeasurement());
				}
				consCargo = consignCargoDao.saveByRowActionSolo(consCargo);
				if (ra != RowAction.R) {
					consCargo.setConsId(parentId.intValue());
					consCargo.setConsNo(cons.getConsNo());
					if(consCargo.getConsigneeId()==null){
						consCargo.setConsigneeId(cons.getConsigneeId());
						consCargo.setConsigneeName(cons.getConsigneeName());
						consCargo.setConsigneeContact(cons.getConsigneeContact());
						consCargo.setConsigneeTel(cons.getConsigneeTel());
						consCargo.setDeliveryAddress(cons.getDeliveryAddress());
					}
					retList.add(consCargo);
				}
		}
		return retList;
	}
	/**
	 * 单票列表
	 * @return
	 * @author liuyong
	 */
	@Transactional(readOnly = true)
	public List<TConsign> query(List<HtQuery> conditions) {
		//List<TConsign> objList=dao.findByProperties();
		
		List<Object> objList = dao.complexSearch(conditions);
		Long uid = sessionContext.getUserid();
		PUser myself = userDao.findById(uid);
		List<TConsign> retList=new ArrayList<TConsign>();
		for(Object obj:objList){
			if(obj instanceof Object[]){
				Object[] objArray = (Object[]) obj;
				TConsign cons = (TConsign) objArray[0];
				Short editable = ConstUtil.FalseShort;
				if (ConstUtil.TrueByte.equals(myself.getUserAllEditFlag())
						|| uid.equals(cons.getConsOperatorId().longValue()) 
						|| myself.getUserName().equals(cons.getCreateBy())) {
					editable = ConstUtil.TrueShort;
				}
				cons.setEditable(editable);
				retList.add(cons);
			}
		}
		return retList;
	}

	/**
	 * 费用项目复杂查询
	 * @param conditions
	 * @return
	 * @author liuyong
	 */
	@Transactional(readOnly = true)
	public List<TConsign> complexQuery(List<HtQuery> conditions) {
		List<TConsign> retList = new ArrayList<TConsign>();
		List<TConsign> objList=dao.complexQuery(conditions);
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				TConsign consign=new TConsign();
				Object[] objArray = (Object[]) obj;
				String m = (String)objArray[0];
				if(m==null) m="";
				consign.setSumMonth(m);
				Long n = (Long)objArray[1];
				if(n==null) n=new Long(0);
				consign.setSumConsNo(n);
				Long p = (Long)objArray[2];
				if(p==null) p=new Long(0);
				consign.setSumPackages(p);
				BigDecimal w = (BigDecimal)objArray[3];
				if(w==null) w=new BigDecimal(0);
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
	
	/**
	 * 状态更新：开始 完成
	 * @author liuyong
	 */
	@Transactional
	public void updateStatus() {
		Long id = Long.valueOf(requestContext.get("id"));
		Integer status = Integer.valueOf(requestContext.get("status"));
		TConsign entity = dao.findById(id);
		if (entity != null) {
			entity.setStatus(status);
			dao.update(entity);
		}
	}
	
	/**
	 * 费用-业务确认
	 * @author liuyong
	 */
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
	
	/**
	 * 复杂查询
	 * @param conditions
	 * @return
	 * @author liuyong
	 */
	@Transactional(readOnly = true)
	public List<TConsign> complexSearch(List<HtQuery> conditions) {
		String key=requestContext.get("typeKey");
		if(key.equals("1")){//T_CONSIGN查询
			List<TConsign> retList=new ArrayList<TConsign>();
			Long uid = sessionContext.getUserid();
			PUser myself = userDao.findById(uid);
			List<Object> objList=dao.complexSearch(conditions);
			for(Object obj:objList){
				if(obj instanceof Object[]){
					Object[] objArray = (Object[]) obj;
					TConsign cons = (TConsign) objArray[0];
					BigDecimal r = (BigDecimal)objArray[1];
					BigDecimal p = (BigDecimal)objArray[2];
					BigDecimal hk = (BigDecimal)objArray[3];
					BigDecimal sumShipper = (BigDecimal)objArray[4];
					BigDecimal sumCons = (BigDecimal)objArray[5];
					
					if(r==null) r=new BigDecimal(0);
					if(p==null) p=new BigDecimal(0);
					if(hk==null) hk=new BigDecimal(0);
					if(sumShipper==null) sumShipper=new BigDecimal(0);
					if(sumCons==null) sumCons=new BigDecimal(0);
					cons.setSumR(r.doubleValue());//应收（包含发货方、收货方、中转回扣金额）
					cons.setSumP(p.doubleValue());//应付
					cons.setSumHk(hk.doubleValue());//应收（只包含中转回扣金额）
					cons.setSumShipperAmount(sumShipper.doubleValue());
					cons.setSumConsAmount(sumCons.doubleValue());
					
					float  sumR = 0;						//实收
					float sumP = 0;						//实付
					if(cons.getSumR()!=null){
						sumR =  cons.getSumR().floatValue();
					}
					if(cons.getSumP()!=null){
						sumP =  cons.getSumP().floatValue();
					}
					BigDecimal b = new BigDecimal(sumR-sumP);//中转回扣提交到费用表，在此不累计
					b=b.setScale(2,BigDecimal.ROUND_HALF_UP);//留两位小数，从第三位开始四舍五入
					cons.setMargin(b);//利润=应收-应付
					
					Short editable = ConstUtil.FalseShort;						//权限控制
					if (ConstUtil.TrueByte.equals(myself.getUserAllEditFlag())
							|| uid.equals(cons.getConsOperatorId().longValue()) 
							|| myself.getUserName().equals(cons.getCreateBy())) {
						editable = ConstUtil.TrueShort;
					}
					cons.setEditable(editable);
					retList.add(cons);
				}
			}
			return  retList;
		}
		//订单查询<从次表查询数据>
		else{
			return this.orderNoSearch(conditions);
		}
	}
	
	/**
	 * 根据订单编号查询
	 * @param conditions
	 * @return
	 * @author liuyong
	 */
	@Transactional(readOnly = true)
	public List<TConsign> orderNoSearch(List <HtQuery>conditions) {
		List<TConsign> retList=new ArrayList<TConsign>();
		Long uid = sessionContext.getUserid();
		PUser myself = userDao.findById(uid);
		List<Object> objList=dao.orderNoSearch(conditions);
		for(Object obj:objList){
			if(obj instanceof Object[]){
				Object[] objArray = (Object[]) obj;
				TConsign cons = (TConsign) objArray[0];
				BigDecimal r = (BigDecimal)objArray[1];
				BigDecimal p = (BigDecimal)objArray[2];
				BigDecimal hk = (BigDecimal)objArray[3];
				BigDecimal sumShipper = (BigDecimal)objArray[4];
				BigDecimal sumCons = (BigDecimal)objArray[5];
				
				if(r==null) r=new BigDecimal(0);
				if(p==null) p=new BigDecimal(0);
				if(hk==null) hk=new BigDecimal(0);
				if(sumShipper==null) sumShipper=new BigDecimal(0);
				if(sumCons==null) sumCons=new BigDecimal(0);
				cons.setSumR(r.doubleValue());//应收（包含发货方、收货方、中转回扣金额）
				cons.setSumP(p.doubleValue());//应付
				cons.setSumHk(hk.doubleValue());//应收（只包含中转回扣金额）
				cons.setSumShipperAmount(sumShipper.doubleValue());
				cons.setSumConsAmount(sumCons.doubleValue());
				
				float  sumR = 0;						//实收
				float sumP = 0;						//实付
				if(cons.getSumR()!=null){
					sumR =  cons.getSumR().floatValue();
				}
				if(cons.getSumP()!=null){
					sumP =  cons.getSumP().floatValue();
				}
				BigDecimal b = new BigDecimal(sumR-sumP);//中转回扣提交到费用表，在此不累计
				b=b.setScale(2,BigDecimal.ROUND_HALF_UP);//留两位小数，从第三位开始四舍五入
				cons.setMargin(b);//利润=应收-应付
		
				Short editable = ConstUtil.FalseShort;						//权限控制
				if (ConstUtil.TrueByte.equals(myself.getUserAllEditFlag())
						|| uid.equals(cons.getConsOperatorId().longValue()) 
						|| myself.getUserName().equals(cons.getCreateBy())) {
					editable = ConstUtil.TrueShort;
				}
				cons.setEditable(editable);
				retList.add(cons);
			}
		}
		return  retList;
	}
	
	/**
	 * 模版输出
	 * 中转回扣
	 * 应收发货方金额
	 * 应收收货方金额
	 * TCONSIGN_LIST_Q
	 * @param conditions
	 * @return
	 * @author liuyong
	 */
		@Transactional(readOnly = true)
		public List<TConsign> excelConsList(List <HtQuery>conditions){
			List<Object> objList=dao.excelConsList(conditions);
			List<TConsign> retList = new ArrayList<TConsign>();
			for(Object obj : objList){
				if(obj instanceof Object[]){
					Object[] objArray = (Object[]) obj;
					TConsign cons = (TConsign) objArray[0];
					BigDecimal r = (BigDecimal)objArray[1];
					BigDecimal p = (BigDecimal)objArray[2];
					BigDecimal hk = (BigDecimal)objArray[3];
					BigDecimal sumShipper = (BigDecimal)objArray[4];
					BigDecimal sumCons = (BigDecimal)objArray[5];
					
					if(r==null) r=new BigDecimal(0);
					if(p==null) p=new BigDecimal(0);
					if(hk==null) hk=new BigDecimal(0);
					if(sumShipper==null) sumShipper=new BigDecimal(0);
					if(sumCons==null) sumCons=new BigDecimal(0);
					cons.setSumR(r.doubleValue());//应收（包含发货方、收货方、中转回扣金额）
					cons.setSumP(p.doubleValue());//应付
					cons.setSumHk(hk.doubleValue());//应收（只包含中转回扣金额）
					cons.setSumShipperAmount(sumShipper.doubleValue());
					cons.setSumConsAmount(sumCons.doubleValue());
					
					float  sumR = 0;						//实收
					float sumP = 0;						//实付
					if(cons.getSumR()!=null){
						sumR =  cons.getSumR().floatValue();
					}
					if(cons.getSumP()!=null){
						sumP =  cons.getSumP().floatValue();
					}
					BigDecimal b = new BigDecimal(sumR-sumP);//中转回扣提交到费用表，在此不累计
					b=b.setScale(2,BigDecimal.ROUND_HALF_UP);//留两位小数，从第三位开始四舍五入
					cons.setMargin(b);//利润=应收-应付

					retList.add(cons);
				}
			}
			return retList;
		}
		
		/**
		 * 付款账单模版输出
		 * @param conditions
		 * @return
		 * @author liuyong
		 */
		@Transactional(readOnly = true)
		public List<TConsign> excelConsPList(List <HtQuery>conditions){
			List<Object> objList=dao.excelConsPList(conditions);
			List<TConsign> retList = new ArrayList<TConsign>();
			for(Object obj : objList){
				if(obj instanceof Object[]){
					Object[] objArray = (Object[]) obj;
					TConsign cons = (TConsign) objArray[0];
					BigDecimal r = (BigDecimal)objArray[1];
					BigDecimal p = (BigDecimal)objArray[2];
					BigDecimal hk = (BigDecimal)objArray[3];
					BigDecimal sumShipper = (BigDecimal)objArray[4];
					BigDecimal sumCons = (BigDecimal)objArray[5];
					
					if(r==null) r=new BigDecimal(0);
					if(p==null) p=new BigDecimal(0);
					if(hk==null) hk=new BigDecimal(0);
					if(sumShipper==null) sumShipper=new BigDecimal(0);
					if(sumCons==null) sumCons=new BigDecimal(0);
					cons.setSumR(r.doubleValue());//应收（包含发货方、收货方、中转回扣金额）
					cons.setSumP(p.doubleValue());//应付
					cons.setSumHk(hk.doubleValue());//应收（只包含中转回扣金额）
					cons.setSumShipperAmount(sumShipper.doubleValue());
					cons.setSumConsAmount(sumCons.doubleValue());
					
					float  sumR = 0;						//实收
					float sumP = 0;						//实付
					if(cons.getSumR()!=null){
						sumR =  cons.getSumR().floatValue();
					}
					if(cons.getSumP()!=null){
						sumP =  cons.getSumP().floatValue();
					}
					BigDecimal b = new BigDecimal(sumR-sumP);//中转回扣提交到费用表，在此不累计
					b=b.setScale(2,BigDecimal.ROUND_HALF_UP);//留两位小数，从第三位开始四舍五入
					cons.setMargin(b);//利润=应收-应付

					retList.add(cons);
				}
			}
			return retList;
		}
		
		/**
		 * 发货统计action:TCON_HZ_Q
		 * @param conditions
		 * @return
		 * @author liuyong
		 */
		@Transactional(readOnly = true)
		public List<TConsign> excelSumma(List <HtQuery>conditions){
			List<Object> objList=dao.excelSumma(conditions);
			List<TConsign> retList = new ArrayList<TConsign>();
			for(Object obj : objList){
				if(obj instanceof Object[]){
					Object[] objArray = (Object[]) obj;
					TConsign cons = (TConsign) objArray[0];
					BigDecimal r = (BigDecimal)objArray[1];
					BigDecimal p = (BigDecimal)objArray[2];
					BigDecimal hk = (BigDecimal)objArray[3];
					BigDecimal sumShipper = (BigDecimal)objArray[4];
					BigDecimal sumCons = (BigDecimal)objArray[5];
					
					if(r==null) r=new BigDecimal(0);
					if(p==null) p=new BigDecimal(0);
					if(hk==null) hk=new BigDecimal(0);
					if(sumShipper==null) sumShipper=new BigDecimal(0);
					if(sumCons==null) sumCons=new BigDecimal(0);
					cons.setSumR(r.doubleValue());//应收（包含发货方、收货方、中转回扣金额）
					cons.setSumP(p.doubleValue());//应付
					cons.setSumHk(hk.doubleValue());//应收（只包含中转回扣金额）
					cons.setSumShipperAmount(sumShipper.doubleValue());
					cons.setSumConsAmount(sumCons.doubleValue());
					
					float  sumR = 0;						//实收
					float sumP = 0;						//实付
					if(cons.getSumR()!=null){
						sumR =  cons.getSumR().floatValue();
					}
					if(cons.getSumP()!=null){
						sumP =  cons.getSumP().floatValue();
					}
					BigDecimal b = new BigDecimal(sumR-sumP);//中转回扣提交到费用表，在此不累计
					b=b.setScale(2,BigDecimal.ROUND_HALF_UP);//留两位小数，从第三位开始四舍五入
					cons.setMargin(b);//利润=应收-应付

					retList.add(cons);
				}
			}
			return retList;
		}
		
	//从费用表获取单价（收）
	public BigDecimal expeUnitPriceR(Map <String,String>propertyMap){
		propertyMap.put("expeType","R");
		propertyMap.put("chclCode","YF");
		List<SExpense> expeList=(List<SExpense>) expDao.findByProperties(propertyMap);
		BigDecimal ep = null;
		if(expeList!=null&&expeList.size()>0){
			ep=expeList.get(0).getExpeUnitPrice();
		}
		return ep;
	}
	//从费用表获取单价（付）
		public BigDecimal expeUnitPriceP(Map <String,String>propertyMap){
			propertyMap.put("expeType","P");
			propertyMap.put("chclCode","YF");
			List<SExpense> expeList=(List<SExpense>) expDao.findByProperties(propertyMap);
			BigDecimal ep = null;
			if(expeList!=null&&expeList.size()>0){
				ep=expeList.get(0).getExpeUnitPrice();
			}
			return ep;
		}
		
	/**
	 * 同一个委托单位对应的收货单位
	 * @return
	 * @author liuyong
	 */
	@Transactional(readOnly = true)
	public List<CShipper> queryConsignee(){
		/*Long id = Long.valueOf(requestContext.get("id"));
		TConsign cons=dao.findById(id);
		String custName=cons.getCustName();
		return dao.queryShipper(custName);*/
		List<CShipper> retList = new ArrayList<CShipper>();
		List<Object> objList = dao.queryConsignee();
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;
				 String name="";name=(String) objArray[0];
				 if(StringUtil.isNotBlank(name)){
					 CShipper s = new CShipper();
					 s.setShipperName(name);
					 s.setShipperContact((String)objArray[1]);
					 s.setShipperTel((String)objArray[2]);
					 s.setShipperMobile((String)objArray[3]);
					 s.setShipperAddress((String)objArray[4]);
					 s.setShipperProvince((String)objArray[5]);
					 s.setShipperCity((String)objArray[6]);
					 retList.add(s);
				 }
			}
		}
		return retList;
	}
	
	/**单票审核调用
	 * @param retList
	 * @param objList
	 * @author liuyong
	 */
	@SuppressWarnings("rawtypes")
	private void checkMergeStatistics(List<TConsign> retList, List objList) {
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;
				TConsign cons = (TConsign) objArray[0];
				
				BigDecimal r = (BigDecimal)objArray[1];
				BigDecimal p = (BigDecimal)objArray[2];
				if(r==null) r=new BigDecimal(0);
				if(p==null) p=new BigDecimal(0);
				cons.setSumR(r.doubleValue());
				cons.setSumP(p.doubleValue());
				BigDecimal grossProfit = r.subtract(p);				
				cons.setGrossProfit(grossProfit.doubleValue());
				
				BigDecimal sumRUsd = (BigDecimal)objArray[3];
				if(sumRUsd==null) sumRUsd=new BigDecimal(0);				
				cons.setSumRUsd(sumRUsd.doubleValue());
				
				BigDecimal sumRCny = (BigDecimal)objArray[4];
				if(sumRCny==null) sumRCny=new BigDecimal(0);
				cons.setSumRCny(sumRCny.doubleValue());
				
				BigDecimal sumPUsd = (BigDecimal)objArray[5];
				if(sumPUsd==null) sumPUsd=new BigDecimal(0);				
				cons.setSumPUsd(sumPUsd.doubleValue());
				
				BigDecimal sumPCny = (BigDecimal)objArray[6];
				if(sumPCny==null) sumPCny=new BigDecimal(0);
				cons.setSumPCny(sumPCny.doubleValue());
				
				BigDecimal sumRUsdInvoice = (BigDecimal)objArray[7];
				if(sumRUsdInvoice==null) sumRUsdInvoice=new BigDecimal(0);				
				cons.setSumRUsdInvoice(sumRUsdInvoice.doubleValue());

				BigDecimal sumRCnyInvoice = (BigDecimal)objArray[8];
				if(sumRCnyInvoice==null) sumRCnyInvoice=new BigDecimal(0);				
				cons.setSumRCnyInvoice(sumRCnyInvoice.doubleValue());
				
				BigDecimal sumPUsdInvoice = (BigDecimal)objArray[9];
				if(sumPUsdInvoice==null) sumPUsdInvoice=new BigDecimal(0);				
				cons.setSumPUsdInvoice(sumPUsdInvoice.doubleValue());

				BigDecimal sumPCnyInvoice = (BigDecimal)objArray[10];
				if(sumPCnyInvoice==null) sumPCnyInvoice=new BigDecimal(0);				
				cons.setSumPCnyInvoice(sumPCnyInvoice.doubleValue());
				
				BigDecimal sumRUsdWriteOff = (BigDecimal)objArray[11];
				if(sumRUsdWriteOff==null) sumRUsdWriteOff=new BigDecimal(0);				
				cons.setSumRUsdWriteOff(sumRUsdWriteOff.doubleValue());
				
				BigDecimal sumRCnyWriteOff = (BigDecimal)objArray[12];
				if(sumRCnyWriteOff==null) sumRCnyWriteOff=new BigDecimal(0);				
				cons.setSumRCnyWriteOff(sumRCnyWriteOff.doubleValue());
				
				BigDecimal sumPUsdWriteOff = (BigDecimal)objArray[13];
				if(sumPUsdWriteOff==null) sumPUsdWriteOff=new BigDecimal(0);				
				cons.setSumPUsdWriteOff(sumPUsdWriteOff.doubleValue());
				
				BigDecimal sumPCnyWriteOff = (BigDecimal)objArray[14];
				if(sumPCnyWriteOff==null) sumPCnyWriteOff=new BigDecimal(0);				
				cons.setSumPCnyWriteOff(sumPCnyWriteOff.doubleValue());

				BigDecimal sumPOther = (BigDecimal)objArray[15];
				if(sumPOther==null) sumPOther=new BigDecimal(0);
				cons.setSumPOther(sumPOther.doubleValue());
				
				BigDecimal sumROther = (BigDecimal)objArray[15];
				if(sumROther==null) sumROther=new BigDecimal(0);
				cons.setSumROther(sumROther.doubleValue());
				
				cons.setSumRP(cons.getSumR()+cons.getSumP());
				
				if (!r.equals(new BigDecimal(0))) {
					Double grossProfitRate = grossProfit.doubleValue() * 100 / r.doubleValue();
					cons.setGrossProfitRate(String.valueOf(grossProfitRate));
				} else {
					cons.setGrossProfitRate("0");
				}
				retList.add(cons);
			}
		}
	}
	//单票审核-费用确认单
	@SuppressWarnings({ "unchecked", "rawtypes"})
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
	//审核-财务-经理
	@Transactional
	public void updateStatusAud() {
		Long id = Long.valueOf(requestContext.get("id"));
		Byte status = Byte.valueOf(requestContext.get("consStatusAud"));
		TConsign entity = dao.findById(id);
		if (entity != null) {
			entity.setConsStatusAud(status);
			if(status==1||status==2){
				entity.setConsStatusExp(1);
			}else entity.setConsStatusExp(0);
			dao.update(entity);
		}
	}
	
	public CCustomerContactDao getContactDao() {
		return contactDao;
	}

	public void setContactDao(CCustomerContactDao contactDao) {
		this.contactDao = contactDao;
	}

	/**
	 * 设置费用
	 * @param cons 托运单对象
	 * @param chclId 费用类型ID
	 * @param chclCode费用类型CODE
	 * @param charName 费用名称
	 *  @param custId 结算对象ID
	 *  @param custName 结算对象
	 *  @param custNameFlag 结算对象
	 *  @param expeTyep 费用方式
	 *  @param expe 金额
	 *  @author liuyong
	 */
	public void setExpense(TConsign cons,int chclId,String chclCode,String charName,
			int custId,String custName,int custNameFlag,String expeTyep,float expe){
		SExpense ex=new SExpense();
		ex.setConsId(cons.getId().intValue());							//委托ID
		ex.setConsNo(cons.getConsNo());									//委托号
		ex.setConsNoHandler(cons.getConsNoHandler());	//手工单号
		ex.setConsDate(cons.getConsDate());							//委托日期
		ex.setConsBizType("T");														//业务类型‘T’陆运
		ex.setConsCustId(cons.getCustId());								//委托单位ID
		ex.setConsCustName(cons.getCustName());				//委托单位
		ex.setChclId(chclId);																//费用类型ID
		ex.setChclCode(chclCode);													//费用CODE
		ex.setCharId(chclId);																//费用ID
		ex.setCharName(charName);											//费用名称
		ex.setCharNameEn(chclCode);											//费用简称
		ex.setUnitName("EACH");													//单票
		ex.setCurrCode("CNY");														//币别代码
		ex.setCustId(custId);																//结算单位ID
		ex.setCustName(custName);												//结算单位
		ex.setCustNameFlag(custNameFlag);							//结算标志1=发货方，2=收货方，3=物流商
		ex.setExpeType(expeTyep);												//收、付
		ex.setPateCode("P");															//预付/到付
		ex.setExpeDate(new Date());											//费用产生日期
		ex.setExpeUnitPrice(new BigDecimal(expe));			//计算单价
		ex.setExpeNum(BigDecimal.valueOf(1));						//计量数量
		ex.setExpeTotalAmount(new BigDecimal(expe));	//总金额
		ex.setExpeExRate(BigDecimal.valueOf(1));
		ex.setExpeRcAmount(ex.getExpeTotalAmount());
		ex.setExpeUpdateBy(sessionContext.getUsername());	//当前登录号
		ex.setExpeUpdateTime(new Date()) ;									//费用更新时间
		ex.setCreateBy(sessionContext.getUsername());			//创建人
		ex.setCreateTime(new Date());
		ex.setModifyBy(sessionContext.getUsername());			//修改人
		ex.setModifyTime(new Date());
		ex.setCompCode(sessionContext.getCompCode());		//公司代码
		ex.setVersion(0);
		ex.setRemoved((byte)0);
		expDao.add(ex);
	}
	
	/**
	 * 费用提交-收
	 * @param entityList
	 * @author liuyong
	 */
	@Transactional
	public  List<BaseDomain>  expenseSubmitRe(List<?> entityList) {
		List<BaseDomain> retList = new ArrayList<BaseDomain>();
		TConsign cons = null;
		for (Object obj : entityList){
			if (obj instanceof TConsign){
				cons = (TConsign) obj;
				float xf=0,df=0,hdf=0,yj=0;
				if(cons.getExpenseXff()!=null){xf=cons.getExpenseXff().floatValue();}
				if(cons.getExpenseDff()!=null){df=cons.getExpenseDff().floatValue();}
				if(cons.getExpenseHdf()!=null){hdf=cons.getExpenseHdf().floatValue();}
				if(cons.getExpenseYjf()!=null){yj=cons.getExpenseYjf().floatValue();}
				float hk=0;
				if(cons.getMotorcadeExpenseHkf()!=null){hk=cons.getMotorcadeExpenseHkf().floatValue();}
				float mdf=0;
				if(cons.getMotorcadeExpenseDff()!=null){mdf=cons.getMotorcadeExpenseDff().floatValue();}
				//现付
				if(xf>0){
					this.setExpense(cons, 1,"XF","现付", cons.getCustId(), cons.getCustName(), 1,"R",xf);
				}
				//到付
				if(df>0){
					if(hk>0){
						this.setExpense(cons,5,"ZHHK","中转回扣", cons.getMotorcadeId(), cons.getMotorcadeName(),3, "R",hk);
					}else if(df>mdf){
						//收货单位直接把到付款到‘第三方物流’
						if(cons.getConsigneePateName().equals("1")){//到付款方式'到付'
							this.setExpense(cons, 2,"DF","到付", cons.getArrivePayId(), cons.getArrivePayName(),2, "R",df-mdf);
						}else if(cons.getConsigneePateName().equals("2")){//到付款方式‘月结’
							this.setExpense(cons, 4,"YJ","月结", cons.getArrivePayId(), cons.getArrivePayName(), 2,"R",df-mdf);
						}else{
							this.setExpense(cons, 4,"YJ","月结", cons.getArrivePayId(), cons.getArrivePayName(), 2,"R",df-mdf);
						}
					}
				}
				//回单付
				if(hdf>0){
					this.setExpense(cons, 3,"HDF","回单付", cons.getCustId(), cons.getCustName(), 1,"R",hdf);
				}
				//月结
				if(yj>0){
					this.setExpense(cons, 4,"YJ","月付", cons.getCustId(), cons.getCustName(),1, "R",yj);
				}
				cons.setExpeSubmitStatus(1);											//设置已经费用提交
				cons.setExpeSubmitDate(TimeUtil.getNow());			//提交日期
				cons=dao.update(cons);
			}
			retList.add(cons);
		}
		return retList;
	}
	
	/**
	 * 费用提交-付
	 * @param entityList
	 * @author liuyong
	 */
	@Transactional
	public List<BaseDomain> expenseSubmitPa(List<?> entityList) {
		List<BaseDomain> retList = new ArrayList<BaseDomain>();
		TConsign cons = null;
		for (Object obj : entityList){
			if (obj instanceof TConsign){
				cons = (TConsign) obj;
				float mxf=0,mdf=0,mhdf=0,myj=0;
				if(cons.getMotorcadeExpenseXff()!=null){
					mxf=cons.getMotorcadeExpenseXff().floatValue();
				}
				if(cons.getMotorcadeExpenseDff()!=null){
					mdf=cons.getMotorcadeExpenseDff().floatValue();
				}
				if(cons.getMotorcadeExpenseHdf()!=null){
					mhdf=cons.getMotorcadeExpenseHdf().floatValue();
				}
				if(cons.getMotorcadeExpenseYjf()!=null){
					myj=cons.getMotorcadeExpenseYjf().floatValue();
				}
				//现付
				if(mxf>0){
					this.setExpense(cons, 1,"XF","现付", cons.getMotorcadeId(), cons.getMotorcadeName(),3, "P",mxf);
				}
				//到付
				if(mdf>0){
					;
				}
				//回单付
				if(mhdf>0){
					this.setExpense(cons,3,"HDF","回单付", cons.getMotorcadeId(), cons.getMotorcadeName(),3, "P",mhdf);
				}
				//月结
				if(myj>0){
					this.setExpense(cons,4,"YJ","月结", cons.getMotorcadeId(), cons.getMotorcadeName(), 3,"P",myj);
				}
				cons.setExpeSubmitStatus2(1);											//设置已经费用提交
				cons.setExpeSubmitDate2(TimeUtil.getNow());
				cons=dao.update(cons);
			}
			retList.add(cons);
		}
		return retList;
	}
	
	/**
	 * 发货统计模版输出
	 * @param conditions
	 * @return
	 * @author liuyong
	 */
	@Transactional
	public List<BaseDomain> consShipSum(final List<HtQuery> conditions){
		List<BaseDomain> retList = new ArrayList<BaseDomain>();
		List<Object> objList=dao.consShipSum(conditions);
		for(Object obj:objList){
			if(obj instanceof Object[]){
				Object[] objArray = (Object[]) obj;
				TConsign cons = (TConsign) objArray[0];
				BigDecimal r = (BigDecimal)objArray[1];
				BigDecimal p = (BigDecimal)objArray[2];
				BigDecimal hk = (BigDecimal)objArray[3];
				BigDecimal sumShipper = (BigDecimal)objArray[4];
				BigDecimal sumCons = (BigDecimal)objArray[5];
				
				if(r==null) r=new BigDecimal(0);
				if(p==null) p=new BigDecimal(0);
				if(hk==null) hk=new BigDecimal(0);
				if(sumShipper==null) sumShipper=new BigDecimal(0);
				if(sumCons==null) sumCons=new BigDecimal(0);
				cons.setSumR(r.doubleValue());//应收（包含发货方、收货方、中转回扣金额）
				cons.setSumP(p.doubleValue());//应付
				cons.setSumHk(hk.doubleValue());//应收（只包含中转回扣金额）
				cons.setSumShipperAmount(sumShipper.doubleValue());
				cons.setSumConsAmount(sumCons.doubleValue());
				
				float  sumR = 0;						//实收
				float sumP = 0;						//实付
				if(cons.getSumR()!=null){
					sumR =  cons.getSumR().floatValue();
				}
				if(cons.getSumP()!=null){
					sumP =  cons.getSumP().floatValue();
				}
				BigDecimal b = new BigDecimal(sumR-sumP);//中转回扣提交到费用表，在此不累计
				b=b.setScale(2,BigDecimal.ROUND_HALF_UP);//留两位小数，从第三位开始四舍五入
				cons.setMargin(b);//利润=应收-应付

				retList.add(cons);
			}
		}
		return retList;
	}
	
	//托运单和回收单模板输出
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional(readOnly = true)
	public List exportTemplate(){
		List retList = new ArrayList();
		String id = requestContext.get("id");
		TConsign consign = dao.findById(Long.parseLong(id));
		Map<String,String> queryMap = new HashMap<String, String>();
		queryMap.put("consId", id);
		List<TConsignCargo> cargoList = consignCargoDao.findByProperties(queryMap);
		retList.add(consign);
		retList.addAll(cargoList);
		return retList;
	}
	
	/**
     *托运单标记（标记单票有问题）
     *TCON_COLOR_STATUS
     *@author liuyong
	 */
	@Transactional
	public void consColorStatus(List<TConsign>  entityList) {
		TConsign cons = null;
		String flag=requestContext.get("consColorStatusFlag");
		if(flag!=null&&!flag.equals("")){
			for (Object obj : entityList){
				if (obj instanceof TConsign){
					cons = (TConsign) obj;
					cons.setConsColorStatus(flag);
					dao.update(cons);
				}
			}
		}
	}
	
}
