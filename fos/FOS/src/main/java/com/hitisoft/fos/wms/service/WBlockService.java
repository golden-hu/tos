package com.hitisoft.fos.wms.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.util.FosExceptionEnum;
import com.hitisoft.fos.wms.dao.WBlockDao;
import com.hitisoft.fos.wms.entity.WBlock;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.RequestContext;

@Service
public class WBlockService {
	@Autowired
	private WBlockDao dao;
	@Autowired
	private RequestContext requestContext;
	
	/**Action : BLOCK_S<p>
	 * 库位保存
	 * @param entityList
	 * @return ListWBlock
	 */
	@Transactional
	public List<WBlock> save(List<WBlock> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**Action : BLOCK_Q<p>
	 * 库位查询
	 * @return ListWBlock
	 */
	@Transactional(readOnly = true)
	public List<WBlock> query() {
		return dao.findByProperties();
	}
	
	/**Action : BLOCK_CQ<p>
	 * 复杂查询
	 * @param conditions
	 * @return ListWBlock
	 */
	public List<WBlock> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}
	/**Action : BLOCK_SS<p>
	 * 库位保存时看库位代码和库位名称有没有重复的，没有重复的则保存有重复的则抛异常
	 * @param entity
	 * @return ListWBlock
	 */
	@Transactional
	public List<WBlock> saveNoDB(List<WBlock> entity){
		List<WBlock> listBlock=new ArrayList<WBlock>();
		String blockName = requestContext.get("blockName");
		String blockCode = requestContext.get("blockCode");
		String rowAction = requestContext.get("rowAction");
		Integer codeSize = dao.checkNoDBCode( blockCode);
		Integer nameSize = dao.checkNoDBName(blockName);
		if(rowAction.equals("M")){
			listBlock=dao.saveByRowAction(entity);
		}else if(rowAction.equals("N")){
			if(codeSize>0 && nameSize>0){
				throw new BusinessException(FosExceptionEnum.WMS_BLOCK_IS_HAVE_NAME_CODE_AND_NAME);
			}if (codeSize>0){
				throw new BusinessException(FosExceptionEnum.WMS_BLOCK_IS_HAVE_CODE);
			}if(nameSize>0){
				throw new BusinessException(FosExceptionEnum.WMS_BLOCK_IS_HAVE_NAME);
			}
			listBlock=dao.saveByRowAction(entity);
		}
		return listBlock;
	}
	/**Action : WBLOCK_SQ
	 * 超级库存查询
	 * @param conditions
	 * @return ListWBlock
	 */
	@SuppressWarnings({ "rawtypes" })
	@Transactional
	public List<WBlock> superQuery(List<HtQuery> conditions){
		List<WBlock> retList=new ArrayList<WBlock>();
		List queryList=dao.superQuery(conditions);
		
		for (Object object : queryList) {
			WBlock wb=new WBlock();
			
			Object[] ob=(Object[])object;
			//ID
			if(ob[0]!=null){
				Integer id=(Integer)ob[0];
				wb.setId(id.longValue());
			}
			if(ob[1]!=null){
				wb.setBlockCode(ob[1].toString());
			}
			//w_block.ID,
			//w_block.BLOCK_CODE,  
			//w_block.BLOCK_NAME,
			if(ob[2]!=null){
				wb.setBlockName(ob[2].toString());
			}
			//w_block.BLOCK_NAME_EN,
			if(ob[3]!=null){
				wb.setBlockNameEn(ob[3].toString());
			}
			
			//w_block.AREA_ID,
			if(ob[4]!=null){
				Integer areaId=(Integer)ob[4];
				wb.setAreaId(areaId.longValue());
			}
			//w_block.AREA_CODE,
			if(ob[5]!=null){
				wb.setAreaCode(ob[5].toString());
			}
			
			//w_block.AREA_NAME,  
			if(ob[6]!=null){
				wb.setAreaName(ob[6].toString());
			}
			//w_block.WAREHOUSE_ID,
			if(ob[7]!=null){
				Integer warehouseId=(Integer)ob[7];
				wb.setWarehouseId(warehouseId.longValue());
			}
						
			//w_block.WAREHOUSE_CODE,
			if(ob[8]!=null){
				wb.setWarehouseCode(ob[8].toString());
			}
			//w_block.WAREHOUSE_NAME,
			if(ob[9]!=null){
				wb.setWarehouseName(ob[9].toString());
			}
			//w_block.IN_AREA_ID,  
			if(ob[10]!=null){
				Integer inAreaId=(Integer)ob[10];
				wb.setInAreaId(inAreaId.longValue());
			}
			//w_block.IN_AREA_CODE,  
			if(ob[11]!=null){
				wb.setInAreaCode(ob[11].toString());
			}
			//w_block.IN_AREA_NAME,  
			if(ob[12]!=null){
				wb.setInAreaName(ob[12].toString());
			}
			//w_block.OUT_AREA_ID, 
			if(ob[13]!=null){
				Integer outAreaId=(Integer)ob[13];
				wb.setOutAreaId(outAreaId.longValue());
			}
			//w_block.IN_AREA_CODE,  
			if(ob[14]!=null){
				wb.setOutAreaCode(ob[14].toString());
			}
			//w_block.IN_AREA_NAME,  
			if(ob[15]!=null){
				wb.setOutAreaName(ob[15].toString());
			}
			//w_block.OUT_AREA_CODE,  
			//w_block.OUT_AREA_NAME,  
			//w_block.BLOCK_TYPE,  
			if(ob[16]!=null){
				wb.setBlockType((Byte)ob[16]);
			}
			if(ob[17]!=null){
				wb.setBlockLength(((BigDecimal)ob[17]).doubleValue());
			}
			//w_block.BLOCK_LENGTH,  
			//w_block.BLOCK_WIDTH,  
			if(ob[18]!=null){
				wb.setBlockWidth(((BigDecimal)ob[18]).doubleValue());
			}
			//w_block.BLOCK_HEIGHT,
			if(ob[19]!=null){
				wb.setBlockHeight(((BigDecimal)ob[19]).doubleValue());
			}
			
			//w_block.BLOCK_ROW,  
			if(ob[20]!=null){
				wb.setBlockRow((Integer)ob[20]);
			}
			//w_block.BLOCK_COL,
			if(ob[21]!=null){
				wb.setBlockCol((Integer)ob[21]);
			}
			//w_block.BLOCK_LAYER,  
			if(ob[22]!=null){
				wb.setBlockLayer((Integer)ob[22]);
			}
			//w_block.BLOCK_X, 
			if(ob[23]!=null){
				wb.setBlockX(((BigDecimal)ob[23]).doubleValue());
			}
			//w_block.BLOCK_Y,  
			//w_block.BLOCK_Z,
			if(ob[24]!=null){
				wb.setBlockY(((BigDecimal)ob[24]).doubleValue());
			}
			if(ob[25]!=null){
				wb.setBlockZ(((BigDecimal)ob[25]).doubleValue());
			}
			//w_block.BLOCK_GROUP,
			if(ob[26]!=null){
				wb.setBlockGroup(ob[26].toString());
			}
			//w_block.MAX_WEIGHT,
			if(ob[27]!=null){
				wb.setMaxWeight(((BigDecimal)ob[27]).doubleValue());
			}
			//w_block.MAX_VOLUME,  
			if(ob[28]!=null){
				wb.setMaxVolume(((BigDecimal)ob[28]).doubleValue());
			}
			//w_block.MAX_QUANTITY, 
			if(ob[29]!=null){
				wb.setMaxQuantity(((BigDecimal)ob[29]).doubleValue());
			}
			//w_block.MAX_PALLET,  
			
			if(ob[30]!=null){
				wb.setMaxPallet((Integer)ob[30]);
			}
			//w_block.CARGO_MIX_FLAG,
			if(ob[31]!=null){
				wb.setCargoMixFlag((Byte)ob[31]);
			}
			//w_block.BATCH_MIX_FLAG, 
			if(ob[32]!=null){
				wb.setBatchMixFlag((Byte)ob[32]);
			}
			//LEFT(w_block.REMARK, 256),  
			if(ob[33]!=null){
				wb.setRemark(ob[33].toString());
			}
			//w_block.SHELVES_ORDER, 
			if(ob[34]!=null){
				wb.setShelvesOrder(ob[34].toString());
			}
			//w_block.PICK_ORDER, 
			if(ob[35]!=null){
				wb.setPickOrder(ob[35].toString());
			}
			//w_block.LOCATION_USING,
			if(ob[36]!=null){
				wb.setLocationUsing(ob[36].toString());
			}
			//w_block.LOCATION_ATTRIBUTE, 
			if(ob[37]!=null){
				wb.setLocationAttribute(ob[37].toString());
			}
			//w_block.LOCATION_PROCESSING, 
			if(ob[38]!=null){
				wb.setLocationProcessing(ob[38].toString());
			}
			//w_block.TURNOVER_DEMAND, 
			if(ob[39]!=null){
				wb.setTurnoverDemand(ob[39].toString());
			}
			//w_block.INVENTORY_CONDITION,
			if(ob[40]!=null){
				wb.setInventoryCondition(ob[40].toString());
			}
			//w_block.LOCAL_GROUP1,  
			if(ob[41]!=null){
				wb.setLocalGroup1(ob[41].toString());
			}
			//w_block.LOCAL_GROUP2,
			if(ob[42]!=null){
				wb.setLocalGroup2(ob[42].toString());
			}
			//w_block.MAX_AREA,  
			if(ob[43]!=null){
				//BigDecimal maxArea=(BigDecimal)ob[43];
				wb.setMaxArea((Double)ob[43]);
			}
			//w_block.COORDINATE_Z,
			if(ob[44]!=null){
				wb.setCoordinateZ((Integer)ob[44]);
			}
			//w_block.STORE_TYPE_ID,
			if(ob[45]!=null){
				wb.setStoreTypeId((Integer)ob[45]);
			}
			
			//w_block.STORE_TYPE_NAME,
			if(ob[46]!=null){
				wb.setStoreTypeName(ob[46].toString());
			}
			//w_block.LOCATION_BAR_CODE, 
			if(ob[47]!=null){
				wb.setLocationBarCode(ob[47].toString());
			}

			//w_block.STATUS,
			if(ob[48]!=null){
				wb.setStatus(ob[48].toString());
			}

			//w_block. ,
			//w_block.CREATE_BY,
			if(ob[49]!=null){
				wb.setCreateBy(ob[49].toString());
			}

			//w_block.CREATE_TIME, 
			if(ob[50]!=null){
				//wb.setCreateTime((Date)ob[50]);
			}
			//w_block.MODIFY_BY,  
			if(ob[51]!=null){
				wb.setModifyBy(ob[51].toString());
			}
			//w_block.MODIFY_TIME, 
			if(ob[52]!=null){
				//wb.setCreateTime((Date)ob[50]);
			}
			//w_block.COMP_CODE, 
			if(ob[53]!=null){
				wb.setCompCode(ob[53].toString());
			}
			//w_block.VERSION,
			if(ob[54]!=null){
				wb.setVersion((Integer)ob[54]);
			}
			//w_block.REMOVED, 
			if(ob[55]!=null){
				//wb.setVersion((Integer)ob[55]);
			}
			
			//w_block.UUID,*/
			if(ob[56]!=null){
				//wb.setVersion((Integer)ob[55]);
				wb.setUuid(ob[56].toString());
			}
			
			if(ob[57]!=null){
				BigDecimal quantity=(BigDecimal)ob[57];
				wb.setNowQuantity(quantity.doubleValue());
			}
			if(ob[58]!=null){
				BigDecimal packages=(BigDecimal)ob[58];
				wb.setNowPackages(packages.doubleValue());
			}
			if(ob[59]!=null){
				BigDecimal grossWeight=(BigDecimal)ob[59];
				wb.setNowGrossWeight(grossWeight.doubleValue());
			}
			if(ob[60]!=null){
				BigDecimal volume=(BigDecimal)ob[60];
				wb.setNowVolume(volume.doubleValue());
			}
			if(ob[61]!=null){
				BigDecimal measure=(BigDecimal)ob[61];
				wb.setNowMeasure(measure.doubleValue());
			}
			
			retList.add(wb);
			
		}
		return retList;
	}
}
