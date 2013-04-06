package com.hitisoft.cms.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.hitisoft.cms.dao.HcmsResourceDao;
import com.hitisoft.cms.entity.HcmsResource;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class HcmsResourceDaoImpl extends JpaDao<HcmsResource, Long> implements HcmsResourceDao {
	public HcmsResourceDaoImpl() {
		super(HcmsResource.class);
	}

	@SuppressWarnings("unchecked")
	//@Override
	public List<HcmsResource> complexQueryByPid(Long pid) {
		Map<String, String> queryMap = new HashMap<String, String>();
		String joinSql = "(t1.PIds like '%/" + pid + "' or t1.PIds like '%/" + pid + "/%')";
		return query(null, queryMap, "t1", joinSql, HcmsResource.class);
	}

	@SuppressWarnings("unchecked")
	//@Override
	public List<HcmsResource> queryCategoryAndArticle(Map<String, String> queryMap) {
		String joinSql = "(t1.type = 'C' or t1.type = 'A')";
		return query(null, queryMap, "t1", joinSql, HcmsResource.class);
	}
}
