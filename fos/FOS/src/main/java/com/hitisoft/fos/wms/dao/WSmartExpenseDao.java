package com.hitisoft.fos.wms.dao;


import java.util.List;

import com.hitisoft.fos.wms.entity.WRate;
import com.hitisoft.fos.wms.entity.WSmartExpense;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface WSmartExpenseDao extends BaseDao<WSmartExpense, Long>{

	/**
	 * 根据出入库单ID进行智能计费系统查询
	 * @param conditions
	 * @return ListWSmartExpense
	 */
	List<WSmartExpense> excelQuerySmartExpenseList(List<HtQuery> conditions);

	
	
}
