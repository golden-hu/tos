package com.hitisoft.fos.tran.dao;

import java.util.List;

import com.hitisoft.fos.tran.entity.TConsignCargo;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface TConsignCargoDao extends BaseDao<TConsignCargo, Long> {
	List<TConsignCargo> excelQuery(final List<HtQuery> conditions);

	List<TConsignCargo> queryCargoByStatus();//final List<HtQuery> conditions

}
