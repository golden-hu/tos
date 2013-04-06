package com.hitisoft.fos.ws.dao;

import java.util.List;

import com.hitisoft.fos.ws.entity.WConsign;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface WConsignDao extends BaseDao<WConsign, Long> {
	public abstract List<?> complexQuery(final List<HtQuery> conditions);
}
