package com.hitisoft.fos.sys.dao;

import java.util.List;

import com.hitisoft.fos.sys.entity.PTemplateMap;
import com.hitisoft.fw.orm.jpa.BaseDao;

public interface PTemplateMapDao extends BaseDao<PTemplateMap, Long> {
	public List<PTemplateMap> getTemplateMap(String tetyId);
}
