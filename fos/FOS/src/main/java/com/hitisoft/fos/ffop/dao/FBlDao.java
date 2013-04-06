package com.hitisoft.fos.ffop.dao;

import java.util.List;

import com.hitisoft.fos.ffop.entity.FBl;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface FBlDao extends BaseDao<FBl, Long> {

	void updateConsNoByConsId(Long consId, String consNo);

	List<FBl> complexQueryForWs(List<HtQuery> conditions);

	List<FBl> complexQuery(List<HtQuery> conditions);
	
	List<Object> queryShipper();

	void updateStatusById(Long id, Byte blStatus);
}
