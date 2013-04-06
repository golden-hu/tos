package com.hitisoft.fos.sys.dao;

import java.util.List;

import com.hitisoft.fos.sys.entity.CSalesCommission;
import com.hitisoft.fw.orm.jpa.BaseDao;

public interface CSalesCommissionDao extends BaseDao<CSalesCommission, Long> {

	List<?> queryAllCommission();

	List<?> queryCommissionDetail();
}
