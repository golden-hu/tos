package com.hitisoft.fos.tran.dao;

import java.util.List;

import com.hitisoft.fos.tran.entity.TDriver;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface TDriverDao extends BaseDao<TDriver, Long> {
	List<TDriver> complexQuery(List<HtQuery> conditions);
}

