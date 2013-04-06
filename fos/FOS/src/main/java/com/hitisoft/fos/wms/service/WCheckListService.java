package com.hitisoft.fos.wms.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fos.wms.dao.WCheckListDao;
import com.hitisoft.fos.wms.dao.WPickedCargoDao;
import com.hitisoft.fos.wms.dao.WPlacedCargoDao;
import com.hitisoft.fos.wms.dao.WReceivedCargoDao;
import com.hitisoft.fos.wms.dao.WStorageNoteCargoDao;
import com.hitisoft.fos.wms.dao.WStorageNoteDao;
import com.hitisoft.fos.wms.entity.WCheckList;
import com.hitisoft.fos.wms.entity.WPickedCargo;
import com.hitisoft.fos.wms.entity.WPlacedCargo;
import com.hitisoft.fos.wms.entity.WReceivedCargo;
import com.hitisoft.fos.wms.entity.WStorageNote;
import com.hitisoft.fos.wms.entity.WStorageNoteCargo;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.util.NumberUtil;

@Service
public class WCheckListService {
	@Autowired
	private WCheckListDao dao;
	
	@Autowired
	private WStorageNoteDao sndao;
	
	@Autowired
	private WStorageNoteCargoDao sncdao;
	
	@Autowired
	private WReceivedCargoDao rcdao;
	
	@Autowired
	private WPlacedCargoDao pcdao;
	
	@Autowired
	private WPickedCargoDao pkdao;
	
	@Autowired
	private SerialFactory serialFactory;
	
	@Autowired
	private RequestContext requestContext;
	
	/**Action : WCHECK_LIST_S<p>
	 * 盘点从表单保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WCheckList> save(List<WCheckList> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**Action : WCHECK_LIST_Q<p>
	 * 盘点从表单查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WCheckList> query() {
		return dao.findByProperties();
	}
	/**Action : WCHCEK_LIST_ATPC<p>
	 * 盘亏处理保存
	 * @param entityList
	 * @return
	 */
	//WCHCEK_LIST_ATPC
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public List adjust2PlacedCargo(List entityList){
		List retList=new ArrayList();
		
		for(Object obj:entityList){
			if(obj instanceof WPlacedCargo){
				WPlacedCargo entity=(WPlacedCargo)obj;
				RowAction ra=entity.getRowAction();
				entity=pcdao.saveByRowActionSolo(entity);
				if(ra!=RowAction.R){
					retList.add(entity);
				}
				
				WReceivedCargo rc=rcdao.findById(entity.getReceivedCargoId());
				if(rc!=null){
					rc.setPlacedQuantity(NumberUtil.null2Zero(rc.getPlacedQuantity())+NumberUtil.null2Zero(entity.getQuantity()));
					rc.setPlacedPackages(NumberUtil.null2Zero(rc.getPlacedPackages())+NumberUtil.null2Zero(entity.getPackages()));
					rc.setPlacedGrossWeight(NumberUtil.null2Zero(rc.getPlacedGrossWeight())+NumberUtil.null2Zero(entity.getGrossWeight()));
					rc.setPlacedNetWeight(NumberUtil.null2Zero(rc.getPlacedNetWeight())+NumberUtil.null2Zero(entity.getNetWeight()));
					rc.setPlacedVolume(NumberUtil.null2Zero(rc.getPlacedVolume())+NumberUtil.null2Zero(entity.getVolume()));
					rc.setPlacedMeasure(NumberUtil.null2Zero(rc.getPlacedMeasure())+NumberUtil.null2Zero(entity.getMeasure()));
					rc.setRowAction(RowAction.M);
					rc=rcdao.saveByRowActionSolo(rc);
				}
				
				WStorageNoteCargo snc=sncdao.findById(entity.getStorageNoteCargoId());
				if(snc!=null){
					snc.setPlacedQuantity(NumberUtil.null2Zero(snc.getPlacedQuantity())+NumberUtil.null2Zero(entity.getQuantity()));
					snc.setPlacedPackages(NumberUtil.null2Zero(snc.getPlacedPackages())+NumberUtil.null2Zero(entity.getPackages()));
					snc.setPlacedGrossWeight(NumberUtil.null2Zero(snc.getPlacedGrossWeight())+NumberUtil.null2Zero(entity.getGrossWeight()));
					snc.setPlacedNetWeight(NumberUtil.null2Zero(snc.getPlacedNetWeight())+NumberUtil.null2Zero(entity.getNetWeight()));
					snc.setPlacedVolume(NumberUtil.null2Zero(snc.getPlacedVolume())+NumberUtil.null2Zero(entity.getVolume()));
					snc.setPlacedMeasure(NumberUtil.null2Zero(snc.getPlacedMeasure())+NumberUtil.null2Zero(entity.getMeasure()));
					snc.setRowAction(RowAction.M);
					snc=sncdao.saveByRowActionSolo(snc);
				}
			}
		}
		
		for(Object obj:entityList){
			if(obj instanceof WCheckList){
				WCheckList entity=(WCheckList)obj;
				RowAction ra=entity.getRowAction();
				entity=dao.saveByRowActionSolo(entity);
				if(ra!=RowAction.R){
					retList.add(entity);
				}
			}
		}
		return retList;
	}
	/**Action : WCHECK_LIST_ATPK<p>
	 * 
	 * @param entityList
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public List adjust2PickedCargo(List entityList){
		List retList=new ArrayList();
		Map<String,String> map=new HashMap<String,String>();
		
		for(Object obj:entityList){
			if(obj instanceof WStorageNote){
				WStorageNote entity=(WStorageNote)obj;

				entity.setStorageNoteNo(serialFactory.getSerial("pd_storage_note_no"));
				RowAction ra=entity.getRowAction();
				entity=sndao.saveByRowActionSolo(entity);
				if(ra!=RowAction.R){
					retList.add(entity);
				}
				
				map.put("storageNoteId", ""+entity.getId());
				map.put("storageNoteNo", entity.getStorageNoteNo());
			}
		}
		
		for(Object obj:entityList){
			if(obj instanceof WStorageNoteCargo){
				WStorageNoteCargo entity=(WStorageNoteCargo)obj;
				
				Integer storageNoteid=Integer.valueOf(map.get("storageNoteId"));
				String storageNoteNo=map.get("storageNoteNo");
				
				entity.setStorageNoteId(storageNoteid);
				entity.setStorageNoteNo(storageNoteNo);
				
				RowAction ra=entity.getRowAction();
				entity=sncdao.saveByRowActionSolo(entity);
				if(ra!=RowAction.R){
					retList.add(entity);
				}
				
				map.put("storageNoteCargoId", ""+entity.getId());
			}
		}
		
		for(Object obj:entityList){
			if(obj instanceof WPickedCargo){
				WPickedCargo entity=(WPickedCargo)obj;
				Long outStorageNoteId=Long.valueOf(map.get("storageNoteId"));
				String outStorageNoteNo=map.get("storageNoteNo");
				Long outStorageNoteCargoId=Long.valueOf(map.get("storageNoteCargoId"));
				
				entity.setOutStorageNoteId(outStorageNoteId);
				entity.setOutStorageNoteNo(outStorageNoteNo);
				entity.setOutStorageNoteCargoId(outStorageNoteCargoId);
				entity.setRemarks("盘点处理");
				entity.setPlacedType(1);
				
				RowAction ra=entity.getRowAction();
				entity=pkdao.saveByRowActionSolo(entity);
				if(ra!=RowAction.R)
					retList.add(entity);
				
				WPlacedCargo pc=pcdao.findById(entity.getPlacedCargoId());
				pc.setPickedQuantity(NumberUtil.null2Zero(pc.getPickedQuantity())+NumberUtil.null2Zero(entity.getPickableQuantity()));
				pc.setRowAction(RowAction.M);
				pc=pcdao.saveByRowActionSolo(pc);
				retList.add(pc);
			}
		}
		for(Object obj:entityList){
			if(obj instanceof WCheckList){
				WCheckList chk=(WCheckList)obj;
				chk.setRowAction(RowAction.M);
				chk=dao.saveByRowActionSolo(chk);
				retList.add(chk);
			}			
		}
		
		for(Object obj:entityList){
			if(obj instanceof WPlacedCargo){
				WPlacedCargo pc=(WPlacedCargo)obj;
				pc=pcdao.saveByRowActionSolo(pc);
				retList.add(pc);
			}
		}
				
		return retList;
	}
	/**Action : WCHECK_LIST_CGPO<p>
	 * 批号的更改
	 * @param entity
	 * @return
	 */
	@Transactional
	public WCheckList changProductNo(WCheckList entity){
		//Long id = Long.valueOf(requestContext.get("id"));
		//Integer status = Integer.valueOf(requestContext.get("status"));//将要设置的状态
		String strProductDate=requestContext.get("productDate");
		Date productDate=new Date();
		if(strProductDate!=null&&strProductDate!=""){
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			try {
				productDate=sdf.parse(strProductDate);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		String productNo=requestContext.get("productNo");
		WPlacedCargo pc=pcdao.findById(entity.getPlacedCargoId());
		if(pc!=null){
			if(strProductDate!=null&&strProductDate!=""){
				pc.setProductDate(productDate);
			}
			pc.setProductNo(productNo);
			pc.setRowAction(RowAction.M);
			pc=pcdao.saveByRowActionSolo(pc);
		}
		entity.setNewProductNo(productNo);
		entity.setNewProductDate(productDate);
		entity.setRowAction(RowAction.M);
		entity=dao.saveByRowActionSolo(entity);
		return entity;
	}
	/**Action : WCHECK_LIST_E<p>
	 * 盘点单Excel
	 * @return
	 */
	//WCHECK_LIST_E
	@Transactional
	public List<WCheckList> findCheckIdExp(){
		List<WCheckList> checkList=new ArrayList<WCheckList>();
		List<WCheckList> checkL=dao.findCheckIdExp();
		for(Object obj: checkL){
			if(obj instanceof WCheckList){
				checkList.add((WCheckList) obj);
			}
		}
		return checkList;
	}
	
}
