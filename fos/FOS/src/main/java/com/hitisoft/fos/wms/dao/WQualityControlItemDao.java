package com.hitisoft.fos.wms.dao;

import java.util.List;

import com.hitisoft.fos.wms.entity.WQualityControlItem;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface WQualityControlItemDao extends BaseDao<WQualityControlItem, Long> {

	/**
	 * 根据出入库单号查询货物信息
	 * @param conditions
	 * @return ListWQualityControlItem
	 */
	List<WQualityControlItem> getQualityControl(List<HtQuery> conditions);
	
}
