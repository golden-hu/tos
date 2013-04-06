package com.hitisoft.fos.sys.dao;

import java.util.List;

import com.hitisoft.fos.sys.entity.PCompany;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface PCompanyDao extends BaseDao<PCompany, Long> {
	List<PCompany> complexQuery(List<HtQuery> conditions);
}
