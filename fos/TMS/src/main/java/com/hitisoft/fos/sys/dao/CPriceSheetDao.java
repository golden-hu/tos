package com.hitisoft.fos.sys.dao;

import java.util.List;

import com.hitisoft.fos.sys.entity.CPriceSheet;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface CPriceSheetDao extends BaseDao<CPriceSheet, Long> {

	List<?> complexQuery(List<HtQuery> conditions);

	void updateVoyaName(Long voyaId, String voyaName);

	void updateVessName(Long vessId, String vessName);

	void updateVessName(Integer voyaId, Integer newVessId, String newVessName);
}
