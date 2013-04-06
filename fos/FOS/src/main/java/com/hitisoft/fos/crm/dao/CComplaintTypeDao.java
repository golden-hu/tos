package com.hitisoft.fos.crm.dao;

import java.util.List;

import com.hitisoft.fos.crm.entity.CComplaintType;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface CComplaintTypeDao extends BaseDao<CComplaintType, Long>{
	List<CComplaintType> complexQuery(List<HtQuery> conditions);
}