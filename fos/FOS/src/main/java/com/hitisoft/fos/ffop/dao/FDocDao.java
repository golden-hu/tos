package com.hitisoft.fos.ffop.dao;

import java.util.List;
import java.util.Map;

import com.hitisoft.fos.ffop.entity.FDoc;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface FDocDao extends BaseDao<FDoc, Long> {

	List<?> complexQuery(List<HtQuery> conditions);

	List<FDoc> complexQueryNeedRelease(List<HtQuery> conditions, Map<String, String> queryMap);

	List<FDoc> complexQueryNeedAlert(List<HtQuery> conditions);

	void updateConsNoByConsId(Long consId, String consNo);
}
