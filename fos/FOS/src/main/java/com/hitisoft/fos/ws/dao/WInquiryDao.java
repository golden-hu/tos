package com.hitisoft.fos.ws.dao;

import java.util.List;

import com.hitisoft.fos.ws.entity.WInquiry;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface WInquiryDao extends BaseDao<WInquiry, Long> {
	List<?> complexQuery(List<HtQuery> conditions);
}
