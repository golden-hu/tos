package com.hitisoft.fos.wms.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.util.FosExceptionEnum;
import com.hitisoft.fos.wms.dao.WCheckCargoDao;
import com.hitisoft.fos.wms.dao.WCheckNoteDao;
import com.hitisoft.fos.wms.dao.WPlacedCargoDao;
import com.hitisoft.fos.wms.dao.WReceivedCargoDao;
import com.hitisoft.fos.wms.dao.WStorageNoteCargoDao;
import com.hitisoft.fos.wms.dao.WStorageNoteDao;
import com.hitisoft.fos.wms.entity.WPlacedCargo;
import com.hitisoft.fos.wms.entity.WReceivedCargo;
import com.hitisoft.fos.wms.entity.WStorageNote;
import com.hitisoft.fos.wms.entity.WStorageNoteCargo;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.util.NumberUtil;

@Service
public class WPlacedCargoService {
	@Autowired
	private WPlacedCargoDao dao;
	@Autowired
	private WReceivedCargoDao rdao;
	@Autowired
	private WStorageNoteCargoDao cdao;
	@Autowired
	private WStorageNoteDao ndao;
	@Autowired
	private WCheckCargoDao wcc;
	@Autowired
	private WCheckNoteDao wcn;
	@Autowired
	private RequestContext requestContext;
	
	@Transactional
	public List<WPlacedCargo> save(List<WPlacedCargo> entityCargo) {
		return dao.saveByRowAction(entityCargo);
	}
	
	/*
	 * WPLACED_CARGO_QA
	 * 
	 */
	public List<WPlacedCargo> queryAll(List<HtQuery>conditions){
		return dao.queryAll(conditions);
	}
	
	
	/*
	 *Action:WPLACED_CARGO_XS
	 * 保存上架数据
	 * 1、合计收货表的上架数量
	 * 2、合计计划表的上架数量
	 * 3、更新主表的状态
	 * 返回更新过的record
	 */
	@Transactional
	public List complexSave(List entityList){
		List retList=new ArrayList();
		Map<Long,Long> idMap=new HashMap<Long,Long>();
		Map<Long,Long> sncIdMap=new HashMap<Long,Long>();
		Map<Integer,Integer> snIdMap=new HashMap<Integer,Integer>();
		for(Object obj:entityList){
			if(obj instanceof WPlacedCargo){
				WPlacedCargo entity=(WPlacedCargo)obj;				
				RowAction ra=entity.getRowAction();
				
				if(ra!=RowAction.R){
					entity=dao.saveByRowActionSolo(entity);	
				}
				else{
					dao.saveByRowActionSolo(entity);
				}
				idMap.put(entity.getReceivedCargoId(), entity.getReceivedCargoId());
				if(ra!=RowAction.R){
					retList.add(entity);
				}
			}
		}
		
		for (Map.Entry<Long, Long> mapItem : idMap.entrySet()) {
			Long receivedCargoId=mapItem.getValue();
			WReceivedCargo rc=rdao.findById(receivedCargoId);
			if(rc!=null){
				Double sumPlacedQuantity=0.00;
				Double sumPlacedPackages=0.00;
				Double sumPlacedGrossWeight=0.00;
				Double sumPlacedNetWeight=0.00;
				Double sumPlacedVolume=0.00;
				Double sumPlacedMeasure=0.00;
				
				List<WPlacedCargo> pcList=dao.findByProperty("receivedCargoId", ""+receivedCargoId);				
				for(WPlacedCargo pc:pcList){
					sumPlacedQuantity=sumPlacedQuantity+NumberUtil.null2Zero(pc.getQuantity());
					sumPlacedPackages=sumPlacedPackages+NumberUtil.null2Zero(pc.getPackages());
					sumPlacedGrossWeight=sumPlacedGrossWeight+NumberUtil.null2Zero(pc.getGrossWeight());
					sumPlacedNetWeight=sumPlacedNetWeight+NumberUtil.null2Zero(pc.getNetWeight());
					sumPlacedVolume=sumPlacedVolume+NumberUtil.null2Zero(pc.getVolume());
					sumPlacedMeasure=sumPlacedMeasure+NumberUtil.null2Zero(pc.getMeasure());
					
				}
				
				rc.setPlacedQuantity(sumPlacedQuantity);
				rc.setPlacedPackages(sumPlacedPackages);
				rc.setPlacedGrossWeight(sumPlacedGrossWeight);
				rc.setPlacedNetWeight(sumPlacedNetWeight);
				rc.setPlacedVolume(sumPlacedVolume);
				rc.setPlacedMeasure(sumPlacedMeasure);				
				rc.setRowAction(RowAction.M);
				if(sumPlacedQuantity>0){
					rc.setStatus(4);
				}
				else{
					rc.setStatus(0);
				}
				rc=rdao.saveByRowActionSolo(rc);
				sncIdMap.put(rc.getStorageNoteCargoId(), rc.getStorageNoteCargoId());
				retList.add(rc);
			}
		}
		
		for (Map.Entry<Long, Long> mapItem : sncIdMap.entrySet()) {
			Long storageNoteCargoId=mapItem.getValue();
			WStorageNoteCargo snc=cdao.findById(storageNoteCargoId);
			List<WReceivedCargo> rcList=rdao.findByProperty("storageNoteCargoId", ""+storageNoteCargoId);
			if(snc!=null){
				Double sumPlacedQuantity=0.00;
				Double sumPlacedPackages=0.00;
				Double sumPlacedGrossWeight=0.00;
				Double sumPlacedNetWeight=0.00;
				Double sumPlacedVolume=0.00;
				Double sumPlacedMeasure=0.00;
				for(WReceivedCargo rc:rcList){
					sumPlacedQuantity=sumPlacedQuantity+NumberUtil.null2Zero(rc.getPlacedQuantity());
					sumPlacedPackages=sumPlacedPackages+NumberUtil.null2Zero(rc.getPlacedPackages());
					sumPlacedGrossWeight=sumPlacedGrossWeight+NumberUtil.null2Zero(rc.getPlacedGrossWeight());
					sumPlacedNetWeight=sumPlacedNetWeight+NumberUtil.null2Zero(rc.getPlacedNetWeight());
					sumPlacedVolume=sumPlacedVolume+NumberUtil.null2Zero(rc.getPlacedVolume());
					sumPlacedMeasure=sumPlacedMeasure+NumberUtil.null2Zero(rc.getPlacedMeasure());
					
				}
				
				snc.setPlacedQuantity(sumPlacedQuantity);
				snc.setPlacedPackages(sumPlacedPackages);
				snc.setPlacedGrossWeight(sumPlacedGrossWeight);
				snc.setPlacedNetWeight(sumPlacedNetWeight);
				snc.setPlacedVolume(sumPlacedVolume);
				snc.setPlacedMeasure(sumPlacedMeasure);				
				snc.setRowAction(RowAction.M);
				if(sumPlacedQuantity>0){
					snc.setStatus(4);
				}
				else if(snc.getPlanedQuantity()<=snc.getReceivedQuantity()){
					snc.setStatus(3);
				}
				else{
					snc.setStatus(2);
				}
				snc=cdao.saveByRowActionSolo(snc);
				snIdMap.put(snc.getStorageNoteId(),snc.getStorageNoteId());
				retList.add(snc);
			}
		}
		
		for (Map.Entry<Integer, Integer> mapItem : snIdMap.entrySet()) {
			Integer storageNoteId=mapItem.getValue();
			WStorageNote sn=ndao.findById(storageNoteId.longValue());
			List<WStorageNoteCargo> sncList=cdao.findByProperty("storageNoteId", ""+storageNoteId);
			if(sn!=null){
				Double sumPlacedQuantity=0.00;
				Double sumReceivedQuantity=0.00;
				Double sumPlanedQuantity=0.00;
				
				for(WStorageNoteCargo snc:sncList){
					sumPlacedQuantity=sumPlacedQuantity+NumberUtil.null2Zero(snc.getPlacedQuantity());
					sumReceivedQuantity=sumReceivedQuantity+NumberUtil.null2Zero(snc.getReceivedQuantity());
					sumPlanedQuantity=sumPlanedQuantity+NumberUtil.null2Zero(snc.getPlanedQuantity());					
				}
				if(sumPlacedQuantity>0){
					sn.setStatus(4);
				}
				else if(sumPlanedQuantity<=sumReceivedQuantity){
					sn.setStatus(3);
				}
				else if(sumPlanedQuantity>sumReceivedQuantity&&sumReceivedQuantity>0){
					sn.setStatus(2);
				}
				else{
					sn.setStatus(1);
				}
				sn.setRowAction(RowAction.M);
				sn=ndao.saveByRowActionSolo(sn);				
				retList.add(sn);
			}
		}
		return retList;
	
	}
	
	/**Action : WPLACED_CARGO_Q<p>
	 * 上架商品查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WPlacedCargo> query() {
		return dao.findByProperties();
	}
	
	
	/**Action : WPLACED_CARGO_X4PK<p>
	 * 拣货出库的库存查询
	 * @param conditions
	 * @return
	 */
	public List<WPlacedCargo> complexQuery4Pick(List<HtQuery>conditions){
		List<WPlacedCargo> reList=new ArrayList();
		List<WPlacedCargo> pcList=dao.complexQuery(conditions);
		for(WPlacedCargo pc:pcList){
			pc.setSelectFlag(0);
			Double nowQuantity=NumberUtil.null2Zero(pc.getQuantity())-NumberUtil.null2Zero(pc.getPickedQuantity())-NumberUtil.null2Zero(pc.getDistQuantity());
			pc.setNowQuantity(nowQuantity);
			pc.setNowPackages(NumberUtil.null2Zero(pc.getPackages())-NumberUtil.null2Zero(pc.getPickedPackages())-NumberUtil.null2Zero(pc.getDistPackages()));
			pc.setNowGrossWeight(NumberUtil.null2Zero(pc.getGrossWeight())-NumberUtil.null2Zero(pc.getPickedGrossWeight())-NumberUtil.null2Zero(pc.getDistGrossWeight()));
			pc.setNowNetWeight(NumberUtil.null2Zero(pc.getNetWeight())-NumberUtil.null2Zero(pc.getPickedNetWeight())-NumberUtil.null2Zero(pc.getDistNetWeight()));
			pc.setNowVolume(NumberUtil.null2Zero(pc.getVolume())-NumberUtil.null2Zero(pc.getPickedVolume())-NumberUtil.null2Zero(pc.getDistVolume()));
			pc.setNowMeasurement(NumberUtil.null2Zero(pc.getMeasure())-NumberUtil.null2Zero(pc.getPickedMeasurement())-NumberUtil.null2Zero(pc.getDistMeasure()));
			
			pc.setLastPickedGrossWeight(0.00);
			pc.setLastPickedMeasure(0.00);
			pc.setLastPickedNetWeight(0.00);
			pc.setLastPickedPackages(0.00);
			pc.setLastPickedQuantity(0.00);
			pc.setLastPickedVolume(0.00);
			pc.setLastPickedPackQuantity(0.00);
			reList.add(pc);
		}
		return reList;
	}
	
	
	/**Action : WPLACED_CARGO_X<p>
	 * 库存复杂查询
	 * @param conditions
	 * @return
	 */
	public List<WPlacedCargo> complexQuery(List<HtQuery> conditions) {
		List<WPlacedCargo> reList=new ArrayList();
		List<WPlacedCargo> pcList=dao.complexQuery(conditions);
		for(WPlacedCargo pc:pcList){
			pc.setSelectFlag(0);
			reList.add(pc);
		}
		return reList;
	}
	/**Action : WPLACED_CARGO_FC<p>
	 * 库存子表查询
	 * @param conditions
	 * @return
	 */
	public List<WPlacedCargo> findByCargo(List<HtQuery> conditions) {
		List<WPlacedCargo> reList=new ArrayList();
		List<WPlacedCargo> pcList=dao.findByCargo(conditions);
		for(WPlacedCargo pc:pcList){
			pc.setSelectFlag(0);
			reList.add(pc);
		}
		return reList;
	}
	/**Action : WPLACED_CARGO_PQ<p>
	 * 上架商品复杂查询
	 * @param conditions
	 * @return
	 */
	public List<WPlacedCargo> placedQuery(List<HtQuery> conditions) {
		List<WPlacedCargo> reList=new ArrayList();
		List<WPlacedCargo> pcList=dao.placedQuery(conditions);
		for(WPlacedCargo pc:pcList){
			pc.setSelectFlag(0);
			reList.add(pc);
		}
		return reList;
	}

/**Action : WPLACED_CARGO_E<p>
 * 及时货物查询xls报表
 * @param conditions
 * @return
 */
	public List<WPlacedCargo> inventoryListExp(List <HtQuery>conditions){
		List<Object> objList=dao.inventoryListExp(conditions);
		List<WPlacedCargo> aList =new ArrayList<WPlacedCargo>();
		for (Object  obj: objList){
			if(obj instanceof Object[]){
				Object[] objArray=(Object[]) obj;
				WPlacedCargo pc=new WPlacedCargo();
				pc.setProductNo((String) objArray[0]);
				pc.setCargoOwnerName((String) objArray[1]);
				pc.setSkuNo((String) objArray[2]);
				pc.setCargoName((String) objArray[3]);
				pc.setBlockName((String) objArray[4]);
				pc.setUnitName((String) objArray[5]);
				pc.setNowQuantity(Double.parseDouble(objArray[6].toString()) );
				pc.setMeasure(Double.parseDouble(objArray[7].toString()) );
				pc.setNowPackages(Double.parseDouble(objArray[10].toString()) );
				pc.setBatchNo((String) objArray[11]);
				pc.setProductNo((String) objArray[12]);
				pc.setCustName((String) objArray[13]);
				pc.setGrossWeight(Double.parseDouble(objArray[14].toString()));
				pc.setStandardVolume(Double.parseDouble(objArray[15].toString()));
				pc.setStandardMeasure(Double.parseDouble(objArray[16].toString()));
				pc.setStatus(Integer.parseInt(objArray[17].toString()) );
				pc.setReceivedDate((Date) objArray[18]);
				pc.setCategoryName((String) objArray[19]);
				pc.setNowGrossWeight(Double.parseDouble(objArray[14].toString()) * Double.parseDouble(objArray[6].toString()));
				pc.setNowVolume(Double.parseDouble(objArray[15].toString()) * Double.parseDouble(objArray[6].toString()));
				pc.setMeasure(Double.parseDouble(objArray[16].toString()) * Double.parseDouble(objArray[6].toString()));
				aList.add(pc);
			}
		}
		return aList;
	}
	
/**Action : WPLACED_CARGO_E<p>
 * 冻结货物
 * @param entity
 */
	@Transactional
	public void frozenCargo(List<WPlacedCargo> entity){
		Integer statusFrozen = Integer.valueOf(requestContext.get("statusFrozen"));
		String frozenCategoryCode =String.valueOf(requestContext.get("frozenCategoryCode"));
		String frozenCategory=String.valueOf(requestContext.get("frozenCategory"));
		
		String nowLoginUser=String.valueOf(requestContext.get("nowLoginUser"));
		Date now=new Date();
		for(WPlacedCargo pc:entity){
			pc.setRowAction(RowAction.M);
			if(statusFrozen==0){
				pc.setStatusFrozen(statusFrozen);
				pc.setFreezeName(nowLoginUser);
				pc.setFreezetime(now);
				pc.setFrozenCategoryCode(frozenCategoryCode);
				pc.setFrozenCategory(frozenCategory);
				pc.setFreezeCancelName("");
				pc.setFreezeCancelTime(null);
			}
			else{
				pc.setStatusFrozen(1);
				pc.setFreezeCancelName(nowLoginUser);
				pc.setFreezeCancelTime(now);
				pc.setFreezeName("");
				pc.setFrozenCategory("");
				pc.setFrozenCategoryCode("");
				pc.setFreezetime(null);
			}
		}
		dao.saveByRowAction(entity);
	}
	
	
	/**Action : WPLACED_CARGO_Q<p>
	 * 冻结货物查询
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional(readOnly=true)
	public List<Object> query4Forzen(List<HtQuery> conditions){
		String isDue=requestContext.get("overdue");
		System.out.println("overDue：" + isDue);
		List list= new ArrayList();
		List<Object> placedcargo=dao.query4Forzen(conditions);
		for(Object ob: placedcargo){
			Object[] obj=(Object[]) ob;
			WPlacedCargo pc=(WPlacedCargo) obj[0];
			Double planedMeasureq= NumberUtil.null2Zero((Double) obj[1]);
			String mUnitName=(String) obj[2];
			String wUnitName=(String) obj[3];
			Double planedVolume=(Double) obj[4];
			String vUnitName=(String) obj[5];
			Double planedGrossWeight=(Double) obj[6];
			Double planedNetWeight=(Double) obj[7];
			
			Integer safeDays=(Integer) obj[8];
			if(safeDays==null){
				safeDays=0;
			}
			pc.setPlanedMeasure(planedMeasureq);
			//pc.setProductDate(productDate);
			pc.setSafeDays(safeDays);
			pc.setmUnitName(mUnitName);
			pc.setWUnitName(wUnitName);
			pc.setPlanedVolume(planedVolume);
			pc.setVUnitName(vUnitName);
			pc.setPlanedGrossWeight(planedGrossWeight);
			pc.setPlanedNetWeight(planedNetWeight);
			if(safeDays>0){
				Calendar cal=Calendar.getInstance();
				if(pc.getProductDate()!=null){
					cal.setTime(pc.getProductDate());
				}
				else{
					cal.set(2000-1900,1-1,0);
				}
				cal.add(Calendar.DAY_OF_YEAR, safeDays);
				Calendar cal2=Calendar.getInstance();
				long timestart = cal.getTimeInMillis();  
				long timeend = cal2.getTimeInMillis();
				long totalDate = (timeend - timestart)/(1000*60*60*24);
				
				pc.setOverdueDays(totalDate);
				
				//pc.setOverdueDays()
			}
			else{
				pc.setOverdueDays(0);
			}
			
			if(isDue.equals("true")){
				if(pc.getOverdueDays()>0){
					list.add(pc);
				}
				
			}
			else if(isDue.equals("false")){
				list.add(pc);
			}	
		}
		
		return list;
	}
	
	/**Action : WPLACED_CARGO_C<p>
	 * 取消冻结货物查询
	 * @param conditions
	 * @return
	 */
	//取消冻结货物查询
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional(readOnly=true)
	public List<Object> query4ForzenCancel(List<HtQuery> conditions){
		//Long id = Long.valueOf(requestContext.get("id"));
		String isDue=requestContext.get("overdue");
		System.out.println("overDue：" + isDue);
		List list= new ArrayList();
		List<Object> placedcargo=dao.query4ForzenCancel(conditions);
		for(Object ob: placedcargo){
			Object[] obj=(Object[]) ob;
			WPlacedCargo pc=(WPlacedCargo) obj[0];
			Double planedMeasureq= (Double) obj[1];
			String mUnitName=(String) obj[2];
			String wUnitName=(String) obj[3];
			Double planedVolume=(Double) obj[4];
			String vUnitName=(String) obj[5];
			Double planedGrossWeight=(Double) obj[6];
			Double planedNetWeight=(Double) obj[7];
			
			Integer safeDays=(Integer) obj[8];
			if(safeDays==null){
				safeDays=0;
			}
			pc.setPlanedMeasure(planedMeasureq);
			pc.setSafeDays(safeDays);
			pc.setmUnitName(mUnitName);
			pc.setWUnitName(wUnitName);
			pc.setPlanedVolume(planedVolume);
			pc.setVUnitName(vUnitName);
			pc.setPlanedGrossWeight(planedGrossWeight);
			pc.setPlanedNetWeight(planedNetWeight);
			
			if(safeDays>0){
				Calendar cal=Calendar.getInstance();
				if(pc.getProductDate()!=null){
					cal.setTime(pc.getProductDate());
				}
				else{
					cal.set(2000-1900,1-1,0);
				}
				cal.add(Calendar.DAY_OF_YEAR, safeDays);
				Calendar cal2=Calendar.getInstance();
				long timestart = cal.getTimeInMillis();  
				long timeend = cal2.getTimeInMillis();
				long totalDate = (timeend - timestart)/(1000*60*60*24);
				//TimeUtil.getDiffDays(from, to)
				pc.setOverdueDays(totalDate);
				
				//pc.setOverdueDays()
			}
			else{
				pc.setOverdueDays(0);
			}
			if(isDue.equals("true")){
				if(pc.getOverdueDays()>0){
					list.add(pc);
				}
				
			}
			else{
				list.add(pc);
			}			
		}
		return list;
	}
	/**Action : WPLACED_CARGO_P<p>
	 * 上架商品登记
	 * @param c
	 */
	@Transactional
	public void palceCargo(WPlacedCargo c) {
		Double quantity = c.getQuantity();
		//取得收货明细表ID 
		WReceivedCargo rc = rdao.findById(c.getReceivedCargoId());
		
		//如果收货数量减去已上架数量小于本次要上架的数量，则不合法，提示用户
		//如果收货数量减去已上架数量等于本次要上架的数量，则收货明细的状态置为2，上架完成
		//否则收货明细的状态置为1，上架中
		if(rc.getQuantity()-rc.getPlacedQuantity()<c.getQuantity())
			throw new BusinessException(FosExceptionEnum.WMS_PLACED_QUANTITY_OVER);
		else if(rc.getQuantity()-rc.getPlacedQuantity()==c.getQuantity())
			rc.setStatus(2);
		else 
			rc.setStatus(1);
		
		//收货明细数据的上架数量累加
		rc.setPlacedQuantity(rc.getPlacedQuantity()+quantity);
		rc.setAreaCode(c.getAreaCode());
		rc.setAreaId(c.getAreaId());
		rc.setAreaName(c.getAreaName());
		rc.setBlockCode(c.getBarCode());
		rc.setBlockId(c.getBlockId());
		rc.setBlockName(c.getBlockName());
		//收货明细数据的记录状态置为修改
		rc.setRowAction(RowAction.M);
		//保存
		rdao.saveByRowActionSolo(rc);
		
		//根据入库单货物明细ID找到相对应的入库单货物明细
		WStorageNoteCargo nc = cdao.findById(c.getStorageNoteCargoId());
		
		//如果已收货数量减去已上架数量小于本次要上架的数量，则不合法，提示用户
		//如果已收货数量减去已上架数量等于本次要上架的数量, 则置为上架完成
		//否则，置为上架中
		if(nc.getReceivedQuantity()-nc.getPlacedQuantity()<c.getQuantity())
			throw new BusinessException(FosExceptionEnum.WMS_PLACED_QUANTITY_OVER);
		else if(nc.getReceivedQuantity()-nc.getPlacedQuantity()==c.getQuantity())
			nc.setStatus(5);
		else 
			nc.setStatus(4);
		
		//收货明细记录的上架数量进行累加
		nc.setPlacedQuantity(nc.getPlacedQuantity()+quantity);
		nc.setAreaCode(c.getAreaCode());
		nc.setAreaId(c.getAreaId().intValue());
		nc.setAreaName(c.getAreaName());
		nc.setBlockCode(c.getBlockCode());
		nc.setBlockId(c.getBlockId().intValue());
		nc.setBlockName(c.getBlockName());
		
		//收货明细数据的记录状态置为修改
		nc.setRowAction(RowAction.M);
		//保存 
		cdao.saveByRowActionSolo(nc);
		
		//以下这一段是根据入库单号ID找到相对应的入库单号数据，查询该入库单号下的货物明细数据是否都已经是上架完成状态
		//如果是则入库单号数据置为上架完成，否则置为上架中
		WStorageNote n = ndao.findById(c.getStorageNoteId());
		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put("storageNoteId", "" + c.getStorageNoteId());
		List<WStorageNoteCargo>  cList = cdao.findByProperties(queryMap);
		Integer status =5;
		for(WStorageNoteCargo sc : cList){
			if(sc.getStatus()!=5){
				status =4;
				break;
			}
		}
		n.setStatus(status);
		n.setRowAction(RowAction.M);
		ndao.saveByRowActionSolo(n);
		
		//更新上架货物数据的客户ID，客户名称，订单号字段项
		c.setCustId(n.getCustId());
		c.setCustName(n.getCustName());
		c.setOrderNo(n.getOrderNo());
		
		dao.saveByRowActionSolo(c);
	}
	
	/**Action : WPLACED_RECEIVED_TO_PLACED
	 * 上架
	 * @param entityList
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List receivedToPlaced(List entityList) {
		List retList=new ArrayList();
		
		//哈希表，用于保存strogenotecargoID,receivedCargoId
		Map<Long, Long> idMap = new HashMap<Long, Long>();
		Map<Long, Long> recivedIdMap = new HashMap<Long, Long>();
		
		Calendar cal=Calendar.getInstance(); 
		Date placedDate=cal.getTime();
		
		for(Object obj:entityList){
			if(obj instanceof WPlacedCargo){
				WPlacedCargo entity=(WPlacedCargo)obj;
				entity.setPlacedDate(placedDate);
				RowAction ra=entity.getRowAction();
				entity=dao.saveByRowActionSolo(entity);
				
				Long receivedCargoId=entity.getReceivedCargoId();
				recivedIdMap.put(receivedCargoId, receivedCargoId);
				if(ra!=RowAction.R){
					retList.add(entity);
				}
			}
		}
		for (Map.Entry<Long, Long> mapItem : recivedIdMap.entrySet()) {
			Long vReceivedCargoId = (Long) mapItem.getValue();
			WReceivedCargo rc=rdao.findById(vReceivedCargoId);
			List<WPlacedCargo> listWPlacedCargo=dao.findByProperty("receivedCargoId", ""+vReceivedCargoId);
			
			double sumPQ=0.00;
			double sumPP=0.00;
			double sumPGW=0.00;
			double sumPNW=0.00;
			double sumPV=0.00;
			for(WPlacedCargo wpc:listWPlacedCargo){
				if(wpc.getStatus()==5){
					sumPQ+=NumberUtil.null2Zero(wpc.getPlacedQuantity());
					sumPP+=NumberUtil.null2Zero(wpc.getPlacedPackages());
					sumPGW+=NumberUtil.null2Zero(wpc.getPlacedGrossWeight());
					sumPNW+=NumberUtil.null2Zero(wpc.getPlacedNetWeight());
					sumPV+=NumberUtil.null2Zero(wpc.getPlacedVolume());
				}
			}
			
			rc.setPlacedQuantity(sumPQ);
			rc.setPlacedPackages(sumPP);
			rc.setPlacedGrossWeight(sumPGW);
			rc.setPlacedNetWeight(sumPNW);
			rc.setPlacedVolume(sumPV);
			if(rc.getReceivedQuantity()<=rc.getPlacedQuantity()){
				rc.setStatus(5);
			}
			else if(rc.getReceivedQuantity()>rc.getPlacedQuantity()&&rc.getPlacedQuantity()>0){
				rc.setStatus(4);
			}
			else if(rc.getReceivedQuantity()>rc.getPlacedQuantity()&&rc.getPlacedQuantity()==0){
				rc.setStatus(3);
			}
			rc.setRowAction(RowAction.M);
			rc=rdao.saveByRowActionSolo(rc);
			retList.add(rc);
			idMap.put(rc.getStorageNoteCargoId(), rc.getStorageNoteCargoId());
		}
		
		Map<Integer,Integer> snIdMap=new HashMap<Integer,Integer>();
		for (Map.Entry<Long, Long> mapItem : idMap.entrySet())  {			
			String sStorageNoteCargoId = mapItem.getKey().toString();
			Long vStorageNoteCargoId = (Long) mapItem.getValue();
			WStorageNoteCargo snc=cdao.findById(vStorageNoteCargoId);
			List<WReceivedCargo> listWReceivedCargo=rdao.findByProperty("storageNoteCargoId", sStorageNoteCargoId);
			
			double sumPQ=0.00;
			double sumPP=0.00;
			double sumPGW=0.00;
			double sumPNW=0.00;
			double sumPV=0.00;
			for(WReceivedCargo wrc:listWReceivedCargo){				
					sumPQ+=NumberUtil.null2Zero(wrc.getPlacedQuantity());
					sumPP+=NumberUtil.null2Zero(wrc.getPlacedPackages());
					sumPGW+=NumberUtil.null2Zero(wrc.getPlacedGrossWeight());
					sumPNW+=NumberUtil.null2Zero(wrc.getPlacedNetWeight());
					sumPV+=NumberUtil.null2Zero(wrc.getPlacedVolume());				
			}
			
			snc.setPlacedQuantity(sumPQ);
			snc.setPlacedPackages(sumPP);
			snc.setPlacedGrossWeight(sumPGW);
			snc.setPlacedNetWeight(sumPNW);
			snc.setPlacedVolume(sumPV);
			
			double quantityTotal=NumberUtil.null2Zero(snc.getPlanedQuantity());
			double pQuantityTotal=NumberUtil.null2Zero(snc.getPlacedQuantity());
			double rQuantityTotal=NumberUtil.null2Zero(snc.getReceivedQuantity());
			double aQuantityTotal=NumberUtil.null2Zero(snc.getAdjustQuantity());
			
			if(quantityTotal<=pQuantityTotal){
				snc.setStatus(5);
			}
			else if(quantityTotal<=rQuantityTotal+aQuantityTotal&&pQuantityTotal>0){
				snc.setStatus(4);
			}
			else if(quantityTotal<=rQuantityTotal+aQuantityTotal&&pQuantityTotal==0){
				snc.setStatus(3);
			}
			else if(quantityTotal>rQuantityTotal+aQuantityTotal){
				snc.setStatus(2);
			}
			else if(rQuantityTotal+aQuantityTotal==0){
				snc.setStatus(1);
			}
			
			snc.setRowAction(RowAction.M);
			snc=cdao.saveByRowActionSolo(snc);
			snIdMap.put(snc.getStorageNoteId(), snc.getStorageNoteId());
			retList.add(snc);
			
		}
		for (Map.Entry<Integer, Integer> mapItem : snIdMap.entrySet())  {	
			Long id =mapItem.getValue().longValue();
			WStorageNote sn=ndao.findById(id);
			List<WStorageNoteCargo> sncList=cdao.findByProperty("storageNoteId", ""+id);
			double rQuantityTotal=0.00;//收货数量
			double quantityTotal=0.00;//计划数量
			double pQuantityTotal=0.00;//上架数量
			double dQuantityTotal=0.00;//调整数量
			
			for(WStorageNoteCargo snc:sncList){				
				
				quantityTotal+=NumberUtil.null2Zero(snc.getPlanedQuantity());
				rQuantityTotal+=NumberUtil.null2Zero(snc.getReceivedQuantity());
				pQuantityTotal+=NumberUtil.null2Zero(snc.getPlacedQuantity());
				dQuantityTotal+=NumberUtil.null2Zero(snc.getDistQuantity());
			}
			if(quantityTotal<=pQuantityTotal){
				sn.setStatus(5);
				sn.setActureTime(placedDate);
			}
			else if(quantityTotal<=rQuantityTotal+dQuantityTotal&&pQuantityTotal>0){
				sn.setStatus(4);
			}
			else if(quantityTotal<=rQuantityTotal+dQuantityTotal&&pQuantityTotal==0){
				sn.setStatus(3);
			}
			else if(quantityTotal>rQuantityTotal+dQuantityTotal){
				sn.setStatus(2);
			}
			else if(rQuantityTotal+dQuantityTotal==0){
				sn.setStatus(1);
			}
				
			
			sn.setRowAction(RowAction.M);
			sn=ndao.saveByRowActionSolo(sn);
			retList.add(sn);
			
		}
		
		return retList;
	}
	
	/**Action : WPLACED_CARGO_RAP
	 * 删除所有的上架记录
	 * 1、根据所传的storage_note_id，检索所有的上架纪录
	 * 2、循环上架纪录，判断是不是有纪录已经出库了，如果有出库，就不允许删除
	 * 3、如果没有出库则删除，将所有纪录更新为R
	 * 4、删除成功以后，清空所有收货表的上架数量
	 * 5、清空所有入库货物的上架数量
	 * 6、更改入库单状态为收货完成，3
	 * @return
	 */
	@Transactional
	public List removedAllPlacedCargo(){
		List retList=new ArrayList();
		
		Long id = Long.valueOf(requestContext.get("id"));
		boolean isPicked=false;
		//String nowLoginUser=String.valueOf(requestContext.get("nowLoginUser"));
		List<WPlacedCargo> pcList=dao.findByProperty("storageNoteId", ""+id);
		for(WPlacedCargo pc:pcList){
			if(pc.getPickedQuantity()>0){
				isPicked=true;
			}
		}
		if(!isPicked){
			for(WPlacedCargo pc:pcList){
				pc.setRowAction(RowAction.R);
			}
			dao.saveByRowAction(pcList);
			
			List<WReceivedCargo> wrcList=rdao.findByProperty("storageNoteId", ""+id);
			for(WReceivedCargo wrc:wrcList){
				wrc.setPlacedQuantity(0.00);
				wrc.setPlacedPackages(0.00);
				wrc.setPlacedGrossWeight(0.00);
				wrc.setPlacedNetWeight(0.00);
				wrc.setPlacedVolume(0.00);
				wrc.setPlacedMeasure(0.00);
				wrc.setPlacedPackQuantity(0.00);
				wrc.setPlacedDate(null);
				wrc.setStatus(3);
				wrc.setRowAction(RowAction.M);
				wrc=rdao.saveByRowActionSolo(wrc);
				retList.add(wrc);
			}
			//rdao.saveByRowAction(wrcList);
			
			List<WStorageNoteCargo> sncList=cdao.findByProperty("storageNoteId", ""+id);
			for(WStorageNoteCargo c:sncList){
				c.setPlacedQuantity(0.00);
				c.setPlacedPackages(0.00);
				c.setPlacedGrossWeight(0.00);
				c.setPlacedNetWeight(0.00);
				c.setPlacedVolume(0.00);
				c.setPlacedMeasure(0.00);
				c.setPlacedPackQuantity(0.00);
				c.setStatus(3);
				//c.setPlacedDate(null);
				
				c.setRowAction(RowAction.M);
				c=cdao.saveByRowActionSolo(c);
				retList.add(c);
			}
			
			WStorageNote sn=ndao.findById(id);
			if(sn!=null){
				sn.setStatus(3);
				sn.setRowAction(RowAction.M);
				sn=ndao.saveByRowActionSolo(sn);
				retList.add(sn);
			}
		}
		
		return retList;
	}
}
