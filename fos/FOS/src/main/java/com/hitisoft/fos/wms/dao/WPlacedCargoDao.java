package com.hitisoft.fos.wms.dao;

import java.util.List;

import com.hitisoft.fos.wms.entity.WPlacedCargo;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface WPlacedCargoDao extends BaseDao<WPlacedCargo, Long> {

	/**
	 * 库存盘点查询
	 * @param conditions
	 * @return ListWplacedCargo
	 */
	List<WPlacedCargo> excelQuery(List<HtQuery> conditions);

	/**
	 * 根据conditions中的条件进行库存盘点查询
	 * @param conditions
	 * @return ListWPlacedCargo
	 */
	List<WPlacedCargo> excelQuery1(List<HtQuery> conditions);	
	
	/**
	 * 根据条件查询及时库存信息
	 * @param conditions
	 * @return ListObject
	 */
	List<Object> inventoryListExp(List<HtQuery> conditions);
	
	/**
	 * 库存查询  既可以通过普通的条件进行查询，又可以按照分组的条件进行查询
	 * @param conditions
	 * @return List
	 */
	@SuppressWarnings("rawtypes")
	List getInventory(List<HtQuery> conditions);

	/**
	 * 冻结货物查询，如果有条件传入则根据条件查询，如果没条件，则查询所有没被冻结的货物
	 * @param conditions
	 * @return ListObject
	 */
	List<Object> query4Forzen(List<HtQuery> conditions);
	
	/**
	 * 取消冻结查询<p>
	 * 如果有条件则根据条件查询，如果没条件则查询已经被冻结的所有货物
	 * @param conditions
	 * @return ListObject
	 */
	List<Object> query4ForzenCancel(List<HtQuery> conditions);

	/**
	 * 根据条件查询数量大于0的状态是上架的货物，并且根据库位排序
	 * @param ListHtQueryCondition
	 * @return ListWPlacedCargo
	 */
	List<WPlacedCargo> complexQuery(List<HtQuery> conditions);
	
	/**
	 * 根据条件查询上架信息
	 * @param conditions
	 * @return ListWPlacedCargo
	 */
	List<WPlacedCargo> findByCargo(List<HtQuery> conditions);

	/**
	 * 根据条件查询数量大于0的状态是上架的货物 框架处理conditions
	 * @param ListHtQueryCondition
	 * @return ListWPlacedCargo
	 */
	List<WPlacedCargo> complexQuery4Picked(List<HtQuery> conditions);

	/**
	 * 根据条件查询数量大于0的状态是上架的货物
	 * @param ListHtQueryCondition
	 * @return ListWPlacedCargo
	 */
	List<WPlacedCargo> query4AutoPicked(List<HtQuery> conditions);

	/**
	 * 根据条件查询数量大于0的状态是上架的货物，并且根据库位排序
	 * @param ListHtQueryCondition
	 * @return ListWPlacedCargo
	 */
	List<WPlacedCargo> placedQuery(List<HtQuery> conditions);

	/*
	 * 查询所有符合条件的上架记录
	 */
	List<WPlacedCargo> queryAll(List<HtQuery> conditions);

	/*
	 * 盘点
	 */
	List<WPlacedCargo> inventory(List<HtQuery> conditions);
}
