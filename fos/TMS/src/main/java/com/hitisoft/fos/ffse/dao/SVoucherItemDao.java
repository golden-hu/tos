package com.hitisoft.fos.ffse.dao;

import java.util.List;

import com.hitisoft.fos.ffse.entity.SVoucherItem;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface SVoucherItemDao extends BaseDao<SVoucherItem, Long> {

	List<SVoucherItem> complexQueryByParent(List<HtQuery> conditions);

	List<?> complexQueryCust(List<HtQuery> conditions);
}
