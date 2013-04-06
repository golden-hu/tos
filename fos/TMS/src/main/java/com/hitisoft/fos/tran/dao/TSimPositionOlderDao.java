package com.hitisoft.fos.tran.dao;

import java.util.List;

import com.hitisoft.fos.tran.entity.TSimPositionOlder;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface TSimPositionOlderDao extends BaseDao<TSimPositionOlder, Long> {

	public List <Object> getCurruntPosition(List<HtQuery> conditions);
}
