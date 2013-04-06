package com.hitisoft.fos.wms.dao;


import java.util.List;

import com.hitisoft.fos.wms.entity.WContractRate;
import com.hitisoft.fos.wms.entity.WRate;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface WContractRateDao extends BaseDao<WContractRate, Long>{

	/**
	 * 根据条件查询费率信息
	 * @param conditions
	 * @return ListWRate
	 */
	List<WRate> excelQuery(List<HtQuery> conditions);

	/**
	 * 根据客户ID、货物ID、仓库ID查询费率信息
	 * @param conditions
	 * @return List
	 */
	List queryCostRate(List<HtQuery> conditions);

	/**
	 * 根据出入库主表的ID(conditions)查询信息费率信息
	 * @param conditions
	 * @return ListWRate
	 */
	List<WRate> excelQueryRateAndSheet(List<HtQuery> conditions);

	/**
	 * 根据条件查询审核人不为空的数据
	 * @param conditions
	 * @return ListWrate
	 */
	List<WRate> queryRateByCust(List<HtQuery> conditions);
	
}
