package com.hitisoft.fos.ffop.dao;

import java.util.List;

import com.hitisoft.fos.ffop.entity.FContainer;
import com.hitisoft.fw.orm.jpa.BaseDao;

public interface FContainerDao extends BaseDao<FContainer, Long> {

	List<Object> complexQueryByVoyaId();
}
