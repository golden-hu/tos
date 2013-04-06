package com.hitisoft.fos.tran.dao;

import java.util.List;

import com.hitisoft.fos.tran.entity.TSimPosition;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface TSimPositionDao extends BaseDao<TSimPosition, Long> {

	public List <Object> getCurruntPosition(List<HtQuery> conditions);
}
