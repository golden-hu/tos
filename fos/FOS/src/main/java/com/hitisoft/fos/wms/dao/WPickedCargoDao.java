package com.hitisoft.fos.wms.dao;

import java.util.List;

import com.hitisoft.fos.wms.entity.WPickedCargo;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface WPickedCargoDao extends BaseDao<WPickedCargo, Long> {
	/**
	 * 根据出库单ID查询拣货物信息
	 * @param 出库单ID
	 * @return ListWpickedCargo
	 */
	List<WPickedCargo> findByStorageNoteId(Integer id);
}
