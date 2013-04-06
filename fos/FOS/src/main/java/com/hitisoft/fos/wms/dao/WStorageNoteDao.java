package com.hitisoft.fos.wms.dao;

import java.util.List;

import com.hitisoft.fos.wms.entity.WStorageNote;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface WStorageNoteDao extends BaseDao<WStorageNote, Long> {

	/**
	 * 查询出入库的应收和应付的统计<p>
	 * 做出入库费用审核时进行的费用复杂查询，主要是一些合计
	 * @param conditions
	 * @return ListWStorageNOte
	 */
	List<WStorageNote> complexQueryCheck(List<HtQuery> conditions);
	
	/**
	 * 根据传入的条件出入库主表。和从表，货物表中查询出入库主信息
	 * @param conditions
	 * @return ListWStorageNote
	 */
	List<WStorageNote> storageNoteCondition(List<HtQuery> conditions);
	
	/**
	 * 根据条件查询出货物主单信息（客户和出库单号可模糊查询）
	 * @param conditions
	 * @return ListWstorageNote
	 */
	List<WStorageNote> searchConditionsCargo(List<HtQuery> conditions);
	
	/**
	 * 收货地址的智能查询，如果有参数传入，则根据这个参数模糊查询，如果没参数传入，则查询所有地址
	 * @return ListWStorageNote
	 * @param requestContextLoadAddress
	 */
	List<WStorageNote> getLoadAddress();
	
	/**
	 * 承运商的智能查询，如果有参数传入，则根据参数模糊查询如果没参数传入，则查询全部。
	 * @param requestContextTransCarrier
	 * return ListWStorageNote
	 */
	List<WStorageNote> getTransCarrier();
	
	/**
	 * 查询订单号是否存在
	 * @param  requestContextOrderNo
	 * @return ListWStorageNotes
	 */
	List<WStorageNote> validationOrderNo();
	
	/**
	 * 根据给定的收货日期的范围查询出出入库主单信息
	 * @param conditions
	 * @return ListWStorageNote
	 */
	List<WStorageNote> complexQuery(List<HtQuery> conditions);
	
	/**
	 * 根据条件查询上架表、货物主表、货物表上的信息上的信息。按主信息ID分组
	 * @param conditions
	 * @return ListWStorageNote
	 */
	List<WStorageNote> complexQueryByGroup(List<HtQuery> conditions);
}
