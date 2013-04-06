package com.hitisoft.fos.wms.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fos.wms.dao.WCheckListDao;
import com.hitisoft.fos.wms.dao.WCheckNoteDao;
import com.hitisoft.fos.wms.dao.WPlacedCargoDao;
import com.hitisoft.fos.wms.entity.WCheckList;
import com.hitisoft.fos.wms.entity.WCheckNote;
import com.hitisoft.fos.wms.entity.WPlacedCargo;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;

@Service
public class WCheckNoteService {
	@Autowired
	private WCheckNoteDao dao;
	@Autowired
	private SerialFactory serialFactory;	
	@Autowired
	private WCheckListDao checkListDao;
	
	@Autowired
	private WPlacedCargoDao wpcDao;
	
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	/*@Transactional
	public List<WCheckNote> save(List<WCheckNote> entityList) {
		for (WCheckNote entity : entityList) {
			RowAction ra = entity.getRowAction();
			if (ra == RowAction.N) {
				String no = serialFactory.getSerial("check_note_no");
				entity.setCheckNoteNo(no);
				logger.debug(no);
			}
		}
		return dao.saveByRowAction(entityList);
	}*/
	/**Action : WCHECK_NOTE_S<p>
	 * 盘点单保存
	 * @param entityList
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public List save(List entityList) {
		
		List retList = new ArrayList();
		Long parentId=0L;
		String checkNoteNo=null;
		WCheckNote checkNote = null;
		List<WCheckList> items = new ArrayList<WCheckList>();
		for(Object obj : entityList){
			if(obj instanceof WCheckNote){
				checkNote=(WCheckNote)obj;
				RowAction ra=checkNote.getRowAction();
				if(ra==RowAction.N){
					String no = serialFactory.getSerial("check_note_no");
					checkNote.setCheckNoteNo(no);
					logger.debug(no);
					checkNote = dao.saveByRowActionSolo(checkNote);
					retList.add(checkNote);
					parentId = checkNote.getId();
					checkNoteNo=checkNote.getCheckNoteNo();
				}
				else if(ra==RowAction.R){
					checkNote = dao.saveByRowActionSolo(checkNote);
				}
				else{
					checkNote = dao.saveByRowActionSolo(checkNote);
					retList.add(checkNote);
					parentId = checkNote.getId();
					checkNoteNo=checkNote.getCheckNoteNo();
				}
			}
			else if (obj instanceof WCheckList){
				WCheckList item = (WCheckList) obj;
				items.add(item);
			}
		}
		
		for(WCheckList entity:items){
			RowAction ra=entity.getRowAction();
			if(ra==RowAction.N){
				entity.setCheckNoteId(parentId);
				entity.setCheckNoteNo(checkNoteNo);
			}
			entity = checkListDao.saveByRowActionSolo(entity);
			if(ra != RowAction.R){
				retList.add(entity);
			}		
		}
		return retList;
	}

	/**Action : WCHECK_NOTE_Q<p>
	 * 盘点单查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WCheckNote> query() {
		return dao.findByProperties();
	}
	
	/**Action : WCHECK_NOTE_CS<p>
	 * 盘点表复杂查询
	 */
	//复杂查询
	@Transactional(readOnly = true)
	public List<WCheckNote> complexSearch(List<HtQuery> conditions) {
		
		List<WCheckNote> objList=dao.complexSearch(conditions);
		return objList;
	}
	
	/**Action : WCHECK_NOTE_U<p>
	 * 盘点单状态更新
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional
	public List updateStatus() {
		Long id = Long.valueOf(requestContext.get("id"));
		Integer status = Integer.valueOf(requestContext.get("status"));//将要设置的状态
		List reList=new ArrayList();
		//0 - 新增 1 - 已提交 2 - 已审核 3 - 已完成
		WCheckNote entity = dao.findById(id);
		if (entity != null) {
				entity.setStatus(status);
				reList.add(entity);
		}
		return reList;
	}
	
	/*
	 * action: WCHECK_NOTE_I
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional
	public List<WCheckList> inventory(List<HtQuery> conditions) {
		String id = requestContext.get("id");
		List<WCheckList> resList=new ArrayList();
		System.out.println("id"+id);
		if(id!=null&&id!=""){
			List<WPlacedCargo> pcList=wpcDao.inventory(conditions);
			for(WPlacedCargo pc:pcList){
				WCheckList cl=new WCheckList();
				cl.setStorageNoteNo(pc.getStorageNoteNo());
				cl.setCargoId(pc.getCargoId());
				cl.setSkuNo(pc.getSkuNo());
				cl.setCargoName(pc.getCargoName());
				cl.setWarehouseId(pc.getWarehouseId());
				cl.setWarehouseCode(pc.getWarehouseCode());
				cl.setWarehouseName(pc.getWarehouseName());
				cl.setAreaId(pc.getAreaId());
				cl.setAreaCode(pc.getAreaCode());
				cl.setAreaName(pc.getAreaName());
				cl.setBlockId(pc.getBlockId());
				cl.setBlockCode(pc.getBarCode());
				cl.setBlockName(pc.getBlockName());
				cl.setUnitId(pc.getUnitId());
				cl.setUnitName(pc.getUnitName());
				cl.setCustId(pc.getCustId().longValue());
				cl.setCustName(pc.getCustName());
				cl.setBatchNo(pc.getBatchNo());
				cl.setProductNo(pc.getProductNo());
				cl.setStorageNoteCargoId(pc.getStorageNoteCargoId());
				cl.setStorageNoteId(pc.getStorageNoteId());
				cl.setPlacedCargoId(pc.getId());
				cl.setCheckNoteId(Long.valueOf(id));
				cl.setAccountQuantity(pc.getQuantity());
				cl.setRowAction(RowAction.N);
				cl.setCompCode(sessionContext.getCompCode());				
				resList.add(cl);
			}
		
		}
		
		if(resList.size()>0){
			resList=checkListDao.saveByRowAction(resList);
		}
		return resList;
		//return wpcDao.inventory(conditions);
	}
	
	
}
