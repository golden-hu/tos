package com.hitisoft.fos.wms.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.wms.dao.WPlacedCargoDao;
import com.hitisoft.fos.wms.dao.WQualityControlItemDao;
import com.hitisoft.fos.wms.dao.WReceivedCargoDao;
import com.hitisoft.fos.wms.dao.WStorageNoteCargoDao;
import com.hitisoft.fos.wms.dao.WStorageNoteDao;
import com.hitisoft.fos.wms.entity.WPlacedCargo;
import com.hitisoft.fos.wms.entity.WQualityControlItem;
import com.hitisoft.fos.wms.entity.WReceivedCargo;
import com.hitisoft.fos.wms.entity.WStorageNote;
import com.hitisoft.fos.wms.entity.WStorageNoteCargo;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;

@Service
public class WQualityControlItemService{
	
	@Autowired
	private WQualityControlItemDao dao;
	@Autowired
	private WReceivedCargoDao receivedDao;
	@Autowired
	private WStorageNoteCargoDao noteCargoDao;
	@Autowired 
	private WStorageNoteDao noteDao;
	@Autowired
	private WPlacedCargoDao placedDao;
	@Autowired
	private RequestContext requestContext;
	
	/**
	 * 生成uudi
	 * @return
	 */
	public String getUUID(){
		//Random r = new Random();
		String[] chars="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		String uuids = ""; 
		String  uuid="";
		for (int i=0;i<32;i++){
			uuids=chars[(int) (Math.random()*chars.length)];
			uuid+=uuids;
		}
		return uuid;
	}
	/**Action : WUALITY_CONTROL_ITEM_S<p>
	 * 质检子单保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WQualityControlItem> save(List<WQualityControlItem> entityList){
		return dao.saveByRowAction(entityList);
	}
	
	/**Action : WUALITY_CONTROL_ITEM_Q<p>
	 * 质检子单查询
	 * @return
	 */
	@Transactional
	public List<WQualityControlItem> query(){
		return dao.findByProperties();
	}
	
	/**Action : WUALITY_CONTROL_ITEM_A<p>
	 * 单号查询
	 * @param conditions
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional
	public List complexStorageNoteNo(List<HtQuery> conditions){
		List list =new ArrayList();
		List<WQualityControlItem>  lists=dao.getQualityControl(conditions);
		if(requestContext.containsKey("S")){
			for(WQualityControlItem QC : lists){
				WQualityControlItem wqc=new WQualityControlItem();
				WStorageNoteCargo notcargo=noteCargoDao.findById(QC.getCargoId().longValue());
				wqc.setStorageNoteNo(QC.getStorageNoteNo());
				wqc.setId(QC.getId());
				wqc.setOrderNo(notcargo.getOrderNo());
				wqc.setCargoOwnerName(notcargo.getCargoOwnerName());
				list.add(wqc);
			}
		}
		return list;
	}
	
	/**Action : WUALITY_CONTROL_ITEM_F<p>
	 * 质检此单保存
	 * @param entityList
	 */
	@Transactional
	public void inspectSaveQuery(List<WQualityControlItem> entityList){
		for(WQualityControlItem WQ : entityList){
			WQualityControlItem qualitycontorol=dao.findById(WQ.getId());                                      ///质检表
			WReceivedCargo receivedcargo=receivedDao.findById(WQ.getReceivedId().longValue());                 ///收货表
			WStorageNoteCargo storagenotecargo=noteCargoDao.findById(receivedcargo.getStorageNoteCargoId());   //货物明细表
			WStorageNote storagenot=noteDao.findById(WQ.getStorageNoteId().longValue());                       //货物主表
			
			//回写到货物明细表
			storagenotecargo.setQualityVontrolId(qualitycontorol.getId().intValue());
			storagenotecargo.setQualityVontrolNo(qualitycontorol.getStorageNoteNo());
			storagenotecargo.setQaFlagType(qualitycontorol.getQualityType());
			storagenotecargo.setQaFlagQuantity(qualitycontorol.getQaFlagQuantity());
			storagenotecargo.setQaFlagPackages(qualitycontorol.getQaFlagPackages());
			storagenotecargo.setQaFlagGrossWeight(qualitycontorol.getQaFlagGrossWeight());
			storagenotecargo.setQaFlagNetWeight(qualitycontorol.getQaFlagNetWeight());
			storagenotecargo.setQaFlagVolume(qualitycontorol.getQaFlagVolume());
			storagenotecargo.setQaFlagCasingQuantity(qualitycontorol.getQaFlagCasingQuantity());
			storagenotecargo.setQaFlagCasingUnit(qualitycontorol.getQaFlagCasingUnit());
			storagenotecargo.setTrayQuantity(qualitycontorol.getTrayQuantity());
			storagenotecargo.setTrayType(qualitycontorol.getTrayType());
			storagenotecargo.setQaFlagData(qualitycontorol.getQaFlagData());
			storagenotecargo.setQaFlagOperatorName(qualitycontorol.getQaFlagOperatorName());
			receivedDao.update(receivedcargo);
			
			//回写到收货表
			receivedcargo.setQualityType(qualitycontorol.getQualityType());
			//receivedcargo.setStandardNotQuntity(receivedcargo.getQuantity()-qualitycontorol.getQaFlagQuantity());
			/*receivedcargo.setStandardPackages(qualitycontorol.getQaFlagPackages());
			receivedcargo.setStandardNotPackages(receivedcargo.getPackages()-qualitycontorol.getQaFlagPackages());
			receivedcargo.setStandardGrossWeight(qualitycontorol.getQaFlagGrossWeight());
			receivedcargo.setStandardNotGrossWeight(receivedcargo.getGrossWeight()-qualitycontorol.getQaFlagGrossWeight());
			receivedcargo.setStandardNetWeight(qualitycontorol.getQaFlagNetWeight());
			receivedcargo.setStandardNotNetWeight(receivedcargo.getNetWeight()-qualitycontorol.getQaFlagNetWeight());
			receivedcargo.setStandardVolume(qualitycontorol.getQaFlagVolume());
			receivedcargo.setStandardNotVolume(receivedcargo.getVolume()-qualitycontorol.getQaFlagVolume());
			receivedcargo.setStandardMeasure(qualitycontorol.getQaFlagMeasure());
			receivedcargo.setStandardNotMeasure(receivedcargo.getMeasure()-qualitycontorol.getQaFlagMeasure());*/
			receivedDao.update(receivedcargo);
			
			//后推到上架表
			WPlacedCargo placedcargo= new WPlacedCargo();
			placedcargo.setCustId(storagenot.getCargoOwnerId());
			placedcargo.setCustName(storagenot.getCargoOwnerName());
			placedcargo.setStorageNoteId(qualitycontorol.getStorageNoteId().longValue());
			placedcargo.setStorageNoteNo(qualitycontorol.getStorageNoteNo());
			placedcargo.setStorageNoteCargoId(receivedcargo.getStorageNoteCargoId().longValue());
			placedcargo.setReceivedCargoId(qualitycontorol.getReceivedId().longValue());
			placedcargo.setReceivedDate(receivedcargo.getReceivedDate());
			placedcargo.setProductDate(receivedcargo.getProductDate());
			placedcargo.setSkuNo(qualitycontorol.getSkuNO());
			placedcargo.setCargoId(storagenotecargo.getCargoId().longValue());
			placedcargo.setCargoName(qualitycontorol.getCargoName());
			placedcargo.setSpecification(qualitycontorol.getSpecification());
			placedcargo.setWarehouseId(storagenotecargo.getWarehouseId().longValue());
			placedcargo.setWarehouseName(storagenotecargo.getWarehouseName());
			placedcargo.setWarehouseCode(storagenotecargo.getWarehouseCode());
			placedcargo.setAreaId(receivedcargo.getAreaId());
			placedcargo.setAreaName(receivedcargo.getAreaName());
			placedcargo.setAreaCode(receivedcargo.getAreaCode());
			placedcargo.setBlockId(receivedcargo.getBlockId());
			placedcargo.setBlockName(storagenotecargo.getBlockName());
			placedcargo.setBlockCode(storagenotecargo.getBlockCode());
			placedcargo.setUnitId(receivedcargo.getUnitId());
			placedcargo.setUnitName(qualitycontorol.getQaFlagQuantityUnit());
			placedcargo.setQuantity(qualitycontorol.getQaFlagQuantity());
			placedcargo.setBarCode(storagenotecargo.getBarCode());
			placedcargo.setBatchNo(storagenotecargo.getBatchNo());
			placedcargo.setCargoNo(qualitycontorol.getSkuNO());
			placedcargo.setStatus(0);
			placedcargo.setPlacedType(1);
			placedcargo.setUuid(getUUID());
			placedcargo.setOrderNo(storagenot.getOrderNo());
			placedcargo.setRowAction(RowAction.N);
			placedDao.saveByRowActionSolo(placedcargo);
			//删除质检表记录
			qualitycontorol.setRowAction(RowAction.R);
			dao.update(qualitycontorol);
		}
	}
	
	
	
	
	/**Action : WUALITY_CONTROL_ITEM_U<p>
	 * 质检下推
	 * @param entityList
	 */
	@Transactional
	public void inspectQuery(List<WQualityControlItem> entityList){
		for(WQualityControlItem WQ : entityList){
			WQualityControlItem qualitycontorol=dao.findById(WQ.getId());                                      ///质检表
			WReceivedCargo receivedcargo=receivedDao.findById(WQ.getReceivedId().longValue());                 ///收货表
			WStorageNoteCargo storagenotecargo=noteCargoDao.findById(receivedcargo.getStorageNoteCargoId());   //货物明细表
			WStorageNote storagenot=noteDao.findById(WQ.getStorageNoteId().longValue());                       //货物主表
			
			//回写到货物明细表
			storagenotecargo.setQualityVontrolId(qualitycontorol.getId().intValue());
			storagenotecargo.setQualityVontrolNo(qualitycontorol.getStorageNoteNo());
			storagenotecargo.setQaFlagType(qualitycontorol.getQualityType());
			storagenotecargo.setQaFlagQuantity(qualitycontorol.getQaFlagQuantity());
			storagenotecargo.setQaFlagPackages(qualitycontorol.getQaFlagPackages());
			storagenotecargo.setQaFlagGrossWeight(qualitycontorol.getQaFlagGrossWeight());
			storagenotecargo.setQaFlagNetWeight(qualitycontorol.getQaFlagNetWeight());
			storagenotecargo.setQaFlagVolume(qualitycontorol.getQaFlagVolume());
			storagenotecargo.setQaFlagCasingQuantity(qualitycontorol.getQaFlagCasingQuantity());
			storagenotecargo.setQaFlagCasingUnit(qualitycontorol.getQaFlagCasingUnit());
			storagenotecargo.setTrayQuantity(qualitycontorol.getTrayQuantity());
			storagenotecargo.setTrayType(qualitycontorol.getTrayType());
			storagenotecargo.setQaFlagData(qualitycontorol.getQaFlagData());
			storagenotecargo.setQaFlagOperatorName(qualitycontorol.getQaFlagOperatorName());
			receivedDao.update(receivedcargo);
			
			//回写到收货表
			receivedcargo.setQualityType(qualitycontorol.getQualityType());
			//receivedcargo.setStandardQuantity(qualitycontorol.getQaFlagQuantity());
			//receivedcargo.setStandardNotQuntity(receivedcargo.getQuantity()-qualitycontorol.getQaFlagQuantity());
			/*receivedcargo.setStandardPackages(qualitycontorol.getQaFlagPackages());
			receivedcargo.setStandardNotPackages(receivedcargo.getPackages()-qualitycontorol.getQaFlagPackages());
			receivedcargo.setStandardGrossWeight(qualitycontorol.getQaFlagGrossWeight());
			receivedcargo.setStandardNotGrossWeight(receivedcargo.getGrossWeight()-qualitycontorol.getQaFlagGrossWeight());
			receivedcargo.setStandardNetWeight(qualitycontorol.getQaFlagNetWeight());
			receivedcargo.setStandardNotNetWeight(receivedcargo.getNetWeight()-qualitycontorol.getQaFlagNetWeight());
			receivedcargo.setStandardVolume(qualitycontorol.getQaFlagVolume());
			receivedcargo.setStandardNotVolume(receivedcargo.getVolume()-qualitycontorol.getQaFlagVolume());
			receivedcargo.setStandardMeasure(qualitycontorol.getQaFlagMeasure());
			receivedcargo.setStandardNotMeasure(receivedcargo.getMeasure()-qualitycontorol.getQaFlagMeasure());*/
			receivedDao.update(receivedcargo);
			
			//后推到上架表
			WPlacedCargo placedcargo= new WPlacedCargo();
			placedcargo.setCustId(storagenot.getCargoOwnerId());
			placedcargo.setCustName(storagenot.getCargoOwnerName());
			placedcargo.setStorageNoteId(qualitycontorol.getStorageNoteId().longValue());
			placedcargo.setStorageNoteNo(qualitycontorol.getStorageNoteNo());
			placedcargo.setStorageNoteCargoId(receivedcargo.getStorageNoteCargoId().longValue());
			placedcargo.setReceivedCargoId(qualitycontorol.getReceivedId().longValue());
			placedcargo.setReceivedDate(receivedcargo.getReceivedDate());
			placedcargo.setProductDate(receivedcargo.getProductDate());
			placedcargo.setSkuNo(qualitycontorol.getSkuNO());
			placedcargo.setCargoId(storagenotecargo.getCargoId().longValue());
			placedcargo.setCargoName(qualitycontorol.getCargoName());
			placedcargo.setSpecification(qualitycontorol.getSpecification());
			placedcargo.setWarehouseId(storagenotecargo.getWarehouseId().longValue());
			placedcargo.setWarehouseName(storagenotecargo.getWarehouseName());
			placedcargo.setWarehouseCode(storagenotecargo.getWarehouseCode());
			placedcargo.setAreaId(receivedcargo.getAreaId());
			placedcargo.setAreaName(receivedcargo.getAreaName());
			placedcargo.setAreaCode(receivedcargo.getAreaCode());
			placedcargo.setBlockId(receivedcargo.getBlockId());
			placedcargo.setBlockName(storagenotecargo.getBlockName());
			placedcargo.setBlockCode(storagenotecargo.getBlockCode());
			placedcargo.setUnitId(receivedcargo.getUnitId());
			placedcargo.setUnitName(qualitycontorol.getQaFlagQuantityUnit());
			placedcargo.setQuantity(qualitycontorol.getQaFlagQuantity());
			placedcargo.setBarCode(storagenotecargo.getBarCode());
			placedcargo.setBatchNo(storagenotecargo.getBatchNo());
			placedcargo.setCargoNo(qualitycontorol.getSkuNO());
			placedcargo.setStatus(0);
			placedcargo.setPlacedType(1);
			placedcargo.setUuid(getUUID());
			placedcargo.setOrderNo(storagenot.getOrderNo());
			placedcargo.setRowAction(RowAction.N);
			placedDao.saveByRowActionSolo(placedcargo);
			//删除质检表记录
		/*	qualitycontorol.setRowAction(RowAction.R);
			dao.update(qualitycontorol);*/
		}
	}
	
	
	
}
