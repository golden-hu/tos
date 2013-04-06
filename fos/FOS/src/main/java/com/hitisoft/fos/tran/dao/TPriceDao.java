package com.hitisoft.fos.tran.dao;

import java.util.List;

import com.hitisoft.fos.tran.entity.TPrice;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface TPriceDao extends BaseDao<TPrice, Long> {
	List<TPrice> complexQuery(List<HtQuery> conditions);
}

