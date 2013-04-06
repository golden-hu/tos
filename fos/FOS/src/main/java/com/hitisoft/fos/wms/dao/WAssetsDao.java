package com.hitisoft.fos.wms.dao;


import java.util.List;

import com.hitisoft.fos.wms.entity.WAssets;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface WAssetsDao extends BaseDao<WAssets, Long> {
	/**
	 * 查询所有的，去重的，不为null的栈板名称
	 * @return ListWassets
	 */
	List<WAssets> getByname();
	/**
	 * 查询所有的，去重的，不为null的栈板品牌名称
	 * @return ListWAssets
	 */
	List<WAssets> findByBland();
	/**
	 * 根据ID获得所有对应的托盘数列表
	 * @return ListWassets
	 */
	List<WAssets> excelQueryAssetsList(List<HtQuery> conditions);
}
