package com.hitisoft.fos.wms.dao;

import java.util.List;

import com.hitisoft.fos.wms.entity.WCheckList;
import com.hitisoft.fw.orm.jpa.BaseDao;

public interface WCheckListDao extends BaseDao<WCheckList, Long> {
	/**
	 * 根据拣货单id查询拣货单列表
	 * @param requestContextcheckNoteId
	 * @return ListWCheckList
	 */
	List<WCheckList> findCheckIdExp();
}
