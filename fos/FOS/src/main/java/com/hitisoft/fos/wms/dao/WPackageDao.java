package com.hitisoft.fos.wms.dao;

import java.util.List;

import com.hitisoft.fos.wms.entity.WPackage;
import com.hitisoft.fw.orm.jpa.BaseDao;

public interface WPackageDao extends BaseDao<WPackage, Long> {
	/**
	 * 根据requestContext中得到的包装名称查询
	 * @param requestContextPackageName
	 * @return ListWpackage
	 */
	List<WPackage> getPackageName();
}
