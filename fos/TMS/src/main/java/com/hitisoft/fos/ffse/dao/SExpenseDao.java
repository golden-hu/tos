package com.hitisoft.fos.ffse.dao;

import java.util.List;
import java.util.Map;

import com.hitisoft.fos.ffse.entity.SExpense;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface SExpenseDao extends BaseDao<SExpense, Long> {

	List<SExpense> complexQueryInvoiceCreate(List<HtQuery> conditions);

	List<SExpense> complexQuery(List<HtQuery> conditions);

	List<SExpense> complexQueryRelease(List<HtQuery> conditions, Map<String, String> queryMap);

	void updateConsNoByConsId(Long consId, String consNo);

	List<SExpense> complexQueryWriteOff(List<HtQuery> conditions);
	
	List<Object> queryBusinessSummary(String bizType,String consDateF,String consDateT);
	
	List<Object> queryMonthlySummary(String yy);
	
	List<Object> queryDailySummary(String yy,String mm);
	
	List<Object> querySalesSummary(String consDateF,String consDateT);
	
	 boolean updateExpenseWriteOff(final Long consId,final Integer custNameFlag, final String expeType);
}
