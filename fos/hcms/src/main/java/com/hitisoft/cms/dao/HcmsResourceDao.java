package com.hitisoft.cms.dao;

import java.util.List;
import java.util.Map;

import com.hitisoft.cms.entity.HcmsResource;
import com.hitisoft.fw.orm.jpa.BaseDao;

public interface HcmsResourceDao extends BaseDao<HcmsResource, Long> {

	List<HcmsResource> complexQueryByPid(Long pid);

	List<HcmsResource> queryCategoryAndArticle(Map<String, String> queryMap);
}
