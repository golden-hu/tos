package com.hitisoft.fos.ffse.dao;

import java.util.List;
import java.util.Map;

import com.hitisoft.fos.ffse.entity.SVoucher;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface SVoucherDao extends BaseDao<SVoucher, Long> {

	List<SVoucher> complexQuery(List<HtQuery> conditions);

	Double getBalance(List<HtQuery> conditions, Map<String,String> queryMap);
}
