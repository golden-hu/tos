package com.hitisoft.fos.wms.dao;

import java.util.List;


import com.hitisoft.fos.wms.entity.WCheckNote;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface WCheckNoteDao extends BaseDao<WCheckNote, Long> {
	/**
	 * 根据条件查询拣货表
	 * @param HtQueryConditions
	 * @return ListWCheckNote
	 */
	List<WCheckNote> complexSearch(List<HtQuery> conditions);
}
