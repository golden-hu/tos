package com.hitisoft.fos.wms.dao;

import java.util.List;

import com.hitisoft.fos.wms.entity.WReceivedCargo;
import com.hitisoft.fos.wms.entity.WStorageNoteCargo;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface WReceivedCargoDao extends BaseDao<WReceivedCargo, Long> {

	/**
	 * 库存盘点查询
	 * @param conditions
	 * @return ListWReceivedCargo
	 */
	List<WReceivedCargo> excelQuery(List<HtQuery> conditions);
	
	/**
	 * 根据入库单号查询没上架之前的货物信息
	 * @param conditions
	 * @return ListWstorageNoteCargo
	 */
	List<WStorageNoteCargo> getCargoList(List<HtQuery> conditions);
	/**
	 * 根据条件查询上架表信息
	 * @param conditions
	 * @return List
	 */
	List complexQuery(List<HtQuery> conditions);
	
}
