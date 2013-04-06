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
public class WReceivedCargoService {
	@Autowired
	private WReceivedCargoDao dao;
	@Autowired
	private WStorageNoteCargoDao cdao;
	@Autowired
	private WStorageNoteDao ndao;
	@Autowired
	private WPlacedCargoDao pcdao;
	@Autowired
	private RequestContext requestContext;
	
	/**Action : WRECEIVED_CARGO_S<p>
	 * 入库收货保存
	 * @param entityList
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List save(List entityList) {
		//保存收货列表
		//1、先保存新增的或者修改后的收货表w_received_cargo
		//2、再根据更新的情况，计算入库单对应的收货总数，并更新入库单货物明细表w_storage_note_cargo
		List retList=new ArrayList();
		
		//哈希表，用于保存strogenotecargoID
		Map<Long, Long> idMap = new HashMap<Long, Long>();
		Map<String,Long> cargoIdMap=new HashMap<String,Long>();
		

		Calendar cal=Calendar.getInstance(); 
		Date receivedDate=cal.getTime();
		
		for(Object obj:entityList){
			if(obj instanceof WReceivedCargo){
				WReceivedCargo entity=(WReceivedCargo)obj;
				entity.setReceivedDate(receivedDate);
				RowAction ra=entity.getRowAction();
				entity=dao.saveByRowActionSolo(entity);
				Long storageNoteCargoId=entity.getStorageNoteCargoId();
				//Long storageNoteId=entity.getStorageNoteId();
				idMap.put(storageNoteCargoId, storageNoteCargoId);
				if(ra!=RowAction.R){
					retList.add(entity);
				}
			}
		}
		
		
		for(Map.Entry<Long, Long> entry:idMap.entrySet()){
			String sStorageNoteCargoId = entry.getKey().toString();
			Long vStorageNoteCargoId = (Long) entry.getValue();
			
			//dao.findByProperty(key, value)
			List<WReceivedCargo> listWReceivedCargo=dao.findByProperty("storageNoteCargoId", sStorageNoteCargoId);
			
			Double sumQuantity=0.00;
			Double sumPackages=0.00;
			Double sumGrossWeight=0.00;
			Double sumNetWeight=0.00;
			Double sumVolume=0.00;
			Double sumMeasure=0.00;
			Double sumPackQuantity=0.00;
			for(WReceivedCargo wRCargo:listWReceivedCargo){
				
				if(wRCargo.getRemoved()==0){
					Double quantity=wRCargo.getReceivedQuantity();
					if(quantity!=null&&quantity>=0.00){
						sumQuantity+=quantity;
					}
					Double packages=wRCargo.getReceivedPackages();
					if(packages!=null&&packages>=0.00){
						sumPackages+=packages;
					}
					Double grossweight=wRCargo.getReceivedGrossWeight();
					if(grossweight!=null&&grossweight>=0.00){
						sumGrossWeight+=grossweight;
					}
					Double netweight=wRCargo.getReceivedNetWeight();
					if(netweight!=null&&netweight>=0.00){
						sumNetWeight+=netweight;
					}
					Double volume=wRCargo.getReceivedVolume();
					if(volume!=null&&volume>=0.00){
						sumVolume+=volume;
					}
					
					Double measure=wRCargo.getReceivedMeasure();
					if(measure!=null&&measure>=0.00){
						sumMeasure+=measure;
					}
					
					Double packQuantity=wRCargo.getUnitNum();
					if(packQuantity!=null&&packQuantity>=0.00){
						sumPackQuantity+=packQuantity;
					}
				}
			}
			
			WStorageNoteCargo sCargo=cdao.findById(vStorageNoteCargoId);
			sCargo.setReceivedGrossWeight(sumGrossWeight);
			sCargo.setReceivedMeasure(sumMeasure);
			sCargo.setReceivedNetWeight(sumNetWeight);
			sCargo.setReceivedPackages(sumPackages);
			sCargo.setReceivedQuantity(sumQuantity);
			sCargo.setReceivedVolume(sumVolume);
			sCargo.setReceivedPackQuantity(sumPackQuantity);
			if(sCargo.getPlanedQuantity()<sumQuantity){
				throw new BusinessException(FosExceptionEnum.WMS_IN_QUANTITY_GREAT_THAN_RECEIVABLE);
			}
			sCargo.setStatus(2);
			sCargo.setRowAction(RowAction.M);
			sCargo=cdao.saveByRowActionSolo(sCargo);
			retList.add(sCargo);
			cargoIdMap.put(""+sCargo.getStorageNoteId(), sCargo.getStorageNoteId().longValue());
		}
		
		for(Map.Entry<String, Long> mapItem:cargoIdMap.entrySet()){
			Long storageNoteId=mapItem.getValue();
			WStorageNote wsn=ndao.findById(storageNoteId);
			if(wsn!=null){
				wsn.setStatus(2);
				wsn.setRowAction(RowAction.M);
				wsn.setActureTime(receivedDate);
				wsn=ndao.saveByRowActionSolo(wsn);
				retList.add(wsn);
			}
		}
		
		return retList;
	}
	
	/**Action : WRECEIVED_CARGO_SRTP
	 * 保存上架数据的同时，将收货货物行，改状态为收货完成/上架中
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List saveReceivedToPlaced(List entityList) {
		List retList=new ArrayList();
		Map<String,Long> idMap=new HashMap<String,Long>();
		for(Object obj:entityList){
			if(obj instanceof WPlacedCargo){
				WPlacedCargo entity=(WPlacedCargo)obj;				
				RowAction ra=entity.getRowAction();
				entity=pcdao.saveByRowActionSolo(entity);
				
				idMap.put("receivedCargoId"+entity.getReceivedCargoId(), entity.getReceivedCargoId());
				if(ra!=RowAction.R){
					retList.add(entity);
				}
			}
		}
		
		for (Map.Entry<String, Long> mapItem : idMap.entrySet()) {
			Long receivedCargoId=mapItem.getValue();
			WReceivedCargo rc=dao.findById(receivedCargoId);
			if(rc!=null){
				List<WPlacedCargo> pcList=pcdao.findByProperty("receivedCargoId", ""+receivedCargoId);
				Double sumPlacedQuantity=0.00;
				Double sumPlacedPackages=0.00;
				Double sumPlacedGrossWeight=0.00;
				Double sumPlacedNetWeight=0.00;
				Double sumPlacedVolume=0.00;
				Double sumPlacedMeasure=0.00;
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
				rc.setStatus(4);
				rc=dao.saveByRowActionSolo(rc);
				retList.add(rc);
			}
		}
		return retList;
	}
	
	/**Action : WRECEIVED_CARGO_RV_P<p>
	 * 从收货列表取消上架
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List removedPlacedByReceived(List<WReceivedCargo> entityList){
		List resList=new ArrayList();
		Map<String,Long> idMap=new HashMap<String,Long>();
		for(WReceivedCargo wrc:entityList){
			List<WPlacedCargo> wpcList=pcdao.findByProperty("receivedCargoId", ""+wrc.getId());
			
					
			for(WPlacedCargo pc:wpcList){
				
				
				pc.setRowAction(RowAction.R);
				pcdao.saveByRowActionSolo(pc);
			}
			wrc.setPlacedGrossWeight(0.00);
			wrc.setPlacedQuantity(0.00);
			wrc.setPlacedPackages(0.00);
			wrc.setPlacedNetWeight(0.00);
			wrc.setPlacedVolume(0.00);
			wrc.setPlacedMeasure(0.00);
			wrc.setStatus(3);
			wrc.setRowAction(RowAction.M);
			wrc=dao.saveByRowActionSolo(wrc);
			resList.add(wrc);
			idMap.put(""+wrc.getStorageNoteCargoId(), wrc.getStorageNoteCargoId());
		}
		
		for (Map.Entry<String, Long> mapItem : idMap.entrySet()) {
			Long storageNoteCargoId=mapItem.getValue();
			Integer status=3;
			double placedQuantity=0.00;
			double placedPackages=0.00;
			double placedGrossWeight=0.00;
			double placedNetWeight=0.00;
			double placedVolume=0.00;
			double placedMeasure=0.00;
			List<WReceivedCargo> wrcList=dao.findByProperty("storageNoteCargoId", ""+storageNoteCargoId);
			for(WReceivedCargo wrc:wrcList){
				placedQuantity+=NumberUtil.null2Zero(wrc.getPlacedQuantity());
				placedPackages+=NumberUtil.null2Zero(wrc.getPlacedPackages());
				placedGrossWeight+=NumberUtil.null2Zero(wrc.getPlacedGrossWeight());
				placedNetWeight+=NumberUtil.null2Zero(wrc.getPlacedNetWeight());
				placedVolume+=NumberUtil.null2Zero(wrc.getPlacedVolume());
				placedMeasure+=NumberUtil.null2Zero(wrc.getPlanedMeasure());
				if(wrc.getStatus()==4){//如果有一个状态还是上架中，则标识为上架中，否则标记为收货完成
					status=4;
				}
			}
			WStorageNoteCargo wsnc=cdao.findById(storageNoteCargoId);
			wsnc.setPlacedQuantity(placedQuantity);
			wsnc.setPlacedPackages(placedPackages);
			wsnc.setPlacedGrossWeight(placedGrossWeight);
			wsnc.setPlacedNetWeight(placedNetWeight);
			wsnc.setPlacedVolume(placedVolume);
			wsnc.setPlacedMeasure(placedMeasure);
			wsnc.setRowAction(RowAction.M);
			wsnc.setStatus(status);
			wsnc=cdao.saveByRowActionSolo(wsnc);
			resList.add(wsnc);
		}
		
		return resList;
	}

	/**Action ： WRECEIVED_CARGO_V
	 * 入库收货保存
	 * @param entityList
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes", "static-access" })
	@Transactional
	public List saveWeceivedDleteStorageNote(List entityList) {
		List retList=new ArrayList();
		Calendar cal=Calendar.getInstance();
		Date receivedDate=cal.getTime();
		for(Object obj:entityList){
				WReceivedCargo entity=(WReceivedCargo)obj;
				entity.setReceivedDate(receivedDate);
				RowAction ra=entity.getRowAction();
				entity=dao.saveByRowActionSolo(entity);
				if(ra!=RowAction.R){
					retList.add(entity);
				}}
		return retList;
	}
	
	
	/**Action : WRECEIVED_CARGO_Q<p>
	 * 入库收货查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WReceivedCargo> query() {
		return dao.findByProperties();
	}
	/**Action : WRECEIVED_CARGO_X<p>
	 * 入库收货复杂查询
	 * @param conditions
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WReceivedCargo> complexQuery(List<HtQuery> conditions) {
		//return dao.query(conditions);
		//return dao.complexQuery(conditions);
		List<WReceivedCargo> rcList=new ArrayList();
		List ObjectList=dao.complexQuery(conditions);	
		for(Object ob:ObjectList){
			Object[] obItem=(Object[]) ob;
			WReceivedCargo rc=(WReceivedCargo)obItem[0];
			if(obItem[1]!=null){
				//NumberUtil.
				//rc.setPlanedQuantity(((BigDecimal)obItem[1]).doubleValue());
				rc.setPlanedQuantity((Double)obItem[1]);
			}
			if(obItem[2]!=null){
				//NumberUtil.
				rc.setPlanedPackages((Double)obItem[2]);
			}
			if(obItem[3]!=null){
				//NumberUtil.
				rc.setPlanedGrossWeight((Double)obItem[3]);
			}
			if(obItem[4]!=null){
				//NumberUtil.
				rc.setPlanedNetWeight((Double)obItem[4]);
			}
			if(obItem[5]!=null){
				//NumberUtil.
				rc.setPlanedVolume((Double)obItem[5]);
			}
			if(obItem[6]!=null){
				//NumberUtil.
				rc.setPlanedMeasure((Double)obItem[6]);
			}
			if(obItem[7]!=null){
				//NumberUtil.
				rc.setPlanedPackQuantity((Double)obItem[7]);
			}
			
			rcList.add(rc);
			
		}
		
		return rcList;
		
	}
	
	/**Action : WRECEIVED_CARGO_X<p>
	 * 入库收货复杂查询
	 * @param conditions
	 * @return
	 */
	//查询货物列表信息
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional(readOnly = true)
	public List complexQueryGroods(List<HtQuery> conditions) {
		List relist=null;
		List<WStorageNoteCargo> list= dao.getCargoList(conditions);
		if(requestContext.containsKey("S")){
			relist=new ArrayList<WStorageNoteCargo>();
			for(WStorageNoteCargo cargo :list){
				WStorageNoteCargo entity= new WStorageNoteCargo();
				entity.setOrderNo(ndao.findById(cargo.getStorageNoteId().longValue()).getOrderNo());//订单号
				entity.setCargoOwnerName(ndao.findById(cargo.getStorageNoteId().longValue()).getCargoOwnerName());//货主名称
				entity.setId(cargo.getId());
				entity.setStorageNoteId(cargo.getStorageNoteId());
				entity.setSkuNo(cargo.getSkuNo());//sku
				entity.setStorageNoteNo(cargo.getStorageNoteNo());//入库单号
				entity.setCargoName(cargo.getCargoName());//商品名称
				entity.setReceivedQuantity(cargo.getReceivedQuantity().doubleValue());//收货数量
				entity.setPlacedQuantity(cargo.getPlacedQuantity().doubleValue());//未收货数量
				entity.setUnitName(cargo.getUnitName());//数量单位
				entity.setGrossWeight(cargo.getGrossWeight());//毛重
				entity.setNetWeight(cargo.getNetWeight());//净重
				entity.setwUnitName(cargo.getwUnitName());//重量单位
				entity.setPackages(cargo.getPackages());//件数
				entity.setpUnit(cargo.getpUnit());//件数单位
				entity.setVolume(cargo.getVolume());//体积
				entity.setMeasure(cargo.getMeasure());//面积
				entity.setvUnitName(cargo.getvUnitName());//体积单位
				entity.setBlockName(cargo.getBlockName());//库位
				entity.setCasing1(cargo.getCasing1());//外包装1
				entity.setCasing2(cargo.getCasing2());//外包装2
				entity.setCasing3(cargo.getCasing3());//外包装3
				entity.setCasing4(cargo.getCasing4());//外包装4
				entity.setCasing5(cargo.getCasing5());//外包装5
				entity.setC1UnitName(cargo.getC1UnitName());//外包装1单位
				entity.setC2UnitName(cargo.getC2UnitName());//外包装2单位
				entity.setC3UnitName(cargo.getC3UnitName());//外包装3单位
				entity.setC4UnitName(cargo.getC4UnitName());//外包装4单位
				entity.setC5UnitName(cargo.getC5UnitName());//外包装5单位
				entity.setLeaveQuantity(cargo.getLeaveQuantity());//剩余数量
				entity.setLeavePackages(cargo.getLeavePackages());//剩余件数
				entity.setLeaveVolume(cargo.getLeaveVolume());//剩余体积
				entity.setLeaveMeasure(cargo.getLeaveMeasure());//剩余面积
				entity.setLeaveGrossWeight(cargo.getLeaveGrossWeight());//剩余毛重
				entity.setLeaveNetWeight(cargo.getLeaveNetWeight());//剩余净重
				relist.add(entity);
			}
		}else{
			relist=list;
		}
		return relist;
	}
	
	
	
	/**Action : WRECEIVED_CARGO_C<p>
	 * 入库未上架查询
	 * @param conditions
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WStorageNoteCargo> getCargoList(List<HtQuery> conditions) {
		return dao.getCargoList(conditions);
	}
	/**Action : WRECEIVED_CARGO_CUS
	 * 更新货物状态
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List updateCargoStatus(List entityList){
		Integer status=Integer.valueOf(requestContext.get("status"));
		List retList=new ArrayList();
		Map<String,Long> idMap=new HashMap<String,Long>();
		
		for(Object obj:entityList){
			if(obj instanceof WPlacedCargo){
				WPlacedCargo pc=(WPlacedCargo)obj;
				setCargoPlaced(pc,status);
				retList.add(pc);
				idMap.put("receivedCargoId"+pc.getReceivedCargoId(),pc.getReceivedCargoId());
			}
		}
		//循环遍历MAP将相应的收货单，更新状态
		for (Map.Entry<String, Long> mapItem : idMap.entrySet()) {
			Long receivedCargoId=mapItem.getValue();
			WReceivedCargo rc=dao.findById(receivedCargoId);
			//如果上架是上架完成，则判断收货是不是收货完成或者上架中状态了，如果是则不做处理，
			//如果不是，则将状态改为上架中。
			if(status==5){
				if(rc.getStatus()<3){
					rc.setStatus(3);
					rc.setRowAction(RowAction.M);
					rc=dao.saveByRowActionSolo(rc);
					retList.add(rc);
				}
			}
		}
		
		
		return retList;
	};
	/**
	 * 设置上架货物的状态
	 * pc:表示WPlacedCargo的ENTITY
	 * status:表示要更新的状态的值
	 */
	public void setCargoPlaced(WPlacedCargo pc,Integer status){
		if(status==5){
			
		}
		else if(status==0){
			if(NumberUtil.null2Zero(pc.getPickedQuantity())>0){
				throw new BusinessException(FosExceptionEnum.WMS_EXIST_PICKED_CARGO);
			}
		}
		
		pc.setStatus(status);
		pc.setRowAction(RowAction.M);
		pc=pcdao.saveByRowActionSolo(pc);
		pc.setVersion(pc.getVersion()+1);
	}
	/**Action : WREICEIVED_UPDATE_STATUS<p>
	 * 收货上架完成
	 * @return
	 */
	@Transactional
	public List updateStatus(){
		List retList=new ArrayList();
		Long lngId=Long.valueOf(requestContext.get("storageNoteId"));
		Integer status=Integer.valueOf(requestContext.get("status"));
		
		WStorageNote wsn= ndao.findById(lngId);
		if(wsn!=null){
			wsn.setStatus(status);
			wsn.setRowAction(RowAction.M);
			
			wsn=ndao.saveByRowActionSolo(wsn);
			retList.add(wsn);
		}
		List<WStorageNoteCargo> lstWsnc=new ArrayList<WStorageNoteCargo>();
		lstWsnc= cdao.findByProperty("storageNoteId", ""+lngId);
		
		for (WStorageNoteCargo wsnc : lstWsnc) {
			wsnc.setStatus(status);
			wsnc.setRowAction(RowAction.M);
			wsnc=cdao.saveByRowActionSolo(wsnc);
			retList.add(wsnc);
		}
		
		List<WReceivedCargo> wrcList=dao.findByProperty("storageNoteId", ""+lngId);
		for(WReceivedCargo wrc:wrcList){
			wrc.setStatus(status);
			wrc.setRowAction(RowAction.M);
			wrc=dao.saveByRowActionSolo(wrc);
			retList.add(wrc);
		}
		if(status==5){
			List<WPlacedCargo> wpcList=pcdao.findByProperty("storageNoteId", ""+lngId);
			for(WPlacedCargo wpc:wpcList){
				wpc.setStatus(status);
				wpc.setRowAction(RowAction.M);
				wpc=pcdao.saveByRowActionSolo(wpc);
				retList.add(wpc);
			}
		}
		
		return retList;
	};
	
	/**Action :  WRECEIVED_COMPLETE <p>
	 * 收货完成处理
	 */
	@Transactional
	public void ReceivedComplete()
	{
		//获取传进来的storageNoteId参数
		//找到相对应的StorageNote记录，更新状态为收货完成
		//找到相对应的StorageNoteCargo记录集，分别更新状态为收货完成
		Long lngId=Long.valueOf(requestContext.get("storageNoteId"));
		
		WStorageNote wsn= ndao.findById(lngId);
		
		wsn.setStatus(3);
		wsn.setRowAction(RowAction.M);
		
		ndao.saveByRowActionSolo(wsn);
		
		
		
		List<WStorageNoteCargo> lstWsnc=new ArrayList<WStorageNoteCargo>();
		lstWsnc= cdao.findByProperty("storageNoteId", ""+lngId);
		
		for (WStorageNoteCargo wsnc : lstWsnc) {
			wsnc.setStatus(3);
			
			wsnc.setRowAction(RowAction.M);
			
			cdao.saveByRowActionSolo(wsnc);
		}
		
	}
	/**Action : WRECEIVED_CANCELCOMPLETE<p>
	 * 取消收货完成处理
	 * @return
	 */
		@Transactional
		public List cancelReceivedComplete()
		{
			List retList=new ArrayList();
			Long lngId=Long.valueOf(requestContext.get("storageNoteId"));
			WStorageNote wsn=ndao.findById(lngId);
			
			wsn.setStatus(2);
			wsn.setRowAction(RowAction.M);
			wsn=ndao.saveByRowActionSolo(wsn);
			retList.add(wsn);
			
			List<WStorageNoteCargo> lstWsnc=new ArrayList<WStorageNoteCargo>();
			lstWsnc= cdao.findByProperty("storageNoteId", ""+lngId);
			
			for (WStorageNoteCargo wsnc : lstWsnc) {
				wsnc.setStatus(2);
				
				wsnc.setRowAction(RowAction.M);
				
				wsnc=cdao.saveByRowActionSolo(wsnc);
				retList.add(wsnc);
			}
			
			List<WReceivedCargo> listWRC=dao.findByProperty("storageNoteId", ""+lngId);
			for(WReceivedCargo wrc:listWRC){
				wrc.setStatus(0);
				wrc.setRowAction(RowAction.M);
				wrc=dao.saveByRowActionSolo(wrc);
				retList.add(wrc);
			}
			return retList;
		}
}
