package com.hitisoft.fos.tran.dao;

import java.util.List;
import java.util.Map;

import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.tran.entity.TTransTask;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface TConsignDao extends BaseDao<TConsign, Long> {
	
	List<TConsign> complexQuery(List<HtQuery> conditions);

	List<TConsign> complexSearch(List<HtQuery> conditions);

	List<TConsign> orderNoSearch(List<HtQuery> conditions);
	
	List<TConsign> complexTransSearch(List<HtQuery> conditions);

	List<Object> queryConsignee();

	List<TConsign> queryStartStation();

	List<TConsign> queryEndStation();

	List<TConsign> queryDriverName();

	List<TConsign> queryVehicleNo();

	List<TConsign> complexQueryCheck(List<HtQuery> conditions);

	Long querySize(final List<HtQuery> conditions,
			final Map<String, String> propertyMap);

	List<Object> querySalesSummary(String consDateF, String consDateT);

	List<Object> queryMonthlySummary(String yy);

	List<Object> queryDailySummary(String yy, String mm);

	List<TConsign> queryTcons(List<HtQuery> conditions);
	
	List<TConsign> queryTrans(List<HtQuery> conditions);
	
	List<TConsign> tconsSearch(List<HtQuery> conditions);
	
	List<TConsign> queryDistr();

	List<TConsign> queryListTT();

	List<TConsign> queryListTC();
}
