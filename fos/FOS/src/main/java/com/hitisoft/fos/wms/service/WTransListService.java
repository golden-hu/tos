package com.hitisoft.fos.wms.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.util.FosExceptionEnum;
import com.hitisoft.fos.wms.dao.WPlacedCargoDao;
import com.hitisoft.fos.wms.dao.WTransListDao;
import com.hitisoft.fos.wms.dao.WTransNoteDao;
import com.hitisoft.fos.wms.entity.WPlacedCargo;
import com.hitisoft.fos.wms.entity.WTransList;
import com.hitisoft.fos.wms.entity.WTransNote;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.util.NumberUtil;

@Service
public class WTransListService {
	@Autowired
	private WTransListDao dao;
	
	@Autowired
	private WPlacedCargoDao wpcDao;
	
	@Autowired
	private WTransNoteDao wtnDao;
	
	/**Action : WTRANS_NOTE_LIST_S<p>
	 * 移库明细数据保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WTransList> save(List<WTransList> entityList) {

		return dao.saveByRowAction(entityList);
	}
	
	/**Action : WTRANS_NOTE_LIST_Q<p>
	 * 移库明细数据查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WTransList> query() {
		return dao.findByProperties();
	}
	/**Action : WTRANS_NOTE_LIST_E<p>
	 * 执行移库操作
	 * @param entityList
	 * @return
	 */
	//WTRANS_NOTE_LIST_E
	@Transactional	//执行移库操作
	public List doExec(List<WTransList> entityList)
	{
		//迭代每一条要移库的数据进行处理	
		
		Calendar cal=Calendar.getInstance(); 
		Date changeDate=cal.getTime();
		
		for (WTransList wTransList : entityList) {
			
			if(wTransList.getStatus()==1){
				throw new BusinessException(FosExceptionEnum.WMS_TRANS_FINISHED);
				
			}			
			
			//根据上架货物ID号取出所对应的那条上架货物数据
			WPlacedCargo wpCargo=	wpcDao.findById(Long.valueOf(wTransList.getPlacedCargoId()));
			
			//如果要移库的数量大于上架货物数据中当前的数量，则不可以移库，并抛异常提示
			if ((NumberUtil.null2Zero(wpCargo.getQuantity())-NumberUtil.null2Zero(wpCargo.getPickedQuantity())-NumberUtil.null2Zero(wpCargo.getDistQuantity())
					)<wTransList.getTransQuantity())
			{
				//抛异常
				throw new BusinessException(FosExceptionEnum.WMS_PICKED_QUANTITY_OVER,wpCargo.getCargoName());
				//return;
			}
			
			//上架货物记录的当前数量改变，当前数量减去要移走的数量			
			wpCargo.setQuantity(wpCargo.getQuantity()-wTransList.getTransQuantity());
			
			//如果当前数量没有了，则该条上架货物数量的状态置为已出库
			if (wpCargo.getQuantity()<=0)
			{
				wpCargo.setStatus(5);
				wpCargo.setPackages(0.00);
				wpCargo.setGrossWeight(0.00);
				wpCargo.setNetWeight(0.00);
				wpCargo.setVolume(0.00);
				wpCargo.setMeasure(0.00);
			
			}
			else{				
				wpCargo.setPackages(NumberUtil.null2Zero(wpCargo.getStandardQuantity())==0?0:wpCargo.getQuantity()/wpCargo.getStandardQuantity());
				wpCargo.setGrossWeight(NumberUtil.null2Zero(wpCargo.getStandardGrossWeight())*wpCargo.getQuantity());
				wpCargo.setNetWeight(NumberUtil.null2Zero(wpCargo.getStandardNetWeight())*wpCargo.getQuantity());
				wpCargo.setVolume(NumberUtil.null2Zero(wpCargo.getStandardVolume())*wpCargo.getQuantity());
				wpCargo.setMeasure(NumberUtil.null2Zero(wpCargo.getStandardMeasure())*wpCargo.getQuantity());
			}
			//保存最近一次的移库ID
			wpCargo.setTransNoteId(wTransList.getTransNoteId());
			wpCargo.setTransListId(wTransList.getId().intValue());
			
			//数据操作状态置为修改
			wpCargo.setRowAction(RowAction.M);
			
			//执行更新操作		
			
			//如果目标库位的商品代码，生产批号一致，则将调整数量加至目标数量上
			
			boolean isAdd=true;
			boolean isAdded=false;
			int count=0;
			List<WPlacedCargo> pcList=wpcDao.findByProperty("blockId", ""+wTransList.getToBlockId());
			List<WPlacedCargo> subPcList=new ArrayList();
			for(WPlacedCargo pc:pcList){
				//首先排除没有已经出库的纪录
				if(pc.getPickedQuantity()<pc.getQuantity()){
					subPcList.add(pc);
				}
			}
			
			if(subPcList.size()>0){
				for(WPlacedCargo pc:subPcList){
					if(!pc.getSkuNo().equals(wpCargo.getSkuNo())){
						count++;
					}
					else if(!pc.getProductNo().equals(wpCargo.getProductNo())){
						count++;
					}
					else if(pc.getId()==wpCargo.getId()){
						count++;
					}
				}
			}
			if(count==0){
				//如果count>0则表示存在不一样的纪录
				//产生一个新的上架货物对像，是用来插一条移库上架数据的。
				WPlacedCargo wpCargoNew=new WPlacedCargo();
			
				//对象赋值，大部份的字段值跟原来的上架货物数据一致，仓库，库区，库位信息取移库记录里的，状态设为移库上架	
				wpCargoNew.setCustId(wpCargo.getCustId());
				wpCargoNew.setCustName(wpCargo.getCustName());
				wpCargoNew.setStorageNoteId(wpCargo.getStorageNoteId());
				wpCargoNew.setStorageNoteNo(wpCargo.getStorageNoteNo());
				wpCargoNew.setStorageNoteCargoId(wpCargo.getStorageNoteCargoId());
				wpCargoNew.setReceivedCargoId(wpCargo.getReceivedCargoId());
				wpCargoNew.setReceivedDate(wpCargo.getReceivedDate());
				wpCargoNew.setProductDate(wpCargo.getProductDate());
				wpCargoNew.setProductNo(wpCargo.getProductNo());
				
				wpCargoNew.setSkuNo(wpCargo.getSkuNo());
				wpCargoNew.setCargoId(wpCargo.getCargoId());
				wpCargoNew.setCargoName(wpCargo.getCargoName());
				wpCargoNew.setSpecification(wpCargo.getSpecification());
				
				wpCargoNew.setWarehouseId(Long.valueOf(wTransList.getToWarehouseId()));
				wpCargoNew.setWarehouseName(wTransList.getToWarehouseName());
				wpCargoNew.setWarehouseCode(wTransList.getToWarehouseCode());
				wpCargoNew.setAreaId(Long.valueOf(wTransList.getToAreaId()));
				wpCargoNew.setAreaName(wTransList.getToAreaName());
				wpCargoNew.setAreaCode(wTransList.getToAreaCode());
				wpCargoNew.setBlockId(Long.valueOf(wTransList.getToBlockId()));
				wpCargoNew.setBlockName(wTransList.getToBlockName());
				wpCargoNew.setBlockCode(wTransList.getToBlockCode());
				
				wpCargoNew.setUnitId(wpCargo.getUnitId());
				wpCargoNew.setUnitName(wpCargo.getUnitName());
				
				wpCargoNew.setBarCode(wpCargo.getBarCode());
				wpCargoNew.setBatchNo(wpCargo.getBatchNo());
				wpCargoNew.setCargoNo(wpCargo.getCargoNo());
				wpCargoNew.setContainerNo(wpCargo.getContainerNo());
				wpCargoNew.setStatus(0);
				wpCargoNew.setPlacedType(3);//1，盘盈，2盘亏，3移库
				wpCargoNew.setOrderNo(wpCargo.getOrderNo());
				wpCargoNew.setTransNoteId(wTransList.getTransNoteId());
				wpCargoNew.setTransListId(wTransList.getId().intValue());
				wpCargoNew.setCompCode(wpCargo.getCompCode());
				
				wpCargoNew.setFromWarehouseId(wpCargo.getWarehouseId());
				wpCargoNew.setFromWarehouseCode(wpCargo.getWarehouseCode());
				wpCargoNew.setFromWarehouseName(wpCargo.getWarehouseName());
				
				wpCargoNew.setFromAreaCode(wpCargo.getAreaCode());
				wpCargoNew.setFromAreaId(wpCargo.getAreaId());
				wpCargoNew.setFromAreaName(wpCargo.getAreaName());
				
				wpCargoNew.setFromBlockCode(wpCargo.getBlockCode());
				wpCargoNew.setFromBlockId(wpCargo.getBlockId());
				wpCargoNew.setFromBlockName(wpCargo.getBlockName());
				
				wpCargoNew.setFromPlacedCargoId(wpCargo.getId());
				wpCargoNew.setChangeDate(changeDate);
				
				
				
				wpCargoNew.setStandardQuantity(wpCargo.getStandardQuantity());
				wpCargoNew.setStandardGrossWeight(wpCargo.getStandardGrossWeight());
				wpCargoNew.setStandardNetWeight(wpCargo.getStandardNetWeight());
				wpCargoNew.setStandardVolume(wpCargo.getStandardVolume());
				wpCargoNew.setStandardMeasure(wpCargo.getStandardMeasure());
				
				wpCargoNew.setQuantity(wTransList.getTransQuantity());
				wpCargoNew.setNowQuantity(wTransList.getTransQuantity());
				
				wpCargoNew.setPackages(NumberUtil.null2Zero(wpCargo.getStandardQuantity())==0?0:wpCargoNew.getQuantity()/wpCargo.getStandardQuantity());
				wpCargoNew.setGrossWeight(NumberUtil.null2Zero(wpCargo.getStandardGrossWeight())*wpCargoNew.getQuantity());
				wpCargoNew.setNetWeight(NumberUtil.null2Zero(wpCargo.getStandardNetWeight())*wpCargoNew.getQuantity());
				wpCargoNew.setVolume(NumberUtil.null2Zero(wpCargo.getStandardVolume())*wpCargoNew.getQuantity());
				wpCargoNew.setMeasure(NumberUtil.null2Zero(wpCargo.getStandardMeasure())*wpCargoNew.getQuantity());
				wpCargoNew.setStatus(5);
				wpCargoNew.setRowAction(RowAction.N);
				
				//保存数据
				wpcDao.saveByRowActionSolo(wpCargoNew);
			}			
			else {
				//不能添加，又没有添加成功！
				//如果该库位不是空着的，又没有调整过数据，则抛弃常
				throw new BusinessException(FosExceptionEnum.WMS_BLOCK_IS_FULL,wTransList.getToBlockName());
			}
			
			wpcDao.saveByRowActionSolo(wpCargo);
			
			//将每一条移库记录状态改为修改，状态改为已执行
			wTransList.setRowAction(RowAction.M);
			wTransList.setStatus(1);
			
		}
		
		
		entityList=dao.saveByRowAction(entityList);
		//retList.
		
		//将移库单表的对应记录置为已执行
		WTransNote wtNote=wtnDao.findById(Long.valueOf(entityList.get(0).getTransNoteId()));
		
		wtNote.setStatus(4);
		wtNote.setRowAction(RowAction.M);
		wtNote=wtnDao.saveByRowActionSolo(wtNote);
		
		return entityList;
		
	}
	
	
	
	
}
