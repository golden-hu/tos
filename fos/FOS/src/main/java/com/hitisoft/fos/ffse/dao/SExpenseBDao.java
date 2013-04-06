package com.hitisoft.fos.ffse.dao;

import java.util.List;

import com.hitisoft.fos.ffse.entity.SExpenseB;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface SExpenseBDao extends BaseDao<SExpenseB, Long> {

	List<SExpenseB> complexQuery(List<HtQuery> conditions);
}
