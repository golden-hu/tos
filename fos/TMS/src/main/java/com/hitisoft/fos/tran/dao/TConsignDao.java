package com.hitisoft.fos.tran.dao;

import java.util.List;
import java.util.Map;

import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface TConsignDao extends BaseDao<TConsign, Long> {
	List<TConsign> complexQuery(List<HtQuery> conditions);
	List<Object> complexSearch(List<HtQuery> conditions);
	List<Object> orderNoSearch(List <HtQuery>conditions);
	List<Object> excelConsList(List<HtQuery> conditions);
	List<Object> excelConsPList(List<HtQuery> conditions);
	List<Object> excelSumma(List<HtQuery> conditions);
	List<Object> queryConsignee();
	List<TConsign> complexQueryCheck(List<HtQuery> conditions);
	Long querySize(final List<HtQuery> conditions, final Map<String, String> propertyMap);
	List<Object> querySalesSummary(String consDateF, String consDateT);
	List<Object> queryMonthlySummary(String yy);
	List<Object> queryDailySummary(String yy,String mm);
	//委托统计
	List<Object> consShipSum(final List<HtQuery> conditions);
}
