package com.hitisoft.fos.tran.dao;

import java.util.List;

import com.hitisoft.fos.tran.entity.TTransTask;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface TTransTaskDao extends BaseDao<TTransTask, Long> {
	List<TTransTask> complexQuery(List<HtQuery> conditions);

	List<TTransTask> complexQueryCheck(List<HtQuery> conditions);

	List<TTransTask> query();
}
