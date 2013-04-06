package com.hitisoft.fos.ffop.dao;

import java.util.List;

import com.hitisoft.fos.ffop.entity.FCargo;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface FCargoDao extends BaseDao<FCargo, Long> {

	List<FCargo> complexQuery(List<HtQuery> conditions);
}
