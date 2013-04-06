package com.hitisoft.fos.wms.dao;

import java.util.List;

import com.hitisoft.fos.wms.entity.WBlock;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface WBlockDao extends BaseDao<WBlock, Long> {
	/**
	 * 根据条件查询库位信息包括分页的处理
	 * @param conditions
	 * @return List
	 */
	List superQuery(List<HtQuery> conditions);
	/**
	 * 根据库位名称查询
	 * @param blockName
	 * @return 查出的记录数
	 */
	Integer checkNoDBName(String blockName );
	/**
	 * 根据库位代码查询
	 * @param blockCode
	 * @return 查询出来的记录数
	 */
	Integer checkNoDBCode(String blockCode);
}
