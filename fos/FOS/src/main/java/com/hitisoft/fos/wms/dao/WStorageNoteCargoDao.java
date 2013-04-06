package com.hitisoft.fos.wms.dao;

import java.util.List;

import com.hitisoft.fos.wms.entity.WStorageNoteCargo;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface WStorageNoteCargoDao extends BaseDao<WStorageNoteCargo, Long> {

	/**
	 * 根据条件查询货物信息
	 * @param  conditions
	 * @return ListWstorageNoteCargo
	 */
	List<WStorageNoteCargo> excelQuery(List<HtQuery> conditions);
	
	/**
	 * 根据货物主单ID查询货物详细信息
	 * @param id
	 * @return ListWStorageNoteCargo
	 */
	List<WStorageNoteCargo> findStorageNoteCargoByStorageNoteId(Integer id);
	
	/**
	 * 根据货物主单ID查询货物详细信息并根据货物类别分组生成陆运单用
	 * @param list
	 * @return ListWStorageNoteCargo
	 */
	List<WStorageNoteCargo> gentTConsignCargo(Integer integer);
	
	/**
	 * 根据传入的ID查询货物的详细信息
	 * @param conditions
	 * @return ListWStorageNoteCargo
	 */
	List<WStorageNoteCargo> excelQueryStorageNoteCargo(List<HtQuery> conditions);
}
