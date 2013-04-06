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
import com.hitisoft.fos.wms.dao.WCargoDao;
import com.hitisoft.fos.wms.dao.WPickedCargoDao;
import com.hitisoft.fos.wms.dao.WPlacedCargoDao;
import com.hitisoft.fos.wms.dao.WStorageNoteCargoDao;
import com.hitisoft.fos.wms.dao.WStorageNoteDao;
import com.hitisoft.fos.wms.entity.WCargo;
import com.hitisoft.fos.wms.entity.WPickedCargo;
import com.hitisoft.fos.wms.entity.WPlacedCargo;
import com.hitisoft.fos.wms.entity.WStorageNote;
import com.hitisoft.fos.wms.entity.WStorageNoteCargo;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.orm.util.SqlOp;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.NumberUtil;


@Service
public class WPickedCargoService {
	@Autowired
	private WPickedCargoDao dao;		//拣货明细
	@Autowired
	private WPlacedCargoDao pdao;		//上架货物明细
	@Autowired
	private WStorageNoteCargoDao cdao;		//出库单货物明细
	@Autowired
	private WStorageNoteDao ndao;			//出库单
	
	@SuppressWarnings("unused")
	@Autowired
	private WCargoDao	cargodao;		//商品信息
	
	@Autowired
	private SessionContext sessionContext;
	
	@SuppressWarnings("unused")
	@Autowired
	private RequestContext requestContext;
	
	/**Action : WPICKED_CARGO_S<p>
	 * 出库拣货商品保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WPickedCargo> save(List<WPickedCargo> entityList) {
		return dao.saveByRowAction(entityList);
	}	
	
	/*
	 * Action:WPICKED_CARGO_DCS
	 * 保存预分配的数量
	 * @Param entityList
	 * @return
	 */
	@Transactional
	public List distCargoSave(List<WPickedCargo> entityList) {
		List resList=new ArrayList();
		Map<Long,Long> idMap=new HashMap<Long,Long>();
		Map<Long,Long> pIdMap=new HashMap<Long,Long>();
		for(WPickedCargo entity:entityList){
			RowAction ra=entity.getRowAction();			
			if(ra!=RowAction.R){
				entity=dao.saveByRowActionSolo(entity);
				resList.add(entity);
			}
			else{
				dao.saveByRowActionSolo(entity);
			}
			idMap.put(entity.getOutStorageNoteCargoId(), entity.getOutStorageNoteCargoId());
			pIdMap.put(entity.getPlacedCargoId(), entity.getPlacedCargoId());
		}
		
		//存放出库单主表的数量
		Map<Long,Long> sIdMap=new HashMap<Long,Long>();
		this.totalQuantity4SNC(idMap, sIdMap, resList);		
		this.totalQuantity4PlacedCargo(pIdMap, null, resList);
		//更新主表状态
		updateStatusByMap(sIdMap,resList);
		
		return resList;
	}
	
	/*
	 * 计算仓单的货物列表的拣货分配数量合计数
	 * @Param:idMap:要计算合计的WStorageNoteCargoId序列
	 * 
	 * @Param:resMap：存放主表的ID
	 * @Param:resList：存放在返回前台的数据列表
	 */
	public void totalQuantity4SNC(Map<Long,Long> idMap,Map<Long,Long> resMap,List resList){
		//存放出库单主表的数量
				
				for (Map.Entry<Long, Long> entry : idMap.entrySet()) {
			        Long outStorageNoteCargoId = entry.getValue();
			        WStorageNoteCargo snc=cdao.findById(outStorageNoteCargoId);
			        List<WPickedCargo> pkcList=dao.findByProperty("outStorageNoteCargoId", ""+outStorageNoteCargoId);
			        Double sumDistQ=0.00;
		        	Double sumDistP=0.00;
		        	Double sumDistGW=0.00;
		        	Double sumDistNW=0.00;
		        	Double sumDistV=0.0000;
		        	Double sumDistM=0.00;
		        	
		        	Double sumPickedQ=0.00;
		        	Double sumPickedP=0.00;
		        	Double sumPickedGW=0.00;
		        	Double sumPickedNW=0.00;
		        	Double sumPickedV=0.0000;
		        	Double sumPickedM=0.00;
		        	
			        for(WPickedCargo pkc:pkcList){
			        	sumDistQ+=NumberUtil.null2Zero(pkc.getDistQuantity());
			        	sumDistP+=NumberUtil.null2Zero(pkc.getDistPackages());
			        	sumDistGW+=NumberUtil.null2Zero(pkc.getDistGrossWeight());
			        	sumDistNW+=NumberUtil.null2Zero(pkc.getDistNetWeight());
			        	sumDistV+=NumberUtil.null2Zero(pkc.getDistVolume());
			        	sumDistM+=NumberUtil.null2Zero(pkc.getDistMeasure());
			        	
			        	sumPickedQ+=NumberUtil.null2Zero(pkc.getPickedQuantity());
			        	sumPickedP+=NumberUtil.null2Zero(pkc.getPickedPackages());
			        	sumPickedGW+=NumberUtil.null2Zero(pkc.getPickedGrossWeight());
			        	sumPickedNW+=NumberUtil.null2Zero(pkc.getPickedNetWeight());
			        	sumPickedV+=NumberUtil.null2Zero(pkc.getPickedVolume());
			        	sumPickedM+=NumberUtil.null2Zero(pkc.getPickedMeasurement());
			        }
			        
			        //Double deffQuantity=NumberUtil.null2Zero(snc.getPlanedQuantity())-NumberUtil.null2Zero(snc.getPickedQuantity());
			        if(NumberUtil.null2Zero(snc.getPlanedQuantity())-NumberUtil.null2Zero(snc.getAdjustQuantity())<sumDistQ+sumPickedQ){
			        	//TODO:发出异常
			        	throw new BusinessException(FosExceptionEnum.WMS_PICKED_QUANTITY_OVER);
			        }
			        else{
			        	snc.setDistQuantity(sumDistQ);
			        	snc.setDistPackages(sumDistP);
			        	snc.setDistGrossWeight(sumDistGW);
			        	snc.setDistNetWeight(sumDistNW);
			        	snc.setDistVolume(sumDistV);
			        	snc.setDistMeasure(sumDistM);
			        	
			        	snc.setPickedQuantity(sumPickedQ);
			        	snc.setPickedPackages(sumPickedP);
			        	snc.setPickedGrossWeight(sumPickedGW);
			        	snc.setPickedNetWeight(sumPickedNW);
			        	snc.setPickedVolume(sumPickedV);
			        	snc.setPickedMeaSure(sumPickedM);
			        	
			        	if(sumDistQ>0){
			        		snc.setStatus(2);
			        	}
			        	else if(sumDistQ==0
			        			&&sumPickedQ==NumberUtil.null2Zero(snc.getPlanedQuantity())-NumberUtil.null2Zero(snc.getAdjustQuantity())){
			        		snc.setStatus(5);
			        	}
			        	else if(sumDistQ==0&&sumPickedQ>0){
			        		snc.setStatus(4);
			        	}
			        	
			        	snc.setRowAction(RowAction.M);
			        	snc=cdao.saveByRowActionSolo(snc);
			        	if(resMap!=null){
			        		resMap.put(snc.getStorageNoteId().longValue(), snc.getStorageNoteId().longValue());
			        	}
			        	resList.add(snc);
			        }
				}
	};
	
	/*
	 * 计算仓单的货物列表的拣货分配数量合计数
	 * 
	 */
	public void totalQuantity4PlacedCargo(Map<Long,Long> pIdMap,Map<Long,Long> resMap,List resList){
		if(pIdMap==null){
			return ;
		}
		
		for (Map.Entry<Long, Long> entry : pIdMap.entrySet()) {
	        Long placedCargoId = entry.getValue();
	        WPlacedCargo pc=pdao.findById(placedCargoId);
	        List<WPickedCargo> pkcList=dao.findByProperty("placedCargoId", ""+placedCargoId);
	        
	        Double sumDistQ=0.00;
        	Double sumDistP=0.00;
        	Double sumDistGW=0.00;
        	Double sumDistNW=0.00;
        	Double sumDistV=0.0000;
        	Double sumDistM=0.00;
        	
        	Double sumPickedQ=0.00;
        	Double sumPickedP=0.00;
        	Double sumPickedGW=0.00;
        	Double sumPickedNW=0.00;
        	Double sumPickedV=0.0000;
        	Double sumPickedM=0.00;
        	
	        for(WPickedCargo pkc:pkcList){
	        	sumDistQ+=NumberUtil.null2Zero(pkc.getDistQuantity());
	        	sumDistP+=NumberUtil.null2Zero(pkc.getDistPackages());
	        	sumDistGW+=NumberUtil.null2Zero(pkc.getDistGrossWeight());
	        	sumDistNW+=NumberUtil.null2Zero(pkc.getDistNetWeight());
	        	sumDistV+=NumberUtil.null2Zero(pkc.getDistVolume());
	        	sumDistM+=NumberUtil.null2Zero(pkc.getDistMeasure());
	        	
	        	sumPickedQ+=NumberUtil.null2Zero(pkc.getPickedQuantity());
	        	sumPickedP+=NumberUtil.null2Zero(pkc.getPickedPackages());
	        	sumPickedGW+=NumberUtil.null2Zero(pkc.getPickedGrossWeight());
	        	sumPickedNW+=NumberUtil.null2Zero(pkc.getPickedNetWeight());
	        	sumPickedV+=NumberUtil.null2Zero(pkc.getPickedVolume());
	        	sumPickedM+=NumberUtil.null2Zero(pkc.getPickedMeasurement());
	        	
	        }
	        
	        //Double deffQuantity=NumberUtil.null2Zero(pc.getQuantity())-NumberUtil.null2Zero(pc.getPickedQuantity());
	        if(NumberUtil.null2Zero(pc.getQuantity())<sumDistQ+sumPickedQ){
	        	//TODO:发出异常
	        	throw new BusinessException(FosExceptionEnum.WMS_PICKED_QUANTITY_OVER);
	        }
	        else{
	        	pc.setDistQuantity(sumDistQ);
	        	pc.setDistPackages(sumDistP);
	        	pc.setDistGrossWeight(sumDistGW);
	        	pc.setDistNetWeight(sumDistNW);
	        	pc.setDistVolume(sumDistV);
	        	pc.setDistMeasure(sumDistM);
	        	
	        	pc.setPickedQuantity(sumPickedQ);
	        	pc.setPickedPackages(sumPickedP);
	        	pc.setPickedGrossWeight(sumPickedGW);
	        	pc.setPickedNetWeight(sumPickedNW);
	        	pc.setPickedVolume(sumPickedV);
	        	pc.setPickedMeasurement(sumPickedM);
	        	
	        	pc.setRowAction(RowAction.M);
	        	pc=pdao.saveByRowActionSolo(pc);
	        	resList.add(pc);
	        }
	        
	        //pdao.saveByRowAction(entityList)
	    }
		
	};
	
	public void updateStatusByMap(Map<Long,Long> idMap,List resList){
		if(idMap.size()>0){
			for (Map.Entry<Long, Long> entry : idMap.entrySet()) {
		        Long Id = entry.getValue();
		        WStorageNote sn=ndao.findById(Id);
		        List<WStorageNoteCargo> sncList=cdao.findByProperty("storageNoteId", ""+Id);
		        Double sumPQ=0.00;//计划数量
		        Double sumAQ=0.00;//调整数量
		        Double sumDQ=0.00;//预分配数量
		        Double sumPKQ=0.00;//已拣货数量
		        for(WStorageNoteCargo snc:sncList){
		        	//判断当前记录的属于什么状态
		        	sumPQ+=NumberUtil.null2Zero(snc.getPlanedQuantity());
		        	sumAQ+=NumberUtil.null2Zero(snc.getAdjustQuantity());
		        	sumDQ+=NumberUtil.null2Zero(snc.getDistQuantity());		        	
		        	sumPKQ+=NumberUtil.null2Zero(snc.getPickedQuantity());
		        	        	
		        }
		        
		        if(sumPKQ==0){
		        	if(sumDQ>0){
		        		if(sumPQ-sumAQ==sumDQ){
			        		sn.setStatus(3);
			        	}
			        	else {
			        		sn.setStatus(2);
			        	}
		        	}
		        	else {
		        		sn.setStatus(1);
		        	}
		        }
		        else if(sumPKQ>0){
		        	if(sumPQ-sumAQ>sumPKQ)
		        		sn.setStatus(4);
		        	else if(sumPQ-sumAQ==sumPKQ){
		        		sn.setStatus(5);
		        		sn.setActureTime(new Date());
		        	}
		        	else{
		        		sn.setStatus(3);
		        	}
		        }		       
		        
		        sn.setRowAction(RowAction.M);
		        sn=ndao.saveByRowActionSolo(sn);
		        resList.add(sn);
		    }
		}
	};
	
	/*
	 * Action:WPICKED_CARGO_PC
	 */
	@Transactional
	public List pickChecked(List<WPickedCargo> entityList){
		List resList=new ArrayList();
		Map<Long,Long> idMap=new HashMap<Long,Long>();
		Map<Long,Long> pIdMap=new HashMap<Long,Long>();
		for(WPickedCargo entity:entityList){
			RowAction ra=entity.getRowAction();
			if(ra!=RowAction.R){
				entity=dao.saveByRowActionSolo(entity);
				resList.add(entity);
			}
			else{
				dao.saveByRowActionSolo(entity);
			}
			idMap.put(entity.getOutStorageNoteCargoId(), entity.getOutStorageNoteCargoId());
			pIdMap.put(entity.getPlacedCargoId(), entity.getPlacedCargoId());
		}
		
		//存放出库单主表的数量
		Map<Long,Long> sIdMap=new HashMap<Long,Long>();
		this.totalQuantity4SNC(idMap, sIdMap, resList);		
		this.totalQuantity4PlacedCargo(pIdMap, null, resList);
		//更新主表状态
		updateStatusByMap(sIdMap,resList);
		
		
		return resList;
	}
	
	/*
	 * Action: WPICKED_CARGO_PCB
	 */
	@Transactional
	public List pickedCheckedBat(){
		List resList=new ArrayList();
		String id=requestContext.get("id");
		if(!id.isEmpty()){
			
			List<WPickedCargo> pkcList=dao.findByProperty("outStorageNoteId", id);
			Map<Long,Long> idMap=new HashMap<Long,Long>();
			Map<Long,Long> pIdMap=new HashMap<Long,Long>();
			
			for(WPickedCargo pkc:pkcList){
			
				pkc.setPickedQuantity(NumberUtil.null2Zero(pkc.getPickedQuantity())+
						NumberUtil.null2Zero(pkc.getDistQuantity()));
				pkc.setPickedPackages(NumberUtil.null2Zero(pkc.getPickedPackages())+
						NumberUtil.null2Zero(pkc.getDistPackages()));
				pkc.setPickedGrossWeight(NumberUtil.null2Zero(pkc.getPickedGrossWeight())+
						NumberUtil.null2Zero(pkc.getDistGrossWeight()));
				pkc.setPickedNetWeight(NumberUtil.null2Zero(pkc.getPickedNetWeight())+
						NumberUtil.null2Zero(pkc.getDistNetWeight()));
				pkc.setPickedVolume(NumberUtil.null2Zero(pkc.getPickedVolume())+
						NumberUtil.null2Zero(pkc.getDistVolume()));
				pkc.setPickedMeasurement(NumberUtil.null2Zero(pkc.getPickedMeasurement())+
						NumberUtil.null2Zero(pkc.getDistMeasure()));
				
				pkc.setDistQuantity(0.00);
				pkc.setDistPackages(0.00);
				pkc.setDistGrossWeight(0.00);
				pkc.setDistNetWeight(0.00);
				pkc.setDistVolume(0.00);
				pkc.setDistMeasure(0.00);
				pkc.setPickedDate(new Date());
				
				
				pkc.setRowAction(RowAction.M);
				
				pkc=dao.update(pkc);
				resList.add(pkc);
				idMap.put(pkc.getOutStorageNoteCargoId(), pkc.getOutStorageNoteCargoId());
				pIdMap.put(pkc.getPlacedCargoId(), pkc.getPlacedCargoId());
			}
			
			//存放出库单主表的数量
			Map<Long,Long> sIdMap=new HashMap<Long,Long>();
			//计算货物明细表的总拣货值
			this.totalQuantity4SNC(idMap, sIdMap, resList);	
			//计算上架的总拣货数量
			this.totalQuantity4PlacedCargo(pIdMap, null, resList);
			//更新主表状态
			updateStatusByMap(sIdMap,resList);
		}
		else{
			throw new BusinessException(FosExceptionEnum.WMS_CARGO_DIST_NO_OVER);
		}
		
		
		return resList;
	};

	/**Action : WPICKED_CARGO_Q<p>
	 * 出库拣货商品查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WPickedCargo> query() {
		return dao.findByProperties();
	}
	
	/**Action : WPICKED_CARGO_R<p>
	 * 拣货明细删除
	 * @param entityList
	 * @return
	 */
	
	
	/**  Action : WPICKED_CARGO_SP<p>
	 * 拣货登记
	 * @param entityList
	 * @return
	 */
	
	/** Action : WSTORAGE_NOTE_CARGO_FF<p>
	 * 根据StorageNoteId查询
	 * @return
	 */
	public List<WPickedCargo> findByStorageNoteId(){
		List<WPickedCargo> wpcList= new ArrayList<WPickedCargo>();
		List<WPickedCargo> wpc=dao.findByStorageNoteId(Integer.valueOf(requestContext.get("id")));
		for (Object obj: wpc){
			if(obj instanceof WPickedCargo){
				wpcList.add((WPickedCargo) obj);
			}
		}
		return wpcList;
	}
	
	/**Action : WPICKED_CARGO_P<p>
	 * 拣货登记
	 * @param c
	 * @return
	 */

	
	/**Action : WPICKED_CARGO_SPC<p>
	 * 从拣货出库界面保存
	 * @param entityList
	 * @return
	 */
	
	/**Action : WPICKED_CARGO_STPC<p>
	 * 保存拣货
	 * @param entityList
	 * @return
	 */
	
	
	/**Action : WPICKED_CARGO_SPC<p>
	 * 从拣货出库界面保存
	 * @param entity
	 * @param wpcList
	 * @param pcList
	 * @return
	 */
	
	/**
	 * 自动拣货的时候，生成新的拣货纪录
	 * @param wpc
	 * @param pc
	 * @param wsn
	 * @param quantity
	 */
	public WPickedCargo createPickedCargo(WPlacedCargo plc,WStorageNoteCargo wsn,Map<String,Double> numMap){
		WPickedCargo pc=new WPickedCargo();
		
		pc.setRowAction(RowAction.N);
		pc.setVersion(0);
		pc.setRemoved((byte) 0);
		pc.setCompCode(sessionContext.getCompCode());
		pc.setUuid(ConstUtil.getUUID());
		pc.setStatus(0);
		
		pc.setOutStorageNoteId(wsn.getStorageNoteId().longValue());
		pc.setOutStorageNoteNo(wsn.getStorageNoteNo());
		pc.setOutStorageNoteCargoId(wsn.getId());
		
		pc.setInStorageNoteId(plc.getStorageNoteId());
		pc.setInStorageNoteNo(plc.getStorageNoteNo());
		pc.setInStorageNoteCargoId(plc.getStorageNoteCargoId());
		pc.setPlacedCargoId(plc.getId());
		
		pc.setReceivedDate(plc.getReceivedDate());
		pc.setWarehouseCode(plc.getWarehouseCode());
		pc.setWarehouseName(plc.getWarehouseName());
		pc.setWarehouseId(plc.getWarehouseId());
		pc.setAreaCode(plc.getAreaCode());
		pc.setAreaId(plc.getAreaId());
		pc.setAreaName(plc.getAreaName());
		pc.setBlockCode(plc.getBlockCode());
		pc.setBlockId(plc.getBlockId());
		pc.setBlockName(plc.getBlockName());
		
		pc.setSkuNo(plc.getSkuNo());
		pc.setCargoId(plc.getCargoId());
		pc.setCargoName(plc.getCargoName());
		
		pc.setProductDate(plc.getProductDate());
		pc.setProductNo(plc.getProductNo());
		
		pc.setUnitId(plc.getUnitId());
		pc.setUnitName(plc.getUnitName());
		pc.setpUnitId(plc.getpUnitId()!=null?plc.getpUnitId().longValue():0);
		pc.setpUnitName(plc.getpUnitName());
		pc.setwUnitId(plc.getwUnitId()!=null?plc.getwUnitId().longValue():0);
		pc.setwUnitName(plc.getWUnitName());
		pc.setvUnitId(plc.getvUnitId()!=null?plc.getvUnitId().longValue():0);
		pc.setvUnitName(plc.getVUnitName());
		pc.setmUnitId(plc.getmUnitId()!=null?plc.getmUnitId().longValue():0);
		pc.setmUnitName(plc.getmUnitName());
		
		pc.setQuantity(NumberUtil.null2Zero(numMap.get("quantity")));
		pc.setPackages(NumberUtil.null2Zero(numMap.get("packages")));
		pc.setGrossWeight(NumberUtil.null2Zero(numMap.get("grossWeight")));
		pc.setNetWeight(NumberUtil.null2Zero(numMap.get("netWeight")));
		pc.setVolume(NumberUtil.null2Zero(numMap.get("volume")));
		pc.setMeasurement(NumberUtil.null2Zero(numMap.get("measure")));	
		
		pc.setDistQuantity(NumberUtil.null2Zero(numMap.get("quantity")));
		pc.setDistPackages(NumberUtil.null2Zero(numMap.get("packages")));
		pc.setDistGrossWeight(NumberUtil.null2Zero(numMap.get("grossWeight")));
		pc.setDistNetWeight(NumberUtil.null2Zero(numMap.get("netWeight")));
		pc.setDistVolume(NumberUtil.null2Zero(numMap.get("volume")));
		pc.setDistMeasure(NumberUtil.null2Zero(numMap.get("measure")));
		
		pc.setStandardQuantity(plc.getStandardQuantity());
		pc.setStandardGrossWeight(plc.getStandardGrossWeight());
		pc.setStandardNetWeight(plc.getStandardNetWeight());
		pc.setStandardVolume(plc.getStandardVolume());
		pc.setStandardMeasure(plc.getStandardMeasure());
		
		return pc;
	}
	
	/*
	 * Action:WPICKED_CARGO_APC
	 * autoPickCargo：自动拣货
	 * params:计划拣货列表
	 */
	@Transactional
	public List autoPickCargo(List<WStorageNoteCargo> entityList){
		List resList=new ArrayList();
		Map<Long,Long> idMap=new HashMap<Long,Long>();
		for(WStorageNoteCargo entity:entityList){
			List<HtQuery> conditions=new ArrayList<HtQuery>();
			HtQuery ht=new HtQuery();
			ht.setKey("cargoId");
			ht.setOp(SqlOp.equal);
			ht.setValue(""+entity.getCargoId());
			conditions.add(ht);
			if(entity.getCargoOwnerName()!=null){
				ht.setKey("cargoOwnerName");
				ht.setOp(SqlOp.equal);
				ht.setValue(entity.getCargoOwnerName());
				conditions.add(ht);
			}
			if(entity.getProductNo()!=null){
				ht.setKey("productNo");
				ht.setOp(SqlOp.equal);
				ht.setValue(entity.getProductNo());
				conditions.add(ht);
			}
			//出库单未拣货数量
			Double unPickedQ=NumberUtil.null2Zero(entity.getPlanedQuantity())-NumberUtil.null2Zero(entity.getPickedQuantity())-NumberUtil.null2Zero(entity.getDistQuantity());
			Double unPickedP=NumberUtil.null2Zero(entity.getPlanedPackages())-NumberUtil.null2Zero(entity.getPickedPackages())-NumberUtil.null2Zero(entity.getDistPackages());
			Double unPickedGW=NumberUtil.null2Zero(entity.getPlanedGrossWeight())-NumberUtil.null2Zero(entity.getPickedGrossWeight())-NumberUtil.null2Zero(entity.getDistGrossWeight());
			Double unPickedNW=NumberUtil.null2Zero(entity.getPlanedNetWeight())-NumberUtil.null2Zero(entity.getPickedNetWeight())-NumberUtil.null2Zero(entity.getDistNetWeight());
			Double unPickedV=NumberUtil.null2Zero(entity.getPlanedVolume())-NumberUtil.null2Zero(entity.getPickedVolume())-NumberUtil.null2Zero(entity.getDistVolume());
			Double unPickedM=NumberUtil.null2Zero(entity.getPlanedMeasure())-NumberUtil.null2Zero(entity.getPickedMeaSure())-NumberUtil.null2Zero(entity.getDistMeasure());
			
			List<WPlacedCargo> pcList=pdao.complexQuery(conditions);
			if(pcList.size()>0){
			for(WPlacedCargo pc:pcList){
				if(unPickedQ<=0||unPickedQ==0.00){
					break;
				}
				if(pc.getUnitName().equals(entity.getUnitName())){
					//计算出库单未出库数量
					Double nowQ=NumberUtil.null2Zero(pc.getQuantity())-NumberUtil.null2Zero(pc.getPickedQuantity())-NumberUtil.null2Zero(pc.getDistQuantity());
					Double nowP=NumberUtil.null2Zero(pc.getPackages())-NumberUtil.null2Zero(pc.getPickedPackages())-NumberUtil.null2Zero(pc.getDistPackages());
					Double nowGW=NumberUtil.null2Zero(pc.getGrossWeight())-NumberUtil.null2Zero(pc.getPickedGrossWeight())-NumberUtil.null2Zero(pc.getDistGrossWeight());
					Double nowNW=NumberUtil.null2Zero(pc.getNetWeight())-NumberUtil.null2Zero(pc.getPickedNetWeight())-NumberUtil.null2Zero(pc.getDistNetWeight());
					Double nowV=NumberUtil.null2Zero(pc.getVolume())-NumberUtil.null2Zero(pc.getPickedVolume())-NumberUtil.null2Zero(pc.getDistVolume());
					Double nowM=NumberUtil.null2Zero(pc.getMeasure())-NumberUtil.null2Zero(pc.getPickedMeasurement())-NumberUtil.null2Zero(pc.getDistMeasure());
					
					if(nowQ<=unPickedQ){
						Map<String,Double> numMap=new HashMap<String,Double>();
						numMap.put("quantity", NumberUtil.null2Zero(nowQ));
						numMap.put("packages", NumberUtil.null2Zero(nowP));
						numMap.put("grossWeight", NumberUtil.null2Zero(nowGW));
						numMap.put("netWeight", NumberUtil.null2Zero(nowNW));
						numMap.put("volume", NumberUtil.null2Zero(nowV));
						numMap.put("measure", NumberUtil.null2Zero(nowM));
						
						WPickedCargo p=createPickedCargo(pc,entity,numMap);
						p=dao.saveByRowActionSolo(p);
						resList.add(p);
						
						pc.setDistQuantity(NumberUtil.null2Zero(pc.getDistQuantity())+nowQ);
						pc.setDistPackages(NumberUtil.null2Zero(pc.getDistPackages())+nowP);
						pc.setDistGrossWeight(NumberUtil.null2Zero(pc.getDistGrossWeight())+nowGW);
						pc.setDistNetWeight(NumberUtil.null2Zero(pc.getDistNetWeight())+nowNW);
						pc.setDistVolume(NumberUtil.null2Zero(pc.getDistVolume())+nowV);
						pc.setDistMeasure(NumberUtil.null2Zero(pc.getDistMeasure())+nowM);
						pc.setRowAction(RowAction.M);
						pc=pdao.saveByRowActionSolo(pc);
						
						entity.setDistQuantity(NumberUtil.null2Zero(entity.getDistQuantity())+nowQ);
						entity.setDistPackages(NumberUtil.null2Zero(entity.getDistPackages())+nowP);
						entity.setDistGrossWeight(NumberUtil.null2Zero(entity.getDistGrossWeight())+nowGW);
						entity.setDistNetWeight(NumberUtil.null2Zero(entity.getDistNetWeight())+nowNW);
						entity.setDistVolume(NumberUtil.null2Zero(entity.getDistVolume())+nowV);
						entity.setDistMeasure(NumberUtil.null2Zero(entity.getDistMeasure())+nowM);
												
						unPickedQ=unPickedQ-nowQ;
						unPickedP=unPickedP-nowP;
						unPickedGW=unPickedGW-nowGW;
						unPickedNW=unPickedNW-nowNW;
						unPickedV=unPickedV-nowV;
						unPickedM=unPickedM-nowM;
						
					}
					else{
						Map<String,Double> numMap=new HashMap<String,Double>();
						numMap.put("quantity", NumberUtil.null2Zero(unPickedQ));
						numMap.put("packages", NumberUtil.null2Zero(unPickedP));
						numMap.put("grossWeight", NumberUtil.null2Zero(unPickedGW));
						numMap.put("netWeight", NumberUtil.null2Zero(unPickedNW));
						numMap.put("volume", NumberUtil.null2Zero(unPickedV));
						numMap.put("measure", NumberUtil.null2Zero(unPickedM));
						
						WPickedCargo p=createPickedCargo(pc,entity,numMap);
						p=dao.saveByRowActionSolo(p);
						resList.add(p);
						
						//更新上架表的预分配数量
						pc.setDistQuantity(NumberUtil.null2Zero(pc.getDistQuantity())+unPickedQ);
						pc.setDistPackages(NumberUtil.null2Zero(pc.getDistPackages())+unPickedP);
						pc.setDistGrossWeight(NumberUtil.null2Zero(pc.getDistGrossWeight())+unPickedGW);
						pc.setDistNetWeight(NumberUtil.null2Zero(pc.getDistNetWeight())+unPickedNW);
						pc.setDistVolume(NumberUtil.null2Zero(pc.getDistVolume())+unPickedV);
						pc.setDistMeasure(NumberUtil.null2Zero(pc.getDistMeasure())+unPickedM);
						pc.setRowAction(RowAction.M);
						pc=pdao.saveByRowActionSolo(pc);
						
						//更新出库货列表的预分配数量
						//最佳的方法是处理完以后，循环汇总一下，更加精确
						entity.setDistQuantity(NumberUtil.null2Zero(entity.getDistQuantity())+unPickedQ);
						entity.setDistPackages(NumberUtil.null2Zero(entity.getDistPackages())+unPickedP);
						entity.setDistGrossWeight(NumberUtil.null2Zero(entity.getDistGrossWeight())+unPickedGW);
						entity.setDistNetWeight(NumberUtil.null2Zero(entity.getDistNetWeight())+unPickedNW);
						entity.setDistVolume(NumberUtil.null2Zero(entity.getDistVolume())+unPickedV);
						entity.setDistMeasure(NumberUtil.null2Zero(entity.getDistMeasure())+unPickedM);
						
						unPickedQ=0.00;
						unPickedP=0.00;
						unPickedGW=0.00;
						unPickedNW=0.00;
						unPickedV=0.00;
						unPickedM=0.00;
					}
				
				}
				else{
					System.out.println(pc.getId()+"数量单位对不上");
				}
			}
			entity.setRowAction(RowAction.M);
			entity=cdao.saveByRowActionSolo(entity);
			idMap.put(entity.getStorageNoteId().longValue(), entity.getStorageNoteId().longValue());
			resList.add(entity);
			}
			else{
				System.out.println("没有匹配的上架数量！");
			}
			
		}
		this.updateStatusByMap(idMap, resList);
		return resList;
	}

}
