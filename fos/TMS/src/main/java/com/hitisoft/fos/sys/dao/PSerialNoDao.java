package com.hitisoft.fos.sys.dao;

import java.util.Map;

import com.hitisoft.fos.sys.entity.PSerialNo;
import com.hitisoft.fw.orm.jpa.BaseDao;

public interface PSerialNoDao extends BaseDao<PSerialNo, Long> {

	void init();

	Long getNextSerialNo(Map<String, String> propertyMap);
}
