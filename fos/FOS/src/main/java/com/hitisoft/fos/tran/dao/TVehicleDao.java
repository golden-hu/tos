package com.hitisoft.fos.tran.dao;

import java.util.List;

import com.hitisoft.fos.tran.entity.TVehicle;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface TVehicleDao extends BaseDao<TVehicle, Long> {
	List<TVehicle> complexQuery(List<HtQuery> conditions);
}
