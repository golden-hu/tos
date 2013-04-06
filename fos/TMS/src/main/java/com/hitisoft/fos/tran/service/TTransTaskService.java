package com.hitisoft.fos.tran.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TCargoDao;
import com.hitisoft.fos.tran.dao.TConsignCargoDao;
import com.hitisoft.fos.tran.dao.TConsignDao;
import com.hitisoft.fos.tran.dao.TDriverDao;
import com.hitisoft.fos.tran.dao.TTaskConsignDao;
import com.hitisoft.fos.tran.dao.TTransTaskDao;
import com.hitisoft.fos.tran.dao.TVehicleDao;
import com.hitisoft.fos.tran.entity.TCargo;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.tran.entity.TConsignCargo;
import com.hitisoft.fos.tran.entity.TDriver;
import com.hitisoft.fos.tran.entity.TTaskConsign;
import com.hitisoft.fos.tran.entity.TTransTask;
import com.hitisoft.fos.tran.entity.TVehicle;
import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fw.orm.jpa.BaseDomain;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.StringUtil;
import com.hitisoft.fw.util.TimeUtil;

@Service
public class TTransTaskService {
	@Autowired
	private TTransTaskDao dao;
	@Autowired
	private TCargoDao cargoDao;
	@Autowired
	private TConsignDao consDao;
	@Autowired
	private TConsignCargoDao consCargoDao;
	@Autowired
	private SerialFactory serialFactory;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private TVehicleDao vehicleDao;
	@Autowired
	private TDriverDao driverDao;
	@Autowired
	private SessionContext  sessionContext;
	@Autowired
	private TTaskConsignDao taskConsDao;
	
	@Transactional
	public void deleteById(TTransTask task) {
		Long id = task.getId();
		dao.delete(id);
		
		Map<String,String> map = new HashMap<String,String>();
		map.put("transTaskId", ""+id);
		
		List<TCargo> items = cargoDao.findByProperties(map);
		
		for(TCargo c : items){
			c.setRowAction(RowAction.R);
		}
		cargoDao.saveByRowAction(items);
		
	}
	//保存运输单（派车单）一个‘运输单’对应多个‘托运单’
	@Transactional
	public List<BaseDomain> save(List<?> entityList) {
		List<BaseDomain> retList = new ArrayList<BaseDomain>();
		Long taskId = 0L;
		String taskNo="";
		TTransTask task = null;
		List<TCargo> cargoList = new ArrayList<TCargo>();
		List<TTaskConsign> taskConsList = new ArrayList<TTaskConsign>();
		
		for (Object obj : entityList) {
			if (obj instanceof TTransTask) {
				task = (TTransTask) obj;
				RowAction ra = task.getRowAction();
				if (ra == RowAction.N) {
					taskNo = serialFactory.getSerial("tran_task_no");
					task.setTransTaskNo(taskNo);
				}
				task = dao.saveByRowActionSolo(task);
				retList.add(task);
				taskId = task.getId();
			}else if(obj instanceof TCargo){
				TCargo item = (TCargo) obj;
				cargoList.add(item);
			}else if(obj instanceof TTaskConsign){
				TTaskConsign item = (TTaskConsign) obj;
				taskConsList.add(item);
			}
		}
		if(cargoList!=null&&cargoList.size()>0){
			for (TCargo cargo : cargoList) {
					RowAction ra = cargo.getRowAction();
					if(ra==RowAction.N){
						cargo.setTransTaskId(taskId.intValue());
						cargo.setTransTaskNo(taskNo);
						cargo=this.retuAddCargo(cargo);
					}else if (ra == RowAction.M) {
						cargo=this.retuUpdateCargo(cargo);
					}else if(ra == RowAction.R) {
						cargo=this.retuRemoveCargo(cargo);
					}
					retList.add(cargo);
			}
		}
		if(taskConsList!=null&&taskConsList.size()>0){
			for(TTaskConsign taskCons:taskConsList){
				RowAction ra=taskCons.getRowAction();
				taskCons.setTransTaskId(taskId.intValue());
				taskCons=taskConsDao.saveByRowActionSolo(taskCons);
				Long consId=taskCons.getConsId().longValue();
				TConsign cons=consDao.findById(consId);
				if(ra==RowAction.N){
					cons.setStatus(1);				//提货
				}else if(ra==RowAction.R){
					cons.setStatus(0);				//提货
				}
				consDao.update(cons);
				
				retList.add(taskCons);
			}
		}
		return retList;
	}

	/**
	 * 新增派车中的货物
	 * @param cargo
	 * @return
	 */
	public TCargo retuAddCargo(TCargo cargo){
		long consCargoId=cargo.getConsCargoId();
		TConsignCargo consCargo=consCargoDao.findById(consCargoId);
		if(consCargo!=null){
			//前台提交过来的派车装货的大于等于托运单货物中的件数
			int packages=0,packagesRemainder=0;
			if(cargo.getPackages()!=null){
				packages=cargo.getPackages();
			}
			if(consCargo.getPackagesRemainder()!=null){
				packagesRemainder=consCargo.getPackagesRemainder();
			}
			if(packages>=packagesRemainder){
				cargo.setPackages(consCargo.getPackagesRemainder());
				consCargo.setPackagesRemainder(0);
				consCargo.setStatus(1);
			}else if(packages<packagesRemainder){
				int r=packagesRemainder-packages;
				consCargo.setPackagesRemainder(r);
				if(packages>0){//派车装了一部分托运单货物
					consCargo.setStatus(1);
				}
			}
			//前台提交过来的派车装货的大于等于托运单货物中的毛重
			double grossWeight=0.00,grossWeightRemainder=0.00;
			if(cargo.getGrossWeight()!=null){
				grossWeight=cargo.getGrossWeight().doubleValue();
			}
			if(consCargo.getGrossWeightRemainder()!=null){
				grossWeightRemainder=consCargo.getGrossWeightRemainder().doubleValue();
			}
			if(grossWeight>=grossWeightRemainder){
				cargo.setGrossWeight(BigDecimal.valueOf(grossWeightRemainder));
				consCargo.setGrossWeightRemainder(BigDecimal.valueOf(0.00));
				consCargo.setStatus(1);
			}else if(grossWeight<grossWeightRemainder){
				double g=grossWeightRemainder-grossWeight;
				consCargo.setGrossWeightRemainder(BigDecimal.valueOf(g));
				if(grossWeight>0){//派车装了一部分托运单货物
					consCargo.setStatus(1);
				}
			}
			//前台提交过来的派车装货的大于等于托运单货物中的体积
			double measurement=0.00,measurementRemainder=0.00;
			if(cargo.getMeasurement()!=null){
				measurement=cargo.getMeasurement().doubleValue();
			}
			if(consCargo.getMeasurementRemainder()!=null){
				measurementRemainder=consCargo.getMeasurementRemainder().doubleValue();
			}
			if(measurement>=measurementRemainder){
				cargo.setMeasurement(BigDecimal.valueOf(measurementRemainder));
				consCargo.setMeasurementRemainder(BigDecimal.valueOf(0.00));
				consCargo.setStatus(1);
			}else if(measurement<measurementRemainder){
				double m=measurementRemainder-measurement;
				consCargo.setMeasurementRemainder(BigDecimal.valueOf(m));
				if(measurement>0){//派车装了一部分托运单货物
					consCargo.setStatus(1);
				}
			}
			cargo = cargoDao.saveByRowActionSolo(cargo);
			consCargoDao.update(consCargo);
		}
		return cargo;
	}
	
	/**
	 * 编辑派车中的货物
	 * @param cargo
	 * @return
	 */
	public TCargo retuUpdateCargo(TCargo cargo){
		Long cargoId=cargo.getId();
		TCargo cargoOr = cargoDao.findById(cargoId);
		long consCargoId=cargo.getConsCargoId();
		TConsignCargo consCargo=consCargoDao.findById(consCargoId);
		//前台提交过来修改后的件数减去修改前的件数
		int p=0,packages=0,packagesOr=0,packagesRemainder=0;
		if(cargo.getPackages()!=null){
			packages=cargo.getPackages();
		}
		if(cargoOr.getPackages()!=null){
			packagesOr=cargoOr.getPackages();
		}
		if(consCargo.getPackagesRemainder()!=null){
			packagesRemainder=consCargo.getPackagesRemainder();
		}
		p=packages-packagesOr;
		if(p>0){
			if(p>=packagesRemainder){
				cargo.setPackages(packagesOr+packagesRemainder);
				consCargo.setPackagesRemainder(0);
			}else if(p<packagesRemainder){
				consCargo.setPackagesRemainder(packagesRemainder-p);
			}
			consCargo.setStatus(1);
		}else if(p<0){
			consCargo.setPackagesRemainder(packagesRemainder+(-p));
			if(packages>0){
				consCargo.setStatus(1);
			}
		}
		//前台提交过来修改后的毛重减去修改前的毛重
		double g,grossWeight=0.00,grossWeightOr=0.00,grossWeightRemainder=0.00;
		if(cargo.getGrossWeight()!=null){
			grossWeight=cargo.getGrossWeight().doubleValue();
		}
		if(cargoOr.getGrossWeight()!=null){
			grossWeightOr=cargoOr.getGrossWeight().doubleValue();
		}
		if(consCargo.getGrossWeightRemainder()!=null){
			grossWeightRemainder=consCargo.getGrossWeightRemainder().doubleValue();
		}
		g=grossWeight-grossWeightOr;
		if(g>0){
			if(g>=grossWeightRemainder){
				cargo.setGrossWeight(BigDecimal.valueOf(
						grossWeightOr+grossWeightRemainder
				));
				consCargo.setGrossWeightRemainder(BigDecimal.valueOf(0.00));
			}else if(g<grossWeightRemainder){
				consCargo.setGrossWeightRemainder(BigDecimal.valueOf(
						grossWeightRemainder-g
				));
			}
			consCargo.setStatus(1);
		}else if(g<0){
			consCargo.setGrossWeightRemainder(BigDecimal.valueOf(
					grossWeightRemainder+(-g)
			));
			if(grossWeight>0){
				consCargo.setStatus(1);
			}
		}
		//前台提交过来修改后的毛重减去修改前的毛重
		double m=0.00,measurement=0.00,measurementOr=0.00,measurementRemainder=0.00;
		if(cargo.getMeasurement()!=null){
			measurement=cargo.getMeasurement().doubleValue();
		}
		if(cargoOr.getMeasurement()!=null){
			measurementOr=cargoOr.getMeasurement().doubleValue();
		}
		if(consCargo.getMeasurementRemainder()!=null){
			measurementRemainder=consCargo.getMeasurementRemainder().doubleValue();
		}
	    m=measurement-measurementOr;
		if(m>0){
			if(m>=measurementRemainder){
				cargo.setMeasurement(BigDecimal.valueOf(
						measurementOr+measurementRemainder
				));
				consCargo.setMeasurementRemainder(BigDecimal.valueOf(0.00));
			}else if(m<measurementRemainder){
				consCargo.setMeasurementRemainder(BigDecimal.valueOf(
						measurementRemainder-m
				));
			}
			consCargo.setStatus(1);
		}else if(m<0){
			consCargo.setMeasurementRemainder(BigDecimal.valueOf(
					measurementRemainder+(-m)
			));
			if(measurementRemainder>0){
				consCargo.setStatus(1);
			}
		}
		cargo = cargoDao.saveByRowActionSolo(cargo);
		consCargoDao.update(consCargo);
		return cargo;
	}
	
	/**
	 * 删除派车中的货物
	 * @param cargo
	 * @return
	 */
	public TCargo retuRemoveCargo(TCargo cargo){
		Long cargoId=cargo.getId();
		TCargo cargoOr = cargoDao.findById(cargoId);
		long consCargoId=cargo.getConsCargoId();
		TConsignCargo consCargo=consCargoDao.findById(consCargoId);
		int packagesOr=0,consCargoPackages=0,packagesRe=0;
		if(cargoOr.getPackages()!=null){
			packagesOr=cargoOr.getPackages();
		}
		if(consCargo.getPackages()!=null){
			packagesRe=consCargoPackages=consCargo.getPackages();
		}
		if(consCargo.getPackagesRemainder()!=null){
			consCargo.getPackagesRemainder();
		}
		if(packagesOr>0){
			consCargo.setPackagesRemainder(packagesOr+packagesRe);
			//判断当前托运单货物件数(packages)是否等于当前托运单货物剩余件数(packagesRemainder)
			if(consCargoPackages==packagesOr+packagesRe){
				consCargo.setStatus(0);
			}
		}
		double grossWeight=0,consCargoGrossWeight=0,grossWeightRe=0;
		if(cargoOr.getGrossWeight()!=null){
			grossWeight=cargoOr.getGrossWeight().doubleValue();
		}
		if(consCargo.getGrossWeight()!=null){
			consCargoGrossWeight=consCargo.getGrossWeight().doubleValue();
		}
		if(consCargo.getGrossWeightRemainder()!=null){
			grossWeightRe=consCargo.getGrossWeightRemainder().doubleValue();
		}
		if(grossWeight>0){
			consCargo.setGrossWeightRemainder(BigDecimal.valueOf(
					grossWeight+grossWeightRe
					));
			if(consCargoGrossWeight==grossWeightRe){
				consCargo.setStatus(0);
			}
		}
		double measurement=0,consCargoMeasurement=0,measurementRe=0;
		if(cargoOr.getMeasurement()!=null){
			measurement=cargoOr.getMeasurement().doubleValue();
		}
		if(consCargo.getMeasurement()!=null){
			consCargoMeasurement=consCargo.getMeasurement().doubleValue();
		}
		if(consCargo.getMeasurementRemainder()!=null){
			measurementRe=consCargo.getMeasurementRemainder().doubleValue();
		}
		if(measurement>0){
			consCargo.setMeasurementRemainder(BigDecimal.valueOf(
					measurement+measurementRe
					));
			if(consCargoMeasurement==measurementRe){
				consCargo.setStatus(0);
			}
		}
		cargo = cargoDao.saveByRowActionSolo(cargo);
		consCargoDao.update(consCargo);
		return cargo;
	}
	
	@Transactional(readOnly = true)
	public List<TTransTask> query() {
		return dao.findByProperties();
	}
	
	/**
	 * 运输输出
	 * ACTION:TTRT_X
	 * dispatchFlag：0：提货 1：送货 2：集装箱
	 * transTaskId存在是明细输出
	 * transTaskId不存在是列表输出
	 * @param conditions
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes", })
	@Transactional(readOnly = true)
	public List<TTransTask> complexQuery(List<HtQuery> conditions) {
		List retList = new ArrayList();
		int dispatchFlag=Integer.parseInt(requestContext.get("dispatchFlag"));
		String transTaskId=requestContext.get("transTaskId");
		TTransTask task=new TTransTask();
		Map<String,String> map=new HashMap<String,String>();
		map.put("transTaskId", transTaskId+"");
		map.put("removed",0+"");
		map.put("compCode", sessionContext.getCompCode());
		if(StringUtil.isNotBlank(transTaskId)){		//运输-明细输出
			task=dao.findById(Long.parseLong(transTaskId));
			retList.add(task);
			if(dispatchFlag==0){//提货明细
				List taskConsList=taskConsDao.findByProperties(map);
				retList.addAll(taskConsList);
			}else {						//送货-集装箱明细
				List cargoList = cargoDao.findByProperties(map);
				retList.addAll(cargoList);
			}
		}else{
			List transTaskList =  dao.complexSearch(conditions);
			retList.addAll(transTaskList);
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
	
	/**
	 * 更新派车单状态
	 * status:0：未派车 1：已发车 2：运输结束
	 */
	@Transactional
	public void updateStatus() {
		Long taskId = Long.valueOf(requestContext.get("id"));
		Integer status = Integer.valueOf(requestContext.get("status"));
		TTransTask task = dao.findById(taskId);
		if (task != null) {
			task.setStatus(status);										//status:0：未派车 1：已发运 2：已结束
			/*final Map<String, String> propertyMap = new HashMap<String, String>();
			propertyMap.put(SqlOp.equal.toString(), vNo);
			propertyMap.put(SqlOp.equal.toString(), 1+"");
			*/	
			Long vehicleId=task.getVehicleId().longValue();
			Long driverId=task.getDriverId().longValue();
			TVehicle vehicle=vehicleDao.findById(vehicleId);
			TDriver driver=driverDao.findById(driverId);
			if(status==1){													//车辆已发运
				vehicle.setTransTaskStatus(status);			//车辆运输中
				driver.setTransTaskStatus(status);				//司机驾驶中
				task.setStartDate(TimeUtil.getNow());
				this.transTaskAndArCargoStatus(taskId);	//当发车后判断货物派车状态和到货状态
			}else if(status==2){											//车辆已结束
				vehicle.setTransTaskStatus(0);					//设置此车空车
				driver.setTransTaskStatus(0);						//设置司机空闲
				task.setEndDate(TimeUtil.getNow());
				//this.defaultSignIn(taskId);							//当车辆运输结束的时候默认客户全部签收
			}
			vehicle=vehicleDao.update(vehicle);
			if(vehicle!=null){
				driverDao.update(driver);
			}
			dao.update(task);
		}
	}
	
	/**
	 * 当发车后判断货物派车状态和到货状态
	 * 托运单和托运单货物配车状态和货物到货状态
	 * ‘派车状态’ 0未派车，1部分派车，2，全部派车
	 * ‘到货状态’ 0未到货，1部分到货，3，全部到货
	 * status:0：未提货1：已提货2：已发运3：已到达
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
    public void transTaskAndArCargoStatus(Long taskId){
		Set consIdSet=new HashSet();
		Map<String,String> map = new HashMap<String,String>();
		map.put("compCode", sessionContext.getCompCode());
		map.put("removed",0+"");	
		map.put("transTaskId",taskId+"");
		List <TCargo>cargoList=cargoDao.findByProperties(map);
		if(cargoList!=null&&cargoList.size()>0){
			for(TCargo cargo:cargoList){
				consIdSet.add(cargo.getConsId());
				Long consCargoId=cargo.getConsCargoId().longValue();
				TConsignCargo consCargo=consCargoDao.findById(consCargoId);
				Integer packages=0,packagesRe=0;
				if(consCargo.getPackages()!=null){
					packages=consCargo.getPackages();
				}
				if(consCargo.getPackagesRemainder()!=null){
					packagesRe=consCargo.getPackagesRemainder();
				}
				if(packagesRe>0&&packagesRe==packages){								//托运单货物装车剩余数
						consCargo.setTransTaskStatus(0);											//托运单货物未装车
				}else if(packagesRe>0){
					consCargo.setTransTaskStatus(1);												//托运单货物部分装车
				}else if(packagesRe==0){
					consCargo.setTransTaskStatus(2);												//托运单货物全部装车
				}
				consCargoDao.update(consCargo);
			}
			for(Iterator consIdIte=consIdSet.iterator();consIdIte.hasNext();){
				Long consId=Long.valueOf(consIdIte.next()+"");
				TConsign cons=consDao.findById(consId);
				Map<String,String> consCargoMap = new HashMap<String,String>();
				consCargoMap.put("compCode", sessionContext.getCompCode());
				consCargoMap.put("removed",0+"");	
				consCargoMap.put("consId", consId+"");
				List<TConsignCargo> consCargoList=consCargoDao.findByProperties(consCargoMap);
				if(consCargoList!=null&&consCargoList.size()>0){
					Integer packagesSum=0,packagesReSum=0;
					for(TConsignCargo consCargo:consCargoList){
						if(consCargo.getPackages()!=null){
							packagesSum+=consCargo.getPackages();
						}
						if(consCargo.getPackagesRemainder()!=null){
							packagesReSum+=consCargo.getPackagesRemainder();
						}
					}
					if(packagesReSum>0&&packagesReSum<packagesSum){
						cons.setTransTaskStatus(1);															//托运单部分装车
						cons.setStatus(1);																			//托运单已提货
					}else if(packagesReSum==0){
						cons.setTransTaskStatus(2);															//托运单全部装车
						cons.setStatus(2);																			//托运单已发运
					}else if(packagesReSum.equals(packagesSum)){
						cons.setTransTaskStatus(0);															//托运单未装车
						cons.setStatus(0);																			//托运单未提货
					}
					consDao.update(cons);
				}
			}
		}
	}
	//当车辆运输结束的时候默认客户全部签收
		@SuppressWarnings({ "rawtypes", "unchecked" })
        public void defaultSignIn(Long taskId){
			Set consIdSet=new HashSet();
			Map<String,String> map = new HashMap<String,String>();
			map.put("compCode", sessionContext.getCompCode());
			map.put("removed",0+"");
			map.put("transTaskId",taskId+"");
			List <TCargo>cargoList=cargoDao.findByProperties(map);
			if(cargoList!=null&&cargoList.size()>0){
				for(TCargo cargo:cargoList){
					consIdSet.add(cargo.getConsId());
					Integer signInStatus=0;
					if(cargo.getSignInStatus()!=null){
						signInStatus=cargo.getSignInStatus();
					}
					if(signInStatus==0){																				//未签收
						Long consCargoId=cargo.getConsCargoId().longValue();
						TConsignCargo consCargo=consCargoDao.findById(consCargoId);
						Integer packages=0,packageArrival=0,packagesLack=0;
						if(cargo.getPackages()!=null){
							packages=cargo.getPackages();													//装车件数
						}
						if(cargo.getPackageArrival()!=null){
							packageArrival=cargo.getPackageArrival();								//装车到达件数
						}
						if(cargo.getPackagesLack()!=null){
							packagesLack=cargo.getPackagesLack();									//装车缺少件数
						}
						double grossWeight=0.00,measurement=0.00,
								grossWeightArrival=0.00,measurementArrival=0.00,
								grossWeightLack=0.00,measurementLack=0.00;
						if(cargo.getGrossWeight()!=null){													//装车毛重
							grossWeight=cargo.getGrossWeight().doubleValue();
						}
						if(cargo.getMeasurement()!=null){												//装车体积
							measurement=cargo.getMeasurement().doubleValue();
						}
						if(cargo.getGrossWeightArrival()!=null){										//装车到达毛重
							grossWeightArrival=cargo.getGrossWeightArrival().doubleValue();
						}
						if(cargo.getMeasurementArrival()!=null){										//装车到达体积
							measurementArrival=cargo.getMeasurementArrival().doubleValue();
						}
						if(cargo.getGrossWeightLack()!=null){											//装车缺少毛重
							grossWeightLack=cargo.getGrossWeightLack().doubleValue();
						}
						if(cargo.getMeasurementLack()!=null){											//装车缺少体积
							measurementLack=cargo.getMeasurementLack().doubleValue();
						}
						if(packageArrival<=0){																	//装车货物到货后，客户签收的件数就是装车的件数
							packageArrival=packages;
						}
						cargo.setPackageArrival(packageArrival);
						consCargo.setPackageArrival(
								consCargo.getPackageArrival()+packageArrival					  	//托运单货物装车后到达货物件数累加
						);
						consCargo.setPackagesLack(
								consCargo.getPackagesLack()+packagesLack					   //托运单货物装车后到达货物缺少件数累加
						);
						
						if(grossWeightArrival<=0){
							grossWeightArrival=grossWeight;
						}
						cargo.setGrossWeightArrival(new BigDecimal(grossWeightArrival));
						consCargo.setGrossWeightArrival(new BigDecimal(							//托运单货物装车后到达货物毛重累加
								consCargo.getGrossWeightArrival().doubleValue()+grossWeightArrival
						));
						consCargo.setGrossWeightLack(new BigDecimal(							//托运单货物装车后到达货物缺少毛重累加
								consCargo.getGrossWeightLack().doubleValue()+grossWeightLack
						));
						
						if(measurementArrival<=0){
							measurementArrival=measurement;
						}
						cargo.setMeasurementArrival(new BigDecimal(measurementArrival));
						consCargo.setMeasurementArrival(new BigDecimal(
								consCargo.getMeasurementArrival().doubleValue()+measurementArrival
						));
						consCargo.setMeasurementLack(new BigDecimal(
								consCargo.getMeasurementLack().doubleValue()+measurementLack
						));
						
						cargo.setSignInStatus(1);
						cargo=cargoDao.update(cargo);
						if(cargo!=null){
							consCargoDao.update(consCargo);
						}
						cargoDao.update(cargo);
					}
				}
				//更新托运单‘为到货’‘部分到货’‘全部到货’状态
				for(Iterator consIdIte=consIdSet.iterator();consIdIte.hasNext();){
					Long consId=Long.valueOf(consIdIte.next()+"");
					TConsign cons=consDao.findById(consId);
					Map<String,String> consCargoMap = new HashMap<String,String>();
					consCargoMap.put("compCode", sessionContext.getCompCode());
					consCargoMap.put("removed",0+"");
					consCargoMap.put("consId", cons.getId()+"");
					List<TConsignCargo> consCargoList=consCargoDao.findByProperties(consCargoMap);
					if(consCargoList!=null&&consCargoList.size()>0){
						Integer packagesSum=0,packagesReSum=0,packagesArSum=0;		//托运单货物
						for(TConsignCargo consCar:consCargoList){
							if(consCar.getPackages()!=null){
								packagesSum+=consCar.getPackages();
							}
							if(consCar.getPackagesRemainder()!=null){
								packagesReSum+=consCar.getPackagesRemainder();
							}
							if(consCar.getPackageArrival()!=null){
								packagesArSum+=consCar.getPackageArrival();
							}
						}
						if(packagesArSum>0&&packagesArSum.equals(packagesSum)){
							cons.setCargoArrivalStatus(2);														//托运单全部到货
							cons.setStatus(3);																			//托运单已到达
						}else if(packagesArSum>0&&packagesArSum<packagesSum){
							cons.setCargoArrivalStatus(1);														//托运单部分到货
							cons.setStatus(2);																	        //托运单已发运
						}else if(packagesArSum==0){
							cons.setCargoArrivalStatus(0);														//托运单未到货
							cons.setStatus(2);																			//托运单已发运
						}
						consDao.update(cons);
					}
				}
			}
		}
		
	/**
	 * 快速查询
	 * @param conditions
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<TTransTask> complexSearch(List<HtQuery> conditions) {
		List<TTransTask> objList=dao.complexSearch(conditions);
		return objList;
	}
	
	//网上服务派车信息
	@SuppressWarnings("unused")
    public List<TTransTask> getTransTaskByConsId(){
		List<BaseDomain> retList = new ArrayList<BaseDomain>();
		return dao.getTransTaskByConsId();
	}
}
