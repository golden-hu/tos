package com.hitisoft.fos.ffop.dao;

import java.util.List;
import java.util.Map;

import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface FConsignDao extends BaseDao<FConsign, Long> {

	void updateStatusById(Long id, Byte status);

	void updateStatusById(Long id, String statusName, Byte statusValue);

	void updateStatusBookById(Long id, Byte status);

	void updateMblStatusById(Long id, Byte mbl);

	void updateFblStatusById(Long id, Byte fbl);

	List<FConsign> complexQuery(List<HtQuery> conditions);

	List<FConsign> complexQueryTask(List<HtQuery> conditions);

	List<FConsign> complexQueryCheck(List<HtQuery> conditions);

	List<Object> complexQueryOverDueSales(int dateNum);

	List<Object> queryShipper();
	
	List<Object> queryFShipper();
	
	List<Object> querySalesSummary(String consDateF, String consDateT);
	
	List<Object> queryMonthlySummary(String yy);
	
	List<Object> queryDailySummary(String yy,String mm);
	
	Long querySize(final Map<String, String> propertyMap);
	
	Long querySize(final List<HtQuery> conditions, final Map<String, String> propertyMap);
	
	void updateVoyaName(Long voyaId, String voyaName);

	void updateVessName(Long vessId, String vessName, String vessNameCn);

	void updateVessName(Integer voyaId, Integer newVessId, String vessName, String vessNameCn);
}
