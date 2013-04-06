package com.hitisoft.fos.wms.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.util.Constants;
import com.hitisoft.fos.util.FosExceptionEnum;
import com.hitisoft.fos.wms.dao.WPlacedCargoDao;
import com.hitisoft.fos.wms.dao.WQualityControlItemDao;
import com.hitisoft.fos.wms.dao.WReceivedCargoDao;
import com.hitisoft.fos.wms.dao.WStorageNoteCargoDao;
import com.hitisoft.fos.wms.dao.WStorageNoteDao;
import com.hitisoft.fos.wms.entity.WPlacedCargo;
import com.hitisoft.fos.wms.entity.WQualityControlItem;
import com.hitisoft.fos.wms.entity.WRate;
import com.hitisoft.fos.wms.entity.WReceivedCargo;
import com.hitisoft.fos.wms.entity.WStorageNote;
import com.hitisoft.fos.wms.entity.WStorageNoteCargo;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;

@Service
public class WStorageNoteCargoService {
	@Autowired
	private WStorageNoteCargoDao dao;
	@Autowired
	private WReceivedCargoDao rcdao;
	@Autowired
	private WQualityControlItemDao qcitemdao;
	@Autowired
	private WStorageNoteDao sndao;
	@Autowired
	private WPlacedCargoDao plcdao;

	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	/**Action : WSTORAGE_NOTE_CARGO_AJ<p>
	 * 调整数量
	 * @param entity
	 * @return
	 */
		@Transactional
		public WStorageNoteCargo adjustQuantity(WStorageNoteCargo entity){
			if(entity!=null){
				entity.setRowAction(RowAction.M);
				entity=dao.saveByRowActionSolo(entity);
			}
			return entity;
		};
		

		/**
		 * 货物列表保存
		 * @param entityList
		 * @return
		 */
	@Transactional
	public List<WStorageNoteCargo> save(List<WStorageNoteCargo> entityList) {
		for (WStorageNoteCargo c : entityList) {
			if (c.getRowAction() == RowAction.R
					|| c.getRowAction() == RowAction.M) {
				WStorageNoteCargo oc = dao.findById(c.getId());
				if (oc.getStatus() > 0)
					throw new BusinessException(
							FosExceptionEnum.WMS_ACTION_DENYED);
			}
		}
		return dao.saveByRowAction(entityList);
	}
	
	

	/**
	 * 货物列表查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WStorageNoteCargo> query() {
		return dao.findByProperties();
	}

	/**Action : WSTORAGE_NOTE_CARGO_FF <p>
	 * 根据StorageNoteId查询
	 * @return
	 */
	public List<WStorageNoteCargo> findByStorageNoteId() {
		List<WStorageNoteCargo> relist = new ArrayList<WStorageNoteCargo>();
		List<WStorageNoteCargo> wsc = dao.findStorageNoteCargoByStorageNoteId(Integer.valueOf(requestContext.get("id")));
		for (Object obj : wsc) {
			if (obj instanceof WStorageNoteCargo) {
				relist.add((WStorageNoteCargo) obj);
			}
		}
		return relist;
	}

	/**Action : WSTORAGE_NOTE_CARGO_X<p>
	 * 入库单商品复杂查询
	 * @param conditions
	 * @return
	 */
	public List<WStorageNoteCargo> complexQuery(List<HtQuery> conditions) {
		List<WStorageNoteCargo> retList = new ArrayList<WStorageNoteCargo>();
		List<WStorageNoteCargo> objList = dao.query(conditions);
		for (WStorageNoteCargo o : objList) {
			Double planedQuantity = o.getPlanedQuantity();
			Double receivedQuantity = o.getReceivedQuantity();
			if (planedQuantity == 0.00 || planedQuantity == null) {
				// break;
				continue;
			} else if (planedQuantity - receivedQuantity <= 0) {
				continue;
			} else {
				retList.add(o);
			}

		}
		return retList;
	}

	/**Action : WSTORAGE_NOTE_CARGO_EQ<p>
	 * 入库商品盘点库存查询
	 * @param conditions
	 * @return
	 */
	// 库存盘点查询
	@SuppressWarnings({"rawtypes" })
	@Transactional(readOnly = true)
	public List excelQuery(final List<HtQuery> conditions) {
		List<WStorageNoteCargo> objList = dao.excelQuery(conditions);
		List<WStorageNoteCargo> retList = new ArrayList<WStorageNoteCargo>();
		for (Object o : objList) {
			Object[] objs = (Object[]) o;
			WStorageNoteCargo tc = (WStorageNoteCargo) objs[0];

			Integer custId = (Integer) objs[1];
			String custName = (String) objs[2];
			Date actureTime = (Date) objs[3];
			String orderNo = (String) objs[4];

			tc.setCustId(custId);
			tc.setCustName(custName);
			tc.setActureTime(actureTime);
			tc.setOrderNo(orderNo);

			retList.add(tc);
		}
		return retList;
	}

	/**Action : NOTE_ALL_QC<p>
	 * 整单质检处理
	 */
	@Transactional
	public void noteAllQc() {
		WQualityControlItem wQcItem;
		WStorageNoteCargo wSnc;
		WStorageNote wSn;

		Calendar cal = Calendar.getInstance();
		Date qaFlagDate = cal.getTime();

		Long lngId = Long.valueOf(requestContext.get("storageNoteId"));

		List<WReceivedCargo> lstRc = new ArrayList<WReceivedCargo>();
		lstRc = rcdao.findByProperty("storageNoteId", "" + lngId);

		for (WReceivedCargo wRc : lstRc) {

			wSnc = dao.findById(wRc.getStorageNoteCargoId());

			wQcItem = new WQualityControlItem();

			wQcItem.setStorageNoteId(wRc.getStorageNoteId().intValue()); // 入库单id
			wQcItem.setStorageNoteNo(wRc.getStorageNoteNo());// 入库单号
			wQcItem.setReceivedId(wRc.getId().intValue());// 收货ID
			wQcItem.setCargoId(wRc.getCargoId().intValue());// 货物Id
			wQcItem.setCargoName(wRc.getCargoName());// 货物名称
			wQcItem.setSkuNO(wRc.getSkuNo());// 货物编号
			wQcItem.setCargoType(wSnc.getCargoType());// 货物类型
			wQcItem.setSpecification(wRc.getSpecification());// 规格
			wQcItem.setCargoColor(wSnc.getCargoColor()); // 货物颜色

			wQcItem.setQualityType("1"); // 品质 1良
			wQcItem.setQaFlagType("1"); // 质检状态 1全检
			wQcItem.setQaFlagQuantity(wRc.getQuantity());// 质检数量
			wQcItem.setQaFlagQuantityUnit(wRc.getUnitName());// 质检数量单位
			wQcItem.setQaFlagPackages(wRc.getPackages());// 质检件数
			wQcItem.setQaFlagPackagesUnit(wRc.getpUnit());// 质检件数单位
			wQcItem.setQaFlagGrossWeight(wRc.getGrossWeight());// 质检毛重
			wQcItem.setQaFlagNetWeight(wRc.getNetWeight());// 质检净重
			wQcItem.setQaFlagWeightUnit(wRc.getwUnitName());// 质检重量单位
			wQcItem.setQaFlagVolume(wRc.getVolume());// 质检体积
			wQcItem.setQaFlagVolumeUnit(wRc.getvUnitName());// 质检体积单位
			wQcItem.setQaFlagMeasure(wRc.getMeasure());// 质检面积
			wQcItem.setQaFlagMeasureUnit(wRc.getmUnitName());// 质检面积单位

			wQcItem.setQaFlagCasingQuantity(wRc.getUnitNum());// 质检包装数
			wQcItem.setQaFlagCasingUnit(wRc.getPackName());// 质检包装数单位
			wQcItem.setQaFlagCasingQuantityTwo(wRc.getUnitNumTwo());// 质检包装数2
			wQcItem.setQaFlagCasingUnitTwo(wRc.getPackNameTwo());// 质检包装数单位2
			wQcItem.setQaFlagCasingQuantityThree(wRc.getUnitNumThree());// 质检包装数3
			wQcItem.setQaFlagCasingUnitThree(wRc.getPackNameThree());// 质检包装数单位3
			wQcItem.setQaFlagCasingQuantityFour(wRc.getUnitNumFour());// 质检包装数4
			wQcItem.setQaFlagCasingUnitFour(wRc.getPackNameFour());// 质检包装数单位4
			wQcItem.setQaFlagCasingQuantityFive(wRc.getUnitNumFive());// 质检包装数5
			wQcItem.setQaFlagCasingUnitFive(wRc.getPackNameFive());// 质检包装数单位5

			wQcItem.setTrayType(wSnc.getTrayType());// 托盘类型
			wQcItem.setTrayQuantity(wSnc.getTrayQuantity());// 托盘数量
			wQcItem.setQaFlagData(qaFlagDate);// 质检时间
			wQcItem.setQaFlagOperatorName(sessionContext.getUsername());// 质检操作人

			wQcItem.setWarehouseId(wRc.getWarehouseId().intValue());
			wQcItem.setWarehouseCode(wRc.getWarehouseCode());
			wQcItem.setWarehouseName(wRc.getWarehouseName());
			wQcItem.setAreaId(wRc.getAreaId().intValue());
			wQcItem.setAreaCode(wRc.getAreaCode());
			wQcItem.setAreaName(wRc.getAreaName());
			wQcItem.setBlockId(wRc.getBlockId().intValue());
			wQcItem.setBlockCode(wRc.getBlockCode());
			wQcItem.setBlockName(wRc.getBlockName());

			wQcItem.setUuid(Constants.getUUID());

			wQcItem.setRowAction(RowAction.N);

			qcitemdao.saveByRowActionSolo(wQcItem);

			// 货物明细表置为质检中
			wSnc.setStatus(6);
			wSnc.setRowAction(RowAction.M);

			dao.saveByRowActionSolo(wSnc); // 更新货物明细表
		}

		// 入库单表置为质检中
		wSn = sndao.findById(lngId);
		wSn.setStatus(7);
		wSn.setRowAction(RowAction.M);
		sndao.saveByRowActionSolo(wSn);

	}

	/**Action : QC_COMPLETE<p>
	 * 质检完成处理
	 */
	@Transactional
	public void QcComplete() {
		// 获取传进来的storageNoteId参数
		// 找到相对应的StorageNote记录，更新状态为质检完成8
		// 找到相对应的StorageNoteCargo记录集，分别更新状态为质检完成7
		Long lngId = Long.valueOf(requestContext.get("storageNoteId"));

		WStorageNote wsn = sndao.findById(lngId);

		wsn.setStatus(8);
		wsn.setRowAction(RowAction.M);

		sndao.saveByRowActionSolo(wsn);

		List<WStorageNoteCargo> lstWsnc = new ArrayList<WStorageNoteCargo>();
		lstWsnc = dao.findByProperty("storageNoteId", "" + lngId);

		for (WStorageNoteCargo wsnc : lstWsnc) {
			wsnc.setStatus(7);

			wsnc.setRowAction(RowAction.M);

			dao.saveByRowActionSolo(wsnc);
		}

	}

	/**Action : NOTE_ALL_PLACED<p>
	 * 整单上架处理
	 */
	// 整单上架
	@Transactional
	public void noteAllPlaced() {
		Long lngId = Long.valueOf(requestContext.get("storageNoteId"));

		List<WQualityControlItem> lstQcItem = new ArrayList<WQualityControlItem>();

		lstQcItem = qcitemdao.findByProperty("storageNoteId", "" + lngId);

		WReceivedCargo receivedcargo;
		WStorageNoteCargo storagenotecargo;

		WStorageNote storagenote;
		storagenote = sndao.findById(lngId);
		for (WQualityControlItem wQcItem : lstQcItem) {
			// WQualityControlItem qualitycontorol=dao.findById(WQ.getId());
			receivedcargo = rcdao.findById(wQcItem.getReceivedId().longValue()); // 收货表
			storagenotecargo = dao.findById(receivedcargo
					.getStorageNoteCargoId()); // 货物明细表
			// 货物主表

			// 回写到货物明细表
			storagenotecargo.setQualityVontrolId(wQcItem.getId().intValue()); // 质检单ID
			storagenotecargo.setQualityVontrolNo(wQcItem.getStorageNoteNo()); // 质检单编号
			storagenotecargo.setQaFlagType(wQcItem.getQualityType()); // 质检状态
			storagenotecargo.setQaFlagQuantity(wQcItem.getQaFlagQuantity()); // 质检数量
			storagenotecargo.setQaFlagPackages(wQcItem.getQaFlagPackages()); // 质检件数
			storagenotecargo.setQaFlagGrossWeight(wQcItem
					.getQaFlagGrossWeight()); // 质检毛重
			storagenotecargo.setQaFlagNetWeight(wQcItem.getQaFlagNetWeight()); // 质检净重
			storagenotecargo.setQaFlagVolume(wQcItem.getQaFlagVolume()); // 质检体积
			storagenotecargo.setQaFlagCasingQuantity(wQcItem
					.getQaFlagCasingQuantity()); // 质检包装数
			storagenotecargo.setQaFlagCasingUnit(wQcItem.getQaFlagCasingUnit()); // 质检包装数单位
			storagenotecargo.setTrayQuantity(wQcItem.getTrayQuantity()); // 托盘数量
			storagenotecargo.setTrayType(wQcItem.getTrayType()); // 托盘类型
			storagenotecargo.setQaFlagData(wQcItem.getQaFlagData()); // 质检时间
			storagenotecargo.setQaFlagOperatorName(wQcItem
					.getQaFlagOperatorName()); // 质检操作人

			storagenotecargo.setStatus(5); // 上架完成标志
			dao.update(storagenotecargo);

			// 回写到收货表
			receivedcargo.setQualityType(wQcItem.getQualityType()); // 品质
			// receivedcargo.setStandardQuantity(wQcItem.getQaFlagQuantity());
			// //质检后合格数量
			// receivedcargo.setStandardNotQuntity(receivedcargo.getQuantity()-wQcItem.getQaFlagQuantity());
			// //质检后不合格数量
			/*
			 * receivedcargo.setStandardPackages(wQcItem.getQaFlagPackages());
			 * //质检后合格件数
			 * receivedcargo.setStandardNotPackages(receivedcargo.getPackages
			 * ()-wQcItem.getQaFlagPackages()); //质检后不合格件数
			 * receivedcargo.setStandardGrossWeight
			 * (wQcItem.getQaFlagGrossWeight()); //质检后合格毛重
			 * receivedcargo.setStandardNotGrossWeight
			 * (receivedcargo.getGrossWeight()-wQcItem.getQaFlagGrossWeight());
			 * //质检后不合格毛重
			 * receivedcargo.setStandardNetWeight(wQcItem.getQaFlagNetWeight());
			 * //质检合格净重
			 * receivedcargo.setStandardNotNetWeight(receivedcargo.getNetWeight
			 * ()-wQcItem.getQaFlagNetWeight()); //质检不合格净重
			 * receivedcargo.setStandardVolume(wQcItem.getQaFlagVolume());
			 * //质检合格体积
			 * receivedcargo.setStandardNotVolume(receivedcargo.getVolume
			 * ()-wQcItem.getQaFlagVolume()); //质检不合格体积
			 * receivedcargo.setStandardMeasure(wQcItem.getQaFlagMeasure());
			 * //质检合格面积
			 * receivedcargo.setStandardNotMeasure(receivedcargo.getMeasure
			 * ()-wQcItem.getQaFlagMeasure()); //质检不合格面积
			 */
			receivedcargo.setStatus(2); // 上架完成标志

			rcdao.update(receivedcargo);

			// 后推到上架表
			WPlacedCargo placedcargo = new WPlacedCargo();
			placedcargo.setCustId(storagenote.getCargoOwnerId()); // 货主ID
			placedcargo.setCustName(storagenote.getCargoOwnerName()); // 货主名称
			placedcargo
					.setStorageNoteId(wQcItem.getStorageNoteId().longValue()); // 仓储单ID
			placedcargo.setStorageNoteNo(wQcItem.getStorageNoteNo()); // 入库单号
			placedcargo.setStorageNoteCargoId(receivedcargo
					.getStorageNoteCargoId().longValue()); // 入库单商品明细表ID
			placedcargo.setReceivedCargoId(wQcItem.getReceivedId().longValue()); // 入库收货商品ID
			placedcargo.setReceivedDate(receivedcargo.getReceivedDate()); // 收货日期
			placedcargo.setProductDate(receivedcargo.getProductDate()); // 生厂日期
			placedcargo.setSkuNo(wQcItem.getSkuNO()); // SKU编号
			placedcargo.setCargoId(storagenotecargo.getCargoId().longValue()); // 商品ID
			placedcargo.setCargoName(wQcItem.getCargoName()); // 商品名称
			placedcargo.setSpecification(wQcItem.getSpecification()); // 产品规格
			placedcargo.setWarehouseId(storagenotecargo.getWarehouseId()
					.longValue());
			placedcargo.setWarehouseName(storagenotecargo.getWarehouseName());
			placedcargo.setWarehouseCode(storagenotecargo.getWarehouseCode());
			placedcargo.setAreaId(receivedcargo.getAreaId());
			placedcargo.setAreaName(receivedcargo.getAreaName());
			placedcargo.setAreaCode(receivedcargo.getAreaCode());
			placedcargo.setBlockId(receivedcargo.getBlockId());
			placedcargo.setBlockName(storagenotecargo.getBlockName());
			placedcargo.setBlockCode(storagenotecargo.getBlockCode());
			placedcargo.setUnitId(receivedcargo.getUnitId()); // 数量单位ID
			placedcargo.setUnitName(wQcItem.getQaFlagQuantityUnit()); // 数量单位名称
			placedcargo.setQuantity(wQcItem.getQaFlagQuantity()); // 上架数量
			placedcargo.setBarCode(storagenotecargo.getBarCode()); // 商品条码
			placedcargo.setBatchNo(storagenotecargo.getBatchNo()); // 批次号
			// placedcargo.setCargoNo(wQcItem.getSkuNO());
			placedcargo.setStatus(0); // 新增
			placedcargo.setPlacedType(1); // 正常上架
			placedcargo.setUuid(Constants.getUUID()); // UUID
			placedcargo.setOrderNo(storagenote.getOrderNo()); // 订单号
			placedcargo.setRowAction(RowAction.N);
			plcdao.saveByRowActionSolo(placedcargo);

		}

		storagenote.setStatus(5); // 上架完成
		sndao.update(storagenote);

	}

	/**Action : CANCEL_PLACED <p>
	 * 取消上架处理
	 * @return
	 */
	@Transactional
	public String cancelPlaced() {
		// Long lngId=Long.valueOf(requestContext.get("storageNoteId"));
		String id = requestContext.get("storageNoteId");
		String s = requestContext.get("S");
		Long lngId = Long.valueOf(id);
		String result = "failure";
		// 如果传的参数是ALL，则根据入库单ID将所有的上架纪录删除
		// 如果传的是SINGLE，则表示只删除单个上架纪录 根所w_placed_cargo.ID
		if (s.equals("ALL")) {
			/*
			 * 根据storageNoteId删除该纪录所有上架表纪录，并更新数据单表
			 */

			// 将所有上架纪录远择出来
			// 遍历判断是否有存在已出库的纪录
			// 如果有存在已出库则返回false
			// 如果都没有出库则执行删除动作
			boolean noPicked = true;
			List<WPlacedCargo> plcList = plcdao.findByProperty("storageNoteId",
					"" + lngId);

			// 循环上架表判断是否已有纪录已经
			for (WPlacedCargo plcItem : plcList) {

				// Double pickedQuantity=plcItem.getPickedQuantity();
				if (plcItem.getPickedQuantity() != null
						&& plcItem.getPickedQuantity() > 0) {
					noPicked = false;
					return "该入库单已经有货物出库了，不能整单取消！";
					// break;
				}

				// Double pickedPackages=plcItem.getPickedPackages();
				// if(pickedPackages>0){
				if (plcItem.getPickedPackages() != null
						&& plcItem.getPickedPackages() > 0) {
					noPicked = false;
					return "该入库单已经有货物出库了，不能整单取消！";
					// break;
				}

				// Double pickedGrossWeight=plcItem.getPickedGrossWeight();
				if (plcItem.getPickedGrossWeight() != null
						&& plcItem.getPickedGrossWeight() > 0) {
					noPicked = false;
					return "该入库单已经有货物出库了，不能整单取消！";// break;
				}

				// Double pickedNetWeight=plcItem.getPickedNetWeight();
				if (plcItem.getPickedNetWeight() != null
						&& plcItem.getPickedNetWeight() > 0) {
					noPicked = false;
					return "该入库单已经有货物出库了，不能整单取消！";// break;
				}

				// Double pickedVolume=plcItem.getPickedVolume();
				if (plcItem.getPickedVolume() != null
						&& plcItem.getPickedVolume() > 0) {
					noPicked = false;
					return "该入库单已经有货物出库了，不能整单取消！";// break;
				}

				// Double pickedMeasure=plcItem.getPickedMeasurement();
				if (plcItem.getPickedMeasurement() != null
						&& plcItem.getPickedMeasurement() > 0) {
					noPicked = false;
					return "该入库单已经有货物出库了，不能整单取消！";// break;
				}

				// Double pickedPackQuantity=plcItem.getPickedPackQuantity();
				if (plcItem.getPickedPackQuantity() != null
						&& plcItem.getPickedPackQuantity() > 0) {
					noPicked = false;
					return "该入库单已经有货物出库了，不能整单取消！";// break;
				}
			}

			// 通过判断没有上架纪录，存在出库情况则取消上架纪录
			if (noPicked) {

				for (WPlacedCargo plcItem : plcList) {
					plcItem.setRowAction(RowAction.R);
					plcItem = plcdao.saveByRowActionSolo(plcItem);
				}

				List<WStorageNoteCargo> sncList = dao.findByProperty(
						"storageNoteId", "" + lngId);
				for (WStorageNoteCargo sncItem : sncList) {
					sncItem.setPlacedMeasure(0.00);
					sncItem.setPlacedNetWeight(0.00);
					sncItem.setPlacedQuantity(0.00);
					sncItem.setPlacedVolume(0.00);
					sncItem.setPlacedPackQuantity(0.00);
					sncItem.setPlacedPackages(0.00);
					sncItem.setRowAction(RowAction.M);
					sncItem = dao.saveByRowActionSolo(sncItem);
				}

				List<WReceivedCargo> rcLit = rcdao.findByProperty(
						"storageNoteId", "" + lngId);
				for (WReceivedCargo rcItem : rcLit) {
					// rcItem.setPlacedMeasure(0.00);
					rcItem.setPlacedMeasure(0.00);
					rcItem.setPlacedNetWeight(0.00);
					rcItem.setPlacedQuantity(0.00);
					rcItem.setPlacedVolume(0.00);
					// rcItem.setPlacedPackQuantity(0.00);
					// rcItem.setp
					rcItem.setPlacedDate(null);
					rcItem.setPlacedPackages(0.00);
					rcItem.setRowAction(RowAction.M);
					rcItem = rcdao.saveByRowActionSolo(rcItem);
				}

				WStorageNote sn = sndao.findById(lngId);
				if (sn != null) {
					sn.setStatus(3);
					sn.setRowAction(RowAction.M);
					sn = sndao.saveByRowActionSolo(sn);
				}

				result = "success";
			} else {
				result = "该入库单已经有货物出库了，不能整单取消！";// throw new Exception();

			}

		} else if (s.equals("SINGLE")) {
			/*
			 * 如果当条纪录删除，刚根据ID号找得上架纪录 判断是不是已经出库，否则执行取消任务 先删除上架表
			 * 再将入库单货物列表上架数量，减去上架表的数量 将收货表的数量，减去上架表的数量
			 */

			WPlacedCargo plc = plcdao.findById(lngId);
			boolean noPicked = true;
			if (plc != null) {

				if (plc.getPickedQuantity() != null
						&& plc.getPickedQuantity() > 0) {
					noPicked = false;
					return "该入库已经存在出库记录，不能取消!";

				}

				if (plc.getPickedPackages() != null
						&& plc.getPickedPackages() > 0) {
					noPicked = false;
					return "该入库已经存在出库记录，不能取消!";
				}

				if (plc.getPickedGrossWeight() != null
						&& plc.getPickedGrossWeight() > 0) {
					noPicked = false;
					return "该入库已经存在出库记录，不能取消!";
				}

				if (plc.getPickedNetWeight() != null
						&& plc.getPickedNetWeight() > 0) {
					noPicked = false;
					return "该入库已经存在出库记录，不能取消!";
				}

				if (plc.getPickedVolume() != null && plc.getPickedVolume() > 0) {
					noPicked = false;
					return "该入库已经存在出库记录，不能取消!";
				}

				if (plc.getPickedMeasurement() != null
						&& plc.getPickedMeasurement() > 0) {
					noPicked = false;
					return "该入库已经存在出库记录，不能取消!";
				}

				if (plc.getPickedPackQuantity() != null
						&& plc.getPickedPackQuantity() > 0) {
					noPicked = false;
					return "该入库已经存在出库记录，不能取消!";
				}
			}

			// 通过判断没有上架纪录，存在出库情况则取消上架纪录
			if (noPicked) {
				// Double picked
				WStorageNoteCargo entity = dao.findById(plc
						.getStorageNoteCargoId());
				WReceivedCargo rc = rcdao.findById(plc.getReceivedCargoId());
				if (entity != null) {
					entity.setPlacedMeasure(((entity.getPlacedMeasure() != null) ? entity
							.getPlacedMeasure() : 0)
							- ((plc.getMeasure() != null) ? plc.getMeasure()
									: 0));
					entity.setPlacedNetWeight((entity.getPlacedNetWeight() != null ? entity
							.getPlacedNetWeight() : 0)
							- ((plc.getNetWeight() != null) ? plc
									.getNetWeight() : 0));
					entity.setPlacedQuantity((entity.getPlacedQuantity() != null ? entity
							.getPlacedQuantity() : 0)
							- (plc.getQuantity() != null ? plc.getQuantity()
									: 0));
					entity.setPlacedVolume((entity.getPlacedVolume() != null ? entity
							.getPlacedVolume() : 0)
							- (plc.getVolume() != null ? plc.getVolume() : 0));
					entity.setPlacedPackQuantity((entity
							.getPlacedPackQuantity() != null ? entity
							.getPlacedPackQuantity() : 0)
							- (plc.getPackQuantity() != null ? plc
									.getPackQuantity() : 0));
					entity.setPlacedPackages((entity.getPlacedPackages() != null ? entity
							.getPlacedPackages() : 0)
							- (plc.getPackages() != null ? plc.getPackages()
									: 0));
					entity.setRowAction(RowAction.M);
				}

				if (rc != null) {
					rc.setPlacedMeasure((rc.getPlacedMeasure() != null ? rc
							.getPlacedMeasure() : 0)
							- (plc.getMeasure() != null ? plc.getMeasure() : 0));
					rc.setPlacedNetWeight((rc.getPlacedNetWeight() != null ? rc
							.getPlacedNetWeight() : 0)
							- (plc.getNetWeight() != null ? plc.getNetWeight()
									: 0));
					rc.setPlacedQuantity((rc.getPlacedQuantity() != null ? rc
							.getPlacedQuantity() : 0)
							- (plc.getQuantity() != null ? plc.getQuantity()
									: 0));
					rc.setPlacedVolume((rc.getPlacedVolume() != null ? rc
							.getPlacedVolume() : 0)
							- (plc.getVolume() != null ? plc.getVolume() : 0));
					// rcItem.setPlacedPackQuantity(0.00);
					// rcItem.setp
					rc.setPlacedDate(null);
					rc.setPlacedPackages((rc.getPlacedPackages() != null ? rc
							.getPlacedPackages() : 0)
							- (plc.getPackages() != null ? plc.getPackages()
									: 0));
					rc.setRowAction(RowAction.M);
				}

				WStorageNote sn = sndao.findById(plc.getStorageNoteId());
				if (sn != null) {
					sn.setStatus(3);
					sn.setRowAction(RowAction.M);

				}
				plc.setRowAction(RowAction.R);
				plcdao.saveByRowActionSolo(plc);
				dao.saveByRowActionSolo(entity);// (entity);
				rcdao.saveByRowActionSolo(rc);
				sn = sndao.saveByRowActionSolo(sn);

				result = "success";
			}

		}

		return result;
	}
	
	/**Action : WSTORAGE_NOTE_CARGO_RC_FINISH<p>
	 * 单票收货完成
	 * @param entityList
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional
	public List receivedCargoFinish(List<WStorageNoteCargo> entityList){
		List resList=new ArrayList();
		
		for(WStorageNoteCargo c:entityList){
			c.setStatus(3);
			c.setRowAction(RowAction.M);
			c=dao.saveByRowActionSolo(c);
			resList.add(c);
			
			List<WReceivedCargo> wrcList=rcdao.findByProperty("storageNoteCargoId", ""+c.getId());
			for(WReceivedCargo rc:wrcList){
				rc.setStatus(3);
				rc.setRowAction(RowAction.M);
				rc=rcdao.saveByRowActionSolo(rc);
				resList.add(rc);
			}
		}
		
		Integer storageNoteId=0;
		if(entityList.size()>0){
			storageNoteId=entityList.get(0).getStorageNoteId();
		}
		
		boolean allIsFinish=true;
		List<WStorageNoteCargo> listWSNC=dao.findByProperty("storageNoteId", ""+storageNoteId);
		for(WStorageNoteCargo c:listWSNC){
			if(c.getStatus()!=3){
				allIsFinish=false;
			}
		}
		if(allIsFinish){
			WStorageNote wsn=sndao.findById(storageNoteId.longValue());
			if(wsn!=null){
				wsn.setStatus(3);
				wsn.setRowAction(RowAction.M);
				wsn=sndao.saveByRowActionSolo(wsn);
				resList.add(wsn);
			}
		}
		return resList;
	}
	/**Action : WSTORAGE_NOTE_CARGO_RFRD<p>
	 * 取消单票收货完成
	 * @param entityList
	 * @return
	 */
		@SuppressWarnings({ "rawtypes", "unchecked" })
		@Transactional
		public List undoReceivedCargoFinish(List<WStorageNoteCargo> entityList){
			List resList=new ArrayList();
			
			for(WStorageNoteCargo c:entityList){
				c.setStatus(2);
				c.setRowAction(RowAction.M);
				c=dao.saveByRowActionSolo(c);
				resList.add(c);
				
				List<WReceivedCargo> wrcList=rcdao.findByProperty("storageNoteCargoId", ""+c.getId());
				for(WReceivedCargo rc:wrcList){
					rc.setStatus(2);
					rc.setRowAction(RowAction.M);
					rc=rcdao.saveByRowActionSolo(rc);
					resList.add(rc);
				}
			}
			
			Integer storageNoteId=0;
			if(entityList.size()>0){
				storageNoteId=entityList.get(0).getStorageNoteId();
			}
			
			WStorageNote wsn=sndao.findById(storageNoteId.longValue());
			if(wsn!=null){
				wsn.setStatus(2);
				wsn.setRowAction(RowAction.M);
				wsn=sndao.saveByRowActionSolo(wsn);
				resList.add(wsn);
			}
			
			return resList;
		}

}
